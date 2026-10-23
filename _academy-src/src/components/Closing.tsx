import Link from "next/link";
import { FiberWaves } from "./FiberWaves";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-titulo" className="relative isolate overflow-hidden bg-abyss-deep">
      <FiberWaves className="absolute inset-0 -z-10 h-full w-full opacity-60" />
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:py-28">
        <h2 id="cta-titulo" className="text-4xl leading-[1.05] sm:text-6xl">
          O mercado existe.
          <span className="block text-fiber">A concorrência ainda não chegou.</span>
        </h2>
        <a href="#formulario" className="btn btn-gold mt-10 px-8 text-[1.05rem]">
          Baixar o e-book gratuito
        </a>
      </div>
    </section>
  );
}

export function Footer({ minimal = false }: { minimal?: boolean }) {
  return (
    <footer className={`border-t border-mist/10 bg-abyss-deep ${minimal ? "" : "pb-28 md:pb-0"}`}>
      <div className="mx-auto max-w-6xl space-y-4 px-5 py-10 text-xs leading-relaxed text-mist-dim">
        <p>
          <span className="text-cream">Telecom ADV Academy</span> · Material de caráter educativo, destinado a
          profissionais e estudantes de Direito. Não constitui consultoria jurídica nem promessa de resultado.
        </p>
        {!minimal && (
          <nav aria-label="Documentos legais" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacidade/" className="underline underline-offset-2 hover:text-cream">
              Política de Privacidade
            </Link>
            <Link href="/termos/" className="underline underline-offset-2 hover:text-cream">
              Termos de Uso
            </Link>
          </nav>
        )}
        <p>[RAZÃO SOCIAL] · CNPJ [XX.XXX.XXX/0001-XX]</p>
      </div>
    </footer>
  );
}
