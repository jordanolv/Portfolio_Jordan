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
      <a :href="profile.cv" class="cv" target="_blank" rel="noopener">CV ↓</a>
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

.nav .cv {
  margin-left: 8px;
  padding-inline: 20px;
  background: var(--ink);
  color: var(--paper);
}
</style>
