<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import api from "@/api/modules/project_settlement";

defineOptions({
  name: "InvoicingEdit",
});
// 更新数据
const emits = defineEmits(["success"]);
// loading
const loading = ref(false);
// form
const form = ref<any>({
  // 项目结算id-支持多选
  projectSettlementId: [],
  // 1:开票 2:结算
  type: null,
});
// 获取数组数据
const dataList = ref()
// 标题
const title = ref();
// 弹框开关变量
const dialogTableVisible = ref(false);
// 获取数据
async function showEdit(row: any, val: any) {
  form.value.type = row;
  dataList.value = val
  val.forEach((item: any) => {
    form.value.projectSettlementId.push(item.id);
  });
  title.value = row === 1 ? "开票" : "结算";
  dialogTableVisible.value = true;
}
// 提交数据
async function onSubmit() {
  try {
    loading.value = true;
  const res = await api.InvoicingSettlementEdit(form.value);
  if (res.status === -1) {
    return ElMessage.warning({
      message: "操作失败",
      center: true,
    });
  }
  emits("success");
  loading.value = false;
  ElMessage.success({
    message: "操作成功",
    center: true,
  });
  closeHandler();
} catch (error) {

}finally {
  loading.value = false;
}
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()
  // // 重置表单
  Object.assign(form.value, {
    // 项目结算id-支持多选
    projectSettlementId: [],
    // 1:开票 2:结算
    type: null,
  });
  dialogTableVisible.value = false;
}
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-dialog
      v-model="dialogTableVisible"
      :title="title"
      width="700"
      :before-close="closeHandler"
    >
      <div v-if="dataList.length > 1" style="margin-bottom: 20px;">确认对以下项目进行{{ title }}操作吗?</div>
      <div v-else style="margin-bottom: 20px;">确认对项目ID:{{dataList[0].projectId}}+项目名称:{{dataList[0].projectName}}进行{{ title }}操作吗?</div>
      <el-table v-if="dataList.length > 1" :data="dataList" row-key="id">
        <el-table-column width="80" type="index" align="center" label="序号" />
        <el-table-column align="center" prop="projectId" label="项目ID" />
        <el-table-column align="center" prop="projectName" label="项目名称" />
      </el-table>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="dialogTableVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
