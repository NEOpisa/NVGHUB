import { rodape, site } from "../site.config";

export default function Footer() {
  const [antes, destaque] = site.nome.split(site.destaque);

  return (
    <footer>
      <div className="wrap">
        <p className="foot-word">
          {antes}
          <span>{site.destaque}</span>
          {destaque}
        </p>

        <div className="foot-grid">
          <div>
            <h3>O studio</h3>
            <p>
              {site.endereco}
              <br />
              {site.cidade} · {site.bairro}
              <br />
              {site.horario}
            </p>
          </div>
          <div>
            <h3>Navegar</h3>
            <ul>
              <li>
                <a href="#rituais">Rituais</a>
              </li>
              <li>
                <a href="#resultados">Resultados</a>
              </li>
              <li>
                <a href="#clube">Clube de fidelidade</a>
              </li>
              <li>
                <a href="#agendar">Reservar horário</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener"
                >
                  {site.whatsappBonito}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${site.instagram}`}
                  target="_blank"
                  rel="noopener"
                >
                  @{site.instagram}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-base">
          <span>
            © {new Date().getFullYear()} {site.nome}. Todos os direitos
            reservados.
          </span>
          <span>
            {rodape.lgpd} · {rodape.assinatura}
          </span>
        </div>
      </div>
    </footer>
  );
}
