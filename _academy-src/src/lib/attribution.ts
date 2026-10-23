// Captura de origem do lead: UTMs e click IDs persistidos no sessionStorage,
// cookies do Meta (_fbp/_fbc) e contexto da visita.

// src/sck: parâmetros de origem da Hotmart, repassados ao checkout da imersão
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "src", "sck"] as const;
type AttributionKey = (typeof KEYS)[number];
export type Attribution = Record<AttributionKey | "landing_url" | "first_referrer", string>;

const STORAGE_KEY = "tadv_attribution";

function readStorage(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Grava na sessão os parâmetros da URL atual. Valores novos substituem os antigos. */
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const stored = readStorage();
  let changed = false;
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) {
      stored[key] = value;
      changed = true;
    }
  }
  if (!stored.landing_url) {
    stored.landing_url = window.location.href;
    stored.first_referrer = document.referrer;
    changed = true;
  }
  if (!changed) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    /* navegação privada sem storage: segue só com a URL atual */
  }
}

export function getAttribution(): Attribution {
  const stored = readStorage();
  const params = new URLSearchParams(window.location.search);
  const out = {} as Attribution;
  for (const key of KEYS) out[key] = params.get(key) ?? stored[key] ?? "";
  out.landing_url = stored.landing_url ?? window.location.href;
  out.first_referrer = stored.first_referrer ?? document.referrer;
  return out;
}

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

/** _fbc do cookie; se ainda não existir mas houver fbclid, monta no formato do Meta. */
export function getMetaCookies(fbclid: string) {
  const fbp = getCookie("_fbp");
  let fbc = getCookie("_fbc");
  if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  return { fbp, fbc };
}

export function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
