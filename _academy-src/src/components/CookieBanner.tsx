"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, saveConsent, type Consent } from "@/lib/consent";
import { applyConsent } from "@/lib/track";

/** Aviso compacto, colado no rodapé, para não cobrir o formulário nem o botão do grupo. */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(readConsent() === null);
  }, []);

  if (!open) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    applyConsent(value === "granted");
    setOpen(false);
  };

  return (
    <section
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-mist/15 bg-abyss-deep/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] text-xs backdrop-blur md:inset-x-auto md:bottom-4 md:left-4 md:max-w-sm md:rounded-xl md:border md:p-4 md:text-sm"
    >
      <div className="flex items-center gap-3 md:flex-col md:items-stretch">
        <p className="flex-1 leading-snug text-mist">
          Usamos cookies para medir nossos anúncios.{" "}
          <Link href="/privacidade/" className="text-fiber underline underline-offset-2">
            Saiba mais
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose("denied")} className="btn btn-outline min-h-9 px-3 py-1.5 text-xs md:flex-1 md:text-sm">
            Recusar
          </button>
          <button type="button" onClick={() => choose("granted")} className="btn btn-gold min-h-9 px-3 py-1.5 text-xs md:flex-1 md:text-sm">
            Aceitar
          </button>
        </div>
      </div>
    </section>
  );
}
