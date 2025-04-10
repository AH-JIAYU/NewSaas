<script lang="ts" setup>
import { provide, reactive, ref } from "vue";
import { cloneDeep } from "lodash-es";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import { ElMessage } from "element-plus";
import LeftTabs from "../VipLeftTabs/index.vue";
import api from "@/api/modules/survey_vip";
import useStagedDataStore from "@/store/modules/stagedData"; // 暂存
import useSurveyVipStore from "@/store/modules/survey_vip"; // 会员
const stagedDataStore = useStagedDataStore(); // 暂存
const surveyVipStore = useSurveyVipStore(); // 会员

const emit = defineEmits(["fetch-data","getList","getItemlist"]);
const drawerisible = ref<boolean>(false);
const title = ref<string>("");
const LeftTabsRef = ref<any>(); // Ref
// 校验结果，用于在leftTabs中的tabs中给予提示
const validateAll = ref<any>([]);
// 校验的promise数组
const validateTopTabs = ref<any>([]);
// 提供的方法
function pushData(data: any) {
  validateTopTabs.value.push(data);
}
const isClick= ref<boolean>(false);
// 提供一个方法，孙组件可以使用这个方法来触发验证
provide("validateTopTabs", pushData);
let leftTabsData = reactive<any>([]); // 明确指定类型为 LeftTab[]
// 显隐
async function showEdit(row: any,depId:any) {
  if(depId) {
    isClick.value = true
  }
  if (!row) {
    title.value = "新增";
    surveyVipStore.initialTopTabsData.memberGroupId = depId
    leftTabsData =
      stagedDataStore.surveyVip ||
      reactive([{ ...surveyVipStore.initialTopTabsData }]);
  } else {
    title.value = "编辑";
    const { data } = await obtainLoading(
      api.detail({ memberId: row.memberId })
    );
    initializeLeftTabsData(data);
  }
  validateAll.value = [];
  drawerisible.value = true;
}
// 清空现有数据
function initializeLeftTabsData(data: any) {
  leftTabsData = reactive<any>([]);
  // 新增主数据作为第一个 Tab
  leftTabsData.push({
    ...data,
  });
}
// 暂存
function staging() {
  stagedDataStore.surveyVip = cloneDeep(leftTabsData);
  leftTabsData = reactive<any>([]);
  drawerisible.value = false;
  validateTopTabs.value = [];
}
// 关闭
function close() {
  leftTabsData = reactive<any>([]);
  drawerisible.value = false;
  validateTopTabs.value = [];
  if (title.value === "新增") {
    stagedDataStore.surveyVip = null;
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
// 判断供应商名称是否重复
function hasDuplicateCustomer(customers: any) {
  const seen = new Set();
  for (const customer of customers) {
    if (seen.has(customer.memberNickname)) {
      return true; // 如果已经存在，则表示有重复
    }
    seen.add(customer.memberNickname);
  }
  return false; // 如果没有重复，则返回false
}
// 确定
async function save() {
  await validate();
  // 表单校验
  if (validateAll.value.every((item: any) => item === "fulfilled")) {
    // 判重
    if (!hasDuplicateCustomer(leftTabsData)) {
      if (title.value === "新增") {
        const { status } = await submitLoading(
          api.create({
            addMemberInfoList: leftTabsData,
          })
        );
        status === 1 &&
          ElMessage.success({
            message: "新增成功",
            center: true,
          });
      } else {
        const { status } = await submitLoading(api.edit(leftTabsData[0]));
        status === 1 &&
          ElMessage.success({
            message: "修改成功",
            center: true,
          });
      }
      if(isClick.value) {
        emit("getList");
        emit("getItemlist");
      }else {
        emit("fetch-data");
      }
      // 数据改变 在会员组中需要重新请求
      surveyVipStore.NickNameList = null;
      close();
    } else {
      ElMessage.warning({
        message: "会员名称重复",
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
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-drawer
      v-model="drawerisible"
      :class="title === '新增' ? 'hide-drawer-header' : 'edit-drawer'"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      size="60%"
    >
      <LeftTabs
        @validate="validate"
        ref="LeftTabsRef"
        :title="title"
        :left-tabs-data="leftTabsData"
        :validate-top-tabs="validateTopTabs"
        :validate-all="validateAll"
      />
      <template #footer>
        <el-button @click="close"> 取消 </el-button>
        <el-button v-if="title === '新增'" type="warning" @click="staging">
          暂存
        </el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </template>
    </el-drawer>
  </div>
</template>
