// Monta o payload do lead e envia ao webhook do n8n com timeout e uma nova tentativa.

import { getAttribution, getExternalId, getMetaCookies } from "./attribution";
import { readConsent } from "./consent";
import { toE164 } from "./phone";

export type LeadInput = {
  name: string;
  email: string;
  whatsapp: string;
  role: string;
  state: string;
  consent: boolean;
};

export type LeadPayload = ReturnType<typeof buildLeadPayload>;

/**
 * O que está sendo pedido. Define o texto de consentimento que fica gravado no
 * lead, o identificador da oferta e para qual webhook o cadastro vai.
 */
export type LeadOffer = {
  id: string;
  /** content_name do evento Lead (Pixel e API de Conversões). */
  contentName: string;
  consentText: string;
  webhookUrl: string;
};

export function buildLeadPayload(input: LeadInput, eventId: string, offer: LeadOffer) {
  const attribution = getAttribution();
  const { fbp, fbc } = getMetaCookies(attribution.fbclid);
  const externalId = getExternalId(eventId);
  return {
    // Campos planos para a API de Conversões (fluxo n8n "Meta CAPI - Lead")
    event_id: eventId,
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: window.location.href,
    content_name: offer.contentName,
    external_id: externalId,
    email: input.email.trim().toLowerCase(),
    phone_e164: toE164(input.whatsapp),
    first_name: firstName(input.name),
    last_name: lastName(input.name),
    state: input.state || "",
    perfil: input.role,
    fbp,
    fbc,
    user_agent: navigator.userAgent,
    // Escolha no banner de cookies: "granted", "denied" ou "" (não respondeu)
    cookie_consent: readConsent() ?? "",
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    utm_term: attribution.utm_term,
    fbclid: attribution.fbclid,
    gclid: attribution.gclid,
    // Formato anterior, mantido para não quebrar o fluxo do n8n que já existe
    timestamp: new Date().toISOString(),
    lead: {
      name: input.name.trim(),
      first_name: firstName(input.name),
      email: input.email.trim().toLowerCase(),
      whatsapp: toE164(input.whatsapp),
      role: input.role,
      state: input.state || null,
      consent: input.consent,
      consent_text: offer.consentText,
    },
    attribution: {
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_content: attribution.utm_content,
      utm_term: attribution.utm_term,
      fbclid: attribution.fbclid,
      gclid: attribution.gclid,
      fbp,
      fbc,
    },
    context: {
      page_url: window.location.href,
      landing_url: attribution.landing_url,
      referrer: attribution.first_referrer,
      user_agent: navigator.userAgent,
    },
    offer: offer.id,
  };
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? "";
}

export function lastName(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

async function postOnce(payload: LeadPayload, url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      keepalive: true,
    });
    if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`);
  } finally {
    clearTimeout(timer);
  }
}

export async function sendLead(payload: LeadPayload, webhookUrl: string) {
  if (!webhookUrl) throw new Error("Webhook não configurado para esta oferta");
  try {
    await postOnce(payload, webhookUrl, 10000);
  } catch (first) {
    console.warn("[lead] primeira tentativa falhou, tentando de novo", first);
    await new Promise((r) => setTimeout(r, 800));
    await postOnce(payload, webhookUrl, 12000);
  }
}
