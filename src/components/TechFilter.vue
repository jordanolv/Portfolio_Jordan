<script setup lang="ts">
defineProps<{ techs: string[]; modelValue: string | null }>();
defineEmits<{ (e: "update:modelValue", value: string | null): void }>();
</script>

<template>
  <div class="filter" role="group" aria-label="Filtrer par technologie">
    <button
      type="button"
      class="chip mono"
      :aria-pressed="modelValue === null"
      @click="$emit('update:modelValue', null)"
    >
      Tous
    </button>
    <button
      v-for="tech in techs"
      :key="tech"
      type="button"
      class="chip mono"
      :aria-pressed="modelValue === tech"
      @click="$emit('update:modelValue', tech)"
    >
      {{ tech }}
    </button>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 6px 12px;
  border: 2px solid var(--ink);
  background: var(--paper);
  color: var(--ink);
  font-size: 13px;
  cursor: pointer;
}

.chip:hover {
  background: var(--soft);
}

.chip[aria-pressed="true"] {
  background: var(--accent);
  font-weight: 700;
}
</style>
