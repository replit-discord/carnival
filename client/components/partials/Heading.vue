<template>
  <div ref="headerWrapperWrapper" class="header-wrapper-wrapper">
    <div class="header-wrapper">
      <header class="header" @click="enlargeHeader">
        <h1>content</h1>
      </header>
      <header class="header-back">
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
        translateY: 0
      });

      anime({
        targets: '.header-wrapper',
        translateX: margin,
        translateY: margin,
        rotateY: '-180deg',
        easing: 'spring(1, 100, 90, 10)',
        // easing: 'easeOutExpo',
        width: finalWidth,
        height: finalHeight,
        opacity: 0.5
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.header-wrapper-wrapper {
  position: fixed;
  transform: translate(10px, 10px);
  perspective: 5000px;
  z-index: 1000;
}

.header-wrapper {
  position: relative;

  width: 170px;
  height: 60px;
}

.header {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

  background-color: $bg;
  box-shadow: 2px 4px 4px $oc-gray-4;
  border-radius: 5px;
  cursor: pointer;
  z-index: 60;
}

.header-back {
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;
  z-index: 50;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  display: inline;
  color: $text;
}
</style>
