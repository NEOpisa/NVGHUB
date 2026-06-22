/** Validações compartilhadas entre as rotas de API e os formulários do client. */

/** Formato básico de e-mail (local@dominio.tld). */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida um telefone brasileiro de forma tolerante: ignora `()`, espaços, `-`,
 * `.` e um `+55` opcional, exigindo de 10 a 13 dígitos no total.
 * Vazio é considerado válido — o campo é opcional; cabe a quem chama decidir
 * se exige preenchimento.
 */
export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}
