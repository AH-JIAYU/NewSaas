<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { obtainLoading } from "@/utils/apiLoading";
import api from "@/api/modules/user_customer";
const editRecordList = ref(); // 操作日志下编辑的列表
const dialogTableVisible = ref<boolean>(false);
const row = ref<any>(); // 当前行数据
async function showEdit(rowObj: any) {
  row.value = rowObj;
  const params = {
    tenantCustomerOperationId: rowObj.tenantCustomerOperationId,
  };
  const { data } = await obtainLoading(api.getRecordList(params));
  // 获取修改的列表
  editRecordList.value = data.getTenantCustomerOperationRecordInfoList;
  dialogTableVisible.value = true;
}

defineExpose({ showEdit });
</script>

<template>
  <el-dialog v-model="dialogTableVisible" title="详情" width="800">
    <p class="m-4">
      <el-text class="mx-1"> 操作人: {{ row.createName }} </el-text>
      <el-text class="mx-1"> 操时间: {{ row.createTime }} </el-text>
    </p>
    <el-table style="margin-top: 10px" border :data="editRecordList">
      <el-table-column align="left" type="index" label="序号" width="150" />
      <el-table-column align="left" prop="operationContent" label="操作内容" />
    </el-table>
  </el-dialog>
</template>
