<script setup lang="ts">
import { provide, reactive, ref } from "vue";
import LeftTabs from "../ProjeckLeftTabs/index.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { cloneDeep } from "lodash-es";
import useProjectManagementListStore from "@/store/modules/projectManagement_list"; // 项目
import useStagedDataStore from "@/store/modules/stagedData"; // 暂存
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import api from "@/api/modules/projectManagement";
import storage from "@/utils/storage";
import useUserStore from "@/store/modules/user"; // 用户汇率

defineOptions({
  name: "ProjeckEdit",
});
const userStore = useUserStore()
const projectManagementListStore = useProjectManagementListStore(); //项目
const stagedDataStore = useStagedDataStore(); // 暂存
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const customerStore = useUserCustomerStore(); // 客户
const emits = defineEmits(["fetch-data"]);
const dialogTableVisible = ref<boolean>(false);
const title = ref<string>("");
const loading = ref<boolean>(false)
const validateTopTabs = ref<any>([]); // 校验的promise数组
const projectReleaseTime = ref<any>('')
const validateAll = ref<any>([]); // 校验结果，用于在leftTabs中的tabs中给予提示
// 传递给孙组件,用于获取所有孙组件的Ref
function pushData(data: any) {
  validateTopTabs.value.push(data);
}
//当前项目定时发布时间
function getProjectReleaseTime(data: any) {
  projectReleaseTime.value = data
}
// 提供一个方法，孙组件可以使用这个方法来触发验证
provide("validateTopTabs", pushData);
provide("currentProjectTimeline", getProjectReleaseTime);

