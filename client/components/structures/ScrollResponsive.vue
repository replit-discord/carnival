<template>
  <section class="scroll-responsive-wrapper">
    <div class="scroll-responsive">
      <!-- <div class="scroll-responsive-inner"> -->
      <slot heightOverride="500" />
      <!-- </div> -->
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.scroll-responsive {
  display: grid;
  grid-auto-rows: 200px;
  grid-gap: 10px;
}
</style>
