<template>
  <section class="hero" id="about">
    <div class="hero__inner">
      <div class="hero__avatar fadeIn animated-slow">
        <div class="hero__avatar-ring"></div>
        <img src="../../assets/static/img/jordan.jpg" alt="Jordan Olivier" />
      </div>

      <div class="hero__text">
        <p class="hero__greeting">Bonjour, je suis</p>
        <h1 class="hero__name">
          <VueWriter :array="arr" :iterations="1" :delay="1000" :start="800" />
        </h1>
        <p class="hero__role">Web Developer</p>
        <p class="hero__desc">
          Fraîchement diplômé d'un <span>Mastère Expert en Développement Full Stack</span>,
          je sors de 3 ans d'alternance avec une solide expérience en conception
          et développement d'applications web.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import VueWriter from "vue-writer";
import { onMounted, onUnmounted } from "vue";

const arr: string[] = ["Jordan Olivier"];

const onMouseMove = (e: MouseEvent) => {
  document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
};

onMounted(() => window.addEventListener("mousemove", onMouseMove));
onUnmounted(() => window.removeEventListener("mousemove", onMouseMove));
</script>

<style lang="scss" scoped>
@import "@/styles/_utils.scss";

.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

// Avatar
.hero__avatar {
  position: relative;
  width: 140px;
  height: 140px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    z-index: 1;
    border: 2px solid rgba($main-color, 0.4);
  }
}

.hero__avatar-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1.5px solid rgba($main-color, 0.3);
  animation: spin-ring 8s linear infinite;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: 50%;
    width: 8px;
    height: 8px;
    background: $main-color;
    border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 8px $main-color;
  }
}

@keyframes spin-ring {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Text
.hero__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.hero__greeting {
  font-family: "SF Mono Regular", monospace;
  font-size: 0.85rem;
  color: $main-color;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hero__name {
  font-family: "Kaushan Script", cursive;
  font-size: clamp(2.2rem, 6vw, 3.8rem);
  font-weight: 400;
  line-height: 1.1;
  color: #e2e6f2;
}

.hero__role {
  font-family: "SF Mono Regular", monospace;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(#a8b2d1, 0.6);

  &::before {
    content: "— ";
    color: $main-color;
  }
  &::after {
    content: " —";
    color: $main-color;
  }
}

.hero__desc {
  max-width: 420px;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #a8b2d1;
  font-weight: 200;
  margin-top: 0.4rem;

  span {
    color: $main-color;
    font-weight: 400;
  }
}


// Responsive
@media (max-width: 580px) {
  .hero__avatar {
    width: 110px;
    height: 110px;
  }

  .hero__desc {
    font-size: 0.88rem;
    padding: 0 1rem;
  }

  .hero__scroll {
    bottom: 1.5rem;
  }
}
</style>
