"use client";

import { LeadForm } from "../LeadForm";

export const WAITLIST_ID = "lista-espera";

/**
 * Botão que leva ao formulário da lista de espera. Rola até ele e põe o foco no
 * primeiro campo, como o botão fixo do rodapé já faz.
 */
export function WaitlistButton({
  children,
  className = "btn btn-gold",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`#${WAITLIST_ID}`}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        const alvo = document.getElementById(WAITLIST_ID);
        alvo?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => alvo?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true }), 500);
      }}
    >
      {children}
    </a>
  );
}

/** A seção com o formulário. Depois do envio, o próprio formulário vira a confirmação. */
export function WaitlistSection() {
  return (
    <section
      id={WAITLIST_ID}
      aria-labelledby="lista-espera-titulo"
      className="mx-auto max-w-2xl scroll-mt-20 px-5 py-16 sm:py-24"
    >
      <p className="seal">Inscrições em breve</p>
      <h2 id="lista-espera-titulo" className="mt-4 text-4xl leading-tight sm:text-5xl">
        Garanta seu lugar na fila
      </h2>
      <p className="mt-4 leading-relaxed text-mist">
        As vagas abrem para a lista de espera primeiro. Deixe seus dados e avisamos assim que as inscrições começarem.
      </p>
      <div className="mt-8">
        <LeadForm id="lista-espera-form" variant="lista-espera" />
      </div>
    </section>
  );
}
