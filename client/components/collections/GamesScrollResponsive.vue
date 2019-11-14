<template>
  <div class="games-random">
    <h2>{{ sectionTitle }}</h2>
    <ScrollResponsive>
      <CarnivalGame
        v-for="game in games"
        :key="game.id"
        :game="game"
      ></CarnivalGame>
    </ScrollResponsive>
  </div>
</template>

<script>
import CarnivalGame from '~/components/CarnivalGame';
import ScrollResponsive from '~/components/structures/ScrollResponsive';

export default {
  name: 'GamesPopular',
  components: {
    CarnivalGame,
    ScrollResponsive
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

<style></style>
