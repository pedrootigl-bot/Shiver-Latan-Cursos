# Smooth Scroll (Lenis)

**Data:** 2026-08-27  
**Objetivo:** scroll com inércia leve no desktop/trackpad, sem afetar layout.

## Configuração

Arquivo: `components/SmoothScroll.tsx`

| Opção | Valor |
|-------|-------|
| `lerp` | `0.075` |
| `wheelMultiplier` | `0.9` |
| `smoothWheel` | `true` |
| `syncTouch` | `false` (mobile nativo) |
| `autoRaf` | `true` |
| `allowNestedScroll` | `true` |
| `anchors` | `true` |
| `respectReducedMotion` | `true` |

Para mudar a intensidade depois, edite as constantes `LENIS_LERP` e `LENIS_WHEEL_MULTIPLIER` em `components/SmoothScroll.tsx`.
