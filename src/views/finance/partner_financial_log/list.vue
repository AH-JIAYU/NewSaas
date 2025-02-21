<script setup lang="ts">
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/user_cooperation";
import { ref } from "vue";
import empty from "@/assets/images/empty.png";

defineOptions({
  name: "financial_log",
});
// 时间
const { format } = useTimeago();
const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-financial_log"); // 表单排序name
// 表格控件-展示列
const columns = ref<any>([
  // 表格控件-展示列
  {
    label: "点击ID",
    prop: "clickId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "合作商ID",
    prop: "typeId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "项目ID",
    prop: "projectId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "类型",
    prop: "type",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "说明",
    prop: "remark",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "变动前",
    prop: "beforeBalance",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "加减款",
    prop: "difference",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "变动后",
    prop: "afterBalance",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "时间",
    prop: "createTime",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
]);
// 加减款
const payments = [
  { label: "加款", value: 1 },
  { label: "减款", value: 2 },
];
// 类型
const paymentsType = [
  { label: "待审余额", value: 1 },
  { label: "可用余额", value: 2 },
];
const data = ref<any>({
  loading: false,
  activeName: "myFinancial",
  tableAutoHeight: false, // 表格是否自适应高度
  border: true, // 表格控件-是否展示边框
  stripe: true, // 表格控件-是否展示斑马条
  lineHeight: "default", // 表格控件-控制表格大小
  checkList: [],
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: "drawer" as "router" | "dialog" | "drawer",
  // 详情
  formModeProps: {
    visible: false,
    id: "",
  },
  // 搜索
  search: {
    page: 1,
    limit: 10,
    allocationTenantId: null,
    projectId: null,
    clickId: null,
    operationType: null,
    type: null,
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
  type: 1,
});
async function getDataList() {
  try {
    data.value.loading = true;
    const params = {
      ...getParams(),
      ...data.value.search,
    };
    if (data.value.type == 2) {
      //业绩合作商调用
      const res = await api.queryBeCompanyRecordQueryAmount(params);
      if (res && res.status === 1) {
        data.value.dataList = res.data && res.data.items ? res.data.items : [];
        pagination.value.total = res.data ? +res.data.total : 0;
      }
      data.value.loading = false;

    } else {
      const res = await api.queryCompanyRecordQueryAmount(params);
      if (res && res.status === 1) {
        data.value.dataList = res.data && res.data.items ? res.data.items : [];
        pagination.value.total = res.data ? +res.data.total : 0;
      }
      data.value.loading = false;

    }
  } catch (error) {
  } finally {
    data.value.loading = false;
  }
}
// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    page: 1,
    limit: 10,
    allocationTenantId: null,
    projectId: null,
    clickId: null,
    operationType: null,
    type: null,
  });
  getDataList();
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    data.value.search.limit = size;
    getDataList();
  });
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    data.value.search.page = page;
    getDataList();
  });
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDataList());
}

// 函数来格式化余额
const formatRemarkWithBalance = (remark: any) => {
  const match = remark.match(/[-+]?\d*\.?\d+/);
  if (match) {
    const balance = parseFloat(match[0]).toFixed(2);
    return remark.replace(match[0], balance); // 替换原余额
  }
  return remark; // 如果没有找到余额，返回原字符串
};

onMounted(() => {
  getDataList();
  if (data.value.formMode === "router") {
    eventBus.on("get-data-list", () => {
      getDataList();
    });
  }
  columns.value.forEach((item: any) => {
    if (item.checked) {
      data.value.checkList.push(item.prop);
    }
  });
  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "clickId",
      placeholder: "点击ID",
    },
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "allocationTenantId",
      placeholder: "合作商ID",
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "projectId",
      placeholder: "项目ID",
    },
    {
      index: 3,
      show: true,
      type: "select",
      modelName: "operationType",
      placeholder: "加减款",
      option: "operationType",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 4,
      show: true,
      type: "select",
      modelName: "type",
      placeholder: "类型",
      option: "type",
      optionLabel: "label",
      optionValue: "value",
    },
  ];
});
const formOption = {
  operationType: () => payments,
  type: () => paymentsType,
};
onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});
</script>
<!--      // <el-table-column align="left" type="selection" />
        // <ElTableColumn v-if="data.batch.enable" type="selection" show-overflow-tooltip align="left" fixed /> -->
