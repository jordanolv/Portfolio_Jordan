<script setup lang="ts">
defineProps<{ id: string }>();
</script>

<template>
  <svg class="sticker" role="img" aria-label="Ouvert aux opportunités" viewBox="0 0 124 124">
    <defs>
      <path :id="id" d="M62,62 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
    </defs>
    <circle cx="62" cy="62" r="61" fill="var(--ink)" />
    <circle cx="62" cy="62" r="20" fill="var(--accent)" />
    <text class="ring" fill="var(--paper)" font-size="11.5" letter-spacing="2.2">
      <textPath :href="`#${id}`">OUVERT AUX OPPORTUNITÉS · 2026 ·</textPath>
    </text>
  </svg>
</template>

<style scoped>
.sticker {
  transform: rotate(-14deg);
}

.ring {
  font-family: var(--font-mono);
  transform-origin: 62px 62px;
  animation: spin 24s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
