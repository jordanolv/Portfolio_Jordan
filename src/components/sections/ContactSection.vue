<script setup lang="ts">
import { profile } from "@/data/profile";
</script>

<template>
  <section id="contact" class="contact wrap">
    <span class="mono label">Contact</span>
    <h2 class="display title">Travaillons<br /><span class="hl">ensemble</span></h2>
    <div class="actions">
      <a :href="`mailto:${profile.email}`" class="btn btn--ink">{{ profile.email }} →</a>
      <a :href="profile.linkedin" class="btn" target="_blank" rel="noopener">LinkedIn ↗</a>
      <a :href="profile.github" class="btn" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
    <footer class="footer mono">
      <span>© {{ new Date().getFullYear() }} {{ profile.firstName }} {{ profile.lastName }}</span>
      <span>{{ profile.domain }}</span>
    </footer>
  </section>
</template>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-block: clamp(80px, 11vw, 120px) 48px;
}

.label {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.title {
  font-size: clamp(40px, 6.4vw, 96px);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.actions .btn {
  overflow-wrap: anywhere;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  margin-top: 64px;
  padding-top: 24px;
  border-top: 2px solid var(--ink);
}
</style>
