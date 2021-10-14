<template>
  <div class="home">
    home
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  watchEffect,
  computed,
  onMounted,
} from 'vue'
import request from '@/plugins/api'

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    onMounted(() => {})

    return {}
  },
})
</script>
