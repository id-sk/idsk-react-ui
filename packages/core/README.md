# @id-sk/react

Hlavná knižnica UI komponentov pre digitálne služby štátu (IDSK). Poskytuje sadu znovupoužiteľných a prístupných React
komponentov založených na IDSK dizajnovom systéme.

## 🚀 Technológie

- **Framework:** React 19
- **Stylovanie:** Tailwind CSS v4
- **Komponenty:** Radix UI primitives
- **Zostavenie:** Vite
- **Typovanie:** TypeScript

## 📦 Inštalácia

```bash
pnpm add @id-sk/react
# alebo
npm install @id-sk/react
```

## 🎨 Použitie CSS

Knižnica vyžaduje import CSS štýlov pre správne zobrazenie komponentov. Máte dve hlavné možnosti integrácie:

### 1. Manuálny import (Standard)

Vložte nasledujúci import do vášho hlavného vstupného súboru (napr. `main.tsx` alebo `App.tsx`):

```typescript
import '@id-sk/react/style.css';
```

### 2. Integrácia s Tailwind CSS v4 (Odporúčané)

Ak vo svojom projekte používate Tailwind CSS v4, môžete využiť tému a premenné knižnice pridaním `@reference` do vášho
hlavného CSS súboru. Týmto sprístupníte všetky IDSK utility bez duplikovania CSS:

```css
@import 'tailwindcss';

@reference "@id-sk/react";
```

### Konflikty s vlastnými štýlmi

Štýly knižnice sú v CSS vrstvách (`@layer`). Podľa pravidiel CSS majú štýly, ktoré nie sú v žiadnej vrstve, vždy prednosť pred štýlmi vo vrstvách – bez ohľadu na špecifickosť aj poradie načítania.

Ak má váš projekt globálny reset mimo vrstvy (napríklad predvolený `globals.css` v Next.js), prebije štýly komponentov – typicky vynuluje ich vnútorné odsadenie:

```css
/* ❌ mimo vrstvy – prebije štýly knižnice */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
```

Vlastné resety a základné štýly preto vložte do vrstvy `base`:

```css
/* ✅ vo vrstve – štýly knižnice majú prednosť */
@layer base {
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
}
```

## 🍦 Vanilla JS verzia

Knižnica obsahuje aj vanilla verziu, ktorú je možné použiť v projektoch bez Reactu. Komponenty sa inicializujú
automaticky po načítaní stránky.

```html
<!-- 1. Import štýlov -->
<link rel="stylesheet" href="node_modules/@id-sk/react/dist/style.css" />

<!-- 2. Import vanilla ES modulu -->
<script type="module" src="node_modules/@id-sk/react/dist/vanilla.es.js"></script>
```

## 🛠️ Vývoj a skripty

Ak chcete pracovať na vývoji komponentov v tomto balíku, spúšťajte príkazy z koreňa monorepa:

- `pnpm dev`: Spustí Vite vývojový server pre core balík.
- `pnpm build`: Spustí lint, typecheck a zostaví React aj Vanilla verziu balíka.

### Testovanie

Pre zabezpečenie kvality používame dva typy testov:

1. **Vitest (Unit)**: Rýchle testy v prostredí JSDOM.
   ```bash
   pnpm test
   ```
2. **Playwright (Component Testing)**: Testovanie komponentov v reálnom prehliadači.
   ```bash
   pnpm test-ct
   ```

## 📂 Štruktúra balíka

- `src/assets/fonts`: Adresár pre binárne súbory fontov (ttf, woff2).
- `src/components`: Zdrojové kódy React komponentov (každý obsahuje aj `vanilla.ts` ak je potrebný).
- `src/vanilla.ts`: Vstupný bod pre Vanilla JS build — auto-objavuje `vanilla.ts` súbory komponentov.
- `src/style`: Tailwind konfigurácia, globálne CSS a typografia.
- `dist`: Vygenerované distribučné súbory po zostavení.
- `playwright-ct.config.ts`: Konfigurácia pre Playwright Component Testing.

## 🔤 Písmo (Fonts)

Knižnica používa ako predvolenú rodinu písma **Source Sans 3**. Fonty sú integrované priamo v balíku:

- **Rezy:** ExtraLight (200), Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800),
  Black (900) + Italic verzie.
- **Formát:** TTF (pre maximálnu kompatibilitu).

Písmo je automaticky aplikované cez CSS premennú `--font-sans`. Ak chcete pridať ďalšie vlastné fonty:

1. Umiestnite súbory do `src/assets/fonts/`.
2. Definujte `@font-face` v `src/style/fonts.css` (alebo v novom CSS súbore a importujte ho v `global.css`).
