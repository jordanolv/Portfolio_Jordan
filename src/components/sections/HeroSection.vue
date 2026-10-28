<script setup lang="ts">
import { RouterLink } from "vue-router";
import { profile } from "@/data/profile";
import OpenSticker from "@/components/OpenSticker.vue";
import portrait from "@/assets/static/img/jordan.jpg";
</script>

<template>
  <section id="top" class="hero wrap">
    <div class="text">
      <p class="status mono">
        <span class="dot" aria-hidden="true"></span>
        <span>{{ profile.status }} — {{ profile.locationShort }}</span>
      </p>

      <h1 class="display name">
        {{ profile.firstName }}<br />
        <span class="hl">{{ profile.lastName }}</span>
      </h1>

      <p class="role">Développeur <span class="hl">full stack</span></p>
      <p class="intro">{{ profile.intro }}</p>

      <div class="actions">
        <RouterLink :to="{ path: '/', hash: '#projets' }" class="btn btn--ink">Voir mes projets <span aria-hidden="true">→</span></RouterLink>
        <RouterLink :to="{ path: '/', hash: '#contact' }" class="btn">Me contacter</RouterLink>
      </div>
    </div>

    <div class="portrait">
      <img :src="portrait" :alt="`Portrait de ${profile.firstName} ${profile.lastName}`" width="300" height="360" />
      <OpenSticker id="sticker-hero" class="sticker" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 48px 64px;
  padding-block: clamp(40px, 6vw, 72px) clamp(56px, 7vw, 88px);
}

.text {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.status {
  display: flex;
  align-items: baseline;
  gap: 12px;
  line-height: 1.7;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.dot {
  width: 10px;
  height: 10px;
  flex: none;
  border-radius: 50%;
  background: var(--ink);
  box-shadow: 0 0 0 4px var(--accent);
}

.name {
  font-size: clamp(48px, 7.2vw, 108px);
}

.role {
  margin-top: 8px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(18px, 1.8vw, 24px);
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.intro {
  max-width: 560px;
  font-size: clamp(17px, 1.5vw, 20px);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.portrait {
  position: relative;
  width: clamp(240px, 24vw, 320px);
  margin-left: 52px;
}

.portrait img {
  width: 100%;
  height: auto;
  aspect-ratio: 5 / 6;
  object-fit: cover;
  border-radius: var(--radius);
  filter: grayscale(1) contrast(1.1);
}

.sticker {
  position: absolute;
  left: -52px;
  bottom: -36px;
  width: 124px;
  height: 124px;
}

@media (max-width: 820px) {
  .hero {
    grid-template-columns: minmax(0, 1fr);
  }

  .portrait {
    justify-self: end;
  }
}
</style>
