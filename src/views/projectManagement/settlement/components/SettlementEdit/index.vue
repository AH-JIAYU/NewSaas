<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import useUserCustomerStore from "@/store/modules/user_customer";
import api from "@/api/modules/project_settlement";

defineOptions({
  name: "SettlementEdit",
});
// 更新数据
const emits = defineEmits(["success"]);
// 客户
const customerStore = useUserCustomerStore();
// 客户列表
const customerList = ref<any>([]);
// loading
const loading = ref(false);
// formRef
const formRef = ref<any>();
const formData = ref<any>();
// 定义form表单
const form = ref<any>({
  id: "",
  // 项目id
  projectId: "",
  // 客户id
  clientId: "",
  // 原价
  doMoneyPrice: "",
  // 结算完成数
  settlementDone: "",
  // 系统完成数
  systemDone: "",
  // 结算po号
  settlementPo: "",
  // 备注
  remark: "",
  // 结算状态: 1:待审核 2:已审核 3:已开票 4:已结算 5:已冻结
  status: null,
});
// 校验
const formRules = ref<FormRules>({
  clientId: [{ required: true, message: "请选择所属客户", trigger: "change" }],
  doMoneyPrice: [
    { required: true, message: "请选择所属客户", trigger: "blur" },
  ],
});
// 结算状态
const settlementStatusList = [
  { label: "待审核", value: 1 },
  { label: "已审核", value: 2 },
  { label: "已开票", value: 3 },
  { label: "已结算", value: 4 },
  { label: "已冻结", value: 5 },
];
// 弹框开关变量
const dialogTableVisible = ref(false);
// 提交数据
function onSubmit() {
  formRef.value &&
    formRef.value.validate(async (valid: any) => {
      if (valid) {
        loading.value = true;
        const { status } = await api.edit(form.value);
        if (status === 1) {
          // 更新列表
          emits("success");
          // 关闭加载
          loading.value = false;
          // 提示成功
          ElMessage.success({
            message: "操作成功",
            center: true,
          });
          // 执行关闭弹框事件
          closeHandler();
        } else {
          loading.value = false;
          ElMessage.error({
            message: "操作失败，请联系工作人员",
            center: true,
          });
        }
      }
    });
}
// 获取数据
async function showEdit(row: any) {
  formData.value = JSON.parse(row);
  form.value.id = formData.value.id;
  form.value.projectId = formData.value.projectId;
  form.value.clientId = formData.value.clientId;
  form.value.doMoneyPrice = formData.value.projectAmount;
  form.value.settlementDone = formData.value.settlementDone;
  form.value.systemDone = formData.value.systemDone;
  form.value.settlementPo = formData.value.settlementPo;
  form.value.remark = formData.value.remark;
  form.value.status = formData.value.status;
  dialogTableVisible.value = true;
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  formRef.value.resetFields();
  // // 重置表单
  Object.assign(form.value, {
    // id
    id: "",
    // 项目id
    projectId: "",
    // 客户id
    clientId: "",
    // 原价
    doMoneyPrice: "",
    // 结算完成数
    settlementDone: "",
    // 系统完成数
    systemDone: "",
    // 结算po号
    settlementPo: "",
    // 备注
    remark: "",
    // 结算状态: 1:待审核 2:已审核 3:已开票 4:已结算 5:已冻结
    status: null,
  });
  dialogTableVisible.value = false;
}
onMounted(async () => {
  customerList.value = await customerStore.getCustomerList();
});
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-dialog
      v-model="dialogTableVisible"
      title="项目结算编辑"
      width="600"
      :before-close="closeHandler"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="100px"
        :inline="false"
      >
        <el-form-item label="项目ID">
          <el-text class="mx-1">{{ form.projectId }}</el-text>
        </el-form-item>
        <el-form-item prop="clientId" label="所属客户">
          <el-select
            v-model="form.clientId"
            placeholder="请选择所属客户"
            clearable
            filterable
          >
            <el-option
              v-for="item in customerList"
              :key="item.tenantCustomerId"
              :value="item.tenantCustomerId"
              :label="item.customerAccord"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="doMoneyPrice" label="原价">
          <el-input
            v-model="form.doMoneyPrice"
            placeholder=""
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="系统完成数">
          <el-input
            v-model="form.systemDone"
            placeholder=""
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="结算完成数">
          <el-input
            v-model="form.settlementDone"
            placeholder=""
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="结算PO号">
          <el-input
            v-model="form.settlementPo"
            placeholder=""
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="" clearable @change="" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            placeholder="结算状态"
            v-model="form.status"
            clearable
            filterable
          >
            <el-option
              v-for="item in settlementStatusList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
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
