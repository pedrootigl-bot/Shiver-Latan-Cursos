# Landing Shiver Latan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing page Next.js da Shiver Latan (opções binárias + sala ao vivo), visual dark glassmorphism alinhado à referência, copy e CTA editáveis em `lib/content.ts`.

**Architecture:** App Router com uma página (`app/page.tsx`) que compõe seções (`Header`, `Hero`, `Modules`, `Results`, `Mentor`, `Footer`). Dados centralizados em `lib/content.ts`. Estilo via Tailwind + tokens CSS; motion com Framer Motion nos flutuantes do hero e entradas de cards.

**Tech Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide React · Plus Jakarta Sans (`next/font`)

## Global Constraints

- Marca: **Shiver Latan** (nunca BinaryClass / Berman no copy final)
- Mentor placeholder: **Mentor Shiver** até assets reais
- `ctaUrl` inicial: `#` em `lib/content.ts`
- Tipografia: Plus Jakarta Sans via `next/font`
- Fundo: `#05070a`
- Spec: `documents/2026-08-27-shiver-latan-landing-design.md`
- Docs de conhecimento: pasta `documents/`
- Sem checkout, CMS, formulários ou i18n na v1
- Commits: só se o usuário pedir (ou após `git init` autorizado)

---

## File Structure

| Path | Responsibility |
|------|----------------|
| `app/layout.tsx` | Fontes, metadata, shell HTML |
| `app/page.tsx` | Monta seções na ordem |
| `app/globals.css` | Tokens CSS, utilitários glow/glass |
| `lib/content.ts` | Todo copy, stats, módulos, depoimentos, `ctaUrl` |
| `components/ui/Button.tsx` | CTA primário (blue) / secondary (orange) / outline |
| `components/ui/Badge.tsx` | Pill do hero |
| `components/ui/GlassCard.tsx` | Card glass reutilizável |
| `components/Header.tsx` | Logo |
| `components/Hero.tsx` | Hero completo + flutuantes |
| `components/Modules.tsx` | Seção `#modulos` |
| `components/Results.tsx` | Stats + phone + depoimentos |
| `components/Mentor.tsx` | Bio + CTA laranja |
| `components/Footer.tsx` | Aviso de risco + links |
| `public/images/*` | Placeholders (SVG/PNG) |

---

### Task 1: Scaffold Next.js + dependências

**Files:**
- Create: projeto Next.js na raiz `c:\Users\felip\projeto\ShiverLatanCursos` (exceto `documents/` já existente)
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `app/*` via create-next-app

**Interfaces:**
- Consumes: nada
- Produces: app Next.js rodando com Tailwind; pastas `app/`, `public/`

- [ ] **Step 1: Scaffold**

No diretório do projeto (já existe `documents/`):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --turbopack --yes
```

Se o CLI reclamar de pasta não vazia por causa de `documents/`, criar em pasta temp e mover os arquivos do app para a raiz, preservando `documents/`.

- [ ] **Step 2: Instalar dependências de UI**

```bash
npm install framer-motion lucide-react
```

- [ ] **Step 3: Verificar dev server**

```bash
npm run dev
```

Expected: sobe em `http://localhost:3000` sem erro.

- [ ] **Step 4: Parar o server** (Ctrl+C) antes da próxima task.

---

### Task 2: Tokens globais + `lib/content.ts`

