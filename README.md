# Fera Calculator

Fera Calculator is a fast, mobile-friendly React calculator website with 24 tools across finance, student utilities, converters, and daily tools.

## Tech stack

- React (functional components)
- React Router
- Vite

## Available scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run lint` - run ESLint checks

## Folder structure

```text
src/
  components/
    Seo.jsx
    ToolPage.jsx
  data/
    tools.js
  pages/
    HomePage.jsx
    tools/
      *CalculatorPage.jsx (24 separate tool page components)
      index.js
  App.jsx
  App.css
  index.css
  main.jsx
```

## Tool categories

- Finance Calculators
- Student Tools
- Converters
- Daily Tools

Each tool page includes:
- SEO title and meta description
- H1 + H2 headings
- instant calculation without reload
- input validation
- two solved examples
- FAQ section (3 questions)
- related internal links
