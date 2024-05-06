<script setup lang="ts">
defineOptions({
  name: 'UserCustomerIndex',
})
import { onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import customerEdit from './components/CustomerEdit/index.vue'
import customerDetail from './components/CustomerDetail/index.vue'

const fold = ref(true)
const listLoading = ref(false)
const layout = ref('total, sizes, prev, pager, next, jumper')
const list = ref([])
const selectRows = ref('')
const total = ref(0)
const border = ref(true)
const stripe = ref(false)
const lineHeight = ref('default')
const isFullscreen = ref(false)
const checkList = ref([])
const editRef = ref('')
const checkRef = ref('')
const columns = ref([
  {
    label: '等级名称',
    prop: 'name',
    sortable: true,
    // 不可改变的
    disableCheck: true,
    checked: true,
  },
])

function handleAdd() {
  editRef.value.showEdit()
}
function handleEdit(row) {
  editRef.value.showEdit(row)
}
function handleCheck(row) {
  checkRef.value.showEdit(row)
}
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value
}

function handleDelete(row) {
  if (row.id) {
    ElMessageBox.confirm(`您确定要删除当前项吗?`, '确认信息').then(() => {
      // apiManager.delete(row.id).then(() => {
      //   getDataList()
      //   ElMessage.success({
      //     message: '模拟删除成功',
      //     center: true,
      //   })
      // })
    }).catch(() => { })
  }
  else {
    console.log(1)
    if (selectRows.value.length > 0) {
      const ids = selectRows.value.map(item => item.id).join()
      ElMessageBox.confirm(`您确定要删除当前项吗?`, '确认信息').then(() => {
        // apiManager.delete(row.id).then(() => {
        //   getDataList()
        //   ElMessage.success({
        //     message: '模拟删除成功',
        //     center: true,
        //   })
        // })
      }).catch(() => { })
    }
    else {
      // $baseMessage('您未选中任何行', 'warning', 'vab-hey-message-error')
    }
  }
}

const queryForm = reactive({
  pageNo: 1,
  pageSize: 10,
  select: {},
})
function handleFold() {
  fold.value = !fold.value
}
function onReset() {
  Object.assign(queryForm, {
    pageNo: 1,
    pageSize: 10,
    select: {},
    order: {
      id: 'ASC',
    },
  })
}
function queryData() {
  queryForm.pageNo = 1
  fetchData()
}
function handleSizeChange(val) {
  queryForm.pageSize = val
  fetchData()
}
function handleCurrentChange(val) {
  queryForm.pageNo = val
  fetchData()
}
async function fetchData() {
  listLoading.value = true
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
  ]
  listLoading.value = false
}
function setSelectRows(val) {
  selectRows.value = val
}
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div :class="{ 'vab-table-fullscreen': isFullscreen }">
    <PageMain>
      <el-row>
        <el-form :inline="true" label-position="right" :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model.trim="queryForm.select.id" clearable :inline="false" placeholder="客户简称" />
          </el-form-item>
          <el-form-item v-show="!fold">
            <el-select v-model="queryForm.select.name" clearable placeholder="负责人">
              <el-option label="name" value="name" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="!fold">
            <el-select v-model="queryForm.select.default" clearable placeholder="客户状态">
              <el-option label="默认" value="true" />
              <el-option label="关闭" value="false" />
            </el-select>
          </el-form-item>
          <TableQuery :fold="fold" :list-loading="listLoading" @handle-fold="handleFold" @on-reset="onReset"
            @query-data="queryData" />
        </el-form>
      </el-row>
      <el-row>
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="handleAdd">
            新增
          </el-button>
          <el-button type="danger" size="default">
            删除
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default">
            导出
          </el-button>
          <TabelControl v-model:border="border" v-model:checkList="checkList" v-model:columns="columns"
            v-model:is-fullscreen="isFullscreen" v-model:line-height="lineHeight" v-model:stripe="stripe"
            style="margin-left: 12px;" @click-full-screen="clickFullScreen" @query-data="queryData" />
        </FormRightPanel>
      </el-row>
      <el-row>
        <el-table v-loading="listLoading" :border="border" :data="list" :size="lineHeight" :stripe="stripe"
          @selection-change="setSelectRows">
          <el-table-column align="center" prop="a" show-overflow-tooltip type="selection" />
          <el-table-column align="center" prop="b" show-overflow-tooltip label="客户名称" />
          <el-table-column align="center" prop="c" show-overflow-tooltip label="客户简称" />
          <el-table-column align="center" prop="d" show-overflow-tooltip label="客户营业限额($/月)" />
          <el-table-column align="center" prop="e" show-overflow-tooltip label="审核率Min值" />
          <el-table-column align="center" prop="f" show-overflow-tooltip label="负责人" />
          <el-table-column align="center" prop="g" show-overflow-tooltip label="创建人" />
          <el-table-column align="center" prop="h" show-overflow-tooltip label="创建时间" />
          <el-table-column align="center" prop="r" show-overflow-tooltip label="客户状态" />
          <el-table-column align="center" prop="i" label="操作" show-overflow-tooltip width="300">
            <template #default="{ row }">
              <el-button text type="primary" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button text type="primary" @click="handleCheck(row)">
                详情
              </el-button>
              <el-button text type="danger" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
          <template #empty>
            <el-empty class="vab-data-empty" description="暂无数据" />
          </template>
        </el-table>
      </el-row>

      <el-pagination background :current-page="queryForm.pageNo" :layout="layout" :page-size="queryForm.pageSize"
        :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </PageMain>
    <customerEdit ref="editRef" @fetch-data="fetchData" />
    <customerDetail ref="checkRef" @fetch-data="fetchData" />
  </div>
</template>
