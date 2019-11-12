<template>
  <div class="carosel-wrapper">
    <div class="carosel">
      <div class="carosel-inner">
        <transition-group name="fade">
          <div v-if="gameView === 1" :key="1" class="game-1 game">
            <p>todo: fix this</p>
          </div>
          <div v-if="gameView === 2" :key="2" class="game-2 game">
            <p>todo: fix this</p>
          </div>
          <div v-if="gameView === 3" :key="3" class="game-3 game">
            <p>todo: fix this</p>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameView: 1,
      maxGameViews: 3,
      gameViewTimer: null
    };
  },
  mounted() {
    this.gameViewTimer = window.setInterval(this.rotateGameView, 2000);
  },
  destroyed() {
    window.clearTimeout(this.gameViewTimer);
  },
  methods: {
    rotateGameView() {
      if (this.gameView >= this.maxGameViews) {
        this.gameView = 1;
        return;
      }

      this.gameView = this.gameView + 1;
    }
  }
};
</script>

<style lang="postcss" scoped>
.carosel-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 30%;
}

.carosel {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid $oc-gray-8;
}

.carosel-inner {
  height: 80%;
  width: 80%;
}

.game {
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-1 {
  height: 100%;
  border-radius: 5px;
  background: $oc-violet-0;
  border: 1px solid $oc-violet-8;
}

.game-2 {
  height: 100%;
  border-radius: 5px;
  background: $oc-orange-0;
  border: 1px solid $oc-orange-8;
}

.game-2 {
  height: 100%;
  border-radius: 5px;
  background: $oc-green-0;
  border: 1px solid $oc-green-8;
}
</style>

<style lang="postcss" scoped>
.fade-enter {
  opacity: 0;
  transform: scale(0.9, 0.9) translateX(20px);
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
  transform: scale(1, 1) translateX(0);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.9, 0.9), translateX(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-in-out, transform 500ms ease-in-out,
    scale 500ms ease-in-out;
}
</style>
