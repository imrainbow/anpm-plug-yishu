<template>
  <div class="ppt-card-container">
    <div
      @click="handleClick(item.id)"
      class="page-bottom-card"
      v-for="item in props.files"
      :key="item.id"
    >
      <img
        class="cover-img"
        v-if="item.cover_image && item.cover_image !== ''"
        :src="`${econfig.baseUrl}${item.cover_image}`"
        alt=""
      />
      <div class="card-title" v-else>等待解析中请稍后。。。</div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import econfig from '@/server/develop'

// 使用 defineProps 接收父组件传递的数据
const props = defineProps({
  files: {
    type: Array,
    required: true,
    default: () => []
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
</script>


<style lang="less" scoped>
.ppt-card-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .page-bottom-card {
    margin-right: 5%;
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