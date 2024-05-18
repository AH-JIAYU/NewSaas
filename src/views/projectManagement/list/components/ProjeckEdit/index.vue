<script setup lang="ts">
defineOptions({
  name: "ProjeckEdit",
});
import { provide, reactive, ref } from "vue";
import LeftTabs from "../ProjeckLeftTabs/index.vue";

const emit = defineEmits(["fetch-data"]);
const dialogTableVisible = ref<boolean>(false);
const title = ref<string>("");
const validateTopTabs = ref<any>([]);
function pushData(data: any) {
  validateTopTabs.value.push(data);
}
// 提供一个方法，孙组件可以使用这个方法来触发验证
provide("validateTopTabs", pushData);

let leftTabsData = reactive<any>([]); // 明确指定类型为 LeftTab[]

async function showEdit(row: any) {
  if (!row) {
    title.value = "添加";
    leftTabsData = reactive([
      {
        name: "项目名称",
        // currency: surveyconfig.currency,
        platform: {},
        screen: {},
        security: {},
      },
    ]);
  } else {
    title.value = "编辑";
    initializeLeftTabsData(row);
  }
  dialogTableVisible.value = true;
}

function initializeLeftTabsData(data: any) {
  // 清空现有数据
  leftTabsData.length = 0;
  // 添加主数据作为第一个 Tab
  leftTabsData.push({
    ...data,
  });

  // 如果存在 children，为每个 child 创建一个 Tab
  if (data.children && data.children.length) {
    data.children.forEach((child: any) => {
      leftTabsData.push({
        ...child,
      });
    });
  }
}
// 提交数据
function onSubmit() {}
// 弹框关闭事件
function closeHandler() {
  leftTabsData = reactive<any>([]);
  emit("fetch-data");
  dialogTableVisible.value = false;
  validateTopTabs.value = [];
}

async function save() {
  const arr: any = [];
  validateTopTabs.value.forEach((element: any) => {
    arr.push(element.validate());
  });
  try {
    // 实现全部校验  validateTopTabs为数组，每个元素为子组件的ref
    const ispass = (await Promise.all(arr)).every((item: any) => item);
    if (ispass) {
      if (title.value === "添加") {
        // const { message }: any = await addSurvey(leftTabsData)
        // $baseMessage(message, 'success', 'hey')
      } else {
        // 更新接口
        // const { message }: any = await doEdit(leftTabsData)
        // $baseMessage(message, 'success', 'hey')
      }
      emit("fetch-data");
      close();
    }
  } catch (error) {
    // $baseMessage('请完善信息', 'error', 'hey')
    console.error("Form validation failed:", error);
  }
}

// 暴露方法
defineExpose({
  showEdit,
});
</script>

<template>
  <div class="hide-drawer-header">
    <el-drawer
      class="hide-drawer-header"
      v-model="dialogTableVisible"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      size="70%"
      title=""
      @close="closeHandler"
    >
      <LeftTabs
        :left-tabs-data="leftTabsData"
        :validate-top-tabs="validateTopTabs"
      />
      <template #footer>
        <el-button @click="closeHandler"> 取消 </el-button>
        <el-button type="warning" @click=""> 暂存 </el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </template>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
:deep {
  .el-drawer,
  .el-drawer__body,
  .el-tabs.el-tabs--left{
    overflow: visible !important;
  }
}
</style>
