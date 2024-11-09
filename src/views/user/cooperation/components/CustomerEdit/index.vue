<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import apiUser from "@/api/modules/configuration_manager";
import storage from "@/utils/storage";
import userDialog from "@/components/departmentHead/index.vue"; //部门人
const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const title = ref<string>("");
const formRef = ref<any>(); // Ref
const data = ref<any>({
  form: {},
  tenantUserList: [], //租户list
  tenantStaffList: [], // 员工列表
  chargeUserId: null, //负责人UserId
  departmentId: null, //邀请方部门id
  chargeUserName: "", //负责人用户姓名
  rules: {
    beInvitationTenantId: [
      { required: true, message: "请选择租户", trigger: "change" },
    ],
    priceRatio: [
      { required: true, message: "请输入价格比例", trigger: "blur" },
    ],
    sendProjectType: [
      { required: true, message: "请选择发送项目", trigger: "change" },
    ],
    receiveProjectType: [
      { required: true, message: "请选择接收项目", trigger: "change" },
    ],
    // chargeUserId: [
    //   { required: true, message: "请选择PM", trigger: "change" },
    // ],
  },
});
// 显隐
async function showEdit() {
  await getTenantUserList();
  // await getTenantStaffList();
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
    data.value.form.phoneOrEmail = storage.local.get("account");
    return [findData];
  }
  return [];
});
// 获取PM/用户
const getTenantStaffList = async () => {
  const res = await apiUser.getTenantStaffList();
  data.value.tenantStaffList = res.data;
};
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
      let obj = JSON.parse(JSON.stringify(data.value.form)); //深拷贝，不改变原数据

      obj.sendProjectType =
        data.value.form.sendProjectType.length != 0
          ? data.value.form.sendProjectType[0]
          : null;
      obj.receiveProjectType =
        data.value.form.receiveProjectType.length != 0
          ? data.value.form.receiveProjectType[0]
          : null;
      if (obj.receiveProjectType == 2) {
        //手动
        data.value.form.chargeUserId = null; //负责人UserId
        data.value.form.chargeUserName = ""; //负责人用户姓名
        data.value.form.invitationType = ""; //邀请类型

        obj.chargeUserId = null; //负责人UserId
        obj.chargeUserName = ""; //负责人用户姓名
        obj.invitationType = ""; //邀请类型
      }

      api.addInvitationBind(obj).then((res: any) => {
        if (res.status == -1) {
          ElMessage.success({
            message: res.error,
            center: true,
          });
        } else {
          ElMessage.success({
            message: "发送成功",
            center: true,
          });
          emit("fetch-data");
          close();
        }
      });
    }
  });
}
//原始数据接口
async function BindPriceRatio() {
  await api.addInvitationBind(data.value.form);
}
// 项目分配方式接口
async function BindUser() {
  //
  const { status } = await api.updateInvitationBindUser({
    // chargeUserId: data.value.chargeUserId, //负责人UserId
    // departmentId: data.value.departmentId, //邀请方部门id
    // chargeUserName: data.value.chargeUserName, //负责人用户姓名
    // sendProjectType: data.value.form.sendProjectType, //邀请方发送项目类型:1:自动 2:手动
    // receiveProjectType: data.value.form.receiveProjectType, //邀请方接收项目类型:1:自动 2:手动
  });
  status === 1 &&
    ElMessage.success({
      message: "编辑成功",
      center: true,
    });
}

defineExpose({
  showEdit,
});
//选择部门人
const userRef = ref();
function openUserDialog() {
  let obj = {
    chargeUserId: data.value.form.chargeUserId,
    invitationType: data.value.form.invitationType,
    chargeUserName: data.value.form.chargeUserName,
  };
  userRef.value.showEdit(obj);
}
//勾选部门人回传数据
function userData(data1: any) {
  data.value.form.chargeUserId = data1.chargeUserId; //负责人UserId
  data.value.form.invitationType = data1.invitationType; //邀请类型，1员工，2部门
  data.value.form.chargeUserName = data1.chargeUserName;
}
//发送项目勾选
// 处理选中项变化的逻辑，确保最多只能选择一个
const handleCheckboxChange1 = (newValue: any) => {
  if (Array.isArray(newValue) && newValue.length > 1) {
    // 只有一个选项可以被选中，取最后一个选中的
    data.value.form.sendProjectType = [newValue[newValue.length - 1]];
  }
};
//接收项目
const handleCheckboxChange2 = (newValue: any) => {
  if (Array.isArray(newValue) && newValue.length > 1) {
    // 只有一个选项可以被选中，取最后一个选中的
    data.value.form.receiveProjectType = [newValue[newValue.length - 1]];
  }
};
const handleKeydown = (e: any) => {
  // 阻止键盘输入
  e.preventDefault();
};
</script>

