const items = [
  "CrossFit Afiliado",
  "Coaches L1 & L2",
  "Sem contrato de fidelidade",
  "Aula experimental grátis",
  "Área do aluno online",
  "Turmas até 12 pessoas",
];

export default function VoltStripe() {
  return (
    <div className="volt-stripe">
      {items.map((item) => (
        <div className="vs-item" key={item}>
          <span className="vs-dot"></span>
          {item}
        </div>
      ))}
    </div>
  );
}
