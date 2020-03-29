<template>
  <h2><slot /></h2>
</template>

<script>
export default {
  name: 'Heading'
};
</script>

<style lang="postcss" scoped>
h2 {
  margin: 5px 0;
  font-size: 36px;
}
</style>
