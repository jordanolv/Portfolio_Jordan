<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Project } from "@/data/projects";

defineProps<{ project: Project; num: string }>();
</script>

<template>
  <li class="row-item">
    <RouterLink :to="`/project/${project.id}`" class="row">
      <span class="num mono">{{ num }}</span>
      <strong class="name">{{ project.name }}</strong>
      <span class="meta">{{ project.kind }} — {{ project.stack.slice(0, 3).join(", ") }}</span>
      <span class="arrow" aria-hidden="true">→</span>
    </RouterLink>
  </li>
</template>

<style scoped>
.row-item {
  border-bottom: 1px solid var(--ink);
}

.row {
  display: grid;
  grid-template-columns: 64px minmax(0, 1.2fr) minmax(0, 1fr) 48px;
  gap: 16px;
  align-items: center;
  padding-block: 22px;
}

.name {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.meta {
  color: var(--muted);
  font-size: 16px;
}

.arrow {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s, color 0.15s;
}

.row:hover .arrow {
  background: var(--ink);
  color: var(--paper);
}

.row:hover .name {
  background: var(--accent);
}

@media (max-width: 720px) {
  .row {
    grid-template-columns: 40px minmax(0, 1fr) 44px;
    row-gap: 4px;
  }

  .meta {
    grid-column: 2;
    grid-row: 2;
    font-size: 15px;
  }

  .arrow {
    grid-column: 3;
    grid-row: 1 / span 2;
  }
}
</style>
