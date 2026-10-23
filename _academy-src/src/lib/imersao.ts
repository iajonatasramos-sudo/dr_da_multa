// Regras derivadas da configuração da imersão: preço vigente, fase da venda,
// formatação no fuso de Brasília, link do checkout e agenda.

import { imersao } from "@/config/imersao";
import { getAttribution } from "./attribution";
import { site } from "./site";

export const TZ = "America/Sao_Paulo";

export const day1 = new Date(imersao.day1);
export const day2 = new Date(imersao.day2);
export const salesClose = new Date(imersao.salesClose);
export const earlyBirdUntil = new Date(imersao.earlyBird.until);

/* ---------- Preço e fase ---------- */

export type SalesState = {
  closed: boolean;
  earlyBird: boolean;
  ticket: number;
  vip: number;
};

/**
 * Estado da venda em um instante. `now = null` é a renderização do build
 * (antes do navegador saber a hora): assume vendas abertas e lote conforme a config.
 */
export function salesState(now: number | null): SalesState {
  const early = imersao.earlyBird.enabled && (now === null || now < earlyBirdUntil.getTime());
  const ticket = early ? imersao.earlyBird.price : imersao.ticketPrice;
  return {
    closed: now !== null && now >= salesClose.getTime(),
    earlyBird: early,
    ticket,
    vip: ticket + imersao.vipPrice,
  };
}

/* ---------- Formatação (sempre em Brasília) ---------- */

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 2 });
const brl2 = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

/** R$ 97 (sem centavos quando inteiro). */
export const money = (v: number) => brl.format(v);
export const money2 = (v: number) => brl2.format(v);

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, ...opts });

/** "01" */
export const dayNum = (d: Date) => fmt({ day: "2-digit" }).format(d);
/** "01/12" */
export const dayMonth = (d: Date) => fmt({ day: "2-digit", month: "2-digit" }).format(d);
/** "dezembro" */
export const monthName = (d: Date) => fmt({ month: "long" }).format(d);
/** "terça-feira" */
export const weekday = (d: Date) => fmt({ weekday: "long" }).format(d);
/** "19h30" */
export const hour = (d: Date) => {
  const [h, m] = fmt({ hour: "2-digit", minute: "2-digit", hour12: false }).format(d).split(":");
  return m === "00" ? `${h}h` : `${h}h${m}`;
};

/** Fim de cada dia, pela duração configurada. */
export const dayEnd = (d: Date) => new Date(d.getTime() + imersao.durationMinutes * 60_000);

/** "10h às 16h" */
export const hourRange = `${hour(day1)} às ${hour(dayEnd(day1))}`;

/** "sábado e domingo" */
export const weekdays = `${weekday(day1)} e ${weekday(day2)}`;

/** "01 e 02 de dezembro" (ou "30/11 e 01/12" se os meses forem diferentes). */
export const datesLong =
  monthName(day1) === monthName(day2)
    ? `${dayNum(day1)} e ${dayNum(day2)} de ${monthName(day1)}`
    : `${dayMonth(day1)} e ${dayMonth(day2)}`;

/** "01 e 02/12" */
export const datesShort =
  monthName(day1) === monthName(day2) ? `${dayNum(day1)} e ${dayMonth(day2)}` : `${dayMonth(day1)} e ${dayMonth(day2)}`;

/** "08/11 às 23h59" */
export const dateTime = (d: Date) => `${dayMonth(d)} às ${hour(d)}`;

/* ---------- Contagem ---------- */

export function remaining(target: Date, now: number) {
  const ms = Math.max(0, target.getTime() - now);
  const s = Math.floor(ms / 1000);
  return { done: ms === 0, days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

/* ---------- Checkout ---------- */

export type TicketKind = "ingresso" | "vip";

/**
 * URL do checkout da Hotmart com a origem da visita: `src` (o recebido na URL ou,
 * na falta, a campanha/fonte da UTM) e as UTMs guardadas na sessão.
 */
export function checkoutUrl(kind: TicketKind) {
  const base = kind === "vip" ? site.hotmartCheckoutVipUrl || site.hotmartCheckoutUrl : site.hotmartCheckoutUrl;
  if (!base) return "#";
  if (typeof window === "undefined") return base;
  const a = getAttribution();
  const url = new URL(base);
  const src = a.src || [a.utm_source, a.utm_campaign].filter(Boolean).join("_") || "site-imersao";
  url.searchParams.set("src", src);
  if (a.sck) url.searchParams.set("sck", a.sck);
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
    if (a[key]) url.searchParams.set(key, a[key]);
  }
  return url.toString();
}

/* ---------- Agenda ---------- */

const end = (d: Date) => new Date(d.getTime() + imersao.durationMinutes * 60_000);
const utcStamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export const sessions = [
  { label: "Dia 1", title: `${imersao.eventName} · Dia 1: O Mercado`, start: day1, end: end(day1) },
  { label: "Dia 2", title: `${imersao.eventName} · Dia 2: O Método`, start: day2, end: end(day2) },
];

const calendarDetails = "Online e ao vivo. O link da transmissão é enviado no grupo dos inscritos e por e-mail.";

export const googleCalendarUrl = (s: (typeof sessions)[number]) => {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: s.title,
    dates: `${utcStamp(s.start)}/${utcStamp(s.end)}`,
    details: calendarDetails,
    location: "Online",
    ctz: TZ,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
};

export const ICS_PATH = "/imersao/imersao-telecom-adv.ics";

export function icsContent() {
  const esc = (t: string) => t.replace(/[\\,;]/g, (c) => `\\${c}`);
  const stamp = utcStamp(new Date(imersao.day1));
  const events = sessions.flatMap((s, i) => [
    "BEGIN:VEVENT",
    `UID:imersao-telecom-adv-${utcStamp(s.start)}-${i}@telecomadv.academy`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${utcStamp(s.start)}`,
    `DTEND:${utcStamp(s.end)}`,
    `SUMMARY:${esc(s.title)}`,
    `DESCRIPTION:${esc(calendarDetails)}`,
    "LOCATION:Online",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(s.title)} começa em 1 hora`,
    "END:VALARM",
    "END:VEVENT",
  ]);
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Telecom ADV Academy//Imersao//PT-BR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", ...events, "END:VCALENDAR"]
    .map(fold)
    .join("\r\n") + "\r\n";
}

/** RFC 5545: linhas com mais de 75 bytes continuam na linha seguinte, iniciada por espaço. */
function fold(line: string) {
  const bytes = new TextEncoder();
  const out: string[] = [];
  let current = "";
  for (const ch of line) {
    const limit = out.length === 0 ? 75 : 74;
    if (bytes.encode(current + ch).length > limit) {
      out.push(current);
      current = ch;
    } else {
      current += ch;
    }
  }
  out.push(current);
  return out.join("\r\n ");
}
