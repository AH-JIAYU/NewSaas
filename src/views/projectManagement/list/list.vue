<script setup lang="ts">
import allocationEdit from "./components/AllocationEdit/index.vue";
import ProjeckEdit from "./components/ProjeckEdit/index.vue";
import ProjectDetail from "./components/ProjectDetails/index.vue";
import api from "@/api/modules/projectManagement";
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();

defineOptions({
  name: "ProjectManagementListIndex",
});
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const addAllocationEditRef = ref();
const addProjeckRef = ref();
const projectDetailsRef = ref();
// 右侧工具栏配置变量
const border = ref(true);
const checkList = ref([]);
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const isFullscreen = ref(false); // 表格控件-控制全屏
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
const search = reactive<any>({}); // 搜索
const list = ref<any>([]);

// 分配
function distribution(row: any) {
  addAllocationEditRef.value.showEdit(row);
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
// 表格控件-控制全屏
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
  search.value = {};
  fetchData();
}
async function fetchData() {
  listLoading.value = true;
  const params = {
    ...getParams(),
    ...search.value,
  };
  const { data } = await api.list(params);
  list.value = data.getChildrenProjectInfoList;
  pagination.value.total = data.total;
  listLoading.value = false;
}
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain class="hide-drawer-header">
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form
            :model="search"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input v-model="search.a" clearable placeholder="项目ID" />
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="search.b" clearable placeholder="项目名称" />
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
              <el-select placeholder="分配类型">
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
              <el-date-picker
                v-model="search.time"
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
          <el-button size="default" @click=""> 导出 </el-button>
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:is-fullscreen="isFullscreen"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px"
            @click-full-screen="clickFullScreen"
            @query-data="currentChange"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        ref="tableSortRef"
        v-loading="listLoading"
        style="margin-top: 10px"
        row-key="projectId"
        :data="list"
        :tree-props="{ children: 'getChildrenProjectListInfoList' }"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
      >
        <el-table-column type="selection" />
        <el-table-column
          show-overflow-tooltip
          prop="projectId"
          align="center"
          label="项目ID"
        />
        <el-table-column
          show-overflow-tooltip
          prop="name"
          align="center"
          label="项目名称"
        />
        <el-table-column
          show-overflow-tooltip
          prop="clientName"
          align="center"
          label="客户简称/标识"
        />
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="参与/完成/配额/限量"
        >
          <template #default="{ row }">
            {{ row.participation }}/ {{ row.complete }}/ {{ row.num }}/
            {{ row.limitedQuantity }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="allocationType"
          align="center"
          label="分配类型"
        />
        <el-table-column show-overflow-tooltip align="center" label="原价">
          <template #default="{ row }">
            $ {{ row.doMoneyPrice }} ￥{{ row.memberPrice }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="f"
          align="center"
          label="供应商价"
        />
        <el-table-column
          show-overflow-tooltip
          prop="ir"
          align="center"
          label="IR/NIR"
        />
        <el-table-column
          show-overflow-tooltip
          prop="countryId"
          align="center"
          label="国家地区"
        />
        <el-table-column
          show-overflow-tooltip
          prop="allocationStatus"
          align="center"
          label="分配状态"
        />
        <el-table-column
          show-overflow-tooltip
          prop="isOnline"
          align="center"
          label="项目状态"
        >
          <ElSwitch inline-prompt active-text="启用" inactive-text="禁用" />
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          prop="remark"
          align="center"
          label="备注"
        />
        <el-table-column
          show-overflow-tooltip
          prop="createName"
          align="center"
          label="创建人"
        />
        <el-table-column
          show-overflow-tooltip
          prop="createTime"
          align="center"
          label="创建时间"
        />
        <el-table-column align="center" label="操作" width="250">
          <template #default="{ row }">
            <el-button plain type="primary" size="small" @click="distribution">
              重新分配
            </el-button>
            <el-button
              type="primary"
              plain
              size="small"
              @click="projectEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              size="small"
              plain
              @click="projectDetails(row)"
            >
              详情
            </el-button>
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
    </PageMain>
    <allocationEdit ref="addAllocationEditRef" />
    <ProjeckEdit ref="addProjeckRef" @fetchData="fetchData" />
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
