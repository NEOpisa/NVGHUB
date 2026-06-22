export default function Sobre() {
  return (
    <section className="section sobre" id="sobre">
      <div className="wrap sobre-grid">
        <div className="sobre-imgs">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1100&q=80"
            alt="Chalé da pousada com vista para a serra"
          />
          <img
            className="img-2"
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
            alt="Interior aconchegante de um dos chalés"
          />
        </div>
        <div className="sobre-copy">
          <span className="eyebrow">Nossa história</span>
          <h2>Um pedaço da serra feito para receber</h2>
          <p>
            A Vista Serra nasceu do desejo de transformar uma antiga fazenda de
            café em um refúgio onde o tempo anda mais devagar. Cada chalé foi
            construído respeitando o relevo e a mata nativa.
          </p>
          <p>
            Aqui o luxo é simples: lareira acesa, comida de verdade e a vista que
            muda de cor ao longo do dia. Receber bem é o que sabemos fazer.
          </p>
          <ul className="sobre-list">
            <li>Café da manhã artesanal com produtos da região</li>
            <li>Atendimento próximo, do check-in ao check-out</li>
            <li>Pet friendly, com estrutura para o seu companheiro</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
