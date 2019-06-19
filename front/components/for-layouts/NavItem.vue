<template>
  <nuxt-link tag="li" :to="to">
    <a>{{ name }}</a>
  </nuxt-link>
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
}
</script>

<style lang="postcss" scoped>
li {
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;

  color: $oc-gray-9;
  background-color: $oc-gray-3;
}

a:hover {
  background-color: $oc-gray-9;
  color: $oc-gray-3;
}
</style>
