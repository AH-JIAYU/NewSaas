<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_callback";
import empty from '@/assets/images/empty.png'
defineOptions({
  name: "callback",
});

const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
// 时间
const { format } = useTimeago()
const listLoading = ref(false);
const list = ref<Array<Object>>([]); // 列表
const selectRows = ref(""); // 表格-选中行
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const border = ref(false); // 表格控件-是否展示边框
const stripe = ref(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const formSearchList = ref<any>()//表单排序配置
const formSearchName=ref<string>('formSearch-callback')// 表单排序name
const columns = ref([
  // 表格控件-展示列
  {
    prop: "projectQuestionnaireClickId",
    label: "点击ID",
    sortable: true,
    checked: true,
  },
  { label: "会员类型", prop: "surveySource", sortable: true, checked: true },
  {
    prop: "customerShortName",
    label: "客户简称",
    sortable: true,
    checked: true,
  },
  { prop: "memberChildId", label: "子会员ID/会员ID", sortable: true, checked: true },
  { prop: "projectId", label: "项目ID", sortable: true, checked: true },
  { prop: "projectName", label: "项目名称", sortable: true, checked: true },
  { prop: "callbackUrl", label: "回调URL", sortable: true, checked: true },
  { prop: "subordinateUrl", label: "下级URL", sortable: true, checked: true },
  { prop: "callbackTime", label: "回调时间", sortable: true, checked: true },
]);
// 会员类型
const memberType = [
  { label: "内部", value: 1 },
  { label: "外部", value: 2 },
];
const queryForm = reactive<any>({
  // 请求接口携带参数
  time: [],
  beginTime: "", //	开始时间
  endTime: "", //	结束时间
  surveySource: "", //	会员类型
  projectId: "", //项目Id
  projectName: "", //	项目名称
  memberChildId: "", //	子会员id/会员id
  tenantSupplierId: "", //	供应商id
});

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 重置请求
function queryData() {
  pagination.value.page = 1;
  fetchData();
}
// 请求
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm,
    };
    if (queryForm.time && !!queryForm.time.length) {
      params.beginTime = queryForm.time[0] || "";
      params.endTime = queryForm.time[1] || "";
    }
    const res = await api.list(params);
    list.value = res.data.customerCallbackRecordInfoList;
    pagination.value.total = res.data.total;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    time: [],
    beginTime: "", //	开始时间
    endTime: "", //	结束时间
    surveySource: "", //会员类型
    projectId: "", //项目Id
    projectName: "", //	项目名称
    memberChildId: "", //	子会员id/会员id
    tenantSupplierId: "", //	供应商id
  });
  fetchData();
}
// 表格-单选框
function setSelectRows(val: string) {
  selectRows.value = val;
}
onMounted(async () => {
  columns.value.forEach((item) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
  formSearchList.value = [
    {index: 1, show: true, type: 'input', modelName: 'tenantSupplierId', placeholder: '供应商ID'},
    {index: 2, show: true, type: 'input', modelName: 'projectId', placeholder: '项目ID'},
    {index: 3, show: true, type: 'input', modelName: 'projectQuestionnaireClickId', placeholder: '点击ID'},
    {index: 4, show: true, type: 'select', modelName: 'surveySource', placeholder: '会员类型', option: 'surveySource', optionLabel: 'label', optionValue: 'value'},
    {index: 5, show: true, type: 'input', modelName: 'projectName', placeholder: '项目名称'},
    {index: 6, show: true, type: 'input', modelName: 'memberChildId', placeholder: '子会员ID/会员ID'},
    {index: 7, show: true, type: 'datetimerange', modelName: 'time', startPlaceHolder: "创建开始日期", endPlaceHolder: "创建结束日期"}
]
});
const formOption={
  surveySource:()=> memberType
}
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="queryForm"  :formOption="formOption" />
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
        <el-table-column align="left" type="selection" />
        <el-table-column v-if="checkList.includes('projectQuestionnaireClickId')" align="left"
          prop="projectQuestionnaireClickId" show-overflow-tooltip label="点击ID">
          <template #default="{ row }">
            {{
    row.projectQuestionnaireClickId
      ? row.projectQuestionnaireClickId
      : "-"
  }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('customerShortName')" align="left" prop="surveySource"
          show-overflow-tooltip label="会员类型" width="100"><template #default="{ row }">
            {{ memberType[row.surveySource - 1].label }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('customerShortName')" align="left" prop="customerShortName"
          show-overflow-tooltip label="客户简称" />
        <el-table-column v-if="checkList.includes('memberChildId')" align="left" show-overflow-tooltip
          label="子会员ID/会员ID">
          <template #default="{ row }">
            {{ row.memberChildId }} <br />
            {{ row.randomIdentityId }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('projectId')" align="left" prop="projectId" show-overflow-tooltip
          label="项目ID" />
        <el-table-column v-if="checkList.includes('projectName')" align="left" prop="projectName"
          show-overflow-tooltip label="项目名称" />
        <el-table-column v-if="checkList.includes('callbackUrl')" align="left" prop="callbackUrl" label="回调URL" />
        <el-table-column v-if="checkList.includes('subordinateUrl')" align="left" prop="subordinateUrl"
          label="下级URL"><template #default="{ row }">
            {{ row.subordinateUrl ? row.subordinateUrl : '-' }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('callbackTime')" align="left" prop="callbackTime"
          show-overflow-tooltip label="回调时间"><template #default="{ row }">
            <el-tag effect="plain" type="info">{{ format(row.callbackTime) }}</el-tag>
          </template>
        </el-table-column>
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
</style>
