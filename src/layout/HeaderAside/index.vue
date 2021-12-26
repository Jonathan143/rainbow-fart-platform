<template>
  <a-layout class="vh-100"
    id="rfp-layout-header-aside-group">
    <a-layout-sider class="rfp-layout-sider"
      collapsible
      breakpoint="xl">
      <div class="logo flex items-center justify-center">R</div>

      <a-menu :defaultOpenKeys="['4']"
        :defaultSelectedKeys="['4_1']"
        :style="{ width: '100%' }"
        @menuItemClick="onClickMenuItem">
        <a-menu-item key="0_1">
          <IconHome />
          Menu 1
        </a-menu-item>
        <a-menu-item key="0_2">
          <IconCalendar />
          Menu 2
        </a-menu-item>
        <a-sub-menu key="4">
          <template #title>
            <span>
              <IconCalendar />Navigation 4
            </span>
          </template>
          <a-menu-item key="4_1">Menu 1</a-menu-item>
          <a-menu-item key="4_2">Menu 2</a-menu-item>
          <a-menu-item key="4_3">Menu 3</a-menu-item>
        </a-sub-menu>
      </a-menu>
      <!-- trigger -->
      <template #trigger="{ collapsed }">
        <IconCaretRight v-if="collapsed" />
        <IconCaretLeft v-else />
      </template>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 20px;">
        Header
      </a-layout-header>
      <a-layout style="padding: 0 24px;">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import HeaderUser from './HeaderUser/index.vue'

const router = useRouter()
const route = useRoute()
const selectedKeys = ref(['home'])
const collapsed = ref(true)

const onClickMenuItem = ({ key }: { key: string }) => {
  // router.push({ name: key })
}
const onLogoClick = () => {
  router.push({ name: 'home' })
}

watch(
  () => route.name,
  (val) => {
    selectedKeys.value = [(val as string) || 'home']
  },
  { immediate: true }
)
</script>

<style lang="scss">
#rfp-layout-header-aside-group {
  .logo {
    height: 32px;
    background: rgba(0, 0, 0, 0.1);
    margin: 12px;
  }
}
</style>