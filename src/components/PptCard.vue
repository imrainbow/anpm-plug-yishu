<template>
  <div class="ppt-card-container">
    <div
      @click="handleClick(item.id)"
      class="page-bottom-card"
      v-for="(item, index) in props.files"
      :key="item.id"
      @mouseenter="hoveredItemId = item.id"
      @mouseleave="checkLeave($event, item.id)"
    >
      <div class="sort-box" v-if="hoveredItemId === item.id">
        <img
          src="@/assets/arrow-left1.png"
          @click.stop="handleSortClick(1, index)"
          v-if="!(props.page === 1 && index === 0)"
          alt=""
        />
        <img
          src="@/assets/arrow-right1.png"
          @click.stop="handleSortClick(2, index)"
          v-if="index !== props.files.length - 1"
          alt=""
        />
      </div>
      <img
        class="cover-img"
        v-if="item.cover_image && item.cover_image !== ''"
        :src="`${econfig.baseUrl}${item.cover_image}`"
        alt=""
      />
      <div
        class=""
        :style="{ fontSize: `${28 * sizeRatio}px`, color: '#fff' }"
        v-else
      >
        等待解析中请稍后刷新再试！
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import econfig from '@/server/develop'
import {swapSort} from '@/api/ppt-menu.js'
import { ElMessage } from 'element-plus';

import { ref } from 'vue'
// 定义要发出的事件
const emit = defineEmits(['update-files'])

// 使用 defineProps 接收父组件传递的数据
const props = defineProps({
  files: {
    type: Array,
    required: true,
    default: () => []
  },
  page: {
    type: Number,
    required: true,
    default: 1
  }
})
const router = useRouter();
const handleClick = (id) => {
  if(!props.files.find(item => item.id === id).cover_image || props.files.find(item => item.id === id).cover_image === '') {
    ElMessage.warning('该ppt正在解析中，请稍后')
    return
  }
  router.push({
    path: '/ppt-page-detail',
    query: { id }
  })
}
// 跟踪当前鼠标悬停的项目ID
const hoveredItemId = ref(null);
// 检查鼠标是否真的离开了卡片
const checkLeave = (event, id) => {
  // 延迟一点点时间检查，避免闪烁
  setTimeout(() => {
    // 如果鼠标不在sort-box上，则设置hoveredItemId为null
    if (!event.relatedTarget || !event.relatedTarget.closest('.sort-box')) {
      hoveredItemId.value = null;
    }
  }, 50);
}
const swapSortAsync = async (data) => {
  const res = await swapSort(data)
  if(res.success) {
    ElMessage.success('排序成功')
    // 刷新文件列表
    // getFilesByMenuIDAsync()
     // 通知父组件更新文件列表
    emit('update-files')
    
  }else {
    ElMessage.error(res.message)
  }
}
const handleSortClick = (type,index) => {
  debugger
  let obj = {
    file_id1: null,
    file_id2: null
  }
  if(type == 1) {
    // 左移
    obj.file_id1 = props.files[index].id
    obj.file_id2 = props.files[index - 1].id
  }else {
    obj = {
    file_id1: props.files[index].id,
    file_id2: props.files[index + 1].id
  }
    
  }
  swapSortAsync(obj)
  
}


</script>


<style lang="less" scoped>
.ppt-card-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .page-bottom-card {
    margin-right: 5%;
    position: relative;
    .sort-box {
      position: absolute;
      bottom: 0px;
      right: 10px;
      cursor: pointer;
      img {
        width: 30px;
        &:hover {
          transform: scale(1.2);
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
  .page-bottom-card:nth-child(3n) {
    margin-right: 0;
  }
}
</style>