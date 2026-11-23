# Portfolio_Jordan — consignes pour les agents

Site portfolio de Jordan Olivier (jordanolv.dev). Lire ce fichier en entier avant toute tâche ;
règles communes des workers : `/home/orca/orca-team/WORKER_RULES.md`.

## Stack
- Vue 3 (`<script setup lang="ts">`), vue-router 4 (history mode), Vite 7, TypeScript (vue-tsc).
- Aucun framework CSS : styles globaux dans `src/styles/main.css` (variables CSS dans `:root`),
  styles de composant en `<style scoped>`.
- Pas de backend, pas de tests unitaires : la vérification = type-check + build.

## Structure
- `src/data/profile.ts` : identité, stack, parcours (`parcours: Step[]`). **Les textes du site
  vivent ici** ; modifier le contenu = modifier ces données, pas les composants.
- `src/data/projects.ts` : projets (`Project`, `tier`: featured | list | archive), `findProject`.
- `src/views/` : `HomeView`, `ProjectsView` (`/projects`), `ProjectView` (`/project/:id`).
- `src/components/sections/` : sections de l'accueil (Hero, Parcours, Projects, Stack, Contact).
- `src/components/MobileStories.vue` + `src/composables/storyIndex.ts` : navigation « stories » mobile.
- Images : `src/assets/static/img/` (captures de projets en `.webp` dans `projects/`).
- `public/` : `CNAME`, `cv.pdf`, favicon (servis tels quels).

## Conventions
- Interface et textes en **français**. Direction artistique « Surligneur » : encre `--ink`,
  papier `--paper`, accent jaune `--accent: #e4ff3d`, polices Unbounded / Hanken Grotesk /
  JetBrains Mono. Réutiliser les variables CSS existantes, ne pas introduire de nouvelle palette.
- Mobile d'abord : vérifier tout changement visuel en largeur mobile (stories) et desktop.
- Alias `@/` → `src/`. Pas de nouvelle dépendance sans le justifier dans la PR.
- Commits en français, style conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).

## Commandes
- Installer : `npm ci --no-audit --no-fund --prefer-offline`
- Dev : `npm run dev`
- **Vérification (obligatoire avant PR)** :
  ```
  npm run type-check && npx vite build --outDir "$(mktemp -d)" --emptyOutDir
  ```
  ⚠️ Ne lance pas `npm run build` : il réécrit `dist/`, qui est versionné. **Ne commite jamais
  de changement dans `dist/`** (la CI reconstruit le site). Si `dist/` a bougé :
  `git checkout -- dist && git clean -fdq dist`.

## Git et déploiement
- Branche de base : `main`. Une fonctionnalité = une branche (`feat/...`, `fix/...`, `docs/...`)
  + une PR vers `main`.
- **Tout merge sur `main` déploie en production** (GitHub Actions → GitHub Pages, jordanolv.dev).
  Le merge est fait par Jordan uniquement. `main` est protégée (PR obligatoire).
- Ignorer les branches `gh-pages`, `imgbot`, `dev` (anciennes).

## Pièges connus
- Routes SPA : la CI copie `index.html` en `404.html` ; toute nouvelle route doit être déclarée
  dans `src/router/index.ts` (le catch-all redirige vers `/`).
