export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <div className="footer-logo">[Nome da Academia]</div>
          <p>
            Box de CrossFit afiliado, [Bairro, Cidade - UF]. Comunidade real.
            Resultado real.
          </p>
        </div>
        <div>
          <h5>Box</h5>
          <ul>
            <li>
              <a href="#porque">Por que o [Nome da Academia]</a>
            </li>
            <li>
              <a href="#modalidades">Modalidades</a>
            </li>
            <li>
              <a href="#professores">Coaches</a>
            </li>
            <li>
              <a href="#experimental">Aula grátis</a>
            </li>
          </ul>
        </div>
        <div>
          <h5>Aluno</h5>
          <ul>
            <li>
              <a href="#">Área do aluno</a>
            </li>
            <li>
              <a href="#horarios">Horários</a>
            </li>
            <li>
              <a href="#planos">Planos</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </div>
        <div>
          <h5>Contato</h5>
          <ul>
            <li>
              <a href="#">(00) 00000-0000</a>
            </li>
            <li>
              <a href="#">@seuinstagram</a>
            </li>
            <li>
              <a href="#">[Endereço completo]</a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© 2025 [Nome da Academia] — CrossFit afiliado</span>
        <span>Feito para atletas urbanos</span>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: ".6rem 5vw 1.2rem",
          background: "#050505",
          fontSize: ".68rem",
          color: "var(--text-secondary)",
        }}
      >
        Provido por Neovanguard
      </div>
    </>
  );
}
