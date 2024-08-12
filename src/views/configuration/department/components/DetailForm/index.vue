<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { DetailFormProps } from "../../types";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import api from "@/api/modules/department";

// 传递数据
const props = defineProps(["id", "row"]);
// 类型
const commissionList = [
  { label: "完成计提", value: 1 },
  { label: "审核计提", value: 2 },
  { label: "收款计提", value: 3 },
];
// 用户
const tenantStaffStore = useTenantStaffStore();
// 用户数据
const staffList = ref<any>([])
// loading加载
const loading = ref(false);
// formRef
const formRef = ref<FormInstance>();
// 定义表单
const form = ref<any>({
  id: props.id,
  // 部门名称
  name: "",
  // 负责人id userId
  director: null,
  //备注
  remark: "",
  // 是否开启部门提成 ,可用值:1启用,2停用
  commissionStatus: null,
  // 提成比例
  commission: null,
  // 提成发放 1 完成计提 2 审核计提 3 收款计提
  commissionType: null,
});
// 校验
const formRules = ref<FormRules>({
  name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
  type: [{ required: true, message: "请选择类型", trigger: "change" }],
});
onMounted(async () => {
  staffList.value = await tenantStaffStore.getStaff();
  if (form.value.id !== "") {
    getInfo();
  }
});
// 修改回显数
function getInfo() {
  loading.value = true;
  console.log('JSON.parse(props.row)',JSON.parse(props.row));

  form.value = JSON.parse(props.row)
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
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入部门名称"
          clearable
          @change=""
        />
      </el-form-item>
      <el-form-item label="部门主管" prop="director">
        <el-select
          v-model="form.director"
          value-key=""
          placeholder="请选择部门主管"
          clearable
          filterable
        >
          <el-option
            v-for="item in staffList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-row style="margin-bottom: 0px;" :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门提成" prop="commissionStatus">
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
        </el-col>
        <el-col :span="16">
          <el-form-item label="提成发放规则" prop="commissionType">
            <el-select
              v-model="form.commissionType"
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
      <el-form-item label="提成比例" prop="commission">
        <el-input
          v-model.number="form.commission"
          placeholder="请输入提成比例"
          clearable
          @change=""
          ><template #append>%</template></el-input
        >
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="10"
          placeholder="请输入备注"
          clearable
        />
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
