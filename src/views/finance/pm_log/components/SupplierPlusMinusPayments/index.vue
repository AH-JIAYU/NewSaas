<script lang="ts" setup>
import { provide, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import api from "@/api/modules/financial_pm_log";

const emit = defineEmits(["fetch-data"]);
const loadingDisible = ref<boolean>(false);
// 加载
const loading = ref(false);
// form ref
const formRef = ref<FormInstance>();
const title = ref<string>("");
const dataList = ref();
const isId = ref<any>()
const operationTypeList = [
  { label: "加款", value: 1 },
  { label: "减款", value: 2 },
];
const typeList = [
  { label: "待审金额", value: 2 },
  { label: "可用余额", value: 1 },
];
const form = ref<any>({
  // id
  id: null,
  // 修改类型 1加款 2减款
  operationType: null,
  // 修改金额类型 1可用 2待审
  balanceType: null,
  // 金额
  balance: null,
});

// 校验
const formRules = ref<FormRules>({
  balance: [{ required: true, message: "请输入金额", trigger: "blur" }],
});

async function showEdit(row: any) {
  loadingDisible.value = true;
  if (!row) {
    title.value = "新增";
  } else {
    title.value = "编辑";
    dataList.value = JSON.parse(row);
    isId.value = dataList.value.id
    form.value.id = dataList.value.id
  }
}
// 关闭弹框
function close() {
  // 重置数据
  Object.assign(form.value, {
  // id
  id: null,
  // 修改类型 1加款 2减款
  operationType: null,
  // 修改金额类型 1可用 2待审
  balanceType: null,
  // 金额
  balance: null,
});
  loadingDisible.value = false;
}
// 提交
async function onSubmit() {
  formRef.value &&
    formRef.value.validate(async (valid) => {
      if (valid) {
        loading.value = true;
        const res = await api.updateDepartment(form.value);
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
    <el-dialog
      v-model="loadingDisible"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      width="35%"
      @close="close"
    >
      <el-form
        :model="form"
        :rules="formRules"
        ref="formRef"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="ID"> {{ isId }} </el-form-item>
        <el-form-item label="加减款">
          <el-select
            v-model="form.operationType"
            value-key=""
            placeholder="请选择加减款"
            clearable
            filterable
          >
            <el-option
              v-for="item in operationTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="form.balanceType"
            value-key=""
            placeholder="请选择类型"
            clearable
            filterable
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="balance">
          <el-input v-model.number="form.balance"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="close"> 取消 </el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>
