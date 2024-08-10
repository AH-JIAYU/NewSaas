<script setup lang="ts">
defineOptions({
  name: "PersonalNotificationMail",
});
</script>

<template>
  <div class="mail p-4">
    <div class="content">
      <!-- <p>发件人 ：系统</p>
      <p>主&emsp;题 ：合作邀约</p>
      <p>恭喜您！与XXXXXXX公司合作成功。</p>
      <p>2024-10-10 11:11:11</p> -->
      <div class="from flex-s">
        <span class="title">发件人:</span>
        <p class="bg">系统</p>
      </div>
      <div class="theme flex-s">
        <span class="title">主&emsp;题:</span>
        <p class="bg">合作邀约</p>
      </div>
      <div class="mail-content bg">
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
        <p>恭喜您！与XXXXXXX公司合作成功。</p>
        <p>2024-10-10 11:11:11</p>
      </div>
    </div>

    <div class="footer">
      <el-button plain type="primary" size="default" @click="">已读</el-button>
      <el-button plain type="danger" @click="">删除</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mail {
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
    .mail-content {
      overflow-y: auto;
      flex: 1;
    }
    > div {
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
        padding: .25rem
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
