// As ofertas que o formulário de lead atende. Cada uma tem o seu texto de
// consentimento (fica gravado no lead, para a LGPD) e o seu webhook no n8n.

import type { LeadOffer } from "./lead";
import { site } from "./site";

export const ebookOffer: LeadOffer = {
  id: "ebook-mar-azul-da-advocacia",
  consentText:
    "Concordo em receber o e-book e comunicações da Telecom ADV Academy por e-mail e WhatsApp, conforme a Política de Privacidade.",
  get webhookUrl() {
    return site.leadWebhookUrl;
  },
};

export const listaEsperaOffer: LeadOffer = {
  id: "imersao-telecom-adv-lista-espera",
  consentText:
    "Concordo em receber avisos sobre a Imersão Telecom ADV por e-mail e WhatsApp, conforme a Política de Privacidade.",
  get webhookUrl() {
    return site.waitlistWebhookUrl;
  },
};
