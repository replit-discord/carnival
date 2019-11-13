<template>
  <div class="header-wrapper-wrapper" @click="enlargeHeader">
    <div class="header-wrapper">
      <header class="header">
        <h1>Carnival</h1>
      </header>
      <header class="navigation">
        <h1>back</h1>
      </header>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import Navbar from './Nav';

export default {
  components: {
    navbar: Navbar
  },
  beforeDestroy() {
    anime.remove('.header-wrapper');
  },
  methods: {
    enlargeHeader() {
      const margin = 10;

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
        easing: 'spring(1, 100, 90, 3)'
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

.navigation {
  display: grid;
  background-color: $bg;
  transform: rotateY(180deg);
}

.navigation h1 {
  margin: auto;
  text-align: center;
}

h1 {
  display: inline;
  color: $text;
}
</style>
