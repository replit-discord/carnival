<template>
  <div class="container">
    <carosel />
    <div class="game-list">
      <h2>Popular</h2>
      <grid-responsive>
        <carnival-game v-for="n in 10" :key="n"></carnival-game>
      </grid-responsive>

      <h2>Recendly Added</h2>
      <scroll-responsive>
        <carnival-game v-for="n in 10" :key="n"></carnival-game>
      </scroll-responsive>

      <h2>Most Liked</h2>
      <scroll-responsive>
        <carnival-game v-for="n in 10" :key="n"></carnival-game>
      </scroll-responsive>

      <h2>Most Active</h2>
      <scroll-responsive>
        <carnival-game v-for="n in 10" :key="n"></carnival-game>
      </scroll-responsive>
    </div>
  </div>
</template>

<script>
import GridResponsive from '~/components/structures/GridResponsive';
import ScrollResponsive from '~/components/structures/ScrollResponsive';
import CarnivalGame from '~/components/CarnivalGame';
import Carosel from '~/components/Carosel';

export default {
  components: {
    'grid-responsive': GridResponsive,
    'scroll-responsive': ScrollResponsive,
    'carnival-game': CarnivalGame,
    'carosel': Carosel
  }
};
</script>

<style lang="postcss" scoped>
.container {
  height: 100%;
}

.game-list {
  margin: 0 10px;
}

h2 {
  color: $oc-gray-9;
  font-size: 2em;
  padding: 0 0 5px;
}
</style>
