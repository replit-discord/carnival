<template>
  <div class="layout-default">
    <heading
      class="heading"
      :heading-transform="{ 'heading-transform': isHeadingTransform }"
    />
    <nuxt class="nuxt" />
    <div ref="intersection" class="intersection"></div>
  </div>
</template>

<script>
/* eslint-disable */
import Heading from '~/components/partials/Heading';

export default {
  data() {
    return {
      isHeadingTransform: false
    }
  },
  components: {
    heading: Heading
  },
  mounted() {
    const observer = new IntersectionObserver(entries => {
      // occurs when `this.$refs.intersection` was just 100% inside the viewport, and *just left*
      if(entries[0].intersectionRatio < 1) {
        this.isHeadingTransform = true;
      }
      // occurs when `this.$refs.intersection` is 100% inside the viewport, and *just entered*
      else {
        this.isHeadingTransform = false;
      }
    }, { threshold: 1 });

    observer.observe(this.$refs.intersection);
  }
};
</script>

<style lang="postcss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
}

.layout-default {
  position: relative;
}

.heading {
  position: sticky;
  top: 0;
  z-index: 100;

  grid-area: header;
}

.nuxt {
  grid-area: nuxt;
  margin: 10px;
}

.intersection {
  position: absolute;
  top: 20vh;

  height: 20px;
  width: 100%;
  z-index: -1000;
}
</style>
