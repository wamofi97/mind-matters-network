# Mind Matters Network

Youth-led mental wellness movement — design system foundation.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui patterns
- Framer Motion
- Lucide React

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the **design system foundation preview**.

## Project structure

```
/components
  /layout      Navbar, Footer, Container, Section, PageShell
  /ui            Button, Card, PillTag
  /sections      FadeUp motion helpers
  /decorations   Blobs, circles, doodles, DecorationLayer
/constants       theme.ts, navigation.ts
/lib             utils, fonts, motion presets
/styles          globals.css (design tokens)
```

## Design tokens

Colors and semantic tokens live in `styles/globals.css` and `constants/theme.ts`.

- **Headings:** Fraunces
- **Body/UI:** Plus Jakarta Sans
- **Cards:** `rounded-[32px]`
- **Buttons:** `rounded-full`

## Next steps

Build actual pages (Home, About, Events, etc.) using `PageShell`, `Section`, and the component library — do not redesign the aesthetic.
