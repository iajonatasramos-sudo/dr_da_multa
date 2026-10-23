import { imersao } from "@/config/imersao";
import { datesLong, datesShort, day1, day2, dayMonth, hour, weekday } from "@/lib/imersao";
import { FiberWaves } from "../FiberWaves";
import { IconBroadcast, IconCalendar, IconCheck, IconClock, IconTag, IconX } from "../Icons";
import { Picture } from "../Picture";
import { Countdown } from "./Clock";
import { FinalCheckout, HeroPrice } from "./Purchase";

export function TopBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-gold/20 bg-abyss-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-0.5 px-4 py-2 text-center text-xs sm:justify-between sm:text-sm">
        <p className="text-mist">
          Imersão online · <span className="text-cream">{datesLong}</span> · {hour(day1)} (Brasília)
        </p>
        <p className="text-gold">
          Começa em <Countdown target={day1} label="para o Dia 1" size="sm" className="font-semibold" />
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const infos = [
    { icon: IconCalendar, text: datesShort },
    { icon: IconClock, text: `${hour(day1)} (Brasília)` },
    { icon: IconBroadcast, text: imersao.format },
    { icon: IconTag, text: "Vagas pelo valor de lançamento" },
  ];
  return (
    <section aria-labelledby="hero-titulo" className="relative isolate overflow-hidden bg-[radial-gradient(120%_80%_at_80%_0%,#123A7A_0%,#0A1A3F_55%,#071331_100%)]">
      <FiberWaves className="absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full opacity-80" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 pb-14 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-14 lg:pb-20">
        <div>
          <p className="seal">
            Imersão online e ao vivo<span className="hidden sm:inline">&nbsp;· Telecom ADV Academy</span>
          </p>
          <h1 id="hero-titulo" className="mt-6 text-[3rem] leading-[0.95] sm:text-7xl lg:text-[5.2rem]">
            Imersão <span className="block">Telecom ADV</span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-mist sm:text-lg">
            Em 2 noites, o Dr. Jason de Cerqueira Cesar mostra como atuar no Direito das Telecomunicações: as causas, as
            teses e o caminho para construir uma carteira de clientes nesse mar azul da advocacia.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-cream sm:flex sm:flex-wrap sm:gap-x-6">
            {infos.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="size-5 shrink-0 text-fiber" />
                {text}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-gold/25 bg-abyss-deep/70 p-5 backdrop-blur sm:w-fit sm:p-6">
            <HeroPrice />
            <p className="mt-3 text-xs text-mist-dim">
              Pagamento seguro pela Hotmart · Garantia de {imersao.guaranteeDays} dias
            </p>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative overflow-hidden rounded-2xl border border-gold/30">
            <Picture
              name="jason-imersao"
              widths={[420, 840]}
              ratio={5 / 4}
              alt="Dr. Jason de Cerqueira Cesar"
              sizes="(min-width: 1024px) 416px, (min-width: 640px) 384px, 90vw"
              priority
              className="block h-auto w-full"
            />
            {/* o oceano da identidade sobe por cima da foto */}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-abyss via-abyss/70 to-transparent" />
            <FiberWaves className="absolute inset-x-0 bottom-0 h-1/2 w-full" />
          </div>
          <figcaption className="absolute bottom-4 left-5 text-sm text-cream">
            Dr. Jason de Cerqueira Cesar
            <span className="block text-xs text-mist-dim">20 anos dentro das operadoras</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section aria-labelledby="porque-titulo" className="border-y border-gold/20 bg-abyss-deep">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="seal">Por que essa imersão existe</p>
          <h2 id="porque-titulo" className="mt-4 text-4xl leading-[1.05] sm:text-5xl">
            A demanda existe. <span className="text-fiber">O que falta é advogado preparado.</span>
          </h2>
        </div>
        <div className="lg:pt-10">
          <p className="text-lg leading-relaxed text-mist">
            Mais de <strong className="font-semibold text-cream">1,3 milhão de reclamações</strong> contra operadoras foram
            registradas na Anatel só em 2025. Pessoas e empresas cobradas indevidamente, presas a multas de fidelização e
            negativadas por dívidas que não existem. E quase nenhum advogado especializado para atendê-las.
          </p>
          <p className="mt-6 text-xs text-mist-dim">Fonte: Anatel, Panorama de Reclamações 2025.</p>
        </div>
      </div>
    </section>
  );
}

