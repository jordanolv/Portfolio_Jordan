<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { profile } from "@/data/profile";

// La classe passée par le parent s'applique au bouton, pas au conteneur du menu
defineOptions({ inheritAttrs: false });

const props = defineProps<{
  /** Sur mobile : un tap ouvre le choix Afficher / Télécharger. Sinon le CV s'ouvre directement. */
  menu?: boolean;
  /** Ouvre le menu vers le haut (barre du bas des stories) */
  up?: boolean;
}>();

const open = ref(false);
const root = ref<HTMLElement>();

const close = (e: Event) => {
  if (e instanceof KeyboardEvent ? e.key === "Escape" : !root.value?.contains(e.target as Node)) open.value = false;
};

watch(open, (isOpen) => {
  const method = isOpen ? "addEventListener" : "removeEventListener";
  document[method]("pointerdown", close);
  document[method]("keydown", close);
});

watch(
  () => props.menu,
  (menu) => !menu && (open.value = false),
);

onBeforeUnmount(() => (open.value = false));
</script>

<template>
  <a v-if="!menu" v-bind="$attrs" :href="profile.cv" class="trigger" target="_blank" rel="noopener"><slot /></a>

  <span v-else ref="root" class="cv-menu">
    <button v-bind="$attrs" type="button" class="trigger" :aria-expanded="open" aria-haspopup="true" @click="open = !open">
      <slot />
    </button>
    <span v-if="open" class="popover" :class="up ? 'popover--up' : 'popover--down'" role="menu">
      <a :href="profile.cv" role="menuitem" target="_blank" rel="noopener" @click="open = false">Afficher <span aria-hidden="true">↗</span></a>
      <a :href="profile.cv" role="menuitem" download="CV Jordan Olivier.pdf" @click="open = false">Télécharger <span aria-hidden="true">↓</span></a>
    </span>
  </span>
</template>

<style scoped>
.cv-menu {
  position: relative;
  display: inline-flex;
}

.trigger {
  border: 0;
  cursor: pointer;
}

.popover {
  position: absolute;
  right: 0;
  z-index: 20;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  padding: 6px;
  border: 2px solid var(--ink);
  border-radius: 18px;
  background: var(--paper);
  color: var(--ink);
  box-shadow: 0 12px 32px rgba(10, 10, 10, 0.16);
}

.popover--down {
  top: calc(100% + 8px);
}

.popover--up {
  bottom: calc(100% + 10px);
}

.popover a {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
}

.popover a:hover,
.popover a:focus-visible {
  background: var(--accent);
}
</style>
