<template>
  <li class="navitem-wrapper">
    <nuxt-link :to="to" class="navitem-link">
      <div class="navitem">
        <h2>{{ name }}</h2>
      </div>
    </nuxt-link>
  </li>
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
.navitem-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0 5px;
}

.navitem-link {
  display: block;
  color: $text;
  text-decoration: none;
}

.navitem {
  padding: 5px;
  list-style-type: none;
  cursor: pointer;
  background-color: $bg-light;
  border-radius: 5px;
  transition: background-color 0.3s ease-out;
}
</style>
