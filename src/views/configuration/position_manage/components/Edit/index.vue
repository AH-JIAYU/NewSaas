<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import api from "@/api/modules/position_manage";

defineOptions({
  name: "Edit",
});
// 更新数据
const emits = defineEmits(["success"]);
// title
const title = ref("");
// 获取当前时间
const defaultTime = ref();
// loading
const loading = ref(false);
// formRef
const formRef = ref();
// 弹框开关变量
const dialogTableVisible = ref(false);
// 定义表单
const form = ref<any>({
  id: null,
  // 职位名称
  name: "",
  // 是否启用 1启用 2停用
  active: 1,
  // 备注
  remark: 1,
});
// 个人信息校验
const formRules = ref<FormRules>({
  name: [{ required: true, trigger: "blur", message: "请输入职位名称" }],
  tenantCustomerId: [
    { required: true, trigger: "change", message: "请选择客户" },
  ],
});
// 提交数据
function onSubmit() {
  return new Promise<void>((resolve) => {
    if (!form.value.id) {
      formRef.value &&
        formRef.value.validate((valid: any) => {
          if (valid) {
            delete form.value.id;
            api.create(form.value).then(() => {
              ElMessage.success({
                message: "新增成功",
                center: true,
              });
              emits("success");
              dialogTableVisible.value = false;
              resolve();
            });
          }
        });
    } else {
      formRef.value &&
        formRef.value.validate((valid: any) => {
          if (valid) {
            const data = toRaw(form.value);
            api.edit(data).then(() => {
              ElMessage.success({
                message: "编辑成功",
                center: true,
              });
              emits("success");
              dialogTableVisible.value = false;
              resolve();
            });
          }
        });
    }
  });
}
// 获取数据
async function showEdit(row: any) {
  if (row) {
    form.value = JSON.parse(row);
  } else {
    form.value = {
      id: null,
      // 职位名称
      name: "",
      // 是否启用 1启用 2停用
      active: 1,
      // 备注
      remark: '',
    };
  }
  title.value = row?.id ? "编辑" : "新增";
  dialogTableVisible.value = true;
}
onMounted(async () => {
  defaultTime.value = new Date();
});
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-dialog v-model="dialogTableVisible" :title="title" width="700">
      <el-form
        ref="formRef"
        label-width="80px"
        :model="form"
        :rules="formRules"
        :inline="false"
      >
        <el-form-item prop="name" label="职位名称">
          <el-input
            v-model="form.name"
            placeholder="请输入职位名称"
            clearable
          />
        </el-form-item>
        <!-- <el-form-item label="职位日志">
          <el-switch
            v-model="form.active"
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input
            v-model="form.remark"
            placeholder="备注说明"
            clearable
            :rows="5"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button type="" @click="dialogTableVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
