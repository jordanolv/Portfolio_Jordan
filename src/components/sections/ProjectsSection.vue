<script setup lang="ts">
import { RouterLink } from "vue-router";
import { featuredProjects, listedProjects, projects } from "@/data/projects";
import ProjectCover from "@/components/ProjectCover.vue";
import ProjectRow from "@/components/ProjectRow.vue";

const variants = ["ink", "accent", "soft"] as const;
const pad = (n: number) => String(n).padStart(2, "0");
</script>

<template>
  <section id="projets" class="projects wrap">
    <div class="head">
      <h2 class="display title">Projets<br />sélectionnés</h2>
      <span class="mono">{{ pad(projects.length) }} projets — {{ pad(featuredProjects.length) }} à la une</span>
    </div>

    <div class="grid">
      <RouterLink v-for="(project, i) in featuredProjects" :key="project.id" :to="`/project/${project.id}`" class="card">
        <ProjectCover :project="project" :num="pad(i + 1)" :variant="variants[i % variants.length]" />
        <strong class="card-name">{{ project.name }}</strong>
        <span class="card-meta">{{ project.kind }} — {{ project.stack.slice(0, 3).join(", ") }}</span>
      </RouterLink>
    </div>

    <ul class="list">
      <ProjectRow
        v-for="(project, i) in listedProjects"
        :key="project.id"
        :project="project"
        :num="pad(featuredProjects.length + i + 1)"
      />
    </ul>

    <RouterLink to="/projects" class="btn all">Tous les projets →</RouterLink>
  </section>
</template>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  gap: 56px;
  padding-block: clamp(64px, 9vw, 96px);
}

.head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}

.title {
  font-size: clamp(38px, 5vw, 64px);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card-name {
  margin-top: 4px;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.card:hover .card-name {
  background: var(--accent);
  align-self: flex-start;
}

.card-meta {
  color: var(--muted);
  font-size: 16px;
}

.list {
  border-top: 2px solid var(--ink);
}

.all {
  align-self: flex-start;
}
</style>
