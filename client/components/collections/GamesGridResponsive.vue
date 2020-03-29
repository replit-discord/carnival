<template>
  <div class="games-grid-responsive">
    <Subheading>{{ sectionTitle }}</Subheading>
    <GridResponsive>
      <CarnivalGame v-for="game in games" :key="game.id" :game="game" />
    </GridResponsive>
  </div>
</template>

<script>
import Subheading from '~/components/text/Subheading';

import CarnivalGame from '~/components/CarnivalGame';
import GridResponsive from '~/components/layout/GridResponsive';

export default {
  name: 'GamesPopular',
  components: {
    Subheading,
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
