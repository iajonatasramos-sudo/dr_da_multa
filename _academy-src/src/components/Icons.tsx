// Ícones de traço fino (24×24), desenhados para os capítulos do e-book.

type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconLighthouse = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M10 6h4l1.5 13h-7L10 6Z" />
    <path d="M9 6h6M11 3h2v3h-2zM8.5 12h7" />
    <path d="M3 21c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
    <path d="M15 4.5 21 3M15 7l6 1.5" opacity=".6" />
  </svg>
);

export const IconInbox = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 13 6.5 5h11L20 13v6H4v-6Z" />
    <path d="M4 13h4.5l1 2h5l1-2H20" />
  </svg>
);

export const IconScale = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 4v16M8 20h8M5 7h14M7 4.5 12 4l5 .5" />
    <path d="m5 7-2.5 6a2.5 2.5 0 0 0 5 0L5 7ZM19 7l-2.5 6a2.5 2.5 0 0 0 5 0L19 7Z" />
  </svg>
);

export const IconRepeat = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M17 3l3 3-3 3" />
    <path d="M4 12V9a3 3 0 0 1 3-3h13" />
    <path d="M7 21l-3-3 3-3" />
    <path d="M20 12v3a3 3 0 0 1-3 3H4" />
  </svg>
);

export const IconChart = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 20V4M4 20h16" />
    <path d="M8 16v-4M12 16V9M16 16v-7M20 16V6" />
  </svg>
);

export const IconShield = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconAlert = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 4 2.5 20h19L12 4Z" />
    <path d="M12 10v4.5M12 17.5v.01" />
  </svg>
);

export const IconArrowDown = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const IconDownload = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

export const IconCheck = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconPlay = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
  </svg>
);

export const IconWhatsApp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      fill="currentColor"
      d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2.09 22l5.3-1.39a9.86 9.86 0 0 0 4.65 1.18h.01c5.44 0 9.87-4.43 9.87-9.87a9.8 9.8 0 0 0-2.87-7.01Zm-7.01 15.2h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.52 3.68-8.2 8.21-8.2a8.2 8.2 0 0 1 8.2 8.21c0 4.52-3.68 8.2-8.18 8.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.17-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31c-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
    />
  </svg>
);

export const IconCalendar = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

export const IconClock = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconBroadcast = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="2" />
    <path d="M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8" />
  </svg>
);

export const IconTag = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9-8-8Z" />
    <circle cx="8" cy="8" r="1.3" />
  </svg>
);

export const IconX = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
  </svg>
);

export const IconMinus = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M7 12h10" />
  </svg>
);

export const IconLock = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </svg>
);
