"use client";

import { imersao } from "@/config/imersao";
import { hourRange, money } from "@/lib/imersao";
import { IconCheck, IconLock, IconMinus } from "../Icons";
import { useSales } from "./Clock";
import { Installments, SalesClosed } from "./Purchase";
import { WaitlistButton } from "./Waitlist";

const FEATURES: { label: string; vipOnly?: boolean }[] = [
  { label: "2 dias ao vivo, das " + hourRange },
  { label: "Caderno da imersão (PDF)" },
  { label: "Grupo exclusivo dos inscritos" },
  { label: `Gravação dos 2 dias (${imersao.recordingDays} dias de acesso)`, vipOnly: true },
  { label: "Sessão extra de perguntas com o Jason", vipOnly: true },
  { label: "Kit de modelos de peças", vipOnly: true },
];

function FeatureList({ vip }: { vip: boolean }) {
  return (
    <ul className="mt-6 space-y-3">
      {FEATURES.map(({ label, vipOnly }) => {
        const included = vip || !vipOnly;
        return (
          <li key={label} className={`flex items-start gap-3 ${included ? "text-cream" : "text-mist-dim"}`}>
            {included ? (
              <IconCheck className={`mt-0.5 size-5 shrink-0 ${vip && vipOnly ? "text-gold" : "text-fiber"}`} />
            ) : (
              <IconMinus className="mt-0.5 size-5 shrink-0" />
            )}
            <span>
              {!included && <span className="sr-only">Não inclui: </span>}
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function Tickets() {
  const sales = useSales();

  return (
    <section id="ingressos" aria-labelledby="ingressos-titulo" className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
      <p className="seal">Ingressos</p>
      <h2 id="ingressos-titulo" className="mt-4 text-4xl leading-tight sm:text-5xl">
        Escolha seu ingresso
      </h2>

      {sales.closed ? (
        <div className="mt-10">
          <SalesClosed />
        </div>
      ) : (
        <>
          {sales.earlyBird && (
            <p className="mt-4 text-gold">
              Valor de lançamento: de <s>{money(imersao.ticketPrice)}</s> por {money(sales.ticket)} até a virada do lote.
            </p>
          )}

          {/* No celular o VIP vem primeiro (order), no desktop fica à direita */}
          <div className="mt-10 grid gap-5 md:grid-cols-2 md:items-stretch">
            <article
              aria-labelledby="t-ingresso"
              className="order-2 flex flex-col rounded-2xl border border-mist/15 bg-abyss p-6 sm:p-8 md:order-1"
            >
              <h3 id="t-ingresso" className="font-sans text-sm font-bold tracking-[0.18em] text-mist uppercase">
                Ingresso
              </h3>
              <p className="mt-3 flex items-baseline gap-3">
                {sales.earlyBird && <s className="text-mist-dim tabular-nums">{money(imersao.ticketPrice)}</s>}
                <span className="font-display text-5xl text-cream tabular-nums">{money(sales.ticket)}</span>
              </p>
              <Installments value={sales.ticket} />
              <FeatureList vip={false} />
              <div className="mt-auto pt-8">
                <WaitlistButton className="btn btn-outline w-full">Avise-me quando abrir</WaitlistButton>
              </div>
            </article>

            <article
              aria-labelledby="t-vip"
              className="relative order-1 flex flex-col rounded-2xl border-2 border-gold bg-[linear-gradient(160deg,#123A7A_0%,#0A1A3F_55%)] p-6 shadow-[0_30px_80px_-30px_rgb(201_165_92/0.45)] sm:p-8 md:order-2"
            >
              {imersao.vipBadge && (
                <p className="absolute -top-3.5 left-6 rounded-full bg-gold px-3 py-1 text-xs font-bold tracking-[0.12em] text-abyss uppercase">
                  {imersao.vipBadge}
                </p>
              )}
              <h3 id="t-vip" className="font-sans text-sm font-bold tracking-[0.18em] text-gold uppercase">
                Ingresso VIP
              </h3>
              <p className="mt-3 font-display text-5xl text-cream tabular-nums">{money(sales.vip)}</p>
              <p className="mt-1 text-sm text-mist-dim tabular-nums">
                {money(sales.ticket)} do ingresso + {money(imersao.vipPrice)} do VIP
              </p>
              <FeatureList vip />
              <div className="mt-auto pt-8">
                <WaitlistButton className="btn btn-gold w-full">Avise-me quando abrir</WaitlistButton>
              </div>
            </article>
          </div>

          <p className="mt-6 text-center text-sm text-mist">
            A gravação é exclusiva do VIP. Quem tem só o ingresso assiste ao vivo.
          </p>

          {imersao.ticketCreditOnCourse && (
            <p className="mx-auto mt-4 w-fit rounded-full border border-gold/40 px-4 py-2 text-center text-sm text-gold">
              O valor do ingresso vira desconto no curso, para quem decidir continuar.
            </p>
          )}

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-mist-dim">
            <IconLock className="size-4" /> Pagamento seguro pela Hotmart · Garantia de {imersao.guaranteeDays} dias
          </p>
        </>
      )}
    </section>
  );
}
