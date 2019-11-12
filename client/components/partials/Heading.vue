<template>
  <div ref="headerWrapperWrapper" class="header-wrapper-wrapper">
    <div class="header-wrapper">
      <header class="header" @click="enlargeHeader">
        <div class="menu"></div>
        <!-- <navbar class="navigation" /> -->
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
      let margin = 10;

      let headerWrapperWrapperDomRect = this.$refs.headerWrapperWrapper.getBoundingClientRect();
      let finalWidth = document.documentElement.clientWidth - margin * 2;
      let finalHeight = headerWrapperWrapperDomRect.height - margin * 2;

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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.header-wrapper {
  position: relative;
  display: inline-block;
  width: 170px;
  height: 60px;
}

.header {
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;

  background-color: $bg;
  box-shadow: 2px 4px 4px $oc-gray-4;
  border-radius: 5px;
  cursor: pointer;
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