**Files:**
- Create: `lib/content.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: scaffold Task 1
- Produces:
  - `export const content` com shape abaixo
  - CSS variables `--bg`, `--blue`, `--orange`, `--green`, `--red`

Shape de `content` (obrigatório):

```ts
export const content = {
  brand: { name: "Shiver Latan", logoText: "shiverlatan" },
  ctaUrl: "#",
  hero: {
    badge: "FORMAÇÃO COMPLETA + SALA AO VIVO",
    headlineBefore: "Do zero ao lucro com Opções Binárias",
    headlineHighlight: "+ Sala de Sinais ao vivo.",
    subheadline:
      "O curso completo para você dominar o mercado e operar com confiança, estratégia e gestão.",
    ctaLabel: "QUERO GARANTIR MINHA VAGA",
    features: [
      { label: "+20 MÓDULOS COMPLETOS" },
      { label: "ACESSO IMEDIATO E VITALÍCIO" },
      { label: "ATUALIZAÇÕES CONSTANTES" },
      { label: "SUPORTE E COMUNIDADE" },
    ],
    pairs: [
      { pair: "EUR/GBP", pct: "87%" },
      { pair: "EUR/USD", pct: "90%" },
      { pair: "GBP/JPY", pct: "89%" },
    ],
  },
  modules: {
    id: "modulos",
    eyebrow: "CONTEÚDO DE ALTO NÍVEL",
    title: "Aprenda com um método completo e objetivo.",
    description:
      "Módulos práticos para você evoluir do básico ao avançado, com foco em resultado e consistência.",
    ctaLabel: "VER TODOS OS MÓDULOS",
    items: [
      {
        num: "01",
        title: "GESTÃO FINANCEIRA",
        description: "Proteja seu capital e opere com consistência.",
        accent: "blue" as const,
      },
      {
        num: "02",
        title: "MINDSET DO TRADER",
        description: "Desenvolva a mentalidade de quem é lucrativo.",
        accent: "orange" as const,
      },
      {
        num: "03",
        title: "INTRODUÇÃO AO MERCADO",
        description: "Entenda o mercado e as oportunidades reais.",
        accent: "blue" as const,
      },
    ],
    moreLabel: "+17 MÓDULOS",
    moreTopics:
      "estratégias, price action, gerenciamento de risco, análise técnica e muito mais.",
  },
  results: {
    titleBefore: "Alunos que operam e lucram na nossa",
    titleHighlight: "Sala de Sinais Ao Vivo.",
    description:
      "Resultados em tempo real com acompanhamento e sinais para operar com mais segurança.",
    stats: [
      { value: "10k+", label: "ALUNOS ATIVOS" },
      { value: "85%+", label: "TAXA MÉDIA DE ASSERTIVIDADE" },
      { value: "24/7", label: "SINAIS E SUPORTE EM TEMPO REAL" },
    ],
    phoneProfit: "+R$ 5.280,00",
    testimonials: [
      {
        name: "Lucas M.",
        text: "Comecei do zero e hoje opero com muito mais confiança.",
      },
      {
        name: "Juliana S.",
        text: "A sala ao vivo mudou meu ritmo — sinais claros e objetivos.",
      },
      {
        name: "Carlos A.",
        text: "Gestão + mindset: finalmente parei de queimar banca.",
      },
      {
        name: "Mariana T.",
        text: "Conteúdo direto e suporte rápido. Recomendo.",
      },
    ],
  },
  mentor: {
    name: "Mentor Shiver",
    title: "Quem é Mentor Shiver?",
    bio: "Trader com anos de experiência em opções binárias, focado em ensinar método, gestão e disciplina para quem quer operar com consistência — do zero ao avançado.",
    credentials: [
      { label: "+11 ANOS DE MERCADO" },
      { label: "ESPECIALISTA EM OPÇÕES BINÁRIAS" },
      { label: "MILHARES DE ALUNOS FORMADOS" },
    ],
    ctaLabel: "QUERO SER GUIADO POR MENTOR SHIVER",
  },
  footer: {
    riskWarning:
      "Aviso de Risco: Operações com opções binárias envolvem alto risco de perda de capital. Resultados passados não garantem resultados futuros. Opere com responsabilidade.",
    secureLabel: "Plataforma segura",
    copyright: "© 2026 Shiver Latan. Todos os direitos reservados.",
    links: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
    ],
  },
} as const;
```

- [ ] **Step 1: Criar `lib/content.ts`** com o objeto acima (marque Shiver Latan; sem BinaryClass/Berman).

- [ ] **Step 2: Atualizar `app/globals.css`**

Incluir no mínimo:

```css
@import "tailwindcss";

:root {
  --bg: #05070a;
  --blue: #2f6bff;
  --blue-glow: #3b82f6;
  --orange: #ff7a1a;
  --green: #22c55e;
  --red: #ef4444;
  --glass: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 255, 255, 0.1);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: #f5f7fb;
}
```

- [ ] **Step 3: Atualizar `app/layout.tsx`**

- Importar `Plus_Jakarta_Sans` de `next/font/google`
- `metadata.title`: `"Shiver Latan | Formação em Opções Binárias"`
- `metadata.description`: texto curto alinhado ao hero
- Aplicar className da fonte no `<body>`

- [ ] **Step 4: Verificar**

```bash
npx tsc --noEmit
```

Expected: sem erros de tipo em `lib/content.ts` e `layout.tsx`.

---

### Task 3: Primitivos UI (`Button`, `Badge`, `GlassCard`)

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/GlassCard.tsx`

