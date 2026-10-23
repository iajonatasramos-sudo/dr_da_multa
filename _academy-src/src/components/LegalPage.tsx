import Link from "next/link";
import { Footer } from "./Closing";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <Link href="/" className="text-sm text-fiber underline underline-offset-2">
          ← Voltar
        </Link>
        <h1 className="mt-6 text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-2 text-sm text-mist-dim">Última atualização: {updated}</p>
        <div className="mt-10 space-y-5 leading-relaxed text-mist [&_h2]:mt-10 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2 [&_a]:text-fiber [&_a]:underline">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
