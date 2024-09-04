<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_termination";
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

const border = ref(true); // 表格控件-是否展示边框
const stripe = ref(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const columns = ref([
  // 表格控件-展示列
  { label: "会员类型", prop: "surveySource", sortable: true, checked: true },
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
  { label: "内部", value: 1 },
  { label: "外部", value: 2 },
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
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="queryForm" size="default" label-width="100px" inline-message inline class="search-form">
            <el-form-item label="">
              <el-input v-model.trim="queryForm.tenantSupplierId" clearable :inline="false" placeholder="供应商ID" @keydown.enter="currentChange()"/>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model.trim="queryForm.projectId" clearable :inline="false" placeholder="项目ID" @keydown.enter="currentChange()"/>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="queryForm.surveySource" value-key="" placeholder="会员类型" clearable filterable @change="currentChange()">
                <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input v-model.trim="queryForm.projectName" clearable :inline="false" placeholder="项目名称" @keydown.enter="currentChange()"/>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input v-model.trim="queryForm.ipBelong" clearable :inline="false" placeholder="IP/所属国" @keydown.enter="currentChange()"/>
            </el-form-item>

            <el-form-item v-show="!fold" label="">
              <el-date-picker v-model="queryForm.time" type="datetimerange" unlink-panels range-separator="-"
                start-placeholder="创建开始日期" end-placeholder="创建结束日期" value-format="YYYY-MM-DD hh:mm:ss" size="default" @change="currentChange()"/>
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
        <el-table-column v-if="checkList.includes('surveySource')" align="center" prop="surveySource"
          show-overflow-tooltip width="100" label="会员类型"><template #default="{ row }">
            {{ memberType[row.surveySource - 1].label }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberChildId')" align="center" prop="" width="180"
          show-overflow-tooltip label="会员ID">
          <template #default="{ row }">
            <el-text v-if="row.peopleType === 1">
              {{ row.memberChildId }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('supplierMemberChildId')" align="center" prop="" show-overflow-tooltip
          width="180" label="子会员ID">
          <template #default="{ row }">
            <el-text v-if="row.peopleType !== 1">
              {{ row.memberChildId }}
            </el-text>
            <el-text v-else>
              -
            </el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('tenantSupplierId')" align="center" prop="tenantSupplierId"
          width="180" show-overflow-tooltip label="供应商ID">
          <template #default="{ row }">
            {{ row.tenantSupplierId ? row.tenantSupplierId : "-" }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('projectId')" align="center" prop="projectId" show-overflow-tooltip
          width="180" label="项目ID" />
        <el-table-column v-if="checkList.includes('projectName')" align="center" prop="projectName"
          show-overflow-tooltip label="项目名称" />
        <el-table-column v-if="checkList.includes('ipBelong')" align="center" prop="ipBelong" show-overflow-tooltip
          label="IP/所属国" />
        <el-table-column v-if="checkList.includes('notes')" align="center" prop="notes" show-overflow-tooltip
          width="280" label="说明" />
        <el-table-column v-if="checkList.includes('terminationTime')" align="center" prop="terminationTime"
          show-overflow-tooltip label="终止时间"><template #default="{ row }">
            <el-tag effect="plain" type="info">{{
    format(row.terminationTime)
  }}</el-tag>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty class="vab-data-empty" description="暂无数据" />
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
