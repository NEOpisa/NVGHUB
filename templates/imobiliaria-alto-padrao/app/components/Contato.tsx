"use client";

import Reveal from "./Reveal";

export default function Contato() {
  return (
    <section className="contato" id="contato">
      <div className="wrap">
        <div className="row">
          <Reveal>
            <p className="eyebrow">Atendimento privativo</p>
            <h2>
              Vamos encontrar o seu <em>próximo endereço</em>
            </h2>
            <p className="lead">
              Conte o que procura ou o que deseja vender. Um consultor entra em
              contato em até 24h para agendar uma conversa reservada — sem
              compromisso.
            </p>
            <div className="ci"><span>Telefone</span> (00) 00000-0000</div>
            <div className="ci"><span>E-mail</span> contato@seudominio.com.br</div>
            <div className="ci"><span>Escritório</span> [Endereço] — [Bairro, Cidade - UF]</div>
            <div className="ci"><span>Horário</span> Seg a Sex 9h–19h · Sáb 9h–13h</div>
          </Reveal>

          <Reveal as="form" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
            <h3>Agende sua visita</h3>
            <p className="sub">Resposta em até 24 horas úteis.</p>
            <div className="fld">
              <label>Nome completo</label>
              <input type="text" placeholder="Seu nome" />
            </div>
            <div className="row2">
              <div className="fld">
                <label>Telefone / WhatsApp</label>
                <input type="tel" placeholder="(00) 00000-0000" />
              </div>
              <div className="fld">
                <label>E-mail</label>
                <input type="email" placeholder="voce@email.com" />
              </div>
            </div>
            <div className="row2">
              <div className="fld">
                <label>Interesse</label>
                <select>
                  <option>Quero comprar</option>
                  <option>Quero vender</option>
                  <option>Quero alugar</option>
                </select>
              </div>
              <div className="fld">
                <label>Faixa de valor</label>
                <select>
                  <option>Até R$ 1M</option>
                  <option>R$ 1M – 3M</option>
                  <option>R$ 3M – 6M</option>
                  <option>Acima de R$ 6M</option>
                </select>
              </div>
            </div>
            <button className="btn brass" type="submit">
              Solicitar contato
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
