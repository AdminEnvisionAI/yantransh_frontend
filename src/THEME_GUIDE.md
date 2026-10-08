# Styling guide

The corporate pages reproduce the original YantranshVT design exactly. Keep
these conventions so the look stays consistent.

## Tokens

`src/theme.js` holds the colour, typography and layout tokens (`T`), form styles
(`formUi`), contact addresses (`EMAILS`) and the shared SVG icons (`IC`, `Icon`).
It has no client-only code, so server components can import it.

```jsx
import { T, W, Icon } from "../theme";
import { Rv } from "../components/reveal";

<section style={{ padding: "70px 0", background: T.bgAlt }}>
  <W>
    <Rv><h2 style={{ fontFamily: T.fd, fontSize: 36, color: T.navy }}>Heading</h2></Rv>
  </W>
</section>
```

- Fonts: Manrope (`T.fn`) for body and UI text, Playfair Display (`T.fd`) for headings.
- `W` is the 1200px page container; `Rv` fades content in as it scrolls into view.

## Global CSS

`src/app/globals.css` contains only the production base rules (reset, `fadeUp`
animation, and the `.dn` / `.mb` / `.fg` / `.form-grid` responsive helpers).
Component styles are inline, as on the original site.

## Product pages

Product pages may have their own look. Scope their stylesheet under a wrapper
class (VoiceIQ uses `.viq` in `components/voiceiq/voiceiq.css`) so it can never
change the corporate pages.
