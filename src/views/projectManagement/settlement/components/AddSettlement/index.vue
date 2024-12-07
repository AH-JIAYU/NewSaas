<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import api from "@/api/modules/project_settlement";

defineOptions({
  name: "AddSettlement",
});
// 更新
const emits = defineEmits(["success"]);
const formRef = ref();
const loading = ref(false);
// 弹框开关变量
const dialogTableVisible = ref(false);
const form = ref({
  projectId: null,
});
// 个人信息校验
const formRules = ref<FormRules>({
  projectId: [
    { required: true, trigger: "blur", message: "请输入项目ID" },
    {
      pattern: /^\d+$/,  // 允许输入0或正整数
      message: '请输入纯数字',
      trigger: 'blur'
    }
  ],
});
// 提交数据
function onSubmit() {
  formRef.value &&
    formRef.value.validate(async (valid: any) => {
      if (valid) {
        try {
          loading.value = true;
          await api.omissionProject(form.value);
          emits("success");
          loading.value = false;
          ElMessage.success({
            message: "操作成功",
            center: true,
          });
          closeHandler();
        } catch (error) {

        } finally {
          loading.value = false;
        }
      }
    });
}
async function showEdit() {
  dialogTableVisible.value = true;
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  formRef.value.resetFields();
  // // 重置表单
  Object.assign(form, {
    projectId: null,
  });
  dialogTableVisible.value = false;
}
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-dialog v-model="dialogTableVisible" title="遗漏项目新增" width="700" :before-close="closeHandler">
      <el-form ref="formRef" label-width="6.375rem" :model="form" :rules="formRules" :inline="false">
        <el-form-item label="项目ID" prop="projectId">
          <el-input v-model="form.projectId" placeholder="请输入项目ID" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="dialogTableVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dialog__body) {
  margin-top: 1.25rem;
}
</style>
