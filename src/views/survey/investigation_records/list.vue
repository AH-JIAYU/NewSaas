<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/investigation_records";
import { ElMessage } from "element-plus";
import useUserCustomerStore from "@/store/modules/user_customer";
import empty from '@/assets/images/empty.png'
import useClipboard from "vue-clipboard3"; //

defineOptions({
  name: "investigation_records",
});
// 复制
const { toClipboard } = useClipboard();
// 客户
const customerStore = useUserCustomerStore();
// 分页
const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination();
// listLoading
const listLoading = ref(false);
// 列表
const list = ref<Array<Object>>([]);
// 表格-选中行
const selectRows = ref("");
// 表格-展示的列
const checkList = ref<Array<Object>>([]);
// 表格控件-是否展示边框
const border = ref(true);
// 表格控件-是否展示斑马条
const stripe = ref(false);
// 表格控件-控制表格大小
const lineHeight = ref<any>("default");
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
// 货币类型
const currencyType = ref<any>();
// 表格控件-展示列
const columns = ref([
{ prop: "projectId", label: "项目ID", sortable: true, checked: true },
  {
    prop: "projectName",
    label: "项目名称",
    sortable: true,
    checked: true,
  },
  { prop: "memberId", label: "会员ID", sortable: true, checked: true },
  {
    prop: "randomIdentityId",
    label: "随机身份",
    sortable: true,
    checked: true,
  },
  {
    prop: "customerShortName",
    label: "客户简称",
    sortable: true,
    checked: true,
  },
  { prop: "memberName", label: "所属组", sortable: true, checked: true },
  { prop: "allocationType", label: "分配类型", sortable: true, checked: true },
  {
    prop: "doMoneyPrice",
    label: "原价",
    sortable: true,
    checked: true,
  },
  {
    prop: "memberPrice",
    label: "会员价",
    sortable: true,
    checked: true,
  },
  { prop: "ipBelong", label: "国家/IP", sortable: true, checked: true },
  { prop: "surveyTime", label: "调查时间", sortable: true, checked: true },
  { prop: "surveyStatus", label: "调查状态", sortable: true, checked: true },
  { prop: "viceStatus", label: "副状态", sortable: true, checked: true },
]);
const queryForm = reactive<any>({
  //会员id
  memberId: "",
  //随机身份id
  randomIdentityId: "",
  //会员组id
  memberGroupId: "",
  //项目id
  projectId: "",
  //项目名称-模糊查询
  projectName: "",
  //客户Id
  customerId: "",
  //ip-模糊查询
  ip: "",
  //调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
  surveyStatus: "",
});

const data = reactive<any>({
  // 分配类型
  allocationTypeList: ["未分配", "供应商", "会员组"],
  // 调查状态
  surveyStatusList: ["完成", "被甄别", "配额满", "安全终止", "未完成"],
  // 副状态
  viceStatusList: [
    "待审",
    "免审",
    "过IR",
    "时间过短",
    "超时完成",
    "超量完成",
    "审核成功",
    "审核失败",
    "数据冻结",
    "时间段过载",
    "ip不一致",
    "id重复参与",
    '和解',
  ],
  //客户列表
  customerList: [],
  // 会员
  vipList: [],
  // 会员组
  vipGroupList: [],
  // 供应商
  tenantSupplierList: [],
});

// 重置请求
function queryData() {
  queryForm.pageNo = 1;
  fetchData();
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 请求
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm,
    };
    const { data } = await api.list(params);
    list.value = data.memberSurveyRecordInfoList;
    currencyType.value = data.currencyType;
    pagination.value.total = data.total;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}
