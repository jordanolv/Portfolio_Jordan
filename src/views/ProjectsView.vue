<script setup lang="ts">
import { archivedProjects, featuredProjects, listedProjects } from "@/data/projects";
import SiteHeader from "@/components/SiteHeader.vue";
import ProjectRow from "@/components/ProjectRow.vue";
import ContactSection from "@/components/sections/ContactSection.vue";

const groups = [
  { title: "Récents", projects: [...featuredProjects, ...listedProjects] },
  { title: "Archives 2022 — 2023", projects: archivedProjects },
];
const pad = (n: number) => String(n).padStart(2, "0");
</script>

<template>
  <SiteHeader />
  <main>
    <section class="page wrap">
      <h1 class="display title">Tous les<br /><span class="hl">projets</span></h1>
      <div v-for="(group, g) in groups" :key="group.title" class="group">
        <h2 class="mono group-title">{{ group.title }}</h2>
        <ul class="list">
          <ProjectRow
            v-for="(project, i) in group.projects"
            :key="project.id"
            :project="project"
            :num="pad((g === 0 ? 0 : groups[0].projects.length) + i + 1)"
          />
        </ul>
      </div>
    </section>
    <ContactSection />
  </main>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 56px;
  padding-block: clamp(48px, 8vw, 80px) 24px;
}

.title {
  font-size: clamp(44px, 7.2vw, 108px);
}

.group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.group-title {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.list {
  border-top: 2px solid var(--ink);
}
</style>
