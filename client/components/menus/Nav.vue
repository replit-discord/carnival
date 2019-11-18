<template>
  <ul class="nav">
    <nav-item
      v-for="d in navigationData"
      :key="d.name"
      :name="d.name"
      :to="d.to"
    ></nav-item>
  </ul>
</template>

<script>
import NavItem from '~/components/menus/NavItem';

export default {
  components: {
    'nav-item': NavItem
  },
  data() {
    return {
      navigationData: [
        {
          name: 'Home',
          to: '/'
        },
        {
          name: 'Community',
          to: '/community'
        },
        {
          name: 'About',
          to: '/about'
        }
      ]
    };
  }
};
</script>

<style scoped>
.nav {
  display: grid;
  grid-auto-flow: row;
  height: 100%;
}

.nav > * {
  margin: auto;
  text-align: center;
}
</style>
