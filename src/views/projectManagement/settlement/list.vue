<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import invoicingEdit from "./components/InvoicingEdit/index.vue";
import projectReview from "./components/ProjectReview/index.vue";
import settlementEdit from "./components/SettlementEdit/index.vue";
import refundDetail from "./components/RefundDetails/index.vue";
import Settlement from "./components/AddSettlement/index.vue";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import useUserCustomerStore from "@/store/modules/user_customer";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import api from "@/api/modules/project_settlement";

defineOptions({
  name: "settlement",
});

//国家
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
// 右侧工具栏配置变量
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
const border = ref(true);
const checkList = ref([]);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
const columns = ref([
  {
    label: "项目ID",
    prop: "ID",
    sortable: true,
    // 不可改变的
    disableCheck: true,
    checked: true,
  },
]);
const settlementStatusList = [
  { label: "待审核", value: 1 },
  { label: "已审核", value: 2 },
  { label: "已开票", value: 3 },
  { label: "已结算", value: 4 },
  { label: "已冻结", value: 5 },
];
// 时间类型
const timeArr = ref<any>([]);
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
  // 国家id
  countryId: "",
  // 创建人id
  createUserId: null,
  // 结算状态 1:待审核 2:已审核 3:已开票 4:已结算 5:已冻结
  settlementStatus: [],
  // 时间类型 1:待审核 2:已审核 3:已开票 4:巳结算 5:已冻结
  timeType: "",
  // 开始时间
  startTime: "",
  // 结束时间
  endTime: "",
});
// 表格数据
const list = ref<any>([]);
// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value;
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
  editRef.value.showEdit(JSON.stringify(row));
}
// 详情
function refundDetails(row: any) {
  refundRef.value.showEdit(JSON.stringify(row));
}
// 右侧工具
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
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
    // 国家id
    countryId: "",
    // 创建人id
    createUserId: null,
    // 结算状态 1:待审核 2:已审核 3:已开票 4:已结算 5:已冻结
    settlementStatus: [],
    // 时间类型 1:待审核 2:已审核 3:已开票 4:巳结算 5:已冻结
    timeType: "",
    // 开始时间
    startTime: "",
    // 结束时间
    endTime: "",
  });
  timeArr.value = [];
  countryData.value = [];
  fetchData();
}

