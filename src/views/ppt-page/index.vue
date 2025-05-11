<template>
  <div
    :class="fullScreen ? 'full-page' : 'ppt-page'"
    v-loading="loading"
    element-loading-text="加载中..."
  >
    <div class="fixed-box">
      <el-tooltip class="box-item" content="返回" placement="left">
        <img
          class="btn-fixed"
          @click="handleReturn"
          src="@/assets/return-circle.png"
          alt=""
        />
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="全屏播放"
        placement="left"
      >
        <img
          v-if="!fullScreen"
          class="btn-fixed"
          src="@/assets/full-screen.png"
          @click="fullScreenClick"
          alt=""
        />
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="结束播放"
        placement="left"
      >
        <img
          v-if="fullScreen"
          class="btn-fixed"
          src="@/assets/stop.png"
          @click="fullScreen = false"
          alt=""
        />
      </el-tooltip>
    </div>

    <template v-if="!fullScreen">
      <div v-for="item in imgUrlList" :key="item">
        <img class="ppt-item-img" :src="`${econfig.baseUrl}${item}`" alt="" />
      </div>
    </template>
    <template style="width: 100%" v-else>
      <img
        class="ppt-item-img-full"
        :src="`${econfig.baseUrl}${activeUrl}`"
        @click="handleImgClick"
        alt=""
        style="width: 100%"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { previewPPT } from '@/api/ppt-page'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import econfig from '@/server/develop'

const route = useRoute()
const pptPage = ref(null)
const pptPageData = ref(null)
const pptId = ref(null)
const imgUrlList = ref([])
const activeUrl = ref(null)
const fullScreen = ref(false)
const currentIndex = ref(0)
const router = useRouter()
const handleReturn = () => {
  router.back()
}
const loading = ref(false)

// 获取ppt预览信息
const previewPPTAsync = async () => {
  const res = await previewPPT(pptId.value)
  console.log(res)
  if(res.success) {
     imgUrlList.value = res.data.image_urls
    //  activeUrl.value = imgUrlList.value[0]/

  }else {
    ElMessage.error(res.message)
  }
  loading.value = false
 
 
}
const handleImgClick = (url) => {
  currentIndex.value++
  if (currentIndex.value === imgUrlList.value.length) {
    ElMessage.success('ppt播放结束')
    fullScreen.value = false
    currentIndex.value = 0

  }else {
    activeUrl.value = imgUrlList.value[currentIndex.value]
  }
  

}
const fullScreenClick = () => {
  activeUrl.value = imgUrlList.value[0]

  fullScreen.value = !fullScreen.value
}

onBeforeMount(() => {
  pptId.value = route.query.id
})
onMounted(() => {
  loading.value = true
  previewPPTAsync()
})

</script>

<style lang="less" scoped>
.full-page {
  height: 100vh;
  overflow: hidden;
}
.ppt-page {
  width: 100%;
  .ppt-item-img {
    width: 100%;
  }
}
.ppt-item-img-full {
  width: 100%;
  height: 100%;
}
.btn-fixed {
  width: 45px;
  height: 45px;
  display: block;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
}
.fixed-box {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>