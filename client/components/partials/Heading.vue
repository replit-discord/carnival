<template>
  <div ref="headerWrapperWrapper" class="header-wrapper-wrapper">
    <div class="header-wrapper">
      <header @click="growHeader" class="header">
        <h1>Carnival</h1>
      </header>
      <nav class="navigation">
        <Navbar />
        <div ref="close" @click="shrinkHeader" class="close">x</div>
      </nav>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import Navbar from './Nav';

export default {
  components: {
    Navbar
  },
  beforeDestroy() {
    anime.remove('.header-wrapper-wrapper');
    anime.remove('.header-wrapper');
  },
  methods: {
    growHeader() {
      const margin = 20;

      const dc = document.documentElement;
      const finalWidth = dc.clientWidth - margin * 2;
      const finalHeight = dc.clientHeight - margin * 2;

      anime({
        targets: '.header-wrapper-wrapper',
        translateX: 0,
        translateY: 0,
        easing: 'spring(1, 100, 90, 10)'
      });

      anime({
        targets: '.header-wrapper',
        translateX: margin,
        translateY: margin,
        rotateY: '180deg',
        width: finalWidth,
        height: finalHeight,
        easing: 'spring(1, 100, 90, 8)'
      });
    },
    shrinkHeader() {
      anime({
        targets: '.header-wrapper-wrapper',
        translateX: 10,
        translateY: 10,
        easing: 'spring(1, 100, 90, 10)'
      });

      anime({
        targets: '.header-wrapper',
        translateX: 0,
        translateY: 0,
        rotateY: '0deg',
        width: 190,
        height: 60,
        easing: 'spring(1, 100, 90, 8)'
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.header-wrapper-wrapper {
  position: fixed;
  z-index: 1000;
  perspective: 5000px;
  user-select: none;

  --border-radius: 5px;
  border-radius: var(--border-radius);

  transform: translate(10px, 10px);
  transition: all 0.25s ease-out-quint;
}

.header-wrapper-wrapper:hover {
  transform: translate(10px, 10px) scale(1.03, 1.03);
  transition: all 0.25s ease-out-quint;
}

.header-wrapper-wrapper:active {
  transform: translate(10px, 10px) scale(0.97, 0.97);
  transition: all 0.25s ease-out-quint;
}

.header-wrapper {
  position: relative;
  width: 190px;
  height: 60px;

  will-change: width, height;
  transform-style: preserve-3d;

  box-shadow: 2px 4px 4px $oc-gray-4;
  border-radius: var(--border-radius);
}

.header,
.navigation {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  backface-visibility: hidden;
  border-radius: var(--border-radius);
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $bg;
  cursor: pointer;
}

.header::before {
  content: '😏';
  font-size: 2rem;
  margin-right: 5px;
}

h1 {
  color: $text;
}

.navigation {
  background-color: $bg;
  transform: rotateY(180deg);
}

.close {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: white;

  cursor: pointer;
  border-radius: 5px;
  background-color: $bg-light;

  transition: all 0.25s ease-out-quint;
}

.close:hover {
  transform: scale(1.1, 1.1);
  transition: all 0.25s ease-out-quint;
}

.close:active {
  transform: scale(0.9, 0.9);
  transition: all 0.25s ease-out-quint;
}
</style>
