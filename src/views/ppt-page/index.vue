<template>
  <div>
    <div id="pptx-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getFile } from '@/api/ppt-file'


const getFileSync = async() =>{
  const res = await getFile(id)

}

onMounted(() => {

})



</script>

<style>
</style>