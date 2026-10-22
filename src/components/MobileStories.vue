<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { parcours, profile, stack } from "@/data/profile";
import { featuredProjects, type Project } from "@/data/projects";
import { useMediaQuery } from "@/composables/useMediaQuery";
import { storyIndex } from "@/composables/storyIndex";
import OpenSticker from "@/components/OpenSticker.vue";
import ProjectCover from "@/components/ProjectCover.vue";
import portrait from "@/assets/static/img/jordan.jpg";

const emit = defineEmits<{ full: [] }>();

type Story =
  | { kind: "intro" | "stack" | "parcours" | "contact"; label: string }
  | { kind: "project"; label: string; project: Project; num: string };

const stories: Story[] = [
  { kind: "intro", label: "bonjour" },
  { kind: "stack", label: "stack" },
  ...featuredProjects.map((project, i) => ({
    kind: "project" as const,
    label: `projet ${i + 1}/${featuredProjects.length}`,
    project,
    num: String(i + 1).padStart(2, "0"),
  })),
  { kind: "parcours", label: "parcours" },
  { kind: "contact", label: "contact" },
];

const variants = ["ink", "accent", "soft"] as const;
const HOLD_MS = 250;

const index = storyIndex;
const paused = ref(false);
let pressStart = 0;

const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const current = computed(() => stories[index.value]);
const isLast = computed(() => index.value === stories.length - 1);
const autoplay = computed(() => !reducedMotion.value && !isLast.value);
const theme = computed(() =>
  current.value.kind === "stack" ? "dark" : current.value.kind === "parcours" ? "accent" : "light",
);

const go = (i: number) => {
  index.value = Math.min(Math.max(i, 0), stories.length - 1);
};
const next = () => go(index.value + 1);
const prev = () => go(index.value - 1);

const press = () => {
  pressStart = Date.now();
  paused.value = true;
};
const release = () => {
  paused.value = false;
};
// Un appui long met en pause sans changer de story.
const tap = (dir: 1 | -1) => {
  if (pressStart && Date.now() - pressStart > HOLD_MS) {
    pressStart = 0;
    return;
  }
  pressStart = 0;
  go(index.value + dir);
};

const onKey = (e: KeyboardEvent) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
};
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <div class="stories" :class="`theme-${theme}`">
    <div class="top">
      <div :key="index" class="bars" aria-hidden="true">
        <span v-for="(s, k) in stories" :key="s.label" class="bar">
          <span
            class="fill"
            :class="{ done: k < index || (k === index && !autoplay), active: k === index && autoplay }"
            :style="{ animationPlayState: paused ? 'paused' : 'running' }"
            @animationend="next"
          ></span>
        </span>
      </div>
      <div class="who">
        <img :src="portrait" alt="" class="avatar" />
        <strong class="logo">JO<span class="hl">.</span></strong>
        <span class="mono label">{{ current.label }}</span>
        <span class="sr-only" aria-live="polite">Story {{ index + 1 }} sur {{ stories.length }} : {{ current.label }}</span>
      </div>
    </div>

    <main class="stage">
      <button
        type="button"
        class="zone zone--prev"
        aria-label="Story précédente"
        @pointerdown="press"
        @pointerup="release"
        @pointerleave="release"
        @click="tap(-1)"
      ></button>
      <button
        type="button"
        class="zone zone--next"
        aria-label="Story suivante"
        @pointerdown="press"
        @pointerup="release"
        @pointerleave="release"
        @click="tap(1)"
      ></button>

      <section v-if="current.kind === 'intro'" class="slide intro">
        <p class="mono status"><span class="dot" aria-hidden="true"></span>{{ profile.locationShort }}</p>
        <div class="portrait">
          <img :src="portrait" :alt="`Portrait de ${profile.firstName} ${profile.lastName}`" />
          <OpenSticker id="sticker-story" class="sticker" />
        </div>
        <h1 class="display name">{{ profile.firstName }}<br /><span class="hl">{{ profile.lastName }}</span></h1>
        <p class="lead">
          Développeur <strong class="hl">full stack</strong>, Mastère en poche après 3 ans d'alternance.
          {{ profile.statusShort }}.
        </p>
        <span class="mono hint">touchez pour continuer →</span>
      </section>

      <section v-else-if="current.kind === 'stack'" class="slide stack">
        <h2 class="mono kicker">Ma stack</h2>
        <ul class="display stack-list">
          <li v-for="tech in stack" :key="tech"><span class="slash">/</span> {{ tech }}</li>
        </ul>
      </section>

      <section v-else-if="current.kind === 'project'" class="slide project">
        <div class="shot">
          <ProjectCover
            :project="current.project"
            :num="current.num"
            :variant="variants[(Number(current.num) - 1) % variants.length]"
            fill
          />
        </div>
        <span class="mono kicker">{{ current.project.kind }}</span>
        <h2 class="display project-name">{{ current.project.name }}</h2>
        <p>{{ current.project.summary }}</p>
        <ul class="tags mono">
          <li v-for="tech in current.project.stack.slice(0, 4)" :key="tech">{{ tech }}</li>
        </ul>
        <RouterLink :to="`/project/${current.project.id}`" class="btn btn--ink cta">Voir le projet ↗</RouterLink>
      </section>

      <section v-else-if="current.kind === 'parcours'" class="slide parcours">
        <h2 class="display slide-title">Parcours</h2>
        <ol class="steps">
          <li v-for="step in parcours" :key="step.title">
            <span class="mono">{{ step.period }}</span>
            <strong>{{ step.title }}</strong>
            <span v-if="step.place">{{ step.place }}</span>
          </li>
        </ol>
      </section>

      <section v-else class="slide contact">
        <h2 class="display slide-title">Travaillons<br /><span class="hl">ensemble</span></h2>
        <a :href="`mailto:${profile.email}`" class="btn btn--ink link">M'écrire un mail <span aria-hidden="true">→</span></a>
        <a :href="profile.linkedin" class="btn link" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
        <a :href="profile.github" class="btn link" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
        <a :href="profile.cv" class="btn link link--accent" target="_blank" rel="noopener">Télécharger le CV <span aria-hidden="true">↓</span></a>
        <div class="after">
          <button type="button" class="mono text-btn" @click="go(0)">↺ revoir</button>
          <button type="button" class="mono text-btn" @click="emit('full')">voir le site complet →</button>
        </div>
      </section>
    </main>

    <div class="bottom">
      <button type="button" class="message" @click="go(stories.length - 1)">Envoyer un message à {{ profile.firstName }}…</button>
      <a :href="profile.cv" class="cv" aria-label="Télécharger le CV" target="_blank" rel="noopener">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.stories {
  --bg: var(--paper);
  --fg: var(--ink);
  --track: #e6e6e6;
  --muted-fg: var(--muted);

  position: fixed;
  inset: 0;
  height: 100dvh;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  background: var(--bg);
  color: var(--fg);
  transition: background-color 0.25s;
  user-select: none;
  -webkit-user-select: none;
  /* Désactive le zoom au double tap quand on enchaîne les taps (le pinch reste possible) */
  touch-action: manipulation;
}

