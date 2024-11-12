<script setup lang="ts">
import api from "@/api/modules/notification";
import useNotificationStore from "@/store/modules/notification";
import apiUser from "@/api/modules/configuration_manager";
import userDialog from "@/components/departmentHead/index.vue"; //部门人
import apiDep from "@/api/modules/department";
import { ElMessage, ElMessageBox } from "element-plus";
defineOptions({
  name: "PersonalNotificationCooperation",
});
const emit = defineEmits(["delSelectId"]);
const notificationStore = useNotificationStore();
const validateNumberRange = (rule: any, value: any, callback: any) => {
  const regex = /^(100|[1-9]?\d)$/;
  if (regex.test(value) == false) {
    return callback(new Error("请输入 0 到 100 之间的数字"));
  }
  callback(); // 校验通过
};
const data = ref<any>({
  rules: {
    priceRatio: [
      { required: true, message: "请输入价格比例", trigger: "blur" },
      //{ min: 0, max: 100, message: '请在0-100范围内输入', trigger: 'blur' },
      {
        type: "number",
        trigger: "blur",
        validator: validateNumberRange,
      },
    ],

    sendProjectType: [
      { required: true, message: "请选择发送项目", trigger: "change" },
    ],
    receiveProjectType: [
      { required: true, message: "请选择接收项目", trigger: "change" },
    ],
    // beInvitationChargeUserId: [
    //   { required: true, message: "请选择PM", trigger: "change" },
    // ],
  },
});
const dialogTableVisible = ref<any>(false); // 同意合作-PM弹框
const tenantStaffList = ref<any>([]); // PM

