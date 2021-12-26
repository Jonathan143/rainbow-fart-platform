import { App } from 'vue'
import ECharts from 'vue-echarts'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { use } from 'echarts/core'

// 手动引入 ECharts 各模块来减小打包体积

// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, PieChart } from 'echarts/charts'

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
])

export default {
  install(app: App) {
    // 全局注册组件
    app.component('v-chart', ECharts)
  },
}
