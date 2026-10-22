<script setup lang="ts">
import { stack } from "@/data/profile";
</script>

<template>
  <div class="band">
    <p class="sr-only">Stack : {{ stack.join(", ") }}</p>
    <div class="track" aria-hidden="true">
      <span v-for="n in 2" :key="n" class="run">
        <span v-for="tech in stack" :key="tech" class="item">{{ tech }} <span class="slash">/</span></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.band {
  background: var(--ink);
  color: var(--paper);
  overflow: hidden;
  padding-block: 22px;
}

.track {
  display: flex;
  width: max-content;
  animation: scroll 40s linear infinite;
}

.band:hover .track {
  animation-play-state: paused;
}

.run {
  display: flex;
  flex: none;
}

.item {
  padding-right: 0.5em;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(22px, 2.4vw, 30px);
  text-transform: uppercase;
  white-space: nowrap;
}

.slash {
  color: var(--accent);
}

@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}
</style>
