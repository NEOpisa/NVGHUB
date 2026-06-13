"use client";

import { useState } from "react";
import { schedule, chipClass } from "@/app/data/schedule";
import { useStore } from "@/app/context/StoreContext";

export default function Horarios() {
  const { showToast } = useStore();
  const [booked, setBooked] = useState<Record<string, boolean>>({});

  const handleCheckin = (hora: string) => {
    setBooked((prev) => ({ ...prev, [hora]: true }));
    showToast(`Check-in confirmado para as ${hora}.`);
  };

  return (
    <section id="horarios" className="sec">
      <h2 className="sec-title">
        Horários das <span>aulas</span>
      </h2>
      <p className="sec-lead">
        Seis turmas por dia, do amanhecer ao fim da noite. Reserve sua vaga
        com check-in direto pelo site.
      </p>
      <div className="schedule-wrap">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Horário</th>
              <th>Seg / Qua / Sex</th>
              <th>Ter / Qui</th>
              <th>Sábado</th>
              <th>Vagas</th>
              <th>Check-in</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((r) => {
              const isBooked = booked[r.hora];
              const isCheio = r.status === "cheio";
              return (
                <tr key={r.hora}>
                  <td
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: ".88rem",
                      color: "var(--forge)",
                    }}
                  >
                    {r.hora}
                  </td>
                  <td>
                    <span className={`aula-chip ${chipClass(r.mwf.chip)}`}>
                      {r.mwf.tipo}
                    </span>
                  </td>
                  <td>
                    <span className={`aula-chip ${chipClass(r.tthu.chip)}`}>
                      {r.tthu.tipo}
                    </span>
                  </td>
                  <td>
                    <span className={`aula-chip ${chipClass(r.sat.chip)}`}>
                      {r.sat.tipo}
                    </span>
                  </td>
                  <td className={`vagas ${r.status}`}>
                    {isCheio ? (
                      <span style={{ color: "var(--danger)" }}>Esgotado</span>
                    ) : (
                      `${r.vagas} vagas`
                    )}
                  </td>
                  <td>
                    <button
                      className="checkin-btn"
                      disabled={isCheio || isBooked}
                      onClick={() => handleCheckin(r.hora)}
                      type="button"
                      style={
                        isBooked
                          ? { background: "var(--green)", color: "#fff" }
                          : undefined
                      }
                    >
                      {isCheio
                        ? "Esgotado"
                        : isBooked
                        ? "✓ Reservado"
                        : "Check-in"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