<template>
  <div>
    <el-dialog
      v-model="drawerisible"
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      width="30%"
      title="邀约公司"
    >
      <ElForm
        ref="formRef"
        :rules="data.rules"
        :model="data.form"
        label-width="7rem"
        labelPosition ='left'
      >
        <el-form-item label="公司名称" prop="beInvitationTenantId">
          <el-select v-model="data.form.beInvitationTenantId" clearable>
            <el-option
              v-for="item in data.tenantUserList"
              :key="item.tenantId"
              :value="item.tenantId"
              :label="item.tenantName"
            >
              <span style="float: left">{{ item.tenantName }}</span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 0.8125rem;
                "
              >
                {{ item.tenantId }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-table
          v-if="dataList.length"
          :data="dataList"
          border
          stripe
          style="margin-bottom: 18px"
        >
          <el-table-column prop="name" label="用户名" />
          <el-table-column prop="tenantName" label="公司名称" />
          <el-table-column prop="country" label="区域" />
          <el-table-column label="电子邮箱/手机号">
            <template #default="{ row }">
              <span v-if="row.phone">{{ row.phone }}</span>
              <span v-else>{{ row.email }}</span>
            </template>
          </el-table-column>
        </el-table>
        <template v-if="data.form.beInvitationTenantId">
          <el-form-item label="价格比例" prop="priceRatio">
            <el-input v-model="data.form.priceRatio" clearable
              ><template #append>%</template></el-input
            >
          </el-form-item>
        </template>
        <el-form-item label="项目分配方式" label-width="7rem" v-if="data.form.beInvitationTenantId"> </el-form-item>


          <div style="display: flex" v-if="data.form.beInvitationTenantId"       class="inviteDialog">
            <el-form-item prop="sendProjectType">
              <span slot="label" style="margin-right:15px">
                <el-tooltip
                  effect="dark"
                  content="1111111"
                  placement="top-start"
                >
                  <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                </el-tooltip>
                <span style="color: #F56C6C;">*</span>
                发送项目
              </span>

              <el-checkbox-group
                v-model="data.form.sendProjectType"
                @change="handleCheckboxChange1"
              >
                <el-checkbox :value="1"> 自动 </el-checkbox>
                <el-checkbox :value="2"> 手动 </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="receiveProjectType" style="margin-left:40px">
              <span slot="label" style="margin-right:15px">
                <el-tooltip
                  effect="dark"
                  content="1111111"
                  placement="top-start"
                >
                  <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                </el-tooltip>
                <span style="color: #F56C6C;">*</span>
                接收项目
              </span>


              <el-checkbox-group
                v-model="data.form.receiveProjectType"
                @change="handleCheckboxChange2"
              >
                <el-checkbox :value="1"> 自动 </el-checkbox>
                <el-checkbox :value="2"> 手动 </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

        <el-input
          placeholder="请选择接收项目负责人"
          @keydown="handleKeydown"
          @click="openUserDialog"
          v-if="
            data.form.receiveProjectType && data.form.receiveProjectType[0] == 1
          "
          v-model="data.form.chargeUserName"
        >
        </el-input>
      </ElForm>
      <template #footer>
        <el-button @click="close"> 关闭 </el-button>
        <el-button type="primary" @click="save"> 发送邀约 </el-button>
      </template>
    </el-dialog>
    <userDialog ref="userRef" @userData="userData" />
  </div>
</template>

<style scoped lang="scss">
:deep {
  .el-dialog__body {
    min-height: 12.5rem !important;
  }
}:deep(.inviteDialog .el-form-item__content){
  margin-left: 0 !important;
}

</style>
