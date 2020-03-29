<template>
  <div class="carnival-game-wrapper">
    <img
      class="aspect-ratio"
      src="https://picsum.photos/1280/720"
      width="1280"
      height="720"
    />
    <div class="carnival-game">
      <div class="foreground">
        <h5 class="title">{{ game.title }}</h5>
        <p class="desc">{{ game.desc }}</p>
      </div>
      <div class="background"></div>
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
}

.aspect-ratio {
  display: block;
  width: auto;
  height: 100%;
}

.carnival-game {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.foreground {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  padding: 0 0 10px 10px;
}

.title {
  margin: 5px 0 0 5px;
}

.desc {
  margin: 2px 0 0 5px;
}
</style>
