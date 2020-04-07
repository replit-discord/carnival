<template>
  <div class="text-wrapper">
    <p><slot /></p>
  </div>
</template>

<script>
export default {
  name: 'Text'
};
</script>

<style lang="scss" scoped>
// @import '~@/assets/text-crop-sen.scss';

p {
  font-family: 'Sen', sans-serif;
  color: $oc-gray-3;
}
</style>
