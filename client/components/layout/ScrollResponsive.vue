<template>
  <section class="scroll-responsive">
    <slot />
  </section>
</template>

<style lang="postcss" scoped>
.scroll-responsive {
  display: flex;
  width: 100%;
  height: 210px;
  overflow-x: auto;
}
</style>
