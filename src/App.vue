<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  // const userInfo = JSON.parse(localStorage.getItem('BASE_USER_INFO') as string)
  // if (userInfo) {
  //   userStore.updateUserInfo(userInfo)
  // } else {
  //   router.replace({ name: 'login' })
  // }
})
</script>

<style lang="scss"></style>
