<template>
  <div class="header-wrapper-wrapper">
    <div ref="headerWrapper" class="header-wrapper">
      <header class="header" aria-label="😏">
        <h1>Carnival</h1>
      </header>
      <!-- <nav class="navigation">
        <Navbar />
        <div ref="close" @click="shrinkHeader" class="close">x</div>
      </nav> -->
    </div>
    <div class="mouse-enter" />
  </div>
</template>

<script>
import { throttle, debounce } from 'lodash';
import anime from 'animejs';
// import Navbar from './Nav';

export default {
  // components: {
  //   Navbar
  // },
  data() {
    return {
      previousScrollOffset: 0,
      headerOffset: 0
    };
  },
  beforeMount() {
    // set the 'previous' scroll offset before component mounts
    this.previousScrollOffset = document.documentElement.scrollTop;

    window.addEventListener(
      'scroll',
      throttle(this.prepareBounceHeader, 300, {
        trailing: false
      }),
      {
        passive: true
      }
    );

    window.addEventListener('scroll', debounce(this.endBounceHeader, 100), {
      passive: true
    });
  },
  beforeDestroy() {
    window.removeEventListener(
      'scroll',
      throttle(this.prepareBounceHeader, 300, {
        trailing: false
      }),
      {
        passive: true
      }
    );

    window.addEventListener('scroll', debounce(this.endBounceHeader, 100), {
      passive: true
    });
  },
  methods: {
    prepareBounceHeader() {
      const scrollOffset = document.documentElement.scrollTop;

      let scrollDirection;
      if (scrollDirection === this.previousScrollOffset) {
        scrollDirection = 'neutral';
      } else if (scrollOffset > this.previousScrollOffset) {
        scrollDirection = 'down';
      } else {
        scrollDirection = 'up';
      }

      // we are done using the previous scroll value, set it to the current
      this.previousScrollOffset = scrollOffset;
      let translateBy;
      switch (scrollDirection) {
        case 'up':
          translateBy = '+=3';
          this.headerOffset += 3;
          break;
        case 'down':
          translateBy = '-=3';
          this.headerOffset -= 3;
          break;
        case 'neutral':
          translateBy = 0;
          break;
        default:
          translateBy = 0;
      }

      // maximixe the header offset to 20
      if (Math.abs(this.headerOffset) > 7.9) {
        translateBy = Math.sign(this.headerOffset) === 1 ? 8 : -8;
      }

      anime({
        targets: this.$refs.headerWrapper,
        translateY: translateBy,
        // the spring velocity (2.8) is fine tuned to the value we change this.headerOffset by (3) and our debounce (200)
        easing: 'spring(1, 100, 10, 3)'
      });
    },
    endBounceHeader() {
      this.headerOffset = 0;
      anime({
        targets: this.$refs.headerWrapper,
        translateY: 0,
        easing: 'spring(1, 100, 10, 0)'
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
$headerHeight: 40px;
$headerMargin: 7px; /* the margin on left, top, and right of header */
$headerBorderRadius: 5px;

.header-wrapper-wrapper {
  position: fixed;
  z-index: 1000;
  width: calc(100% - $headerMargin * 2);
  user-select: none;
  perspective: 5000px;
  border-radius: $headerBorderRadius;
  transform: translateX($headerMargin) translateY($headerMargin);
}

.header-wrapper {
  position: relative;
  display: block;
  height: $headerHeight;
  will-change: width, height;
  transform-style: preserve-3d;
  border-radius: $headerBorderRadius;
  box-shadow: 2px 4px 4px $oc-gray-4;
}

.header,
.navigation {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backface-visibility: hidden;
  border-radius: $headerBorderRadius;
}

.header {
  @extend shadow-large;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: $bg;
}

.header::before {
  margin-right: 5px;
  font-size: 2rem;
  content: attr(aria-label);
}

.mouse-enter {
  position: absolute;
  width: calc(100% + $headerMargin * 2);
  height: 100px;
  transform: translateX(-$headerMargin) translateY($headerMargin);
}

h1 {
  color: $text;
}
</style>
