<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_customer";
import apiUser from "@/api/modules/configuration_manager";

defineOptions({
  name: "ProjeckEdit",
});

const emits = defineEmits(["fetch-data"]);
const formRef = ref<any>();
const data = ref<any>({
  dialogTableVisible: false,
  title: "",
  type: "",
  loading: "",
  formData: {}, //表单
  staffList: [], //用户
  rules: {
    customerAccord: [
      { required: true, message: "请输入客户名称", trigger: "blur" },
      { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
    ],
    customerShortName: [
      { required: true, message: "请输入客户简称", trigger: "blur" },
      { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
    ],
    chargeId: [{ required: true, message: "请选择PM", trigger: "change" }],
  },
});

const TypeList: any = {
  customerAccord: "客户名称",
  customerShortName: "客户简称",
  chargeId: "PM",
};

// 显隐
async function showEdit(row: any, FormType: any) {
  data.value.title = TypeList[FormType];
  data.value.type = FormType;
  data.value.loading = true;
  data.value.formData = cloneDeep(row);
  data.value.dialogTableVisible = true;
  data.value.loading = false;
  getTenantStaffList();
}
// 获取PM/用户
const getTenantStaffList = async () => {
  const res = await apiUser.getTenantStaffList();
  data.value.staffList = res.data;
};

// 提交数据
async function onSubmit() {
  data.value.loading = true;
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      const { status } = await api.edit(data.value.formData);
      status === 1 &&
        ElMessage.success({
          message: "编辑成功",
          center: true,
        });
      emits("fetch-data");
      closeHandler();
    }
    data.value.loading = false;
  });
}
// 弹框关闭事件
function closeHandler() {
  data.value.dialogTableVisible = false;
  data.value.formData = {};
}
// 暴露方法
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-dialog v-model="data.dialogTableVisible" v-if="data.dialogTableVisible" :title="data.title + '编辑'" draggable>
      <el-form ref="formRef" :model="data.formData" :rules="data.rules" label-width="100" label-position="right">
        <template v-if="data.type === 'customerAccord'">
          <el-form-item label="客户名称" prop="customerAccord">
            <el-input v-model="data.formData.customerAccord" clearable />
          </el-form-item>
        </template>
        <template v-if="data.type === 'customerShortName'">
          <el-form-item label="客户简称" prop="customerShortName">
            <el-input v-model="data.formData.customerShortName" clearable />
          </el-form-item>
        </template>
        <template v-if="data.type === 'chargeId'">
          <el-form-item label="PM" prop="chargeId">
            <el-select v-model="data.formData.chargeId" value-key="" placeholder="请选择PM" clearable filterable>
              <el-option v-for="item in data.staffList" :key="item.id" :label="item.userName" :value="item.id" />
            </el-select>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <el-button @click="closeHandler" :disabled="data.loading">
          取消
        </el-button>
        <el-button type="primary" @click="onSubmit" :disabled="data.loading">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep {

  .el-drawer,
  .el-drawer__body,
  .el-tabs.el-tabs--left {
    overflow: visible !important;
  }
}
</style>
