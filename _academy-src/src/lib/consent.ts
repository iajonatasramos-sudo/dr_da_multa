export type Consent = "granted" | "denied";

export const CONSENT_KEY = "tadv_cookie_consent";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* sem storage: a escolha vale só para esta visita */
  }
}
