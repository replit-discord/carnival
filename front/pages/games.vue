<template>
  <div class="container">
    <Carosel />
    <h2>Popular</h2>
    <GridResponsive>
      <CarnivalGame v-for="n in 10" :key="n"></CarnivalGame>
    </GridResponsive>

    <h2>Recendly Added</h2>
    <ScrollResponsive>
      <CarnivalGame v-for="n in 10" :key="n"></CarnivalGame>
    </ScrollResponsive>

    <h2>Most Liked</h2>
    <ScrollResponsive>
      <CarnivalGame v-for="n in 10" :key="n"></CarnivalGame>
    </ScrollResponsive>

    <h2>Most Active</h2>
    <ScrollResponsive>
      <CarnivalGame v-for="n in 10" :key="n"></CarnivalGame>
    </ScrollResponsive>
  </div>
</template>

<script>
import GridResponsive from '~/components/structures/GridResponsive';
import ScrollResponsive from '~/components/structures/ScrollResponsive';
import CarnivalGame from '~/components/CarnivalGame';
import Carosel from '~/components/Carosel';

export default {
  components: {
    GridResponsive,
    ScrollResponsive,
    CarnivalGame,
    Carosel
  }
};
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
