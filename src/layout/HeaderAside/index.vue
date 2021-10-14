<template>
  <a-layout id="rfp-layout-header-aside-group">
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
      <a-layout-header class="rfp-layout-header">
        <menu-unfold-outlined class="trigger"
          @click="() => (collapsed = !collapsed)" />
      </a-layout-header>

      <a-layout-content class="rfp-layout-main">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  MenuUnfoldOutlined,
  ProjectOutlined,
  HomeOutlined,
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'AsideHeader',
  components: { MenuUnfoldOutlined, ProjectOutlined, HomeOutlined },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const selectedKeys = ref(['home'])

    const onMenuSelect = ({ key }: { key: string }) => {
      router.push({ name: key })
    }
    const onLogoClick = () => {
      router.push({ name: 'home' })
    }

    onBeforeMount(() => {
      selectedKeys.value = [(route.name as string) || 'home']
    })
    return {
      collapsed: ref(true),
      selectedKeys,
      onMenuSelect,
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