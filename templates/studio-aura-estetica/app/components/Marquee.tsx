import { marquee } from "../site.config";

// Faixa decorativa — o conteúdo real (os rituais) está no menu logo
// abaixo, por isso a faixa inteira fica fora da árvore de acessibilidade.
export default function Marquee() {
  const seq = (key: string) => (
    <div className="marquee-seq" key={key}>
      {marquee.map((item) => (
        <span key={item}>
          {item} <i>✦</i>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {seq("a")}
        {seq("b")}
      </div>
    </div>
  );
}
