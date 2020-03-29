<template>
  <section class="grid-responsive">
    <slot />
  </section>
</template>

<style lang="postcss" scoped>
.grid-responsive {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax($img-min, 1fr));
}
</style>