let leftTabsData = reactive<any>([]); // 明确指定类型为 LeftTab[]
const LeftTabsRef = ref<any>(); // Ref
// 显隐
async function showEdit(row: any) {
  try {
    loading.value = true;
    if (!row) {
      title.value = "新增";
      const initialTopTabsData = cloneDeep(
        projectManagementListStore.initialTopTabsData
      );
      leftTabsData =
        stagedDataStore.projectManagementList || reactive([initialTopTabsData]);
    } else {
      title.value = "编辑";
      if (row.projectType === 2) {
        initializeLeftTabsData(row);
      } else {
        const res = await api.detail({ projectId: row.projectId });
        if (res.data) {
          initializeLeftTabsData(res.data);
        }
      }
    }
    dialogTableVisible.value = true;
    validateAll.value = [];
    validateTopTabs.value = [];
    loading.value = false;
  } catch (error) {

  } finally {
    loading.value = false;
  }
}
// 编辑时 处理数据
function initializeLeftTabsData(data: any) {

  // 编辑的时候回显默认值，不然会报错
  data.data = {
    configurationInformation: {
      // 问题初始数据
      initialProblem: {
        countryId: null, //问卷对应区域id
        projectProblemCategoryId: null, //问题类别id
        projectQuotaQuestionType: null, //问题类型:1:总控问题 2:合作商自己问题
        projectProblemId: null, //	前置问卷问题id
        keyValue: "", //	前置问卷问题
        questionType: null, // 问题类型    type: 1 输入框 2单选 3复选 4下拉
        answerValueList: [], //前置问卷答案,
        projectAnswerIdList: [], //	前置问卷答案id,
      },

      configurationCountryList: null, // 配置信息-区域
      projectCategoryList: null, //题库目录
      ProjectProblemInfoList: [], // 问题列表 - 显示
    },
  };
  leftTabsData = [];
  // 新增主数据作为第一个 Tab
  const { projectInfoList, ...newData } = cloneDeep(data);
  if (newData.descriptionUrl) {
    newData.descriptionUrl = newData.descriptionUrl.split(",");
  } else {
    newData.descriptionUrl = [];
  }

  leftTabsData.push(newData);
  // // // 如果存在 children，为每个 child 创建一个 Tab
  if (projectInfoList && projectInfoList.length) {
    projectInfoList.forEach((child: any) => {
      // 编辑的时候回显默认值，不然会报错
      child.data = {
        configurationInformation: {
          // 问题初始数据
          initialProblem: {
            countryId: null, //问卷对应区域id
            projectProblemCategoryId: null, //问题类别id
            projectQuotaQuestionType: null, //问题类型:1:总控问题 2:合作商自己问题
            projectProblemId: null, //	前置问卷问题id
            keyValue: "", //	前置问卷问题
            questionType: null, // 问题类型    type: 1 输入框 2单选 3复选 4下拉
            answerValueList: [], //前置问卷答案,
            projectAnswerIdList: [], //	前置问卷答案id,
          },

          configurationCountryList: null, // 配置信息-区域
          projectCategoryList: null, //题库目录
          ProjectProblemInfoList: [], // 问题列表 - 显示
        },
      };
      child.descriptionUrl = child.descriptionUrl.split(",");
      leftTabsData.push({
        ...child,
      });
    });
  }
  // 存储编辑前的数据
  projectManagementListStore.dataBeforeEditing = cloneDeep(leftTabsData)
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
// 提交 处理数据
const processingData = async () => {
  const newLeftTabsData = cloneDeep(leftTabsData);
  await projectManagementListStore.compareProjectData(projectManagementListStore.dataBeforeEditing, newLeftTabsData)
  // 将的单选的答案和id从''转换成[]
  await newLeftTabsData.forEach((element: any) => {
    element.descriptionUrl = element.descriptionUrl.join(",");
    // 如果没有问卷和问题就直接关闭前置问卷
    if (
      !element.data.configurationInformation.ProjectProblemInfoList ||
      !element.data.configurationInformation.ProjectProblemInfoList.length
    ) {
      element.isProfile = 2;
    }
    //data为配置信息中所需的数据
    if (element.data) {
      delete element.data;
    }
    element.projectQuotaInfoList = element.projectQuotaInfoList.map(
      (item: any) => {
        if (!Array.isArray(item.answerValueList)) {
          item.answerValueList = [];
        }
        if (!Array.isArray(item.projectAnswerIdList)) {
          item.projectAnswerIdList = [];
        }
        return item;
      }
    );
  });
  let masterData = newLeftTabsData[0];
  masterData.projectInfoList = newLeftTabsData.slice(1);
  return masterData;
};

// 合作商项目编辑数据处理
const processingDataObj = (data: any) => {
  return {
    projectOutsideInfoId: data.projectOutsideInfoId ?? null,
    projectId: data.projectId,
    doMoneyPrice: data.doMoneyPrice,
    currencyType: data.currencyType,
    exchangeRate: data.exchangeRate,
    memberPrice: data.memberPrice,
    num: data.num,
    minimumDuration: data.minimumDuration,
    ir: data.ir,
    mutualExclusionId: data.mutualExclusionId,
    remark: data.remark,
    descriptionUrl: data.descriptionUrl,
    richText: data.richText,
    ipDifferenceDetection: data.ipDifferenceDetection,
    limitedQuantity: data.limitedQuantity,
    preNum: data.preNum,
  }
}
// 提交数据
async function onSubmit() {
  loading.value = true;
  await validate();
  // 校验通过
  if (validateAll.value.every((item: any) => item === "fulfilled")) {
    if (!hasDuplicateCustomer(leftTabsData)) {
      const params = await processingData();
      setTimeout(async () => {
        if (title.value === "新增") {
          params.memberPrice = (params.doMoneyPrice * params.exchangeRate).toFixed(2)
          params.minimumDuration = +params.minimumDuration
          if (!params.exchangeRate) {
            ElMessage.warning({
              message: "请设置汇率",
              center: true,
            });
            return
          }
          const { status } = await api.create(params);
          status === 1 &&
            ElMessage.success({
              message: "新增成功",
              center: true,
            });
        } else {
          if (params.projectType === 2) {
            params.memberPrice = (params.doMoneyPrice * params.exchangeRate).toFixed(2)
            const objParams = processingDataObj(params)
            const { status } = await api.addOrUpdateProjectOutsideInfo(objParams);
            status === 1 &&
              ElMessage.success({
                message: "编辑成功",
                center: true,
              });
          } else {
            const { status } = await api.edit(params);
            status === 1 &&
              ElMessage.success({
                message: "编辑成功",
                center: true,
              });
          }
        }
        emits("fetch-data");
        closeHandler();
      }, 1000)

    } else {
      ElMessage({ message: "项目名称重复", center: true });
    }
  } else {
    // 跳转到第一个未通过校验的组件
    LeftTabsRef.value.activeLeftTab = validateAll.value.indexOf("rejected");
    ElMessage.warning({
      message: "请完善表单",
      center: true,
    });
  }
  loading.value = false;
}
// 弹框关闭事件
function closeHandler() {
  leftTabsData = reactive<any>([]);
  validateAll.value = [];
  validateTopTabs.value = [];
  dialogTableVisible.value = false;

  if (title.value === "新增") {
    stagedDataStore.projectManagementList = null;
  }
}

// // 获取 客户 区域
const getList = async () => {
  await customerStore.getCustomerList();
  await basicDictionaryStore.getCountry();
};

onMounted(async () => {
  await getList();
});

// 暴露方法
defineExpose({
  showEdit,
});
</script>

<template>
  <div>
    <el-drawer v-model="dialogTableVisible" :class="title === '新增' || leftTabsData.length > 1
      ? 'hide-drawer-header'
      : 'edit-drawer'
      " append-to-body :close-on-click-modal="false" destroy-on-close draggable size="70%">
      <LeftTabs v-loading="loading" v-if="leftTabsData.length" @validate="validate" ref="LeftTabsRef"
        :left-tabs-data="leftTabsData" :validate-top-tabs="validateTopTabs" :validate-all="validateAll"
        :title="title" />
      <template #footer>
        <div class="flex-c">

          <el-button link v-show="projectReleaseTime">
            <SvgIcon name="ant-design:clock-circle-outlined" /> &ensp; {{ projectReleaseTime }}
          </el-button>
          <el-button type="primary" @click="onSubmit" :disabled="loading"> 发布项目 </el-button>
          <el-button type="warning" v-show="title !== '编辑'" @click="staging" :disabled="loading">
            暂存
          </el-button>
          <el-button @click="closeHandler" :disabled="loading"> 取消 </el-button>


        </div>

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

.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
