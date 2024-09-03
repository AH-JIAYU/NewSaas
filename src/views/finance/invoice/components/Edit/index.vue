<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import api from "@/api/modules/finance_invoice";
import useUserCustomerStore from "@/store/modules/user_customer";//客户
import customerEdit from "@/views/user/customer/components/CustomerEdit/index.vue"; //快捷操作： 新增客户

defineOptions({
  name: "Edit",
});
const customerStore = useUserCustomerStore();//客户
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
// 组件Ref 快捷操作： 新增客户
const editRef = ref<any>();
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
  invoiceCode: [{ required: true, trigger: "blur", message: "请输入发票编号" }],
  tenantCustomerId: [{ required: true, trigger: "change", message: "请选择客户" }],
});
// 提交数据
function onSubmit() {
  return new Promise<void>((resolve) => {
    if (!form.value.id) {
      formRef.value &&
        formRef.value.validate((valid: any) => {
          if (valid) {
            try {
              loading.value = true;
              delete form.value.id;
              api.create(form.value).then(() => {
                loading.value = false;
                ElMessage.success({
                  message: "新增成功",
                  center: true,
                });
                emits("success");
                dialogTableVisible.value = false;
                resolve();
              });
            } catch (error) {

            } finally {
              loading.value = false;
            }
          }
        });
    } else {
      formRef.value &&
        formRef.value.validate((valid: any) => {
          if (valid) {
            try {
              loading.value = true;
              const data = toRaw(form.value);
              api.edit(data).then(() => {
                loading.value = false;
                ElMessage.success({
                  message: "编辑成功",
                  center: true,
                });
                emits("success");
                dialogTableVisible.value = false;
                resolve();
              });
            } catch (error) {

            } finally {
              loading.value = false;
            }
          }
        });
    }
  });
}
// 获取数据
async function showEdit(row?: any) {
  try {
    loading.value = true;
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
    loading.value = false;
    dialogTableVisible.value = true;
  } catch (error) {

  } finally {
    loading.value = false;
  }
}
// 快捷操作：新增客户
const AddCustomers = () => {
  editRef.value.showEdit();
}
// 获取客户
const getCustomerList = async () => {
  customerList.value = await customerStore.getCustomerList();
}

onMounted(async () => {
  defaultTime.value = new Date();
  await getCustomerList()
});
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-dialog v-model="dialogTableVisible" :title="title" width="700">
      <el-form ref="formRef" label-width="5.3125rem" :model="form" :rules="formRules" :inline="false">
        <el-form-item label="客户简称" prop="tenantCustomerId">
          <el-select v-model="form.tenantCustomerId" placeholder="请选择客户" clearable filterable>
            <el-option v-for="item in customerList" :key="item.tenantCustomerId" :value="item.tenantCustomerId"
              :label="item.customerAccord" />
            <template #empty>
              <div style="display: flex;justify-content: space-between;align-items:center;padding:0 1rem;">
                暂无数据
                <el-button type="primary" link size="small" @click="AddCustomers">
                  快捷新增
                  <SvgIcon name="ant-design:plus-outlined" color="#fff"
                    style="background-color: var(--el-color-primary);border-radius: 50%;padding: .125rem;margin:0 .125rem" />
                </el-button>
              </div>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item prop="invoiceCode" label="发票编号">
          <el-input v-model="form.invoiceCode" placeholder="请输入发票编号" clearable />
        </el-form-item>
        <el-form-item label="发票金额">
          <el-input v-model.number="form.invoiceAmount" placeholder="请输入发票金额" clearable />
        </el-form-item>
        <el-form-item label="手续费(税)">
          <el-input v-model.number="form.invoiceTax" placeholder="请输入手续费" clearable />
        </el-form-item>
        <el-form-item label="实际收款">
          <el-input v-model.number="form.actualReceipts" placeholder="请输入实际收款" clearable />
        </el-form-item>
        <el-form-item label="发票状态">
          <el-select v-model="form.invoiceStatus" placeholder="请选择发票状态" clearable filterable>
            <ElOption v-for="item in invoiceStatusList" :label="item.lable" :value="item.value"></ElOption>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 100%" label="开票日期">
          <el-date-picker v-model="form.invoiceDate" :default-time="defaultTime" type="datetime" placeholder="请选择开票日期"
            value-format="YYYY-MM-DD hh:mm:ss" />
        </el-form-item>
        <el-form-item label="收款日期">
          <el-date-picker v-model="form.paymentDate" :default-time="defaultTime" type="datetime" placeholder="请选择收款日期"
            value-format="YYYY-MM-DD hh:mm:ss" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="备注说明" clearable :rows="5" type="textarea" />
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
    <customerEdit ref="editRef" @fetch-data="getCustomerList" />
  </div>
</template>
