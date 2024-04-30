<script setup>
import check from './components/check.vue'

const activeName = ref('report')
const CheckRef = ref(null)
const tableData = [
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name1', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name2', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
  { name: 'name', cname: 'amr', fz: '张三', num1: 561, num2: 435, num3: 344, money1: 1344.11, money2: 111112 },
]

const layout = 'total, sizes, prev, pager, next, jumper'
const total = 100
const queryForm = reactive({
  pageNo: 1,
  pageSize: 10,
  select: {},
})
function handleSizeChange(value) {
  queryForm.pageNo = 1
  queryForm.pageSize = value
  fetchData({ id: dicttype_id.value, key: '' })
}

function handleCurrentChange(value) {
  queryForm.pageNo = value
  fetchData({ id: dicttype_id.value, key: '' })
}
// 查看
function handleCheck(row) {
  if (row.name) {
    CheckRef.value.showEdit(row)
  }
  else {
    CheckRef.value.showEdit()
  }
}
</script>

<template>
  <PageMain>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="渠道报告" name="report">
        <el-row class="fx-b">
          <SearchTab />
          <el-button>
            导出
          </el-button>
        </el-row>

        <el-table :data="tableData" border style="width: 100%;">
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
              <el-button
                link
                type="primary"
                size="small"
                @click="handleCheck(row)"
              >
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

        <el-table :data="tableData" border style="width: 100%;">
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
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <check ref="CheckRef" />
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
