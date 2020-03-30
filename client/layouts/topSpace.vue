<!--
  identical to `defualt.vue`, but with top spacing, so
  content does not display underneath navbar (since it is floating)
-->

<template>
  <div class="layout-topSpace">
    <Header />
    <div class="top-space"></div>
    <nuxt class="nuxt" />
  </div>
</template>

<script>
import Header from '~/components/menus/Header';

export default {
  components: {
    Header
  }
};
</script>

<style lang="postcss" scoped>
.top-space {
  height: 55px;
}
</style>
