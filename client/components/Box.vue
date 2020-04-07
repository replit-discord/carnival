<template>
  <div class="box" :style="boxStyles">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    padding: {
      type: String,
      default: '0'
    },
    margin: {
      type: String,
      default: '0'
    },
    background: {
      type: String,
      default: 'inherit'
    },
    border: {
      type: String,
      default: 'none'
    }
  },
  computed: {
    boxStyles() {
      let background = this.background;
      if (this.background === 'inherit') background = 'inherit';
      else if (this.background === 'light') background = '#ced4da';
      else if (this.background === 'medium') background = '#868e96';
      else if (this.background === 'dark') background = '#343a40';

      let border = this.border;
      if (this.border === 'none') border = '0';
      else if (this.border === 'small') border = '5px';
      else if (this.border === 'medium') border = '10px';
      else if (this.border === 'large') border = '15px';

      return {
        padding: this.padding + 'px',
        margin: this.margin + 'px',
        background,
        borderRadius: border
      };
    }
  }
};
</script>
