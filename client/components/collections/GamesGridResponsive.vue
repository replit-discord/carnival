<template>
  <div class="games-popular">
    <h2>Popular</h2>
    <GridResponsive>
      <CarnivalGame
        v-for="game in games"
        :key="game"
        :game="game"
      ></CarnivalGame>
    </GridResponsive>
  </div>
</template>

<script>
import CarnivalGame from '~/components/CarnivalGame';
import GridResponsive from '~/components/structures/GridResponsive';

export default {
  name: 'GamesPopular',
  components: {
    CarnivalGame,
    GridResponsive
  },
  props: {
    games: {
      type: Object
    }
  }
};
</script>

<style></style>
