<template>
  <div class="carnival-game-wrapper">
    <div class="carnival-game">
      <div class="carnival-game-inner">
        <h3>{{ game.title }}</h3>
        <p>{{ game.desc }}</p>
        <h4>{{ game.img }}</h4>
        <img
          :src="game.img"
          :alt="(() => `image of game ${game.title}`)()"
          width="100px"
        />
      </div>
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
  padding-bottom: 56.25%; // 9 by 16 aspect ratio
}

.carnival-game {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.carnival-game-inner {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: $oc-gray-3;
}

h3 {
  color: $oc-gray-9;
  padding: 5px;
}
</style>
