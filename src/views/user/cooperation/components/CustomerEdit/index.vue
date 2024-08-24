<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import storage from "@/utils/storage";

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const title = ref<string>("");
const formRef = ref<any>(); // Ref
const data = ref<any>({
  form: {},
  tenantUserList: [], //租户list
  rules: {
    beInvitationTenantId: [
      { required: true, message: "请选择租户", trigger: "blur" },
    ],
  },
});
// 显隐
async function showEdit() {
  await getTenantUserList();
  drawerisible.value = true;
}
// 获取租户列表
async function getTenantUserList() {
  const res = await api.getTenantUserList({});
  data.value.tenantUserList = res.data.tenantUserInfoList;
}

// 筛选所选租户
const dataList = computed(() => {
  const findData = data.value.tenantUserList.find(
    (item: any) => item.tenantId === data.value.form.beInvitationTenantId
  );
  if (findData) {
    data.value.form.tenantName = findData.name;
    data.value.form.phoneOrEmail = storage.local.get("login_account");
    return [findData];
  }
  return [];
});

// 关闭
function close() {
  drawerisible.value = false;
  data.value.form = {};
  formRef.value.resetFields();
}

// // 确定
async function save() {
  formRef.value.validate((valid: any) => {
    if (valid) {
      api.addInvitationBind(data.value.form).then(() => {
        ElMessage.success({
          message: "发送成功",
          center: true,
        });
        emit("fetch-data");
        close();
      });
    }
  });
}
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-dialog v-model="drawerisible" :close-on-click-modal="false" destroy-on-close draggable width="30%" title="邀约公司">
      <ElForm ref="formRef" :rules="data.rules" :model="data.form" label-width="100px">
        <el-form-item label="客户名称" prop="beInvitationTenantId">
          <el-select v-model="data.form.beInvitationTenantId" clearable>
            <el-option v-for="item in data.tenantUserList" :key="item.tenantId" :value="item.tenantId"
              :label="item.name">
              <span style="float: left">{{ item.name }}</span>
              <span style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                ">
                {{ item.tenantId }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
      </ElForm>
      <el-table v-if="dataList.length" :data="dataList" border stripe>
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="tenantName" label="公司名称" />
        <el-table-column prop="country" label="国家" />
        <el-table-column label="电子邮箱/手机号">
          <template #default="{ row }">
            <span v-if="row.phone">{{ row.phone }}</span>
            <span v-else>{{ row.email }}</span>
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <el-button @click="close"> 关闭 </el-button>
        <el-button type="primary" @click="save"> 发送邀约 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep {
  .el-dialog__body {
    min-height: 12.5rem !important;
  }
}
</style>