**Interfaces:**
- Consumes: tokens CSS
- Produces:
  - `Button({ variant: "blue" | "orange" | "outline"; href: string; children; className? })`
  - `Badge({ children })`
  - `GlassCard({ children; className?; accent?: "blue" | "orange" })`

- [ ] **Step 1: Implementar `Button.tsx`**

```tsx
import Link from "next/link";

type Variant = "blue" | "orange" | "outline";

const styles: Record<Variant, string> = {
  blue: "bg-[var(--blue)] text-white shadow-[0_0_24px_rgba(47,107,255,0.45)] hover:brightness-110",
  orange:
    "bg-[var(--orange)] text-white shadow-[0_0_24px_rgba(255,122,26,0.4)] hover:brightness-110",
  outline:
    "border border-[var(--blue)] text-[var(--blue)] bg-transparent hover:bg-[var(--blue)]/10",
};

export function Button({
  variant,
  href,
  children,
  className = "",
}: {
  variant: Variant;
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 2: Implementar `Badge.tsx`**

```tsx
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Implementar `GlassCard.tsx`**

```tsx
type Accent = "blue" | "orange";

const accentBorder: Record<Accent, string> = {
  blue: "border-[var(--blue)]/40 shadow-[0_0_30px_rgba(47,107,255,0.15)]",
  orange: "border-[var(--orange)]/40 shadow-[0_0_30px_rgba(255,122,26,0.15)]",
};

export function GlassCard({
  children,
  className = "",
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: Accent;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white/5 backdrop-blur-md ${
        accent ? accentBorder[accent] : "border-white/10"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Verificar tipos**

```bash
npx tsc --noEmit
```

Expected: PASS.

---

### Task 4: Header + Hero

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Hero.tsx`
- Create: `public/images/mentor-hero.svg` (placeholder silhueta/retângulo)
- Modify: `app/page.tsx` (temporário: só Header + Hero)

**Interfaces:**
- Consumes: `content` de `lib/content.ts`; `Button`, `Badge`, `GlassCard`
- Produces: seções Header e Hero renderizáveis

- [ ] **Step 1: Criar placeholder SVG** `public/images/mentor-hero.svg` — retângulo escuro com iniciais ou silhueta simples (sem foto real ainda).

- [ ] **Step 2: Implementar `Header.tsx`**

Logo textual: círculo azul com “S” + `content.brand.logoText`.

- [ ] **Step 3: Implementar `Hero.tsx`**

Requisitos:
- Esquerda: `Badge`, headline (`headlineHighlight` em `text-[var(--orange)]`), subheadline, `Button` blue com ícone `Rocket` (lucide) → `content.ctaUrl`, feature bar com 4 ícones lucide
- Direita: `Image` do mentor + 3 `GlassCard` com pares + botões COMPRAR (verde) / VENDER (vermelho)
- `motion` (`framer-motion`): `animate={{ y: [0, -8, 0] }}` nos flutuantes, `transition={{ repeat: Infinity, duration: 3 }}`
- Em `md` ocultar ou reduzir flutuantes se poluir (`hidden lg:block` nos floats)
- Marcar seção com `className` adequada; Header pode ficar sticky/`absolute` no topo do hero

- [ ] **Step 4: Atualizar `app/page.tsx`**

```tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 5: Verificar visual**

```bash
npm run dev
```

Expected: hero dark, CTA azul, highlight laranja, floats no desktop. Sem strings BinaryClass/Berman.

---

### Task 5: Modules

**Files:**
- Create: `components/Modules.tsx`
- Modify: `app/page.tsx` (incluir `<Modules />`)

**Interfaces:**
- Consumes: `content.modules`, `Button`, `GlassCard`
- Produces: seção com `id={content.modules.id}` (`modulos`)

- [ ] **Step 1: Implementar `Modules.tsx`**

- Layout 2 colunas (stack no mobile)
- Eyebrow azul, título, description, `Button` outline → `#modulos` (âncora na própria seção — ok para “ver módulos”)
- 3 `GlassCard` com `accent` blue/orange/blue, número, título, description; ícones lucide (`PieChart`, `Brain`, `Globe`)
- Faixa inferior com `moreLabel` + `moreTopics`
- Entrada com `motion` (fade/slide) nos cards

