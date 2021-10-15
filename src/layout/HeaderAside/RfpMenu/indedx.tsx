import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  props: {
    msg: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup(prop) {
    const item = () => {}

    return () => <a-menu></a-menu>
  },
})
