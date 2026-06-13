const items = [
  "WOD Diário",
  "Check-in aberto",
  "847 Alunos ativos",
  "Próxima turma: 06:00",
  "Coaches L1 & L2",
  "Turmas até 12 pessoas",
  "Sem contrato de fidelidade",
  "Aula experimental grátis",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="vs-track" aria-hidden={ariaHidden || undefined}>
      {items.map((item) => (
        <div className="vs-item" key={item}>
          <span className="vs-dot"></span>
          {item}
        </div>
      ))}
    </div>
  );
}

export default function VoltStripe() {
  return (
    <div className="volt-stripe">
      <Track />
      <Track ariaHidden />
    </div>
  );
}
