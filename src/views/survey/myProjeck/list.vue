<script setup lang="ts">
defineOptions({
  name: "SurveyMyProjeckList",
});
import checkEdit from "./components/checkEdit/index.vue";
import quotaEdit from "./components/quotaEdit/index.vue";
const { pagination, onSizeChange, onCurrentChange } = usePagination(); //分页
// 分页
const value1 = ref("");
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const addCheckEditEdit = ref<any>();
const addQuotaEdit = ref<any>();
// 右侧工具栏配置变量
const border = ref(true);
const checkList = ref([]);
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const isFullscreen = ref(false); //表格控件-控制全屏
const lineHeight = ref<any>("default");
const stripe = ref(true);
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
// 测查
function check(row: any) {
  addCheckEditEdit.value.showEdit(row)
}
// 附件
const attachment = () => {}
// 配额
function quota(row: any) {
  addQuotaEdit.value.showEdit(row)
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
function handleMoreOperating(command: string, row: any) {
  switch (command) {
    case "check":
      check(row)
      break;
    case "attachment":
      attachment(row)
      break;
  }
}
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
            <el-form-item label="">
              <el-input clearable placeholder="项目名称" />
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
            <el-form-item  v-show="!fold">
              <el-date-picker  type="daterange" unlink-panels range-separator="-"
                start-placeholder="开始日期" end-placeholder="结束日期" size="default" style="width: 192px" clear-icon="true" />

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
        <FormLeftPanel> </FormLeftPanel>
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
      >
        <el-table-column type="selection" />
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column prop="a" align="center" label="项目ID" />
        <el-table-column prop="b" align="center" label="项目名称" />
        <el-table-column prop="c" align="center" label="客户简称/标识" />
        <el-table-column prop="d" align="center" label="分配目标" />
        <el-table-column prop="e" align="center" label="参与/完成/配额/限量" />
        <el-table-column prop="f" align="center" label="原价USA/RMB" />
        <el-table-column prop="g" align="center" label="IR/NIR" />
        <el-table-column prop="h" align="center" label="国家地区" />
        <el-table-column prop="k" align="center" label="创建时间" />
        <el-table-column align="center" label="操作" width="200">
          <template #default="{ row }">
            <ElSpace>
              <el-button size="small" plain type="primary" @click="quota(row)"> 配额 </el-button>
              <ElDropdown @command="handleMoreOperating($event, row)">
                <ElButton plain type="" size="small">
                  更多操作
                  <SvgIcon name="i-ep:arrow-down" class="el-icon--right" />
                </ElButton>
                <template #dropdown>
                  <ElDropdownMenu>
                    <ElDropdownItem command="check"> 测查 </ElDropdownItem>
                    <ElDropdownItem command="attachment" divided>
                      附件
                    </ElDropdownItem>
                  </ElDropdownMenu>
                </template>
              </ElDropdown>
            </ElSpace>
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
    <checkEdit ref="addCheckEditEdit" />
    <quotaEdit ref="addQuotaEdit" />
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
