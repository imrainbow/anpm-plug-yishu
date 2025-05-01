<template>
  <div
    class="echarts-no-data"
    v-if="!props.echartsData || props.echartsData.length === 0"
  >
    <img class="no-data-img" src="@/assets/no-data.png" alt="" />
    <div class="no-data-text">暂无数据</div>
  </div>
  <div ref="chartDom" class="echarts-card" v-else></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, watch, nextTick,onUnmounted } from 'vue';

const chartDom = ref(null);
const chartRef = ref(null);

const props = defineProps({
  echartsData: {
    type: Array,
    default: () => [],
  },
});

const initChart = async () => {
 
  await nextTick();
  if (!chartDom.value) return;
  
  if (chartRef.value) {
    chartRef.value.dispose();
  }
  
  const myChart = echarts.init(chartDom.value);
  chartRef.value = myChart;

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    

    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.echartsData.map(item => item.label),
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      name: '数量'
    },
    series: [
      {
        name: '案件数量',
        type: 'bar',
        data: props.echartsData.map(item => item.value),
        itemStyle: {
          color: '#409EFF'
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 12
        },
        barWidth: '40%'
      }
    ]
  };

  myChart.setOption(option);
};

// 监听数据变化
watch(() => props.echartsData, (newVal) => {
 
  if (newVal && newVal.length > 0) {
    initChart();
  }
}, { deep: true });

// 监听窗口大小变化
const handleResize = () => {
  if (chartRef.value) {
    chartRef.value.resize();
  }
};

window.addEventListener('resize', handleResize);

onMounted(() => {
  if (props.echartsData && props.echartsData.length > 0) {
    initChart();
  }
});

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (chartRef.value) {
    chartRef.value.dispose();
  }
});
</script>

<style scoped lang="less">
.echarts-card {
  width: 100%;
  height: 380px;
  margin: 0 auto;
}
.echarts-no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  .no-data-img {
    width: 180px;
  }
  .no-data-text {
    margin-top: 10px;
    margin-left: -50px;
    color: #61d3ff;
  }
}
</style>