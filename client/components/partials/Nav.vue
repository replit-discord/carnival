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
  grid-auto-flow: column;
  grid-template-rows: 1fr;
}

.nav > * {
  text-align: center;
}
</style>
