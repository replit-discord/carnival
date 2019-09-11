<template>
  <header :class="headingTransform">
    <div class="title">
      <h1>Carnival</h1>
    </div>
    <!-- <navbar class="navigation" /> -->
  </header>
</template>

<script>
export default {
  props: {
    headingTransform: {
      type: Object,
      default: () => ({ 'heading-transform': false })
    }
  }
};
</script>

<style lang="postcss" scoped>
header {
  display: inline-block;

  background-color: $oc-gray-1;
  box-shadow: 2px 4px 4px $oc-gray-4;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  width: 100%;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px;
  transition: all 150ms ease-in-out;
}

header.heading-transform .title {
  padding: 5px;
  transition: all 150ms ease-in-out;
}

h1 {
  color: $oc-gray-9;
}
</style>
