<template>
  <div class="ai-help-content">
    <div id="ai-assist" class="content-section">
      <div class="card-body" style="background: #00357f; margin: unset">
        <div class="module-grid">
          <div
            @click="handleClick(item.id)"
            class="module-card"
            v-for="item in props.files"
            :key="item.id"
            style="
              background: rgba(73, 147, 251, 0.1);
              box-shadow: inset 0px 0px 40px 0px rgba(108, 200, 255, 0.5);
            "
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
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
  router.push({
    path: '/ppt-page',
    query: { id }
  })
}
</script>


<style>
</style>