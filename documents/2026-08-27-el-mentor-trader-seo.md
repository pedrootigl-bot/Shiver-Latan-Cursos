# SEO — Landing El Mentor Trader

**Data:** 2026-08-27  
**Escopo:** melhorias técnicas de SEO sem alteração de layout visual

## Implementado

- Metadata completa (title, description, keywords, canonical, robots)
- Open Graph + Twitter Card
- `robots.ts` e `sitemap.ts` (App Router)
- JSON-LD (`Organization`, `WebSite`, `WebPage`, `Course`, `Person`)
- `lang="pt-BR"`, `font-display: swap`
- Landmarks semânticos (`main`, `section` com `aria-labelledby`, `footer`)
- Skip link acessível (visível só no foco)

## Configurar em produção

Definir a URL real em `.env`:

```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

Sem essa variável, o fallback atual é `https://elmentortrader.com` (ajuste quando o domínio oficial estiver definido).
