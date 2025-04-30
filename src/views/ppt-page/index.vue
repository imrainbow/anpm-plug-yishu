<template>
  <div :class="fullScreen ? 'full-page' : 'ppt-page'">
    <div class="fixed-box" v-if="!fullScreen">
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
          class="btn-fixed"
          src="@/assets/full-screen.png"
          @click="fullScreen = !fullScreen"
          alt=""
        />
      </el-tooltip>
    </div>

    <template v-if="!fullScreen">
      <div v-for="item in imgUrlList" :key="item">
        <img
          class="ppt-item-img"
          :src="`http://localhost:8000/${item}`"
          alt=""
        />
      </div>
    </template>
    <template style="width: 100%" v-else>
      <img
        class="ppt-item-img-full"
        :src="`http://localhost:8000/${activeUrl}`"
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

// 获取ppt预览信息
const previewPPTAsync = async () => {
  const res = await previewPPT(pptId.value)
  console.log(res)
  if(res.success) {
     imgUrlList.value = res.data.image_urls
     activeUrl.value = imgUrlList.value[0]

  }else {
    ElMessage.error(res.message)
  }
 
 
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

onBeforeMount(() => {
  pptId.value = route.query.id
})
onMounted(() => {
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