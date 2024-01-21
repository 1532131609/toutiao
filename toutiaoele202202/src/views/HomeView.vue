<template>
  <div class="home">
    <h1>欢迎进入头条系统后台管理页面</h1>
    <v-chart class="chart" :option="option" autoresize />
    <v-chart class="chart" :option="option1" autoresize />
  </div>
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart ,BarChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide,onMounted } from 'vue';
import {getNumsByKind} from '@/api/apis'
import * as echarts from 'echarts'
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

//provide(THEME_KEY, 'dark');

const option = ref({
  title: {
    text: '头条分类文章数目',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: [],
  },
  series: [
    {
      name: '头条',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '新闻' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});
const option1 = ref({
  title: {
          text: '头条分类文章柱状图',
          left: 'center'
        },
        tooltip: {},
        legend: {
          data: []
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '数目',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
});
onMounted(()=>{
  getNumsByKind().then(res=>{
    option.value.series[0].data=res
    option.value.legend.data=res
    option1.value.series[0].data=res
    option1.value.xAxis.data=res
  })
})
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
