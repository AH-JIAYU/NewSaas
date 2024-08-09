<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { DetailFormProps } from "../../types";
import api from "@/api/modules/announcement";

// 传递数据
const props = defineProps(["id", "row"]);
// 类型
const commissionList = [
  { label: "完成计提", value: 1 },
  { label: "审核计提", value: 2 },
  { label: "收款计提", value: 3 },
];
// loading加载
const loading = ref(false);
// formRef
const formRef = ref<FormInstance>();
// 定义表单
const form = ref({
  id: props.id,
  // 标题
  title: "",
  // 类型
  type: '',
  active: false,
  // 内容
  text: "",
  // 是否置顶
  top: false,
});
// 校验
const formRules = ref<FormRules>({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  type: [{ required: true, message: "请选择类型", trigger: "change" }],
});
onMounted(() => {
  if (form.value.id !== "") {
    getInfo();
  }
});
// 修改回显数
function getInfo() {
  loading.value = true;
  form.value = props.row;
  loading.value = false;
}
// 暴露提交
defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      if (form.value.id === "") {
        formRef.value &&
          formRef.value.validate((valid) => {
            if (valid) {
              delete form.value.id;
              loading.value = true;
              api.create(form.value).then(() => {
                loading.value = false;
                ElMessage.success({
                  message: "新增成功",
                  center: true,
                });
                resolve();
              });
            }
          });
      } else {
        formRef.value &&
          formRef.value.validate((valid) => {
            if (valid) {
              loading.value = true;
              api.edit(form.value).then(() => {
                loading.value = false;
                ElMessage.success({
                  message: "编辑成功",
                  center: true,
                });
                resolve();
              });
            }
          });
      }
    });
  },
});
</script>

<template>
  <div v-loading="loading">
    <ElForm
      ref="formRef"
      :model="form"
      :rules="formRules"
      label-width="130px"
      label-suffix="："
    >
      <el-form-item label="部门名称" prop="title">
        <el-input
          v-model="form.title"
          placeholder="请输入部门名称"
          clearable
          @change=""
        />
      </el-form-item>
      <el-form-item label="部门主管" prop="type">
        <el-select
          v-model="form.type"
          value-key=""
          placeholder="类型"
          clearable
          filterable
        >
          <el-option
            v-for="item in commissionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门提成" prop="type">
            <el-switch
              v-model="form.active"
              active-text="启用"
              inactive-text="禁用"
              inline-prompt
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="提成发放设置" prop="type">
            <el-select
              v-model="form.type"
              value-key=""
              placeholder="请选择发放提成方式"
              clearable
              filterable
            >
              <el-option
                v-for="item in commissionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="提成比例" prop="title">
        <el-input
          v-model="form.title"
          placeholder="请输入提成比例"
          clearable
          @change=""
          ><template #append>%</template></el-input
        >
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.title"
          type="textarea"
          :rows="10"
          placeholder="请输入备注"
          clearable
        />
      </el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="form.top" label="置顶" size="large" />
      </el-form-item>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep {
  .bytemd-body {
    height: calc(100% - 41px);
  }
}

:deep(.editor) {
  width: 100%;
}
</style>
