<script setup lang="ts">
defineOptions({
  name: "ProjectManagementSchedulingIndex",
});
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import deletes from "./components/Delete/index.vue";
import edit from "./components/Edit/index.vue";
const { pagination, onSizeChange, onCurrentChange } = usePagination(); //分页
// 分页
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
const border = ref(true);
// 获取组件变量
const deleteRef = ref();
const editRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const checkList = ref([]);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
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
// 新增数据
const addData = () => {
  if (!selectRows.value.length) editRef.value.isShow = true;
};
// 编辑数据
const editData = () => {
  if (!selectRows.value.length) editRef.value.isShow = true;
};
// 删除数据
const deleteData = () => {
  // if (!selectRows.value.length)
  //   return ElMessage({ message: "请选择至少一条数据", type: "warning" });
  deleteRef.value.isShow = true;
  deleteRef.value.replyData(selectRows.value);
};

// 工具配置项
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
}
// 获取列表选中数据
const setSelectRows = (value: any) => {
  selectRows.value = value;
};
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
    :class="{

      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form
          :model="queryForm.select" size="default" label-width="100px" inline-message inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input clearable placeholder="项目ID" />
            </el-form-item>
            <el-form-item  label="">
              <el-input clearable placeholder="项目名称" />
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
              <ElButton disabled link @click="toggle">
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
            type="primary"
            :icon="Plus"
            size="default"
            @click="addData"
          >
            添加
          </el-button>
        </FormLeftPanel>

        <FormRightPanel>
          <el-button style="margin-right: 10px" size="default" @click="">
            导出
          </el-button>
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
        style="margin-top: 10px"
        ref="tableSortRef"
        v-loading="false"
        row-key="id"
        :data="list"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column type="selection" />
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column prop="e" align="center" label="类型" />
        <el-table-column prop="d" align="center" label="项目ID" />
        <el-table-column prop="e" align="center" label="项目名称" />
        <el-table-column prop="a" align="center" label="指定供应商" />
        <el-table-column prop="b" align="center" label="国家" />
        <el-table-column prop="c" align="center" label="原价" />
        <el-table-column prop="h" align="center" label="创建时间" />
        <el-table-column align="center" label="操作" width="170">
          <el-button text type="primary" size="default" @click="editData">
            编辑
          </el-button>
          <el-button text type="danger" size="default" @click="deleteData">
            删除
          </el-button>
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
      <deletes ref="deleteRef" />
      <edit ref="editRef" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.el-select {
  width: 12rem;
}

:deep {
  table {
    width: 100% !important;
  }
}

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
