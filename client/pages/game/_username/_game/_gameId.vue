<template>
  <div class="game-view">
    <section class="main-content">
      <HorizontalAspectRatio>
        <div class="iframe-wrapper">
          <div class="iframe">
            <!-- TODO: look at iframe -->
            <iframe
              height="100%"
              width="100%"
              :src="replRunUrl"
              scrolling="no"
              frameborder="no"
              allowtransparency="true"
              allowfullscreen="true"
              sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"
            ></iframe>
          </div>
        </div>
      </HorizontalAspectRatio>
      <template v-if="loading === 'isLoading'">
        <div>is loading</div>
      </template>
      <template v-else-if="loading === 'doneLoading'">
        <Title>{{ game.title }}</Title>
        <Subheading>{{ game.desc }}</Subheading>
      </template>
    </section>
    <aside class="side-content">
      <!-- this will be abstracted later -->
      <template v-if="!gamesLoaded">
        <HorizontalAspectRatio>
          <div
            style="width: 100%; height: 100%; background-color: lightskyblue;"
          ></div>
        </HorizontalAspectRatio>
        <HorizontalAspectRatio>
          <div
            style="width: 100%; height: 100%; background-color: lightcoral;"
          ></div>
        </HorizontalAspectRatio>
        <HorizontalAspectRatio>
          <div
            style="width: 100%; height: 100%; background-color: lightskyblue;"
          ></div>
        </HorizontalAspectRatio>
      </template>
      <template v-else-if="gamesLoaded">
        <div class="thingy-outer">
          <HorizontalAspectRatio
            v-for="gamef in gamesData.games"
            :key="gamef.id"
          >
            <CarnivalGame :game="gamef" />
          </HorizontalAspectRatio>
        </div>
      </template>
    </aside>
    <!-- <template v-if="loading === 'isLoading'">
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
    </template> -->
  </div>
</template>

<script>
import CarnivalGame from '~/components/CarnivalGame';
import HorizontalAspectRatio from '~/components/layout/HorizontalAspectRatio';
import Subheading from '~/components/text/Subheading';
import Title from '~/components/text/Title';

// for now, this is empty
// later, this will be the main page that displays a game
// /:user/:gameId redirects to /:user/:gameName/:gameId
// /:user/:gameId is the permalink
// /:user/:gameName displays page telling user to visit /:user to see games
export default {
  layout: 'topSpace',
  components: {
    CarnivalGame,
    Subheading,
    Title,
    HorizontalAspectRatio
  },
  async fetch() {
    const res = await this.$axios.get('/public/json/games.json');

    const gameId = this.$route.params.gameId;

    for (let game of res.data.data.games) {
      // eslint-disable-next-line eqeqeq
      if (game.id == gameId) {
        this.game = game;
        this.replRunUrl = `https://${game.repl}--${game.author}.repl.co`;
        this.loading = 'doneLoading';
      }
      // TODO: there was an error, redirect to error page or show in template
    }
  },
  // spaghetti
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
  data() {
    return {
      game: null,
      loading: 'isLoading',
      replRunUrl: null,
      gamesLoaded: true
    };
  }
};
</script>

<style lang="postcss" scoped>
.game-view {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 10px;
  width: 100%;
  height: 100%;
}

.main-content {
  width: 100%;
  height: 100%;
}

.iframe-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: lightblue;
}

.iframe {
  inset-start: 0;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  background-color: orange;
}

.side-content {
  width: 100%;
  height: 100%;
}

.thingy-outer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
}
</style>
