<script setup lang="ts">
import useNotificationStore from "@/store/modules/notification";
import api from "@/api/modules/notification";
defineOptions({
  name: "PersonalNotificationNews",
});
const emit = defineEmits(["delSelectId"]);
const notificationStore = useNotificationStore();
const data = ref<any>({});
// 显隐
const showEdit = (row: any) => {
  data.value = row;
  if (row.isReadAlready !== 2) {
    // read()
  }
};
// 已读
const read = async () => {
  await api.updateTenantMessage({ id: data.value.id }); // 修改状态
  await notificationStore.getUnreadMessage(); // 重新获取消息列表
  close();
};
// 关闭
const close = () => {
  emit("delSelectId");
};
defineExpose({
  showEdit,
});
</script>

<template>
  <div class="news p-4">
    <div class="type">
      <span></span> {{ notificationStore.auditTypeList[data.auditType - 1] || "" }}

    </div>
    <div class="news-content">
      <div class="content">
        {{ data.messageContent }}
      </div>
      <div class="time">
        {{ data.createTime }}
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
  }

}
</style>
