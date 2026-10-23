// Tudo o que muda de uma turma para outra fica aqui. Alterou? Faça um novo deploy.
// Datas sempre em ISO com o fuso de Brasília (-03:00). O site exibe tudo em
// horário de Brasília e as contagens funcionam para quem acessa de qualquer fuso.

export const imersao = {
  eventName: "Imersão Telecom ADV",

  /** Início de cada noite. */
  day1: "2026-12-01T19:30:00-03:00",
  day2: "2026-12-02T19:30:00-03:00",
  /** Duração prevista de cada noite, em minutos (usada no Google Agenda e no .ics). */
  durationMinutes: 120,

  format: "Online e ao vivo",

  /** Preço cheio do ingresso, em reais. */
  ticketPrice: 97,
  /** Adicional do VIP (order bump na Hotmart). Total do VIP = preço do ingresso + vipPrice. */
  vipPrice: 47,

  /**
   * Lote promocional. Com `enabled: true` e antes de `until`, a página mostra o
   * preço cheio riscado, o preço do lote e a contagem até a virada. Na virada o
   * preço volta sozinho para `ticketPrice` (lembre de ajustar o preço na Hotmart).
   */
  earlyBird: {
    enabled: false,
    price: 67,
    until: "2026-11-08T23:59:00-03:00",
  },

  /** Depois deste horário: "Inscrições encerradas" + botão da lista de espera. */
  salesClose: "2026-12-01T18:00:00-03:00",

  /** Mostra o selo "O valor do ingresso vira desconto no curso". */
  ticketCreditOnCourse: false,

  /**
   * Parcelamento exibido abaixo do preço. Deixe `null` para não mostrar.
   * Ex.: { count: 12, value: 9.74 } mostra "ou em até 12x de R$ 9,74 no cartão".
   * Use exatamente o que a Hotmart mostra no checkout.
   */
  installments: null as null | { count: number; value: number },

  /** Selo do card VIP. Na primeira turma, "Recomendado" é mais preciso que "Mais escolhido". */
  vipBadge: "Mais escolhido",

  /** Dias de acesso à gravação (VIP). */
  recordingDays: 30,

  /** Garantia da Hotmart, em dias. */
  guaranteeDays: 7,
} as const;

export type ImersaoConfig = typeof imersao;
