<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_preInvestigationRecords";
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import questionnaireDetails from "./components/questionnaireDetails/index.vue";
import empty from "@/assets/images/empty.png";
import { useI18n } from "vue-i18n"; // 国际化

const customerStore = useUserCustomerStore(); // 客户

defineOptions({
  name: "preInvestigationRecords",
});
const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination(); // 分页

const { t } = useI18n(); // 国际化
const listLoading = ref(false);
const list = ref<Array<Object>>([]); // 列表
const selectRows = ref(""); // 表格-选中行
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const border = ref(true); // 表格控件-是否展示边框
const stripe = ref(true); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-preInvestigationRecords"); // 表单排序name
const columns = ref([
  // 表格控件-展示列

  {
    prop: "projectId",
    label: computed(() => t("preRecords.projectID")),
    sortable: true,
    checked: true,
  },
  {
    prop: "projectName",
    label: computed(() => t("preRecords.projectName")),
    sortable: true,
    checked: true,
  },
  {
    prop: "allocationType",
    label: computed(() => t("preRecords.allocationType")),
    sortable: true,
    checked: true,
  },
  {
    prop: "passNumber",
    label: computed(() => t("preRecords.number")),
    sortable: true,
    checked: true,
  },
  {
    prop: "passRate",
    label: computed(() => t("preRecords.throughRate")),
    sortable: true,
    checked: true,
  },
]);
const queryForm = reactive<any>({
  // memberId: "", // 	会员id
  // memberGroupId: "", // 	会员组id
  projectId: "", // 	项目id
  projectName: "", // 	项目名称-模糊查询
  allocationType: [], //分配类型
  // customerId: "", // 	客户Id
  // ip: "", // 	ip-模糊查询
  // surveyStatus: "", // 调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
});

const questionnaireDetailsRef = ref<any>();
const data = reactive<any>({
  // 分配类型
  allocationTypeList: [
    computed(() => t("preRecords.undistributed")),
    computed(() => t("preRecords.supplier")),
    computed(() => t("preRecords.internalStation")),
  ],
  // 调查状态
  surveyStatusList: ["完成", "被甄别", "配额满", "安全终止", "未完成"],
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
    // 如果不存在，就新增该元素
    data.expandedRows.push(row.id);
  }
  if (!row.children) {
    const res = await api.childList({ projectId: row.projectId });
    row.children = res.data.projectScreenMemberChildInfoList;
  }
}

// 打开弹框
function showEdit(row: any) {
  questionnaireDetailsRef.value.showEdit(row);
}

