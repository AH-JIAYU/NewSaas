<script setup lang="ts">
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import Edit from "./components/Edit/index.vue";
import Detail from "./components/Detail/index.vue";

defineOptions({
  name: "FinanceInvoiceIndex",
});

const { pagination, onSizeChange, onCurrentChange } = usePagination(); // 分页
// 分页
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const editRef = ref();
const detailRef = ref();
// 右侧工具栏配置变量
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
const checkList = ref([]);
const border = ref(true);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
const statusType = [
  { label: "完成", value: 1 },
  { label: "审核通过", value: 2 },
  { label: "审核失败", value: 3 },
  { label: "数据冻结", value: 4 },
  { label: "被甄别", value: 5 },
  { label: "配额满", value: 6 },
];
const columns = ref([
  {
    label: "选择渠道",
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
// 新增
function addData() {
  editRef.value.showEdit();
}
// 详情
function detailData(row: any) {
  console.log("row:", row);
  detailRef.value.showEdit();
}
// 右侧工具方法
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
}
// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value;
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
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
async function fetchData() {
  listLoading.value = true;
  // const { data } = await getList(queryForm)
  // list.value = data[0]
  // total.value = data[0].length
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
  <div
    v-loading="listLoading"
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form
            :model="queryForm.select"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.select.id"
                clearable
                :inline="false"
                placeholder="点击ID"
              />
            </el-form-item>
            <el-form-item label="">
              <el-select
                v-model="queryForm.select.id"
                value-key=""
                placeholder="变更状态"
                clearable
                filterable
              >
                <el-option
                  v-for="item in statusType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
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
              <ElButton link disabled @click="toggle">
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
          <el-button
            style="margin-right: 10px"
            :icon="Plus"
            type="primary"
            size="default"
            @click="addData"
          >
            新增
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
            style="margin-left: 12px"
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
        <el-table-column type="selection" />
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column
          prop="c"
          show-overflow-tooltip
          align="center"
          label="变更状态"
        />
        <el-table-column
          prop="e"
          show-overflow-tooltip
          align="center"
          label="变更时间"
        />
        <el-table-column
          prop="e"
          show-overflow-tooltip
          align="center"
          label="操作人"
        />
        <el-table-column
          prop="e"
          show-overflow-tooltip
          align="center"
          label="操作"
        >
          <template #default="{ row }">
            <ElButton
              type="primary"
              size="small"
              plain
              @click="detailData(row)"
            >
              详情
            </ElButton>
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
      <Edit @success="fetchData" ref="editRef" />
      <Detail ref="detailRef" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.el-pagination {
  margin-top: 15px;
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