.theme-dark {
  --bg: var(--ink);
  --fg: var(--paper);
  --track: rgba(255, 255, 255, 0.3);
  --muted-fg: #c9c9c9;
}

.theme-accent {
  --bg: var(--accent);
  --track: rgba(10, 10, 10, 0.2);
  --muted-fg: #2a2a2a;
}

/* Barre du haut */
.top {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: calc(14px + env(safe-area-inset-top)) 16px 12px;
}

.bars {
  display: flex;
  gap: 4px;
}

.bar {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: var(--track);
  overflow: hidden;
}

.fill {
  display: block;
  height: 100%;
  width: 0;
  background: var(--fg);
}

.fill.done {
  width: 100%;
}

.fill.active {
  animation: progress 6s linear forwards;
}

@keyframes progress {
  to {
    width: 100%;
  }
}

.who {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  filter: grayscale(1);
}

.logo {
  font-family: var(--font-display);
  font-size: 13px;
}

.logo .hl {
  color: var(--ink);
  padding: 0 2px;
}

.theme-accent .logo .hl {
  background: var(--ink);
  color: var(--accent);
}

.label {
  font-size: 12px;
  color: var(--muted-fg);
}

/* Zone de contenu */
.stage {
  position: relative;
  overflow: hidden;
}

.zone {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.zone--prev {
  left: 0;
  width: 35%;
}

.zone--next {
  right: 0;
  width: 65%;
}

.slide {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 8px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  pointer-events: none;
}

.slide a,
.slide button {
  pointer-events: auto;
}

.kicker {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted-fg);
}

/* Intro */
.intro {
  justify-content: center;
  gap: 18px;
}

.status {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--ink);
  box-shadow: 0 0 0 4px var(--accent);
}

.portrait {
  position: relative;
  align-self: flex-start;
  margin-left: 40px;
}

.portrait img {
  width: min(168px, 20dvh);
  height: min(200px, 24dvh);
  object-fit: cover;
  border-radius: 14px;
  filter: grayscale(1) contrast(1.1);
}

.sticker {
  position: absolute;
  left: -44px;
  bottom: -26px;
  width: 96px;
  height: 96px;
}

.name {
  margin-top: 10px;
  font-size: clamp(38px, 12.5vw, 52px);
}

.lead {
  font-size: 17px;
}

.lead strong {
  font-weight: 600;
}

.hint {
  align-self: flex-end;
  font-size: 12px;
}

/* Stack */
.stack {
  justify-content: center;
}

.stack-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: clamp(26px, 8.6vw, 34px);
  line-height: 1.12;
}

.slash {
  color: var(--accent);
}

/* Projet */
.project {
  gap: 10px;
}

.shot {
  flex: 1 1 auto;
  min-height: 0;
  margin: 0 -8px 6px;
}

.project-name {
  font-size: 26px;
  line-height: 1.05;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
}

.tags li {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1.5px solid var(--ink);
}

.cta {
  align-self: flex-start;
  min-height: 44px;
  font-size: 15px;
}

/* Parcours */
.slide-title {
  font-size: clamp(30px, 10vw, 40px);
}

.steps {
  border-bottom: 2px solid var(--ink);
}

.steps li {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-block: 14px;
  border-top: 2px solid var(--ink);
  font-size: 15px;
}

.steps strong {
  font-family: var(--font-display);
  font-size: 15px;
  letter-spacing: -0.02em;
}

/* Contact */
.contact {
  gap: 12px;
}

.contact .slide-title {
  margin-bottom: 16px;
  font-size: clamp(28px, 8.8vw, 34px);
}

.link {
  justify-content: space-between;
  min-height: 54px;
  padding-inline: 22px;
}

.link--accent {
  background: var(--accent);
}

.after {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.text-btn {
  min-height: 44px;
  padding: 0 4px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

/* Barre du bas */
.bottom {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px 16px calc(16px + env(safe-area-inset-bottom));
}

.message {
  flex: 1;
  height: 48px;
  padding: 0 18px;
  border-radius: 999px;
  border: 2px solid var(--fg);
  background: transparent;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}

.cv {
  width: 48px;
  height: 48px;
  flex: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fg);
  color: var(--bg);
}
</style>
