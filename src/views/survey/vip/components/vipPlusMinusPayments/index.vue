<script lang="ts" setup>
import { provide, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import api from "@/api/modules/survey_vip";

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
  memberId: null,
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
  difference: [{ required: true, message: "请输入金额", trigger: "blur" },
  // 正数且最多两位小数
  {
    pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/,
    message: '请输入有效的正数，且最多两位小数',
    trigger: 'blur'
  }],
  remark: [{ required: true, message: "请输入说明", trigger: "blur" }],
  operationType: [{ required: true, message: "请选择加减款", trigger: "change" }],
  type: [{ required: true, message: "请选择类型", trigger: "change" }],
});

async function showEdit(row: any) {
  loadingDisible.value = true;
  if (!row) {
    title.value = "新增";
  } else {
    title.value = "编辑";
    dataList.value = JSON.parse(row);
    form.value.memberId = dataList.value.memberId;
  }
}
// 提交
async function onSubmit() {
  formRef.value &&
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          loading.value = true;
          const res = await api.getMemberPlusMinusPaymentsList(form.value);
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

// 发送
const sendProjectType = ref<any>(null)
// 接收
const receiveProjectType = ref<any>(null)
//列表切换发送项目状态
const changeSendProjectType = (name: any, row: any) => {
  if (row) {
    if (name === '加款' || name === '减款') {
      sendProjectType.value = row
      form.value.operationType = row
    } else if (name === '待审金额' || name === '可用金额') {
      receiveProjectType.value = row
      form.value.type = row
    }
  }
};

// 关闭弹框
function close() {
  // 重置数据
  Object.assign(form.value, {
    // 供应商id
    memberId: null,
    // 操作类型 1加款 2减款
    operationType: null,
    // 类型 1待审金额 2可用余额
    type: null,
    // 金额
    difference: null,
    // 说明
    remark: "",
  });
  sendProjectType.value = null
  receiveProjectType.value = null
  loadingDisible.value = false;
}
// ... 这里可能还有其他逻辑 ...
defineExpose({
  showEdit,
});
</script>

<template>
  <div v-loading="loading">
    <el-dialog v-model="loadingDisible" title="加减款" append-to-body :close-on-click-modal="false" destroy-on-close
      draggable width="35%" @close="close">
      <el-form :model="form" :rules="formRules" ref="formRef" label-width="5rem" :inline="false">
        <el-form-item label="会员ID"> {{ form.memberId }} </el-form-item>
        <el-form-item label="加减款" prop="operationType">
          <div>
            <el-button :type="sendProjectType === 1 ? 'primary' : ''" size="small"
              @click="changeSendProjectType('加款', 1)">加款
            </el-button>
            <el-button :type="sendProjectType === 2 ? 'primary' : ''" size="small"
              @click="changeSendProjectType('减款', 2)">减款</el-button>
          </div>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <div>
            <el-button :type="receiveProjectType === 1 ? 'primary' : ''" size="small"
              @click="changeSendProjectType('待审金额', 1)">待审金额
            </el-button>
            <el-button :type="receiveProjectType === 2 ? 'primary' : ''" size="small"
              @click="changeSendProjectType('可用金额', 2)">可用金额</el-button>
          </div>
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
