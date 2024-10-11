<script setup lang="ts">
import api from "@/api/modules/notification";
import useNotificationStore from "@/store/modules/notification";
import apiUser from "@/api/modules/configuration_manager";
defineOptions({
  name: "PersonalNotificationCooperation",
});
const emit = defineEmits(["delSelectId"]);
const notificationStore = useNotificationStore();
const data = ref<any>({});
const dialogTableVisible = ref<any>(false); // 同意合作-负责人弹框
const tenantStaffList = ref<any>([]); // 负责人

const FormRef = ref<any>();
const FormRules = {
  priceRatio: [{ required: true, message: "请输入价格比例", trigger: "blur" }],
  beInvitationChargeUserId: [
    { required: true, message: "请选择负责人", trigger: "change" },
  ],
};

const showEdit = async (row: any) => {
  await getTenantStaffList();
  data.value = row;
  read();
};
// 获取负责人/用户
const getTenantStaffList = async () => {
  const res = await apiUser.getTenantStaffList();
  tenantStaffList.value = res.data;
};
const changeBeInvitationChargeUserId = (val: any) => {
  if (val) {
    const findData = tenantStaffList.value.find(
      (item: any) => item.id === data.value.beInvitationChargeUserId,
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
      };
      emit("delSelectId");
      await api.updateTenantAudit(params); //修改该条数据待办状态
      await notificationStore.getUnreadTodo(); // 重新获取待办列表
    }
  });
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
    <el-dialog v-model="dialogTableVisible" title="添加负责人">
      <ElForm ref="FormRef" :rules="FormRules" :model="data" label-width="7rem">
        <el-form-item label="价格比例" prop="priceRatio">
          <el-input v-model="data.priceRatio" clearable
            ><template #append>%</template></el-input
          >
        </el-form-item>
        <el-form-item label="负责人" prop="beInvitationChargeUserId">
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
        </el-form-item>
      </ElForm>
      <template #footer>
        <ElButton size="large" @click="dialogTableVisible = false">
          取消
        </ElButton>
        <ElButton type="primary" size="large" @click="agree"> 确定 </ElButton>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
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
    font-family:
      PingFang SC,
      PingFang SC;
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
    font-family:
      PingFang SC,
      PingFang SC;
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
