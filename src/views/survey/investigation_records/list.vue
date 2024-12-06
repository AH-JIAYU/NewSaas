<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/investigation_records";
import { ElMessage } from "element-plus";
import useUserCustomerStore from "@/store/modules/user_customer";
import empty from "@/assets/images/empty.png";

defineOptions({
  name: "investigation_records",
});
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
const border = ref(false);
// 表格控件-是否展示斑马条
const stripe = ref(false);
// 表格控件-控制表格大小
const lineHeight = ref<any>("default");
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
// 货币类型
const currencyType = ref<any>();
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-investigation_records"); // 表单排序name
// 表格控件-展示列
const columns = ref([
  {
    prop: "projectName",
    label: "项目名称",
    sortable: true,
    checked: true,
  },
  { prop: "id", label: "点击ID", sortable: true, checked: true },
  { prop: "projectId", label: "项目ID", sortable: true, checked: true },

  { prop: "memberId", label: "会员ID", sortable: true, checked: true },
  {
    prop: "randomIdentityId",
    label: "随机身份",
    sortable: true,
    checked: true,
  },
  // {
  //   prop: "customerShortName",
  //   label: "客户简称",
  //   sortable: true,
  //   checked: true,
  // },
  { prop: "memberName", label: "部门", sortable: true, checked: true },
  { prop: "allocationType", label: "分配类型", sortable: true, checked: true },
  {
    prop: "doMoneyPrice",
    label: "项目价",
    sortable: true,
    checked: true,
  },
  {
    prop: "memberPrice",
    label: "成本价(会员)",
    sortable: true,
    checked: true,
  },
  { prop: "ipBelong", label: "区域/IP", sortable: true, checked: true },
  { prop: "surveyTime", label: "调查时间", sortable: true, checked: true },
  { prop: "surveyStatus", label: "调查状态", sortable: true, checked: true },
  { prop: "viceStatus", label: "副状态", sortable: true, checked: true },
]);
const queryForm = reactive<any>({
  //会员id
  memberId: "",
  clickId: "",
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
  surveyStatus: [],
});

