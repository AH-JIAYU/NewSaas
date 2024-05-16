<script setup lang="ts">
defineOptions({
  name: "ProjectManagementListIndex",
});
import allocationEdit from "./components/AllocationEdit/index.vue";
import ProjeckEdit from "./components/ProjeckEdit/index.vue";
import ProjectDetail from "./components/ProjectDetails/index.vue";
const { pagination, onSizeChange, onCurrentChange } = usePagination(); //分页
// 分页
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const addAllocationEdit = ref();
const addProjeckRef = ref();
const projectDetailsRef = ref();
// 右侧工具栏配置变量
const border = ref(true);
const checkList = ref([]);
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const isFullscreen = ref(false); //表格控件-控制全屏
const lineHeight = ref<any>("default");
const stripe = ref(false);
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
// 查询参数
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 10,
  title: "",
  order: {
    id: "ASC",
  },
  select: {},
});
const list = ref<any>([]);

// 分配
function distribution(row: any) {
  addAllocationEdit.value.showEdit(row);
}
// 新增项目
function addProject() {
  addProjeckRef.value.showEdit();
}
// 编辑项目
function projectEdit(row: any) {
  addProjeckRef.value.showEdit(row);
}
// 项目详情
function projectDetails(row: any) {
  projectDetailsRef.value.showEdit(row);
}
//表格控件-控制全屏
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    pageNo: 1,
    pageSize: 10,
    title: "",
    order: {
      id: "ASC",
    },
    select: {},
  });
}
async function fetchData() {
  listLoading.value = true;
  list.value = [
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
  ];
  pagination.value.total = 3;
  listLoading.value = false;
}
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div :class="{
    'absolute-container': tableAutoHeight,
  }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form :model="queryForm" size="default" label-width="100px" inline-message inline class="search-form">
            <el-form-item label="">
              <el-input clearable placeholder="项目ID" v-model="queryForm.select.a" />
            </el-form-item>
            <el-form-item label="">
              <el-input clearable placeholder="项目名称" v-model="queryForm.select.b" />
            </el-form-item>
            <el-form-item label="">
              <el-input clearable placeholder="项目标识" />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="国家地区">
                <el-option :key="11" :label="11" :value="111">
                  11111
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="客户简称">
                <el-option :key="11" :label="11" :value="111">
                  11111
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="分配目标">
                <el-option :key="11" :label="11" :value="111">
                  11111
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="项目状态">
                <el-option :key="11" :label="11" :value="111">
                  11111
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="B2B/B2C">
                <el-option :key="11" :label="11" :value="111">
                  11111
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-input clearable placeholder="创建人" />
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker v-model="queryForm.select.time" type="daterange" unlink-panels range-separator="-"
                start-placeholder="创建开始日期" end-placeholder="创建结束日期" size="default" style="width: 192px"
                clear-icon="true" />
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
                  <div class="i-grommet-icons:power-reset w-1em h-1em"></div>
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
          </el-form>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="addProject">
            添加项目
          </el-button>
        </FormLeftPanel>

        <FormRightPanel>
          <el-button size="default" @click="">
            导出
          </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:is-fullscreen="isFullscreen" v-model:line-height="lineHeight"
            v-model:stripe="stripe" style="margin-left: 12px" @click-full-screen="clickFullScreen"
            @query-data="currentChange" />
        </FormRightPanel>
      </el-row>
      <el-table style="margin-top: 10px" ref="tableSortRef" v-loading="false" row-key="id" :data="list" :border="border"
        :size="lineHeight" :stripe="stripe">
        <el-table-column type="selection" />
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column show-overflow-tooltip prop="a" align="center" label="项目ID" />
        <el-table-column show-overflow-tooltip prop="b" align="center" label="项目名称" />
        <el-table-column show-overflow-tooltip prop="c" align="center" label="客户简称/标识" />
        <el-table-column show-overflow-tooltip prop="d" align="center" label="分配目标" />
        <el-table-column show-overflow-tooltip prop="e" align="center" label="参与/完成/配额/限量" />
        <el-table-column show-overflow-tooltip prop="f" align="center" label="原价" />
        <el-table-column show-overflow-tooltip prop="g" align="center" label="IR/NIR" />
        <el-table-column show-overflow-tooltip prop="h" align="center" label="国家地区" />
        <el-table-column show-overflow-tooltip prop="i" align="center" label="项目状态">
          <ElSwitch inline-prompt active-text="启用" inactive-text="禁用" />
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="j" align="center" label="创建人" />
        <el-table-column show-overflow-tooltip prop="k" align="center" label="创建时间" />
        <el-table-column align="center" label="操作" width="250">
          <template #default="{ row }">
            <el-button plain type="primary" size="small" @click="distribution">
              重新分配
          </el-button>
            <el-button type="primary" plain size="small" @click="projectEdit(row)">
              编辑
            </el-button>
            <el-button type="primary" size="small" plain @click="projectDetails(row)">
              详情
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
    <allocationEdit ref="addAllocationEdit" />
    <ProjeckEdit ref="addProjeckRef" />
    <ProjectDetail ref="projectDetailsRef" />
  </div>
</template>

<style scoped lang="scss">
:deep {
  table {
    width: 100% !important;
  }

  thead {
    z-index: 999;
    background-color: #f2f3f5 !important;
  }

  .el-table__header {
    th {
      background: var(--el-fill-color-lighter) !important;
    }
  }
}

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