const DAYS = [
  {
    date: day1,
    name: "O Mercado",
    items: [
      "A história de quem passou 20 anos dentro das operadoras e hoje atua contra elas",
      "O tamanho real do problema: onde estão os clientes e por que ninguém os atende",
      "As principais teses explicadas com casos reais (anonimizados)",
      "Quanto essa área pode representar para o seu escritório",
      "Tarefa prática para o Dia 2",
    ],
  },
  {
    date: day2,
    name: "O Método",
    items: [
      "Do primeiro atendimento ao êxito: o passo a passo de um caso",
      "Triagem: como identificar o caso que vale a ação (e o que não vale)",
      "Captação de clientes dentro das regras da OAB, com Jonatas Ramos (estratégia e marketing)",
      "Perguntas ao vivo",
      "Apresentação do próximo passo para quem quiser se aprofundar",
    ],
  },
];

/** As duas noites como dois pontos de luz no mesmo fio de fibra. */
export function Timeline() {
  return (
    <section aria-labelledby="programa-titulo" className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
      <p className="seal">Programação</p>
      <h2 id="programa-titulo" className="mt-4 text-4xl leading-tight sm:text-5xl">
        Duas noites, do mercado ao método
      </h2>
      <ol className="relative mt-12 space-y-14 pl-10 sm:pl-14">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-gradient-to-b from-fiber via-fiber/60 to-fiber/10 sm:left-[1.1875rem]"
        />
        {DAYS.map((d, i) => (
          <li key={d.name} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-10 flex size-6 items-center justify-center rounded-full bg-abyss ring-1 ring-fiber/60 sm:-left-14 sm:size-10"
            >
              <span className="size-2.5 rounded-full bg-fiber shadow-[0_0_14px_4px_rgb(56_198_244/0.55)] sm:size-3" />
            </span>
            <p className="text-sm font-semibold tracking-[0.16em] text-gold uppercase">
              Dia {i + 1} · {dayMonth(d.date)} · {weekday(d.date)}, {hour(d.date)}
            </p>
            <h3 className="mt-2 text-3xl sm:text-4xl">{d.name}</h3>
            <ul className="mt-5 space-y-3">
              {d.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-mist">
                  <span aria-hidden="true" className="mt-[0.7rem] h-px w-4 shrink-0 bg-fiber/70" />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

const OUTCOMES = [
  "Quais são as 7 causas que mais aparecem e como reconhecê-las",
  "Como funciona um contrato de telecom por dentro: fidelização, renovação, multas e contratos corporativos",
  "Quais provas pedir ao cliente desde o primeiro contato",
  "Como montar uma triagem que filtra casos sem perder tempo",
  "Como se posicionar como especialista e atrair clientes de forma ética",
];

export function Outcomes() {
  return (
    <section aria-labelledby="sabendo-titulo" className="bg-abyss-deep">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <p className="seal">Ao final</p>
        <h2 id="sabendo-titulo" className="mt-4 text-4xl leading-tight sm:text-5xl">
          O que você vai sair sabendo
        </h2>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-mist/10 bg-mist/10 md:grid-cols-2">
          {OUTCOMES.map((o) => (
            <li key={o} className="flex gap-4 bg-abyss-deep p-6 last:md:col-span-2">
              <IconCheck className="size-6 shrink-0 text-fiber" />
              <span className="leading-relaxed text-cream">{o}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FOR = [
  "Advogados que querem um nicho com pouca concorrência",
  "Advogados de consumidor que querem sair da disputa por preço",
  "Recém-formados e bacharéis buscando uma área",
  "Estudantes de Direito que querem sair na frente",
];
const NOT_FOR = ["Quem procura fórmula mágica ou ganho garantido", "Quem não está disposto a estudar e atender clientes"];

export function AudienceSplit() {
  return (
    <section aria-labelledby="publico-titulo" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <h2 id="publico-titulo" className="sr-only">
        Para quem é a imersão
      </h2>
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-fiber/30 p-6 sm:p-8">
          <h3 className="text-3xl">É para</h3>
          <ul className="mt-6 space-y-4">
            {FOR.map((t) => (
              <li key={t} className="flex gap-3 text-lg leading-snug text-cream">
                <IconCheck className="mt-0.5 size-6 shrink-0 text-fiber" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-mist/15 p-6 sm:p-8">
          <h3 className="text-3xl text-mist">Não é para</h3>
          <ul className="mt-6 space-y-4">
            {NOT_FOR.map((t) => (
              <li key={t} className="flex gap-3 text-lg leading-snug text-mist">
                <IconX className="mt-0.5 size-6 shrink-0 text-mist-dim" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Hosts() {
  return (
    <section aria-labelledby="conduz-titulo" className="bg-abyss-deep">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <p className="seal">Quem conduz</p>
        <h2 id="conduz-titulo" className="sr-only">
          Quem conduz a imersão
        </h2>
        <div className="mt-8 grid items-center gap-10 md:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr] lg:gap-16">
          <div className="relative mx-auto w-64 md:w-full">
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-gold/50" />
            <Picture
              name="jason"
              widths={[420, 840]}
              ratio={5 / 4}
              alt="Dr. Jason de Cerqueira Cesar em seu escritório"
              sizes="(min-width: 1024px) 352px, (min-width: 768px) 288px, 256px"
              className="relative block h-auto w-full rounded-xl"
            />
          </div>
          <div>
            <h3 className="text-4xl leading-tight sm:text-5xl">Dr. Jason de Cerqueira Cesar</h3>
            <p className="mt-5 max-w-2xl leading-relaxed text-mist">
              Dr. Jason de Cerqueira Cesar é advogado, fundador do Cerqueira Cesar Advocacia e criador do Dr. da Multa
              Telecom. Passou mais de 20 anos dentro do setor de telecomunicações, em empresas como Vivo, Claro e Nextel,
              e há mais de uma década atua na defesa de consumidores e empresas contra práticas abusivas de operadoras, em
              todo o Brasil.
            </p>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-5 border-t border-mist/10 pt-8 md:ml-[calc(18rem+2.5rem)] lg:ml-[calc(22rem+4rem)]">
          {/* Foto do Jonatas: troque por <Picture name="jonatas" .../> quando houver public/img/jonatas-*.webp */}
          <div
            aria-hidden="true"
            className="flex size-16 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-abyss font-display text-xl text-gold"
          >
            JR
          </div>
          <p className="leading-relaxed text-mist">
            <span className="font-semibold text-cream">Participação: Jonatas Ramos</span>, estrategista de marketing e
            tecnologia, responsável pela estrutura de captação e atendimento digital.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Guarantee() {
  return (
    <section aria-labelledby="garantia-titulo" className="mx-auto max-w-4xl px-5 pb-8">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-gold/30 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
        <div
          aria-hidden="true"
          className="flex size-24 shrink-0 flex-col items-center justify-center rounded-full border-2 border-gold text-gold"
        >
          <span className="font-display text-4xl leading-none">{imersao.guaranteeDays}</span>
          <span className="text-[0.625rem] font-bold tracking-[0.18em] uppercase">dias</span>
        </div>
        <div>
          <h2 id="garantia-titulo" className="text-2xl sm:text-3xl">
            Garantia incondicional de {imersao.guaranteeDays} dias
          </h2>
          <p className="mt-2 leading-relaxed text-mist">
            Se você participar e achar que não valeu, peça o reembolso em até {imersao.guaranteeDays} dias pela própria
            Hotmart. Sem perguntas.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="final-titulo" className="relative isolate overflow-hidden bg-abyss-deep">
      <FiberWaves className="absolute inset-0 -z-10 h-full w-full opacity-60" />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-20 text-center sm:py-28">
        <h2 id="final-titulo" className="text-4xl leading-[1.05] sm:text-6xl">
          Daqui a 2 noites, você pode estar enxergando{" "}
          <span className="text-fiber">um mercado que quase ninguém vê.</span>
        </h2>
        <Countdown target={day1} label="para o Dia 1" className="mt-10" />
        <FinalCheckout />
      </div>
    </section>
  );
}
