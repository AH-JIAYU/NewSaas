<script setup lang="ts">
defineOptions({
  name: 'RecordAllocationIndex',
})
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const fold = ref(true);
const listLoading = ref(false);
const layout = ref("total, sizes, prev, pager, next, jumper"); //分页配置
const list = ref([]); //列表
const selectRows = ref(""); //表格-选中行
const total = ref(0); //总页数
const border = ref(true); //表格控件-是否展示边框
const stripe = ref(false); //表格控件-是否展示斑马条
const lineHeight = ref("default"); //表格控件-控制表格大小
const isFullscreen = ref(false); //表格控件-是否全屏
const checkList = ref([]); //表格-展示的列
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
const queryForm = reactive({
  //请求接口携带参数
  pageNo: 1,
  pageSize: 10,
  select: {},
});

// 全屏
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
}

// 展开|合并
function handleFold() {
  fold.value = !fold.value;
}

// 重置搜索内容
function onReset() {
  Object.assign(queryForm, {
    pageNo: 1,
    pageSize: 10,
    select: {},
    order: {
      id: "ASC",
    },
  });
}
// 重置请求
function queryData() {
  queryForm.pageNo = 1;
  fetchData();
}
// 分页-更改每页个数
function handleSizeChange(val) {
  queryForm.pageSize = val;
  fetchData();
}
// 分页-更改页数
function handleCurrentChange(val) {
  queryForm.pageNo = val;
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
function setSelectRows(val) {
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
  <div :class="{ 'vab-table-fullscreen': isFullscreen }">
    <PageMain>
      <el-row>
        <el-form :inline="true" label-position="right" :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model.trim="queryForm.select.id" clearable :inline="false" placeholder="项目ID" />
          </el-form-item>
          <el-form-item v-show="!fold">
            <el-input v-model.trim="queryForm.select.name" clearable :inline="false" placeholder="项目名称" />
          </el-form-item>
          <el-form-item v-show="!fold">
            <el-input v-model.trim="queryForm.select.name" clearable :inline="false" placeholder="供应商" />
          </el-form-item>

          <el-form-item v-show="!fold">
            <el-select v-model="queryForm.select.default" clearable placeholder="分配组">
            </el-select>
          </el-form-item>
          <el-form-item v-show="!fold">
            <el-select v-model="queryForm.select.default" clearable placeholder="状态">
            </el-select>
          </el-form-item>
          <el-form-item v-show="!fold">
            <el-date-picker v-model="queryForm.select.time" type="daterange" unlink-panels range-separator="-"
              start-placeholder="开始日期" end-placeholder="结束日期" size="default" style="width: 192px" clear-icon="true" />
          </el-form-item>
          <TableQuery :fold="fold" :list-loading="listLoading" @handle-fold="handleFold" @on-reset="onReset"
            @query-data="queryData" />
        </el-form>
      </el-row>
      <el-row>
        <FormLeftPanel> </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:checkList="checkList" v-model:columns="columns"
            v-model:is-fullscreen="isFullscreen" v-model:line-height="lineHeight" v-model:stripe="stripe"
            style="margin-left: 12px" @click-full-screen="clickFullScreen" @query-data="queryData" />
        </FormRightPanel>
      </el-row>
      <el-row>
        <el-table v-loading="listLoading" :border="border" :data="list" :size="lineHeight" :stripe="stripe"
          @selection-change="setSelectRows">
          <el-table-column align="center" prop="a" show-overflow-tooltip type="selection" />
          <el-table-column v-if="checkList.includes('a')" align="center" prop="id" show-overflow-tooltip label="项目ID" />
          <el-table-column align="center" prop="b" show-overflow-tooltip label="项目名称" />
          <el-table-column align="center" prop="c" show-overflow-tooltip label="供应商" />
          <el-table-column align="center" prop="d" show-overflow-tooltip label="会员小组" />
          <el-table-column align="center" prop="e" show-overflow-tooltip label="组长ID" />
          <el-table-column align="center" prop="f" show-overflow-tooltip label="项目渠道" />
          <el-table-column align="center" prop="g" show-overflow-tooltip label="状态">
            <template #default="{ row }">
              <el-switch v-model="row.k" :active-value="true"  :inactive-value="false"  active-text="有效" inactive-text="失效">
              </el-switch>

            </template>
          </el-table-column>
          <el-table-column align="center" prop="h" show-overflow-tooltip label="分配时间" />
          <template #empty>
            <el-empty class="vab-data-empty" description="暂无数据" />
          </template>
        </el-table>
      </el-row>

      <el-pagination background :current-page="queryForm.pageNo" :layout="layout" :page-size="queryForm.pageSize"
        :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </PageMain>
  </div>
</template>
