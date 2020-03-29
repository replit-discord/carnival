<template>
  <div class="container">
    <FeaturedGame />
    <div class="game-list">
      <Subheading>Popular</Subheading>
      <GridResponsive>
        <HorizontalAspectRatio v-for="game in gamesData.games" :key="game.id">
          <CarnivalGame :game="game" />
        </HorizontalAspectRatio>
      </GridResponsive>

      <Subheading>Random</Subheading>
      <ScrollResponsive>
        <VerticalAspectRatio v-for="game in gamesData.games" :key="game.id">
          <CarnivalGame :game="game" />
        </VerticalAspectRatio>
      </ScrollResponsive>

      <Subheading>Most Liked</Subheading>
      <ScrollResponsive>
        <VerticalAspectRatio v-for="game in gamesData.games" :key="game.id">
          <CarnivalGame :game="game" />
        </VerticalAspectRatio>
      </ScrollResponsive>

      <Subheading>Most Played</Subheading>
      <ScrollResponsive>
        <VerticalAspectRatio v-for="game in gamesData.games" :key="game.id">
          <CarnivalGame :game="game" />
        </VerticalAspectRatio>
      </ScrollResponsive>
    </div>
  </div>
</template>

<script>
import Subheading from '~/components/text/Subheading';
import FeaturedGame from '~/components/FeaturedGame';
import GridResponsive from '~/components/layout/GridResponsive';
import ScrollResponsive from '~/components/layout/ScrollResponsive';
import HorizontalAspectRatio from '~/components/layout/HorizontalAspectRatio';
import VerticalAspectRatio from '~/components/layout/VerticalAspectRatio';
import CarnivalGame from '~/components/CarnivalGame';

export default {
  components: {
    Subheading,
    GridResponsive,
    ScrollResponsive,
    FeaturedGame,
    HorizontalAspectRatio,
    VerticalAspectRatio,
    CarnivalGame
  },
  async asyncData({ params, app, error }) {
    let gamesData;
    try {
      const res = await app.$axios.get('/public/json/games.json');

      gamesData = res.data.data;
    } catch (err) {
      console.error(err);
    }

    return {
      gamesData
    };
  },
  mounted() {
    console.log(this.gamesRaw);
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
</style>
