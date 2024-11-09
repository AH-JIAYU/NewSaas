<script setup lang="ts">
import api from "@/api/modules/notification";
import useNotificationStore from "@/store/modules/notification";
import apiUser from "@/api/modules/configuration_manager";
import userDialog from "@/components/departmentHead/index.vue"; //部门人
defineOptions({
  name: "PersonalNotificationCooperation",
});
const emit = defineEmits(["delSelectId"]);
const notificationStore = useNotificationStore();
const data = ref<any>({});
const dialogTableVisible = ref<any>(false); // 同意合作-PM弹框
const tenantStaffList = ref<any>([]); // PM

const FormRef = ref<any>();
const FormRules = {
  priceRatio: [{ required: true, message: "请输入价格比例", trigger: "blur" }],
  sendProjectType: [
    { required: true, message: "请选择发送项目", trigger: "change" },
  ],
  receiveProjectType: [
    { required: true, message: "请选择接收项目", trigger: "change" },
  ],
  // beInvitationChargeUserId: [
  //   { required: true, message: "请选择PM", trigger: "change" },
  // ],
};

const showEdit = async (row: any) => {
  // await getTenantStaffList();
  data.value = row;
  read();
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
      const params = {
        id: data.value.id,
        beInvitationChargeUserId: data.value.beInvitationChargeUserId,
        beInvitationChargeUserName: data.value.beInvitationChargeUserName,
        priceRatio: data.value.priceRatio,
        type: 3,
        chargeUserId: data.value.chargeUserId, //负责人UserId
        invitationType: data.value.invitationType, //邀请类型
        chargeUserName: data.value.chargeUserName, //负责人用户姓名
        sendProjectType: data.value.sendProjectType.length[0], //邀请方发送项目类型:1:自动 2:手动
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
  userRef.value.showEdit();
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
    <el-dialog v-model="dialogTableVisible" title="添加PM">
      <ElForm
        ref="FormRef"
        :rules="FormRules"
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

        <div style="display: flex" class="inviteDialog">
          <el-form-item prop="sendProjectType">
            <span slot="label" style="margin-right: 15px">
              <el-tooltip effect="dark" content="1111111" placement="top-start">
                <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
              </el-tooltip>
              <span style="color: #f56c6c">*</span>
              发送项目
            </span>

            <el-checkbox-group
              v-model="data.sendProjectType"
              @change="handleCheckboxChange1"
            >
              <el-checkbox :value="1"> 自动 </el-checkbox>
              <el-checkbox :value="2"> 手动 </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item prop="receiveProjectType" style="margin-left: 40px">
            <span slot="label" style="margin-right: 15px">
              <el-tooltip effect="dark" content="1111111" placement="top-start">
                <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
              </el-tooltip>
              <span style="color: #f56c6c">*</span>
              接收项目
            </span>

            <el-checkbox-group
              v-model="data.receiveProjectType"
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
          v-if="data.receiveProjectType && data.receiveProjectType[0] == 1"
          v-model="data.chargeUserName"
        >
        </el-input>

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
:deep(.inviteDialog .el-form-item__content) {
  margin-left: 0 !important;
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
