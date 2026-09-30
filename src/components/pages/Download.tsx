import Link from "next/link";
import CodeBlock from "@/components/blocos/CodeBlock";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO, IMAGENS, CHAVE_FPR, REPO_PACOTES, DOCS_URL } from "@/lib/constants";
import { fmt, getMessages, type Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";
import { localePath } from "@/lib/routes";

export default function Download({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const t = messages.download;
  const c = messages.common;
  const link = (path: string) => localePath(locale, path);
  return (
    <>
      <section className="hero" aria-label={t.hero.label}>
        <div className="hero-copy">
          <span className="eyebrow">{fmt(t.hero.eyebrow, { version: VERSAO })}</span>
          <h1 className="h-xl">{t.hero.title}</h1>
          <p className="lead">{t.hero.lead}</p>
        </div>
      </section>

      <section className="panel panel--accent" aria-label={t.status.label}>
        <div className="sec-head">
          <span className="eyebrow">{t.status.eyebrow}</span>
          <h2 className="h-lg">{rich(fmt(t.status.title, { version: VERSAO }))}</h2>
        </div>
        <p className="lead">{t.status.lead}</p>
        <div className="pill-row">
          <Link className="pill" href={link("/novidades")}>{t.status.follow}</Link>
          <a
            className="pill"
            href={`${DOCS_URL}/COMO-CONSTRUIR.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.status.build}
            <ArrowUpRight />
          </a>
          <a
            className="pill pill--ghost"
            href={REPO_PACOTES}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.status.packages}
          </a>
        </div>
      </section>

      <section className="panel" aria-labelledby="imagens">
        <div className="sec-head">
          <span className="eyebrow">{t.compare.eyebrow}</span>
          <h2 className="h-lg" id="imagens">{rich(t.compare.title)}</h2>
        </div>

        <ol className="steps">
          {IMAGENS.map((im) => {
            const image = messages.images[im.id];
            return (
              <li className="step" key={im.id}>
                <span className="step-code">{im.nome}</span>
                <div>
                  <div className="step-top">
                    <h3 className="step-name">{image.purpose}</h3>
                    <span className="step-dur">{image.size}</span>
                  </div>
                  <p className="step-desc">{image.description}</p>
                  <div className="card-tags">
                    <span className="tag">{im.arquivo}</span>
                    <span className="tag">{fmt(t.compare.tagBoot, { value: image.boot })}</span>
                    <span className="tag">{fmt(t.compare.tagNetwork, { value: image.network })}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="grid-note">{rich(t.compare.note)}</p>
      </section>

      <section className="panel" aria-labelledby="conferir">
        <div className="sec-head">
          <span className="eyebrow">{t.verify.eyebrow}</span>
          <h2 className="h-lg" id="conferir">{rich(t.verify.title)}</h2>
          <p className="lead">{t.verify.lead}</p>
        </div>

        <ol className="steps">
          <li className="step">
            <span className="step-code">{t.verify.step1Code}</span>
            <div>
              <div className="step-top">
                <h3 className="step-name">{t.verify.step1Title}</h3>
              </div>
              <p className="step-desc">{t.verify.step1Text}</p>
              <CodeBlock t={messages.code}>{`sha256sum -c NeovanguardOS-Live-${VERSAO}-x86_64.iso.sha256`}</CodeBlock>
              <p className="step-desc">{t.verify.step1Result}</p>
            </div>
          </li>
          <li className="step">
            <span className="step-code">{t.verify.step2Code}</span>
            <div>
              <div className="step-top">
                <h3 className="step-name">{t.verify.step2Title}</h3>
              </div>
              <p className="step-desc">{t.verify.step2Text}</p>
              <CodeBlock t={messages.code}>{`gpg --verify NeovanguardOS-Live-${VERSAO}-x86_64.iso.asc NeovanguardOS-Live-${VERSAO}-x86_64.iso`}</CodeBlock>
              <p className="step-desc">{t.verify.step2Result}</p>
              <CodeBlock t={messages.code} label={messages.code.keyFingerprint}>{CHAVE_FPR}</CodeBlock>
            </div>
          </li>
        </ol>
      </section>

      <section className="closer" aria-label={c.nextStep}>
        <h2 className="h-xl">{t.closer.title}</h2>
        <div className="pill-row">
          <Link href={link("/instalacao")} className="pill">
            {t.closer.cta}
            <ArrowUpRight />
          </Link>
          <Link href={link("/recursos")} className="pill pill--ghost">
            {c.features}
          </Link>
        </div>
      </section>
    </>
  );
}
