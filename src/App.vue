<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    onMounted(() => {
      const userInfo = JSON.parse(localStorage.getItem('BASE_USER_INFO') || '')
      if (userInfo) {
        store.commit('updateUserInfo', userInfo)
      } else {
        router.replace({ name: 'login' })
      }
    })
  },
})
</script>


<style lang="scss">
</style>
