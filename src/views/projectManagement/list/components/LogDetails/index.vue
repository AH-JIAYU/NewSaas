<script setup lang="ts">
import { ref } from 'vue'
import api from "@/api/modules/projectManagement";
defineOptions({
  name: 'LogDetails',
})
const dialogTableVisible = ref<any>(false)
const data = ref<any>({
  gridData: [],
  row: [],
})
async function showEdit(row: any) {
  data.value.row = row
  const res = await api.getProjectOperationRecordList({ id: row.id })
  data.value.gridData = res.data.projectOperationRecordInfoList
  dialogTableVisible.value = true
}
// 暴露方法
defineExpose({ showEdit })
</script>

<template>
  <div>
    <el-dialog v-model="dialogTableVisible" style="height: 20.5rem" title="详情" width="800">
      <el-divider content-position="left" />

      <el-text class="mx-1">
        操作人: {{ data.row.operationName }}
      </el-text>
      <el-text class="mx-1">
        操时间: {{ data.row.operationTime }}
      </el-text>
      <el-table style="margin-top: 10px" border :data="data.gridData">
        <el-table-column align="left" type="index" label="序号" width="150" />
        <el-table-column align="left" property="operationContent" label="操作内容" />
      </el-table>
    </el-dialog>
  </div>
</template>
