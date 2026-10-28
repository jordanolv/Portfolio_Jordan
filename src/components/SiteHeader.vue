<script setup lang="ts">
import { RouterLink } from "vue-router";
import { profile } from "@/data/profile";
</script>

<template>
  <header class="header wrap">
    <RouterLink to="/" class="logo" aria-label="Accueil">JO<span class="hl">.</span></RouterLink>
    <nav class="nav" aria-label="Navigation principale">
      <RouterLink :to="{ path: '/', hash: '#projets' }">Projets</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#parcours' }">Parcours</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#contact' }">Contact</RouterLink>
      <span class="cv-group">
        <a :href="profile.cv" class="cv" target="_blank" rel="noopener">CV ↗</a>
        <a :href="profile.cv" class="cv-dl" download="CV Jordan Olivier.pdf" aria-label="Télécharger le CV">↓</a>
      </span>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  justify-content: space-between;
  align-items: center;
  padding-block: 20px;
}

.logo {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 20px;
  letter-spacing: -0.02em;
}

.logo .hl {
  padding: 0 3px;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  font-size: 15px;
  font-weight: 600;
}

.nav a {
  padding: 12px 14px;
  border-radius: 999px;
}

.nav a:not(.cv):hover {
  background: var(--accent);
}

.cv-group {
  display: inline-flex;
  margin-left: 8px;
}

.nav .cv {
  padding-inline: 20px;
  border-radius: 999px 0 0 999px;
  background: var(--ink);
  color: var(--paper);
}

.nav .cv-dl {
  padding-inline: 14px 16px;
  border: 2px solid var(--ink);
  border-left: 0;
  border-radius: 0 999px 999px 0;
}
</style>
