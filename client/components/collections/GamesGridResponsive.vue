<template>
  <div class="games-grid-responsive">
    <h2>{{ sectionTitle }}</h2>
    <GridResponsive>
      <CarnivalGame v-for="game in games" :key="game.id" :game="game" />
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
      type: Array,
      default: () => []
    },
    sectionTitle: {
      type: String,
      default: () => 'Generic Section Title'
    }
  }
};
</script>

<style lang="postcss" scoped>
.games-grid-responsive {
  margin-bottom: 15px;
}
</style>
