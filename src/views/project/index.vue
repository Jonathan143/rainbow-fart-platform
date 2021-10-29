<template>
  <div class="project">
    <!-- <a-table :columns="columns"
      :data-source="tableData"></a-table> -->
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
} from 'vue'
import axios from '@/plugins/api'

export default defineComponent({
  name: 'Project',
  components: {},
  setup() {
    const tableData = ref([])
    const columns = ref([
      {
        title: '项目名',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
      },
    ])

    onMounted(() => {})

    return { tableData, columns }
  },
})
</script>
