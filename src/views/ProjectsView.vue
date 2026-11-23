<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { archivedProjects, featuredProjects, listedProjects } from "@/data/projects";
import SiteHeader from "@/components/SiteHeader.vue";
import ProjectRow from "@/components/ProjectRow.vue";
import TechFilter from "@/components/TechFilter.vue";
import ContactSection from "@/components/sections/ContactSection.vue";

const allGroups = [
  { title: "Récents", projects: [...featuredProjects, ...listedProjects] },
  { title: "Archives 2022 — 2023", projects: archivedProjects },
];

const key = (t: string) => t.trim().toLowerCase();

// Clé insensible à la casse -> libellé canonique (première graphie rencontrée).
const labels = new Map<string, string>();
for (const g of allGroups) for (const p of g.projects) for (const t of p.stack) if (!labels.has(key(t))) labels.set(key(t), t);

const techs = [...labels.values()].sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));

const route = useRoute();
const router = useRouter();

const rawTech = computed<string | null>(() => {
  const t = route.query.tech;
  const value = Array.isArray(t) ? t[0] : t;
  return value ? value : null;
});
// Clé active (null = « Tous »). Une valeur inconnue garde sa clé et ne correspond à aucun projet.
const activeKey = computed(() => (rawTech.value ? key(rawTech.value) : null));
// Libellé canonique de la puce active (null si Tous ou valeur inconnue).
const selected = computed(() => (activeKey.value ? (labels.get(activeKey.value) ?? null) : null));

function select(tech: string | null) {
  const { tech: _omit, ...rest } = route.query;
  router.replace({ query: tech ? { ...rest, tech } : rest, hash: route.hash });
}

// Numérotation continue sur la liste filtrée : pas de trou.
const groups = computed(() => {
  let offset = 0;
  return allGroups
    .map((g) => {
      const k = activeKey.value;
      const projects = k ? g.projects.filter((p) => p.stack.some((t) => key(t) === k)) : g.projects;
      const group = { title: g.title, projects, offset };
      offset += projects.length;
      return group;
    })
    .filter((g) => g.projects.length > 0);
});

const pad = (n: number) => String(n).padStart(2, "0");
</script>

<template>
  <SiteHeader />
  <main>
    <section class="page wrap">
      <h1 class="display title">Tous les<br /><span class="hl">projets</span></h1>
      <TechFilter :techs="techs" :model-value="selected" @update:model-value="select" />
      <p v-if="groups.length === 0" class="mono empty" role="status">Aucun projet pour cette technologie.</p>
      <div v-for="group in groups" :key="group.title" class="group">
        <h2 class="mono group-title">{{ group.title }}</h2>
        <ul class="list">
          <ProjectRow
            v-for="(project, i) in group.projects"
            :key="project.id"
            :project="project"
            :num="pad(group.offset + i + 1)"
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

.empty {
  color: var(--muted);
}

.list {
  border-top: 2px solid var(--ink);
}
</style>
