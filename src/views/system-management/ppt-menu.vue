<template>
  <el-tree
    style="width: 100%"
    :data="pptMenuList"
    :props="defaultProps"
    default-expand-all
    @node-click="handleNodeClick"
  >
    <template #default="{ node, data }">
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
        "
      >
        <span>{{ node.label }}</span>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="添加子节点"
          placement="top-start"
        >
          <el-button
            v-if="data.parent_id == 0"
            :icon="Plus"
            circle
            size="small"
            @click.stop="handleAdd(data)"
          />
        </el-tooltip>
        <div v-if="data.parent_id != 0">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="编辑"
            placement="top-start"
          >
            <el-button
              class="circle-primary"
              :icon="Edit"
              circle
              @click.stop="handleEdit(data)"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="删除"
            placement="top-start"
          >
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click.stop="handleDelete(data)"
            >
            </el-button>
          </el-tooltip>
        </div>
      </div>
    </template>
  </el-tree>
  <el-dialog
    v-model="dialogVisible"
    title="添加子节点"
    width="30%"
    destroy-on-close
  >
    <el-form :model="form" label-width="60px" ref="formRef">
      <el-form-item
        label="名称"
        prop="name"
        :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
      >
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" class="margin-right-10" @click="handleSave"
        >确定</el-button
      >
      <el-button class="btn-cancel" @click="dialogVisible = false"
        >取消</el-button
      >
    </template>
  </el-dialog>
</template>

<script setup>
import { getPptMenuList,addPptMenu,updatePptMenu,deletePptMenu } from '@/api/ppt-menu'
import { onMounted, ref } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

// 获取PPT菜单列表
const defaultProps = {
  children: 'children',
  label: 'name',
}
const pptMenuList = ref([])
onMounted(async() => {
  await getPptMenuListAsync()
})
const getPptMenuListAsync = async() => {
    const res = await getPptMenuList()
    pptMenuList.value = res.data
}

// 添加子节点相关
const dialogVisible = ref(false) 
const form = ref({
  name: '',
  path:'',
  parent_id: null,

})
const handleAdd = (data) => {
  console.log('添加子节点', data)
  form.value.parent_id = data.id
  form.value.path = data.path
  dialogVisible.value = true
}
const handleCreate = async() => {
    try {
        await addPptMenu(form.value)
        dialogVisible.value = false
        resetForm()
        ElMessage.success('添加成功')
        await getPptMenuListAsync()
    }catch(error) {
        console.error('添加失败', error)
    }
}
const resetForm = () => {
  form.value.name = ''
  form.value.path = ''
  form.value.parent_id = null
}
const formRef = ref(null)
const handleSave = () => {
  console.log('保存', form.value)
   if (!formRef.value) return
  if(!form.value.id) {
    // 新增
    handleCreate()
  } else {
    // 编辑
    console.log('编辑')
    handleUpdate()
  }
}
const handleUpdate = async() => {
    try {
        await updatePptMenu(form.value.id, form.value)
        dialogVisible.value = false
        resetForm()
        ElMessage.success('编辑成功')
        await getPptMenuListAsync()
    }catch(error) {
        console.error('编辑失败', error)
    }
}
const handleEdit = (data) => {
  console.log('编辑', data)
  form.value = { ...data }
  dialogVisible.value = true
}

const handleDelete = async (data) => {
  try {
    await ElMessageBox.confirm('确认删除该节点吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deletePptMenu(data.id)
    ElMessage.success('删除成功')
    // 重新获取列表
    const res = await getPptMenuList()
    pptMenuList.value = res.data
  } catch (error) {
    console.error('删除失败', error)
  }
}
</script>

<style>
</style>