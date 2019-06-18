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

<style scoped>
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

  /* TODO: Update Colors */
  color: #3b8070;
  border: 1px solid #3b8070;
}

a:hover {
  background-color: #3b8070;
  color: #fff;
}
</style>
