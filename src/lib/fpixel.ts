export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Dispara um evento padrão do Meta Pixel (ex.: "Lead", "Contact"). */
export function track(event: string, options?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, options);
  }
}

/** Dispara um evento customizado. */
export function trackCustom(event: string, options?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", event, options);
  }
}

/** Dispara um PageView padrão — usado em navegação client-side (App Router). */
export function pageview() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
}
