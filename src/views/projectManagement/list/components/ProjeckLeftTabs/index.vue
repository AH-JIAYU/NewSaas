<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { defineProps, provide, ref } from "vue";
import TopTabs from "../ProjeckTopTabs/index.vue";
import SyncSettings from "../SyncSettings/index.vue";

const props = defineProps({
  leftTabsData: Array,
  validateTopTabs: Array,
});
const client = ref();
const settingsRef = ref();
const localLeftTab = ref<any>(props.leftTabsData);
const validateTopTabs = ref<any>(props.validateTopTabs);

// 为每个 tab 创建并提供一个唯一的 ref
localLeftTab.value.forEach((tab: any, index: any) => {
  const formRef = ref(null);
  provide(`formRef${index}`, formRef);
});

const tabIndex = ref(0);
const activeLeftTab = ref(0);

const initialTopTabsData = {
  name: "新建项目",
  platform: {},
  screen: {},
  security: {},
};
// 同步配置项
function setHandler() {
  settingsRef.value.showEdit();
}
// 同步主项目
function syncProject() {
  const syncdata = cloneDeep(localLeftTab.value[0]);
  localLeftTab.value[activeLeftTab.value] = syncdata;
}

function addLeftTab() {
  const syncdata = cloneDeep(localLeftTab.value[0]);
  activeLeftTab.value = ++tabIndex.value;
  localLeftTab.value.push({
    ...initialTopTabsData,
    client: client.value,
    await: syncdata.await,
    multi: syncdata.multi,
  });
}

function tabremove(tabIndexs: any) {
  localLeftTab.value.splice(tabIndexs, 1);
  validateTopTabs.value.splice(tabIndexs, 1);
  if (activeLeftTab.value >= localLeftTab.value.length) {
    activeLeftTab.value = Math.max(0, localLeftTab.value.length - 1);
    tabIndex.value = Math.max(0, localLeftTab.value.length - 1);
  }
}
function setclient(data: number) {
  localLeftTab.value.forEach((item: any) => {
    item.client = data;
  });
  client.value = data;
}
</script>

<template>
  <el-button class="button" @click="addLeftTab()"> 新增 </el-button>
  <el-tabs v-model="activeLeftTab" tab-position="left" @tab-remove="tabremove">
    <el-tab-pane
      style="position: relative"
      v-for="(leftTab, index) in localLeftTab"
      :key="index"
      :closable="localLeftTab.length !== 1"
      :label="leftTab.name"
      :name="index"
    >
      <div
        style="
          position: absolute;
          left: 300px;
          top: 9px;
          z-index: 999;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <el-button
          v-if="activeLeftTab > 0"
          size="small"
          type="primary"
          round
          plain
          @click="syncProject"
        >
          同步数据
        </el-button>
        <!-- <HTooltip
          style="z-index: 9; color: #48a2ff; margin-left: 5px"
          text="注意噢！"
          v-if="activeLeftTab > 0"
        >
          <div class="i-bi:exclamation-circle h-1em w-1em" />
        </HTooltip> -->
      </div>

      <!-- <div
        style="margin-left: 10px"
        class="i-solar:settings-line-duotone w-2em h-2em"
        @click="setHandler"
      /> -->
      <!-- 在每个左侧 Tab 中使用 TopTabs 组件 -->
      <TopTabs :left-tab="leftTab" :tab-index="index" @set-client="setclient" />
    </el-tab-pane>
    <SyncSettings ref="settingsRef" />
  </el-tabs>
</template>

<style lang="scss" scoped>
// :deep {
//   .el-drawer,
//   .el-drawer__body,
//   .el-tabs.el-tabs--left{
//     overflow: visible !important;
//   }
// }
</style>
