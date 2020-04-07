<!--
  redirects users from /:username/:gameId to /:username/:gameName/:gameId
-->

<template>
  <div class="redirect">
    <Heading class="heading">You are being Redirected...</Heading>
  </div>
</template>

<script>
import Heading from '~/components/Heading';

export default {
  layout: 'blank',
  components: {
    Heading
  },
  async asyncData({ route, params, query, redirect, error, $axios }) {
    const res = await $axios.get('/public/json/games.json');

    const username = route.params.username;
    const gameId = route.params.gameId;

    let gameName;
    for (let game of res.data.data.games) {
      // eslint-disable-next-line eqeqeq
      if (game.id == gameId) {
        gameName = game.name;
        break;
      }
    }

    console.log(username, gameName, gameId);
    if (username && gameName && gameId) {
      redirect(`/game/${username}/${gameName}/${gameId}`);
    }
  }
};
</script>

<style lang="postcss" scoped>
.redirect {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
