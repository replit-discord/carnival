<template>
  <div class="container">
    <div class="gradient"></div>
    <Heading>About</Heading>
    <p>
      Carnival aims to create a single website to showcase neat games made by
      the community. Games span across many genres - some even have multiplayer
      support!
    </p>
  </div>
</template>

<script>
import Heading from '~/components/text/Heading';

export default {
  components: {
    Heading
  }
};
</script>

<style lang="postcss" scoped>
.gradient {
  width: 100%;
  height: 250px;
  background: linear-gradient(to top, #ffb88c, #de6262);
}
</style>
