export const content = {
  brand: { name: "El Mentor Trader", logoText: "elmentortrader", logoMark: "em" },
  ctaUrl: "#",
  hero: {
    headline: {
      before: "O melhor curso ",
      highlightGreen: "completo",
      middle: " de Opções Binárias do zero ao lucro ",
      highlightOrange: "+ Sala de sinais ao vivo.",
    },
    subheadline: {
      before: "Vou pegar na sua mão e te guiar pra você ",
      highlightOrange: "não perder dinheiro",
      middle: " e aprender as ",
      highlightGreen: "melhores estratégias.",
    },
    ctaLabel: "GARANTIR MINHA VAGA",
    pairs: [
      { pair: "EUR/GBP", pct: "+87%", flags: ["eu", "gb"] },
      { pair: "EUR/USD", pct: "+90%", flags: ["eu", "us"] },
      { pair: "GBP/JPY", pct: "+89%", flags: ["gb", "jp"] },
    ],
  },
  modules: {
    id: "modulos",
    eyebrow: "CONTEÚDO DE ALTO NÍVEL",
    title: "Aprenda com um método completo e objetivo.",
    description:
      "Módulos práticos que vão do básico ao avançado para transformar conhecimento em resultado real.",
    items: [
      {
        num: "01",
        title: "GESTÃO FINANCEIRA",
        description: "Proteja seu capital e opere com consistência.",
        accent: "blue" as const,
        image: "/images/module-gestao.png",
      },
      {
        num: "02",
        title: "MINDSET DO TRADER",
        description: "Desenvolva a mentalidade de quem é lucrativo.",
        accent: "orange" as const,
        image: "/images/module-mindset.png",
      },
      {
        num: "03",
        title: "INTRODUÇÃO AO MERCADO",
        description: "Entenda o mercado e as oportunidades reais.",
        accent: "blue" as const,
        image: "/images/module-mercado.png",
      },
    ],
    cardsHint: "Clique nos cards para ver o conteúdo",
  },
  results: {
    id: "resultados",
    badge: "RESULTADOS REAIS",
    titleBefore: "Resultados reais dos nossos",
    titleHighlight: "alunos",
    description: [
      "Sinais, operações e resultados ao vivo da nossa Sala de Sinais.",
      "Transparência total. Resultados que falam por si.",
    ],
    carousel: [
      {
        type: "review" as const,
        name: "Gustavo M.",
        badge: "Aluno Premium",
        avatar: "/images/avatar-lucas.png",
        text: "Entrei na sala sem saber nada. Hoje já pago minhas contas com o que aprendi aqui. Método simples e direto!",
        time: "14:32",
        scoreLabel: "Resultado do dia",
        score: "3x0",
        scoreCaption: "100% de assertividade",
      },
      {
        type: "trading" as const,
        asset: "WING25",
        balanceLabel: "Patrimônio",
        balance: "R$ 4.452,35",
        activeTab: "Posições",
        tabs: ["Posições", "Ordens", "Histórico"],
        dailyResult: "R$ 4.452,35",
        dailyPct: "(+5,21%)",
        trades: [
          { side: "B" as const, asset: "WING25", time: "10:15", profit: "+R$ 1.240" },
          { side: "V" as const, asset: "WINV25", time: "11:02", profit: "+R$ 890" },
          { side: "B" as const, asset: "WING25", time: "14:30", profit: "+R$ 2.322" },
        ],
        footer:
          "Consistência que gera resultado. Gestão + Estratégia = Lucro.",
      },
      {
        type: "chat" as const,
        title: "Sala de Sinais",
        status: "online",
        imageMessage: {
          profit: "+R$ 1.890,00",
          label: "Depósito efetuado",
          time: "15:01",
        },
        messages: [
          {
            text: "Primeiro saque! Gratidão à equipe 🔥",
            time: "15:02",
            outgoing: true,
            avatar: "/images/avatar-juliana.png",
          },
          {
            text: "Bora! Mais um dia verde 🚀",
            time: "15:03",
            outgoing: true,
            avatar: "/images/avatar-juliana.png",
          },
          {
            text: "Gestão impecável na sala hoje!",
            time: "15:04",
            outgoing: true,
            avatar: "/images/avatar-juliana.png",
          },
        ],
      },
      {
        type: "wallet" as const,
        balance: "R$ 5.004,75",
        dailyProfit: "R$ 500,75",
        dailyPct: "+11,12%",
        time: "16:22",
        author: "Rafael P.",
        avatar: "/images/avatar-carlos.png",
        overlayMessage:
          "Sequencial de vela no D1x deu certo! Mais um dia positivo na sala.",
        overlayTime: "16:24",
      },
    ],
  },
  mentor: {
    id: "mentor",
    eyebrow: "SOBRE O MENTOR",
    name: "El Mentor Trader",
    titleBefore: "Quem é",
    titleHighlight: "El Mentor Trader?",
    image: "/images/mentor-about-hq.png",
    bio: "Trader e investidor há mais de 11 anos. Comecei no mercado com apenas 18 anos de idade e, desde então, transformei disciplina em liberdade financeira.",
    bioClosing:
      "Hoje, sou referência no mercado de Opções Binárias e minha missão é ensinar um método simples, realista e lucrativo para que mais pessoas alcancem resultados consistentes.",
    credentials: [
      { label: "+11 ANOS DE MERCADO", icon: "target" as const },
      { label: "NÚMERO 1 EM OPÇÕES BINÁRIAS", icon: "award" as const },
      { label: "MILHARES DE ALUNOS FORMADOS", icon: "users" as const },
    ],
    ctaLabel: "QUERO SER GUIADO POR EL MENTOR TRADER",
  },
  footer: {
    riskTitle: "Aviso de Risco",
    riskWarning:
      "As negociações em Opções Binárias envolvem alto risco e podem não ser adequadas para todos os investidores. Existe a possibilidade de perda de parte ou de todo o seu capital investido. Resultados passados não garantem resultados futuros.",
    secureLabel: "Plataforma segura e comprometida com a sua privacidade.",
    copyright: "© 2026 El Mentor Trader. Todos os direitos reservados.",
    links: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
    ],
  },
} as const;

export type ReviewCardData = Extract<
  (typeof content.results.carousel)[number],
  { type: "review" }
>;
export type TradingCardData = Extract<
  (typeof content.results.carousel)[number],
  { type: "trading" }
>;
export type ChatCardData = Extract<
  (typeof content.results.carousel)[number],
  { type: "chat" }
>;
export type WalletCardData = Extract<
  (typeof content.results.carousel)[number],
  { type: "wallet" }
>;
export type ResultCarouselItem = (typeof content.results.carousel)[number];
