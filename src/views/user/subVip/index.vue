<script setup lang="ts">
defineOptions({
  name: 'UserSubVipIndex',
})
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const { pagination, onSizeChange, onCurrentChange } = usePagination() //分页


const listLoading = ref<boolean>(false);
const list = ref<Array<Object>>([]); //列表
const selectRows = ref<string>(); //表格-选中行
const checkList = ref<any>([]); //表格-展示的列
const border = ref<boolean>(true); //表格控件-是否展示边框
const stripe = ref<boolean>(false); //表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); //表格控件-控制表格大小
  const tableAutoHeight = ref(false)  // 表格控件-高度自适应
const columns = ref([//表格控件-展示列
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
function setSelectRows(val: string | undefined) {
  selectRows.value = val;
}
onMounted(() => {
  columns.value.forEach((item:any) => {
    if (item.checked) checkList.value.push(item.prop);
  });
  fetchData();
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight  }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="queryForm.select" size="default" label-width="180px" inline-message inline
            class="search-form">
            <el-form-item>
            <el-input v-model.trim="queryForm.select.id" clearable :inline="false" placeholder="组会员ID、子会员名称" />
          </el-form-item>
          <el-form-item  v-show="!fold">
            <el-input v-model.trim="queryForm.select.name" clearable :inline="false" placeholder="供应商ID" />
          </el-form-item>
          <el-form-item  v-show="!fold">
            <el-select v-model="queryForm.select.default" clearable placeholder="子会员角色">
              <el-option label="默认" value="true" />
              <el-option label="关闭" value="false" />
            </el-select>
          </el-form-item>
          <el-form-item  v-show="!fold">
            <el-select v-model="queryForm.select.default" clearable placeholder="子会员状态">
              <el-option label="默认" value="true" />
              <el-option label="关闭" value="false" />
            </el-select>
          </el-form-item>
          <el-form-item  v-show="!fold">
            <el-select v-model="queryForm.select.default" clearable placeholder="所属组">
              <el-option label="默认" value="true" />
              <el-option label="关闭" value="false" />
            </el-select>
          </el-form-item>
          <el-form-item  v-show="!fold">
            <el-date-picker v-model="queryForm.select.time" type="daterange" unlink-panels range-separator="-"
              start-placeholder="注册开始日期" end-placeholder="注册结束日期" size="default"
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
      <ElDivider border-style="dashed" />
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
          <el-table-column v-if="checkList.includes('a')" align="center" prop="id" show-overflow-tooltip
            label="子会员ID" />
          <el-table-column align="center" prop="b" show-overflow-tooltip label="子会员名称" />
          <el-table-column align="center" prop="c" show-overflow-tooltip label="子会员姓名" />
          <el-table-column align="center" prop="d" show-overflow-tooltip label="供应商ID" />
          <el-table-column align="center" prop="e" show-overflow-tooltip label="角色" />
          <el-table-column align="center" prop="f" show-overflow-tooltip label="B2B" />
          <el-table-column align="center" prop="g" show-overflow-tooltip label="信用等级" />
          <el-table-column align="center" prop="h" show-overflow-tooltip label="所属组" />
          <el-table-column align="center" prop="r" show-overflow-tooltip label="会员状态" />
          <el-table-column align="center" prop="r" show-overflow-tooltip label="创建人" />
          <el-table-column align="center" prop="r" show-overflow-tooltip label="创建日期" />
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
