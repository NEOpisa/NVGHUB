export type ContentKey = "dashboard" | "lesson" | "certificate" | "mod1" | "locked";

export interface SidebarModule {
  label: string;
  status: "done" | "active" | "locked";
  target: ContentKey;
}

export const sidebarModules: SidebarModule[] = [
  { label: "Módulo 1 · Diagnóstico", status: "done", target: "mod1" },
  { label: "Módulo 2 · Método", status: "active", target: "lesson" },
  { label: "Módulo 3 · Autoridade", status: "locked", target: "locked" },
  { label: "Módulo 4 · Oferta", status: "locked", target: "locked" },
  { label: "Módulo 5 · Aquisição", status: "locked", target: "locked" },
  { label: "Módulo 6 · Escala", status: "locked", target: "locked" },
];
