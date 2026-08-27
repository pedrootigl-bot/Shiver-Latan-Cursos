# Spec: Landing Shiver Latan

**Data:** 2026-08-27  
**Status:** Aguardando aprovação  
**Produto:** Shiver Latan — formação em Opções Binárias + Sala de Sinais ao vivo

## Objetivo

Criar uma landing page em Next.js que siga o layout de referência (dark, glassmorphism, hero com mentor + UI flutuante, módulos, resultados/depoimentos, mentor, footer), com marca e conteúdo Shiver Latan.

## Decisões validadas

| Tema | Decisão |
|------|----------|
| Marca | Shiver Latan (layout da BinaryClass, conteúdo próprio) |
| Nicho | Trading / opções binárias |
| Mentor | Placeholder (nome + fotos genéricas) até assets reais |
| Escopo v1 | Somente landing (`/`); CTAs → link externo |
| Stack | Next.js App Router + Tailwind CSS + Framer Motion + Lucide React |

## Fora de escopo (v1)

- Checkout / pagamento
- Área de membros
- CMS / blog
- Formulários de lead
- i18n
- Páginas Políticas/Termos (links no footer podem apontar para `#` ou URLs futuras)

## Arquitetura

### Stack

- **Next.js** (App Router)
- **Tailwind CSS** para layout e tokens
- **Framer Motion** para float do hero e entradas de seções
- **Lucide React** para ícones

### Estrutura de pastas

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  Header.tsx
  Hero.tsx
  Modules.tsx
  Results.tsx
  Mentor.tsx
  Footer.tsx
  ui/                 # Button, Badge, GlassCard
lib/
  content.ts          # textos, stats, módulos, depoimentos, ctaUrl
public/
  images/             # logo, mentor, avatares (placeholders)
```

### Dados

Todo o copy e a URL do CTA ficam em `lib/content.ts`. Componentes só consomem esses dados. Trocar Hotmart/WhatsApp = alterar `ctaUrl`.

### Seções (ordem na página)

1. **Header** — logo Shiver Latan
2. **Hero** — badge, headline, subcopy, CTA azul, feature bar (+20 módulos, acesso vitalício, atualizações, suporte); à direita foto do mentor + cards flutuantes (pares + COMPRAR/VENDER)
3. **Modules** — título + CTA “Ver todos os módulos”; 3 cards (Gestão, Mindset, Introdução); faixa “+17 módulos”
4. **Results** — headline Sala ao Vivo; stats (10k+, 85%+, 24/7); mockup de celular + 4 depoimentos em glass
5. **Mentor** — foto + bio placeholder + 3 credenciais + CTA laranja
6. **Footer** — logo, aviso de risco, badge “Plataforma segura”, copyright, links Privacidade/Termos

## Visual e tokens

| Token | Uso |
|-------|-----|
| Fundo `#05070a` | Background global |
| Azul elétrico | CTA principal, ícones, bordas glow |
| Laranja | Destaques no headline, CTA do mentor |
| Verde / vermelho | COMPRAR / VENDER no hero |
| Glass | `bg-white/5`, `border-white/10`, `backdrop-blur` |

**Tipografia:** Plus Jakarta Sans (via `next/font`).

**Motion:** float suave nos elementos do hero; fade/slide na entrada dos cards de módulos e depoimentos.

**Responsivo:** grid 2 colunas → stack no mobile; flutuantes do hero simplificados ou ocultos em viewports pequenas.

## CTAs

| Local | Label (rascunho) | Destino |
|-------|------------------|---------|
| Hero | Quero garantir minha vaga | `ctaUrl` em `content.ts` |
| Mentor | Quero ser guiado por [Mentor] | mesmo `ctaUrl` |
| Modules | Ver todos os módulos | âncora `#modulos` (scroll na própria seção) |

Valor inicial de `ctaUrl`: `#` (substituível sem rebuild de lógica).

## Placeholders

- Nome do mentor: ex. “Mentor Shiver”
- Bio e credenciais genéricas alinhadas ao nicho
- Imagens em `/public/images/` até assets oficiais (logo, hero, mentor sentado, avatares)

## Critérios de sucesso

- Landing visualmente alinhada à referência (seções, hierarquia, dark glass)
- Marca Shiver Latan consistente (logo + textos)
- CTAs funcionam via `ctaUrl`
- Layout utilizável em desktop e mobile
- Conteúdo editável em um único arquivo (`content.ts`)

## Próximo passo

Após aprovação deste spec → plano de implementação detalhado → scaffold Next.js e construção das seções.
