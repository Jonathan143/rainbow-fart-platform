<template>
  <div class="project">
    <a-table :columns="columns"
      :data-source="tableData"></a-table>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  watch,
  watchEffect,
  readonly,
  computed,
  onMounted,
} from 'vue'
import axios from '@/plugins/api'

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
</script>
