// Configuração lida das variáveis NEXT_PUBLIC_* (gravadas no build).
// O acesso precisa ser literal (process.env.NEXT_PUBLIC_X) para o Next substituir o valor.

const clean = (v: string | undefined) => (v ?? "").trim();

// A subpasta onde o academy é publicado dentro do site do Dr. Da Multa.
// Precisa ser igual ao basePath do next.config.ts.
export const BASE_PATH = "/academy";

export const site = {
  basePath: BASE_PATH,
  url: clean(process.env.NEXT_PUBLIC_SITE_URL) || "https://telecomadv.academy",
  name: "Telecom ADV Academy",
  leadWebhookUrl: clean(process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL),
  waitlistWebhookUrl: clean(process.env.NEXT_PUBLIC_WAITLIST_WEBHOOK_URL),
  whatsappGroupUrl: clean(process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL),
  ebookUrl: clean(process.env.NEXT_PUBLIC_EBOOK_URL) || `${BASE_PATH}/ebook/o-mar-azul-da-advocacia.pdf`,
  supportWhatsapp: clean(process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP) || "5511973733366",
  youtubeVideoId: clean(process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID),
  metaPixelId: clean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  ga4Id: clean(process.env.NEXT_PUBLIC_GA4_ID),
  googleAdsId: clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID),
  googleAdsLeadLabel: clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL),
  // Imersão
  hotmartCheckoutUrl: clean(process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL),
  hotmartCheckoutVipUrl: clean(process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_VIP_URL),
  whatsappInscritosUrl: clean(process.env.NEXT_PUBLIC_WHATSAPP_INSCRITOS_URL),
  waitlistUrl: clean(process.env.NEXT_PUBLIC_WAITLIST_URL),
} as const;

export const whatsappLink = (text: string) => `https://wa.me/${site.supportWhatsapp}?text=${encodeURIComponent(text)}`;

export const supportWhatsappLink = whatsappLink(
  "Olá! Tentei baixar o e-book O Mar Azul da Advocacia e o formulário deu erro.",
);