<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange"
        @onReset="onReset" :model="data.search" :formOption="formOption" />
      <ElDivider border-style="dashed" />
      <el-row style="margin: 0 !important;">
        <FormLeftPanel />
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="data.border" v-model:tableAutoHeight="data.tableAutoHeight"
            v-model:checkList="data.checkList" v-model:columns="columns" v-model:line-height="data.lineHeight"
            v-model:stripe="data.stripe" style="margin-left: 12px" @query-data="getDataList" />
        </FormRightPanel>
      </el-row>
      <el-tabs v-model="data.type" @tab-change="getDataList">
        <el-tab-pane label="业绩(合作商)" :name="1"></el-tab-pane>
        <el-tab-pane label="业绩(我的)" :name="2"></el-tab-pane>
      </el-tabs>
      <ElTable v-loading="data.loading" :border="data.border" :size="data.lineHeight" :stripe="data.stripe" class="my-4"
        :data="data.dataList" highlight-current-row height="100%" style="min-height: 370px;" sort-change="sortChange"
        @selection-change="data.batch.selectionDataList = $event">

        <ElTableColumn v-if="data.checkList.includes('clickId')" show-overflow-tooltip align="left" prop="clickId"
          label="点击ID" width="200">
          <template #default="{ row }">
            <el-text class="fontColor">{{ row.clickId ? row.clickId : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('typeId')" show-overflow-tooltip align="left" prop="" label="合作商"
          width="200">
          <template #default="{ row }">
            <!-- <el-text v-if="row.typeId == 1" class="fontColor">内部调查站</el-text> -->
            <el-text class="fontColor">{{ row.allocationTenantId ? row.allocationTenantId : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('projectId')" show-overflow-tooltip align="left" prop="projectId"
          label="项目ID" width="200">
          <template #default="{ row }">
            <el-text class="fontColor">{{ row.projectId ? row.projectId : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('type')" show-overflow-tooltip align="left" prop="" label="类型">
          <template #default="{ row }">
            <el-tag v-if="row.type === 1" type="warning" effect="dark">待审余额</el-tag>
            <el-tag v-if="row.type === 2" type="primary" effect="dark">可用余额</el-tag>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('remark')" width="260" show-overflow-tooltip align="left"
          prop="remark" label="说明">
          <template #default="{ row }">
            <el-text class="mx-1 fontColor fontC-System">{{ row.remark ? row.remark : '-' }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('beforeBalance')" show-overflow-tooltip align="left"
          prop="beforeBalance" width="130" label="变动前" fixed="right">
          <template #default="{ row }">
            <svg v-if="row.currencyType === 'USD'" xmlns="http://www.w3.org/2000/svg" width="7" height="12"
              viewBox="0 0 7 12" fill="none">
              <path id="Vector"
                d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                fill="#333333" />
            </svg>
            <svg v-if="row.currencyType === 'CNY'" xmlns="http://www.w3.org/2000/svg" width="9" height="10"
              viewBox="0 0 9 10" fill="none">
              <path id="Vector"
                d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                fill="#333333" />
            </svg>
            <el-text class="fontColor">
              <CurrencyType v-if="!row.currencyType" />{{ row.beforeBalance || 0 }}
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('difference')" show-overflow-tooltip align="left" prop="difference"
          width="150" label="加减款" fixed="right"><template #default="{ row }">
            <p class="plus" v-if="row.operationType === 1">
            <div class="plusSpan i-majesticons:plus-line w-1em h-1em"></div>
            <el-text class="color3">
              <svg v-if="row.currencyType === 'USD'" xmlns="http://www.w3.org/2000/svg" width="7" height="12"
                viewBox="0 0 7 12" fill="none">
                <path id="Vector"
                  d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                  fill="#333333" />
              </svg>
              <svg v-if="row.currencyType === 'CNY'" xmlns="http://www.w3.org/2000/svg" width="9" height="10"
                viewBox="0 0 9 10" fill="none">
                <path id="Vector"
                  d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                  fill="#333333" />
              </svg>
              <CurrencyType v-if="!row.currencyType" />{{ Math.abs(row.difference) }}
            </el-text>
            </p>
            <p class="plus" v-if="row.operationType === 2">
            <div class="minusSign i-iconamoon:sign-minus-bold w-1em h-1em"></div>
            <el-text class="color3">
              <svg v-if="row.currencyType === 'USD'" xmlns="http://www.w3.org/2000/svg" width="7" height="12"
                viewBox="0 0 7 12" fill="none">
                <path id="Vector"
                  d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                  fill="#333333" />
              </svg>
              <svg v-if="row.currencyType === 'CNY'" xmlns="http://www.w3.org/2000/svg" width="9" height="10"
                viewBox="0 0 9 10" fill="none">
                <path id="Vector"
                  d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                  fill="#333333" />
              </svg>
              <CurrencyType v-if="!row.currencyType" />{{ Math.abs(row.difference) }}
            </el-text>
            </p>
            <!-- <el-text v-if="row.operationType === 2" type="danger" class="mx-1 ">-
              <CurrencyType /><el-text class="fontColor tableBig">{{ Math.abs(row.difference) }}</el-text>
            </el-text>
            <el-text v-else type="success" class="mx-1 ">
              +
              <CurrencyType /><el-text class="fontColor tableBig">{{ Math.abs(row.difference) }}</el-text>
            </el-text> -->
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('afterBalance')" show-overflow-tooltip align="left"
          prop="afterBalance" width="130" label="变动后" fixed="right">
          <template #default="{ row }">
            <svg v-if="row.currencyType === 'USD'" xmlns="http://www.w3.org/2000/svg" width="7" height="12"
              viewBox="0 0 7 12" fill="none">
              <path id="Vector"
                d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                fill="#333333" />
            </svg>
            <svg v-if="row.currencyType === 'CNY'" xmlns="http://www.w3.org/2000/svg" width="9" height="10"
              viewBox="0 0 9 10" fill="none">
              <path id="Vector"
                d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                fill="#333333" />
            </svg>
            <CurrencyType v-if="!row.currencyType" /><el-text class="fontColor">{{ row.afterBalance || 0 }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('createTime')" show-overflow-tooltip align="left" prop="createTime"
          label="时间" fixed="right"><template #default="{ row }">
            <el-tag effect="plain" type="info">{{ format(row.updateTime) }}</el-tag>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </ElTable>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  tbody {
    color: #333;
  }

  .plusSpan {
    margin-top: -4px;
    color: #03c239;
  }

  .minusSign {
    margin-top: -4px;
    color: #fd8989;
  }
}

/* 自定义标签背景 */
.el-tag--dark.el-tag--warning {
  background-color: #ffac54 !important;
}

.fontColor {
  color: #333333 !important;
}

.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }
  }
}

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
</style>
