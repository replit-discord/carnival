<template>
  <div class="carnival-game">
    <div class="foreground">
      <nuxt-link :to="gameLink">{{ game.title }}</nuxt-link>
      <h5 class="title">{{ game.title }}</h5>
      <p class="desc">{{ game.desc }}</p>
    </div>
    <div class="background">
      <img
        src="/public/img/z.jpg"
        :alt="(() => `image of game ${game.title}`)()"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarnivalGame',
  props: {
    game: {
      default: () => ({
        author: 'author',
        desc: 'description',
        id: 1,
        img: 'image',
        name: 'game-name',
        title: 'Game Title'
      }),
      type: Object
    },
    heightOverride: {
      default: () => '500px',
      type: String
    }
  },
  computed: {
    gameLink() {
      // TODO: return non-hyperlink (full url) so we don't have
      // to do an internal server redirect
      return `/game/${this.game.author}/${this.game.id}`;
    }
  }
};
</script>

<style lang="postcss" scoped>
.carnival-game {
  position: relative;
  width: 100%;
  height: 100%;
}

.foreground,
.background {
  position: absolute;
  inset: 0;
}

.foreground {
  z-index: 300;
  overflow: hidden;
  border: 1px solid #868e96;
}

.background {
  z-index: 100;
  overflow: hidden;
}

.title {
  margin: 5px 0 0 5px;
}

.desc {
  margin: 2px 0 0 5px;
}

img {
  width: 100%;
  filter: blur(7px) brightness(80%);
}
</style>
