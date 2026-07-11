"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FB_PIXEL_ID, pageview } from "@/lib/fpixel";

/* #100 · LGPD: o Pixel (tracking de terceiro) só carrega após consentimento
   explícito. A escolha persiste em localStorage. O Vercel Analytics é
   anônimo/sem cookie e segue fora do gate. */
const CONSENT_KEY = "nvg:consent";
type Consent = "granted" | "denied" | null;

export default function MetaPixel() {
  const pathname = usePathname();
  const firstLoad = useRef(true);
  const [consent, setConsent] = useState<Consent>(null);
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY) as Consent;
      if (saved === "granted" || saved === "denied") setConsent(saved);
      else setAsked(true); // sem escolha salva → mostra o aviso
    } catch {
      setAsked(false);
    }
  }, []);

  const decide = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* storage indisponível: decide só para a sessão */
    }
    setConsent(value);
    setAsked(false);
  };

  // PageView por troca de rota (o <Script> cobre o 1º load)
  useEffect(() => {
    if (!FB_PIXEL_ID || consent !== "granted") return;
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    pageview();
  }, [pathname, consent]);

  if (!FB_PIXEL_ID) return null;
  return (
    <>
      {consent === "granted" && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
      {asked && (
        <div className="nvg-consent" role="region" aria-label="Aviso de privacidade">
          <p>
            Usamos um pixel de medição para entender o alcance das nossas
            campanhas. Você aceita?{" "}
            <a href="/privacidade">Saiba como tratamos dados</a>.
          </p>
          <div className="nvg-consent-actions">
            <button type="button" className="btn-primary" onClick={() => decide("granted")}>
              Aceitar
            </button>
            <button type="button" className="btn-ghost" onClick={() => decide("denied")}>
              Só o essencial
            </button>
          </div>
        </div>
      )}
    </>
  );
}
