<template>
  <div class="container">
    <carosel />
    <div class="game-list">
      <GamesPopular :games="popular" />

      <GamesRandom :games="random" />

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
import GamesPopular from '~/components/collections/GamesPopular';
import GamesRandom from '~/components/collections/GamesRandom';

export default {
  components: {
    GamesPopular,
    GamesRandom,
    'grid-responsive': GridResponsive,
    'scroll-responsive': ScrollResponsive,
    'carnival-game': CarnivalGame,
    'carosel': Carosel
  },
  asyncData({ params, app, error }) {
    const p1 = app.$axios
      .get('/api/v1/game/popular/')
      .then(({ data: { data } }) => data)
      .catch(err => {
        console.error(err);
        error({
          statusCode: 500,
          message: 'oops! there was some error with asyncData'
        });
      });
    const p2 = app.$axios
      .get('/api/v1/game/randoms/')
      .then(({ data: { data } }) => data)
      .catch(err => {
        console.error(err);
        error({
          statusCode: 500,
          message: 'oops! there was some error with asyncDatas'
        });
      });
    return Promise.all([p1, p2]).then(([popular, random]) => ({
      popular,
      random
    }));
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
