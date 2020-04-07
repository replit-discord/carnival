// eslint-disable-next-line no-unused-vars
import Vue from 'vue';

import MyButton from '~/components/Heading.vue';

export default { title: 'All Text' };

export const withText = () => '<my-button>with text</my-button>';

export const withEmoji = () => '<my-button>😀 😎 👍 💯</my-button>';

export const asAComponent = () => ({
  components: { MyButton },
  template: '<my-button>rounded</my-button>'
});
