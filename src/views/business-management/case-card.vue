<template>
  <div class="ai-help-container">
    <div class="ai-help-header">
      <div class="header-left">案卡填录</div>
      <div class="header-right">
        <el-button
          type="primary"
          :icon="Download"
          @click="handleDownloadTemplate"
          class="mr-10"
        >
          下载模板
        </el-button>
        <el-upload
          class="upload-excel mr-10"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleFileChange"
          accept=".xlsx,.xls"
        >
          <el-button type="primary" :icon="Upload"> 上传Excel </el-button>
        </el-upload>
        <el-button type="primary" :icon="Plus" @click="dialogVisible = true"
          >新增</el-button
        >

        <img src="@/assets/return.png" @click="handleReturn" alt="返回" />
      </div>
    </div>
    <div class="case-card-content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="batch_no" label="通报批次" />
        <el-table-column prop="department_no" label="部门受案号" />
        <el-table-column prop="case_name" label="案件名称" />
        <el-table-column prop="suspect_name" label="嫌疑人姓名" />
        <el-table-column prop="handling_dept" label="承办部门" />
        <el-table-column prop="prosecutor" label="承办检察官" />
        <el-table-column prop="case_type" label="案件类别" />
        <el-table-column prop="error_details" label="错误明细" />
        <el-table-column prop="remarks" label="备注" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              class="circle-primary"
              :icon="Edit"
              @click="handleEditClick(scope.row)"
              circle
            />

            <el-button
              type="danger"
              :icon="Delete"
              @click="handleDeleteClick(scope.row)"
              circle
            />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="page.page"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 50, 100, 200]"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- /分页 -->
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="新增"
      width="50%"
      destroy-on-close
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="通报批次">
          <el-input v-model="form.batch_no" />
        </el-form-item>
        <el-form-item label="部门受案号">
          <el-input v-model="form.department_no" />
        </el-form-item>
        <el-form-item label="案件名称">
          <el-input v-model="form.case_name" />
        </el-form-item>
        <el-form-item label="嫌疑人姓名">
          <el-input v-model="form.suspect_name" />
        </el-form-item>
        <el-form-item label="承办部门">
          <el-input v-model="form.handling_dept" />
        </el-form-item>
        <el-form-item label="承办检察官">
          <el-input v-model="form.prosecutor" />
        </el-form-item>
        <el-form-item label="案件类别">
          <el-input v-model="form.case_type" />
        </el-form-item>
        <el-form-item label="错误明细">
          <el-input type="textarea" v-model="form.error_details" :rows="3" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remarks" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleSave">确定</el-button>
          <el-button class="btn-cancel" @click="dialogVisible = false"
            >取消</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- /编辑弹窗 -->
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { Download, Upload, Edit, Delete,Plus } from '@element-plus/icons-vue';
import { utils, writeFile } from 'xlsx'
import { ref, onMounted, reactive } from 'vue';
import { getCases,batchCreateCases,createCase,editCase,deleteCase } from '@/api/case-card';
import { ElMessage,ElMessageBox } from 'element-plus';
const router = useRouter();
const dialogVisible = ref(false)
// 定义初始表单数据
const form = ref({
  ID: null,
  batch_no: '',
  department_no: '',
  case_name: '',
  suspect_name: '',
  handling_dept: '',
  prosecutor: '',
  case_type: '',
  error_details: '',
  remarks: ''
})



const handleReturn = () => {
  router.back();
};
// 分页
const page = ref({
  page: 1,
  pageSize: 10
})
const total = ref(0);
// 表格数据
const tableData = ref([]);
/// 下载模板
const handleDownloadTemplate = () => {
  // 定义表头
  const headers = [
    '通报批次',
    '部门受案号',
    '案件名称',
    '嫌疑人姓名',
    '承办部门',
    '承办检察官',
    '案件类别',
    '错误明细',
    '备注'
  ]

  // 创建工作簿
  const wb = utils.book_new()  // 改为 utils
  
  // 创建工作表（只包含表头的空表格）
  const ws = utils.aoa_to_sheet([headers])  // 改为 utils
  
  // 设置列宽（根据内容自适应）
  const colWidths = headers.map(header => ({
    wch: Math.max(10, header.length * 5)  // 最小宽度10，根据文字长度适应
  }))
  ws['!cols'] = colWidths

  // 将工作表添加到工作簿
  utils.book_append_sheet(wb, ws, '案件导入模板')  // 改为 utils

  // 生成并下载文件
  writeFile(wb, '案卡填录模板.xlsx')  // 改为 writeFile
}
// 上传Excel        
const handleFileChange = (file) => {
  console.log(file);
};
// // 编辑
// const handleEdit = (row) => {
//   // 打开弹窗
//   dialogVisible.value = true;
// //   设置表单数据   
//   form.value = row;
// };
// 获取案卡列表
const getCasesList = async () => {
  const res = await getCases(page.value);
  console.log(res);
  if (res.success) {
    tableData.value = res.data.records
    total.value = res.data.total
  }

}
// 新增
const handleAdd = async () => {

  const res = await createCase(form.value);
  if (res.success) {
     dialogVisible.value = false;
     ElMessage.success('新增成功');
  getCasesList();
  }
  console.log(res);
} 
// 删除
const handleDeleteClick = (row) => {
  ElMessageBox.confirm('确定删除该数据吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteCase(row.ID);
    if (res.success) {
      ElMessage.success('删除成功');
      getCasesList();
    }
  })
}
const handleSizeChange = (size) => {
  page.value.pageSize = size;
  getCasesList();
}
const handleCurrentChange = (page) => {
  page.value.page = page;
  getCasesList();
}
// 编辑
 const handleEditClick =  (row) => {
  form.value = JSON.parse(JSON.stringify(row));
  console.log(form.value, 'form.value');

  dialogVisible.value = true;
}
const handleEdit = async () => {
  const res = await editCase(form.value);

  if (res.success) {
    dialogVisible.value = false;
    ElMessage.success('编辑成功');
    getCasesList();
  }
}
const handleSave = async () => {
  console.log(form.value.ID, 'form.value');

  if (form.value.ID) {
    await handleEdit();
  } else {
    await handleAdd();
  }
 
}

onMounted(() => {
  getCasesList();
//   模拟数据
tableData.value = [
    {
        batch: '2024年第一次',
        caseNumber: '黟检未起诉受[2023]3410号',
        caseName: '姚嘉宾强奸、猥亵儿童案',
        suspectName: '姚嘉宾',
        department: '第一检察部',
        prosecutor: '鲍平',
        caseType: '一审公诉案件（未检）',
        errorDetails: '裁判认定法定情节与审查认定法定情节不一致(裁判改变起诉情形中未填“改变量刑情节”)等漏填（错填）',
        remarks: '',
    },
     {
        batch: '2024年第二次',
        caseNumber: '黟检刑诉受[2023]341023000062号',
        caseName: '陈军民、公保才仁等9人开设赌场案',
        suspectName: '陈军民',
        department: '第一检察部',
        prosecutor: '程凤',
        caseType: '一审公诉案件',
        errorDetails: '法院已采纳确定型有期徒刑量刑建议、一审宣告刑刑期（刑种）与审查起诉量刑建议刑期（刑种）不一致等错填',
        remarks: '',
    }
]
});
</script>

<style lang="less" scoped>
.header-right {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 15px;
  }
}
.case-card-content {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
}
</style>

