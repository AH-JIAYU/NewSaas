<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import invoicingEdit from "./components/InvoicingEdit/index.vue";
import projectReview from "./components/ProjectReview/index.vue";
import settlementEdit from "./components/SettlementEdit/index.vue";
import refundDetail from "./components/RefundDetails/index.vue";
import Settlement from "./components/AddSettlement/index.vue";
import StatusDetail from "./components/StatusDetail/index.vue";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import useUserCustomerStore from "@/store/modules/user_customer";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import api from "@/api/modules/project_settlement";
import empty from "@/assets/images/empty.png";
import fileExport from "@/utils/flie_export";
defineOptions({
  name: "settlement",
});

// 时间
// const { format } = useTimeago();
//区域
const basicDictionaryStore = useBasicDictionaryStore();
const countryList = ref<any>();
// 客户
const customerStore = useUserCustomerStore();
const customerList = ref<any>();
// 创建人
const tenantStaffStore = useTenantStaffStore();
const founderList = ref<any>();
const countryData = ref<any>([]);
// 分页
const { pagination, onSizeChange, onCurrentChange } = usePagination();
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const invoicingRef = ref();
const addSettlementRef = ref();
const auditingRef = ref();
const editRef = ref();
const refundRef = ref();
const StatusDetailRef = ref();
// 右侧工具栏配置变量
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
const border = ref(false);
const checkList = ref<any>([]);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
const columns = ref<any>([
  { label: "项目ID", prop: "projectId", sortable: true, checked: true },
  { label: "项目名称", prop: "projectName", sortable: true, checked: true },
  {
    label: "客户简称/标识",
    prop: "customerName",
    sortable: true,
    checked: true,
  },
  { label: "项目价", prop: "projectAmount", sortable: true, checked: true },
  { label: "所属国家", prop: "countryId", sortable: true, checked: true },
  {
    label: "系统/审核完成数",
    prop: "systemDone",
    sortable: true,
    checked: true,
  },
  { label: "结算PO号", prop: "settlementPo", sortable: true, checked: true },
  { label: "结算状态", prop: "status", sortable: true, checked: true },
  { label: "节点时间", prop: "nodeTime", sortable: true, checked: true },
  { label: "备注", prop: "remark", sortable: true, checked: true },
]);
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-settlement"); // 表单排序name
const settlementStatusList = [
  { label: "待审核", value: 1 },
  { label: "已审核", value: 2 },
  { label: "已开票", value: 3 },
  { label: "已结算", value: 4 },
  { label: "已冻结", value: 5 },
];

// 查询参数
const queryForm = reactive<any>({
  // 页数
  page: 1,
  // 每页条数
  limit: 10,
  // 项目id
  projectId: null,
  // 项目名称
  projectName: "",
  // 客户id
  customerId: null,
  // 项目标识
  projectIdentification: "",
  // 区域id
  countryId: "",
  // 创建人id
  createUserId: null,
  // 结算状态 1:待审核 2:已审核 3:已开票 4:已结算 5:已冻结
  settlementStatus: "",
  // 时间类型 1:待审核 2:已审核 3:已开票 4:巳结算 5:已冻结
  timeType: "",
  time: [],
  // 开始时间
  startTime: "",
  // 结束时间
  endTime: "",
  allocationStatus: "",
  type: "search",
});
// 表格数据
const list = ref<any>([]);
// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value;
}

const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.projectId;
  else current.value = "";
}

