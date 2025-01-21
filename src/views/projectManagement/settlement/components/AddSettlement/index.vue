<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import api from "@/api/modules/project_settlement";
import { useI18n } from "vue-i18n";

defineOptions({
  name: "AddSettlement",
});
// 国际化
const { t } = useI18n();
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
    { required: true, trigger: "blur", message: t("addSettlement.enterID") },
    {
      pattern: /^\d+$/, // 允许输入0或正整数
      message: t("addSettlement.num"),
      trigger: "blur",
    },
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
            message: "t('addSettlement.complete')",
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
    <el-dialog
      v-model="dialogTableVisible"
      :title="t('addSettlement.add')"
      width="700"
      :before-close="closeHandler"
    >
      <el-form
        ref="formRef"
        label-width="6.375rem"
        :model="form"
        :rules="formRules"
        :inline="false"
      >
        <el-form-item :label="t('addSettlement.projectID')" prop="projectId">
          <el-input
            v-model="form.projectId"
            :placeholder="t('addSettlement.enterID')"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="dialogTableVisible = false">
            {{ t("addSettlement.cancel") }}
          </el-button>
          <el-button type="primary" @click="onSubmit">
            {{ t("addSettlement.confirm") }}
          </el-button>
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
