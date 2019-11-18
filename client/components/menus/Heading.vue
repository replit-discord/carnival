<template>
  <div class="header-wrapper-wrapper">
    <div ref="headerWrapper" class="header-wrapper">
      <header class="header">
        <h1>Carnival</h1>
      </header>
      <!-- <nav class="navigation">
        <Navbar />
        <div ref="close" @click="shrinkHeader" class="close">x</div>
      </nav> -->
    </div>
    <div class="mouse-enter"></div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import anime from 'animejs';
// import Navbar from './Nav';

export default {
  // components: {
  //   Navbar
  // },
  data() {
    return {
      previousScrollOffset: 0
    };
  },
  beforeMount() {
    // set the 'previous' scroll offset before component mounts
    this.previouscrollOffset = document.documentElement.scrollTop;

    window.addEventListener('scroll', this.scrollEventHandler(), {
      passive: true
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollEventHandler(), {
      passive: true
    });
  },
  methods: {
    scrollEventHandler(e) {
      return debounce(e => {
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
        this.previouScrollOffset = scrollOffset;

        // let translateBy;
        // switch (scrollDirection) {
        //   case 'up':
        //     translateBy = '+=20';
        //     break;
        //   case 'down':
        //     translateBy = '-=20';
        //     break;
        //   case 'neutral':
        //     translateBy = 0;
        //     break;
        //   default:
        //     translateBy = 0;
        // }

        // 'bounce' the header, dependent on how large the previou bounce was
        const scrollOffsetDifference = scrollOffset - this.previouscrollOffset;
        this.bounceHeader(scrollDirection, scrollOffsetDifference);
      }, 100);
    },
    bounceHeader(scrollDirection, scrollOffsetDifference) {
      anime({
        targets: this.$refs.headerWrapper,
        translateY: '0',
        easing: 'spring(1, 100, 10, 3)'
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
  user-select: none;
  perspective: 5000px;
  border-radius: $headerBorderRadius;

  width: calc(100% - $headerMargin * 2);

  transform: translateX($headerMargin) translateY($headerMargin);
}

.header-wrapper {
  position: relative;
  display: block;
  height: $headerHeight;

  will-change: width, height;
  transform-style: preserve-3d;

  box-shadow: 2px 4px 4px $oc-gray-4;
  border-radius: $headerBorderRadius;
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $bg;
  cursor: pointer;
}

.header::before {
  content: '😏';
  font-size: 2rem;
  margin-right: 5px;
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
