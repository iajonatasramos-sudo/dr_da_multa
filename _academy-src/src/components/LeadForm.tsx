"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { uuid } from "@/lib/attribution";
import { buildLeadPayload, firstName, sendLead, type LeadInput, type LeadOffer } from "@/lib/lead";
import { ebookOffer, listaEsperaOffer } from "@/lib/offers";
import { JoinGroupButton } from "./ThankYou";
import { isValidMobile, maskPhone } from "@/lib/phone";
import { supportWhatsappLink } from "@/lib/site";
import { trackLead } from "@/lib/track";

const ROLES = [
  "Advogado(a)",
  "Bacharel em Direito",
  "Estudante de Direito",
  "Profissional de telecomunicações",
  "Outro",
];

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

/**
 * O formulário atende duas ofertas. O que muda entre elas — textos, oferta e o
 * que acontece depois do envio — fica aqui, para não duplicar o formulário.
 */
type Variant = "ebook" | "lista-espera";

const VARIANTS: Record<Variant, {
  offer: LeadOffer;
  titulo: React.ReactNode;
  subtitulo: string;
  botao: string;
  rodape: string;
  consentimento: string;
  erroConsentimento: string;
  /** "redirect" vai para /obrigado/; "inline" troca o formulário pela confirmação. */
  depois: "redirect" | "inline";
}> = {
  ebook: {
    offer: ebookOffer,
    titulo: <>Receba o <span className="whitespace-nowrap">e-book</span> gratuito</>,
    subtitulo: "Preencha para liberar o download agora.",
    botao: "Quero o e-book gratuito",
    rodape: "Gratuito. Enviamos o e-book para o seu e-mail e WhatsApp.",
    consentimento: "Concordo em receber o e-book e comunicações da Telecom ADV Academy por e-mail e WhatsApp, conforme a",
    erroConsentimento: "Marque esta opção para receber o e-book.",
    depois: "redirect",
  },
  "lista-espera": {
    offer: listaEsperaOffer,
    titulo: <>Entrar na lista de espera</>,
    subtitulo: "As inscrições ainda não abriram. Avisamos você em primeiro lugar.",
    botao: "Quero ser avisado",
    rodape: "Sem compromisso. Avisamos por e-mail e WhatsApp quando abrir.",
    consentimento: "Concordo em receber avisos sobre a Imersão Telecom ADV por e-mail e WhatsApp, conforme a",
    erroConsentimento: "Marque esta opção para entrar na lista.",
    depois: "inline",
  },
};

type Field = keyof LeadInput;
type Errors = Partial<Record<Field, string>>;

const EMPTY: LeadInput = { name: "", email: "", whatsapp: "", role: "", state: "", consent: false };
const FIELD_ORDER: Field[] = ["name", "email", "whatsapp", "role", "consent"];

function validate(v: LeadInput, erroConsentimento: string): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 3 || !/\s/.test(v.name.trim())) e.name = "Informe nome e sobrenome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Informe um e-mail válido, como nome@exemplo.com.";
  if (!isValidMobile(v.whatsapp)) e.whatsapp = "Informe um celular com DDD, como (11) 91234-5678.";
  if (!v.role) e.role = "Escolha uma opção.";
  if (!v.consent) e.consent = erroConsentimento;
  return e;
}

