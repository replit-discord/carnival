<template>
  <div claass="text-wrapper">
    <template v-if="level === '1'">
      <h1>
        <slot />
      </h1>
    </template>
    <template v-if="level === '2'">
      <h2>
        <slot />
      </h2>
    </template>
    <template v-if="level === '3'">
      <h3>
        <slot />
      </h3>
    </template>
    <template v-if="level === '4'">
      <h4>
        <slot />
      </h4>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    level: {
      type: String,
      default: '1'
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/text-crop-asap';

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Asap', sans-serif;
  color: $oc-gray-3;
}

h1 {
  font-size: 48px;
  color: $oc-gray-2;

  @include text-crop-asap;
}

h2 {
  font-size: 36px;

  @include text-crop-asap;
}

h3 {
  font-size: 28px;

  @include text-crop-asap;
}

h4 {
  font-size: 24px;

  /* stylelint-disable-next-line max-line-length */
  @include text-crop-asap($top-adjustment: -10px, $bottom-adjustment: -10px);
}

h5 {
  font-size: 24px;

  @include text-crop-asap;
}
</style>
