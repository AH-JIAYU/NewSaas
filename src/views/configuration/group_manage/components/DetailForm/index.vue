<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { DetailFormProps } from "../../types";
import api from "@/api/modules/group_manage";
import useDepartmentStore from "@/store/modules/department";
import managerApi from "@/api/modules/configuration_manager";


// 部门
const departmentStore = useDepartmentStore();
// 部门数据
const departmentList = ref<any>();
// 传递数据
const props = defineProps(["id", "row"]);
// 用户数据
const staffList = ref<any>([]);
// loading加载
const loading = ref(false);
// formRef
const formRef = ref<any>();
// 定义表单
const form = ref<any>({
  id: props.id,
  // 小组名称
  name: "",
  // 负责人id
  director: null,
  // 	部门id
  departmentId: null,
  // 备注
  remark: "",
  // 是否开启小组提成 1 启用 2停用
  commissionStatus: null,
});
// 校验
const formRules = ref<FormRules>({
  name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
  director: [{ required: true, message: "请选择组长", trigger: "change" }],
});
onMounted(async () => {
  loading.value = true;
  departmentList.value = await departmentStore.getDepartment();
  nextTick(async () => {
    // 用户列表
    const { data } = await managerApi.getTenantStaffList();
    staffList.value = data;
    // 用户列表
    // const res = await managerApi.undistributedDepartment();
    // undistributedDepartmentList.value = res.data;
  });
  if (form.value.id !== "") {
    getInfo();
  }
  loading.value = false;
});
// 修改回显数
function getInfo() {
  const formData = JSON.parse(props.row);
  form.value = formData;
}
// 暴露提交
defineExpose({
  submit() {
    try {
      return new Promise<void>((resolve) => {
        delete form.value.count
        if (form.value.id === "") {
          formRef.value &&
            formRef.value.validate((valid: any) => {
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
            formRef.value.validate((valid: any) => {
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
    } catch (error) {
    } finally {
      loading.value = false;
    }
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
      <el-form-item label="组名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入组名称"
          clearable
          :disabled="!form.id ? false : true"
        />
      </el-form-item>
      <el-form-item label="所属部门" prop="departmentId">
        <el-select
          v-model="form.departmentId"
          value-key=""
          placeholder="请选择所属部门"
          clearable
          :disabled="!form.id ? false : true"
          filterable
        >
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="组长" prop="director">
        <el-select
          v-model="form.director"
          value-key=""
          placeholder="请选择组长"
          clearable
          filterable
        >
        <el-option
            v-for="item in staffList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="item.distribution !== 2"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="组提成" prop="commissionStatus">
        <el-switch
          v-model="form.commissionStatus"
          active-text="启用"
          inactive-text="禁用"
          inline-prompt
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
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
