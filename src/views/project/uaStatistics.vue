<template>
  <div class="ua-statistics">
    <v-chart style="height: 400px;" :option="op" @click="onChartClick" />
  </div>
</template> 

<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import request from '@/plugins/api'

type Major = { major: string, total: number }
interface UAStatistics {
  name: string
  total: number
  majorList: Major[]
}


const op = ref({
  xAxis: {
    data: [] as string[]
  },
  yAxis: {},
  legend: {},
  tooltip: {},
  dataGroupId: '',
  animationDurationUpdate: 500,
  series: {
    type: 'bar',
    id: 'sales',
    data: [] as any[],
    universalTransition: {
      enabled: true,
      divideShape: 'clone'
    }
  },
  graphic: [] as any
})

const uaStatistics = ref<UAStatistics[]>([])

const onChartClick = (e: { data: UAStatistics }) => {
  if (e.data?.majorList?.length) {
    op.value.xAxis.data = e.data.majorList.map(item => item.major)
    op.value.series.data = e.data.majorList.map(item => item.total)
    op.value.graphic = [
      {
        type: 'text',
        left: 50,
        top: 20,
        style: {
          text: 'Back',
          fontSize: 18
        },
        onclick: initData
      }
    ]
  }

}

const initData = () => {
  op.value.xAxis.data = uaStatistics.value.map(item => (item.name))
  op.value.series.data = uaStatistics.value.map(item => ({ value: item.total, groupId: item.name, majorList: item.majorList }))
}

onBeforeMount(async () => {
  try {
    const data = await request<UAStatistics[]>({ api: 'browser/type_total', method: 'get' })
    uaStatistics.value = data

    initData()
  } catch (error) {

  }

})
</script>

<style lang="scss" scoped></style>
