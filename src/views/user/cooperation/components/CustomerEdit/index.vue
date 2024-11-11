<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_cooperation";
import apiUser from "@/api/modules/configuration_manager";
import storage from "@/utils/storage";
import userDialog from "@/components/departmentHead/index.vue"; //部门人
const emit = defineEmits(["fetch-data"]);
import apiDep from "@/api/modules/department";
const drawerisible = ref<boolean>(false);
const title = ref<string>("");
const treeRef = ref();
const formRef = ref<any>(); // Ref
const defaultProps: any = {
  children: "children",
  label: "name",
};
const validateNumberRange = (rule: any, value: any, callback: any) => {
  const regex = /^(100|[1-9]?\d)$/;
  if (regex.test(value) == false) {
    return callback(new Error("请输入 0 到 100 之间的数字"));
  }
  callback(); // 校验通过
};
const data = ref<any>({
  form: {},
  tenantUserList: [], //合作商list
  tenantStaffList: [], // 员工列表
  chargeUserId: null, //负责人UserId
  departmentId: null, //邀请方部门id
  chargeUserName: "", //负责人用户姓名
  rules: {
    beInvitationTenantId: [
      { required: true, message: "请选择合作商", trigger: "change" },
    ],
    priceRatio: [
      { required: true, message: "请输入", trigger: "blur" },
      {
        type: "number",
        trigger: "blur",
        validator: validateNumberRange,
      },
      // { min: 0, max: 100, message: '请在0-100范围内输入', trigger: 'change"' },
    ],
    sendProjectType: [
      { required: true, message: "请选择发送项目", trigger: "change" },
    ],
    receiveProjectType: [
      { required: true, message: "请选择接收项目", trigger: "change" },
    ],
    // chargeUserName: [
    //   { required: true, message: "请选择接收项目负责人", trigger: "change" },
    // ],
    // chargeUserId: [
    //   { required: true, message: "请选择PM", trigger: "change" },
    // ],
  },
});
// 部门数据
const departmentList = ref<any>([]);
const selectTreeRef = ref();
// 显隐
async function showEdit() {
  data.value.form.chargeUserId = "";
  await getTenantUserList();
  // await getTenantStaffList();
  drawerisible.value = true;
  // 部门
  const res = await apiDep.list({ name: "" });
  if (res.data) {
    departmentList.value = res.data;
  }
  // console.log(departmentList.value, "departmentList.valu");
}
// 树选中事件
const handleNodeClick = (nodeData: any, checked: any) => {
  if (checked) {
    // 选中新的节点时，取消其他选中的节点
    const checkedKeys = treeRef.value.getCheckedKeys(); // 获取当前所有选中的节点
    checkedKeys.forEach((key: any) => {
      if (key !== nodeData.id) {
        treeRef.value.setChecked(key, false); // 取消选中其他节点
      }
    });
    // 更新当前选中的节点 ID
    data.value.form.chargeUserId = nodeData.id; // 只保留当前选中节点 ID
    const checkedNodes = treeRef.value.getCheckedNodes();
    data.value.form.chargeUserName = checkedNodes.map(
      (node: any) => node.name
    )[0];
    // 关闭下拉框
    setTimeout(() => {
      selectTreeRef.value.blur(); // 失去焦点，关闭下拉框
    }, 100);
    // console.log(data.value.form.chargeUserName,'data.value.form.chargeUserName')
  } else {
    // 如果取消选中节点，更新 chargeUserId
    data.value.form.chargeUserId = [data.value.form.chargeUserId].filter(
      (id: any) => id !== nodeData.id
    );
    if(data.value.form.chargeUserId.length ==0){
      data.value.form.chargeUserId = ''
    }
  }
  if(!data.value.form.chargeUserId){
    data.value.form.chargeUserName =''
  }
  console.log(data.value.form.chargeUserName,'data.value.form.chargeUserName')
  console.log(data.value.form.chargeUserId, "data.value.form.chargeUserId");
};
// 获取合作商列表
async function getTenantUserList() {
  const res = await api.getTenantUserList({});
  data.value.tenantUserList = res.data.tenantUserInfoList;
}

