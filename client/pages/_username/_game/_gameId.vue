<template>
  <div class="game-view">
    <!-- TODO: deal with navbar -->

    <br />
    <br />
    <br />
    <br />
    <template v-if="loading === 'isLoading'">
      <div>
        <p>is loading</p>
      </div>
    </template>
    <template v-else-if="loading === 'doneLoading'">
      <template v-if="game">
        <Title>{{ game.title }}</Title>
        <Subheading>{{ game.desc }}</Subheading>
        <div>
          <p>{{ game }}</p>
        </div>
      </template>
      <template v-else>
        <Heading>User not found</Heading>
      </template>
    </template>
  </div>
</template>

<script>
import Heading from '~/components/text/Heading';
import Subheading from '~/components/text/Subheading';
import Title from '~/components/text/Title';

// for now, this is empty
// later, this will be the main page that displays a game
// /:user/:gameId redirects to /:user/:gameName/:gameId
// /:user/:gameId is the permalink
// /:user/:gameName displays page telling user to visit /:user to see games
export default {
  components: {
    Heading,
    Subheading,
    Title
  },
  async fetch() {
    const res = await this.$axios.get('/public/json/games.json');

    const gameId = this.$route.params.gameId;

    for (let game of res.data.data.games) {
      // eslint-disable-next-line eqeqeq
      if (game.id == gameId) {
        this.game = game;
        this.loading = 'doneLoading';
      }
      // TODO: there was an error, redirect to error page or show in template
    }
  },
  data() {
    return {
      game: null,
      loading: 'isLoading'
    };
  }
};
</script>
