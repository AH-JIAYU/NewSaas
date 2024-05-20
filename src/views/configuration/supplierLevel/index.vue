<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import Sortable from 'sortablejs' // 拖拽排序插件
import edit from './components/Edit/index.vue'

defineOptions({
  name: 'ConfigurationSupplierLevelIndex',
})

const { pagination, onSizeChange, onCurrentChange } = usePagination() // 分页

const listLoading = ref(false)
const EditRef = ref() // 组件ref 添加/编辑
const list = ref<any>([]) // 列表
const selectRows = ref('') // 表格-选中行
const checkList = ref<any>([]) // 表格-展示的列
const border = ref(true) // 表格控件-是否展示边框
const stripe = ref(false) // 表格控件-是否展示斑马条
const lineHeight = ref<any>('default') // 表格控件-控制表格大小
const tableAutoHeight = ref(false) // 表格控件-高度自适应
const columns = ref([
  // 表格控件-展示列
  {
    label: '等级名称',
    prop: 'a',
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
])

function handleAdd() {
  // 添加
  EditRef.value.showEdit()
}
function handleEdit(id: any) {
  // 编辑
  EditRef.value.showEdit(id)
}
function handleDelete(row: any) {
  // 删除
  if (row.id) {
    ElMessageBox.confirm(`您确定要删除当前项吗?`, '确认信息')
      .then(() => {
        // apiManager.delete(row.id).then(() => {
        //   getDataList()
        //   ElMessage.success({
        //     message: '模拟删除成功',
        //     center: true,
        //   })
        // })
      })
      .catch(() => {})
  }
}

const queryForm = reactive<any>({
  // 请求接口携带参数
  pageNo: 1,
  pageSize: 10,
  select: {},
})

// 重置请求
function queryData() {
  queryForm.pageNo = 1
  fetchData()
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData())
}
// 请求
async function fetchData() {
  listLoading.value = true
  // const { data } = await getList(queryForm)
  // list.value = data[0]
  // total.value = data[0].length
  list.value = [
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 9 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 3 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 4 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 5 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 6 },
  ]
  listLoading.value = false
}
// 表格-单选框
function setSelectRows(val: any) {
  selectRows.value = val
}
// 强制更新页面
const forceUpdate = ref(0)
// 表格ref
const elTableRef = ref()
// 拖拽
function rowDrop() {
  const tbody = elTableRef.value.$el.querySelector(
    '.el-table__body-wrapper tbody',
  )
  Sortable.create(tbody, {
    handle: '.sortable',
    animation: 300,
    ghostClass: 'ghost',
    onEnd: ({ newIndex, oldIndex }) => {
      if (newIndex === undefined || oldIndex === undefined) {
        return
      }
      nextTick(() => rowDrop())
    },
  })
}

onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) { checkList.value.push(item.prop) }
  })
  fetchData()
  nextTick(() => {
    rowDrop()
  })
})
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <el-row>
        <FormLeftPanel>
          <el-button size="default" type="primary" @click="handleAdd">
            新增
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default">
            导出
          </el-button>
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px"
            @query-data="queryData"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        ref="elTableRef"
        :key="forceUpdate"
        v-loading="listLoading"
        row-key="id"
        :border="border"
        :data="list"
        :size="lineHeight"
        :stripe="stripe"
        fit
        @selection-change="setSelectRows"
      >
        <ElTableColumn width="80" align="center" fixed>
          <template #header>
            排序
          </template>
          <template #default>
            <ElTag type="info" class="sortable">
              <SvgIcon name="i-ep:d-caret" />
            </ElTag>
          </template>
        </ElTableColumn>
        <el-table-column
          v-if="checkList.includes('a')"
          align="center"
          prop="id"
          show-overflow-tooltip
          label="等级名称"
        />
        <el-table-column
          align="center"
          prop="b"
          show-overflow-tooltip
          label="加成比例(百分比)"
        />
        <el-table-column
          align="center"
          prop="c"
          show-overflow-tooltip
          label="成员数量"
        />
        <el-table-column align="center" show-overflow-tooltip label="操作">
          <template #default="{ row }">
            <el-button
              size="small"
              plain
              type="primary"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              plain
              type="danger"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty class="vab-data-empty" description="暂无数据" />
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
    <edit ref="EditRef" />
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
// 拖拽
.el-tag.sortable,
.el-tag.sortable .icon {
  cursor: ns-resize;
}

</style>
