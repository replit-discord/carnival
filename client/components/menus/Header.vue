<template>
  <div class="header-wrapper">
    <div ref="header" class="header">
      <!-- <div class="combination-mark">
        <Title class="wordmark">Carnival</Title>
      </div> -->
      <nav class="navigation">
        <Navbar />
      </nav>
    </div>
    <div class="mouse-enter" />
  </div>
</template>

<script>
// import Title from '~/components/text/Title'
import anime from 'animejs';
import { debounce, throttle } from 'lodash';

import Navbar from './Navbar';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      headerOffset: 0,
      previousScrollOffset: 0
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
    endBounceHeader() {
      this.headerOffset = 0;
      anime({
        easing: 'spring(1, 100, 10, 0)',
        targets: this.$refs.header,
        translateY: 0
      });
    },
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
        easing: 'spring(1, 100, 10, 3)',
        targets: this.$refs.header,
        // the spring velocity (2.8) is fine tuned to the value we change this.headerOffset by (3) and our debounce (200)
        translateY: translateBy
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
$headerMargin: 7px; /* the margin on left, top, and right of header */
$headerBorderRadius: 5px;

.header-wrapper {
  position: fixed;
  z-index: 9000;
  width: calc(100% - $headerMargin * 2);
  user-select: none;
  border-radius: $headerBorderRadius;
  transform: translateX($headerMargin) translateY($headerMargin);
  perspective: 5000px;
}

.header {
  display: flex;
  background: linear-gradient(to left, #e66465, #9198e5);
  border-radius: $headerBorderRadius;

  /* box-shadow: 2px 4px 4px $oc-gray-4; */
}

/* .combination-mark {
  @extend shadow-large;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  margin: 4px;
  cursor: pointer;
  background-color: $bg;
  border-radius: 3px;
}

.wordmark {
  color: $text;
} */

.navigation {
  /* margin: 7px 10px; */
}

.mouse-enter {
  position: absolute;
  width: calc(100% + $headerMargin * 2);
  height: 100px;
  transform: translateX(-$headerMargin) translateY($headerMargin);
}
</style>
