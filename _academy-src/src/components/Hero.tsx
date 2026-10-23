import { LeadForm } from "./LeadForm";

/**
 * Fundo do hero: a arte do oceano com o Dr. Jason. Vertical (9:16) no celular,
 * horizontal (16:9) do tablet em diante. Mantém a proporção natural no topo e
 * se dissolve no azul-marinho; texto e formulário ficam no lado vazio da arte.
 */
function HeroArt() {
  return (
    <picture>
      <source
        media="(min-width: 768px)"
        type="image/avif"
        srcSet="/img/hero-desktop-960.avif 960w, /img/hero-desktop-1672.avif 1672w"
        sizes="(min-width: 1280px) 90vw, 100vw"
      />
      <source
        media="(min-width: 768px)"
        srcSet="/img/hero-desktop-960.webp 960w, /img/hero-desktop-1672.webp 1672w"
        sizes="(min-width: 1280px) 90vw, 100vw"
      />
      <source type="image/avif" srcSet="/img/hero-mobile-480.avif 480w, /img/hero-mobile-941.avif 941w" sizes="100vw" />
      <img
        src="/img/hero-mobile-480.webp"
        srcSet="/img/hero-mobile-480.webp 480w, /img/hero-mobile-941.webp 941w"
        sizes="100vw"
        width={480}
        height={853}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="block aspect-[941/1672] h-auto w-full md:aspect-[1672/941]"
      />
    </picture>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="relative isolate overflow-hidden bg-abyss [--hero-trim:max(0px,calc(60.4vw-165px))] [--hero-shift:clamp(0px,calc(103vw-371px),40px)] xl:flex xl:min-h-[50.7vw] xl:items-center"
    >
      {/*
        No desktop a arte ocupa 90% da largura, encostada à direita, para o Jason ficar livre do formulário.
        No celular o topo da arte é cortado em --hero-trim (ver abaixo).
      */}
      <div aria-hidden="true" className="absolute top-[calc(-1*var(--hero-trim))] right-0 -z-10 w-full md:top-0 xl:w-[90%]">
        <HeroArt />
        {/* véu azul-marinho uniforme: deixa a arte mais opaca, sem esconder o Jason */}
        <div className="absolute inset-0 bg-abyss/35" />
        <div className="absolute inset-y-0 left-0 hidden w-3/4 bg-gradient-to-r from-abyss via-abyss/55 to-transparent md:block" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-abyss to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pt-10 pb-14 sm:pt-14 xl:py-16">
        <div className="grid gap-10 xl:max-w-[53rem] xl:grid-cols-[minmax(0,1fr)_23rem] xl:items-center">
          {/*
            No celular o texto fica no topo e o formulário começa abaixo das mãos do Jason.
            --hero-trim sobe a arte (e o formulário junto) até o alto da cabeça do Jason ficar
            na altura do fim do título (~165 px do topo): a cabeça fica entre a 2ª linha do
            título e o subtítulo. Na arte, o alto da cabeça está a 60,4% da largura da tela.
            --hero-shift desce o bloco de texto até 40 px, para o subtítulo ficar na altura do
            ombro; em telas estreitas desce menos, para não encostar no formulário.
          */}
          <div className="min-h-[calc(118vw-var(--hero-trim))] pt-[var(--hero-shift)] md:min-h-0 md:pt-0">
            <p className="seal">E-book gratuito · Telecom ADV Academy</p>

            <h1 id="hero-titulo" className="mt-6 text-[3.1rem] leading-[0.95] tracking-[-0.01em] sm:text-7xl xl:text-[4.2rem]">
              O Mar Azul <span className="block">da Advocacia</span>
            </h1>

            <p className="mt-6 max-w-[58%] text-[1.05rem] leading-relaxed text-mist [text-shadow:0_1px_12px_rgb(10_26_63/0.9)] sm:text-lg md:max-w-sm">
              Descubra o Direito das Telecomunicações: uma área com{" "}
              <strong className="font-semibold text-cream">mais de 1,3 milhão de reclamações por ano na Anatel</strong> e
              quase nenhum advogado especializado.
            </p>

            <p className="mt-8 hidden text-sm text-mist xl:block">
              Por <span className="text-cream">Dr. Jason de Cerqueira Cesar</span>, criador do Dr. da Multa Telecom
            </p>
          </div>

          <div className="md:max-w-xl xl:max-w-none">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
