import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Closing";
import { FiberWaves } from "@/components/FiberWaves";
import { IconCheck, IconDownload } from "@/components/Icons";
import { Greeting, JoinGroupButton, VideoFacade, ViewContentEvent } from "@/components/ThankYou";
import { site, BASE_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "E-book garantido · Telecom ADV Academy",
  robots: { index: false, follow: false },
  alternates: { canonical: `${BASE_PATH}/obrigado/` },
};

const PERKS = ["Decisões recentes comentadas", "Casos reais, anonimizados", "Avisos das lives semanais"];

export default function Obrigado() {
  return (
    <>
      <ViewContentEvent />
      <main className="relative isolate min-h-dvh overflow-hidden bg-[radial-gradient(110%_70%_at_50%_0%,#123A7A_0%,#0A1A3F_60%)]">
        <FiberWaves className="absolute inset-x-0 bottom-0 -z-10 h-[60%] w-full opacity-50" />

        <div className="mx-auto max-w-2xl px-5 pt-6 pb-16 sm:pt-12">
          {/* Progresso */}
          <div>
            <p className="flex items-baseline justify-between text-sm font-semibold text-cream">
              <span>Passo 2 de 2</span>
              <span className="text-gold">Falta só um passo!</span>
            </p>
            <div
              role="progressbar"
              aria-label="Progresso do cadastro"
              aria-valuemin={0}
              aria-valuemax={2}
              aria-valuenow={2}
              aria-valuetext="Passo 2 de 2"
              className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-mist/15"
            >
              <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-gold to-fiber" />
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
            <Suspense fallback={<h1 className="text-[2.3rem] leading-[1.02] sm:text-6xl">Seu e-book está garantido!</h1>}>
              <Greeting />
            </Suspense>
            <p className="mt-4 leading-relaxed text-mist sm:text-lg">
              Enviamos o e-book para o seu e-mail e WhatsApp. Você também pode baixar agora.
            </p>
            <a href={site.ebookUrl} target="_blank" rel="noopener" className="btn btn-outline mt-5">
              <IconDownload className="size-5" />
              Baixar o e-book
            </a>
          </div>

          {/* O bloco que importa */}
          <section
            aria-labelledby="grupo-titulo"
            className="relative mt-8 rounded-2xl border-2 border-whatsapp/60 bg-abyss-deep/90 p-6 shadow-[0_0_0_6px_rgb(37_211_102/0.08),0_30px_80px_-30px_rgb(0_0_0/0.9)] sm:p-8"
          >
            <p className="text-xs font-bold tracking-[0.22em] text-whatsapp uppercase">Último passo</p>
            <h2 id="grupo-titulo" className="mt-2 text-3xl leading-tight sm:text-4xl">
              Entre no grupo Telecom ADV
            </h2>
            <p className="mt-4 leading-relaxed text-mist">
              É no grupo que acontecem as lives semanais com o Dr. Jason,{" "}
              <strong className="font-semibold text-cream">às quintas, 20h</strong>. Você vai ver casos reais, decisões
              comentadas e como atuar nessa área na prática.
            </p>
            <div className="mt-6">
              <JoinGroupButton />
            </div>

            <h3 className="mt-8 font-sans text-sm font-semibold text-cream">O que você recebe no grupo</h3>
            <ul className="mt-3 space-y-2.5">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-mist">
                  <IconCheck className="size-5 shrink-0 text-whatsapp" />
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10">
            <VideoFacade />
          </div>
        </div>
      </main>
      <Footer minimal />
    </>
  );
}