// 表格-单选框
function setSelectRows(val: string) {
  selectRows.value = val;
}
// 复制ID
const svgClick = (id: any) => {
  toClipboard(id);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    //会员id
    memberId: "",
    //随机身份id
    randomIdentityId: "",
    //会员组id
    memberGroupId: "",
    //项目id
    projectId: "",
    //项目名称-模糊查询
    projectName: "",
    //客户Id
    customerId: "",
    //ip-模糊查询
    ip: "",
    //调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
    surveyStatus: "",
  });
  fetchData();
}
onMounted(async () => {
  data.customerList = await customerStore.getCustomerList();
  columns.value.forEach((item) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="queryForm" size="default" label-width="100px" inline-message inline class="search-form">
            <el-form-item label="">
              <el-input v-model.trim="queryForm.memberId" clearable :inline="false" placeholder="会员ID" />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input v-model.trim="queryForm.randomIdentityId" clearable :inline="false" placeholder="随机身份" @keydown.enter="currentChange()" />
            </el-form-item>

            <el-form-item label="">
              <el-input v-model.trim="queryForm.projectId" clearable :inline="false" placeholder="项目ID" @keydown.enter="currentChange()" />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input v-model.trim="queryForm.projectName" clearable :inline="false" placeholder="项目名称" @keydown.enter="currentChange()"/>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select v-model="queryForm.customerId" clearable filterable placeholder="客户简称" @change="currentChange()">
                <el-option v-for="item in data.customerList" :key="item.tenantCustomerId" :value="item.tenantCustomerId"
                  :label="item.customerAccord"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input v-model.trim="queryForm.ip" clearable :inline="false" placeholder="IP地址" />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select v-model="queryForm.surveyStatus" clearable filterable placeholder="调查状态" @change="currentChange()">
                <el-option v-for="(item, index) in data.surveyStatusList" :label="item" :value="index + 1"></el-option>
              </el-select>
            </el-form-item>
            <ElFormItem>
              <ElButton type="primary" @click="currentChange()">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton @click="onReset">
                <template #icon>
                  <div class="i-grommet-icons:power-reset h-1em w-1em" />
                </template>
                重置
              </ElButton>
              <ElButton link @click="toggle">
                <template #icon>
                  <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                </template>
                {{ fold ? "展开" : "收起" }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel />
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe" style="margin-left: 12px"
            @query-data="queryData" />
        </FormRightPanel>
      </el-row>
      <el-table v-loading="listLoading" :border="border" :data="list" :size="lineHeight" :stripe="stripe"
        @selection-change="setSelectRows">
        <el-table-column align="center" type="selection" />
        <el-table-column v-if="checkList.includes('projectName')" align="center" prop="projectName"
          show-overflow-tooltip label="项目名称"><template #default="{ row }">
            <el-text style="font-weight: 700;">{{ row.projectName ? row.projectName : "-" }}</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('projectId')" align="center" prop="projectId" show-overflow-tooltip
          width="180" label="项目ID" ><template #default="{ row }">
            <div v-if="row.projectId" class="hoverSvg">
              <p class="fineBom">ID：{{ row.projectId }}</p>
              <span>
                <svg
                @click="svgClick(row.projectId)" class="svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 14 14" fill="none">
                <g id="Frame 3475223">
                  <g id="Frame" clip-path="url(#clip0_450_48083)">
                    <path id="Vector"
                      d="M10.7625 2.1875H0.9625C0.4375 2.1875 0 2.625 0 3.15V12.95C0 13.475 0.4375 13.9125 0.9625 13.9125H10.7625C11.2875 13.9125 11.725 13.475 11.725 12.95V3.15C11.6375 2.625 11.2875 2.1875 10.7625 2.1875ZM8.3125 10.2375H3.4125C3.15 10.2375 2.8875 9.975 2.8875 9.7125C2.8875 9.45 3.0625 9.1 3.4125 9.1H8.3125C8.575 9.1 8.8375 9.3625 8.8375 9.625C8.8375 9.975 8.6625 10.2375 8.3125 10.2375ZM8.3125 6.9125H3.4125C3.15 6.9125 2.8875 6.65 2.8875 6.3875C2.8875 6.125 3.0625 5.775 3.4125 5.775H8.3125C8.575 5.775 8.8375 6.0375 8.8375 6.3C8.8375 6.65 8.6625 6.9125 8.3125 6.9125Z"
                      fill="#409EFF" />
                    <path id="Vector_2"
                      d="M12.95 0H2.8C2.1875 0 1.75 0.4375 1.75 1.05V1.3125H10.85C11.8125 1.3125 12.6 2.1 12.6 3.0625V12.25H12.95C13.5625 12.25 14 11.8125 14 11.2V1.05C14 0.4375 13.5625 0 12.95 0Z"
                      fill="#409EFF" />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_450_48083">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
          <el-table-column v-if="checkList.includes('memberId')" align="center" prop="memberId" show-overflow-tooltip
          width="180" label="会员ID" ><template #default="{ row }">
            <div v-if="row.memberId" class="hoverSvg">
              <p class="fineBom">ID：{{ row.memberId }}</p>
              <span>
                <svg
                @click="svgClick(row.memberId)" class="svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 14 14" fill="none">
                <g id="Frame 3475223">
                  <g id="Frame" clip-path="url(#clip0_450_48083)">
                    <path id="Vector"
                      d="M10.7625 2.1875H0.9625C0.4375 2.1875 0 2.625 0 3.15V12.95C0 13.475 0.4375 13.9125 0.9625 13.9125H10.7625C11.2875 13.9125 11.725 13.475 11.725 12.95V3.15C11.6375 2.625 11.2875 2.1875 10.7625 2.1875ZM8.3125 10.2375H3.4125C3.15 10.2375 2.8875 9.975 2.8875 9.7125C2.8875 9.45 3.0625 9.1 3.4125 9.1H8.3125C8.575 9.1 8.8375 9.3625 8.8375 9.625C8.8375 9.975 8.6625 10.2375 8.3125 10.2375ZM8.3125 6.9125H3.4125C3.15 6.9125 2.8875 6.65 2.8875 6.3875C2.8875 6.125 3.0625 5.775 3.4125 5.775H8.3125C8.575 5.775 8.8375 6.0375 8.8375 6.3C8.8375 6.65 8.6625 6.9125 8.3125 6.9125Z"
                      fill="#409EFF" />
                    <path id="Vector_2"
                      d="M12.95 0H2.8C2.1875 0 1.75 0.4375 1.75 1.05V1.3125H10.85C11.8125 1.3125 12.6 2.1 12.6 3.0625V12.25H12.95C13.5625 12.25 14 11.8125 14 11.2V1.05C14 0.4375 13.5625 0 12.95 0Z"
                      fill="#409EFF" />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_450_48083">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('randomIdentityId')" align="center" prop="randomIdentityId"
          show-overflow-tooltip label="随机身份"><template #default="{ row }">
            <div v-if="row.randomIdentityId" class="hoverSvg">
              <p class="fineBom">ID：{{ row.randomIdentityId }}</p>
              <span>
                <svg
                @click="svgClick(row.randomIdentityId)" class="svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 14 14" fill="none">
                <g id="Frame 3475223">
                  <g id="Frame" clip-path="url(#clip0_450_48083)">
                    <path id="Vector"
                      d="M10.7625 2.1875H0.9625C0.4375 2.1875 0 2.625 0 3.15V12.95C0 13.475 0.4375 13.9125 0.9625 13.9125H10.7625C11.2875 13.9125 11.725 13.475 11.725 12.95V3.15C11.6375 2.625 11.2875 2.1875 10.7625 2.1875ZM8.3125 10.2375H3.4125C3.15 10.2375 2.8875 9.975 2.8875 9.7125C2.8875 9.45 3.0625 9.1 3.4125 9.1H8.3125C8.575 9.1 8.8375 9.3625 8.8375 9.625C8.8375 9.975 8.6625 10.2375 8.3125 10.2375ZM8.3125 6.9125H3.4125C3.15 6.9125 2.8875 6.65 2.8875 6.3875C2.8875 6.125 3.0625 5.775 3.4125 5.775H8.3125C8.575 5.775 8.8375 6.0375 8.8375 6.3C8.8375 6.65 8.6625 6.9125 8.3125 6.9125Z"
                      fill="#409EFF" />
                    <path id="Vector_2"
                      d="M12.95 0H2.8C2.1875 0 1.75 0.4375 1.75 1.05V1.3125H10.85C11.8125 1.3125 12.6 2.1 12.6 3.0625V12.25H12.95C13.5625 12.25 14 11.8125 14 11.2V1.05C14 0.4375 13.5625 0 12.95 0Z"
                      fill="#409EFF" />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_450_48083">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('customerShortName')" align="center" prop="customerShortName"
          show-overflow-tooltip label="客户简称" width="100"><template #default="{ row }">
            {{ row.customerShortName ? row.customerShortName : "-" }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberName')" width="150" align="center" prop="memberName" show-overflow-tooltip
          label="所属组"><template #default="{ row }">
            <div v-if="row.memberName" class="hoverSvg">
              <el-text style="font-weight: 700;">{{row.memberName.split('/')[0]}}</el-text>
              &nbsp;&nbsp;
              <p class="fineBom">ID：{{ row.memberName.split('/')[1] }}</p>
              <span>
                <svg
                @click="svgClick(row.memberName.split('/')[1])" class="svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 14 14" fill="none">
                <g id="Frame 3475223">
                  <g id="Frame" clip-path="url(#clip0_450_48083)">
                    <path id="Vector"
                      d="M10.7625 2.1875H0.9625C0.4375 2.1875 0 2.625 0 3.15V12.95C0 13.475 0.4375 13.9125 0.9625 13.9125H10.7625C11.2875 13.9125 11.725 13.475 11.725 12.95V3.15C11.6375 2.625 11.2875 2.1875 10.7625 2.1875ZM8.3125 10.2375H3.4125C3.15 10.2375 2.8875 9.975 2.8875 9.7125C2.8875 9.45 3.0625 9.1 3.4125 9.1H8.3125C8.575 9.1 8.8375 9.3625 8.8375 9.625C8.8375 9.975 8.6625 10.2375 8.3125 10.2375ZM8.3125 6.9125H3.4125C3.15 6.9125 2.8875 6.65 2.8875 6.3875C2.8875 6.125 3.0625 5.775 3.4125 5.775H8.3125C8.575 5.775 8.8375 6.0375 8.8375 6.3C8.8375 6.65 8.6625 6.9125 8.3125 6.9125Z"
                      fill="#409EFF" />
                    <path id="Vector_2"
                      d="M12.95 0H2.8C2.1875 0 1.75 0.4375 1.75 1.05V1.3125H10.85C11.8125 1.3125 12.6 2.1 12.6 3.0625V12.25H12.95C13.5625 12.25 14 11.8125 14 11.2V1.05C14 0.4375 13.5625 0 12.95 0Z"
                      fill="#409EFF" />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_450_48083">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('allocationType')" align="center" show-overflow-tooltip width="100"
          label="分配类型">
          <template #default="{ row }">
            <el-tag effect="plain" type="info" v-if="row.allocationType === 1"> 未分配 </el-tag>
            <el-tag style="background-color: #FFAC54;color: #fff;" v-if="row.allocationType === 2">
              供应商
            </el-tag>
            <el-tag style="background-color: #05C9BE;color: #fff;" v-if="row.allocationType === 3">
              会员组
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('price')" align="center" prop="h" show-overflow-tooltip
          label="原价">
          <template #default="{ row }">
            <el-text style="color: #FD8989;">
                <CurrencyType />
              </el-text>{{ row.doMoneyPrice || 0 }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('price')" align="center" prop="h" show-overflow-tooltip
          label="会员价">
          <template #default="{ row }">
            <el-text style="color: #FD8989;">
                <CurrencyType />
              </el-text>{{ row.memberPrice || 0 }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('ipBelong')" align="center" width="130" prop="ipBelong" show-overflow-tooltip
          label="国家/IP" ><template #default="{ row }">
            <div v-if="row.memberName" class="hoverSvg">
              <el-tag style="font-weight: 700;">{{row.ipBelong.match(/(\d{1,3}\.){3}\d{1,3}|[\u4e00-\u9fa5]+/g)[1]}}</el-tag>
              &nbsp;&nbsp;
              <p class="fineBom">{{row.ipBelong.match(/(\d{1,3}\.){3}\d{1,3}|[\u4e00-\u9fa5]+/g)[0]}}</p>
              <span>
                <svg
                @click="svgClick(row.memberName.split('/')[1])" class="svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 14 14" fill="none">
                <g id="Frame 3475223">
                  <g id="Frame" clip-path="url(#clip0_450_48083)">
                    <path id="Vector"
                      d="M10.7625 2.1875H0.9625C0.4375 2.1875 0 2.625 0 3.15V12.95C0 13.475 0.4375 13.9125 0.9625 13.9125H10.7625C11.2875 13.9125 11.725 13.475 11.725 12.95V3.15C11.6375 2.625 11.2875 2.1875 10.7625 2.1875ZM8.3125 10.2375H3.4125C3.15 10.2375 2.8875 9.975 2.8875 9.7125C2.8875 9.45 3.0625 9.1 3.4125 9.1H8.3125C8.575 9.1 8.8375 9.3625 8.8375 9.625C8.8375 9.975 8.6625 10.2375 8.3125 10.2375ZM8.3125 6.9125H3.4125C3.15 6.9125 2.8875 6.65 2.8875 6.3875C2.8875 6.125 3.0625 5.775 3.4125 5.775H8.3125C8.575 5.775 8.8375 6.0375 8.8375 6.3C8.8375 6.65 8.6625 6.9125 8.3125 6.9125Z"
                      fill="#409EFF" />
                    <path id="Vector_2"
                      d="M12.95 0H2.8C2.1875 0 1.75 0.4375 1.75 1.05V1.3125H10.85C11.8125 1.3125 12.6 2.1 12.6 3.0625V12.25H12.95C13.5625 12.25 14 11.8125 14 11.2V1.05C14 0.4375 13.5625 0 12.95 0Z"
                      fill="#409EFF" />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_450_48083">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('surveyTime')" align="center" show-overflow-tooltip label="调查时间">
          <template #header>
            <span class="headerIcon">
              <svg class="timeSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g id="Time (æ¶é´)">
                  <path id="Vector"
                    d="M7.9987 14.6666C11.6806 14.6666 14.6654 11.6818 14.6654 7.99992C14.6654 4.31802 11.6806 1.33325 7.9987 1.33325C4.3168 1.33325 1.33203 4.31802 1.33203 7.99992C1.33203 11.6818 4.3168 14.6666 7.9987 14.6666Z"
                    fill="#409EFF" />
                  <path id="Vector_2" d="M8.00431 4L8.00391 8.00293L10.8304 10.8294" stroke="white" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
              调查时间
            </span>
          </template>
          <template #default="{ row }">
            <el-tag effect="plain" type="info">  {{ row.surveyTime ? row.surveyTime + "min" : 0 }}/
            {{ row.projectTime ? row.projectTime + "min" : 0 }} </el-tag>
          </template>
        </el-table-column>
        <ElTableColumn v-if="checkList.includes('surveyStatus')" align="center" show-overflow-tooltip prop=""
          label="调查状态">
          <template #default="{ row }">
            <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.surveyStatus === 3" class="mx-1" type="primary">配额满</el-tag>
            <el-tag effect="dark" style="background-color: #379AFF;border: none;" v-if="row.surveyStatus === 1" class="mx-1" type="success">完成</el-tag>
            <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.surveyStatus === 2" class="mx-1" type="danger">被甄别</el-tag>
            <el-tag effect="dark" style="background-color: #05C9BE;border: none;" v-if="row.surveyStatus === 4" class="mx-1" type="warning">安全终止</el-tag>
            <el-tag effect="dark" style="background-color: #E1E1E1;border: none;" v-if="row.surveyStatus === 5" class="mx-1">未完成</el-tag>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="checkList.includes('viceStatus')" align="center" show-overflow-tooltip prop="" label="副状态">
          <template #default="{ row }">
            <div v-if="row.viceStatus">
            <el-tag effect="dark" style="background-color: #74868b;border: none;" v-if="row.viceStatus === 1" class="mx-1" type="success">待审</el-tag>
            <el-tag effect="dark" style="background-color: #475061;border: none;" v-if="row.viceStatus === 2" class="mx-1" type="danger">免审</el-tag>
            <el-tag effect="dark" style="background-color: #3e5c78;border: none;" v-if="row.viceStatus === 3" class="mx-1" type="primary">过IR</el-tag>
            <el-tag effect="dark" style="background-color: #c8c7bc;border: none;" v-if="row.viceStatus === 4" class="mx-1" type="warning">时间过短</el-tag>
            <el-tag effect="dark" style="background-color: #bcc8b8;border: none;" v-if="row.viceStatus === 5" class="mx-1">超时完成</el-tag>
            <el-tag effect="dark" style="background-color: #ded6cb;border: none;" v-if="row.viceStatus === 6" class="mx-1">超量完成</el-tag>
            <el-tag effect="dark" style="background-color: #03C239;border: none;" v-if="row.viceStatus === 7" class="mx-1">审核成功</el-tag>
            <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.viceStatus === 8" class="mx-1">审核失败</el-tag>
            <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.viceStatus === 9" class="mx-1">数据冻结</el-tag>
            <el-tag effect="dark" style="background-color: #6683a2;border: none;" v-if="row.viceStatus === 10" class="mx-1">时间段过载</el-tag>
            <el-tag effect="dark" style="background-color: #638d93;border: none;" v-if="row.viceStatus === 11" class="mx-1">IP不一致</el-tag>
            <el-tag effect="dark" style="background-color: #626a73;border: none;" v-if="row.viceStatus === 12" class="mx-1">ID重复参与</el-tag>
            <el-tag effect="dark" style="background-color: #03C239;border: none;" v-if="row.viceStatus === 13" class="mx-1">和解</el-tag>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
// 高度自适应
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: auto;
    }
  }
}

// 筛选
.page-main {
  .search-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    margin-bottom: -18px;

    :deep(.el-form-item) {
      grid-column: auto / span 1;

      &:last-child {
        grid-column-end: -1;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }
}
.fineBom {
  text-align: left !important;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hoverSvg {
  display: flex;
  align-items: center;
}
.hoverSvg:hover .svg {
  display: block;
}

.svg {
  display: none;
  width: 14px;
  height: 14px;
  margin-left: 5px;
}
.headerIcon {
  display:flex;
  align-items: center;
  justify-content: center;
  .timeSvg {
    margin-right: 4px;
  }
}
</style>
