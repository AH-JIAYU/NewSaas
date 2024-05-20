<script setup lang="ts">
import { onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import customerEdit from './components/CustomerEdit/index.vue'
import customerDetail from './components/CustomerDetail/index.vue'

defineOptions({
  name: 'UserCustomerIndex',
})

const { pagination, onSizeChange, onCurrentChange } = usePagination() // 分页

const listLoading = ref(false) // 加载
const list = ref<Array<Object>>([]) // 表格数据
const editRef = ref<any>() // 组件ref 添加编辑
const checkRef = ref<any>() // 组件ref 查看

const selectRows = ref() // 表格选中行
const border = ref(true) // 表格控件-边框
const stripe = ref(false) // 表格控件-条纹
const tableAutoHeight = ref(false) // 表格控件-高度自适应
const lineHeight = ref<any>('default') // 表格控件-大小
const checkList = ref([]) // 表格控件-展示列
const columns = ref([ // 表格控件-展示列配置
  {
    label: '等级名称',
    prop: 'name',
    sortable: true,
    // 不可改变的
    disableCheck: true,
    checked: true,
  },
])

function handleAdd() { // 添加
  editRef.value.showEdit()
}
function handleEdit(row: Object) { // 编辑
  editRef.value.showEdit(row)
}
function handleCheck(row: Object) { // 查看
  checkRef.value.showEdit(row)
}

function handleDelete(row: any) {
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
}

const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 10,
  select: {},
})
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
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    pageNo: 1,
    pageSize: 10,
    select: {},
  })
}
async function fetchData() {
  listLoading.value = true
  // const { data } = await getList(queryForm)
  // list.value = data[0]
  // total.value = data[0].length
  list.value = [
    { name: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { name: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { name: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { name: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { name: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { name: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
  ]
  listLoading.value = false
}
function setSelectRows(val: any) {
  selectRows.value = val
}
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm
            :model="queryForm.select" size="default" label-width="100px" inline-message inline
            class="search-form"
          >
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
            <ElFormItem>
              <ElButton type="primary" @click="currentChange()">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton @click="onReset">
                <template #icon>
                  <div class="i-grommet-icons:power-reset h-1em w-1em" />
                </template>
                重置
              </ElButton>
              <ElButton disabled link @click="toggle">
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
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="handleAdd">
            <template #icon>
              <SvgIcon name="i-ep:plus" />
            </template>
            新增
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default">
            导出
          </el-button>
          <TabelControl
            v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe"
            style="margin-left: 12px;" @query-data="queryData"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        v-loading="listLoading" :border="border" :data="list" :size="lineHeight" :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column align="center" prop="a" show-overflow-tooltip type="selection" />
        <el-table-column align="center" prop="b" show-overflow-tooltip label="客户名称" />
        <el-table-column align="center" prop="c" show-overflow-tooltip label="客户简称" />
        <el-table-column align="center" prop="d" show-overflow-tooltip label="客户营业限额($/月)" />
        <el-table-column align="center" prop="e" show-overflow-tooltip label="审核率Min值" />
        <el-table-column align="center" prop="f" show-overflow-tooltip label="负责人" />
        <el-table-column align="center" prop="g" show-overflow-tooltip label="创建人" />
        <el-table-column align="center" prop="h" show-overflow-tooltip label="创建时间" />
        <ElTableColumn align="center" show-overflow-tooltip prop="" label="客户状态">
          <ElSwitch inline-prompt active-text="启用" inactive-text="禁用" />
        </ElTableColumn>
        <el-table-column align="center" prop="i" label="操作" show-overflow-tooltip width="200">
          <template #default="{ row }">
            <ElSpace>
              <el-button size="small" plain type="primary" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button
                type="primary"
                plain
                size="small"
                @click="handleCheck(row)"
              >
                详情
              </el-button>
              <el-button
                type="danger"
                plain
                size="small"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </ElSpace>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty class="vab-data-empty" description="暂无数据" />
        </template>
      </el-table>
      <ElPagination
        :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange"
      />
      <customerEdit ref="editRef" @fetch-data="fetchData" />
      <customerDetail ref="checkRef" @fetch-data="fetchData" />
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
