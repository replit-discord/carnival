<!-- TODO: remove -->
<template>
  <h1>
    <slot />
  </h1>
</template>

<script>
export default {
  name: 'Title'
};
</script>

<style lang="postcss" scoped>
h1 {
  font-size: 48px;
}
</style>
