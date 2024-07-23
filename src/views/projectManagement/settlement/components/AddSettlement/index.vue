<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "AddSettlement",
});
// 弹框开关变量
const dialogTableVisible = ref(false);
// 提交数据
function onSubmit() {}
async function showEdit(row: any) {
  dialogTableVisible.value = true;
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()
  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  dialogTableVisible.value = false;
}
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      title="遗漏项目添加"
      width="700"
      style="height: 200px"
      :before-close="closeHandler"
    >
      <el-form label-width="100px" :inline="false">
        <el-form-item label="项目ID">
          <el-input />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
          <el-button @click="dialogTableVisible = false"> 取消 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dialog__body) {
  margin-top: 20px;
}
</style>
