"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { captureAttribution } from "@/lib/attribution";
import { CONSENT_KEY } from "@/lib/consent";
import { site } from "@/lib/site";
import { trackPageView } from "@/lib/track";

const gtagIds = [site.ga4Id, site.googleAdsId].filter(Boolean);

// Lido no navegador, antes do init: se a pessoa recusou no banner, os scripts sobem revogados.
const deniedExpr = `(function(){try{return localStorage.getItem('${CONSENT_KEY}')==='denied'}catch(e){return false}})()`;

/**
 * Carrega Meta Pixel e gtag depois da hidratação (sem bloquear a renderização)
 * e dispara PageView a cada troca de rota.
 */
export function Tracking() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    // O PageView inicial vem do snippet de init; aqui só as navegações seguintes.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  return (
    <>
      {site.metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
if(${deniedExpr})fbq('consent','revoke');
fbq('init','${site.metaPixelId}');
fbq('track','PageView');`}
        </Script>
      )}
      {gtagIds.length > 0 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c=${deniedExpr}?'denied':'granted';
gtag('consent','default',{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c});
gtag('js',new Date());
${gtagIds.map((id) => `gtag('config','${id}');`).join("\n")}`}
          </Script>
        </>
      )}
    </>
  );
}
