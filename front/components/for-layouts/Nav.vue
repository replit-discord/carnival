<template>
  <nav>
    <ul class="nav">
      <NavItem
        v-for="d in navigationData"
        :key="d.name"
        :name="d.name"
        :to="d.to"
      ></NavItem>
    </ul>
  </nav>
</template>

<script>
import NavItem from '~/components/for-layouts/NavItem'

export default {
  components: {
    NavItem
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
    }
  }
}
</script>

<style scoped>
.nav {
  display: grid;
  gap: 20px;
  padding: 10px;
}
</style>
