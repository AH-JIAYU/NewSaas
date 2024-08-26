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
  ReadAlready: 1, //1未读 2已读
  // type: 1,// 组件显示 1消息 2待办
});

// 消息
function showEditNews(row: any) {
  data.value.selectId = row.id;
  // data.value.type = 1;
  nextTick(() => {
    newsRef.value?.showEdit(row);
  })

}

// 待办
function showEditCooperation(row: any) {
  data.value.selectId = row.id;
  // data.value.type = 2;
  nextTick(() => {
    cooperationRef.value.showEdit(row);
  })

}
// 已读后清除右侧详情
async function delSelectId() {
  // 清除右侧组件
  data.value.selectId = "";
  // data.value.type = 0;
  // 默认显示未读
  data.value.ReadAlready = 1;
  await notificationStore.getUnreadMessage(); // 重新获取消息列表
  await notificationStore.getUnreadTodo(); // 重新获取待办列表
}
// 切换已读未读
const readButNotRead=async(val:any)=>{
  data.value.ReadAlready=val
  await notificationStore.getUnreadMessage(); // 重新获取消息列表
  await notificationStore.getUnreadTodo(); // 重新获取待办列表
}
const filterMessageList = computed(() => {
  return notificationStore.messageList.filter((item: any) => item.isReadAlready === data.value.ReadAlready)
})
const filterTodoList = computed(() => {
  return notificationStore.todoList.filter((item: any) => item.isReadAlready === data.value.ReadAlready)
})

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
    <PageMain>
      <div class="flex-c">
        <div class="left">
          <el-tabs v-model="data.tabs" @tab-change="delSelectId">
            <el-tab-pane label="消息" name="news">
              <div class="buttons">
                <button :class="data.ReadAlready === 1 ? 'unread' : ''" @click="readButNotRead(1)">未读{{
            notificationStore.message < 100 ? `(${notificationStore.message})` : '99+' }}</button>
                    <button :class="data.ReadAlready === 2 ? 'read' : ''" read @click="readButNotRead(2)">已读</button>
              </div>
              <OverlayScrollbarsComponent :options="{
            scrollbars: { autoHide: 'leave', autoHideDelay: 300 },
          }" defer class="list">
                <template v-if="notificationStore.messageList.length">
                  <div :class="{
            item: 'item',
            select: item.id === data.selectId,
          }" v-for="item in filterMessageList" @click="showEditNews(item)">
                    <div class="info">
                      <div class=" time">
                        <!-- 未读标识 -->
                        <span v-if="item.isReadAlready === 1" class="new"></span>
                        <!-- 合作邀约 -->
                        <span class="auditType">
                          {{ notificationStore.auditTypeList[item.auditType - 1] || "" }}
                        </span>
                        <span class="time">
                          {{ item.createTime }}
                        </span>
                      </div>
                      <div class="data">
                        {{ item.messageContent }}
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <el-empty description="暂无数据" />
                </template>
              </OverlayScrollbarsComponent>
            </el-tab-pane>
            <el-tab-pane label="代办" name="cooperation">
              <div class="buttons">
                <button :class="data.ReadAlready === 1 ? 'unread' : ''" @click="readButNotRead(1)">未读{{
            notificationStore.todo < 100 ? `(${notificationStore.todo})` : '99+' }}</button>
                    <button :class="data.ReadAlready === 2 ? 'read' : ''" read @click="readButNotRead(2)">已读</button>
              </div>

              <OverlayScrollbarsComponent :options="{
            scrollbars: { autoHide: 'leave', autoHideDelay: 300 },
          }" defer class="list">
                <template v-if="notificationStore.todoList.length">
                  <div :class="{
            item: 'item',
            select: item.id === data.selectId,
          }" v-for="item in filterTodoList" @click="showEditCooperation(item)">
                    <div class="info">
                      <div class=" time">
                        <!-- 未读标识 -->
                        <span v-if="item.isReadAlready === 1" class="new"></span>
                        <!-- 合作邀约 -->
                        <span class="auditType">
                          {{ notificationStore.auditTypeList[item.auditType - 1] || "" }}
                        </span>
                        <span class="time">
                          {{ item.createTime }}
                        </span>
                      </div>
                      <div class="data">
                        您好，我是{{
            item.invitationName || "-"
          }}诚挚邀请您与我们一同协作共赢！若有疑问请联系{{ item.phoneOrEmail }}。
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <el-empty description="暂无数据" />
                </template>
              </OverlayScrollbarsComponent>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-show="data.selectId" class="right" v-if="data.selectId">
          <news v-if="data.tabs === 'news'" ref="newsRef" @delSelectId="delSelectId"></news>
          <cooperation v-if="data.tabs === 'cooperation'" ref="cooperationRef"></cooperation>
        </div>
      </div>
    </PageMain>

  </div>
