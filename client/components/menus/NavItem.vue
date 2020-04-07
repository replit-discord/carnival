<template>
  <li>
    <nuxt-link :to="to">
      <!-- <div class="navitem"> -->
      <Box border="small" margin="5" padding="10" background="dark">
        <Heading level="4">{{ name }}</Heading>
      </Box>
      <!-- </div> -->
    </nuxt-link>
  </li>
</template>

<script>
import Box from '~/components/Box';
import Heading from '~/components/Heading';

export default {
  components: {
    Box,
    Heading
  },
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
li {
  list-style-type: none;
}

/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
a {
  text-decoration: none;
}
</style>
