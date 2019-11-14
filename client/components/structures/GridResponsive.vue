<template>
  <section>
    <slot></slot>
  </section>
</template>

<style lang="postcss" scoped>
section {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax($img-min, 1fr));
}
</style>
