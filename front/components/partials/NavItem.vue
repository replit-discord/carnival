<template>
  <nuxt-link tag="li" :to="to">
    <a>
      <p-svg></p-svg>
      <p>{{ name }}</p>
    </a>
  </nuxt-link>
</template>

<script>
import SvgPlaceholder from '~/components/SvgPlaceholder';
export default {
  components: {
    'p-svg': SvgPlaceholder
  },
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
li {
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;

  color: $oc-gray-9;
  background-color: $oc-gray-3;
}

a:hover {
  background-color: $oc-gray-9;
  color: $oc-gray-3;
}

p {
  margin-left: 10px;
}
</style>
