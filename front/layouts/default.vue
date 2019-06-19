<template>
  <div class="carnival-app">
    <Heading class="heading" />
    <Menu class="navigation" />
    <nuxt class="nuxt" />
  </div>
</template>

<script>
import Heading from '~/components/for-layouts/Heading';
import Menu from '~/components/for-layouts/Nav';

export default {
  components: {
    Heading,
    Menu
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

.carnival-app {
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 300px 1fr;
  gap: 10px;
  grid-template-areas:
    'header header'
    'navigation nuxt';
  height: 100vh;
}

.heading {
  grid-area: header;
}

.navigation {
  grid-area: navigation;
}

.nuxt {
  grid-area: nuxt;
  margin-right: 10px;
}
</style>
