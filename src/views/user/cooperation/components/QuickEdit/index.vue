<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import apiUser from "@/api/modules/configuration_manager";

defineOptions({
  name: "componentsQuickEdit",
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
    chargeId: [{ required: true, message: "请选择PM", trigger: "change" }],
  },
});

const TypeList: any = {
  chargeUserId: "PM",
};

// 显隐
async function showEdit(row: any, FormType: any) {
  getTenantStaffList();
  data.value.title = TypeList[FormType];
  data.value.type = FormType;
  data.value.loading = true;
  data.value.formData = cloneDeep(row);
  data.value.formData.chargeUserId = row.userId;
  data.value.formData.chargeUserName = row.userName;
  data.value.dialogTableVisible = true;
  data.value.loading = false;
}
// 获取PM/用户
const getTenantStaffList = async () => {
  const res = await apiUser.getTenantStaffList();
  data.value.staffList = res.data;
};

const changeChargeUserId = (val: any) => {
  if (val) {
    const findData = data.value.staffList.find((item: any) => item.id === val);
    data.value.formData.chargeUserName = findData.userName;
  } else {
    data.value.formData.chargeUserId = "";
    data.value.formData.chargeUserName = "";
  }
};
// 提交数据
async function onSubmit() {
  data.value.loading = true;
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      const { status } = await api.updateInvitationBindUser(
        data.value.formData,
      );
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
    <el-dialog
      v-model="data.dialogTableVisible"
      v-if="data.dialogTableVisible"
      :title="data.title + '编辑'"
      draggable
    >
      <el-form
        ref="formRef"
        :model="data.formData"
        :rules="data.rules"
        label-width="100"
        label-position="right"
      >
        <template v-if="data.type === 'chargeUserId'">
          <el-form-item label="PM" prop="chargeUserId">
            <el-select
              v-model="data.formData.chargeUserId"
              clearable
              @change="changeChargeUserId"
            >
              <el-option
                v-for="item in data.staffList"
                :key="item.id"
                :value="item.id"
                :label="item.userName"
              >
                <span style="float: left">{{ item.userName }}</span>
                <span
                  style="
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 0.8125rem;
                  "
                >
                  {{ item.id }}
                </span>
              </el-option>
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
