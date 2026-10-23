import type { Metadata } from "next";
import { Footer } from "@/components/Closing";
import { ClockProvider } from "@/components/imersao/Clock";
import { ImersaoSticky, ViewItemEvent } from "@/components/imersao/Purchase";
import { AudienceSplit, FinalCta, Guarantee, Hero, Hosts, Outcomes, Timeline, TopBar, Why } from "@/components/imersao/Sections";
import { Tickets } from "@/components/imersao/Tickets";
import { Faq, type FaqItem } from "@/components/Sections";
import { imersao } from "@/config/imersao";
import { datesLong, datesShort, day1, hour } from "@/lib/imersao";
import { whatsappLink, BASE_PATH } from "@/lib/site";

const title = `Imersão Telecom ADV | ${datesShort} · Online e ao vivo`;
const description = `Em 2 noites ao vivo (${datesLong}, ${hour(day1)} de Brasília), o Dr. Jason de Cerqueira Cesar mostra como atuar no Direito das Telecomunicações: causas, teses e captação de clientes dentro das regras da OAB.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${BASE_PATH}/imersao/` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${BASE_PATH}/imersao/`,
    siteName: "Telecom ADV Academy",
    title,
    description,
    images: [{ url: `${BASE_PATH}/img/og-imersao.png`, width: 1200, height: 630, alt: `Imersão Telecom ADV com o Dr. Jason de Cerqueira Cesar, ${datesLong}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/img/og-imersao.png"] },
};

const supportLink = whatsappLink("Olá! Tenho uma dúvida sobre a Imersão Telecom ADV.");

const FAQ: FaqItem[] = [
  { q: "Preciso ter experiência com telecom?", a: "Não. A imersão parte do zero e vai até a prática." },
  { q: "Vai ficar gravado?", a: `A gravação é exclusiva do ingresso VIP, com acesso por ${imersao.recordingDays} dias.` },
  { q: "Em qual plataforma vai ser?", a: "Ao vivo, online. O link é enviado no grupo dos inscritos e por e-mail." },
  { q: "Estudante pode participar?", a: "Sim, estudantes e bacharéis são bem-vindos." },
  { q: "E se eu não puder assistir ao vivo?", a: "Garanta o VIP para ter a gravação." },
  {
    q: "Como funciona a garantia?",
    a: `Você tem ${imersao.guaranteeDays} dias para pedir o reembolso, direto na Hotmart.`,
  },
  {
    q: "Tenho outra dúvida.",
    a: (
      <>
        <p>Fale com a nossa equipe pelo WhatsApp.</p>
        <a href={supportLink} target="_blank" rel="noopener" className="btn btn-outline mt-4">
          Tirar dúvida no WhatsApp
        </a>
      </>
    ),
  },
];

export default function ImersaoPage() {
  return (
    <ClockProvider>
      <ViewItemEvent />
      <a
        href="#ingressos"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-cream focus:px-4 focus:py-2 focus:text-abyss"
      >
        Ir para os ingressos
      </a>
      <TopBar />
      <main>
        <Hero />
        <Why />
        <Timeline />
        <Outcomes />
        <AudienceSplit />
        <Hosts />
        <Tickets />
        <Guarantee />
        <Faq items={FAQ} />
        <FinalCta />
      </main>
      <Footer />
      <ImersaoSticky />
    </ClockProvider>
  );
}