- [ ] **Step 2: Incluir na page** após `<Hero />`.

- [ ] **Step 3: Verificar** em `npm run dev` — scroll/âncora `#modulos` funciona; 3 cards visíveis.

---

### Task 6: Results (stats + phone + depoimentos)

**Files:**
- Create: `components/Results.tsx`
- Create: `public/images/phone-mock.svg` (frame simples com área de gráfico)
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `content.results`, `GlassCard`
- Produces: seção Resultados Reais

- [ ] **Step 1: Placeholder `phone-mock.svg`** — retângulo tipo smartphone com texto `content.results.phoneProfit` pode ser overlay em JSX em vez de no SVG.

- [ ] **Step 2: Implementar `Results.tsx`**

- Headline com `titleHighlight` em laranja
- 3 stats com ícones
- Centro: mockup phone + lucro verde
- 4 depoimentos em `GlassCard` ao redor (grid no mobile; absolute/float no desktop)
- Avatares: círculos com iniciais (sem fotos reais)

- [ ] **Step 3: Incluir na page** após Modules.

- [ ] **Step 4: Verificar** — stats e 4 nomes de depoimentos renderizam.

---

### Task 7: Mentor + Footer

**Files:**
- Create: `components/Mentor.tsx`
- Create: `components/Footer.tsx`
- Create: `public/images/mentor-about.svg`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `content.mentor`, `content.footer`, `content.brand`, `Button`
- Produces: seções finais da landing

- [ ] **Step 1: Implementar `Mentor.tsx`**

- Foto esquerda (placeholder), texto direita
- Credenciais em linha com ícones
- `Button` orange → `content.ctaUrl` com `content.mentor.ctaLabel`

- [ ] **Step 2: Implementar `Footer.tsx`**

- Logo + `secureLabel` com ícone Shield
- `riskWarning` em texto pequeno
- Copyright + links Privacidade/Termos

- [ ] **Step 3: `page.tsx` final**

```tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Modules } from "@/components/Modules";
import { Results } from "@/components/Results";
import { Mentor } from "@/components/Mentor";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Modules />
      <Results />
      <Mentor />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 4: Verificar** seções mentor e footer no browser.

---

### Task 8: Build limpo + checklist de aceite

**Files:**
- Modify: apenas ajustes de polish se build/lint falhar
- Optional: `documents/2026-08-27-shiver-latan-landing-qa.md` (checklist curto)

**Interfaces:**
- Consumes: landing completa
- Produces: `npm run build` verde; critérios do spec atendidos

- [ ] **Step 1: Lint**

```bash
npm run lint
```

Expected: sem erros (warnings aceitáveis se não bloquearem).

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: compilação success; rota `/` gerada.

- [ ] **Step 3: Checklist manual (dev server)**

- [ ] Marca Shiver Latan no header/footer
- [ ] Nenhum “BinaryClass” / “Berman” no HTML
- [ ] Hero CTA e Mentor CTA usam `content.ctaUrl`
- [ ] `#modulos` scrolla para Modules
- [ ] Desktop: floats do hero visíveis
- [ ] Mobile: layout empilhado, sem overflow horizontal grave
- [ ] Aviso de risco no footer

- [ ] **Step 4: Atualizar status do spec** em `documents/2026-08-27-shiver-latan-landing-design.md` para `Status: Implementado (v1)` quando o checklist passar.

---

## Spec coverage (self-review)

| Spec | Task |
|------|------|
| Stack Next + Tailwind + Framer + Lucide | 1 |
| `content.ts` + ctaUrl `#` | 2 |
| Tokens / Plus Jakarta Sans | 2 |
| UI glass/button/badge | 3 |
| Header + Hero + floats | 4 |
| Modules + `#modulos` | 5 |
| Results + stats + depoimentos | 6 |
| Mentor placeholder + Footer risco | 7 |
| Critérios de sucesso / build | 8 |
| Fora de escopo (checkout etc.) | não implementado ✓ |

## Placeholder scan

Sem TBD/TODO abertos no plano; placeholders de imagem são SVGs explícitos nas Tasks 4–7.
