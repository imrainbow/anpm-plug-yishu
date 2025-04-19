// src/views/ppt-page/index.vue
<template>
  <div class="pptx-viewer">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-wrapper">
      <el-loading text="PPT加载中..." />
      <div v-if="loadingStatus" class="loading-status">
        {{ loadingStatus }}
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      <el-alert :title="error" type="error" show-icon>
        <template #default>
          <div class="error-details" v-if="errorDetails">
            <pre>{{ errorDetails }}</pre>
          </div>
          <div class="error-actions">
            <el-button type="primary" size="small" @click="retryLoading">
              重试
            </el-button>
            <el-button size="small" @click="forceLoadScripts">
              重新加载脚本
            </el-button>
          </div>
        </template>
      </el-alert>
    </div>

    <!-- PPT预览容器 -->
    <div v-if="!loading && !error" class="pptx-container">
      <div id="pptx-viewer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFile } from '@/api/ppt-file'
import { ElMessage } from 'element-plus'

const route = useRoute()
const loading = ref(true)
const error = ref('')
const errorDetails = ref('')
const loadingStatus = ref('')

// 检查PPTXJS是否已加载
const isPPTXJSLoaded = () => {
  const jQueryLoaded = typeof window.jQuery !== 'undefined'
  const pptxjsLoaded = jQueryLoaded && typeof window.jQuery.fn.pptxToHtml !== 'undefined'
  
  if (!jQueryLoaded) {
    loadingStatus.value = '正在加载jQuery...'
    return false
  }
  
  if (!pptxjsLoaded) {
    loadingStatus.value = '正在加载PPTXJS组件...'
    return false
  }
  
  loadingStatus.value = 'PPT组件加载完成，准备渲染...'
  return true
}

// 手动加载脚本
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

// 手动加载样式
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

// 强制重新加载脚本
const forceLoadScripts = async () => {
  try {
    error.value = ''
    errorDetails.value = ''
    loading.value = true
    loadingStatus.value = '正在重新加载依赖...'
    
    // 加载jQuery
    if (typeof window.jQuery === 'undefined') {
      await loadScript('https://code.jquery.com/jquery-3.6.0.min.js')
      loadingStatus.value = 'jQuery加载完成'
    }
    
    // 加载PPTXJS相关脚本和样式
    await Promise.all([
      loadStyle('/PPTXJS-1.21.1/css/pptxjs.css'),
      loadScript('/PPTXJS-1.21.1/js/jszip.min.js')
    ])
    
    await loadScript('/PPTXJS-1.21.1/js/pptxjs.js')
    
    // 加载其他可选脚本
    await Promise.all([
      loadScript('/PPTXJS-1.21.1/js/divs2slides.js'),
      loadScript('/PPTXJS-1.21.1/js/jquery.fullscreen.js')
    ])
    
    loadingStatus.value = '依赖加载完成，准备重新加载PPT'
    // 重新加载PPT
    await loadPPT()
    
  } catch (err) {
    console.error('重新加载脚本失败:', err)
    error.value = '重新加载脚本失败'
    errorDetails.value = err.message
    loading.value = false
  }
}

// 等待PPTXJS加载
const waitForPPTXJS = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const maxAttempts = 50 // 5秒超时
    
    loadingStatus.value = '等待PPT组件初始化...'
    
    const checkInterval = setInterval(() => {
      attempts++
      
      // 检查是否已加载
      if (isPPTXJSLoaded()) {
        clearInterval(checkInterval)
        resolve()
        return
      }
      
      // 输出调试信息
      if (attempts % 10 === 0) {
        console.log(`[${attempts}/${maxAttempts}] 等待PPTXJS加载...`)
        console.log('jQuery存在:', typeof window.jQuery !== 'undefined')
        if (window.jQuery) {
          console.log('pptxToHtml存在:', typeof window.jQuery.fn.pptxToHtml !== 'undefined')
        }
      }
      
      // 检查是否超时
      if (attempts >= maxAttempts) {
        clearInterval(checkInterval)
        
        // 收集更多诊断信息
        const diagnosticInfo = {
          jQueryExists: typeof window.jQuery !== 'undefined',
          jQueryVersion: window.jQuery ? window.jQuery.fn.jquery : 'undefined',
          pptxToHtmlExists: window.jQuery ? typeof window.jQuery.fn.pptxToHtml !== 'undefined' : false,
          loadedScripts: Array.from(document.scripts)
            .filter(s => s.src)
            .map(s => s.src),
          loadedStyles: Array.from(document.styleSheets)
            .filter(s => s.href)
            .map(s => s.href)
        }
        
        const error = new Error('加载PPT预览组件超时')
        error.diagnosticInfo = diagnosticInfo
        
        reject(error)
      }
    }, 100)
  })
}

