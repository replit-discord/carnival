<template>
  <div class="root-">
    <heading />
    <nuxt class="nuxt" />
  </div>
</template>

<script>
import Heading from '~/components/partials/Heading';

export default {
  components: {
    heading: Heading
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
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
}

.heading {
  position: sticky;
  top: 0;
  z-index: 100;

  grid-area: header;
}
</style>
