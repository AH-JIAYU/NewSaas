<route lang="yaml">
name: personalNotification
meta:
  title: 通知中心
</route>

<script setup lang="ts">
import useNotificationStore from "@/store/modules/notification"; //消息中心
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import news from "./notification-news.vue";
import cooperation from "./notification-cooperation.vue";

defineOptions({
  name: "PersonalNotification",
});

const notificationStore = useNotificationStore(); //消息中心
const cooperationRef = ref<any>(); //合作邀约 Ref
const newsRef = ref<any>(); //消息
const route: any = useRoute();
const data = ref<any>({
  tabs: "", //tabs
  selectId: "", // 选中id
});

// 消息
function showEditNews(row: any) {
  data.value.selectId = row.id;
  newsRef.value.showEdit(row);
}

// 待办
function showEditCooperation(row: any) {
  cooperationRef.value.showEdit(row);
}
// 已读后清除右侧详情
function delSelectId() {
  data.value.selectId = "";
}
onMounted(() => {
  data.value.tabs = route.query.type == 2 ? "cooperation" : "news";

  if (route.query.id) {
    if (Number(route.query.type) === 1) {
      const findData = notificationStore.messageList.find(
        (item: any) => item.id === route.query.id
      );
      showEditNews(findData);
    } else if (Number(route.query.type) === 2) {
      const findData = notificationStore.todoList.find(
        (item: any) => item.id === route.query.id
      );
      showEditCooperation(findData);
    }
  }
});
</script>

<template>
  <div class="absolute-container">
    <PageHeader title="通知中心" align="center" style="margin-bottom: 0px" />
    <PageMain>
      <div class="flex-c">
        <div class="left">
          <el-tabs type="border-card" v-model="data.tabs">
            <el-tab-pane label="消息" name="news">
              <OverlayScrollbarsComponent
                :options="{
                  scrollbars: { autoHide: 'leave', autoHideDelay: 300 },
                }"
                defer
                class="list"
              >
                <template v-if="notificationStore.messageList.length">
                  <div
                    :class="{
                      item: 'item',
                      new: item.isReadAlready === 1,
                      select: item.id === data.selectId,
                    }"
                    v-for="item in notificationStore.messageList"
                    @click="showEditNews(item)"
                  >
                    <SvgIcon name="i-ri:mail-fill" />
                    <div class="info">
                      <div class="title">
                        {{
                          notificationStore.auditTypeList[item.auditType - 1] ||
                          ""
                        }}
                        &emsp;
                        {{ item.invitationName }}
                      </div>
                      <div class="date">
                        {{ item.createTime }}
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="flex flex-col items-center py-6 text-stone-5">
                    <SvgIcon name="i-tabler:mood-smile" :size="40" />
                    <p m-2 text-base>没有消息</p>
                  </div>
                </template>
              </OverlayScrollbarsComponent>
            </el-tab-pane>
            <el-tab-pane label="代办" name="cooperation">
              <OverlayScrollbarsComponent
                :options="{
                  scrollbars: { autoHide: 'leave', autoHideDelay: 300 },
                }"
                defer
                class="list"
              >
                <template v-if="notificationStore.todoList.length">
                  <div
                    :class="item.isReadAlready === 1 ? 'item new' : 'item'"
                    v-for="item in notificationStore.todoList"
                    @click="showEditCooperation(item)"
                  >
                    <SvgIcon name="i-ri:file-edit-fill" class="service" />
                    <div class="info">
                      <div class="title">
                        {{
                          notificationStore.auditTypeList[item.auditType - 1] ||
                          ""
                        }}
                        &emsp;
                        {{ item.messageContent }}
                      </div>
                      <div class="date">
                        {{ item.createTime }}
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="flex flex-col items-center py-6 text-stone-5">
                    <SvgIcon name="i-tabler:mood-smile" :size="40" />
                    <p m-2 text-base>没有待办</p>
                  </div>
                </template>
              </OverlayScrollbarsComponent>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-show="data.selectId" class="right">
          <news ref="newsRef" @delSelectId="delSelectId"></news>
        </div>
      </div>
    </PageMain>
    <cooperation ref="cooperationRef"></cooperation>
  </div>
</template>

<style scoped lang="scss">
.absolute-container {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;

  .page-header {
    margin-bottom: 0;
    height: 4rem;
  }

  .page-main {
    margin: 0;
    background-color: transparent;
    height: calc(100% - 4rem);
    flex-shrink:0;
    display: flex;


    :deep(>.main-container) {
      display: flex;
      flex: 1;
      flex-direction: column;
      height:100%;
      box-sizing: border-box;
    }
    .flex-c {
        display: flex;
        justify-content: space-around;
        align-items: start;
        height:100%;

        .left,
        .right {
          flex: 1;
          background-color: var(--g-container-bg);
          height: 100% ;
          overflow: auto;

          :deep( .el-tabs){
            height: 100% ;
          }
          :deep(.el-tabs__header){
            height: 2.5rem;
            overflow: auto;
          }
          :deep(.el-tabs__content){
            height: calc(100% - 2.5rem);
            overflow: auto;
          }
        }

        .right {
          margin-left: 1rem;
          .mail{
            height: 100% ;
          }
        }
      }

  }

}

:deep {
  .el-dialog__body {
    min-height: 25rem !important;
  }
}
.list {
  --at-apply: border-block-width-1 border-block-solid border-block-stone-2 dark:border-block-stone-7;

  .item {
    --at-apply: flex m-1 items-start gap-3 px-3 py-4 cursor-pointer border-b-width-1 last:border-b-width-0 border-b-solid border-b-stone-2 dark:border-b-stone-7 hover:bg-stone-1 dark:hover:bg-dark/50;

    i {
      --at-apply: w-6 h-6 text-xs rounded-full text-white bg-blue;

      &.service {
        --at-apply: bg-green;
      }

      &.file-edit {
        --at-apply: bg-orange;
      }

      &.bug {
        --at-apply: bg-pink;
      }
    }

    .info {
      .title {
        --at-apply: text-sm line-clamp-2;
      }

      .date {
        --at-apply: mt-1 text-xs text-stone-5;
      }
    }
  }
  .new{
    position: relative;
  }
  .new::after{
    content:'';
    position: absolute;
    width: 0.625rem;
    height: 0.625rem;
    border-radius:50%;
    background-color: red;
    top:0;
    right:0;
  }
}
.select{
  background-color: #f5f5f4;
}
</style>
