<!--
  redirects users from /:username/:gameId to /:username/:gameName/:gameId
-->

<template>
  <div class="redirect">
    <br />
    <br />
    <Heading>you are being redirected</Heading>
  </div>
</template>

<script>
// TODO: ensure that menu navbar does nots show on this route
import Heading from '~/components/text/Heading';

export default {
  components: {
    Heading
  },
  // TODO: optimize
  // async fetch() {
  //   const res = await this.$axios.get('/public/json/games.json');

  //   const username = this.$route.params.username;
  //   const gameId = this.$route.params.gameId;

  //   let gameName;
  //   for (const game of res.data.data.games) {
  //     // eslint-disable-next-line eqeqeq
  //     if (game.id == gameId) {
  //       gameName = game.name;
  //       break;
  //     }
  //   }

  //   console.log(`/${username}/${gameName}/${gameId}`);
  //   this.$router.push(`/${username}/${gameName}/${gameId}`);
  // },
  data() {
    return {
      game: null
    };
  },
  async mounted() {
    const res = await this.$axios.get('/public/json/games.json');

    const username = this.$route.params.username;
    const gameId = this.$route.params.gameId;

    let gameName;
    for (let game of res.data.data.games) {
      // eslint-disable-next-line eqeqeq
      if (game.id == gameId) {
        gameName = game.name;
        break;
      }
    }

    console.log(`/${username}/${gameName}/${gameId}`);
    this.$router.push(`/${username}/${gameName}/${gameId}`);
  }
};
</script>

<style style="postcss" scoped></style>
