<route lang="yaml">
name: personalNotification
meta:
  title: 通知中心
</route>

<script setup lang="ts">
import useNotificationStore from "@/store/modules/notification"; //消息中心
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";
import mail from "./notification-mail.vue";

defineOptions({
  name: "PersonalNotification",
});

const notificationStore = useNotificationStore(); //消息中心

function messagePlus() {
  notificationStore.$patch((state) => {
    state.message += 1;
  });
}
function messageMinus() {
  notificationStore.$patch((state) => {
    state.message -= state.message > 0 ? 1 : 0;
  });
}

function todoPlus() {
  notificationStore.$patch((state) => {
    state.todo += 1;
  });
}
function todoMinus() {
  notificationStore.$patch((state) => {
    state.todo -= state.todo > 0 ? 1 : 0;
  });
}
</script>

<template>
  <div class="absolute-container">
    <PageHeader title="通知中心" align="center" style="margin-bottom: 0px" />
    <PageMain>
      <div class="flex-c">
        <div class="left">
          <el-tabs type="border-card">
            <el-tab-pane label="消息">
              <OverlayScrollbarsComponent
                :options="{
                  scrollbars: { autoHide: 'leave', autoHideDelay: 300 },
                }"
                defer
                class="list"
              >
                <div class="item">
                  <SvgIcon name="i-ri:mail-fill" />
                  <div class="info">
                    <div class="title">你收到了 8 份日报</div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:service-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      你收到了 3 位同事的好友申请，请及时处理
                    </div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:file-edit-fill" class="file-edit" />
                  <div class="info">
                    <div class="title">你有 3 份合同待审批</div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:mail-fill" />
                  <div class="info">
                    <div class="title">你收到了 8 份日报</div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:service-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      你收到了 3 位同事的好友申请，请及时处理
                    </div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:service-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      你收到了 3 位同事的好友申请，请及时处理
                    </div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:service-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      你收到了 3 位同事的好友申请，请及时处理
                    </div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:service-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      你收到了 3 位同事的好友申请，请及时处理
                    </div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:service-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      你收到了 3 位同事的好友申请，请及时处理
                    </div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:service-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      你收到了 3 位同事的好友申请，请及时处理
                    </div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:service-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      你收到了 3 位同事的好友申请，请及时处理
                    </div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:service-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      你收到了 3 位同事的好友申请，请及时处理
                    </div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
                <div class="item">
                  <SvgIcon name="i-ri:service-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      你收到了 3 位同事的好友申请，请及时处理
                    </div>
                    <div class="date">2020-10-10 10:00:00</div>
                  </div>
                </div>
              </OverlayScrollbarsComponent>
            </el-tab-pane>
            <el-tab-pane label="代办">代办</el-tab-pane>
          </el-tabs>
        </div>
        <div class="right">
          <mail></mail>

          <!-- <HButton @click="messagePlus">
          <SvgIcon name="i-ep:plus" />
          1
        </HButton>
        <HButton ml-2 @click="messageMinus">
          <SvgIcon name="i-ep:minus" />
          1
        </HButton>
        <br>
        <HButton @click="todoPlus">
          <SvgIcon name="i-ep:plus" />
          1
        </HButton>
        <HButton ml-2 @click="todoMinus">
          <SvgIcon name="i-ep:minus" />
          1
        </HButton> -->
        </div>
      </div>
    </PageMain>
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


.list {
  --at-apply: border-block-width-1 border-block-solid border-block-stone-2 dark:border-block-stone-7;

  .item {
    --at-apply: flex items-start gap-3 px-3 py-4 cursor-pointer border-b-width-1 last:border-b-width-0 border-b-solid border-b-stone-2 dark:border-b-stone-7 hover:bg-stone-1 dark:hover:bg-dark/50;

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
}
</style>
