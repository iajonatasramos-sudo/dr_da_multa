// Monta o payload do lead e envia ao webhook do n8n com timeout e uma nova tentativa.

import { getAttribution, getMetaCookies } from "./attribution";
import { toE164 } from "./phone";
import { site } from "./site";

export type LeadInput = {
  name: string;
  email: string;
  whatsapp: string;
  role: string;
  state: string;
  consent: boolean;
};

export type LeadPayload = ReturnType<typeof buildLeadPayload>;

export function buildLeadPayload(input: LeadInput, eventId: string) {
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
      consent_text:
        "Concordo em receber o e-book e comunicações da Telecom ADV Academy por e-mail e WhatsApp, conforme a Política de Privacidade.",
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
    offer: "ebook-mar-azul-da-advocacia",
  };
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? "";
}

async function postOnce(payload: LeadPayload, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(site.leadWebhookUrl, {
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

export async function sendLead(payload: LeadPayload) {
  if (!site.leadWebhookUrl) throw new Error("NEXT_PUBLIC_LEAD_WEBHOOK_URL não configurada");
  try {
    await postOnce(payload, 10000);
  } catch (first) {
    console.warn("[lead] primeira tentativa falhou, tentando de novo", first);
    await new Promise((r) => setTimeout(r, 800));
    await postOnce(payload, 12000);
  }
}
