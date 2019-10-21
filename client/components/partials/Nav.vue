<template>
  <nav>
    <ul class="nav">
      <nav-item
        v-for="d in navigationData"
        :key="d.name"
        :name="d.name"
        :to="d.to"
        :heading-transform="headingTransform"
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
  props: {
    headingTransform: {
      type: Object,
      default: () => ({})
    }
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
          name: 'Browse By Category',
          to: '/bbc-temp'
        },
        {
          name: 'Browse by Tag',
          to: '/bbt-temp'
        },
        {
          name: 'Community',
          to: '/community'
        },
        {
          name: 'My Account',
          to: '/my-account'
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