</template>

<style scoped lang="scss">
 

.select {
  background: #F3F9FF !important;
}

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
    flex-shrink: 0;
    display: flex;


    :deep(>.main-container) {
      display: flex;
      flex: 1;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
    }

    .flex-c {
      display: flex;
      justify-content: space-around;
      align-items: start;
      height: 100%;

      .left,
      .right {
        flex: 1;
        background-color: var(--g-container-bg);
        height: 100%;
        overflow: auto;
        border-radius: .5rem;

        :deep(.el-tabs) {
          height: 100%;
        }

        :deep(.el-tabs__header) {
          height: 2.5rem;
        }

        :deep(.el-tabs__content) {
          height: calc(100% - 3.5rem);
          overflow: auto;
        }
      }

      .right {
        margin-left: 1rem;

        .mail {
          height: 100%;
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

.buttons {
  padding: 0 1rem;
  margin-bottom: 1rem;

  button {
    border: none;
    padding: .125rem .375rem;
    margin-right: .125rem;
    color: #fff;
    background-color: #d9d9d9;
    border-radius: .25rem;
  }

  .unread {
    background: #ff8686;
  }

  .read {
    background: #00c738;
  }

}

.list {
  // --at-apply: border-block-width-1 border-block-solid border-block-stone-2 dark:border-block-stone-7;
  padding: 0 1rem;

  .item {

    background: #fff;
    border-radius: .5rem;
    border: 1px solid rgba(170, 170, 170, 0.5);
    padding: 1rem;
    margin-bottom: 1rem;

    .info {
      .auditType {
        background: #409EFF;
        border-radius: .25rem;
        color: #fff;
        padding: .125rem .5rem;
        margin: 0 .3125rem;
      }

      .time {
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: .75rem;
        color: #333333;
        margin-bottom: 1rem;
      }

      .date {
        --at-apply: text-sm line-clamp-2;
        font-family: PingFang SC, PingFang SC;
        font-weight: 600;
        font-size: .875rem;
        color: #0F0F0F;
      }
    }
  }


  // .item {
  // --at-apply: flex m-1 items-start gap-3 px-3 py-4 cursor-pointer border-b-width-1 last:border-b-width-0 border-b-solid border-b-stone-2 dark:border-b-stone-7 hover:bg-stone-1 dark:hover:bg-dark/50;

  // i {
  //   --at-apply: w-6 h-6 text-xs rounded-full text-white bg-blue;

  //   &.service {
  //     --at-apply: bg-green;
  //   }

  //   &.file-edit {
  //     --at-apply: bg-orange;
  //   }

  //   &.bug {
  //     --at-apply: bg-pink;
  //   }
  // }

  // .info {
  //   .title {
  //     --at-apply: text-sm line-clamp-2;
  //   }

  //   .date {
  //     --at-apply: mt-1 text-xs text-stone-5;
  //   }
  // }
  // }

  .new {
    display: inline-block;
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background-color: red;
  }


}
</style>
