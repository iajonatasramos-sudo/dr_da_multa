// Disparo de eventos para Meta Pixel, GA4 e Google Ads.
// Cada chamada é ignorada em silêncio se o respectivo ID não estiver configurado.

import { site } from "./site";

type Fn = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fn;
    gtag?: Fn;
    dataLayer?: unknown[];
  }
}

/** O Pixel sobe depois da hidratação; eventos disparados antes disso esperam até 5 s. */
function whenFbq(cb: (f: Fn) => void) {
  if (!site.metaPixelId || typeof window === "undefined") return;
  let tries = 0;
  const run = () => {
    if (window.fbq) return cb(window.fbq);
    if (++tries < 25) setTimeout(run, 200);
  };
  run();
}

function fbq(...args: unknown[]) {
  whenFbq((f) => f(...args));
}

/** Antes do gtag.js carregar, empilhar no dataLayer tem o mesmo efeito. */
function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (window.gtag) return window.gtag(...args);
  window.dataLayer = window.dataLayer || [];
  // o gtag.js espera o objeto arguments, não um array
  (function (..._: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  })(...args);
}

export function trackPageView() {
  fbq("track", "PageView");
}

export type LeadMatch = {
  eventId: string;
  externalId: string;
  contentName: string;
  email: string;
  phoneE164: string;
  firstName: string;
  lastName: string;
  state: string;
  profile: string;
};

/**
 * Lead, chamado só depois que o webhook do n8n respondeu com sucesso.
 * Antes, reinicia o Pixel com a correspondência avançada (o Pixel faz o hash).
 * O eventID é o mesmo event_id enviado ao n8n, para deduplicar com a API de Conversões.
 */
export function trackLead(m: LeadMatch) {
  const uf = m.state.trim().toLowerCase();
  const userData: Record<string, string> = {
    em: m.email.trim().toLowerCase().replace(/\s+/g, ""),
    ph: m.phoneE164.replace(/\D/g, ""),
    fn: m.firstName.trim().toLowerCase(),
    country: "br",
    external_id: m.externalId,
  };
  if (m.lastName) userData.ln = m.lastName.trim().toLowerCase();
  if (/^[a-z]{2}$/.test(uf)) userData.st = uf;

  // init + track no mesmo disparo, para manter a ordem mesmo se o Pixel ainda estiver carregando
  whenFbq((f) => {
    f("init", site.metaPixelId, userData);
    f(
      "track",
      "Lead",
      { content_name: m.contentName, lead_profile: m.profile, lead_state: uf ? uf.toUpperCase() : "" },
      { eventID: m.eventId },
    );
  });
  const role = m.profile;
  const eventId = m.eventId;
  if (site.ga4Id) gtag("event", "generate_lead", { send_to: site.ga4Id, lead_source: m.contentName, lead_role: role, event_id: eventId });
  if (site.googleAdsId && site.googleAdsLeadLabel) {
    gtag("event", "conversion", { send_to: `${site.googleAdsId}/${site.googleAdsLeadLabel}`, transaction_id: eventId });
  }
}

export function trackViewContent() {
  fbq("track", "ViewContent", { content_name: "obrigado-ebook-mar-azul" });
}

export function trackJoinGroupClick() {
  fbq("trackCustom", "JoinGroupClick", { content_name: "grupo-telecom-adv" });
  if (site.ga4Id) gtag("event", "join_group_click", { send_to: site.ga4Id, group: "telecom-adv" });
}

/* ---------- Imersão ---------- */

const imersaoItem = (name: string, value: number) => ({
  item_id: name === "VIP" ? "imersao-vip" : "imersao-ingresso",
  item_name: `Imersão Telecom ADV · ${name}`,
  price: value,
  quantity: 1,
});

export function trackImersaoView(ticketPrice: number) {
  fbq("track", "ViewContent", { content_name: "Imersão Telecom ADV", content_type: "product", value: ticketPrice, currency: "BRL" });
  if (site.ga4Id) {
    gtag("event", "view_item", { send_to: site.ga4Id, currency: "BRL", value: ticketPrice, items: [imersaoItem("Ingresso", ticketPrice)] });
  }
}

/**
 * Clique em um botão de compra. O Purchase fica com o Pixel configurado na Hotmart.
 * `done` é chamado quando o GA4 confirma o envio (ou em até 800 ms), para só então
 * sair para o checkout sem perder o evento.
 */
export function trackInitiateCheckout(name: "Ingresso" | "VIP", value: number, done: () => void) {
  let called = false;
  const finish = () => {
    if (!called) {
      called = true;
      done();
    }
  };
  fbq("track", "InitiateCheckout", { content_name: name, value, currency: "BRL", num_items: 1 });
  if (site.ga4Id && window.gtag) {
    gtag("event", "begin_checkout", {
      send_to: site.ga4Id,
      currency: "BRL",
      value,
      items: [imersaoItem(name, value)],
      transport_type: "beacon",
      event_callback: finish,
    });
    setTimeout(finish, 800);
  } else {
    // dá tempo ao Pixel de enviar a requisição
    setTimeout(finish, 150);
  }
}

export function trackJoinInscritosClick() {
  fbq("trackCustom", "JoinGroupClick", { content_name: "grupo-inscritos-imersao" });
  if (site.ga4Id) gtag("event", "join_group_click", { send_to: site.ga4Id, group: "inscritos-imersao" });
}

/** Aplica a escolha do banner de cookies aos scripts de mídia. */
export function applyConsent(granted: boolean) {
  const v = granted ? "granted" : "denied";
  fbq("consent", granted ? "grant" : "revoke");
  if (site.ga4Id || site.googleAdsId) {
    gtag("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
  }
}
