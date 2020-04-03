<template>
  <div class="carnival-game-wrapper">
    <div
      class="carnival-game"
      @mouseenter="mouseEnterMeta"
      @mouseleave="mouseLeave"
    >
      <div class="foreground">
        <nuxt-link class="link" :to="gameLink">{{ game.title }}</nuxt-link>
        <p class="desc">{{ game.desc }}</p>
      </div>
      <div class="background">
        <img
          src="/public/img/z.jpg"
          :alt="(() => `image of game ${game.title}`)()"
        />
      </div>
    </div>
    <div
      ref="overlay"
      class="overlay"
      :class="{ enabled: isOverlayEnabled }"
      @mouseenter="mouseEnterOverlay"
      @mouseleave="mouseLeave"
    >
      <div class="overlay-inner">
        <h5 class="title">{{ game.title }}</h5>
        <p class="desc">{{ game.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';

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
    }
  },
  data() {
    return {
      isOverlayEnabled: false,
      isInMeta: false,
      isInOverlay: false
    };
  },
  computed: {
    gameLink() {
      // TODO: return non-hyperlink (full url) so we don't have
      // to do an internal server redirect
      return `/game/${this.game.author}/${this.game.id}`;
    }
  },
  methods: {
    mouseEnterMeta(e) {
      this.isInMeta = true;

      e.stopPropagation();
      e.preventDefault();

      this.$refs.overlay.style.display = 'inline';
      requestAnimationFrame(() => {
        anime({
          targets: this.$refs.overlay,
          translateY: 10,
          opacity: 1
        });
      });
    },
    mouseLeave(e) {
      this.isInMeta = false;
      this.isInOverlay = false;

      // if mouse is not in overlay by or in main ('meta') element
      // after 150 ms, then hide overlay
      setTimeout(() => {
        if (!this.isInOverlay && !this.isInMeta) {
          anime({
            targets: this.$refs.overlay,
            translateY: 0,
            opacity: 0,
            complete: anim => (this.$refs.overlay.style.display = 'none')
          });
        }
      }, 150);
    },
    mouseEnterOverlay(e) {
      this.isInOverlay = true;
    }
  }
};
</script>

<style lang="postcss" scoped>
.carnival-game-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.carnival-game {
  width: 100%;
  height: 100%;
}

.foreground,
.background,
.overlay {
  position: absolute;
  inset: 0;
}

.foreground {
  z-index: 300;
  overflow: hidden;
  border: 1px solid #868e96;

  & .link {
    position: absolute;
    bottom: 3px;
    left: 3px;
    font-size: 22px;
  }

  .desc {
    margin: 2px 0 0 5px;
  }
}

.background {
  z-index: 100;
  overflow: hidden;

  & img {
    width: 100%;
    filter: blur(7px) brightness(80%);
  }
}

.overlay {
  /* stylelint-disable a11y/no-display-none */
  position: absolute;
  z-index: 400;
  display: none;
  min-width: 200px;
  margin-left: 100%;
  opacity: 0;
  /* stylelint-enable a11y/no-display-none */
}

/* .overlay.enabled {
  display: inline;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
} */

.overlay-inner {
  width: 100%;
  height: 100%;
  background-color: maroon;
}
</style>
