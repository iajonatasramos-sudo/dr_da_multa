"use client";

import { useEffect, useState } from "react";
import { StickyCta } from "../StickyCta";
import { imersao } from "@/config/imersao";
import { checkoutUrl, dateTime, earlyBirdUntil, money, money2, type TicketKind } from "@/lib/imersao";
import { site } from "@/lib/site";
import { trackImersaoView, trackInitiateCheckout } from "@/lib/track";
import { Countdown, useSales } from "./Clock";

/** Botão de compra: monta a URL da Hotmart com a origem da visita no momento do clique. */
export function CheckoutButton({
  kind,
  children,
  className = "btn btn-gold",
}: {
  kind: TicketKind;
  children: React.ReactNode;
  className?: string;
}) {
  const sales = useSales();
  const value = kind === "vip" ? sales.vip : sales.ticket;
  // no HTML do build vai o checkout puro; no navegador, com a origem da visita
  const [href, setHref] = useState(site.hotmartCheckoutUrl || "#");
  useEffect(() => setHref(checkoutUrl(kind)), [kind]);
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        // Ctrl/Cmd+clique ou botão do meio: deixa o navegador abrir a aba normalmente
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        const url = checkoutUrl(kind);
        trackInitiateCheckout(kind === "vip" ? "VIP" : "Ingresso", value, () => {
          if (url !== "#") window.location.assign(url);
        });
      }}
    >
      {children}
    </a>
  );
}

/** Preço do ingresso no hero: cheio, ou riscado + lote com contagem até a virada. */
export function HeroPrice() {
  const sales = useSales();
  if (sales.closed) return <SalesClosed compact />;
  return (
    <div>
      <p className="text-sm text-mist">Ingresso</p>
      <p className="mt-1 flex items-baseline gap-3">
        {sales.earlyBird && (
          <s className="text-lg text-mist-dim tabular-nums">
            <span className="sr-only">De </span>
            {money(imersao.ticketPrice)}
          </s>
        )}
        <span className="font-display text-5xl leading-none text-cream tabular-nums">
          {sales.earlyBird && <span className="sr-only">por </span>}
          {money(sales.ticket)}
        </span>
      </p>
      <Installments value={sales.ticket} />
      {sales.earlyBird && (
        <p className="mt-2 text-sm text-gold">
          Valor de lançamento até {dateTime(earlyBirdUntil)} ·{" "}
          <Countdown target={earlyBirdUntil} label="para a virada do lote" size="sm" />
        </p>
      )}
      <CheckoutButton kind="ingresso" className="btn btn-gold mt-5 w-full sm:w-auto sm:px-8">
        Garantir meu ingresso
      </CheckoutButton>
    </div>
  );
}

export function Installments({ value }: { value: number }) {
  const i = imersao.installments;
  if (!i || value !== imersao.ticketPrice) return null;
  return (
    <p className="mt-1 text-sm text-mist-dim">
      ou em até {i.count}x de {money2(i.value)} no cartão
    </p>
  );
}

export function SalesClosed({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "rounded-2xl border border-gold/30 bg-abyss-deep p-6 text-center sm:p-8"}>
      <p className={compact ? "font-display text-3xl text-cream" : "font-display text-3xl text-cream sm:text-4xl"}>
        Inscrições encerradas
      </p>
      <p className="mt-2 text-mist">Entre na lista de espera e seja avisado quando abrir a próxima turma.</p>
      <a href={site.waitlistUrl || "#"} target="_blank" rel="noopener" className="btn btn-gold mt-5">
        Entrar na lista de espera da próxima turma
      </a>
    </div>
  );
}

export function ViewItemEvent() {
  const { ticket } = useSales();
  useEffect(() => {
    trackImersaoView(ticket);
    // dispara uma vez por visita
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/** Os dois botões do CTA final, ou a lista de espera depois do encerramento. */
export function FinalCheckout() {
  const sales = useSales();
  if (sales.closed) {
    return (
      <div className="mt-10 w-full">
        <SalesClosed />
      </div>
    );
  }
  return (
    <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <CheckoutButton kind="vip" className="btn btn-gold sm:px-8">
        Quero o VIP · {money(sales.vip)}
      </CheckoutButton>
      <CheckoutButton kind="ingresso" className="btn btn-outline sm:px-8">
        Quero o ingresso · {money(sales.ticket)}
      </CheckoutButton>
    </div>
  );
}

/** Botão fixo do celular; some quando as vendas encerram. */
export function ImersaoSticky() {
  const { closed, ticket } = useSales();
  if (closed) return null;
  return <StickyCta targetId="ingressos" label={`Garantir ingresso · ${money(ticket)}`} focusFirstInput={false} />;
}
