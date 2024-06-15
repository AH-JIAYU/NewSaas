<script setup lang="ts">
import { reactive, ref } from 'vue'

defineOptions({
  name: 'FinanceSupplierSettlementIndex',
})
const { pagination, onSizeChange, onCurrentChange } = usePagination() // 分页
// 分页
const tableSortRef = ref('')
// loading加载
const listLoading = ref<boolean>(true)
const isShow = ref(false)
// 获取组件变量
const editRef = ref()
// 右侧工具栏配置变量
const tableAutoHeight = ref(false) // 表格控件-高度自适应
const checkList = ref([])
const border = ref(true)
const isFullscreen = ref(false)
const lineHeight = ref<any>('default')
const stripe = ref(false)
const selectRows = ref<any>([])
const columns = ref([
  {
    label: '项目ID',
    prop: 'ID',
    sortable: true,
    // 不可改变的
    disableCheck: true,
    checked: true,
  },
])
// 查询参数
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 10,
  title: '',
  order: {
    id: 'ASC',
  },
  select: {},
})
const list = ref<any>([])
// 编辑数据
function editData() {
  // if (!selectRows.value.length) editRef.value.dialogTableVisible = true;
  isShow.value = true
}
// 右侧工具方法
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value
}
// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value
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
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData())
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData())
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
  pagination.value.total = 3
  listLoading.value = false
}
onMounted(() => {
  fetchData()
})
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
            :model="queryForm.select"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model="queryForm.select.a"
                clearable
                placeholder="供应商ID"
              />
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                size=""
              />
            </el-form-item>
            <el-form-item label="">
              <el-select
                value-key=""
                placeholder="状态"
                clearable
                filterable
                @change=""
              />
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
        <FormLeftPanel />

        <FormRightPanel>
          <el-button size="default" @click="">
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

            @query-data="currentChange"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        ref="tableSortRef"
        v-loading="false"
        style="margin-top: 10px"
        row-key="id"
        :data="list"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column type="expand" />
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column
          prop="a"
          show-overflow-tooltip
          align="center"
          label="站长ID"
        />
        <el-table-column
          prop="b"
          show-overflow-tooltip
          align="center"
          label="货币类型"
        />
        <el-table-column
          prop="c"
          show-overflow-tooltip
          align="center"
          label="结算金额"
        />
        <el-table-column
          prop="d"
          show-overflow-tooltip
          align="center"
          label="税费"
        />
        <el-table-column
          prop="e"
          show-overflow-tooltip
          align="center"
          label="实付金额"
        />
        <el-table-column
          prop="f"
          show-overflow-tooltip
          align="center"
          label="账户金额"
        />
        <ElTableColumn
          align="center"
          show-overflow-tooltip
          prop=""
          label="状态"
        >
          <ElSwitch inline-prompt active-text="启用" inactive-text="禁用" />
        </ElTableColumn>
        <el-table-column
          prop="h"
          show-overflow-tooltip
          align="center"
          label="创建时间"
        />
        <el-table-column align="center" label="操作" width="170">
          <el-button
            v-if="!isShow"
            size="small"
            plain
            type="primary"
            @click="editData"
          >
            确认收票
          </el-button>
          <el-button v-if="isShow" size="small" plain @click="">
            支付
          </el-button>
          <el-button v-if="isShow" size="small" plain type="danger" @click="">
            拒绝
          </el-button>
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
  </div>
</template>

<style scoped lang="scss">
.el-pagination {
  margin-top: 15px;
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
