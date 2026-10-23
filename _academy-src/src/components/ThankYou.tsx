"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { trackJoinGroupClick, trackViewContent } from "@/lib/track";
import { IconPlay, IconWhatsApp } from "./Icons";

/** "Fulano, seu e-book está garantido!" com o primeiro nome vindo do formulário. */
export function Greeting() {
  const params = useSearchParams();
  const raw = (params.get("nome") ?? "").trim().slice(0, 30);
  const name = /^[\p{L}' -]+$/u.test(raw) ? raw.charAt(0).toUpperCase() + raw.slice(1) : "";
  return (
    <h1 className="text-[2.3rem] leading-[1.02] sm:text-6xl">
      {name ? `${name}, seu e-book está garantido!` : "Seu e-book está garantido!"}
    </h1>
  );
}

export function ViewContentEvent() {
  useEffect(() => {
    trackViewContent();
  }, []);
  return null;
}

export function JoinGroupButton() {
  return (
    <a
      href={site.whatsappGroupUrl || "#"}
      target="_blank"
      rel="noopener"
      onClick={trackJoinGroupClick}
      className="btn btn-whatsapp w-full sm:w-auto sm:px-10"
    >
      <IconWhatsApp className="size-6 shrink-0" />
      Entrar no grupo de advogados
    </a>
  );
}

/**
 * Vídeo do YouTube com fachada: mostra só a miniatura e carrega o iframe no clique.
 * Sem ID configurado, o bloco não aparece em produção (em desenvolvimento mostra a moldura).
 */
export function VideoFacade() {
  const [playing, setPlaying] = useState(false);
  const id = site.youtubeVideoId;

  if (!id) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-mist/30 text-sm text-mist-dim">
        Vídeo do Dr. Jason (defina NEXT_PUBLIC_YOUTUBE_VIDEO_ID)
      </div>
    );
  }

  if (playing) {
    return (
      <iframe
        className="aspect-video w-full rounded-xl"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
        title="Recado do Dr. Jason sobre o grupo Telecom ADV"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-abyss-deep"
      aria-label="Assistir ao recado do Dr. Jason"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-cream text-abyss shadow-xl transition-transform group-hover:scale-105">
        <IconPlay className="ml-1 size-7" />
      </span>
    </button>
  );
}
