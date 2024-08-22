<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import api from "@/api/modules/department";
import grounpApi from "@/api/modules/group_manage";
import managerApi from "@/api/modules/configuration_manager";
import useDepartmentStore from "@/store/modules/department";

defineOptions({
  name: "Edit",
});
// 部门
const departmentStore = useDepartmentStore();
// 部门数据
const departmentList = ref<any>();
// 用户数据
const staffList = ref<any>([]);
// 更新数据
const emits = defineEmits(["success"]);
// title
const title = ref("");
// 获取当前时间
const defaultTime = ref();
// loading
const loading = ref(false);
// 客户列表
const customerList = ref<any>([]);
// formRef
const formRef = ref();
// 弹框开关变量
const dialogTableVisible = ref(false);
// 定义表单
const form = ref<any>({
  // 小组名称
  name: "",
  // 负责人id
  // director: null,
  // 	部门id
  departmentId: null,
  // 备注
  remark: "",
  // 是否开启小组提成 1 启用 2停用
  commissionStatus: null,
});
// 个人信息校验
const formRules = ref<FormRules>({
  invoiceCode: [{ required: true, trigger: "blur", message: "请输入姓名" }],
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
            grounpApi.create(form.value).then(() => {
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
async function showEdit(row:any) {
  const obj = JSON.parse(row)
  form.value.departmentId = obj.id
  title.value = "新增小组";
  dialogTableVisible.value = true;
}
onMounted(async () => {
  nextTick(async () => {
    // 用户列表
    const { data } = await managerApi.getTenantStaffList();
    // 用户数据
    staffList.value = data;
  });
  // 部门数据
  departmentList.value = await departmentStore.getDepartment()
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
        <el-form-item prop="name" label="组名称">
          <el-input v-model="form.name" placeholder="请输入组名称" clearable />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select
            v-model="form.departmentId"
            value-key=""
            placeholder="请选择部门"
            clearable
            filterable
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="组长">
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
        </el-form-item> -->
        <el-form-item label="组提成">
          <el-switch
            v-model="form.commissionStatus"
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
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
