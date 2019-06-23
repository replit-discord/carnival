<template>
  <nav>
    <ul class="nav">
      <nav-item
        v-for="d in navigationData"
        :key="d.name"
        :name="d.name"
        :to="d.to"
      ></nav-item>
    </ul>
  </nav>
</template>

<script>
import NavItem from '~/components/partials/NavItem';

export default {
  components: {
    'nav-item': NavItem
  },
  // TODO: Import some routes.js-like file or use Next API
  data() {
    return {
      navigationData: [
        {
          name: 'Home',
          to: '/'
        },
        {
          name: 'Games',
          to: '/games'
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
  gap: 20px;
  padding: 10px;
}
</style>
