// Ondas que viram fibra óptica, como na capa do e-book: feixes ciano saindo do canto
// inferior esquerdo e subindo para a direita. Alguns fios carregam um pulso de luz.
// SVG gerado no build (determinístico), sem JavaScript no navegador.

const W = 1440;
const H = 900;
const STRANDS = 22;

function strand(i: number) {
  const t = i / (STRANDS - 1);
  const y0 = 700 + t * 260;
  const y1 = 360 + t * 300;
  const sway = 70 + Math.sin(i * 1.7) * 40;
  return `M -60 ${y0.toFixed(1)} C 380 ${(y0 - sway).toFixed(1)}, 760 ${(y1 + sway * 1.4).toFixed(1)}, ${W + 60} ${y1.toFixed(1)}`;
}

const paths = Array.from({ length: STRANDS }, (_, i) => ({
  d: strand(i),
  opacity: 0.1 + ((i * 37) % 11) / 30,
  width: 0.6 + ((i * 13) % 5) / 6,
}));

const PULSES = [3, 8, 12, 17, 20];

export function FiberWaves({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id="fiber-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#38C6F4" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#38C6F4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#38C6F4" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="fiber-mask-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="fiber-mask">
          <rect width={W} height={H} fill="url(#fiber-mask-grad)" />
        </mask>
      </defs>
      <g mask="url(#fiber-mask)" fill="none" strokeLinecap="round">
        {paths.map((p, i) => (
          <path key={i} d={p.d} stroke="url(#fiber-fade)" strokeOpacity={p.opacity} strokeWidth={p.width} />
        ))}
        {PULSES.map((i, k) => (
          <path
            key={`p${i}`}
            d={paths[i].d}
            pathLength={1600}
            stroke="#8FE0FF"
            strokeOpacity={0.75}
            strokeWidth={1.4}
            strokeDasharray="180 1420"
            className="animate-pulse-run motion-reduce:hidden"
            style={{ animationDelay: `${k * 0.9}s`, animationDuration: `${6 + k}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

/** Um único fio de fibra, usado como divisor entre seções. */
export function FiberDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-6xl px-5">
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="h-6 w-full">
        <defs>
          <linearGradient id="divider-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#38C6F4" stopOpacity="0" />
            <stop offset="0.5" stopColor="#38C6F4" stopOpacity="0.55" />
            <stop offset="1" stopColor="#38C6F4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 14 C 300 2, 520 22, 760 12 S 1100 6, 1200 12" fill="none" stroke="url(#divider-grad)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
