<template>
  <div class="vertical-aspect-ratio-wrapper">
    <img
      class="aspect-ratio"
      src="/img/aspect-ratio.jpg"
      width="1280"
      height="720"
    />
    <div class="vertical-aspect-ratio">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerticalAspectRatio'
};
</script>

<style lang="postcss" scoped>
.vertical-aspect-ratio-wrapper {
  position: relative;
}

.aspect-ratio {
  display: block;
  width: auto;
  height: 100%;
  visibility: hidden;
}

.vertical-aspect-ratio {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
}
</style>
