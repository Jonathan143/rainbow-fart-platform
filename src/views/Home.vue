<template>
  <div class="home">
    <div>{{a}}</div>
    <a-table :dataSource="dataSource"
      :columns="columns" />

    <a-button type="primary"
      @click="onAddClick">add</a-button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  watchEffect,
  readonly,
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
} from 'vue'

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const a = ref(0)
    const dataSource = ref([
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ])
    const columns = ref([
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ])

    const onAddClick = () => {
      a.value++
    }

    // 可停止的监听
    const stop = watchEffect(() => {
      columns.value
    })
    stop()

    return {
      a,
      onAddClick,
      dataSource,
      columns,
    }
  },
})
</script>
