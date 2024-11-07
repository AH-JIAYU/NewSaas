<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { defineProps, provide, ref } from "vue";
import TopTabs from "../ProjeckTopTabs/index.vue";
import SyncSettings from "../SyncSettings/index.vue";
import useProjectManagementListStore from "@/store/modules/projectManagement_list"; // 项目

const projectManagementListStore = useProjectManagementListStore(); //项目
const props: any = defineProps({
  leftTabsData: Array,
  validateTopTabs: Array,
  validateAll: Array,
  title: String,
});
const emits: any = defineEmits(["validate"]);
const setAScheduledReleaseTime = inject<any>("currentProjectTimeline"); //注入Ref 设置定时发布时间
const settingsRef = ref();
const localLeftTab = ref<any>(props.leftTabsData);
const validateTopTabs = ref<any>(props.validateTopTabs);
const topTabsRef = ref<any>(); // top Ref

const tabIndex = ref(0);
const activeLeftTab = ref(0);
// 同步配置项
function setHandler() {
  settingsRef.value.showEdit();
}
// 同步主项目
function syncProject() {
  // 过滤掉不需要同步的数据
  const {
    projectId,
    parentId,
    name,
    projectIdentification,
    clientId,
    countryIdList,
    uidUrl,
    ...syncdata
  } = cloneDeep(localLeftTab.value[0]);
  // projectId存在  保留projectId 和parentId
  if (localLeftTab.value[activeLeftTab.value].projectId) {
    syncdata.projectId = localLeftTab.value[activeLeftTab.value].projectId;
    syncdata.parentId = localLeftTab.value[activeLeftTab.value].parentId;
  }
  // 同步 上传文件
  topTabsRef.value[activeLeftTab.value].getUpLoad(syncdata.descriptionUrl);
  localLeftTab.value.splice(activeLeftTab.value, 1, syncdata);
}

// 新增
function addLeftTab() {
  activeLeftTab.value = ++tabIndex.value;
  const { projectId, ...initialTopTabsData } = cloneDeep(
    projectManagementListStore.initialTopTabsData
  );
  localLeftTab.value.push(initialTopTabsData);
}
// 删除
function tabremove(tabIndexs: any) {
  localLeftTab.value.splice(tabIndexs, 1);
  validateTopTabs.value.splice(tabIndexs, 1);
  if (activeLeftTab.value >= localLeftTab.value.length) {
    activeLeftTab.value = Math.max(0, localLeftTab.value.length - 1);
    tabIndex.value = Math.max(0, localLeftTab.value.length - 1);
  }
}

/**
 * 监听activeLeftTab.value左侧焦点的tabs
 *  props.validateAll 是点击确认后所有组件的校验结果
 * validateIndex 是props.validateAll中值为rejected(校验未通过)的值的索引
 * 当activeLeftTab改变，并且改变前的值 在validateIndex中存在，
 * 说明他刚改完表单 重新进行校验，取消符合校验规则的lefTabs的红色阴影
 */
watch(
  () => activeLeftTab.value,
  (newVal, oldVal) => {
    const validateIndex = props.validateAll.reduce(
      (acc: any, value: any, index: any) => {
        if (value === "rejected") {
          acc.push(index);
        }
        return acc;
      },
      []
    );
    if (validateIndex.includes(oldVal)) {
      emits("validate");
    }
      setAScheduledReleaseTime(localLeftTab.value[activeLeftTab.value].releaseTime)
  }
);
onMounted(() => {
  // 暂缓或编辑时 回显图片
  for (let i = 0; i < topTabsRef.value.length; i++) {
    topTabsRef.value[i].getUpLoad(localLeftTab.value[i].descriptionUrl);
  }
});
// 为每个 tab 创建并提供一个唯一的 ref
localLeftTab.value.forEach((tab: any, index: any) => {
  const formRef = ref(null);
  provide(`formRef${index}`, formRef);
});

// , staging, showEdit
defineExpose({ activeLeftTab });
</script>

<template>
  <div>
    <el-button :class="props.title === '新增' ? 'button' : 'button'" :disabled="localLeftTab.length > 29 ||
      (props.title === '编辑' && localLeftTab[0].parentId !== '0')
      " @click="addLeftTab()">
      新增
    </el-button>
    <el-tabs v-model="activeLeftTab" tab-position="left" @tab-remove="tabremove"
      :class="props.title === '新增' ? '' : 'editHideCloseButton'" v-if="localLeftTab.length">
      <el-tab-pane v-for="(leftTab, index) in localLeftTab" :key="index" style="position: relative"
        :closable="localLeftTab.length !== 1" :name="index">
        <template #label>
          <div :class="props.validateAll[index] &&
        props.validateAll[index] === 'rejected'
        ? 'validateRejected'
        : ''
      ">
            {{ leftTab.name || "项目名称" }}
          </div>
        </template>
        <div style="
            float: right;
            position: sticky;
            top: 19px;
            width: 70%;
            z-index: 1000;
            display: flex;
            justify-content: start;
            align-items: start;
          ">
          <!-- <el-button
            v-if="activeLeftTab > 0"
            size="small"
            type="primary"
            round
            plain
            @click="syncProject"
          >
            同步数据
          </el-button> -->
          <!-- <HTooltip
              style="z-index: 99999; color: #48a2ff; margin-left: 5px"
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
        <TopTabs ref="topTabsRef" :left-tab="leftTab" :tab-index="index" @syncProject="syncProject" />
      </el-tab-pane>
      <SyncSettings ref="settingsRef" />
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
// 编辑时隐藏新增按钮
.hideButton {
  visibility: hidden;
}

// 编辑时隐藏 tab的删除按钮x
:deep {
  .editHideCloseButton .is-icon-close {
    display: none !important;
  }
}
</style>
