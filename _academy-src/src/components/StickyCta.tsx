"use client";

import { useEffect, useState } from "react";

type Props = {
  targetId?: string;
  label?: React.ReactNode;
  /** Leva o foco ao primeiro campo do alvo (útil quando o alvo é um formulário). */
  focusFirstInput?: boolean;
};

/**
 * Botão fixo no rodapé (só no celular). Aparece depois que a pessoa rola além do
 * topo e some enquanto o alvo está visível, para não cobrir o conteúdo.
 */
export function StickyCta({ targetId = "formulario", label = "Quero o e-book", focusFirstInput = true }: Props) {
  const [targetVisible, setTargetVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setTargetVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(target);
    const onScroll = () => setScrolled(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [targetId]);

  const show = scrolled && !targetVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-gold/25 bg-abyss-deep/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href={`#${targetId}`}
        tabIndex={show ? 0 : -1}
        className="btn btn-gold w-full"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById(targetId);
          target?.scrollIntoView({ behavior: "smooth", block: "start" });
          if (focusFirstInput) {
            setTimeout(() => target?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true }), 500);
          }
        }}
      >
        {label}
      </a>
    </div>
  );
}
