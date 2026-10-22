<script setup lang="ts">
import { computed } from "vue";
import type { Project } from "@/data/projects";

const props = defineProps<{
  project: Project;
  /** Numéro affiché dans la pastille, ex. "01" */
  num?: string;
  /** Variante de couverture quand il n'y a pas encore de capture */
  variant?: "ink" | "accent" | "soft";
  /** Remplit la hauteur du parent au lieu du ratio 4/5 */
  fill?: boolean;
}>();

const image = computed(() => props.project.images?.[0]);
</script>

<template>
  <div class="cover" :class="[!image && `cover--${variant ?? 'ink'}`, { 'cover--fill': fill }]">
    <img v-if="image" :src="image" :alt="project.name" loading="lazy" />
    <span v-else class="title" aria-hidden="true">{{ project.name }}</span>
    <span class="pills">
      <span v-if="num" class="pill mono">{{ num }}</span>
      <span v-if="project.badge" class="pill pill--ink mono">{{ project.badge }}</span>
    </span>
  </div>
</template>

<style scoped>
.cover {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.cover--fill {
  aspect-ratio: auto;
  height: 100%;
}

.cover img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover--ink {
  background: var(--ink);
  color: var(--paper);
}

.cover--accent {
  background: var(--accent);
  color: var(--ink);
}

.cover--soft {
  background: var(--soft);
  color: var(--ink);
}

.title {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(30px, 3.4vw, 46px);
  line-height: 0.95;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.pills {
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  gap: 6px;
}

.pill {
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--accent);
  color: var(--ink);
  font-size: 12px;
  font-weight: 500;
}

.cover--accent .pill:not(.pill--ink) {
  background: var(--paper);
}

.pill--ink {
  background: var(--ink);
  color: var(--paper);
}

.cover--ink .pill--ink {
  background: var(--paper);
  color: var(--ink);
}
</style>