export function LeadForm({ id = "formulario", variant = "ebook" }: { id?: string; variant?: Variant }) {
  const v = VARIANTS[variant];
  const router = useRouter();
  const [values, setValues] = useState<LeadInput>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const sending = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const update = <K extends Field>(key: K, value: LeadInput[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors((prev) => ({ ...prev, [key]: validate(next, v.erroConsentimento)[key] }));
  };

  const blur = (key: Field) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate(values, v.erroConsentimento)[key] }));
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (sending.current) return;

    const found = validate(values, v.erroConsentimento);
    setErrors(found);
    setTouched({ name: true, email: true, whatsapp: true, role: true, consent: true });
    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const nome = encodeURIComponent(firstName(values.name));

    // Bot preencheu o campo invisível: finge sucesso sem enviar nada.
    if (honeypot.current?.value) {
      if (v.depois === "inline") setStatus("done");
      else router.push(`/obrigado/?nome=${nome}`);
      return;
    }

    sending.current = true;
    setStatus("sending");
    const eventId = uuid();
    try {
      await sendLead(buildLeadPayload(values, eventId, v.offer), v.offer.webhookUrl);
      trackLead(eventId, values.role);
      if (v.depois === "inline") {
        sending.current = false;
        setStatus("done");
      } else {
        router.push(`/obrigado/?nome=${nome}`);
      }
    } catch (err) {
      console.error("[lead] falha ao enviar para o webhook", err);
      sending.current = false;
      setStatus("error");
    }
  }

  const describedBy = (key: Field, hint?: string) =>
    [hint, errors[key] ? `${key}-erro` : null].filter(Boolean).join(" ") || undefined;

  const isSending = status === "sending";

  // Lista de espera: no sucesso o formulário dá lugar à confirmação, com o convite do grupo.
  if (status === "done") {
    return (
      <div
        className="rounded-2xl border border-gold/30 bg-abyss-deep/80 p-5 text-center shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur-md sm:p-7"
        role="status"
        aria-live="polite"
      >
        <p className="seal justify-center">Pronto</p>
        <h2 className="mt-4 text-3xl leading-tight text-beige sm:text-4xl">
          {firstName(values.name) ? `${firstName(values.name)}, você está na lista` : "Você está na lista"}
        </h2>
        <p className="mt-3 leading-relaxed text-mist">
          Avisamos por e-mail e WhatsApp assim que as inscrições da Imersão Telecom ADV abrirem.
        </p>
        <p className="mt-5 leading-relaxed text-mist">
          Enquanto isso, entre no grupo: é lá que o aviso sai primeiro, junto com as lives semanais do Dr. Jason.
        </p>
        <div className="mt-6 flex justify-center">
          <JoinGroupButton />
        </div>
      </div>
    );
  }

  return (
    <form
      id={id}
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={`${id}-titulo`}
      className="relative rounded-2xl border border-gold/30 bg-abyss-deep/80 p-5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur-md sm:p-7"
    >
      <h2 id={`${id}-titulo`} className="text-2xl leading-tight text-beige sm:text-[1.75rem] xl:text-[1.6rem]">
        {v.titulo}
      </h2>
      <p className="mt-1.5 text-sm text-mist-dim">{v.subtitulo}</p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-sm font-semibold text-cream">
            Nome completo
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            className="field"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            required
          />
          {errors.name && <FieldError id="name-erro">{errors.name}</FieldError>}
        </div>

        <div>
          <label htmlFor="lead-email" className="mb-1.5 block text-sm font-semibold text-cream">
            E-mail
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            className="field"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            required
          />
          {errors.email && <FieldError id="email-erro">{errors.email}</FieldError>}
        </div>

        <div>
          <label htmlFor="lead-whatsapp" className="mb-1.5 block text-sm font-semibold text-cream">
            WhatsApp com DDD
          </label>
          <input
            id="lead-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="(11) 91234-5678"
            className="field tabular-nums"
            value={values.whatsapp}
            onChange={(e) => update("whatsapp", maskPhone(e.target.value))}
            onBlur={() => blur("whatsapp")}
            aria-invalid={!!errors.whatsapp}
            aria-describedby={describedBy("whatsapp")}
            required
          />
          {errors.whatsapp && <FieldError id="whatsapp-erro">{errors.whatsapp}</FieldError>}
        </div>

        <div className="grid grid-cols-[1fr_7.5rem] gap-3">
          <div>
            <label htmlFor="lead-role" className="mb-1.5 block text-sm font-semibold text-cream">
              Você é
            </label>
            <select
              id="lead-role"
              name="role"
              className="field"
              value={values.role}
              onChange={(e) => update("role", e.target.value)}
              onBlur={() => blur("role")}
              aria-invalid={!!errors.role}
              aria-describedby={describedBy("role")}
              required
            >
              <option value="" disabled>
                Selecione
              </option>
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lead-state" className="mb-1.5 block text-sm font-semibold text-cream">
              Estado
            </label>
            <select
              id="lead-state"
              name="state"
              autoComplete="address-level1"
              className="field"
              value={values.state}
              onChange={(e) => update("state", e.target.value)}
            >
              <option value="">Opcional</option>
              {UFS.map((uf) => (
                <option key={uf}>{uf}</option>
              ))}
            </select>
          </div>
        </div>
        {errors.role && <FieldError id="role-erro">{errors.role}</FieldError>}

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-mist">
            <input
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              onBlur={() => blur("consent")}
              aria-invalid={!!errors.consent}
              aria-describedby={describedBy("consent")}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-gold"
              required
            />
            <span>
              {v.consentimento}{" "}
              <Link href="/privacidade/" className="text-fiber underline underline-offset-2" target="_blank">
                Política de Privacidade
              </Link>
              .
            </span>
          </label>
          {errors.consent && <FieldError id="consent-erro">{errors.consent}</FieldError>}
        </div>

        {/* Honeypot: invisível para pessoas, tentador para bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="lead-website">Site</label>
          <input ref={honeypot} id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-gold mt-6 w-full text-[1.05rem]"
        aria-disabled={isSending}
      >
        {isSending ? (
          <>
            <Spinner /> Enviando…
          </>
        ) : (
          v.botao
        )}
      </button>
      <p className="mt-3 text-center text-xs text-mist-dim">{v.rodape}</p>

      <div aria-live="assertive">
        {status === "error" && (
          <p className="mt-4 rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm text-cream" role="alert">
            Não conseguimos enviar agora. Tente novamente ou{" "}
            <a href={supportWhatsappLink} target="_blank" rel="noopener" className="font-semibold text-fiber underline underline-offset-2">
              fale com a gente no WhatsApp
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-danger">
      {children}
    </p>
  );
}

function Spinner() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 animate-spin">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
