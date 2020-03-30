<template>
  <li class="navitem-wrapper">
    <nuxt-link :to="to" class="navitem-link">
      <div class="navitem">
        <h1>{{ name }}</h1>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      default: () => 'Link Name',
      type: String
    },
    to: {
      default: () => '/unresolved-link',
      type: String
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
  margin: 5px 0;
  list-style-type: none;
  cursor: pointer;
  background-color: $bg-light;
  border-radius: 5px;
  transition: background-color 0.3s ease-out;
}

h1 {
  color: $oc-gray-4;
}
</style>
