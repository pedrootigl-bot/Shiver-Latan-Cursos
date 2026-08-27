# Previews de vídeo nos cards de módulos

**Data:** 2026-08-27

## Objetivo

Deixar a landing mais leve: capa com mini-vídeo (~4s) e vídeo completo só no clique.

## Arquivos

| Card | Preview (~4s) | Full |
|------|---------------|------|
| 01 | `public/videos/module-01-gestao-preview.mp4` (~496 KB) | `module-01-gestao.mp4` |
| 02 | `public/videos/module-02-mindset-preview.mp4` (~318 KB) | `module-02-mindset.mp4` |
| 03 | `public/videos/module-03-mercado-preview.mp4` (~223 KB) | `module-03-mercado.mp4` |

**Total previews:** ~1 MB (vs ~142 MB se os full rodassem nos cards).

## Encode

```bash
ffmpeg -i INPUT -t 4 -an -vf "scale='min(720,iw)':-2" -c:v libx264 -preset medium -crf 28 -pix_fmt yuv420p -movflags +faststart OUTPUT
```

## Código

- `lib/content.ts` → campos `preview` + `video`
- Card usa `preview` (loop mudo)
- Modal usa `video` com `preload="none"`
