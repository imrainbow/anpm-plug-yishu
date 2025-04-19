<template>
  <div>
    <div id="pptx-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFile } from '@/api/ppt-file'
import { ref } from 'vue'
const route = useRoute()
const id = route.query.id

const getFileSync = async() =>{
  const res = await getFile(id)
  console.log(res, 'res')
}

onMounted(() => {
  getFileSync()
})



</script>

<style>
</style>