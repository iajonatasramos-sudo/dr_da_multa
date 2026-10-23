import { IconAlert, IconArrowDown, IconChart, IconInbox, IconLighthouse, IconRepeat, IconScale, IconShield } from "./Icons";
import { Picture } from "./Picture";

export function NumbersBand() {
  return (
    <section aria-labelledby="mercado-titulo" className="border-y border-gold/20 bg-abyss-deep">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-14">
        <h2 id="mercado-titulo" className="sr-only">
          O tamanho do mercado
        </h2>
        <dl className="grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-gold/20">
          <div className="flex flex-col gap-2 sm:pr-8">
            <dt className="text-sm leading-snug text-mist">reclamações contra operadoras na Anatel em 2025</dt>
            <dd className="order-first font-display text-5xl leading-none text-cream tabular-nums sm:text-[3.4rem]">
              1.354.791
            </dd>
          </div>
          <div className="flex flex-col gap-2 sm:px-8">
            <dt className="text-sm leading-snug text-mist">em relação a 2024</dt>
            <dd className="order-first font-display text-5xl leading-none text-fiber tabular-nums sm:text-[3.4rem]">
              +6,9%
            </dd>
          </div>
          <div className="flex flex-col gap-2 sm:pl-8">
            <dt className="text-sm leading-snug text-mist">
              advogados no Brasil, e pouquíssimos especialistas em telecom
            </dt>
            <dd className="order-first font-display text-5xl leading-none text-cream sm:text-[3.4rem]">
              +1,5 mi
            </dd>
          </div>
        </dl>
        <p className="mt-8 text-xs text-mist-dim">Fonte: Anatel, Panorama de Reclamações 2025.</p>
      </div>
    </section>
  );
}

const CHAPTERS = [
  { icon: IconLighthouse, text: "Por que o Direito das Telecomunicações é um mar azul na advocacia" },
  { icon: IconInbox, text: "As 7 causas que mais chegam ao escritório, de pessoas físicas e empresas" },
  { icon: IconScale, text: "A base legal que sustenta as teses: CDC, Lei Geral de Telecomunicações, novo RGC da Anatel e súmulas do STJ" },
  { icon: IconRepeat, text: "Por que as peças são de baixa complexidade e alta recorrência" },
  { icon: IconChart, text: "O modelo de honorários da área e uma simulação de carteira" },
  { icon: IconShield, text: "Como captar clientes dentro das regras do Provimento 205/2021 da OAB" },
  { icon: IconAlert, text: "Os 5 erros de quem tenta entrar nessa área sozinho" },
];

export function Chapters() {
  return (
    <section aria-labelledby="conteudo-titulo" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <p className="seal">Dentro do e-book</p>
      <h2 id="conteudo-titulo" className="mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
        O que você vai descobrir
      </h2>
      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-mist/10 bg-mist/10 sm:grid-cols-2 lg:grid-cols-3">
        {CHAPTERS.map(({ icon: Icon, text }) => (
          <li key={text} className="flex gap-4 bg-abyss p-6 last:sm:col-span-2 last:lg:col-span-3">
            <Icon className="size-7 shrink-0 text-fiber" />
            <p className="leading-relaxed text-cream">{text}</p>
          </li>
        ))}
      </ol>
      <a
        href="#formulario"
        className="group mt-4 flex items-center justify-between gap-4 rounded-2xl border border-gold/30 bg-abyss-deep p-6 text-cream transition-colors hover:border-gold"
      >
        <span className="font-display text-2xl leading-snug">Receber o e-book gratuito</span>
        <IconArrowDown className="size-6 shrink-0 text-gold transition-transform group-hover:translate-y-0.5" />
      </a>
    </section>
  );
}

const AUDIENCE = [
  "Advogados(as) que querem se especializar em um nicho com pouca concorrência",
  "Advogados de consumidor que querem sair da disputa por preço",
  "Recém-formados e bacharéis buscando uma área para atuar",
  "Estudantes de Direito que querem enxergar o mercado antes de todo mundo",
];

export function Audience() {
  return (
    <section aria-labelledby="publico-titulo" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[22rem_1fr]">
      <div>
        <p className="seal">Para quem é</p>
        <h2 id="publico-titulo" className="mt-4 text-4xl leading-tight sm:text-5xl">
          Para quem é este material
        </h2>
      </div>
      <ul className="divide-y divide-mist/10 border-y border-mist/10">
        {AUDIENCE.map((item) => (
          <li key={item} className="flex items-center gap-4 py-5 text-lg leading-snug text-cream">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gradient-to-r from-fiber to-transparent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Author() {
  return (
    <section aria-labelledby="autor-titulo" className="bg-abyss-deep">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 md:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr] lg:gap-16">
        <div className="relative mx-auto w-64 md:w-full">
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-gold/50" />
          <Picture
            name="jason"
            widths={[420, 840]}
            ratio={5 / 4}
            alt="Dr. Jason de Cerqueira Cesar em seu escritório"
            sizes="(min-width: 1024px) 352px, (min-width: 768px) 288px, 256px"
            className="relative block h-auto w-full rounded-xl object-cover"
          />
        </div>
        <div>
          <p className="seal">Sobre o autor</p>
          <h2 id="autor-titulo" className="mt-4 text-4xl leading-tight sm:text-5xl">
            Dr. Jason de Cerqueira Cesar
          </h2>
          <blockquote className="mt-6 border-l-2 border-fiber pl-5 font-display text-2xl leading-snug text-cream italic sm:text-[1.75rem]">
            “Eu já estive do outro lado. Por isso sei onde as operadoras erram.”
          </blockquote>
          <p className="mt-6 max-w-2xl leading-relaxed text-mist">
            Dr. Jason de Cerqueira Cesar é advogado, fundador do Cerqueira Cesar Advocacia e criador do Dr. da Multa
            Telecom. Antes de advogar contra as operadoras, passou mais de 20 anos dentro do setor de
            telecomunicações, em empresas como Vivo, Claro e Nextel. Há mais de uma década atua na defesa de
            consumidores e empresas contra práticas abusivas de operadoras, em todo o Brasil.
          </p>
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  { q: "O e-book é gratuito?", a: "Sim, 100% gratuito." },
  { q: "Preciso ter experiência na área?", a: "Não. O material foi feito para quem ainda não atua com telecom." },
  {
    q: "Como recebo o material?",
    a: "Logo após o cadastro: o download fica disponível na hora e também enviamos o e-book por e-mail e WhatsApp.",
  },
  {
    q: "O que é o grupo Telecom ADV?",
    a: "Um grupo de WhatsApp exclusivo para advogados e estudantes, com conteúdos sobre a área e os avisos das lives semanais com o Dr. Jason.",
  },
];

export type FaqItem = { q: string; a: React.ReactNode };

export function Faq({ items = FAQ }: { items?: FaqItem[] }) {
  return (
    <section aria-labelledby="faq-titulo" className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <p className="seal">Dúvidas</p>
      <h2 id="faq-titulo" className="mt-4 text-4xl leading-tight sm:text-5xl">
        Perguntas frequentes
      </h2>
      <div className="mt-8 divide-y divide-mist/10 border-y border-mist/10">
        {items.map(({ q, a }) => (
          <details key={q} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-cream [&::-webkit-details-marker]:hidden">
              {q}
              <span
                aria-hidden="true"
                className="relative size-4 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-gold after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-gold after:transition-transform group-open:after:scale-y-0"
              />
            </summary>
            <div className="pb-5 leading-relaxed text-mist">{a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
