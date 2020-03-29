<template>
  <div class="games-scroll-responsive">
    <h3>{{ sectionTitle }}</h3>
    <ScrollResponsive>
      <CarnivalGame2 v-for="game in games" :key="game.id" :game="game" />
    </ScrollResponsive>
  </div>
</template>

<script>
import CarnivalGame2 from '~/components/CarnivalGame2';
import ScrollResponsive from '~/components/structures/ScrollResponsive';

export default {
  name: 'GamesPopular',
  components: {
    CarnivalGame2,
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

<style lang="postcss" scoped>
.games-scroll-responsive {
  margin-bottom: 5px;
}
</style>