// 渲染PPT
const renderPPT = async (data) => {
  try {
    // 等待PPTXJS加载
    await waitForPPTXJS()
    
    loadingStatus.value = '准备渲染PPT...'
    
    // 创建Blob和ArrayBuffer
    const blob = data instanceof Blob ? data : new Blob([data], { 
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
    })
    
    loadingStatus.value = '处理PPT数据...'
    const arrayBuffer = await blob.arrayBuffer()
    
    // 获取jQuery对象
    const $container = window.jQuery('#pptx-viewer')
    if (!$container.length) {
      throw new Error('找不到PPT预览容器元素')
    }
    
    $container.empty() // 清空容器
    
    loadingStatus.value = '开始渲染PPT...'
    
    // 使用PPTXJS渲染PPT
    $container.pptxToHtml({
      pptxFileUrl: null,
      fileContent: arrayBuffer,
      slidesScale: '100%',
      slideMode: true,
      keyBoardShortCut: true,
      mediaProcess: true,
      shortMediaProcess: true,
      width: '100%',
      height: '100%',
      success: function() {
        loading.value = false
        loadingStatus.value = ''
        ElMessage.success('PPT加载成功')
      },
      error: function(err) {
        console.error('PPT渲染错误:', err)
        throw new Error(`PPT渲染错误: ${err}`)
      }
    })
  } catch (err) {
    console.error('PPT渲染失败:', err)
    
    // 收集更详细的错误信息
    let detailedError = err.message || 'PPT渲染失败'
    if (err.diagnosticInfo) {
      detailedError += '\n\n诊断信息:\n' + JSON.stringify(err.diagnosticInfo, null, 2)
    }
    
    error.value = 'PPT渲染失败'
    errorDetails.value = detailedError
    ElMessage.error('PPT渲染失败')
    loading.value = false
  }
}

// 获取并渲染PPT
const loadPPT = async () => {
  try {
    const id = route.query.id
    if (!id) {
      throw new Error('未找到文件ID')
    }

    loading.value = true
    error.value = ''
    errorDetails.value = ''
    loadingStatus.value = '正在获取文件...'

    console.log('开始获取文件，ID:', id)
    const res = await getFile(id)
    console.log('文件获取结果:', res)

    if (!res || !res.data) {
      throw new Error('获取文件失败')
    }

    loadingStatus.value = '文件获取成功，准备渲染...'
    await renderPPT(res.data)

  } catch (err) {
    console.error('文件加载失败:', err)
    error.value = '文件加载失败'
    errorDetails.value = err.message
    ElMessage.error('文件加载失败')
    loading.value = false
  }
}

// 重试加载
const retryLoading = () => {
  error.value = ''
  errorDetails.value = ''
  loadPPT()
}

// 检查资源
const checkResources = () => {
  // 检查jQuery
  if (typeof window.jQuery === 'undefined') {
    console.warn('jQuery未加载')
    return false
  }
  
  console.log('jQuery版本:', window.jQuery.fn.jquery)
  
  // 检查PPTXJS
  if (typeof window.jQuery.fn.pptxToHtml === 'undefined') {
    console.warn('pptxToHtml未加载')
    return false
  }
  
  // 检查已加载脚本
  const loadedScripts = Array.from(document.scripts)
    .filter(s => s.src)
    .map(s => s.src)
  
  console.log('已加载脚本:', loadedScripts)
  
  return true
}

onMounted(() => {
  console.log('组件挂载，检查资源...')
  const resourcesLoaded = checkResources()
  
  if (!resourcesLoaded) {
    console.log('资源未完全加载，将尝试手动加载...')
    forceLoadScripts()
  } else {
    console.log('资源已加载，开始加载PPT...')
    loadPPT()
  }
})

onUnmounted(() => {
  console.log('组件卸载，清理资源...')
  
  try {
    if (window.jQuery) {
      // 移除事件监听
      window.jQuery(document).off('slideChange')
      
      // 清空容器
      const $container = window.jQuery('#pptx-viewer')
      if ($container.length) {
        $container.empty()
      }
    }
  } catch (error) {
    console.error('清理资源失败:', error)
  }
})
</script>

<style scoped>
.pptx-viewer {
  width: 100%;
  height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.loading-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
}

.loading-status {
  margin-top: 20px;
  color: #909399;
  font-size: 14px;
}

.error-message {
  margin: 20px 0;
}

.error-details {
  margin: 10px 0;
  background: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  max-height: 200px;
  overflow: auto;
  font-size: 12px;
}

.error-details pre {
  margin: 0;
  white-space: pre-wrap;
}

.error-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.pptx-container {
  flex: 1;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

#pptx-viewer {
  width: 100%;
  height: 100%;
}
</style>