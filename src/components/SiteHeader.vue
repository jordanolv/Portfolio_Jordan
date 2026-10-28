<script setup lang="ts">
import { RouterLink } from "vue-router";
import CvMenu from "@/components/CvMenu.vue";
import { useMediaQuery } from "@/composables/useMediaQuery";

const isMobile = useMediaQuery("(max-width: 767px)");
</script>

<template>
  <header class="header wrap">
    <RouterLink to="/" class="logo" aria-label="Accueil">JO<span class="hl">.</span></RouterLink>
    <nav class="nav" aria-label="Navigation principale">
      <RouterLink :to="{ path: '/', hash: '#projets' }">Projets</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#parcours' }">Parcours</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#contact' }">Contact</RouterLink>
      <CvMenu class="cv" :menu="isMobile">CV</CvMenu>
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

.nav > a:hover {
  background: var(--accent);
}

.nav :deep(.cv) {
  margin-left: 8px;
  padding: 12px 24px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  font: inherit;
  transition: background-color 0.15s, color 0.15s;
}

.nav :deep(.cv:hover) {
  background: var(--accent);
  color: var(--ink);
}
</style>
