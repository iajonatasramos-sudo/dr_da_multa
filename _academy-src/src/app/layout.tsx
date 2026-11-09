import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { Suspense } from "react";
import { CookieBanner } from "@/components/CookieBanner";
import { Tracking } from "@/components/Tracking";
import { site, BASE_PATH } from "@/lib/site";
import "./globals.css";

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = "O Mar Azul da Advocacia | E-book gratuito · Telecom ADV Academy";
const description =
  "E-book gratuito do Dr. Jason de Cerqueira Cesar sobre o Direito das Telecomunicações: mais de 1,3 milhão de reclamações por ano na Anatel e quase nenhum advogado especializado.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: `${BASE_PATH}/` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${BASE_PATH}/`,
    siteName: site.name,
    title,
    description,
    images: [{ url: `${BASE_PATH}/img/og.png`, width: 1200, height: 630, alt: "Capa do e-book O Mar Azul da Advocacia" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${BASE_PATH}/img/og.png`] },
  // Verificação de domínio do Meta: só aparece se a variável existir
  ...(site.fbDomainVerification ? { other: { "facebook-domain-verification": site.fbDomainVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0A1A3F",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>
        {site.metaPixelId && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${site.metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
        {children}
        <Suspense fallback={null}>
          <Tracking />
        </Suspense>
        <CookieBanner />
      </body>
    </html>
  );
}
