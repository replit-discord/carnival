<template>
  <div class="container">
    <FeaturedGame />
    <div class="game-list">
      <Subheading>Popular</Subheading>
      <GridResponsive>
        <HorizontalAspectRatio v-for="game in popular" :key="game.id">
          <CarnivalGame :game="game" />
        </HorizontalAspectRatio>
      </GridResponsive>

      <Subheading>Random</Subheading>
      <ScrollResponsive>
        <VerticalAspectRatio v-for="game in random" :key="game.id">
          <CarnivalGame :game="game" />
        </VerticalAspectRatio>
      </ScrollResponsive>

      <Subheading>Most Liked</Subheading>
      <ScrollResponsive>
        <VerticalAspectRatio v-for="game in mostLiked" :key="game.id">
          <CarnivalGame :game="game" />
        </VerticalAspectRatio>
      </ScrollResponsive>

      <Subheading>Most Played</Subheading>
      <ScrollResponsive>
        <VerticalAspectRatio v-for="game in mostPlayed" :key="game.id">
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
// import Heading from '~/components/text/Heading';

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
  asyncData({ params, app, error }) {
    const promises = [];
    const routes = [
      'popular',
      'randoms',
      'recently-added',
      'most-liked',
      'most-played'
    ];
    routes.forEach(route => {
      const p = app.$axios
        .get(`/api/v1/game/${route}`)
        .then(({ data: { data } }) => data)
        .catch(err => {
          error({
            statusCode: 500,
            message: `oops! there was some error with asyncData and ${route}`
          });
          throw new Error(err);
        });
      promises.push(p);
    });
    return Promise.all(promises).then(
      ([popular, random, recentlyAdded, mostLiked, mostPlayed]) => ({
        popular,
        random,
        recentlyAdded,
        mostLiked,
        mostPlayed
      })
    );
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
