<script setup lang="ts">
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import useNotificationStore from "@/store/modules/notification";

defineOptions({
  name: "NotificationPanel",
});
const router = useRouter();
const notificationStore = useNotificationStore();

const activeName = ref("message");
// 消息
const news = (row: any) => {
  router.push({
    path: "/personal/notification",
    query: {
      type: 1,
      id: row.id,
    },
  });
};
// 待办
const cooperation = (row: any) => {
  router.push({
    path: "/personal/notification",
    query: {
      type: 2,
      id: row.id,
    },
  });
};
</script>

<template>
  <div class="w-xs">
    <HTabList
      v-model="activeName"
      :options="[
        {
          label: `消息 ${
            notificationStore.message > 0
              ? `(${notificationStore.message})`
              : ''
          }`,
          value: 'message',
        },
        {
          label: `待办 ${
            notificationStore.todo > 0 ? `(${notificationStore.todo})` : ''
          }`,
          value: 'todo',
        },
      ]"
      class="m-3 flex!"
      @click.stop
    />
    <template v-if="activeName === 'message'">
      <OverlayScrollbarsComponent
        :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }"
        defer
        class="list max-h-300px"
      >
        <template v-if="notificationStore.messageList.length">
          <div
            :class="item.isReadAlready === 1 ? 'item new' : 'item'"
            v-for="item in notificationStore.messageList"
            @click="news(item)"
          >
            <SvgIcon name="i-ri:mail-fill" />
            <div class="info">
              <div class="title">
                {{ notificationStore.auditTypeList[item.auditType - 1] || "" }}
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
          <el-empty description="暂无数据" />
          <!-- <div class="flex flex-col items-center py-6 text-stone-5">
            <SvgIcon name="i-tabler:mood-smile" :size="40" />
            <p m-2 text-base>没有新消息</p>
          </div> -->
        </template>
      </OverlayScrollbarsComponent>
      <RouterLink
        v-slot="{ navigate }"
        to="/personal/notification?type=1"
        custom
      >
        <div
          class="cursor-pointer py-4 text-center text-sm text-stone-5"
          @click="navigate"
        >
          进入消息列表
        </div>
      </RouterLink>
    </template>
    <template v-if="activeName === 'todo'">
      <OverlayScrollbarsComponent
        :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }"
        defer
        class="list max-h-300px"
      >
        <template v-if="notificationStore.todoList.length">
          <div
            :class="item.isReadAlready === 1 ? 'item new' : 'item'"
            v-for="item in notificationStore.todoList"
            @click="cooperation(item)"
          >
            <SvgIcon name="i-ri:file-edit-fill" class="service" />
            <div class="info">
              <div class="title">
                {{ notificationStore.auditTypeList[item.auditType - 1] || "" }}
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
            <el-empty description="暂无数据" />
            <!-- <SvgIcon name="i-tabler:mood-smile" :size="40" />
            <p m-2 text-base>没有新待办</p> -->
          </div>
        </template>
      </OverlayScrollbarsComponent>
      <RouterLink
        v-slot="{ navigate }"
        to="/personal/notification?type=2"
        custom
      >
        <div
          class="cursor-pointer py-4 text-center text-sm text-stone-5"
          @click="navigate"
        >
          进入待办列表
        </div>
      </RouterLink>
    </template>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
