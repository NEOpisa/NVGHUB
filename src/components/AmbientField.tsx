// Campo ambiente decorativo e estático.
// O paralaxe de mouse reescrevia o transform de orbs com blur(120px) a cada
// frame — recompondo camadas enormes e travando o scroll. Agora é tudo estático
// (zero custo por frame), mantendo a profundidade visual.
export default function AmbientField() {
  return (
    <div className="ambient-field" aria-hidden="true">
      <div className="ambient-grain" />
      <div className="ambient-3d">
        <div className="ambient-3d-plane ambient-3d-floor" />
        <div className="ambient-3d-plane ambient-3d-ceiling" />
        <div className="ambient-3d-plane ambient-3d-left" />
        <div className="ambient-3d-plane ambient-3d-right" />
      </div>
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <div className="ambient-beam" />
    </div>
  );
}
