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
    <div class="content">
      <!-- <p>发件人 ：系统</p>
      <p>主&emsp;题 ：合作邀约</p>
      <p>恭喜您！与XXXXXXX公司合作成功。</p>
      <p>2024-10-10 11:11:11</p> -->
      <!-- <div class="from flex-s">
        <span class="title">发件人:</span>
        <p class="bg">系统</p>
      </div> -->
      <div class="theme flex-s">
        <span class="title">主&emsp;题:</span>
        <p class="bg">
          {{ notificationStore.auditTypeList[data.auditType - 1] || "" }}
        </p>
      </div>
      <div class="news-content bg">
        {{ data.messageContent }} <br>
        说明：{{ data.remark }}
      </div>
    </div>

    <div class="footer">
      <el-button plain type="primary" size="default" @click="close">关闭</el-button>
      <el-button v-if="data.isReadAlready === 1" plain type="primary" size="default" @click="read">已读</el-button>
      <!-- <el-button plain type="danger" @click="">删除</el-button> -->
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

  .content {
    width: 100%;
    height: calc(100% - 2.5rem);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

    .news-content {
      overflow-y: auto;
      flex: 1;
    }

    >div {
      width: 100%;
      margin: 0.3125rem 0;
    }

    .flex-s {
      display: flex;
      justify-content: start;
      align-items: center;

      .title {
        width: 4rem;
      }

      .bg {
        flex: 1;
        padding: 0.25rem;
      }
    }

    .bg {
      // background-color: var(--g-bg);
      background-color: #f5f6f7;
    }
  }

  .footer {
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: right;
  }
}
</style>
