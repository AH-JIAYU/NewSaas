<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_termination";
import empty from "@/assets/images/empty.png";
defineOptions({
  name: "termination",
});

const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
// 时间
const { format } = useTimeago();
const listLoading = ref(false);
const list = ref<Array<Object>>([]); // 列表
const selectRows = ref(""); // 表格-选中行
const checkList = ref<Array<Object>>([]); // 表格-展示的列

const border = ref(false); // 表格控件-是否展示边框
const stripe = ref(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-termination"); // 表单排序name
const columns = ref([
  // 表格控件-展示列
  { label: "会员", prop: "surveySource", sortable: true, checked: true },
  {
    label: "会员ID",
    prop: "memberChildId",
    sortable: true,
    checked: true,
  },
  {
    label: "子会员ID",
    prop: "supplierMemberChildId",
    sortable: true,
    checked: true,
  },
  {
    label: "供应商ID",
    prop: "tenantSupplierId",
    sortable: true,
    checked: true,
  },
  { label: "项目ID", prop: "projectId", sortable: true, checked: true },
  {
    label: "项目名称",
    prop: "projectName",
    sortable: true,
    checked: true,
  },
  { label: "IP/所属国", prop: "ipBelong", sortable: true, checked: true },
  { label: "说明", prop: "notes", sortable: true, checked: true },
  { label: "终止时间", prop: "terminationTime", sortable: true, checked: true },
]);
// 会员类型
const memberType = [
  { label: "内部会员", value: 1 },
  { label: "外部会员", value: 2 },
];
const queryForm = ref<any>({
  // 请求接口携带参数
  time: [],
  beginTime: "", //开始时间
  endTime: "", //结束时间
  surveySource: "", //会员类型
  projectId: "", //项目Id
  tenantSupplierId: "", //	供应商id
  projectName: "", //	项目名称
  ipBelong: "", //	ip/所属国
});

// 重置请求
function queryData() {
  pagination.value.page = 1;
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
      ...queryForm.value,
    };
    if (queryForm.value.time && !!queryForm.value.time.length) {
      params.beginTime = queryForm.value.time[0] || "";
      params.endTime = queryForm.value.time[1] || "";
    }
    delete params.time
    const res = await api.list(params);
    list.value = res.data.projectTerminationScreenDetailInfoList;
    pagination.value.total = res.data.total;
    listLoading.value = false;
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm.value, {
    beginTime: "", //开始时间
    endTime: "", //结束时间
    surveySource: "", //会员类型
    projectId: "", //项目Id
    tenantSupplierId: "", //	供应商id
    projectName: "", //	项目名称
    ipBelong: "", //	ip/所属国
    time: [],
  });
  fetchData();
}
// 表格-单选框
function setSelectRows(val: string) {
  selectRows.value = val;
}
onMounted(() => {
  columns.value.forEach((item) => {
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
      modelName: "tenantSupplierId",
      placeholder: "供应商ID",
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
      modelName: "surveySource",
      placeholder: "会员类型",
      option: "surveySource",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 4,
      show: true,
      type: "input",
      modelName: "projectName",
      placeholder: "项目名称",
    },
    {
      index: 5,
      show: true,
      type: "input",
      modelName: "ipBelong",
      placeholder: "IP/所属国",
    },
    {
      index: 6,
      show: true,
      type: "datetimerange",
      modelName: "time",
      startPlaceHolder: "创建开始日期",
      endPlaceHolder: "创建结束日期",
    },
  ];
});
const formOption = {
  surveySource: () => memberType,
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
        highlight-current-row
        @current-change="handleCurrentChange"
        @selection-change="setSelectRows"
      >
        <el-table-column align="left" type="selection" />

        <el-table-column
          v-if="checkList.includes('surveySource')"
          align="left"
          prop="surveySource"
          show-overflow-tooltip
          width="120"
          label="会员"
          ><template #default="{ row }">
            <el-button
              class="p-1"
              size="small"
              v-if="row.surveySource === 1"
              type="primary"
              >内部会员</el-button
            >
            <el-button
              class="p-1"
              size="small"
              v-if="row.surveySource === 2"
              type="warning"
              >外部会员</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectName')"
          align="left"
          prop="projectName"
          show-overflow-tooltip
          label="项目名称"
        >
          <template #default="{ row }">
            <div class="tableBig oneLine">
              {{ row.projectName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectId')"
          align="left"
          prop="projectId"
          width="180"
          label="项目ID"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine projectId">
                <el-tooltip
                  effect="dark"
                  :content="row.projectId"
                  placement="top-start"
                >
                  {{ row.projectId }}
                </el-tooltip>

                <!-- {{ row.projectId }} -->
              </div>
              <copy
                :content="row.projectId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
              <!-- <copy class="copy" :content="row.projectId" /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberChildId')"
          align="left"
          prop=""
          width="180"
          show-overflow-tooltip
          label="会员ID"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine projectId" v-if="row.peopleType === 1">
                <!-- {{ row.memberChildId }} -->
                <el-tooltip
                  effect="dark"
                  :content="row.memberChildId"
                  placement="top-start"
                >
                  {{ row.memberChildId }}
                </el-tooltip>
              </div>
              <copy
                :content="row.memberChildId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
              <!-- <copy class="copy" :content="row.memberChildId" /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('supplierMemberChildId')"
          align="left"
          prop=""

          width="180"
          label="子会员ID"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine projectId">
                <el-text v-if="row.peopleType !== 1">
                  <el-tooltip
                  effect="dark"
                  :content="row.memberChildId"
                  placement="top-start"
                >
                  {{ row.memberChildId }}
                </el-tooltip>
                  <!-- ID: {{ row.memberChildId }} -->
                </el-text>
                <el-text v-else> - </el-text>
              </div>

              <copy
                 v-if="row.peopleType !== 1"
                :content="row.memberChildId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
              <!-- <copy
                v-if="row.peopleType !== 1"
                class="copy"
                :content="row.memberChildId"
              /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('tenantSupplierId')"
          align="left"
          prop="tenantSupplierId"
          width="180"
          show-overflow-tooltip
          label="供应商ID"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine projectId">
                <el-text v-if="row.tenantSupplierId">
                  <el-tooltip
                  effect="dark"
                  :content="row.tenantSupplierId"
                  placement="top-start"
                >
                  {{ row.tenantSupplierId }}
                </el-tooltip>
                  <!-- {{ row.memberChildId }} -->
                </el-text>
                <el-text v-else> - </el-text>
              </div>
              <copy
              v-if="row.tenantSupplierId"
                :content="row.tenantSupplierId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
              <!-- <copy
                class="copy"
                :content="row.tenantSupplierId"
                v-if="row.tenantSupplierId"
              /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('ipBelong')"
          align="left"
          prop="ipBelong"
          show-overflow-tooltip
          label="IP/所属国"
          width="220"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine projectId">
                <el-tag type="primary">
                  {{ row.ipBelong.split("/")[1] }}
                </el-tag>
                {{ row.ipBelong.split("/")[0] }}
              </div>
              <copy

                :content="row.ipBelong.split('/')[0]"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
              <!-- <copy class="copy" :content="row.ipBelong.split('/')[0]" /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('terminationTime')"
          label="终止时间"
          align="left"
          prop="terminationTime"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <el-tooltip :content="row.terminationTime" placement="top">
              <el-tag effect="plain" type="info">{{ format(row.terminationTime) }}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('notes')"
          align="left"
          prop="notes"
          show-overflow-tooltip
          width="280"
          label="说明"
        >
          <template #default="{ row }">
            <div class="fontC-System oneLine">
              {{ row.notes }}
            </div>
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
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.copyId .projectId {
  font-size: .875rem;
}
.copyId .current {
  display: block !important;
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

.flex-s {
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

.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
