<script setup lang="ts">
import api from "@/api/modules/notification";
import useNotificationStore from "@/store/modules/notification";

defineOptions({
  name: "PersonalNotificationCooperation",
});

const notificationStore = useNotificationStore();
const centerDialogVisible = ref(false);
const data = ref<any>({});

const showEdit = (row: any) => {
  data.value = row;
  centerDialogVisible.value = true;
};
// 关闭
const close = async (e: any) => {
  const params = {
    id: data.value.id,
    type: 1,
  };
  await api.updateTenantAudit(params); //修改该条数据待办状态
  await notificationStore.getUnreadTodo(); // 重新获取待办列表
  centerDialogVisible.value = false;
};
// 拒绝
const refuse = async () => {
  const params = {
    id: data.value.id,
    type: 2,
  };
  await api.updateTenantAudit(params); //修改该条数据待办状态
  await notificationStore.getUnreadTodo(); // 重新获取待办列表
  centerDialogVisible.value = false;
};
// 同意
const agree = async () => {
  const params = {
    id: data.value.id,
    type: 3,
  };
  await api.updateTenantAudit(params); //修改该条数据待办状态
  await notificationStore.getUnreadTodo(); // 重新获取待办列表
  centerDialogVisible.value = false;
};

defineExpose({
  showEdit,
});
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    title="合作邀约"
    width="40%"
    center
    draggable
    :before-close="close"
    :close-on-click-modal="false"
  >
    <span>
      尊贵的{{ data.beInvitedName }} <br />
      您好，我是{{
        data.invitationName || "-"
      }}诚挚邀请您与我们一同协作共赢！若有疑问请联系{{ data.phoneOrEmail }}。
    </span>
    <template #footer v-if="data.auditStatus === 1">
      <div class="dialog-footer">
        <el-button @click="refuse">决绝合作</el-button>
        <el-button type="primary" @click="agree"> 同意合作 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
