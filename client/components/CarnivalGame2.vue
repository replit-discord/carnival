<template>
  <div class="carnival-game-wrapper">
    <div class="carnival-game">
      <div class="carnival-game-inner">
        <h5 class="title">{{ game.title }}</h5>
        <p class="desc">{{ game.desc }}</p>
      </div>
      <img :src="game.img" :alt="(() => `image of game ${game.title}`)()" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarnivalGame',
  props: {
    game: {
      type: Object,
      default: () => ({
        id: 1,
        name: 'game-name',
        title: 'Game Title',
        author: 'author',
        desc: 'description',
        img: 'image'
      })
    }
  }
};
</script>

<style lang="postcss" scoped>
.carnival-game-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 9 by 16 aspect ratio */
}

.carnival-game {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  border: 1px solid $oc-gray-5;
}

.carnival-game-inner {
  width: 100%;
  height: 100%;

  /* background: $oc-gray-3; */
  border-radius: 5px;
}

.title {
  margin: 5px 0 0 5px;
}

.desc {
  margin: 2px 0 0 5px;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
  display: block;
  width: 100%;
  height: 100%;
  filter: blur(7px) brightness(80%);
}
</style>
