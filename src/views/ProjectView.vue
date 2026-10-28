<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { findProject } from "@/data/projects";
import SiteHeader from "@/components/SiteHeader.vue";

const route = useRoute();
const project = computed(() => findProject(String(route.params.id)));
</script>

<template>
  <SiteHeader />
  <main class="wrap">
    <article v-if="project" class="project">
      <RouterLink :to="{ path: '/', hash: '#projets' }" class="mono back">← Retour aux projets</RouterLink>

      <header class="head">
        <span class="mono kicker">{{ project.kind }}<template v-if="project.year"> · {{ project.year }}</template></span>
        <h1 class="display title" :class="{ 'title--long': project.name.length > 10 }">{{ project.name }}</h1>
        <span v-if="project.badge" class="mono badge">{{ project.badge }}</span>
      </header>

      <div class="layout">
        <div class="media">
          <template v-if="project.images?.length">
            <img v-for="(src, i) in project.images" :key="src" :src="src" :alt="`${project.name}, capture ${i + 1}`" class="shot" />
          </template>
          <div v-else class="placeholder mono">Captures à venir</div>
        </div>

        <aside class="info">
          <p class="description">{{ project.description }}</p>
          <dl class="facts">
            <div>
              <dt class="mono">Client</dt>
              <dd>{{ project.client ?? "Projet personnel" }}</dd>
            </div>
            <div>
              <dt class="mono">Stack</dt>
              <dd>
                <ul class="tags mono">
                  <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
                </ul>
              </dd>
            </div>
          </dl>
          <div v-if="project.links?.length" class="links">
            <a v-for="link in project.links" :key="link.href" :href="link.href" class="btn btn--ink" target="_blank" rel="noopener">
              {{ link.label }} ↗
            </a>
          </div>
        </aside>
      </div>
    </article>

    <section v-else class="missing">
      <h1 class="display title">Projet <span class="hl">introuvable</span></h1>
      <RouterLink to="/projects" class="btn">Voir tous les projets →</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.project,
.missing {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-block: clamp(32px, 6vw, 64px) 96px;
}

.back {
  align-self: flex-start;
  padding: 10px 0;
}

.back:hover {
  background: var(--accent);
}

.head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.kicker {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.title {
  font-size: clamp(40px, 6.4vw, 96px);
  overflow-wrap: anywhere;
}

/* Les noms longs (ex. dylanolivier.fr) doivent tenir sur une ligne */
.title--long {
  font-size: clamp(28px, 5.4vw, 76px);
}

.badge {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
}

.layout {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  align-items: flex-start;
}

.media {
  flex: 999 1 560px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.shot {
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid #e0e0e0;
}

.placeholder {
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  background: var(--soft);
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.info {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.description {
  font-size: 20px;
}

.facts {
  margin: 0;
  border-top: 2px solid var(--ink);
}

.facts > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-block: 16px;
  border-bottom: 1px solid var(--ink);
}

.facts dd {
  margin: 0;
  font-weight: 600;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
  font-weight: 400;
}

.tags li {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1.5px solid var(--ink);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
