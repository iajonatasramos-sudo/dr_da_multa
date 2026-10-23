import { BASE_PATH } from "@/lib/site";
import type { Metadata } from "next";
import { Footer } from "@/components/Closing";
import { FiberWaves } from "@/components/FiberWaves";
import { IconCalendar, IconCheck, IconDownload, IconWhatsApp } from "@/components/Icons";
import { JoinInscritosButton } from "@/components/imersao/ThankYou";
import { imersao } from "@/config/imersao";
import { day1, dayMonth, googleCalendarUrl, hourRange, ICS_PATH, sessions } from "@/lib/imersao";

export const metadata: Metadata = {
  title: `Inscrição confirmada · ${imersao.eventName}`,
  robots: { index: false, follow: false },
  alternates: { canonical: `${BASE_PATH}/imersao/obrigado/` },
};

const PREP = [
  "Separe um caderno para as anotações",
  `Reserve os dois dias, das ${hourRange} (Brasília)`,
  "Anote suas dúvidas para a sessão de perguntas",
];

export default function ImersaoObrigado() {
  return (
    <>
      <main className="relative isolate min-h-dvh overflow-hidden bg-[radial-gradient(110%_70%_at_50%_0%,#123A7A_0%,#0A1A3F_60%)]">
        <FiberWaves className="absolute inset-x-0 bottom-0 -z-10 h-[50%] w-full opacity-50" />
        <div className="mx-auto max-w-2xl px-5 pt-10 pb-16 sm:pt-14">
          <p className="seal">{imersao.eventName}</p>
          <h1 className="mt-5 text-[2.3rem] leading-[1.02] sm:text-6xl">
            Inscrição confirmada! Nos vemos dia {dayMonth(day1)}.
          </h1>

          {/* Passo principal */}
          <section
            aria-labelledby="grupo-titulo"
            className="mt-8 rounded-2xl border-2 border-whatsapp/60 bg-abyss-deep/90 p-6 shadow-[0_0_0_6px_rgb(37_211_102/0.08),0_30px_80px_-30px_rgb(0_0_0/0.9)] sm:p-8"
          >
            <p className="text-xs font-bold tracking-[0.22em] text-whatsapp uppercase">Agora</p>
            <h2 id="grupo-titulo" className="mt-2 text-3xl leading-tight sm:text-4xl">
              Entre no grupo dos inscritos
            </h2>
            <p className="mt-4 leading-relaxed text-mist">
              É por lá que enviamos o link da transmissão, o caderno da imersão e os lembretes.
            </p>
            <div className="mt-6">
              <JoinInscritosButton>
                <IconWhatsApp className="size-6 shrink-0" />
                Entrar no grupo dos inscritos
              </JoinInscritosButton>
            </div>
          </section>

          {/* Agenda */}
          <section aria-labelledby="agenda-titulo" className="mt-10">
            <h2 id="agenda-titulo" className="text-2xl sm:text-3xl">
              Salve as datas na sua agenda
            </h2>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {sessions.map((s) => (
                <a key={s.label} href={googleCalendarUrl(s)} target="_blank" rel="noopener" className="btn btn-outline">
                  <IconCalendar className="size-5" />
                  Google Agenda · {s.label} ({dayMonth(s.start)})
                </a>
              ))}
              <a href={ICS_PATH} download="imersao-telecom-adv.ics" className="btn btn-outline">
                <IconDownload className="size-5" />
                Baixar .ics (os 2 dias)
              </a>
            </div>
            <p className="mt-3 text-sm text-mist-dim">O arquivo .ics funciona no iPhone, Outlook e Google Agenda.</p>
          </section>

          <p className="mt-10 rounded-xl border border-gold/30 bg-abyss-deep/60 p-5 leading-relaxed text-mist">
            <span className="font-semibold text-gold">Comprou o VIP?</span> O acesso à gravação e à sessão extra será
            enviado no grupo e por e-mail.
          </p>

          <section aria-labelledby="prep-titulo" className="mt-10">
            <h2 id="prep-titulo" className="text-2xl sm:text-3xl">
              Como se preparar
            </h2>
            <ul className="mt-5 space-y-3">
              {PREP.map((p) => (
                <li key={p} className="flex items-center gap-3 text-cream">
                  <IconCheck className="size-5 shrink-0 text-fiber" />
                  {p}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer minimal />
    </>
  );
}
