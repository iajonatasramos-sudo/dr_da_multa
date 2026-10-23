"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { remaining, salesState } from "@/lib/imersao";

// "Agora" compartilhado pela página: um único timer de 1 s para todas as contagens,
// a troca de preço do lote e o encerramento das vendas.
// null = ainda no HTML do build (antes da hidratação).
const NowContext = createContext<number | null>(null);

export function ClockProvider({ children }: { children: React.ReactNode }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return <NowContext.Provider value={now}>{children}</NowContext.Provider>;
}

export const useNow = () => useContext(NowContext);
export const useSales = () => salesState(useNow());

const pad = (n: number) => String(n).padStart(2, "0");

type CountdownProps = {
  target: Date;
  /** Texto para leitores de tela, ex.: "até o Dia 1". */
  label: string;
  size?: "sm" | "lg";
  className?: string;
};

/**
 * Contagem regressiva. Os dígitos são visuais (aria-hidden) para o leitor de tela não
 * anunciar cada segundo; a versão acessível é um resumo em dias e horas.
 */
export function Countdown({ target, label, size = "lg", className = "" }: CountdownProps) {
  const now = useNow();
  const r = now === null ? null : remaining(target, now);
  const parts: [string, string][] = r
    ? [
        [String(r.days), r.days === 1 ? "dia" : "dias"],
        [pad(r.hours), "h"],
        [pad(r.minutes), "min"],
        [pad(r.seconds), "s"],
      ]
    : [
        ["–", "dias"],
        ["––", "h"],
        ["––", "min"],
        ["––", "s"],
      ];

  const sr = r ? `Faltam ${r.days} dias e ${r.hours} horas ${label}` : `Contagem ${label}`;

  if (size === "sm") {
    return (
      <span className={`tabular-nums ${className}`}>
        <span className="sr-only">{sr}</span>
        <span aria-hidden="true">
          {r ? `${r.days}d ${pad(r.hours)}h ${pad(r.minutes)}m ${pad(r.seconds)}s` : "–d ––h ––m ––s"}
        </span>
      </span>
    );
  }

  return (
    <div className={className}>
      <p className="sr-only">{sr}</p>
      <div aria-hidden="true" className="flex gap-2 sm:gap-3">
        {parts.map(([value, unit]) => (
          <div key={unit} className="min-w-[4.25rem] rounded-lg border border-mist/15 bg-abyss-deep/70 px-2 py-2.5 text-center sm:min-w-20">
            <div className="font-display text-3xl leading-none text-cream tabular-nums sm:text-4xl">{value}</div>
            <div className="mt-1 text-[0.6875rem] tracking-[0.15em] text-mist-dim uppercase">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
