<template>
  <div class="carnival-game-wrapper">
    <div class="carnival-game">
      <div class="carnival-game-inner">
        <h3>Game Title</h3>
      </div>
    </div>
  </div>
</template>

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
