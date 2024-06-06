<script setup lang="ts">
import { provide, reactive, ref } from "vue";
import LeftTabs from "../ProjeckLeftTabs/index.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/projectManagement";

defineOptions({
  name: "ProjeckEdit",
});

const emit = defineEmits(["fetch-data"]);
const dialogTableVisible = ref<boolean>(false);
const title = ref<string>("");
const validateTopTabs = ref<any>([]); // 校验的promise数组
// 传递给孙组件,用于获取所有孙组件的Ref
function pushData(data: any) {
  validateTopTabs.value.push(data);
}
// 提供一个方法，孙组件可以使用这个方法来触发验证
provide("validateTopTabs", pushData);
const validateAll = ref<any>([]); // 校验结果，用于在leftTabs中的tabs中给予提示
let leftTabsData = reactive<any>([]); // 明确指定类型为 LeftTab[]
const LeftTabsRef = ref<any>(); // Ref

async function showEdit(row: any) {
  if (!row) {
    title.value = "添加";
    leftTabsData = reactive([
      {
        customerAccord: "",
        addProjectQuotaInfoList: [], //配置信息
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
// 校验所有组件
async function validate() {
  const arr: any = [];
  validateTopTabs.value.forEach((element: any) => {
    arr.push(element.validate());
  });
  const validateResult = await Promise.allSettled(arr);
  validateAll.value = validateResult.map((item) => item.status);
}

// 提交数据
async function onSubmit() {
  await validate();
  // 校验通过
  if (validateAll.value.every((item: any) => item === "fulfilled")) {
    // 处理数据
    const masterData = leftTabsData[0];
    masterData.addProjectInfoList = leftTabsData.slice(1);
    console.log("masterData", masterData);
    const { status } = await api.create(masterData);
    status === 1 &&
      ElMessage.success({
        message: "新增成功",
        center: true,
      });
  } else {
    // 跳转到第一个未通过校验的组件
    LeftTabsRef.value.activeLeftTab = validateAll.value.indexOf("rejected");
    ElMessage.warning({
      message: "请完善表单",
      center: true,
    });
  }
}
// 弹框关闭事件
function closeHandler() {
  leftTabsData = reactive<any>([]);
  emit("fetch-data");
  dialogTableVisible.value = false;
  validateTopTabs.value = [];
}

// 暴露方法
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible"
      class="hide-drawer-header"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      size="70%"
      title=""
      @close="closeHandler"
    >
      <LeftTabs
        @validate="validate"
        ref="LeftTabsRef"
        :left-tabs-data="leftTabsData"
        :validate-top-tabs="validateTopTabs"
        :validate-all="validateAll"
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
  .el-tabs.el-tabs--left {
    overflow: visible !important;
  }
}
</style>
