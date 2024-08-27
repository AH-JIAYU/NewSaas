<script setup lang="ts">
import api from "@/api/modules/notification";
import useNotificationStore from "@/store/modules/notification";

defineOptions({
  name: "PersonalNotificationCooperation",
});
const emit = defineEmits(["delSelectId"]);
const notificationStore = useNotificationStore();
const data = ref<any>({});

const showEdit = (row: any) => {
  data.value = row;
  read()
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
  emit('delSelectId')
  await api.updateTenantAudit(params); //修改该条数据待办状态
  await notificationStore.getUnreadTodo(); // 重新获取待办列表
};
// 同意
const agree = async () => {
  const params = {
    id: data.value.id,
    type: 3,
  };
  emit('delSelectId')
  await api.updateTenantAudit(params); //修改该条数据待办状态
  await notificationStore.getUnreadTodo(); // 重新获取待办列表
};

defineExpose({
  showEdit,
});
</script>

<template>
  <div class="news p-4">

    <div class="type">
      <span></span> 合作邀约
    </div>
    <div class="news-content">
      <div class="content">
        尊贵的{{ data.beInvitedName }}
      </div>
      <div class="time">
        您好，我是{{
          data.invitationName || "-"
        }}诚挚邀请您与我们一同协作共赢！若有疑问请联系{{ data.phoneOrEmail }}。
      </div>
      <div class="footer" v-if="data.auditStatus === 1">
        <el-button @click="refuse">拒绝合作</el-button>
        <el-button type="primary" @click="agree"> 同意合作 </el-button>
      </div>
    </div>
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

  >div {
    width: 100%;
    margin-top: 1rem;
  }

  .type {
    font-family: PingFang SC, PingFang SC;
    font-weight: 600;
    font-size: 1.125rem;
    color: #0F0F0F;
    margin-top: 0 !important;
    display: flex;
    justify-content: star;
    align-items: center;

    span {
      width: .1875rem;
      height: 1rem;
      display: inline-block;
      background-color: #46a1ff;
      margin-right: .3125rem;
    }
  }


  .news-content {
    overflow-y: auto;
    flex: 1;
    font-family: PingFang SC, PingFang SC;
    padding: 0 1rem;
    color: #0F0F0F;


    .content {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: .5rem;
    }

    .time {
      font-weight: 400;
      font-size: .875rem;
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
