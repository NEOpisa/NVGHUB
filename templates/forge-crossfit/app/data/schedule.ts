export type ChipKind = "cf" | "haltero" | "open" | "mobility";

export interface AulaSlot {
  tipo: string;
  chip: ChipKind;
}

export type VagasStatus = "ok" | "pouco" | "cheio";

export interface ScheduleRow {
  hora: string;
  mwf: AulaSlot;
  tthu: AulaSlot;
  sat: AulaSlot;
  vagas: number;
  status: VagasStatus;
}

export const schedule: ScheduleRow[] = [
  {
    hora: "06:00",
    mwf: { tipo: "CrossFit", chip: "cf" },
    tthu: { tipo: "CrossFit", chip: "cf" },
    sat: { tipo: "CrossFit", chip: "cf" },
    vagas: 3,
    status: "pouco",
  },
  {
    hora: "07:00",
    mwf: { tipo: "CrossFit", chip: "cf" },
    tthu: { tipo: "CrossFit", chip: "cf" },
    sat: { tipo: "CrossFit", chip: "cf" },
    vagas: 8,
    status: "ok",
  },
  {
    hora: "09:00",
    mwf: { tipo: "Mobilidade", chip: "mobility" },
    tthu: { tipo: "Mobilidade", chip: "mobility" },
    sat: { tipo: "Open Gym", chip: "open" },
    vagas: 12,
    status: "ok",
  },
  {
    hora: "12:00",
    mwf: { tipo: "CrossFit", chip: "cf" },
    tthu: { tipo: "CrossFit", chip: "cf" },
    sat: { tipo: "—", chip: "open" },
    vagas: 0,
    status: "cheio",
  },
  {
    hora: "18:00",
    mwf: { tipo: "CrossFit", chip: "cf" },
    tthu: { tipo: "Weightlifting", chip: "haltero" },
    sat: { tipo: "—", chip: "open" },
    vagas: 5,
    status: "pouco",
  },
  {
    hora: "19:00",
    mwf: { tipo: "CrossFit", chip: "cf" },
    tthu: { tipo: "CrossFit", chip: "cf" },
    sat: { tipo: "—", chip: "open" },
    vagas: 9,
    status: "ok",
  },
  {
    hora: "20:00",
    mwf: { tipo: "CrossFit", chip: "cf" },
    tthu: { tipo: "Weightlifting", chip: "haltero" },
    sat: { tipo: "—", chip: "open" },
    vagas: 11,
    status: "ok",
  },
];

export function chipClass(c: ChipKind): string {
  const map: Record<ChipKind, string> = {
    cf: "chip-cf",
    haltero: "chip-haltero",
    open: "chip-open",
    mobility: "chip-mobility",
  };
  return map[c] ?? "chip-open";
}
