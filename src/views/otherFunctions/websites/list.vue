<script setup lang="ts">
import { reactive, ref } from "vue";
import Edit from "./components/Edit/index.vue";
import Delete from "./components/Delete/index.vue";

defineOptions({
  name: "OtherFunctionsWebsitesIndex",
});

const { pagination, onSizeChange, onCurrentChange } = usePagination(); // 分页
// 分页
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const deleteRef = ref();
const editRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const checkList = ref([]);
const border = ref(true);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
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
// 编辑数据
function editData() {
  if (!selectRows.value.length) {
    editRef.value.showEdit();
  }
}
// 删除数据
function deleteData() {
  deleteRef.value.showEdit();
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
  try {
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
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
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
          <el-form :model="queryForm.select" size="default" label-width="100px" inline-message inline
            class="search-form">
            <el-form-item label="">
              <el-input placeholder="供应商ID" />
            </el-form-item>
            <el-form-item label="">
              <el-select value-key="" placeholder="所有" clearable filterable @change="" />
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
              <ElButton disabled link @click="toggle">
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
        <FormLeftPanel />
        <FormRightPanel>
          <el-button size="default" @click=""> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe" style="margin-left: 12px"
            @query-data="currentChange" />
        </FormRightPanel>
      </el-row>
      <el-table ref="tableSortRef" v-loading="listLoading" style="margin-top: 10px" row-key="id" :data="list"
        :border="border" :size="lineHeight" :stripe="stripe" @selection-change="setSelectRows">
        <el-table-column align="center" type="selection" />
        <!-- <el-table-column type="index" align="center" label="序号" width="55" /> -->
        <el-table-column show-overflow-tooltip prop="a" align="center" label="供应商ID" />
        <el-table-column show-overflow-tooltip prop="b" align="center" label="开始日期" />
        <el-table-column show-overflow-tooltip prop="c" align="center" label="结算日期" />
        <el-table-column show-overflow-tooltip prop="d" align="center" label="状态">
          <ElSwitch inline-prompt active-text="启用" inactive-text="禁用" />
        </el-table-column>
        <el-table-column align="center" label="操作" width="170">
          <el-button plain size="small" type="primary" @click="editData">
            编辑
          </el-button>
          <el-button plain size="small" type="danger" @click="deleteData">
            删除
          </el-button>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
      <Edit ref="editRef" />
      <Delete ref="deleteRef" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
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
