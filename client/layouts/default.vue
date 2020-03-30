<template>
  <div class="default-layout">
    <Header />
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
