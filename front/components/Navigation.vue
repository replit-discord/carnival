<template>
  <nav>
    <ul class="navigation">
      <NavigationItem
        class="navigation-item"
        v-for="d in navigationData"
        :key="d.name"
        :name="d.name"
        :to="d.to"
      ></NavigationItem>
    </ul>
  </nav>
</template>

<script>
import NavigationItem from '~/components/NavigationItem'

export default {
  components: {
    NavigationItem
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
.navigation {
  display: grid;
  gap: 20px;
  padding: 10px;
}
</style>
