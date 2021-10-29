<template>
  <!-- <a-layout id="rfp-layout-header-aside-group">
    <a-layout-sider class="rfp-layout-sider"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible>
      <div class="logo"
        @click="onLogoClick">R</div>
      <a-menu theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
        @select="onMenuSelect">
        <a-menu-item key="home">
          <template #icon>
            <HomeOutlined />
          </template>
          <span>home</span>
        </a-menu-item>
        <a-menu-item key="projectIndex">
          <template #icon>
            <ProjectOutlined />
          </template>
          <span>project</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="rfp-layout-header flex items-center justify-between">
        <menu-unfold-outlined class="trigger"
          @click="() => (collapsed = !collapsed)" />

        <header-user />
      </a-layout-header>

      <a-layout-content class="rfp-layout-main">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout> -->

  <a-layout class="layout-demo">
    <a-layout-sider collapsible
      breakpoint="xl">
      <div class="logo" />
      <a-menu :defaultOpenKeys="['1']"
        :defaultSelectedKeys="['0_3']"
        :style="{ width: '100%' }"
        @menuItemClick="onClickMenuItem">
        <a-menu-item key="0_1"
          disabled>
          <IconHome />
          Menu 1
        </a-menu-item>
        <a-menu-item key="0_2">
          <IconCalendar />
          Menu 2
        </a-menu-item>
        <a-menu-item key="0_3">
          <IconCalendar />
          Menu 3
        </a-menu-item>
        <a-sub-menu key="1">
          <template #title>
            <span>
              <IconCalendar />Navigation 1
            </span>
          </template>
          <a-menu-item key="1_1">Menu 1</a-menu-item>
          <a-menu-item key="1_2">Menu 2</a-menu-item>
          <a-sub-menu key="2"
            title="Navigation 2">
            <a-menu-item key="2_1">Menu 1</a-menu-item>
            <a-menu-item key="2_2">Menu 2</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3"
            title="Navigation 3">
            <a-menu-item key="3_1">Menu 1</a-menu-item>
            <a-menu-item key="3_2">Menu 2</a-menu-item>
            <a-menu-item key="3_3">Menu 3</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
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
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderUser from './HeaderUser/index.vue'

export default defineComponent({
  name: 'HeaderAside',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const selectedKeys = ref(['home'])

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
    return {
      collapsed: ref(true),
      selectedKeys,
      onClickMenuItem,
      onLogoClick,
    }
  },
})
</script>

<style lang="scss">
#rfp-layout-header-aside-group {
  height: 100vh;
  .rfp-layout-sider {
    .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .rfp-layout-header {
    background: #fff;
    padding: 0 24px;

    .trigger {
      font-size: 18px;
      &:hover {
        color: $color-primary;
      }
    }
  }

  .rfp-layout-main {
    padding: 24px;
  }
}
</style>