const FormRef = ref<any>();
const defaultProps: any = {
  children: "children",
  label: "name",
};
const showEdit = async (row: any) => {
  // await getTenantStaffList();
  data.value.chargeUserId = "";
  data.value = row;
  // 部门
  const res = await apiDep.list({ name: "" });
  if (res.data) {
    departmentList.value = res.data;
  }
  read();
};
// 部门数据
const departmentList = ref<any>([]);
const selectTreeRef = ref();
const treeRef = ref();
// 树选中事件
const handleNodeClick = (nodeData: any, checked: any) => {
  data.value.chargeUserId = "";
  if (checked) {
    // 选中新的节点时，取消其他选中的节点
    const checkedKeys = treeRef.value.getCheckedKeys(); // 获取当前所有选中的节点
    checkedKeys.forEach((key: any) => {
      if (key !== nodeData.id) {
        treeRef.value.setChecked(key, false); // 取消选中其他节点
      }
    });
    // 更新当前选中的节点 ID
    data.value.chargeUserId = nodeData.id; // 只保留当前选中节点 ID
    const checkedNodes = treeRef.value.getCheckedNodes();
    data.value.chargeUserName = checkedNodes.map((node: any) => node.name)[0];
    // 关闭下拉框
    setTimeout(() => {
      selectTreeRef.value.blur(); // 失去焦点，关闭下拉框
    }, 100);
    // console.log(data.value.form.chargeUserName,'data.value.form.chargeUserName')
  } else {
    // 如果取消选中节点，更新 chargeUserId
    data.value.chargeUserId = [data.value.chargeUserId].filter(
      (id: any) => id !== nodeData.id
    );
    if (data.value.chargeUserId.length == 0) {
      data.value.chargeUserId = "";
    }
  }

  if (!data.value.chargeUserId) {
    data.value.chargeUserName = "";
  }
  console.log(data.value.chargeUserName, "data.value.form.chargeUserName");
  console.log(data.value.chargeUserId, "data.value.form.chargeUserId");
};
// 获取PM/用户
const getTenantStaffList = async () => {
  const res = await apiUser.getTenantStaffList();
  tenantStaffList.value = res.data;
};
const changeBeInvitationChargeUserId = (val: any) => {
  if (val) {
    const findData = tenantStaffList.value.find(
      (item: any) => item.id === data.value.beInvitationChargeUserId
    );
    data.value.beInvitationChargeUserName = findData.userName;
  } else {
    data.value.beInvitationChargeUserId = "";
    data.value.beInvitationChargeUserName = "";
  }
};
// 已读
const read = async () => {
  const params = {
    id: data.value.id,
    type: 1,
  };
  await api.updateTenantAudit(params); //修改该条数据待办状态
  await notificationStore.getUnreadTodo(); // 重新获取待办列表
};
// 拒绝
const refuse = async () => {
  const params = {
    id: data.value.id,
    type: 2,
  };
  emit("delSelectId");
  await api.updateTenantAudit(params); //修改该条数据待办状态
  await notificationStore.getUnreadTodo(); // 重新获取待办列表
};
// 同意
const agree = async () => {
  FormRef.value.validate(async (valid: any) => {
    if (valid) {
      //如果obj.receiveProjectType == 1，，必须要选人
      //判断如果为数组改为字符串，data.value.form.chargeUserId
      if (Array.isArray(data.value.chargeUserId)) {
        data.value.chargeUserId = data.value.chargeUserId[0];
      }
      if (data.value.receiveProjectType == 1 && !data.value.chargeUserId) {
        ElMessage.warning({
          message: "请选择接收项目负责人",
          center: true,
        });
        return;
      }
      const params = {
        id: data.value.id,
        // beInvitationChargeUserId: data.value.beInvitationChargeUserId,
        // beInvitationChargeUserName: data.value.beInvitationChargeUserName,
        priceRatio: data.value.priceRatio,
        type: 3,
        beInvitationChargeUserId: data.value.chargeUserId, //负责人UserId
        beInvitationType: 2, //邀请类型 ,目前只有部门，先写死
        beInvitationChargeUserName: data.value.chargeUserName, //负责人用户姓名
        sendProjectType: data.value.sendProjectType[0], //邀请方发送项目类型:1:自动 2:手动
        receiveProjectType: data.value.receiveProjectType[0], //邀请方接收项目类型:1:自动 2:手动
      };

      emit("delSelectId");
      await api.updateTenantAudit(params); //修改该条数据待办状态
      await notificationStore.getUnreadTodo(); // 重新获取待办列表
    }
  });
};
//选择部门人
const userRef = ref();
function openUserDialog() {
  userRef.value.showEdit("", "请选择负责部门/人");
}
//勾选部门人回传数据
function userData(data1: any) {
  data.value.chargeUserId = data1.chargeUserId; //负责人UserId
  data.value.invitationType = data1.invitationType; //邀请类型
  data.value.chargeUserName = data1.chargeUserName;
  // data.value.name = (data1.departmentName ?data1.departmentName:'') + (data.value.form.chargeUserName ?','+ data.value.form.chargeUserName:'')
}
//发送项目勾选
// 处理选中项变化的逻辑，确保最多只能选择一个
const handleCheckboxChange1 = (newValue: any) => {
  if (Array.isArray(newValue) && newValue.length > 1) {
    // 只有一个选项可以被选中，取最后一个选中的
    data.value.sendProjectType = [newValue[newValue.length - 1]];
  }
};
//接收项目
const handleCheckboxChange2 = (newValue: any) => {
  if (Array.isArray(newValue) && newValue.length > 1) {
    // 只有一个选项可以被选中，取最后一个选中的
    data.value.receiveProjectType = [newValue[newValue.length - 1]];
  }
};
const handleKeydown = (e: any) => {
  // 阻止键盘输入
  e.preventDefault();
};
defineExpose({
  showEdit,
});
</script>

