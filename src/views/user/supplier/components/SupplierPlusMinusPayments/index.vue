<script lang="ts" setup>
import { provide, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import api from "@/api/modules/user_supplier";

const emit = defineEmits(["fetch-data"]);
const loadingDisible = ref<boolean>(false);
// 加载
const loading = ref(false);
// form ref
const formRef = ref<FormInstance>();
const title = ref<string>("");
const dataList = ref();
const operationTypeList = [
  { label: "加款", value: 1 },
  { label: "减款", value: 2 },
];
const typeList = [
  { label: "待审金额", value: 1 },
  { label: "可用余额", value: 2 },
];
const form = ref<any>({
  // 供应商id
  supplierId: null,
  // 操作类型 1加款 2减款
  operationType: null,
  // 类型 1待审金额 2可用余额
  type: null,
  // 金额
  difference: null,
  // 说明
  remark: "",
});

// 校验
const formRules = ref<FormRules>({
  difference: [{ required: true, message: "请输入金额", trigger: "blur" }],
  remark: [{ required: true, message: "请输入说明", trigger: "blur" }],
});

async function showEdit(row: any) {
  loadingDisible.value = true;
  if (!row) {
    title.value = "新增";
  } else {
    title.value = "编辑";
    dataList.value = JSON.parse(row);
    form.value.supplierId = dataList.value.tenantSupplierId;
  }
}
// 关闭弹框
function close() {
  // 重置数据
  Object.assign(form.value, {
    // 供应商id
    supplierId: null,
    // 操作类型 1加款 2减款
    operationType: null,
    // 类型 1待审金额 2可用余额
    type: null,
    // 金额
    difference: null,
    // 说明
    remark: "",
  });
  loadingDisible.value = false;
}
// 提交
async function onSubmit() {
  formRef.value &&
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          loading.value = true;
          const res = await api.getSupplierPlusMinusPaymentsList(form.value);
          if (res.status === 1) {
            loading.value = false;
            emit("fetch-data");
            ElMessage.success({
              message: "操作成功",
              center: true,
            });
            close();
          } else {
            ElMessage.warning({
              message: "出现错误请联系管理人员",
              center: true,
            });
          }
        } catch (error) {

        } finally {
          loading.value = false;
        }
      }
    });
}

// ... 这里可能还有其他逻辑 ...
defineExpose({
  showEdit,
});
</script>

<template>
  <div v-loading="loading">
    <el-dialog v-model="loadingDisible" append-to-body :close-on-click-modal="false" destroy-on-close draggable
      width="35%" @close="close">
      <el-form :model="form" :rules="formRules" ref="formRef" label-width="80px" :inline="false">
        <el-form-item label="供应商ID"> {{ form.supplierId }} </el-form-item>
        <el-form-item label="加减款">
          <el-select v-model="form.operationType" value-key="" placeholder="请选择加减款" clearable filterable>
            <el-option v-for="item in operationTypeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" value-key="" placeholder="请选择类型" clearable filterable>
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="difference">
          <el-input v-model="form.difference"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="close"> 取消 </el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>
