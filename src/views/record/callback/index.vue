<script setup lang="ts">
defineOptions({
  name: 'RecordCallbackIndex',
})
import { onMounted } from "vue";

const { pagination, onSizeChange, onCurrentChange } = usePagination() //分页

const listLoading = ref(false);
const list = ref<Array<Object>>([]); //列表
const selectRows = ref(""); //表格-选中行
const checkList = ref<Array<Object>>([]); //表格-展示的列
const border = ref(true); //表格控件-是否展示边框
const stripe = ref(false); //表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); //表格控件-控制表格大小
const tableAutoHeight = ref(false)  // 表格控件-高度自适应
const columns = ref([
  //表格控件-展示列
  {
    label: "等级名称",
    prop: "a",
    sortable: true,
    disableCheck: false, //不可更改
    checked: true, //默认展示
  },
]);
const queryForm = reactive<any>({
  //请求接口携带参数
  pageNo: 1,
  pageSize: 10,
  select: {},
});

// 每页数量切换
function sizeChange(size: number) {

  onSizeChange(size).then(() => fetchData())
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData())
}
// 重置请求
function queryData() {
  queryForm.pageNo = 1;
  fetchData();
}

// 请求
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
  listLoading.value = false;
}
// 表格-单选框
function setSelectRows(val: string) {
  selectRows.value = val;
}
onMounted(() => {
  columns.value.forEach((item) => {
    if (item.checked) checkList.value.push(item.prop);
  });
  fetchData();
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="queryForm.select" size="default" label-width="100px" inline-message inline
            class="search-form">
            <el-form-item label="供应商" >
            <el-input v-model.trim="queryForm.select.id" clearable :inline="false" placeholder="供应商" />
          </el-form-item>
          <el-form-item label="子会员"  v-show="!fold">
            <el-input v-model.trim="queryForm.select.name" clearable :inline="false" placeholder="子会员" />
          </el-form-item>
          <el-form-item label="项目ID"  v-show="!fold">
            <el-input v-model.trim="queryForm.select.name" clearable :inline="false" placeholder="项目ID" />
          </el-form-item>
          <el-form-item label="项目名称"  v-show="!fold">
            <el-input v-model.trim="queryForm.select.name" clearable :inline="false" placeholder="项目名称" />
          </el-form-item>
          <el-form-item label="Guid"  v-show="!fold">
            <el-input v-model.trim="queryForm.select.name" clearable :inline="false" placeholder="Guid" />
          </el-form-item>
          <el-form-item label="选择渠道"  v-show="!fold">
            <el-select v-model="queryForm.select.default" clearable placeholder="选择渠道">

            </el-select>
          </el-form-item>
          <el-form-item label="日期"  v-show="!fold">
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
              <ElButton link @click="toggle">
                <template #icon>
                  <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                </template>
                {{ fold ? '展开' : '收起' }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </SearchBar>
      <el-row>
        <FormLeftPanel> </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight"
              v-model:checkList="checkList" v-model:columns="columns" v-model:line-height="lineHeight"
              v-model:stripe="stripe" style="margin-left: 12px;" @query-data="queryData" />
        </FormRightPanel>
      </el-row>
        <el-table v-loading="listLoading" :border="border" :data="list" :size="lineHeight" :stripe="stripe"
          @selection-change="setSelectRows">
          <el-table-column align="center" prop="a" show-overflow-tooltip type="selection" />

          <el-table-column v-if="checkList.includes('a')" align="center" prop="b" show-overflow-tooltip label="客户简称" />
          <el-table-column align="center" prop="c" show-overflow-tooltip label="对象" />
          <el-table-column align="center" prop="d" show-overflow-tooltip label="项目ID" />
          <el-table-column align="center" prop="e" show-overflow-tooltip label="项目名称" />
          <el-table-column align="center" prop="f" show-overflow-tooltip label="回调URL" />
          <el-table-column align="center" prop="g" show-overflow-tooltip label="下级URL" />
          <el-table-column align="center" prop="h" show-overflow-tooltip label="创建时间" />
          <template #empty>
            <el-empty class="vab-data-empty" description="暂无数据" />
          </template>
        </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
          :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
          background @size-change="sizeChange" @current-change="currentChange" />
        </PageMain>
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
