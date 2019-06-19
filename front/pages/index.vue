<template>
  <div class="container">
    <h2>Games</h2>
    <GridResponsive>
      <CarnivalGame v-for="n in 10" :key="n"></CarnivalGame>
    </GridResponsive>
  </div>
</template>

<script>
import GridResponsive from '~/components/structures/GridResponsive'
import CarnivalGame from '~/components/CarnivalGame'

export default {
  components: {
    GridResponsive,
    CarnivalGame
  }
}
</script>

<style lang="postcss" scoped>
.container {
  height: 100%;
}

h2 {
  color: $oc-gray-9;
  font-size: 2em;
  padding: 0 0 5px;
}
</style>