<template>
  <div class="news p-4">
    <div class="type"><span></span> 合作邀约</div>
    <div class="news-content">
      <div class="content">尊贵的{{ data.beInvitedName }}</div>
      <div class="time">
        您好，我是{{
          data.invitationName || "-"
        }}诚挚邀请您与我们一同协作共赢！若有疑问请联系{{ data.phoneOrEmail }}。
      </div>
      <div class="footer" v-if="data.auditStatus === 1">
        <el-button @click="refuse">拒绝合作</el-button>
        <el-button type="primary" @click="dialogTableVisible = true">
          同意合作
        </el-button>
      </div>
    </div>
    <el-dialog v-model="dialogTableVisible" title="添加PM" class="hezuoDrawer">
      <ElForm
        ref="FormRef"
        :rules="data.rules"
        :model="data"
        label-width="7rem"
        labelPosition="left"
      >
        <el-form-item label="价格比例" prop="priceRatio">
          <el-input v-model="data.priceRatio" clearable
            ><template #append>%</template></el-input
          >
        </el-form-item>
        <el-form-item label="项目分配方式" label-width="7rem"> </el-form-item>

        <el-form-item prop="sendProjectType" label-width="7rem">
          <template #label>
            <span>
              <el-tooltip effect="dark" content="1111111" placement="top-start">
                <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
              </el-tooltip>
              发送项目
            </span>
          </template>

          <el-checkbox-group
            v-model="data.sendProjectType"
            @change="handleCheckboxChange1"
          >
            <el-checkbox :value="1"> 自动 </el-checkbox>
            <el-checkbox :value="2"> 手动 </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div style="display: flex">
          <el-form-item prop="receiveProjectType">
            <template #label>
              <span>
                <el-tooltip
                  effect="dark"
                  content="1111111"
                  placement="top-start"
                >
                  <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                </el-tooltip>
                接收项目
              </span>
            </template>

            <el-checkbox-group
              v-model="data.receiveProjectType"
              @change="handleCheckboxChange2"
            >
              <el-checkbox :value="1"> 自动 </el-checkbox>
              <el-checkbox :value="2"> 手动 </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-select
            v-if="data.receiveProjectType == 1"
            v-model="data.chargeUserName"
            placeholder="请选择部门"
            ref="selectTreeRef"
            style="width: 15.625rem; margin-left: 1.5625rem"
          >
            <el-option :value="data.chargeUserId" style="height: auto">
              <el-tree
                v-if="departmentList.length > 0"
                ref="treeRef"
                :disabled="true"
                :data="departmentList"
                show-checkbox
                check-strictly
                node-key="id"
                :default-expanded-keys="[]"
                :default-checked-keys="[data.chargeUserId]"
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

        <!-- <el-input
          placeholder="请选择接收项目负责人"
          @keydown="handleKeydown"
          @click="openUserDialog"
          v-if="data.receiveProjectType && data.receiveProjectType[0] == 1"
          v-model="data.chargeUserName"
        >
        </el-input> -->

        <!-- <el-form-item label="PM" prop="beInvitationChargeUserId">
          <el-select
            v-model="data.beInvitationChargeUserId"
            clearable
            @change="changeBeInvitationChargeUserId"
          >
            <el-option
              v-for="item in tenantStaffList"
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
        </el-form-item> -->
      </ElForm>
      <template #footer>
        <ElButton size="large" @click="dialogTableVisible = false">
          取消
        </ElButton>
        <ElButton type="primary" size="large" @click="agree"> 确定 </ElButton>
      </template>
    </el-dialog>
    <userDialog ref="userRef" @userData="userData" />
  </div>
</template>

<style scoped lang="scss">
:deep(.hezuoDrawer .el-select-dropdown__item.is-hovering) {
  background: white !important;
}
:deep(.hezuoDrawer .el-select-dropdown__item.is-selected) {
  font-weight: 100 !important;
}
:deep(.inviteDialog .el-form-item__content) {
  margin-left: 0 !important;
}
:deep(.el-select-dropdown__item.is-hovering) {
  background: white;
}
:deep(.el-select-dropdown__item.is-selected) {
  font-weight: 100;
}
.news {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;

  > div {
    width: 100%;
    margin-top: 1rem;
  }

  .type {
    font-family: PingFang SC, PingFang SC;
    font-weight: 600;
    font-size: 1.125rem;
    color: #0f0f0f;
    margin-top: 0 !important;
    display: flex;
    justify-content: star;
    align-items: center;

    span {
      width: 0.1875rem;
      height: 1rem;
      display: inline-block;
      background-color: #46a1ff;
      margin-right: 0.3125rem;
    }
  }

  .news-content {
    overflow-y: auto;
    flex: 1;
    font-family: PingFang SC, PingFang SC;
    padding: 0 1rem;
    color: #0f0f0f;

    .content {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .time {
      font-weight: 400;
      font-size: 0.875rem;
    }

    .footer {
      margin-top: 1rem;
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }
}
</style>
