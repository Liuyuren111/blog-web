<template>
<div style="display: flex">
  <div style="width: 400px;height: 400px;" ref="myChartRef"></div>
  <div id="main2" style="width: 400px; height: 400px"></div>
</div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";

const myChartRef = ref(null)
// 绘制图表
function drawChart() {
  // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
  let myChart = echarts.init(myChartRef.value);
  // 指定图表的配置项和数据
  let option = {
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

function drawChart2() {
  // 基于准备好的dom，初始化echarts实例  这个和上面的main2对应
  let myChart = echarts.init(document.getElementById("main2"));
  // 指定图表的配置项和数据
  let option = {
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: '直接访问'
          },
          {
            value: 234,
            name: '联盟广告'
          },
          {
            value: 1548,
            name: '搜索引擎'
          }
        ]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

onMounted(() =>{
  drawChart();
  drawChart2();
})
</script>

<style scoped>

</style>
