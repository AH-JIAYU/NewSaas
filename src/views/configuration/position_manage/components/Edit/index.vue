<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import api from "@/api/modules/finance_invoice";

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
// 客户列表
const customerList = ref<any>([]);
// formRef
const formRef = ref();
// 弹框开关变量
const dialogTableVisible = ref(false);
// 发票状态
const invoiceStatusList = [
  { lable: "未收款", value: 1 },
  { lable: "部分收款", value: 2 },
  { lable: "已完结", value: 3 },
  { lable: "坏账", value: 4 },
];
// 定义表单
const form = ref<any>({
  id: null,
  // 客户id
  tenantCustomerId: "",
  // 发票编号
  invoiceCode: "",
  // 发票金额
  invoiceAmount: null,
  // 税
  invoiceTax: null,
  // 实际收款
  actualReceipts: null,
  // 发票状态 （未收款、部分收款、已完结、坏账）
  invoiceStatus: null,
  // 开票日期
  invoiceDate: "",
  // 收款日期
  paymentDate: "",
  // 备注
  remark: "",
});
// 个人信息校验
const formRules = ref<FormRules>({
  invoiceCode: [{ required: true, trigger: "blur", message: "请输入职位名称" }],
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
async function showEdit(row: any, val: any) {
  if (row) {
    form.value = JSON.parse(row);
  } else {
    form.value = {
      id: null,
      // 客户id
      tenantCustomerId: "",
      // 发票编号
      invoiceCode: "",
      // 发票金额
      invoiceAmount: null,
      // 税
      invoiceTax: null,
      // 实际收款
      actualReceipts: null,
      // 发票状态 （未收款、部分收款、已完结、坏账）
      invoiceStatus: null,
      // 开票日期
      invoiceDate: "",
      // 收款日期
      paymentDate: "",
      // 备注
      remark: "",
    };
  }
  title.value = row?.id ? "编辑" : "新增";
  customerList.value = val;
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
        <el-form-item prop="invoiceCode" label="职位名称">
          <el-input
            v-model="form.invoiceCode"
            placeholder="请输入职位名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="职位日志">
          <el-switch
            v-model="form.active"
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </el-form-item>
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
