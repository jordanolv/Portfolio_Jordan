<script setup lang="ts">
import { profile } from "@/data/profile";
import OpenSticker from "@/components/OpenSticker.vue";
import portrait from "@/assets/static/img/jordan.jpg";
</script>

<template>
  <section id="top" class="hero wrap">
    <p class="status mono">
      <span class="dot" aria-hidden="true"></span>
      {{ profile.status }} — {{ profile.location }}
    </p>

    <h1 class="display name">
      {{ profile.firstName }}<br />
      <span class="hl">{{ profile.lastName }}</span>
    </h1>

    <div class="bottom">
      <p class="intro">
        Développeur <strong class="hl">full stack</strong>. {{ profile.intro }}
      </p>
      <div class="portrait">
        <img :src="portrait" :alt="`Portrait de ${profile.firstName} ${profile.lastName}`" width="220" height="260" />
        <OpenSticker id="sticker-hero" class="sticker" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-block: clamp(48px, 8vw, 80px) clamp(64px, 9vw, 96px);
}

.status {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
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
  font-size: clamp(52px, 9.6vw, 148px);
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 56px 48px;
  justify-content: space-between;
  align-items: flex-end;
}

.intro {
  max-width: 580px;
  font-size: clamp(19px, 2vw, 23px);
}

.intro strong {
  font-weight: 600;
}

.portrait {
  position: relative;
  width: 220px;
  flex: none;
  margin-left: 52px;
}

.portrait img {
  width: 220px;
  height: 260px;
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
</style>
