"use client";

import { site } from "@/lib/site";
import { trackJoinInscritosClick } from "@/lib/track";

export function JoinInscritosButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={site.whatsappInscritosUrl || "#"}
      target="_blank"
      rel="noopener"
      onClick={trackJoinInscritosClick}
      className="btn btn-whatsapp w-full sm:w-auto sm:px-10"
    >
      {children}
    </a>
  );
}
