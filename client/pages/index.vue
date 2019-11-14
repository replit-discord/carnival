<template>
  <div class="container">
    <FeaturedGame />
    <div class="game-list">
      <GamesGridResponsive :games="popular" section-title="Popular" />
      <GamesScrollResponsive :games="random" section-title="Random" />
      <GamesScrollResponsive
        :games="recentlyAdded"
        section-title="Recently Added"
      />
      <GamesScrollResponsive :games="mostLiked" section-title="Most Liked" />
      <GamesScrollResponsive :games="mostPlayed" section-title="Most Played" />
    </div>
  </div>
</template>

<script>
import FeaturedGame from '~/components/FeaturedGame';
import GamesGridResponsive from '~/components/collections/GamesGridResponsive';
import GamesScrollResponsive from '~/components/collections/GamesScrollResponsive';

export default {
  components: {
    GamesGridResponsive,
    GamesScrollResponsive,
    FeaturedGame
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

h2 {
  color: $oc-gray-9;
  font-size: 2em;
  padding: 0 0 5px;
}
</style>
