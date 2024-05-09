<script setup lang="ts">
import check from './components/check/index.vue'
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } = usePagination() //分页

const data = reactive<any>({
  activeName: "report", //tabs选中值
  list: [], //表格
  CheckRef: null,//查看组件ref
  queryForm:{
  pageNo: 1,
  pageSize: 10,
  select: {},
}
})

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList())
}
// 获取列表
async function getDataList() {
  data.value.loading = true
  const params = {
    ...getParams(),
    ...(data.value.search.title && { title: data.value.search.title }),
  }
  // api.list(params).then((res: any) => {
  //   data.value.loading = false
  //   data.value.dataList = res.data.list
  //   pagination.value.total = res.data.total
  // })
  data.list = [
    { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
    { name: 'name1', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
    { name: 'name2', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
    { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
    { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
    { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
    { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  ]
}
// 查看
function handleCheck(row: any) {
  if (row.name) {
    data.CheckRef.showEdit(row)
  }
  else {
    data.CheckRef.showEdit()
  }
}
onMounted(() => {
  getDataList()
})
</script>

<template>
  <PageMain>
    <el-tabs v-model="data.activeName" type="border-card" class="demo-tabs">
      <el-tab-pane label="渠道报告" name="report">
        <el-row class="fx-b">
          <SearchTab />
          <el-button>
            导出
          </el-button>
        </el-row>

        <el-table :data="data.list" border style="width: 100%;">
          <el-table-column align="center" prop="name" label="客户名称" width="180" />
          <el-table-column align="center" prop="cname" label="客户简称" width="180" />
          <el-table-column align="center" prop="fz" label="负责人" />
          <el-table-column align="center" prop="num1" label="渠道项目数量" />
          <el-table-column align="center" prop="num2" label="参与项目数量" />
          <el-table-column align="center" prop="num3" label="完成项目数量" />
          <el-table-column align="center" prop="money1" label="完成项目金额" />
          <el-table-column align="center" prop="money2" label="项目营业额" />
          <el-table-column align="center" label="国家分布详情">
            <template #default="{ row }" align="center">
              <el-button link type="primary" size="small" @click="handleCheck(row)">
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="渠道审核" name="auditing">
        <el-row class="fx-b">
          <SearchTab />
          <el-button>
            导出
          </el-button>
        </el-row>
        <el-table :data="data.list" border style="width: 100%;">
          <el-table-column align="center" prop="name" label="渠道" width="180" />
          <el-table-column align="center" prop="cname" label="月份" width="180" />
          <el-table-column align="center" prop="fz" label="完成单数" />
          <el-table-column align="center" prop="num1" label="审核单数" />
          <el-table-column align="center" prop="num2" label="拒绝单数" />
          <el-table-column align="center" prop="num3" label="通过率" />
          <el-table-column align="center" prop="money1" label="组" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
      :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
      background @size-change="sizeChange" @current-change="currentChange" />
    <check ref="data.CheckRef" />
  </PageMain>
</template>

<style lang="scss" scoped>
:deep {
  .el-row {
    margin: 20px 0;
  }
}

.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
