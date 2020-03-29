<template>
  <div class="horizontal-aspect-ratio-wrapper">
    <div class="horizontal-aspect-ratio">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalAspectRatio'
};
</script>

<style lang="postcss" scoped>
.horizontal-aspect-ratio-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 9 by 16 aspect ratio */
}

.horizontal-aspect-ratio {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}
</style>