// 获取选中国家
const selectChange = (val: any) => {
  // 将数组转换成字符串
  queryForm.countryId = val.join(",");
};
// 处理时间
const timeChange = () => {
  queryForm.startTime = timeArr.value[0];
  queryForm.endTime = timeArr.value[1];
};
// 具体的位置信息
const comCountryId = computed(() => (countryIdList: any) => {
  const lists = countryList.value
    .filter((item: any) => countryIdList.includes(item.id))
    .map((item: any) => item.chineseName);
  return lists;
});
async function fetchData() {
  listLoading.value = true;
  const { data } = await api.list(queryForm);
  list.value = data.projectSettlementList;
  pagination.value.total = +data.total;
  listLoading.value = false;
}
onMounted(async () => {
  countryList.value = await basicDictionaryStore.getCountry();
  customerList.value = await customerStore.getCustomerList();
  founderList.value = await tenantStaffStore.getStaff();
  fetchData();
});
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
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
    v-loading="listLoading"
  >
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form
            :model="queryForm"
            size="default"
            label-width="6.25rem"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model="queryForm.projectId"
                clearable
                placeholder="项目ID"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="queryForm.projectName"
                clearable
                placeholder="项目名称"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="queryForm.projectIdentification"
                clearable
                placeholder="项目标识"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <ElSelect
                v-model="countryData"
                placeholder="国家"
                clearable
                filterable
                multiple
                collapse-tags
                @change="selectChange"
              >
                <ElOption
                  v-for="item in countryList"
                  :label="item.chineseName"
                  :value="item.id"
                >
                </ElOption>
              </ElSelect>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                placeholder="客户简称"
                v-model="queryForm.customerId"
                clearable
              >
                <el-option
                  v-for="item in customerList"
                  :key="item.tenantCustomerId"
                  :value="item.tenantCustomerId"
                  :label="item.customerAccord"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                placeholder="结算状态"
                v-model="queryForm.settlementStatus"
                clearable
                filterable
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in settlementStatusList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-select
                placeholder="创建人"
                v-model="queryForm.createUserId"
                clearable
              >
                <el-option
                  v-for="item in founderList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                placeholder="时间类型"
                v-model="queryForm.timeType"
                clearable
              >
                <el-option
                  v-for="item in settlementStatusList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker
                v-model="timeArr"
                value-format="YYYY-MM-DD hh:mm:ss"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                size=""
                @change="timeChange"
              />
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
                  <SvgIcon
                    :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                  />
                </template>
                {{ fold ? "展开" : "收起" }}
              </ElButton>
            </ElFormItem>
          </el-form>
        </template>
      </SearchBar>
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
          <el-button size="default" @click=""> 导出 </el-button>
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
        v-loading="false"
        style="margin-top: 10px"
        row-key="id"
        :data="list"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column align="center" type="selection" />
        <!-- <el-table-column type="index" align="center" label="序号" width="55" /> -->
        <el-table-column
          show-overflow-tooltip
          prop="projectId"
          align="center"
          label="项目ID"
        />
        <el-table-column
          show-overflow-tooltip
          prop="projectName"
          align="center"
          label="项目名称"
        >
          <template #default="{ row }">
            {{ row.projectName ? row.projectName : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="customerName"
          align="center"
          label="客户简称/标识"
        >
          <template #default="{ row }">
            {{ row.customerName ? row.customerName : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="d"
          align="center"
          label="原价"
        >
          <template #default="{ row }">
            {{ row.projectAmount || 0 }}<CurrencyType />
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="e"
          align="center"
          label="所属国家"
        >
          <template #default="{ row }">
            <template v-if="row.countryId">
              <template v-if="row.countryId.length === 185">
                <el-link type="primary"
                  ><el-tag type="warning">全球</el-tag></el-link
                >
              </template>
              <template v-else-if="comCountryId(row.countryId).length > 4">
                <el-tag
                  v-if="comCountryId(row.countryId).length === 185"
                  type="success"
                  >全球</el-tag
                >
                <el-tooltip
                  v-else
                  class="box-item"
                  effect="dark"
                  :content="comCountryId(row.countryId).join(',')"
                  placement="top"
                >
                  <el-link type="primary"
                    ><el-tag type="success">{{
                      comCountryId(row.countryId).length
                    }}</el-tag></el-link
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
          show-overflow-tooltip
          prop="systemDone"
          align="center"
          label="系统完成数"
        />
        <el-table-column
          show-overflow-tooltip
          prop="settlementDone"
          align="center"
          label="结算完成数"
        />
        <el-table-column
          show-overflow-tooltip
          prop="settlementPo"
          align="center"
          label="结算PO号"
        >
          <template #default="{ row }">
            {{ row.settlementPo ? row.settlementPo : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="h"
          align="center"
          label="结算状态"
          ><template #default="{ row }">
            {{ settlementStatusList[row.status - 1].label }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="nodeTime"
          align="center"
          label="节点时间"
        >
          <template #default="{ row }">
            <el-text v-if="row.nodeTime === '[]'" class="mx-1">'-'</el-text>
            <el-text v-else class="mx-1"
              >{{ row.nodeTime[0] }}-{{ row.nodeTime[1] }}</el-text
            >
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="remark"
          align="center"
          label="备注"
        >
          <template #default="{ row }">
            {{ row.remark ? row.remark : "-" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
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
                type="primary"
                size="small"
                plain
                @click="handleMoreOperating('edit', row)"
              >
                结算编辑
              </el-button>
              <el-button
                type="primary"
                size="small"
                plain
                @click="handleMoreOperating('refundDetails', row)"
              >
                退款详情
              </el-button>
            </ElSpace>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
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
      <Settlement @success="fetchData" ref="addSettlementRef" />
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
</style>
