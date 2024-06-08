<script setup lang="ts">
import { provide, reactive, ref } from "vue";
import LeftTabs from "../ProjeckLeftTabs/index.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { cloneDeep } from "lodash-es";
import { obtainLoading } from "@/utils/apiLoading";
import useProjectManagementListStore from "@/store/modules/projectManagement_list"; // 项目
import useStagedDataStore from "@/store/modules/stagedData"; // 暂存
import api from "@/api/modules/projectManagement";

defineOptions({
  name: "ProjeckEdit",
});
const projectManagementListStore = useProjectManagementListStore(); //项目
const stagedDataStore = useStagedDataStore(); // 暂存
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
// 显隐
async function showEdit(row: any) {
  if (!row) {
    title.value = "添加";
    const initialTopTabsData = cloneDeep(
      projectManagementListStore.initialTopTabsData
    );
    leftTabsData =
      stagedDataStore.projectManagementList || reactive([initialTopTabsData]);
  } else {
    title.value = "编辑";
    // 编辑返回的字段也一样，周二让刘改字段 	项目配额字段updateProjectQuotaInfoList getProjectQuotaInfoList
    const res = await obtainLoading(api.detail({ projectId: row.projectId }));
    console.log("res.data", res.data);
    initializeLeftTabsData(row);
  }
  dialogTableVisible.value = true;
}
// 清空现有数据
function initializeLeftTabsData(data: any) {
  leftTabsData.length = 0;
  // 添加主数据作为第一个 Tab
  const { getProjectInfoList, ...newData } = cloneDeep(data);
  leftTabsData.push(newData);

  // // // 如果存在 children，为每个 child 创建一个 Tab
  if (getProjectInfoList && getProjectInfoList.length) {
    getProjectInfoList.forEach((child: any) => {
      leftTabsData.push({
        ...child,
      });
    });
  }
}

// 暂存
function staging() {
  stagedDataStore.projectManagementList = cloneDeep(leftTabsData);
  leftTabsData = reactive<any>([]);
  dialogTableVisible.value = false;
  validateTopTabs.value = [];
  // LeftTabsRef.value.staging(); // 存储配置信息数据
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
// 判重
// 判断供应商名称是否重复
function hasDuplicateCustomer(projectList: any) {
  const seen = new Set();
  for (const customer of projectList) {
    if (seen.has(customer.name)) {
      return true; // 如果已经存在，则表示有重复
    }
    seen.add(customer.name);
  }
  return false; // 如果没有重复，则返回false
}
// 处理数据
const processingData = () => {
  const newLeftTabsData = cloneDeep(leftTabsData);
  let masterData = newLeftTabsData[0];
  masterData.addProjectInfoList = newLeftTabsData.slice(1);
  //data为配置信息中所需的数据
  if (masterData.data) {
    delete masterData.data;
  }
  // 将单选的答案和id从''转换成[]
  masterData.addProjectQuotaInfoList = masterData.addProjectQuotaInfoList.map(
    (item: any) => {
      if (!Array.isArray(item.answerValueList)) {
        item.answerValueList = [item.answerValueList];
      }
      if (!Array.isArray(item.projectAnswerIdList)) {
        item.projectAnswerIdList = [item.projectAnswerIdList];
      }
      return item;
    }
  );
  // 将子项的单选的答案和id从''转换成[]
  masterData.addProjectInfoList.forEach((element: any) => {
    //data为配置信息中所需的数据
    if (element.data) {
      delete element.data;
    }
    element.addProjectQuotaInfoList = element.addProjectQuotaInfoList.map(
      (item: any) => {
        if (!Array.isArray(item.answerValueList)) {
          item.answerValueList = [item.answerValueList];
        }
        if (!Array.isArray(item.projectAnswerIdList)) {
          item.projectAnswerIdList = [item.projectAnswerIdList];
        }
        return item;
      }
    );
  });
  console.log("masterData", masterData);
  return masterData;
};
// 提交数据
async function onSubmit() {
  await validate();
  // 校验通过
  if (validateAll.value.every((item: any) => item === "fulfilled")) {
    if (!hasDuplicateCustomer(leftTabsData)) {
      const params = processingData();
      console.log("params", params);
      const { status } = await api.create(params);
      status === 1 &&
        ElMessage.success({
          message: "新增成功",
          center: true,
        });
    } else {
      ElMessage.warning({
        message: "项目名称重复",
        center: true,
      });
    }
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
  if (title.value === "添加") {
    stagedDataStore.projectManagementList = null;
  }
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
    >
      <LeftTabs
        @validate="validate"
        ref="LeftTabsRef"
        :left-tabs-data="leftTabsData"
        :validate-top-tabs="validateTopTabs"
        :validate-all="validateAll"
        :title="title"
      />
      <template #footer>
        <el-button @click="closeHandler"> 取消 </el-button>
        <el-button type="warning" @click="staging"> 暂存 </el-button>
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
