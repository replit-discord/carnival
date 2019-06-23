<template>
  <header>
    <div class="title">
      <h1>Carnival</h1>
    </div>
    <div class="user-menu-wrapper">
      <nuxt-link to="/" class="user-menu">
        <p-svg></p-svg>
        <p>Sign In</p>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import SvgPlaceholder from '~/components/SvgPlaceholder.vue';

export default {
  components: {
    'p-svg': SvgPlaceholder
  }
};
</script>

<style lang="postcss" scoped>
header {
  display: grid;
  grid-template-columns: 1fr auto;

  background-color: $oc-gray-1;
  box-shadow: 2px 4px 4px $oc-gray-4;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.title {
  display: flex;
  align-items: center;
}

h1 {
  padding: 5px 0 5px 10px;
  color: $oc-gray-9;
}

.user-menu-wrapper {
  padding: 5px;
}

.user-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 5px;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid $oc-green-9;
  background-color: $oc-green-9;
  color: $oc-gray-1;
}

.svg-wrapper {
  padding: 5px;
  stroke: blue;
}

p {
  margin: 0;
  padding: 5px;
}
</style>
