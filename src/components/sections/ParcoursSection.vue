<script setup lang="ts">
import { parcours } from "@/data/profile";
</script>

<template>
  <section id="parcours" class="parcours">
    <div class="inner wrap">
      <h2 class="display title">Parcours</h2>
      <ol class="steps">
        <li v-for="step in parcours" :key="step.title" class="step">
          <span class="mono period">{{ step.period }}</span>
          <div class="body">
            <strong class="step-title">{{ step.title }}</strong>
            <span v-if="step.place" class="place">{{ step.place }}</span>
            <p v-if="step.text">{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.parcours {
  background: var(--accent);
}

.inner {
  display: flex;
  flex-wrap: wrap;
  gap: 40px 64px;
  padding-block: clamp(64px, 9vw, 96px);
}

.title {
  flex: 1 1 300px;
  font-size: clamp(34px, 4.4vw, 60px);
}

.steps {
  flex: 999 1 600px;
  min-width: 0;
  border-bottom: 2px solid var(--ink);
}

.step {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 8px 24px;
  padding-block: 28px;
  border-top: 2px solid var(--ink);
}

.period {
  font-size: 14px;
  padding-top: 4px;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.step-title {
  font-family: var(--font-display);
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.place {
  font-weight: 600;
}

@media (max-width: 640px) {
  .step {
    grid-template-columns: 1fr;
  }
}
</style>
