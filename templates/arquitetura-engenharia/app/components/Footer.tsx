export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-mark" aria-hidden="true">
          Atelier arq+eng
        </div>
        <div className="fg">
          <div>
            <h4>Escritório</h4>
            <p>Av. Paulista, 1842 — Bela Vista, São Paulo - SP</p>
            <p>Pinheiros, São Paulo - SP</p>
            <p>CAU/CREA 00000</p>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              <li><a href="#disciplinas">Disciplinas</a></li>
              <li><a href="#projetos">Projetos</a></li>
              <li><a href="#processo">Processo</a></li>
              <li><a href="#sobre">Estúdio</a></li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li><a href="#">(00) 00000-0000</a></li>
              <li><a href="#">contato@seudominio.com.br</a></li>
              <li><a href="#">@seuinstagram</a></li>
            </ul>
          </div>
        </div>
        <div className="fb">
          <span>© 2026 Valença & Antunes. Todos os direitos reservados.</span>
          <span>Provido por Neovanguard</span>
        </div>
      </div>
    </footer>
  );
}
