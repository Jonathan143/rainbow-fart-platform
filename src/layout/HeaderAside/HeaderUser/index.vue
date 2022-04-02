<template>
  <a-dropdown trigger="hover" @select="onClick">
    <a-avatar style="background-color: #1890ff" @click.prevent>
      {{ userStore.username.slice(0, 1) }}
    </a-avatar>
    <template #content>
      <a-doption value="logOut">
        <template #icon>
          <icon-export />
        </template>
        退出登录
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import jsCookie from 'js-cookie'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const onClick = (key: string) => {
  if (key === 'logOut') {
    jsCookie.remove('geekadmin-token')
    localStorage.removeItem('BASE_USER_INFO')
    router.replace({
      name: 'login',
      query: { redirect: encodeURIComponent(route.fullPath) },
    })
  }
}
</script>

<style lang="scss" scoped></style>
