# Sudip Parajuli — 3D Portfolio

[Live portfolio](https://sudip-parajuli.com.np/) · [Techwired Solutions](https://www.techwiredsolutions.com.np/) · [Personal links](https://sudip-parajuli.linkypot.com/)

A scroll-driven portfolio for my software, AI and business projects. Built with Next.js 16, React, TypeScript, Tailwind CSS, GSAP and a canvas image sequence. Includes an optional browser speech tour, a local portfolio guide and a contact form.

I am Director of Techwired Solutions, a registered business in Budhanilkantha Municipality, Nepal.

## Selected work

LinkyPot (OneQRCard), EasyMoto, Dashain Cards, Krisearch, ChillPill Gaming Cafe, GharBari and Gym Engine. Project descriptions are based on their repository documentation. Live access does not imply every integration is production-ready. Dashain Cards is playable on the web and in Google Play internal testing; Gym Engine remains in active development.

Education: BCA, Araniko Multiple Campus / Tribhuvan University, completed 2025. Professional development: Digital Marketing Bootcamp completion certificate provided by Budhanilkantha Municipality.

Experience: completed a three-month Python/Django backend development internship at Insight Workshop. The internship year is omitted pending confirmation.

## Development

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
npm run lint
npm run build -- --webpack
```

Open http://localhost:3000. The existing Vercel project deploys the main branch.

## Updating content

- `src/data/portfolio.ts`: selected projects, URLs, release status and profile facts.
- `src/components/ScrollHero.tsx`: four animated story scenes.
- `src/components/Education.tsx`: education and professional development.
- `src/components/Chatbot.tsx`: local, rule-based portfolio guide; no generative API or key required.
- `src/components/SoundNarrator.tsx`: opt-in browser speech narration. Keep it consistent with visible content.
- `src/components/Contact.tsx`: existing Web3Forms integration. Do not send test messages without authorization.
- `src/app/layout.tsx`: search/social metadata; `public/frames_v2/`: existing canvas sequence.

Only feature existing, substantial projects. Keep planned products out of the selected work and distinguish previews/internal tests from public releases. Do not add unverified audience metrics or launch dates. Repository visibility may require GitHub access.
