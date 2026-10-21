# IDSK UI Library

Moderná knižnica UI komponentov pre digitálne služby štátu, založená na React, Tailwind CSS v4 a Radix UI. Projekt je
spravovaný ako monorepo pomocou pnpm workspaces a Turborepo.

## 🚀 Technologický zásobník

- **Framework:** React 19
- **Stylovanie:** Tailwind CSS v4
- **Primitíva:** Radix UI
- **Ikony:** Lucide React
- **Nástroje:** Vite
- **Testovanie:** Vitest & Playwright
- **Kvalita kódu:** ESLint, Prettier, Stylelint
- **Dokumentácia:** Storybook 10

## 📂 Štruktúra projektu

- `packages/core`: Hlavná knižnica komponentov.
- `packages/docs`: Storybook dokumentácia a príklady použitia.

## 🛠️ Inštalácia

Repo funguje s **pnpm aj npm**. Pre lokálny vývoj odporúčame pnpm:

```bash
pnpm install
```

Ak pnpm k dispozícii nie je (napr. na build serveri), použite npm — vyžaduje Node 24 podľa `.nvmrc`:

```bash
npm ci
```

Nemiešajte oba manažéry v jednom `node_modules`; pri prechode adresár najprv zmažte.

## 🚢 Nasadenie na server

Storybook aj knižnica sa zostavia do statických súborov — na serveri nebeží žiadny Node proces, stačí ľubovoľný
webserver (nginx, Apache, IIS). Node je potrebný len počas buildu.

### Požiadavky

| Položka | Hodnota                                                   |
| ------- | --------------------------------------------------------- |
| Node.js | 24.x (podľa `.nvmrc`; vyžadujú ju Vite 8 aj Storybook 10) |
| npm     | 11.x — je súčasťou Node 24, netreba inštalovať zvlášť     |
| pnpm    | nepovinné; build ide aj bez neho                          |

### Postup

```bash
git clone <repo> && cd idsk-ui-lib
node -v                                          # musí byť v24.x

npm ci                                           # inštalácia (~50 s)
STORYBOOK_DISABLE_TELEMETRY=1 npm run build:prod # build oboch balíkov (~1 min)
```

`build:prod` obchádza Turborepo aj kontrolnú bránu a zostaví balíky priamo, takže funguje pod npm aj pod pnpm.
`STORYBOOK_DISABLE_TELEMETRY=1` vypne odosielanie anonymnej telemetrie — na serveri bez prístupu von tým predídete
zbytočným timeoutom.

**Nepoužívajte `npm ci --omit=dev`** — Vite aj Storybook sú `devDependencies` a bez nich sa build nespustí.

### Výstupy

| Adresár              | Obsah                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `packages/core/dist` | knižnica: `index.es.js`, `index.umd.js`, `vanilla.js`, `style.css`, `.d.ts` |
| `packages/docs/dist` | statický Storybook (~18 MB) — toto sa nasadzuje na web                      |

### Nasadenie Storybooku

```bash
rsync -a --delete packages/docs/dist/ /var/www/idsk/
```

Všetky cesty vo výstupe sú relatívne (`./assets/…`), takže dokumentácia funguje aj z podadresára (napr.
`https://example.sk/dizajn/`) bez ďalšej konfigurácie.

```nginx
server {
  listen 80;
  server_name dizajn.example.sk;
  root /var/www/idsk;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }

  # Súbory v /assets/ majú hash v názve — môžu sa cachovať natrvalo
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml;
}
```

Pri aktualizácii stačí zopakovať `git pull` → `npm ci` → `build:prod` → `rsync`. Prepínač
`--delete` je dôležitý: odstráni staré hashované assety, ktoré by inak v adresári zostávali.

### Použitie knižnice v inej aplikácii

`@id-sk/react` sa nepublikuje do npm registra. Do cieľovej aplikácie ho dostanete cez tarball:

```bash
cd packages/core && npm pack          # vytvorí idsk-core-<verzia>.tgz
cd /cesta/k/aplikacii && npm install /cesta/k/idsk-core-<verzia>.tgz
```

Tarball musíte vytvárať až **po** `build:prod` — obsahuje `dist/`, ktorý sa nikam necommituje. Balík zatiaľ nemá pole
`files`, takže so sebou nesie aj zdrojáky a fonty (~32 MB rozbalene); na funkčnosť to vplyv nemá.

V aplikácii potom naimportujte štýly (`@id-sk/react/style.css`) a komponenty z `@id-sk/react`, prípadne vanilla build z
`@id-sk/react/vanilla`.

### Čomu sa na serveri vyhnúť

| Príkaz                     | Prečo nie                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `npm run build` (v koreni) | Spustí Turborepo, ktoré podľa poľa `packageManager` volá pnpm, a pred buildom ešte `format:check` — na serveri padne zbytočne. |
| `npm run storybook`        | Vývojový server s HMR na porte 6006, nie produkčné riešenie.                                                                   |
| `npm test`                 | Playwright sťahuje Chromium, Firefox aj WebKit (stovky MB). Testy patria do CI.                                                |
| npm a pnpm naraz           | Zmiešaný `node_modules` build rozbije. Pri prechode adresár najprv zmažte.                                                     |

### Riešenie problémov

| Hláška                                                      | Príčina                                                                                      |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `EUNSUPPORTEDPROTOCOL: Unsupported URL Type "workspace:"`   | Server má staršiu verziu repa. Stiahnite aktuálny `main`.                                    |
| `ERR_PNPM_FETCH_404: @id-sk/react is not in the npm registry` | V `pnpm-workspace.yaml` chýba `linkWorkspacePackages: true`.                                 |
| `Could not resolve 'vite'`                                  | Rozbitý `node_modules` po prerušenej alebo zmiešanej inštalácii. Zmažte ho a dajte `npm ci`. |
| `Command failed with exit code 254 … pnpm.mjs install`      | Spustený koreňový `build` cez Turborepo. Použite `build:prod`.                               |
| `Unknown project config "only-built-dependencies"`          | Neškodné varovanie — je to nastavenie pre pnpm v `.npmrc`, npm ho ignoruje.                  |

## 📜 Dostupné skripty

Tieto príkazy môžete spúšťať z koreňového adresára:

### Vývoj a zostavenie

- `pnpm dev`: Spustí Vite dev server pre `@id-sk/react`.
- `pnpm dev:docs`: Spustí Storybook dokumentáciu na `http://localhost:6006` (alias: `pnpm storybook`).
- `pnpm build`: Spustí lint, typecheck a zostaví všetky balíky cez Turborepo.

### Testovanie a kvalita

- `pnpm test`: Spustí Vitest unit testy aj Playwright CT testy (všetky balíky).
- `pnpm test-ct`: Spustí Playwright component testy iba pre `@id-sk/react`.
- `pnpm lint`: Skontroluje kód pomocou ESLint.
- `pnpm lint:style`: Skontroluje CSS súbory pomocou Stylelint.
- `pnpm lint:fix`: Automaticky opraví chyby v kóde pomocou ESLint.
- `pnpm format`: Sformátuje kód pomocou Prettier.
- `pnpm format:check`: Skontroluje formátovanie bez zmien.
- `pnpm typecheck`: Spustí kontrolu TypeScript typov.

## 📖 Dokumentácia

Podrobné informácie o jednotlivých balíkoch nájdete v ich príslušných adresároch:

- [Core Komponenty](./packages/core/README.md)
- [Dokumentácia a Storybook](./packages/docs/README.md)

## 📄 Licencia

Tento projekt je licencovaný pod MIT licenciou.