const DataList: any = computed(() => {

  const filterData = list.value.filter((item: any) => {
    const isProjectId = queryForm.projectId
      ? item.projectId == queryForm.projectId
      : true;
    const isProjectName = queryForm.projectName
      ? item.projectName == queryForm.projectName
      : true;
    const isAllocationType = queryForm.allocationType ? item.allocationType == queryForm.allocationType : true;
    return (
      isProjectId &&
      isProjectName &&
      isAllocationType
    );
    // if (
    //   item.projectId.includes(queryForm.projectId) ||
    //   item.projectName.includes(queryForm.projectName) ||
    //   queryForm.allocationType === item.allocationType
    // ) {
    //   return true;
    // } else {
    //   return false;
    // }
  });

  const startIndex = (pagination.value.page - 1) * pagination.value.size;
  const endIndex = startIndex + pagination.value.size;
  pagination.value.total = filterData.length;
  return filterData.slice(startIndex, endIndex);
  // return filterData.slice(
  //   (pagination.value.page - 1) * pagination.value.size,
  //   pagination.value.page * pagination.value.size,
  // );
});
// 请求
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm,
    };
    const { data, status } = await api.list(params);
    if (data && status === 1) {
      list.value = data.projectSurveyScreenInfoList;
      pagination.value.total = data.projectSurveyScreenInfoList.length;
    }
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
    // memberId: "", // 	会员id
    // memberGroupId: "", // 	会员组id
    projectId: "", // 	项目id
    projectName: "", // 	项目名称-模糊查询
    allocationType: "", //分配类型
    // customerId: "", // 	客户Id
    // ip: "", // 	ip-模糊查询
    // surveyStatus: "", // 调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
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
  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "projectId",
      placeholder: computed(() => t("preRecords.projectID")),
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "projectName",
      placeholder: computed(() => t("preRecords.projectName")),
    },
    {
      index: 3,
      show: true,
      type: "select",
      modelName: "allocationType",
      placeholder: computed(() => t("preRecords.allocationType")),
      option: "allocationType",
      optionLabel: "label",
      optionValue: "value",
      multiple: true,
    },
  ];
});
const formOption = {
  allocationType: () =>
    data.allocationTypeList.map((item: any, index: any) => ({
      label: item,
      value: index + 1,
    })),
};
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <!-- <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="queryForm"  :formOption="formOption"/> -->
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
            <ElFormItem>
              <ElInput
                v-model="queryForm.projectId"
                :placeholder="t('preRecords.projectID')"
                clearable
                @keydown.enter="DataList"
                @clear="DataList"
              />
            </ElFormItem>
            <ElFormItem>
              <ElInput
                v-model="queryForm.projectName"
                :placeholder="t('preRecords.projectName')"
                clearable
                @keydown.enter="DataList"
                @clear="DataList"
              />
            </ElFormItem>
            <ElFormItem>
              <el-select
                v-model="queryForm.allocationType"
                value-key=""
                :placeholder="t('preRecords.allocationType')"
                clearable
                filterable
              >
                <el-option
                  v-for="(item, index) in data.allocationTypeList"
                  :key="item"
                  :label="item"
                  :value="index + 1"
                />
              </el-select>
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" @click="fetchData">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                {{ t("preRecords.sift") }}
              </ElButton>
              <ElButton @click="onReset">
                <template #icon>
                  <div class="i-grommet-icons:power-reset h-1em w-1em" />
                </template>
                {{ t("preRecords.reset") }}
              </ElButton>
              <ElButton link @click="toggle">
                <template #icon>
                  <SvgIcon
                    :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                  />
                </template>
                {{ fold ? t("preRecords.expand") : t("preRecords.collapse") }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel />
        <FormRightPanel>
          <el-button size="default"> {{ t("preRecords.export") }} </el-button>
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
        :data="DataList"
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
                align="left"
              >
                <template #default="scope">
                 <div style="padding-left: 20px;">
                  <el-text class="fontC-System">
                    {{ scope.row.memberChildName }}
                  </el-text>
                  <br />
                  <el-text
                    v-show="scope.row.randomIdentityId"
                    type="danger"
                    class="fontC-System"
                    >随机id:{{ scope.row.randomIdentityId }}</el-text
                  >
                 </div>
                </template>
              </el-table-column>
              <ElTableColumn prop="status" label="状态" align="left">
                <template #default="scope">
                  <el-text
                    v-if="scope.row.status === 1"
                    type="success"
                    class="fontC-System"
                    >前置问卷通过</el-text
                  >
                  <el-text v-else type="danger" class="fontC-System"
                    >前置问卷未通过</el-text
                  >
                </template>
              </ElTableColumn>
              <ElTableColumn
                width="200"
                align="left"
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
          align="left"
          prop="projectId"
          show-overflow-tooltip
          :label="t('preRecords.projectID')"
        ></el-table-column>
        <el-table-column
          v-if="checkList.includes('projectName')"
          align="left"
          prop="projectName"
          show-overflow-tooltip
          :label="t('preRecords.projectName')"
        >
          <template #default="{ row }">
            <div class="tableBig">
              {{ row.projectName }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('allocationType')"
          align="left"
          show-overflow-tooltip
          width="100"
          :label="t('preRecords.allocationType')"
        >
          <template #default="{ row }">
            <!-- <el-button  size="small" v-if="row.allocationType === 3" type="primary" class="tableBut">会员组</el-button>
            <el-button  size="small" v-if="row.allocationType === 2"   type="danger" class="tableBut">供应商</el-button>
            <el-button  size="small" v-if="row.allocationType === 1" class="tableBut">未分配</el-button> -->

            <el-tag
              effect="plain"
              type="info"
              v-if="row.allocationType === 1"
              class="mx-1"
              >{{ t("preRecords.undistributed") }}</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #fb6868; border: none"
              v-if="row.allocationType === 2"
              class="mx-1"
              type="primary"
              >{{ t("preRecords.supplier") }}</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #05c9be; border: none"
              v-if="row.allocationType === 3"
              class="mx-1"
              type="warning"
              >{{ t("preRecords.internalStation") }}</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #ffac54; border: none"
              v-if="row.allocationType === 4"
              class="mx-1"
              type="warning"
              >{{ t("preRecords.partner") }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('passNumber')"
          align="left"
          show-overflow-tooltip
          :label="t('preRecords.number')"
        >
          <template #default="{ row }">
            {{ row.passNumber || 0 }}/
            {{ row.submitNumber || 0 }}
          </template>
        </el-table-column>
        <ElTableColumn
          v-if="checkList.includes('passRate')"
          align="left"
          show-overflow-tooltip
          prop="passRate"
          :label="t('preRecords.throughRate')"
        >
          <template #default="{ row }">
            {{ row.passRate.toFixed(2) + "%" }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          align="left"
          show-overflow-tooltip
          prop=""
          fixed="right"
          :label="t('preRecords.control')"
          width="200"
        >
          <template #default="{ row }">
            <el-button
              plain
              type="primary"
              size="small"
              @click="getChildList(row)"
            >
              {{ data.expandedRows.includes(row.id) ? "收起" : "展开" }}
            </el-button>
          </template>
        </ElTableColumn>
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

    <questionnaireDetails ref="questionnaireDetailsRef"></questionnaireDetails>
  </div>
</template>

<style scoped lang="scss">
.tableBut {
  width: 3.75rem;
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

// 表格
:deep {
  tbody {
    color: #333333;
    // font-weight: 700;
  }
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
