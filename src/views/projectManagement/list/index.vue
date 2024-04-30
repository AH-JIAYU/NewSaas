<script setup lang="ts">
import distributionEdit from './components/distributionEdit.vue'
import SurveysEdit from './components/SurveysEdit.vue'
import tableQuery from '@/components/tableQuery/index.vue'

const fold = ref<boolean>(false)
const layout = ref<string>('total, sizes, prev, pager, next, jumper')
const total = ref<any>(0)
const value1 = ref('')
const tableSortRef = ref('')
const listLoading = ref<boolean>(true)
const addDistribution = ref('')
const addSurveysEdit = ref('')
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 10,
  title: '',
  order: {
    id: 'ASC',
  },
  select: {},
})
const list = ref([])
const dataList = {
  data: [
    {
      a: '111',
      b: '222222',
      c: '3333',
      d: '444',
      e: '5555555',
      f: '66666666',
      g: '777777777',
      h: '8888888888',
      i: '999999999',
      j: '10101010',
      k: '1212121212',
    },
  ],
  total: 3,
}
list.value = dataList.data
total.value = dataList.total
// 分配
function distribution() {
  addDistribution.value.isShow = true
}
function surveysEdit() {
  addSurveysEdit.value.isShow = true
}
function resetPassword() {
  addDistribution.value.isShow = true
}

// 折叠查询表单
function handleFold() {
  fold.value = !fold.value
}
// 查询数据
function queryData() {
  queryForm.pageNo = 1
}
// 选择每页多少条数据
function handleSizeChange(value: number) {
  queryForm.pageNo = 1
  queryForm.pageSize = value
}
// 选择页数
function handleCurrentChange(value: number) {
  queryForm.pageNo = value
}
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    pageNo: 1,
    pageSize: 10,
    title: '',
    order: {
      id: 'ASC',
    },
    select: {},
  })
}
</script>

<template>
  <div>
    <PageMain>
      <el-form inline label-position="right" label-width="80px" :model="queryForm" @submit.prevent>
        <el-form-item label="">
          <el-input clearable placeholder="项目ID" />
        </el-form-item>
        <el-form-item v-show="!fold" label="">
          <el-input clearable placeholder="项目名称" />
        </el-form-item>
        <el-form-item v-show="!fold" label="">
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
        <el-form-item v-show="!fold">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="Pick a day"
            size="default"
          />
        </el-form-item>
        <tableQuery :fold="fold" :list-loading="listLoading" @handle-fold="handleFold" @on-reset="onReset" @query-data="queryData" />
      </el-form>
      <el-row :gutter="24">
        <el-col :span="20">
          <el-button type="primary" size="default" @click="surveysEdit">
            新增项目
          </el-button>
          <el-button type="primary" size="default" @click="distribution">
            分配
          </el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="default" @click="">
            导出
          </el-button>
        </el-col>
      </el-row>
      <el-table
        ref="tableSortRef"
        v-loading="false"
        row-key="id"
        :data="list"
      >
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column prop="a" align="center" label="项目ID" />
        <el-table-column prop="b" align="center" label="项目名称" />
        <el-table-column prop="c" align="center" label="客户简称/标识" />
        <el-table-column prop="d" align="center" label="分配目标" />
        <el-table-column prop="e" align="center" label="参与/完成/配额/限量" />
        <el-table-column prop="f" align="center" label="原价" />
        <el-table-column prop="g" align="center" label="IR/NIR" />
        <el-table-column prop="h" align="center" label="国家地区" />
        <el-table-column prop="i" align="center" label="项目状态">
          <el-switch
            v-model="value1"
          />
        </el-table-column>
        <el-table-column prop="j" align="center" label="创建人" />
        <el-table-column prop="k" align="center" label="创建时间" />
        <el-table-column align="center" label="操作" width="170">
          <el-button text type="primary" size="default">
            编辑
          </el-button>
          <el-button text type="danger" size="default">
            删除
          </el-button>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <el-pagination
        background
        :current-page="queryForm.pageNo"
        :layout="layout"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </PageMain>
    <distributionEdit ref="addDistribution" />
    <SurveysEdit ref="addSurveysEdit" />
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
</style>
