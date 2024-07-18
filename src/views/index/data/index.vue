<script setup lang="ts">
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination(); // 分页
// 右侧工具栏配置变量
const border = ref(true);

const checkList = ref([]);
const tableAutoHeight = ref(false); // 表格控件-高度自适应
// 表格控件-控制全屏
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
const data = reactive<any>({
  activeName: "report", // tabs选中值
  list: [], // 表格
  queryForm: {
    pageNo: 1,
    pageSize: 10,
    select: {},
  },
});

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList());
}
// 表格控件-控制全屏

// 获取列表
async function getDataList() {
  // data.value.loading = true
  // const params = {
  // ...getParams(),
  // ...(data.value.search.title && { title: data.value.search.title }),
  // }
  // api.list(params).then((res: any) => {
  //   data.value.loading = false
  //   data.value.dataList = res.data.list
  //   pagination.value.total = res.data.total
  // })

  data.list = [
    {
      name: "name",
      cname: "amr",
      fz: "张三",
      num1: 561,
      num2: 435,
      num3: 344,
      money1: 1344.11,
      money2: 111112,
    },
    {
      name: "name1",
      cname: "amr",
      fz: "张三",
      num1: 561,
      num2: 435,
      num3: 344,
      money1: 1344.11,
      money2: 111112,
    },
    {
      name: "name2",
      cname: "amr",
      fz: "张三",
      num1: 561,
      num2: 435,
      num3: 344,
      money1: 1344.11,
      money2: 111112,
    },
    {
      name: "name",
      cname: "amr",
      fz: "张三",
      num1: 561,
      num2: 435,
      num3: 344,
      money1: 1344.11,
      money2: 111112,
    },
    {
      name: "name",
      cname: "amr",
      fz: "张三",
      num1: 561,
      num2: 435,
      num3: 344,
      money1: 1344.11,
      money2: 111112,
    },
    {
      name: "name",
      cname: "amr",
      fz: "张三",
      num1: 561,
      num2: 435,
      num3: 344,
      money1: 1344.11,
      money2: 111112,
    },
    {
      name: "name",
      cname: "amr",
      fz: "张三",
      num1: 561,
      num2: 435,
      num3: 344,
      money1: 1344.11,
      money2: 111112,
    },
  ];
}
onMounted(() => {
  getDataList();
});
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <el-tabs v-model="data.activeName" type="border-card" class="demo-tabs">
        <el-tab-pane label="客户报告" name="report">
          <el-row class="fx-b">
            <SearchTab />
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
            :data="data.list"
            :border="border"
            :size="lineHeight"
            :stripe="stripe"
            style="width: 100%"
          >
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="name"
              label="客户名称"
              width="180"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="cname"
              label="客户简称"
              width="180"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="fz"
              label="负责人"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="num1"
              label="关联项目数量"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="num2"
              label="参与项目数量"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="num3"
              label="结算项目数量"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="money1"
              label="结算项目金额"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="money2"
              label="项目营业额"
            />
            <template #empty>
              <el-empty description="暂无数据" />
            </template>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客户审核" name="auditing">
          <el-row class="fx-b">
            <SearchTab />
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
            class="el-table__row--striped"
            :data="data.list"
            :border="border"
            :size="lineHeight"
            :stripe="stripe"
            style="width: 100%"
          >
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="name"
              label="客户名称"
              width="180"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="cname"
              label="客户简称"
              width="180"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="fz"
              label="负责人"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="num1"
              label="系统完成数"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="num2"
              label="结算完成单数"
            />
            <!-- <el-table-column
              show-overflow-tooltip
              align="center"
              prop="num3"
              label="审核成功"
            /> -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="money1"
              label="审核率"
            />
            <template #empty>
              <el-empty description="暂无数据" />
            </template>
          </el-table>
        </el-tab-pane>
      </el-tabs>
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
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-row {
    margin: 20px 0;
    color: #b6b5b562;
  }
}

.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
