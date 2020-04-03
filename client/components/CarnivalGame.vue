<template>
  <div ref="carnivalGameWrapper" class="carnival-game-wrapper">
    <div
      class="carnival-game"
      @mouseenter="mouseEnterMeta"
      @mouseleave="mouseLeave"
    >
      <div class="foreground">
        <nuxt-link class="link" :to="gameLink">{{ game.title }}</nuxt-link>
      </div>
      <div class="background">
        <div class="gradient"></div>
        <img
          src="/public/img/z.jpg"
          :alt="(() => `image of game ${game.title}`)()"
        />
      </div>
    </div>
    <div
      ref="overlay"
      class="overlay"
      :class="{
        'left-side': sideOfScreen === 'left',
        'right-side': sideOfScreen === 'right'
      }"
      @mouseenter="mouseEnterOverlay"
      @mouseleave="mouseLeave"
    >
      <div class="overlay-inner">
        <h5 class="title">{{ game.title }}</h5>
        <p class="desc">{{ game.desc }}</p>
        <button><nuxt-link :to="gameLink">Play!</nuxt-link></button>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import { debounce } from 'lodash';

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
      isInOverlay: false,
      /* if is on the left side of the screen, overlay shows to the right */
      sideOfScreen: 'left'
    };
  },
  computed: {
    gameLink() {
      // TODO: return non-hyperlink (full url) so we don't have
      // to do an internal server redirect
      return `/game/${this.game.author}/${this.game.id}`;
    }
  },
  mounted() {
    this.calculateSideOfScreen();

    window.addEventListener(
      'resize',
      debounce(() => {
        this.calculateSideOfScreen();
      }, 300)
    );
  },
  methods: {
    calculateSideOfScreen() {
      const domRect = this.$refs.carnivalGameWrapper.getBoundingClientRect();

      const divLocation = domRect.left + domRect.width / 2;
      const actualCenter = window.innerWidth / 2;
      if (divLocation < actualCenter + 10) {
        this.sideOfScreen = 'left';
      } else {
        this.sideOfScreen = 'right';
      }
    },
    mouseEnterMeta(e) {
      this.isInMeta = true;

      e.stopPropagation();
      e.preventDefault();

      this.$refs.overlay.style.display = 'inline';
      requestAnimationFrame(() => {
        anime({
          duration: 77,
          easing: 'easeOutQuad',
          targets: this.$refs.overlay,
          translateY: 0,
          scale: 1,
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
            duration: 77,
            easing: 'easeOutQuad',
            targets: this.$refs.overlay,
            translateY: 20,
            scale: 0.985,
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

  & .link {
    position: absolute;
    bottom: 5px;
    left: 5px;

    /* to prevent text from being too close to right side */
    padding-right: 10px;
    font-size: 20px;
    color: $oc-gray-2;
    text-decoration: none;
  }

  /* .desc {
    margin: 2px 0 0 5px;
  } */
}

.background {
  z-index: 100;
  overflow: hidden;

  & .gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #2980b9, #2c3e50);
  }

  & img {
    visibility: none;
  }
}

.overlay {
  /* stylelint-disable a11y/no-display-none */
  position: absolute;
  top: -15px;
  z-index: 500;
  display: none;
  width: 350px;
  height: 425px;
  border: 5px;
  /* stylelint-enable a11y/no-display-none */
}

.overlay.left-side {
  margin-left: calc(100% - 15px);
}

.overlay.right-side {
  margin-left: calc(-100% - 40px);
}

.overlay-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #0f2027, #203a43, #2c5364);
  border: 5px;

  & .title {
    margin: 8px;
    font-size: 24px;
    color: $oc-gray-3;
  }

  & .desc {
    margin: 8px;
    font-size: 16px;
    color: $oc-gray-3;
  }

  & button {
    padding: 10px;
    margin: 8px;
    font-size: 16px;
    color: $oc-gray-3;
    background: $oc-blue-9;
    border-radius: 2px;
    transition: transform 0.15s ease-in-out;
    transform: scale(1);
  }

  & button:hover,
  & button:focus {
    cursor: pointer;
    transition: transform 0.15s ease-in-out;
    transform: scale(1.05);
  }

  & button > * {
    color: $oc-gray-3;
    text-decoration: none;
  }
}
</style>
