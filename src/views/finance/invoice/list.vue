<script setup lang="ts">
defineOptions({
  name: "FinanceInvoiceIndex",
});
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import Edit from "./components/Edit/index.vue";
import Delete from "./components/Delete/index.vue";
const { pagination, onSizeChange, onCurrentChange } = usePagination(); //分页
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
// 新增
const addData = () => {
  editRef.value.showEdit();
};
// 编辑数据
const editData = (row: any) => {
  if (!selectRows.value.length) editRef.value.showEdit(row);
};
// 删除数据
const deleteData = (row: any) => {
  // if (!selectRows.value.length)
  //   return ElMessage({ message: "请选择至少一条数据", type: "warning" });
  deleteRef.value.showEdit(row);
};
// 右侧工具方法
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
}
// 获取列表选中数据
const setSelectRows = (value: any) => {
  selectRows.value = value;
};
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
              <el-select
                value-key=""
                placeholder="选择渠道"
                clearable
                filterable
                @change=""
              >
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select
                value-key=""
                placeholder="发票状态"
                clearable
                filterable
                @change=""
              >
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select
                value-key=""
                placeholder="时间类型"
                clearable
                filterable
                @change=""
              >
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" >
              <el-date-picker
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                size=""
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
                  <div class="i-grommet-icons:power-reset w-1em h-1em"></div>
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
          <el-button
            style="margin-right: 10px"
            :icon="Plus"
            type="primary"
            size="default"
            @click="addData"
          >
            添加发票
          </el-button>
        </FormLeftPanel>

        <FormRightPanel>
          <el-button size="default" @click="">
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
        <el-table-column prop="a" show-overflow-tooltip align="center" label="渠道" />
        <el-table-column prop="b" show-overflow-tooltip align="center" label="发票编号" />
        <el-table-column prop="c" show-overflow-tooltip align="center" label="金额" />
        <el-table-column prop="d" show-overflow-tooltip align="center" label="手续费(税)" />
        <el-table-column prop="e" show-overflow-tooltip align="center" label="实收款" />
        <el-table-column prop="f" show-overflow-tooltip align="center" label="开票日期" />
        <el-table-column prop="g" show-overflow-tooltip align="center" label="收款日期" />
        <ElTableColumn align="center" show-overflow-tooltip prop="" label="状态" >
          <ElSwitch inline-prompt active-text="启用" inactive-text="禁用" />
        </ElTableColumn>
        <el-table-column prop="j" align="center" label="备注" />
        <el-table-column align="center" label="操作" width="170">
          <template #default="{ row }">
            <el-button size="small" plain type="primary" @click="editData(row)">
              编辑
            </el-button>
            <el-button size="small" plain type="danger" @click="deleteData(row)">
              删除
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
      <Edit ref="editRef" />
      <Delete ref="deleteRef" />
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
:deep {
  .el-table__header {
    th {
      background: var(--el-fill-color-lighter) !important;
    }
  }
}
</style>
