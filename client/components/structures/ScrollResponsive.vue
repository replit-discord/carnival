<template>
  <section class="scroll-responsive-wrapper">
    <div class="scroll-responsive">
      <div class="scroll-responsive-inner">
        <slot />
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.scroll-responsive-wrapper {
  position: relative;

  /* TODO: fix this also */
  height: 140px;
}

.scroll-responsive {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: scroll;
}

/* TODO: Fix this */
.scroll-responsive-inner {
  display: grid;
  grid-template-columns: repeat(10, 230px);
  grid-gap: 10px;
  width: 100%;
}
</style>
