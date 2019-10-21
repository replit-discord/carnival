<template>
  <header :class="headingTransform">
    <div class="title">
      <h1>Carnival</h1>
    </div>
    <navbar class="navigation" :heading-transform="headingTransform" />
  </header>
</template>

<script>
import Navbar from './Nav';

export default {
  components: {
    navbar: Navbar
  },
  props: {
    headingTransform: {
      type: Object,
      default: () => ({ 'heading-transform': false })
    }
  }
};
</script>

<style lang="postcss" scoped>
header {
  display: inline-block;

  background-color: $bg;
  box-shadow: 2px 4px 4px $oc-gray-4;

  width: 100%;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Asap', sans-serif;

  padding: 15px;
  transition: all 150ms ease-in-out;
}

header.heading-transform .title {
  padding: 5px;
  transition: all 150ms ease-in-out;
}

h1 {
  color: $text;
}
</style>