// 开票
function invoicing(row: any) {
  if (!selectRows.value.length) {
    return ElMessage({ message: "请选择至少一条数据", type: "warning" });
  } else {
    invoicingRef.value.showEdit(row, selectRows.value);
  }
}
// 新增结算
function addSettlement() {
  addSettlementRef.value.showEdit();
}
// 结算
function settlement(row: any) {
  if (!selectRows.value.length) {
    return ElMessage({ message: "请选择至少一条数据", type: "warning" });
  } else {
    invoicingRef.value.showEdit(row, selectRows.value);
  }
}
// 审核
async function auditing(row: any) {
  auditingRef.value.showEdit(JSON.stringify(row));
}
// 编辑
function edit(row: any) {
  editRef.value.showEdit(JSON.stringify(row), "");
}
// 快速编辑
function quickEdit(row: any, type: any) {
  /**
   * 系统/审核  systemDone
    结算PO号 settlementPo
    备注 remark
  */
  editRef.value.showEdit(JSON.stringify(row), type);
}
// 详情
function refundDetails(row: any) {
  refundRef.value.showEdit(JSON.stringify(row));
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    queryForm.limit = size;
    fetchData();
  });
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    queryForm.page = page;
    fetchData();
  });
}
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    // 页数
    page: 1,
    // 每页条数
    limit: 10,
    // 项目id
    projectId: null,
    // 项目名称
    projectName: "",
    // 客户id
    customerId: null,
    // 项目标识
    projectIdentification: "",
    // 区域id
    countryId: "",
    // 创建人id
    createUserId: null,
    // 结算状态 1:待审核 2:已审核 3:已开票 4:已结算 5:已冻结
    settlementStatus: "",
    // 时间类型 1:待审核 2:已审核 3:已开票 4:巳结算 5:已冻结
    timeType: "",
    time: [],
    // 开始时间
    startTime: "",
    // 结束时间
    endTime: "",
  });
  countryData.value = [];
  fetchData();
}
// 时间
const { format } = useTimeago();
// 格式化日期范围的方法
const formatDateRange = (timestamps: any) => {
  if (!timestamps || timestamps.length === 0) return "";
  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };
  // 如果只有一个时间
  if (timestamps.length === 1) {
    const singleDate = new Date(parseInt(timestamps[0]));
    return formatDate(singleDate);
  } else if (timestamps.length === 2) {
    const [startTimestamp, endTimestamp] = timestamps.map(
      (ts: any) => new Date(parseInt(ts))
    );
    return `${formatDate(startTimestamp)} - ${formatDate(endTimestamp)}`;
  }
  return "";
};
// 具体的位置信息
const comCountryId = computed(() => (countryIdList: any) => {
  const lists = countryList.value
    .filter((item: any) => countryIdList.includes(item.id))
    .map((item: any) => item.chineseName);
  return lists;
});
async function fetchData() {
  try {
    listLoading.value = true;
    const params = { ...queryForm };
    //#region 转换查询的数据格式
    if (Array.isArray(queryForm.countryId)) {
      params.countryId = params.countryId.join(",");
    }
    if (queryForm.time && !!queryForm.time.length) {
      params.beginTime = params.time[0] || "";
      params.endTime = params.time[1] || "";
    }
    if (queryForm.settlementStatus) {
      params.settlementStatus = [params.settlementStatus];
    } else {
      params.settlementStatus = [];
    }
    //#endregion
    const { data } = await api.list(params);
    list.value = data.projectSettlementList;
    pagination.value.total = +data.total;
    listLoading.value = false;
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
// 导出
async function onExport() {
  try {
    let params = { ...queryForm };
    //#region 转换查询的数据格式
    if (Array.isArray(queryForm.countryId)) {
      params.countryId = params.countryId.join(",");
    }
    if (queryForm.time && !!queryForm.time.length) {
      params.beginTime = params.time[0] || "";
      params.endTime = params.time[1] || "";
    }
    if (queryForm.settlementStatus) {
      params.settlementStatus = [params.settlementStatus];
    } else {
      params.settlementStatus = [];
    }
    params.page = 0;
    params.limit = -1;
    params.type = "export";

    const list = await api.exportProjectSettlementList(params);
    const name = "项目结算列表.xlsx";
    await fileExport(list, name);
  } catch (error) {
    console.error("导出失败", error);
  }
}
onMounted(async () => {
  countryList.value = await basicDictionaryStore.getCountry();
  customerList.value = await customerStore.getCustomerList();
  founderList.value = await tenantStaffStore.getStaff();
  columns.value.forEach((item: any) => {
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
      modelName: "projectId",
      placeholder: "项目ID",
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "projectName",
      placeholder: "项目名称",
    },
    {
      index: 3,
      show: true,
      type: "input",
      modelName: "projectIdentification",
      placeholder: "项目标识",
    },
    {
      index: 4,
      show: true,
      type: "select",
      modelName: "countryData",
      placeholder: "区域",
      option: "global",
      optionLabel: "chineseName",
      optionValue: "id",
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
      type: "select",
      modelName: "settlementStatus",
      placeholder: "结算状态",
      option: "settlementStatus",
      optionLabel: "label",
      optionValue: "value",
    },
    // {
    //   index: 7,
    //   show: true,
    //   type: "select",
    //   modelName: "timeType",
    //   placeholder: "时间类型",
    //   option: "timeType",
    //   optionLabel: "label",
    //   optionValue: "value",
    // },
    {
      index: 8,
      show: true,
      type: "datetimerange",
      modelName: "time",
      startPlaceHolder: "开始日期",
      endPlaceHolder: "结束日期",
    },
  ];
});
const formOption = {
  customerId: () => customerList.value,
  settlementStatus: () => settlementStatusList,
  timeType: () => settlementStatusList,
};
function handleMoreOperating(command: string, row: any) {
  switch (command) {
    case "auditing":
      auditing(row);
      break;
    case "edit":
      edit(row);
      break;
    case "refundDetails":
      refundDetails(row);
      break;
  }
}
//状态详情
function handleMoreStatus(row: any) {
  StatusDetailRef.value.showEdit(JSON.stringify(row));
}
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
    v-loading="listLoading"
  >
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
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="addSettlement">
            新增结算
          </el-button>
          <el-button type="primary" size="default" @click="invoicing(1)">
            开票
          </el-button>
          <el-button type="primary" size="default" @click="settlement(2)">
            结算
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default" @click="onExport"> 导出 </el-button>
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 0.75rem"
            @query-data="currentChange"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        ref="tableSortRef"
        v-loading="listLoading"
        style="margin-top: 10px"
        row-key="id"
        :data="list"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
        highlight-current-row
        @selection-change="setSelectRows"
        @current-change="handleCurrentChange"
      >
        <el-table-column align="left" type="selection" />
        <el-table-column
          v-if="checkList.includes('projectId')"
          prop="projectId"
          align="left"
          label="项目"
        >
          <template #default="{ row }">
            <div class="copyId">
              <div class="id oneLine tableSmall projectId">
                <el-tooltip
                  effect="dark"
                  :content="row.projectId"
                  placement="top-start"
                >
                  {{ row.projectId }}
                </el-tooltip>

                <!-- ID: {{ row.projectId }} -->
              </div>
              <copy
                :content="row.projectId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.projectId === current,
                }"
              />
              <!-- <copy class="copy" :content="row.projectId" /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectName')"
          show-overflow-tooltip
          prop="projectName"
          width="220"
          align="left"
          label="名称/标识"
        >
          <template #default="{ row }">
            <div>
              <p class="oneLine tableBig">
                {{ row.projectName ? row.projectName : "-" }}
              </p>
              <div class="oneLine">
                {{
                  row.customerName.split("/")[1] !== "null"
                    ? row.customerName.split("/")[1]
                    : "-"
                }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('customerName')"
          show-overflow-tooltip
          prop="customerName"
          width="140"
          align="left"
          label="客户"
        >
          <template #default="{ row }">
            <div class="oneLine">
              <b class="tableBig">{{ row.customerName.split("/")[0] }}</b>
              <div class="oneLine" v-if="row.projectType !== 2">
                <!-- <img :src="row.avatar" alt="" class="avatar" /> -->
                <span>PM：{{ row.userName }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectAmount')"
          show-overflow-tooltip
          align="left"
          label="项目价"
          width="80"
        >
          <template #default="{ row }">
            <div class="fontC-System">
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
              <CurrencyType v-if="!row.currencyType" />{{
                row.projectAmount || 0
              }}
              <!-- <CurrencyType />{{ row.projectAmount || 0 }} -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('countryId')"
          show-overflow-tooltip
          align="left"
          width="100"
          label="区域"
        >
          <template #default="{ row }">
            <template v-if="row.countryId">
              <template
                v-if="
                  row.countryId.length >= basicDictionaryStore.country.length
                "
              >
                <el-tag type="primary">全球</el-tag>
              </template>
              <template v-else-if="comCountryId(row.countryId).length > 1">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="comCountryId(row.countryId).join(',')"
                  placement="top"
                >
                  <el-link type="primary"
                    ><el-tag type="primary"
                      >×{{ comCountryId(row.countryId).length }}</el-tag
                    ></el-link
                  >
                </el-tooltip>
              </template>
              <template v-else>
                <el-tag
                  v-for="item in comCountryId(row.countryId)"
                  :key="item"
                  type="primary"
                >
                  {{ item }}
                </el-tag>
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('systemDone')"
          show-overflow-tooltip
          prop="systemDone"
          align="left"
          label="系统/审核完成数"
          ><template #default="{ row }">
            <div class="flex-c">
              <div class="oneLine" style="width: calc(100% - 20px)">
                <el-text>{{ row.systemDone ? row.systemDone : 0 }}</el-text>
                /<el-text class="mx-1" type="success">{{
                  row.settlementDone ? row.settlementDone : 0
                }}</el-text>
              </div>
              <SvgIcon
                @click="quickEdit(row, 'systemDone')"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('settlementDone')"
          show-overflow-tooltip
          prop="settlementDone"
          align="left"
          label="结算完成数"
        />
        <el-table-column
          v-if="checkList.includes('settlementPo')"
          show-overflow-tooltip
          prop="settlementPo"
          align="left"
          label="结算PO号"
        >
          <template #default="{ row }">
            <div class="flex-c fontC-System">
              <div class="oneLine" style="width: calc(100% - 40px)">
                {{ row.settlementPo ? row.settlementPo : "-" }}
              </div>
              <copy
                v-if="row.settlementPo"
                class="copy"
                :content="row.settlementPo"
              />
              <SvgIcon
                @click="quickEdit(row, 'settlementPo')"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('status')"
          width="100"
          show-overflow-tooltip
          prop="status"
          align="left"
          label="状态"
        >
          <template #default="{ row }">
            <div style="display: flex" class="oneLine">
              <el-text v-if="row.status === 1" class="mx-1 tableBig flex-c">
                <el-button
                  style="margin-right: 5px; background-color: #ffac54"
                  size="small"
                  class="p-1"
                  type="warning"
                  @click="handleMoreStatus(row)"
                  >待审核</el-button
                >
                <!-- <el-text>{{ row.pendReviewTime }}</el-text> -->
              </el-text>
              <el-text v-if="row.status === 3" class="mx-1 tableBig flex-c">
                <el-button
                  style="margin-right: 6px"
                  size="small"
                  class="p-1"
                  type="success"
                  @click="handleMoreStatus(row)"
                  >已开票</el-button
                >
                <!-- <el-text>{{ row.invoicedOutTime }}</el-text> -->
              </el-text>
              <el-text v-if="row.status === 4" class="mx-1 tableBig flex-c">
                <el-button
                  style="margin-right: 6px"
                  size="small"
                  class="p-1"
                  type="info"
                  @click="handleMoreStatus(row)"
                  >已结算</el-button
                >
                <!-- <el-text>{{ row.settledTime }}</el-text> -->
              </el-text>
              <el-text v-if="row.status === 2" class="mx-1 tableBig flex-c">
                <el-button
                  style="margin-right: 6px"
                  size="small"
                  class="p-1"
                  type="primary"
                  @click="handleMoreStatus(row)"
                  >已审核</el-button
                >
                <!-- <el-text>{{ row.reviewTime }}</el-text> -->
              </el-text>
              <el-text v-if="row.status === 5" class="mx-1 tableBig flex-c">
                <el-button
                  style="margin-right: 6px"
                  size="small"
                  class="p-1"
                  type="danger"
                  @click="handleMoreStatus(row)"
                  >已冻结</el-button
                >
                <!-- <el-text>{{ row.frozenTime }}</el-text> -->
              </el-text>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('nodeTime')"
          show-overflow-tooltip
          align="left"
          label="时间"
          width="120"
        >
          <template #default="{ row }">
            <el-tooltip
              :content="row.pendReviewTime"
              placement="top"
              v-if="row.status === 1"
            >
              <el-tag effect="plain" type="info">{{
                format(row.pendReviewTime)
              }}</el-tag>
            </el-tooltip>
            <el-tooltip
              :content="row.reviewTime"
              placement="top"
              v-if="row.status === 2"
            >
              <el-tag effect="plain" type="info">{{
                format(row.reviewTime)
              }}</el-tag>
            </el-tooltip>
            <el-tooltip
              :content="row.invoicedOutTime"
              placement="top"
              v-if="row.status === 3"
            >
              <el-tag effect="plain" type="info" v-if="row.status === 3">{{
                format(row.invoicedOutTime)
              }}</el-tag>
            </el-tooltip>
            <el-tooltip
              :content="row.settledTime"
              placement="top"
              v-if="row.status === 4"
            >
              <el-tag effect="plain" type="info" v-if="row.status === 4">{{
                format(row.settledTime)
              }}</el-tag>
            </el-tooltip>
            <el-tooltip
              :content="row.frozenTime"
              placement="top"
              v-if="row.status === 5"
            >
              <el-tag effect="plain" type="info" v-if="row.status === 5">{{
                format(row.frozenTime)
              }}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('remark')"
          show-overflow-tooltip
          prop="remark"
          align="left"
          label="备注"
        >
          <template #default="{ row }">
            <div class="flex-c fontC-System">
              <div class="oneLine" style="width: calc(100% - 20px)">
                {{ row.remark ? row.remark : "-" }}
              </div>
              <SvgIcon
                @click="quickEdit(row, 'remark')"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" fixed="right" label="操作" width="250">
          <template #default="{ row }">
            <ElSpace>
              <el-button
                v-if="row.status === 1"
                type="primary"
                size="small"
                plain
                @click="auditing(row)"
              >
                审核
              </el-button>
              <el-button
                v-if="row.status === 5"
                type="primary"
                size="small"
                plain
                @click="handleMoreOperating('auditing', row)"
              >
                重审
              </el-button>
              <el-button
                type="warning"
                size="small"
                plain
                @click="handleMoreOperating('edit', row)"
              >
                结算编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                plain
                @click="handleMoreOperating('refundDetails', row)"
              >
                详情
              </el-button>
            </ElSpace>
          </template>
        </el-table-column>
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
      <invoicingEdit @success="fetchData" ref="invoicingRef" />
      <projectReview @success="fetchData" ref="auditingRef" />
      <settlementEdit @success="fetchData" ref="editRef" />
      <refundDetail ref="refundRef" />
      <StatusDetail ref="StatusDetailRef" />
      <Settlement @success="fetchData" ref="addSettlementRef" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.copyId .projectId {
  font-size: 0.875rem;
}

.rowCopy {
  width: 20px;
  display: none;
}

.copyId .current {
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

// 筛选
.page-main {
  .search-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20.625rem, 1fr));
    margin-bottom: -1.125rem;

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

.el-table__row:hover .edit {
  display: block;
}

// 头像
.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: bottom;
}

.flex-c {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  > div:nth-of-type(1) {
    width: calc(100% - 25px);
    flex-shrink: 0;
  }

  .edit {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    flex-shrink: 0;
    display: none;
    cursor: pointer;
  }

  .current {
    display: block !important;
  }
}

:deep {
  .el-table .cell.el-tooltip {
    display: flex;
    align-items: center;
  }
}

.btn {
  margin-right: 5px;
}
</style>
