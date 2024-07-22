<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_callback";
defineOptions({
  name: "RecordCallbackIndex",
});

const { pagination, getParams, onSizeChange, onCurrentChange } =
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
  {
    prop: "customerShortName",
    label: "客户简称",
    sortable: true,
    checked: true,
  },
  { prop: "memberChildId", label: "对象", sortable: true, checked: true },
  { prop: "projectId", label: "项目id", sortable: true, checked: true },
  { prop: "projectName", label: "项目名称", sortable: true, checked: true },
  { prop: "callbackUrl", label: "回调url", sortable: true, checked: true },
  { prop: "subordinateUrl", label: "下级url", sortable: true, checked: true },
  { prop: "callbackTime", label: "回调时间", sortable: true, checked: true },
]);

const queryForm = reactive<any>({
  // 请求接口携带参数
  time: [],
  beginTime: "", //	开始时间
  endTime: "", //	结束时间
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
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    time: [],
    beginTime: "", //	开始时间
    endTime: "", //	结束时间
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
                v-model.trim="queryForm.tenantSupplierId"
                clearable
                :inline="false"
                placeholder="供应商ID"
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
                v-model.trim="queryForm.projectName"
                clearable
                :inline="false"
                placeholder="项目名称"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.memberChildId"
                clearable
                :inline="false"
                placeholder="子会员id/会员id"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-date-picker
                v-model="queryForm.time"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="创建开始日期"
                end-placeholder="创建结束日期"
                size="default"
                style="width: 192px"
                clear-icon="true"
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
        @selection-change="setSelectRows"
      >
        <el-table-column align="center" type="selection" />
        <el-table-column
          v-if="checkList.includes('customerShortName')"
          align="center"
          prop="customerShortName"
          show-overflow-tooltip
          label="客户简称"
        />
        <el-table-column
          v-if="checkList.includes('memberChildId')"
          align="center"
          show-overflow-tooltip
          label="对象"
        >
          <template #default="{ row }">
            {{ row.memberChildId }} <br />
            {{ row.randomIdentityId }}
          </template>
        </el-table-column>
        <el-table-column
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
          label="项目名称"
        />
        <el-table-column
          v-if="checkList.includes('callbackUrl')"
          align="center"
          prop="callbackUrl"
          label="回调URL"
        />
        <el-table-column
          v-if="checkList.includes('subordinateUrl')"
          align="center"
          prop="subordinateUrl"
          label="下级URL"
        />
        <el-table-column
          v-if="checkList.includes('callbackTime')"
          align="center"
          prop="callbackTime"
          show-overflow-tooltip
          label="回调时间"
        />
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
