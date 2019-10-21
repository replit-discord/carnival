<template>
  <div class="navitem">
    <nuxt-link :to="to">
      {{ name }}
    </nuxt-link>
    <div class="color-transform"></div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: () => 'Link Name'
    },
    to: {
      type: String,
      default: () => '/unresolved-link'
    }
  }
};
</script>

<style lang="postcss" scoped>
.navitem {
  position: relative;
}

a {
  display: inline-block;

  width: 100%;
  height: 100%;

  padding: 10px;
  text-align: center;

  color: $text;
  text-decoration: none;
}

a.heading-transform {
  padding: 5px;
}

.color-transform {
  position: absolute;
  bottom: 0;
  z-index: -90;

  background-color: color-mod($bg shade(100%));

  width: 100%;
  height: 0;
  transition: all 50ms ease-in;
}

a:hover ~ .color-transform {
  height: 100%;
  transition: all 50ms ease-in;
}
</style>
