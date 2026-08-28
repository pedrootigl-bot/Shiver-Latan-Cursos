export const content = {
  brand: { name: "El Mentor Trader", logoText: "elmentortrader", logoMark: "em" },
  ctaUrl: "https://t.me/ElMentorTrader_bot?start=-uflow__main",
  hero: {
    headline: {
      line1: "Opera con más claridad",
      line2: "junto a",
      highlight: "EL MENTOR TRADER",
    },
    paragraphs: [
      {
        text: "Más de 6 años de experiencia en el mercado de inversiones, con los últimos 4 años enfocados exclusivamente en criptomonedas y activos monetarios, analizando movimientos en pares como EUR/USD, GBP/USD y otros mercados de alta oportunidad.",
        highlights: ["6 años", "4 años", "criptomonedas", "EUR/USD", "GBP/USD"],
      },
      {
        text: "Acompaña mis análisis diarios, entiende los movimientos más importantes del mercado y da tus primeros pasos — o mejora tus resultados — con una guía mucho más clara y objetiva.",
        highlights: ["análisis diarios"],
      },
    ],
    ctaLabel: "ENTRAR A EL MENTOR TRADER",
    supportText: "Acceso limitado · Pocas plazas disponibles este mes",
    pairs: [
      { pair: "EUR/USD", pct: "+90%", flags: ["eu", "us"] },
      { pair: "GBP/USD", pct: "+87%", flags: ["gb", "us"] },
      { pair: "GBP/JPY", pct: "+89%", flags: ["gb", "jp"] },
    ],
  },
  modules: {
    id: "modulos",
    eyebrow: "TESTIMONIOS EN VÍDEO",
    title: "Lo que dicen algunos de nuestros alumnos",
    paragraphs: [
      {
        text: "Durante todos estos años, ya he ayudado a más de 2.300 alumnos a dar un paso real en el trading.",
        highlights: ["2.300 alumnos"],
      },
      {
        text: "Muchos llegaron sin saber por dónde empezar.",
        highlights: [],
      },
      {
        text: "Otros ya operaban, pero seguían confundidos, entrando tarde o sin criterio.",
        highlights: [],
      },
      {
        text: "Hoy, acompañando mis análisis diariamente, lograron desarrollar una visión mucho más clara del mercado y avanzar como traders de verdad.",
        highlights: ["análisis diariamente", "traders de verdad"],
      },
    ],
    ctaLabel: "VER TESTIMONIOS",
    items: [
      {
        num: "01",
        title: "TESTIMONIO 01",
        description: "Cómo comenzó su proceso dentro de la mentoría.",
        accent: "blue" as const,
        image: "/images/module-gestao-art.png",
        preview: "/videos/module-01-gestao-preview.mp4",
        video: "/videos/module-01-gestao.mp4",
      },
      {
        num: "02",
        title: "TESTIMONIO 02",
        description:
          "Qué cambió después de empezar a seguir los análisis diarios.",
        accent: "orange" as const,
        image: "/images/module-mindset-art.png",
        preview: "/videos/module-02-mindset-preview.mp4",
        video: "/videos/module-02-mindset.mp4",
      },
      {
        num: "03",
        title: "TESTIMONIO 03",
        description: "Cómo pasó de la duda a una lectura más clara del mercado.",
        accent: "blue" as const,
        image: "/images/module-mercado-art.png",
        preview: "/videos/module-03-mercado-preview.mp4",
        video: "/videos/module-03-mercado.mp4",
      },
    ],
    cardsHint: "Toca la tarjeta para ver el testimonio",
    playLabel: "Ver testimonio",
    galleryTapHint: "Toca la tarjeta para ver el testimonio",
  },
  results: {
    id: "resultados",
    badge: "ACCESOS A LA SALA",
    title: "Mira algunos accesos a mi sala",
    paragraphs: [
      {
        text: "Descubre cómo funciona por dentro la sala de EL MENTOR TRADER y observa lo que nuestros alumnos están viendo, comentando y consiguiendo día tras día.",
        highlights: ["EL MENTOR TRADER"],
      },
      {
        text: "Aquí comparto mis análisis, mi lectura del mercado y el acompañamiento diario para que no tengas que pensar de más ni operar sin dirección.",
        highlights: ["mis análisis", "acompañamiento diario"],
      },
    ],
    subheading: "Acompaña mis análisis y opera con más seguridad",
    carouselIntro:
      "Revisa algunos accesos, comentarios y resultados compartidos por alumnos que ya están dentro de la sala.",
    ctaLabel: "QUIERO ENTRAR A LA SALA",
    supportText: "Plazas limitadas · El acceso puede cerrarse pronto",
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
    eyebrow: "SOBRE EL MENTOR",
    name: "El Mentor Trader",
    titleBefore: "¿Quién es",
    titleHighlight: "EL MENTOR TRADER?",
    image: "/images/mentor-about-hq.png",
    paragraphs: [
      {
        text: "Soy trader y analista de mercado, con más de 6 años de experiencia en inversiones.",
        highlights: ["6 años"],
      },
      {
        text: "En los últimos 4 años, he enfocado mi trabajo principalmente en criptomonedas, activos monetarios y pares de divisas, siguiendo de cerca oportunidades en mercados como EUR/USD, GBP/USD y otros activos de alta volatilidad.",
        highlights: ["4 años", "criptomonedas", "EUR/USD", "GBP/USD"],
      },
      {
        text: "Durante este tiempo, más de 2.300 alumnos ya han pasado por mi acompañamiento y han dado pasos reales para convertirse en traders con una visión mucho más clara del mercado.",
        highlights: ["2.300 alumnos", "traders"],
      },
      {
        text: "Mi objetivo es ayudarte a entender mejor los movimientos, acompañar análisis más precisos y operar con una dirección mucho más clara todos los días.",
        highlights: ["análisis más precisos", "dirección mucho más clara"],
      },
    ],
    ctaLabel: "ENTRAR A EL MENTOR TRADER",
  },
  urgency: {
    id: "unete",
    eyebrow: "URGENCIA / CTA",
    titleBefore: "Únete ahora a la sala de",
    titleHighlight: "EL MENTOR TRADER",
    paragraphs: [
      {
        text: "Forma parte de una sala donde acompañas análisis diarios, entiendes mejor los movimientos del mercado y avanzas junto a una comunidad de alumnos que ya están en el proceso.",
        highlights: ["análisis diarios", "comunidad de alumnos"],
      },
      {
        text: "Las plazas para este mes son limitadas y el acceso puede cerrarse en cualquier momento.",
        highlights: ["plazas para este mes son limitadas", "puede cerrarse en cualquier momento"],
      },
    ],
    ctaLabel: "ENTRAR AHORA",
    supportText: "Pocas plazas disponibles · Acceso sujeto a disponibilidad",
    backgroundImage: "/images/urgency-trading-bg.png",
  },
  footer: {
    riskTitle: "Aviso de Riesgo",
    riskWarning:
      "Las operaciones en Opciones Binarias conllevan un alto riesgo y pueden no ser adecuadas para todos los inversores. Existe la posibilidad de perder parte o la totalidad de su capital invertido. Los resultados pasados no garantizan resultados futuros.",
    secureLabel: "Plataforma segura y comprometida con tu privacidad.",
    copyright: "© 2026 El Mentor Trader. Todos los derechos reservados.",
    links: [
      { label: "Política de Privacidad", href: "#" },
      { label: "Términos de Uso", href: "#" },
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
