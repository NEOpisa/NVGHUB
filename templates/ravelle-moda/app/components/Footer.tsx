import { site, rodape } from "../site.config";

export default function Footer() {
  const [antes, depois] = site.nome.split(site.destaque);
  return (
    <footer id="contato">
      <div className="wrap">
        <p className="foot-word">
          {antes}
          <span>{site.destaque}</span>
          {depois}
        </p>

        <div className="foot-grid">
          <div>
            <h3>O atelier</h3>
            <p>
              Moda autoral em série curta, costurada em São Paulo. Monte seu look
              no provador virtual e finalize no WhatsApp — sem app, sem cadastro.
            </p>
          </div>
          <div>
            <h3>Visite</h3>
            <ul>
              <li>{site.endereco}</li>
              <li>{site.cidade}</li>
              <li>{site.horario}</li>
            </ul>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener">
                  {site.whatsappBonito}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener">
                  @{site.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-base">
          <span>
            © {new Date().getFullYear()} {site.nome} · {rodape.assinatura}
          </span>
          <span>{rodape.lgpd}</span>
        </div>
      </div>
    </footer>
  );
}
