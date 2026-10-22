<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useMediaQuery } from "@/composables/useMediaQuery";
import SiteHeader from "@/components/SiteHeader.vue";
import MobileStories from "@/components/MobileStories.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import StackBand from "@/components/sections/StackBand.vue";
import ProjectsSection from "@/components/sections/ProjectsSection.vue";
import ParcoursSection from "@/components/sections/ParcoursSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";

const FULL_KEY = "portfolio:full-site";

const readFull = () => {
  try {
    return sessionStorage.getItem(FULL_KEY) === "1";
  } catch {
    return false;
  }
};

const isMobile = useMediaQuery("(max-width: 767px)");
const fullSite = ref(readFull());
const showStories = computed(() => isMobile.value && !fullSite.value);

watch(fullSite, (value) => {
  try {
    sessionStorage.setItem(FULL_KEY, value ? "1" : "0");
  } catch {
    // stockage indisponible (navigation privée) : on garde juste l'état en mémoire
  }
  window.scrollTo({ top: 0 });
});
</script>

<template>
  <MobileStories v-if="showStories" @full="fullSite = true" />
  <template v-else>
    <SiteHeader />
    <main>
      <HeroSection />
      <StackBand />
      <ProjectsSection />
      <ParcoursSection />
      <ContactSection />
    </main>
    <button v-if="isMobile" type="button" class="back-stories mono" @click="fullSite = false">
      ↺ Mode stories
    </button>
  </template>
</template>

<style scoped>
.back-stories {
  position: fixed;
  right: 16px;
  bottom: calc(16px + env(safe-area-inset-bottom));
  z-index: 10;
  min-height: 44px;
  padding: 0 16px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--accent);
  font-size: 13px;
  cursor: pointer;
}
</style>
