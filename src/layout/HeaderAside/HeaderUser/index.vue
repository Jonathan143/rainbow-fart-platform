<template>
  <a-dropdown>
    <a-avatar style="background-color: #1890ff"
      @click.prevent>{{userInfo.name.slice(0,1)}}</a-avatar>
    <template #overlay>
      <a-menu @click="onClick">
        <a-menu-item key="logOut">退出登录</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import jsCookie from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'HeaderUser',
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.userInfo)
    const router = useRouter()
    const route = useRoute()

    const onClick = ({ key = '' }) => {
      if (key === 'logOut') {
        jsCookie.remove('satoken')
        localStorage.removeItem('BASE_USER_INFO')
        router.replace({
          name: 'login',
          query: { redirect: encodeURIComponent(route.fullPath) },
        })
      }
    }

    return {
      userInfo,
      onClick,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
