<template>
  <div class="default-layout">
    <heading />
    <nuxt class="nuxt" />
  </div>
</template>

<script>
import Heading from '~/components/menus/Heading';

export default {
  components: {
    heading: Heading
  }
};
</script>

<style lang="postcss">
html {
  font-family: 'Source Sans Pro', system-ui;
  font-size: 16px;
  word-spacing: 1px;

  /* todo: cleanup this */
  /* stylelint-disable */
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  /* stylelint-enable */
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
}

h1,
h2 {
  font-family: 'Asap', sans-serif;
}
</style>