const data = reactive<any>({
  // 分配类型
  allocationTypeList: ["未分配", "供应商", "会员组"],
  // 调查状态
  surveyStatusList: [
    { label: "完成", value: 1 },
    { label: "被甄别", value: 2 },
    { label: "配额满", value: 3 },
    { label: "安全终止", value: 4 },
    { label: "未完成", value: 5 },
  ],
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
    "和解",
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
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    //会员id
    memberId: "",
    clickId: "",
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
    surveyStatus: [],
  });
  fetchData();
}
onMounted(async () => {
  data.customerList = await customerStore.getCustomerList();
  columns.value.forEach((item:any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "memberId",
      placeholder: "会员ID",
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "randomIdentityId",
      placeholder: "随机身份",
      event: "keydown.enter",
    },
    {
      index: 3,
      show: true,
      type: "input",
      modelName: "projectId",
      placeholder: "项目ID",
      event: "keydown.enter",
    },
    {
      index: 4,
      show: true,
      type: "input",
      modelName: "projectName",
      placeholder: "项目名称",
      event: "keydown.enter",
    },
    {
      index: 5,
      show: true,
      type: "select",
      modelName: "customerId",
      placeholder: "客户简称",
      option: "customerId",
      optionLabel: "customerAccord",
      optionValue: "tenantCustomerId",
    },
    {
      index: 6,
      show: true,
      type: "input",
      modelName: "ip",
      placeholder: "IP地址",
    },
    {
      index: 7,
      show: true,
      type: "select",
      modelName: "surveyStatus",
      placeholder: "调查状态",
      option: "surveyStatus",
      optionLabel: "label",
      optionValue: "value",
      multiple:true,
    },
    {
      index: 8,
      show: true,
      type: "input",
      modelName: "clickId",
      placeholder: "点击ID",
      event: "keydown.enter",
    },
  ];
});
const formOption = {
  customerId: () => data.customerList,
  surveyStatus: () => data.surveyStatusList,
};
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
}
</script>
<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <FormSearch
        :formSearchList="formSearchList"
        :formSearchName="formSearchName"
        @currentChange="currentChange"
        @onReset="onReset"
        :model="queryForm"
        :formOption="formOption"
      />
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel />
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px"
            @query-data="queryData"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        v-loading="listLoading"
        :border="border"
        :data="list"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
        @current-change="handleCurrentChange"
        highlight-current-row
      >
        <el-table-column align="left" type="selection" />
        <el-table-column
          v-if="checkList.includes('id')"
          show-overflow-tooltip
          align="left"
          prop="id"
          fixed="left"
          label="点击ID"
          width="200"
        >
          <template #default="{ row }">
            <div class="hoverSvg">
              <el-text style="color: #333333">{{
                row.id ? row.id : "-"
              }}</el-text>
              <span class="c-fx">
                <copy
                  :content="row.id"
                  :class="{
                    rowCopy: 'rowCopy',
                    current: row.id === current,
                  }"
                />
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectName')"
          align="left"
          prop="projectName"
          show-overflow-tooltip
          label="项目名称"
          width="200"
        >
          <template #default="{ row }">
            <el-text style="font-weight: 700; color: #333333">{{
              row.projectName ? row.projectName : "-"
            }}</el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('randomIdentityId')"
          align="left"
          prop="randomIdentityId"
          show-overflow-tooltip
          label="随机身份"
          width="200"
        >
          <template #default="{ row }">
            <div v-if="row.randomIdentityId" class="hoverSvg">
              <p class="fineBom">{{ row.randomIdentityId }}</p>
              <span class="c-fx">
                <copy
                  :content="row.randomIdentityId"
                  :class="{
                    rowCopy: 'rowCopy',
                    current: row.id === current,
                  }"
                />
                <!-- <copy class="copy" :content="row.randomIdentityId" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberId')"
          align="left"
          prop="memberId"
          show-overflow-tooltip
          width="200"
          label="会员ID"
        >
          <template #default="{ row }">
            <div v-if="row.memberId" class="hoverSvg">
              <p class="fineBom">{{ row.memberId }}</p>
              <span class="c-fx">
                <copy
                  :content="row.memberId"
                  :class="{
                    rowCopy: 'rowCopy',
                    current: row.id === current,
                  }"
                />
                <!-- <copy class="copy" :content="row.memberId" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('projectId')"
          align="left"
          prop="projectId"
          show-overflow-tooltip
          width="200"
          label="项目ID"
        >
          <template #default="{ row }">
            <div v-if="row.projectId" class="hoverSvg">
              <p class="fineBom">{{ row.projectId }}</p>
              <span class="c-fx">
                <copy
                  :content="row.projectId"
                  :class="{
                    rowCopy: 'rowCopy',
                    current: row.id === current,
                  }"
                />
                <!-- <copy class="copy" :content="row.projectId" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <!-- <el-table-column v-if="checkList.includes('customerShortName')" align="left" prop="customerShortName"
          show-overflow-tooltip label="客户简称" width="100">
          <template #default="{ row }">
            <el-text style="font-weight: 700;color: #333333;">{{ row.customerShortName ? row.customerShortName : "-"
              }}</el-text>
          </template>
        </el-table-column> -->
        <el-table-column
          v-if="checkList.includes('memberName')"
          width="200"
          align="left"
          prop="memberName"
          show-overflow-tooltip
          label="部门"
        >
          <template #default="{ row }">
            <div v-if="row.memberName" class="hoverSvg">
              <el-text style="color: #333333">{{
                row.memberName.split("/")[0]
              }}</el-text>
              &nbsp;&nbsp;
              <p class="fineBom">{{ row.memberName.split("/")[1] }}</p>
              <span class="c-fx">
                <copy
                  :content="row.memberName.split('/')[1]"
                  :class="{
                    rowCopy: 'rowCopy',
                    current: row.id === current,
                  }"
                />
                <!-- <copy class="copy" :content="row.memberName.split('/')[1]" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('allocationType')"
          align="left"
          show-overflow-tooltip
          width="100"
          label="分配类型"
          fixed="right"
        >
          <template #default="{ row }">
            <el-tag effect="plain" type="info" v-if="row.allocationType === 1">
              未分配
            </el-tag>
            <el-tag
              style="background-color: #626aef; color: #fff"
              v-if="row.allocationType === 2"
            >
              供应商
            </el-tag>
            <el-tag
              style="background-color: #05c9be; color: #fff"
              v-if="row.allocationType === 3"
            >
              会员组
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('doMoneyPrice')"
          width="120"
          align="left"
          prop="h"
          show-overflow-tooltip
          label="项目价"
          fixed="right"
        >
          <template #default="{ row }">
            <svg
              v-if="row.currencyType === 'USD'"
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
            >
              <path
                id="Vector"
                d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                fill="#333333"
              />
            </svg>
            <svg
              v-if="row.currencyType === 'CNY'"
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="10"
              viewBox="0 0 9 10"
              fill="none"
            >
              <path
                id="Vector"
                d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                fill="#333333"
              />
            </svg>
            <el-text style="color: #333333">
              <CurrencyType v-if="!row.currencyType" />{{
                row.doMoneyPrice || 0
              }}
            </el-text>
            <!-- <el-text>
              <CurrencyType />
            </el-text>
            <el-text style="color: #333333">
              {{ row.doMoneyPrice || 0 }}
            </el-text> -->
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberPrice')"
          width="120"
          align="left"
          prop="h"
          show-overflow-tooltip
          label="成本价(会员)"
          fixed="right"
        >
          <template #default="{ row }">
            <svg
              v-if="row.memberCurrencyType === 'USD'"
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
            >
              <path
                id="Vector"
                d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                fill="#333333"
              />
            </svg>
            <svg
              v-if="row.memberCurrencyType === 'CNY'"
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="10"
              viewBox="0 0 9 10"
              fill="none"
            >
              <path
                id="Vector"
                d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                fill="#333333"
              />
            </svg>
            <el-text style="color: #333333">
              <CurrencyType v-if="!row.memberCurrencyType" />{{
                row.memberPrice || 0
              }}
            </el-text>
            <!-- <el-text>
              <CurrencyType />
            </el-text>
            <el-text style="color: #333333">
              {{ row.memberPrice || 0 }}
            </el-text> -->
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('ipBelong')"
          align="left"
          width="150"
          prop="ipBelong"
          show-overflow-tooltip
          label="区域/IP"
          fixed="right"
        >
          <template #default="{ row }">
            <div v-if="row.ipBelong" class="hoverSvg">
              <el-tag>{{ row.ipBelong.split("/")[1] }}</el-tag>
              &nbsp;&nbsp;
              <p class="fineBom">
                {{ row.ipBelong.split("/")[0] }}
              </p>
              <copy
                :content="row.ipBelong.split('/')[0]"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
              <!-- <copy class="copy" :content="row.ipBelong.split('/')[0]" /> -->
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('surveyTime')"
          align="left"
          show-overflow-tooltip
          label="调查时间"
          width="120"
          fixed="right"
        >
          <template #default="{ row }">
            <el-tooltip placement="top">
              <template #content>
                <div>
                  <el-text style="color: #fff"
                    >开始时间：{{ row.surveyStartTime }}</el-text
                  >
                  <br />
                  <el-text style="color: #fff"
                    >结束时间：{{
                      row.surveyEndTime ? row.surveyEndTime : "-"
                    }}</el-text
                  >
                </div>
              </template>
              <el-tag effect="plain" type="info">
                {{ row.surveyTime ? row.surveyTime + "min" : 0 }}/
                {{ row.projectTime ? row.projectTime + "min" : 0 }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <ElTableColumn
          v-if="checkList.includes('surveyStatus')"
          align="left"
          show-overflow-tooltip
          prop=""
          label="调查状态"
          width="100"
          fixed="right"
        >
          <template #default="{ row }">
            <el-tag
              effect="dark"
              style="background-color: #fb6868; border: none"
              v-if="row.surveyStatus === 3"
              class="mx-1"
              type="primary"
              fixed="right"
              >配额满</el-tag
            >
            <!-- <el-tag effect="dark" style="background-color: #379AFF;border: none;" v-if="row.surveyStatus === 1"
              class="mx-1" type="success">完成</el-tag> -->
            <el-tag
              effect="dark"
              style="background-color: #fb6868; border: none"
              v-if="row.surveyStatus === 2"
              class="mx-1"
              type="danger"
              >被甄别</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #05c9be; border: none"
              v-if="row.surveyStatus === 4"
              class="mx-1"
              type="warning"
              >安全终止</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #e1e1e1; border: none"
              v-if="row.surveyStatus === 5"
              class="mx-1"
              >未完成</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #74868b; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 1"
              class="mx-1"
              type="success"
              >待审</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #475061; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 2"
              class="mx-1"
              type="danger"
              >完成</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #3e5c78; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 3"
              class="mx-1"
              type="primary"
              >过IR</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #c8c7bc; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 4"
              class="mx-1"
              type="warning"
              >时间过短</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #bcc8b8; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 5"
              class="mx-1"
              >超时完成</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #ded6cb; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 6"
              class="mx-1"
              >超量完成</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #03c239; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 7"
              class="mx-1"
              >审核成功</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #fb6868; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 8"
              class="mx-1"
              >审核失败</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #fb6868; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 9"
              class="mx-1"
              >数据冻结</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #6683a2; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 10"
              class="mx-1"
              >时间段过载</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #638d93; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 11"
              class="mx-1"
              >IP不一致</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #626a73; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 12"
              class="mx-1"
              >ID重复参与</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #03c239; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 13"
              class="mx-1"
              >和解</el-tag
            >
            <el-text v-if="row.settlementRemarks">
              <div
                v-if="row.settlementRemarks === '结算成功'"
                style="color: #4797fb"
                class="i-healthicons:yes w-1.3em h-1.3em"
              ></div>
              <div
                v-if="row.settlementRemarks === '结算失败'"
                style="color: #f1756c"
                class="i-healthicons:no w-1.3em h-1.3em"
              ></div>
            </el-text>
          </template>
        </ElTableColumn>
        <!-- <ElTableColumn v-if="checkList.includes('viceStatus')" align="left" show-overflow-tooltip prop="" label="副状态">
          <template #default="{ row }">
            <div v-if="row.surveyStatus === 1">
              <div v-if="row.viceStatus">
                <el-tag effect="dark" style="background-color: #74868b; border: none" v-if="row.viceStatus === 1"
                  class="mx-1" type="success">待审</el-tag>
                <el-tag effect="dark" style="background-color: #475061; border: none" v-if="row.viceStatus === 2"
                  class="mx-1" type="danger">完成</el-tag>
                <el-tag effect="dark" style="background-color: #3e5c78; border: none" v-if="row.viceStatus === 3"
                  class="mx-1" type="primary">过IR</el-tag>
                <el-tag effect="dark" style="background-color: #c8c7bc; border: none" v-if="row.viceStatus === 4"
                  class="mx-1" type="warning">时间过短</el-tag>
                <el-tag effect="dark" style="background-color: #bcc8b8; border: none" v-if="row.viceStatus === 5"
                  class="mx-1">超时完成</el-tag>
                <el-tag effect="dark" style="background-color: #ded6cb; border: none" v-if="row.viceStatus === 6"
                  class="mx-1">超量完成</el-tag>
                <el-tag effect="dark" style="background-color: #03c239; border: none" v-if="row.viceStatus === 7"
                  class="mx-1">审核成功</el-tag>
                <el-tag effect="dark" style="background-color: #fb6868; border: none" v-if="row.viceStatus === 8"
                  class="mx-1">审核失败</el-tag>
                <el-tag effect="dark" style="background-color: #fb6868; border: none" v-if="row.viceStatus === 9"
                  class="mx-1">数据冻结</el-tag>
                <el-tag effect="dark" style="background-color: #6683a2; border: none" v-if="row.viceStatus === 10"
                  class="mx-1">时间段过载</el-tag>
                <el-tag effect="dark" style="background-color: #638d93; border: none" v-if="row.viceStatus === 11"
                  class="mx-1">IP不一致</el-tag>
                <el-tag effect="dark" style="background-color: #626a73; border: none" v-if="row.viceStatus === 12"
                  class="mx-1">ID重复参与</el-tag>
                <el-tag effect="dark" style="background-color: #03c239; border: none" v-if="row.viceStatus === 13"
                  class="mx-1">和解</el-tag>
              </div>
              <el-text v-else></el-text>
            </div>
            <el-text v-else></el-text>
          </template>
        </ElTableColumn> -->
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </el-table>
      <ElPagination
        :current-page="pagination.page"
        :total="pagination.total"
        :page-size="pagination.size"
        :page-sizes="pagination.sizes"
        :layout="pagination.layout"
        :hide-on-single-page="false"
        class="pagination"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.rowCopy {
  width: 20px;
  display: none;
}

.current {
  display: block !important;
}

.el-table__row:hover .rowCopy {
  display: block;
}

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

.f-jc {
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 0.875rem;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hoverSvg {
  display: flex;
  align-items: center;
}

.copy {
  display: flex;
  align-items: center;
  width: 25px;
}

.svg {
  // display: none;
  width: 14px;
  height: 14px;
  margin-left: 5px;
}

.headerIcon {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .timeSvg {
    margin-right: 4px;
  }
}

.c-fx {
  display: flex;
  align-items: center;
  justify-content: center;
}

.copySvg {
  width: 100%;
  height: 100%;
}

:deep {
  .el-tag {
    width: 4.125rem;
  }
}
</style>
