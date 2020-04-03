<template>
  <ul class="nav">
    <NavItem
      v-for="d in navigationData"
      :key="d.name"
      :name="d.name"
      :to="d.to"
    ></NavItem>
  </ul>
</template>

<script>
import NavItem from '~/components/menus/NavItem';

export default {
  components: {
    NavItem
  },
  data() {
    return {
      navigationData: [
        {
          name: 'Home',
          to: '/'
        },
        {
          name: 'Browse',
          to: '/browse'
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

<style lang="postcss" scoped>
.nav {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
