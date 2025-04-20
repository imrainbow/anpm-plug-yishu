<template>
  <div class="ppt-viewer">
    <div class="loading-wrapper" v-if="loading">
      <el-loading text="PPT加载中..." />
    </div>

    <div v-if="error" class="error-message">
      <el-alert :title="error" type="error" show-icon />
    </div>

    <!-- PPT预览容器 -->
    <div class="pptx-container" v-show="!loading && !error">
      <div id="pptx-viewer" ref="pptxViewer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFile } from '@/api/ppt-file'
import { ElMessage } from 'element-plus'

const route = useRoute()
const loading = ref(true)
const error = ref('')

// 加载必要的脚本
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

// 加载样式
const loadStyle = (href) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = resolve
    link.onerror = () => reject(new Error(`Failed to load style: ${href}`))
    document.head.appendChild(link)
  })
}

// 等待 PPTXJS 相关资源加载完成
const waitForPPTXJS = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const maxAttempts = 50

    const check = () => {
      if (window.jQuery && window.jQuery.fn.pptxToHtml) {
        resolve(true)
        return
      }

      attempts++
      if (attempts >= maxAttempts) {
        reject(new Error('加载PPT预览组件超时'))
        return
      }

      setTimeout(check, 100)
    }

    check()
  })
}

// 渲染PPT
const renderPPT = async (data) => {
  try {
    // 等待 PPTXJS 加载完成
    await waitForPPTXJS()

    // 获取容器
    const container = document.getElementById('pptx-viewer')
    if (!container) {
      throw new Error('找不到PPT预览容器')
    }

    // 创建 Blob
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    })

    // 使用 jQuery 渲染 PPT
    const $container = window.jQuery('#pptx-viewer')
    $container.empty() // 清空容器

    $container.pptxToHtml({
      pptxFileUrl: URL.createObjectURL(blob),
      slidesScale: '100%',
      slideMode: true,
      keyBoardShortCut: true,
      mediaProcess: true,
      shortMediaProcess: true,
      width: '100%',
      height: '100%',
      success: function() {
        loading.value = false
        ElMessage.success('PPT加载成功')
      },
      error: function(err) {
        throw new Error(`PPT渲染错误: ${err}`)
      }
    })
  } catch (err) {
    console.error('PPT渲染失败:', err)
    error.value = err.message
    loading.value = false
    ElMessage.error('PPT渲染失败')
  }
}

// 初始化：加载资源并获取PPT文件
const initialize = async () => {
  try {
    // 加载必要的资源

    // 获取PPT文件
    const res = await getFile(route.query.id)
    
    // 确保返回的是 ArrayBuffer
    const arrayBuffer = res instanceof ArrayBuffer ? res : await res.arrayBuffer()
    
    // 渲染PPT
    await renderPPT(arrayBuffer)
  } catch (err) {
    console.error('初始化失败:', err)
    error.value = '加载PPT失败'
    loading.value = false
    ElMessage.error('加载PPT失败')
  }
}

onMounted(() => {
  initialize()
})
</script>

<style scoped>
.ppt-viewer {
  width: 100%;
  height: 100vh;
  position: relative;
  background: #f5f7fa;
}

.loading-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.error-message {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 80%;
}

.pptx-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: white;
  overflow: hidden;
}

#pptx-viewer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>