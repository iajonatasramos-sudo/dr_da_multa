// <picture> com AVIF/WebP gerados por scripts/images.mjs (o export estático não otimiza imagens).

import { BASE_PATH } from "@/lib/site";

type Props = {
  name: "capa-ebook" | "jason" | "jason-imersao";
  widths: [number, number];
  ratio: number; // altura / largura
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function Picture({ name, widths, ratio, alt, sizes, priority, className }: Props) {
  const srcSet = (ext: string) => widths.map((w) => `${BASE_PATH}/img/${name}-${w}.${ext} ${w}w`).join(", ");
  const [small] = widths;
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <img
        src={`${BASE_PATH}/img/${name}-${small}.webp`}
        srcSet={srcSet("webp")}
        sizes={sizes}
        width={small}
        height={Math.round(small * ratio)}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
