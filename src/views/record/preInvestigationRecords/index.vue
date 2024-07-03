<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_preInvestigationRecords";
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import questionnaireDetails from "./components/questionnaireDetails/index.vue";

const customerStore = useUserCustomerStore(); // 客户

defineOptions({
  name: "RecordSurveyIndex",
});
const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination(); // 分页

const listLoading = ref(false);
const list = ref<Array<Object>>([]); // 列表
const selectRows = ref(""); // 表格-选中行
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const border = ref(true); // 表格控件-是否展示边框
const stripe = ref(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const columns = ref([
  // 表格控件-展示列

  { prop: "projectId", label: "项目id", sortable: true, checked: true },
  {
    prop: "projectName",
    label: "项目名称/客户简称",
    sortable: true,
    checked: true,
  },
  { prop: "allocationType", label: "分配类型", sortable: true, checked: true },
  { prop: "passNumber", label: "通过数/提交数", sortable: true, checked: true },
  { prop: "passRate", label: "通过率", sortable: true, checked: true },
]);
const queryForm = reactive<any>({
  memberId: "", // 	会员id
  memberGroupId: "", // 	会员组id
  projectId: "", // 	项目id
  projectName: "", // 	项目名称-模糊查询
  customerId: "", // 	客户Id
  ip: "", // 	ip-模糊查询
  surveyStatus: "", // 调查状态:1 C=完成/待审核 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
});

const questionnaireDetailsRef = ref<any>();
const data = reactive<any>({
  // 分配类型
  allocationTypeList: ["未分配", "供应商", "会员组"],
  // 调查状态
  surveyStatusList: ["完成/待审核", "被甄别", "配额满", "安全终止", "未完成"],
  // 副状态
  viceStatusList: [
    "待审",
    "免审",
    "过IR",
    "时间果断",
    "超时完成",
    "超量完成",
    "审核成功",
    "审核失败",
    "数据冻结",
    "时间段过载",
    "ip不一致",
    "id重复参与",
  ],
  //客户列表
  customerList: [],
  // 会员
  vipList: [],
  // 会员组
  vipGroupList: [],
  // 供应商
  tenantSupplierList: [],
  //展开行
  expandedRows: [],
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
// 展开
async function getChildList(row: any) {
  const index = data.expandedRows.indexOf(row.id);
  if (index !== -1) {
    // 如果存在，就删除该元素
    data.expandedRows.splice(index, 1);
  } else {
    // 如果不存在，就添加该元素
    data.expandedRows.push(row.id);
  }
  if (!row.children) {
    const res = await api.childList({ projectId: row.projectId });
    row.children = res.data.projectScreenMemberChildInfoList;
  }
}

function showEdit(row: any) {
  questionnaireDetailsRef.value.showEdit(row);
}
// 请求
async function fetchData() {
  listLoading.value = true;
  const params = {
    ...getParams(),
    ...queryForm,
  };
  const { data } = await api.list(params);
  list.value = data.projectSurveyScreenInfoList;
  pagination.value.total = data.total;
  listLoading.value = false;
}
// 表格-单选框
function setSelectRows(val: string) {
  selectRows.value = val;
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    memberId: "", // 	会员id
    memberGroupId: "", // 	会员组id
    projectId: "", // 	项目id
    projectName: "", // 	项目名称-模糊查询
    customerId: "", // 	客户Id
    ip: "", // 	ip-模糊查询
    surveyStatus: "", // 调查状态:1 C=完成/待审核 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
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
          <ElForm
            :model="queryForm"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.memberId"
                clearable
                :inline="false"
                placeholder="会员ID"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.memberGroupId"
                clearable
                :inline="false"
                placeholder="会员ID"
              />
            </el-form-item>

            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.projectId"
                clearable
                :inline="false"
                placeholder="项目ID"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.name"
                clearable
                :inline="false"
                placeholder="项目名称"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.projectName"
                clearable
                placeholder="客户简称"
              >
                <el-option
                  v-for="item in data.customerList"
                  :key="item.tenantCustomerId"
                  :value="item.tenantCustomerId"
                  :label="item.customerAccord"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.ip"
                clearable
                :inline="false"
                placeholder="IP地址"
              />
            </el-form-item>

            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.surveyStatus"
                clearable
                placeholder="调查状态"
              >
                <el-option
                  v-for="(item, index) in data.surveyStatusList"
                  :label="item"
                  :value="index + 1"
                ></el-option>
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
                  <SvgIcon
                    :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                  />
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
        row-key="id"
        :expand-row-keys="data.expandedRows"
        @expand-change="getChildList"
      >
        <el-table-column type="expand" width="55">
          <template #default="scopeCountry">
            <el-table
              :data="scopeCountry.row.children"
              highlight-current-row
              class="hide-table-header"
              border
              height="100%"
            >
              <el-table-column width="55" />
              <el-table-column
                width="300"
                prop="memberChildName"
                label="名称+ID"
                align="center"
              >
              </el-table-column>
              <ElTableColumn prop="status" label="状态" align="center">
                <template #default="scope">
                  <el-text v-if="scope.row.status === 1" type="success"
                    >前置问卷通过</el-text
                  >
                  <el-text v-else type="danger">前置问卷未通过</el-text>
                </template>
              </ElTableColumn>
              <ElTableColumn
                width="200"
                align="center"
                fixed="right"
                label="操作"
              >
                <template #default="scope">
                  <ElButton
                    type="primary"
                    size="small"
                    plain
                    @click="showEdit(scope.row)"
                  >
                    查看问卷详情
                  </ElButton>
                </template>
              </ElTableColumn>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column
          width="300"
          v-if="checkList.includes('projectId')"
          align="center"
          prop="projectId"
          show-overflow-tooltip
          label="项目ID"
        />
        <el-table-column
          v-if="checkList.includes('projectName')"
          align="center"
          prop="projectName"
          show-overflow-tooltip
          label="项目名称/客户简称"
        />
        <el-table-column
          v-if="checkList.includes('allocationType')"
          align="center"
          show-overflow-tooltip
          label="分配类型"
        >
          <template #default="{ row }">
            {{ data.allocationTypeList[row.allocationType - 1] }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('passNumber')"
          align="center"
          show-overflow-tooltip
          label="通过数/提交数"
        >
          <template #default="{ row }">
            {{ row.passNumber || 0 }}/
            {{ row.submitNumber || 0 }}
          </template>
        </el-table-column>
        <ElTableColumn
          v-if="checkList.includes('passRate')"
          align="center"
          show-overflow-tooltip
          prop="passRate"
          label="通过率"
        />
        <ElTableColumn
          align="center"
          show-overflow-tooltip
          prop=""
          label="操作"
          width="200"
        >
          <template #default="{ row }">
            <el-button
              plain
              type="primary"
              size="small"
              @click="getChildList(row)"
            >
              展开
            </el-button>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty class="vab-data-empty" description="暂无数据" />
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

    <questionnaireDetails ref="questionnaireDetailsRef"></questionnaireDetails>
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
// 表格
:deep {
  .hide-table-header thead {
    display: none !important;
  }
  td:has(> .hide-table-header) {
    padding: 0 !important;
    border: none;
    tbody > tr:nth-last-of-type(1) {
      td {
        border-bottom: none !important;
      }
    }
    .el-table--border .el-table__inner-wrapper:after {
      height: 0;
    }
    .el-table--border:after {
      width: 0;
    }
  }
}
</style>