// 筛选所选合作商
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
      //如果obj.receiveProjectType == 1，，必须要选人
      if (obj.receiveProjectType == 1 && !obj.chargeUserId) {
        ElMessage.warning({
          message: "请选择接收项目负责人",
          center: true,
        });
        return;
      }
      obj.sendProjectType =
        data.value.form.sendProjectType.length != 0
          ? data.value.form.sendProjectType[0]
          : null;
      obj.receiveProjectType =
        data.value.form.receiveProjectType.length != 0
          ? data.value.form.receiveProjectType[0]
          : null;
          obj.invitationType = 2 ;
      if (obj.receiveProjectType == 2) {
        //手动
        data.value.form.chargeUserId = null; //负责人UserId
        data.value.form.chargeUserName = ""; //负责人用户姓名

        obj.chargeUserId = null; //负责人UserId
        obj.chargeUserName = ""; //负责人用户姓名
        obj.invitationType = '';
      }
      obj.invitationType = 2; //固定传部门
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
  userRef.value.showEdit(obj, "请选择负责部门/人");
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
        labelPosition="left"
              class="hezuoDrawer"
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
        <template v-if="data.form.beInvitationTenantId">
          <el-form-item label="价格比例" prop="priceRatio">
            <el-input
              v-model="data.form.priceRatio"
              clearable
              placeholder="请输入0-100之间的数字"
              ><template #append>%</template></el-input
            >
          </el-form-item>
        </template>
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
        <el-form-item label-width="7rem" v-if="data.form.beInvitationTenantId">
          <template #label>
            <span style="font-weight: 700; font-size: 0.9375rem"
              >项目分配方式</span
            >
          </template>
        </el-form-item>

        <div v-if="data.form.beInvitationTenantId">
          <el-form-item prop="sendProjectType" label-width="7rem">
            <template #label>
              <span>
                <el-tooltip effect="dark" content="" placement="top-start">
                  <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                </el-tooltip>
                发送项目
              </span>
            </template>

            <el-checkbox-group
              v-model="data.form.sendProjectType"
              @change="handleCheckboxChange1"
            >
              <el-checkbox :value="1"> 自动 </el-checkbox>
              <el-checkbox :value="2"> 手动 </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div style="display: flex">
            <el-form-item prop="receiveProjectType" label-width="7rem">
              <template #label>
                <span>
                  <el-tooltip effect="dark" content="" placement="top-start">
                    <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                  </el-tooltip>
                  接收项目
                </span>
              </template>

              <el-checkbox-group
                v-model="data.form.receiveProjectType"
                @change="handleCheckboxChange2"
              >
                <el-checkbox :value="1"> 自动 </el-checkbox>
                <el-checkbox :value="2"> 手动 </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-select
              v-if="data.form.receiveProjectType == 1"
              v-model="data.form.chargeUserName"
              placeholder="请选择部门"
              ref="selectTreeRef"
              style="width: 15.625rem;margin-left: 1.5625rem;"
            >
              <el-option :value="data.form.chargeUserId" style="height: auto">
                <el-tree
                  v-if="departmentList.length > 0"
                  ref="treeRef"
                  :disabled="true"
                  :data="departmentList"
                  show-checkbox
                  check-strictly
                  node-key="id"
                  :default-expanded-keys="[]"
                  :default-checked-keys="[data.form.chargeUserId]"
                  default-expand-all
                  :props="defaultProps"
                  @check-change="handleNodeClick"
                  :check-on-click-node="true"
                  :expand-on-click-node="false"
                />
                <el-text v-else>暂无数据</el-text>
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- <el-input
          placeholder="请选择接收项目负责人"
          @keydown="handleKeydown"
          @click="openUserDialog"
          v-if="
            data.form.receiveProjectType && data.form.receiveProjectType[0] == 1
          "
          v-model="data.form.chargeUserName"
        >
        </el-input> -->
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
}
:deep(.el-select-dropdown__item.is-selected.is-hovering){
  background-color: white !important;
  padding:0 !important
}
:deep(.el-select-dropdown__item.is-selected){
  font-weight: 100 !important;
}
.fontColor {
  color: #333333 !important;
}
:deep(.el-form label, .el-tree-node__label, .checkbox__label) {
  color: #333333;
}
:deep(.userClass .el-tree-node.is-checked > .el-tree-node__content) {
  background: #e3f1ff;
  font-weight: 400;
  font-size: 14px;
  color: #409eff;
}
:deep(.userClass .el-tree-node) {
  margin-top: 8px;
}

// :deep(.inviteDialog ){
//   color: #333333 !important;
// }
</style>
