import { marquee } from "../site.config";

export default function Marquee() {
  const seq = (
    <div className="marquee-seq" aria-hidden>
      {marquee.map((m) => (
        <span key={m}>
          {m}
          <i>✦</i>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className="marquee-track">
        {seq}
        {seq}
      </div>
    </div>
  );
}
