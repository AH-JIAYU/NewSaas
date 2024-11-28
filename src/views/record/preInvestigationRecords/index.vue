<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_preInvestigationRecords";
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import questionnaireDetails from "./components/questionnaireDetails/index.vue";
import empty from '@/assets/images/empty.png'

const customerStore = useUserCustomerStore(); // 客户

defineOptions({
  name: "preInvestigationRecords",
});
const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination(); // 分页

const listLoading = ref(false);
const list = ref<Array<Object>>([]); // 列表
const selectRows = ref(""); // 表格-选中行
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const border = ref(false); // 表格控件-是否展示边框
const stripe = ref(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const formSearchList = ref<any>()//表单排序配置
const formSearchName=ref<string>('formSearch-preInvestigationRecords')// 表单排序name
const columns = ref([
  // 表格控件-展示列

  { prop: "projectId", label: "项目ID", sortable: true, checked: true },
  {
    prop: "projectName",
    label: "项目名称",
    sortable: true,
    checked: true,
  },
  { prop: "allocationType", label: "分配类型", sortable: true, checked: true },
  { prop: "passNumber", label: "通过数/提交数", sortable: true, checked: true },
  { prop: "passRate", label: "通过率", sortable: true, checked: true },
]);
const queryForm = reactive<any>({
  // memberId: "", // 	会员id
  // memberGroupId: "", // 	会员组id
  projectId: "", // 	项目id
  projectName: "", // 	项目名称-模糊查询
  allocationType: "",//分配类型
  // customerId: "", // 	客户Id
  // ip: "", // 	ip-模糊查询
  // surveyStatus: "", // 调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
});

const questionnaireDetailsRef = ref<any>();
const data = reactive<any>({
  // 分配类型
  allocationTypeList: ["未分配", "供应商", "内部站"],
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

function showEdit(row: any) {
  questionnaireDetailsRef.value.showEdit(row);
}
const DataList = computed(() => {
  const filterData = list.value.filter((item: any) => {
    if (item.projectId.includes(queryForm.projectId) && item.projectName.includes(queryForm.projectName) && (!queryForm.allocationType || item.allocationType === queryForm.allocationType)) return true
  })
  return filterData.slice(
    (pagination.value.page - 1) * pagination.value.size,
    pagination.value.page * pagination.value.size
  );
});
// 请求
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm,
    };
    const { data } = await api.list(params);
    list.value = data.projectSurveyScreenInfoList;
    pagination.value.total = data.projectSurveyScreenInfoList.length;
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
    allocationType: '',//分配类型
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
    { index: 1, show: true, type: 'input', modelName: 'projectId', placeholder: '项目ID' },
    { index: 2, show: true, type: 'input', modelName: 'projectName', placeholder: '项目名称' },
    { index: 3, show: true, type: 'select', modelName: 'allocationType', placeholder: '分配类型',
      option: 'allocationType',
      optionLabel: 'label', optionValue: 'value',// multiple:true,
    },
];
});
const formOption={
  allocationType:()=> data.allocationTypeList.map((item:any, index:any) => ({ label: item, value: index + 1 }))
}
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="queryForm"  :formOption="formOption"/>
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
      <el-table v-loading="listLoading" :border="border" :data="DataList" :size="lineHeight" :stripe="stripe"
        row-key="id" :expand-row-keys="data.expandedRows" @expand-change="getChildList">
        <el-table-column type="expand" width="55">
          <template #default="scopeCountry">
            <el-table :data="scopeCountry.row.children" highlight-current-row class="hide-table-header" border
              height="100%">
              <el-table-column width="55" />
              <el-table-column width="300" prop="memberChildName" label="名称+ID" align="left">
                <template #default="scope">
                  <el-text class="fontC-System">
                    {{ scope.row.memberChildName }}
                  </el-text>
                  <br />
                  <el-text v-show="scope.row.randomIdentityId" type="danger" class="fontC-System">随机id:{{ scope.row.randomIdentityId
                    }}</el-text>
                </template>
              </el-table-column>
              <ElTableColumn prop="status" label="状态" align="left">
                <template #default="scope">
                  <el-text v-if="scope.row.status === 1" type="success" class="fontC-System">前置问卷通过</el-text>
                  <el-text v-else type="danger" class="fontC-System">前置问卷未通过</el-text>
                </template>
              </ElTableColumn>
              <ElTableColumn width="200" align="left" fixed="right" label="操作">
                <template #default="scope">
                  <ElButton type="primary" size="small" plain @click="showEdit(scope.row)">
                    查看问卷详情
                  </ElButton>
                </template>
              </ElTableColumn>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column width="300" v-if="checkList.includes('projectId')" align="left" prop="projectId"
          show-overflow-tooltip label="项目ID" />
        <el-table-column v-if="checkList.includes('projectName')" align="left" prop="projectName"
          show-overflow-tooltip label="项目名称" >
          <template #default="{ row }">
            <div class="tableBig">
              {{ row.projectName }}
              </div>
              </template>
              </el-table-column>



        <el-table-column v-if="checkList.includes('allocationType')" align="left" show-overflow-tooltip width="100"
          label="分配类型">
          <template #default="{ row }">
            <!-- <el-button  size="small" v-if="row.allocationType === 3" type="primary" class="tableBut">会员组</el-button>
            <el-button  size="small" v-if="row.allocationType === 2"   type="danger" class="tableBut">供应商</el-button>
            <el-button  size="small" v-if="row.allocationType === 1" class="tableBut">未分配</el-button> -->

            <el-tag effect="plain" type="info" v-if="row.allocationType === 1"
              class="mx-1">未分配</el-tag>
            <el-tag effect="dark" style="background-color: #fb6868; border: none" v-if="row.allocationType === 2"
              class="mx-1" type="primary">供应商</el-tag>
            <el-tag effect="dark" style="background-color: #05c9be; border: none" v-if="row.allocationType === 3"
              class="mx-1" type="warning">内部站</el-tag>
            <el-tag effect="dark" style="background-color: #ffac54; border: none" v-if="row.allocationType === 4"
              class="mx-1" type="warning">合作商</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('passNumber')" align="left" show-overflow-tooltip label="通过数/提交数">
          <template #default="{ row }">
            {{ row.passNumber || 0 }}/
            {{ row.submitNumber || 0 }}
          </template>
        </el-table-column>
        <ElTableColumn v-if="checkList.includes('passRate')" align="left" show-overflow-tooltip prop="passRate"
          label="通过率">
          <template #default="{ row }">
            {{ row.passRate + "%" }}
          </template>
        </ElTableColumn>
        <ElTableColumn align="left" show-overflow-tooltip prop="" fixed="right" label="操作" width="200">
          <template #default="{ row }">
            <el-button plain type="primary" size="small" @click="getChildList(row)">
              {{ data.expandedRows.includes(row.id) ? "收起" : "展开" }}
            </el-button>
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

    tbody>tr:nth-last-of-type(1) {
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
