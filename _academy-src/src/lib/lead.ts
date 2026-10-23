// Monta o payload do lead e envia ao webhook do n8n com timeout e uma nova tentativa.

import { getAttribution, getMetaCookies } from "./attribution";
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
  consentText: string;
  webhookUrl: string;
};

export function buildLeadPayload(input: LeadInput, eventId: string, offer: LeadOffer) {
  const attribution = getAttribution();
  const { fbp, fbc } = getMetaCookies(attribution.fbclid);
  return {
    event_id: eventId,
    event_name: "Lead",
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
