// Celular brasileiro: DDD (11–99, sem zero) + 9 + 8 dígitos.

export const onlyDigits = (v: string) => v.replace(/\D/g, "");

/** Máscara progressiva: (11) 91234-5678. Ignora um +55 colado no início. */
export function maskPhone(value: string) {
  let d = onlyDigits(value);
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  d = d.slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function isValidMobile(value: string) {
  return /^[1-9][1-9]9\d{8}$/.test(onlyDigits(value));
}

export function toE164(value: string) {
  return `+55${onlyDigits(value)}`;
}
