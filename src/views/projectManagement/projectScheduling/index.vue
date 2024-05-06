<script setup lang="ts">
  defineOptions({
    name: 'projectScheduling',
  })
import { ElMessage } from "element-plus";
import {ref,reactive } from 'vue'
import {Delete,Plus} from '@element-plus/icons-vue'
import deletes from './components/Delete/index.vue'
import edit from './components/Edit/index.vue'
// 查询组件变量
const fold = ref<boolean>(false)
// 分页
const layout = ref<string>('total, sizes, prev, pager, next, jumper')
const total = ref<any>(0)
const tableSortRef = ref('')
// loading加载
const listLoading = ref<boolean>(true)
const border = ref(true)
// 获取组件变量
const deleteRef = ref()
const editRef = ref()
const detailsRef = ref()
// 右侧工具栏配置变量
const checkList = ref([])
const isFullscreen = ref(false)
const lineHeight = ref('default')
const stripe = ref(false)
const selectRows = ref<any>([]);
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
// 新增数据
const addData = () =>{
  if (!selectRows.value.length)
  editRef.value.isShow = true
}
// 编辑数据
const editData = () =>{
  if (!selectRows.value.length)
  editRef.value.isShow = true
}
// 删除数据
const deleteData = () =>{
  if (!selectRows.value.length)
    return ElMessage({ message: "请选择至少一条数据", type: "warning" });
  deleteRef.value.isShow = true
  deleteRef.value.replyData(selectRows.value)
}

// 折叠查询表单
function handleFold() {
  fold.value = !fold.value
}
// 工具配置项
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value
}
// 获取列表选中数据
const setSelectRows = (value: any) => {
  selectRows.value = value;
};
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
  <div :class="{ 'vab-table-fullscreen': isFullscreen }">
    <PageMain>
      <el-form inline label-position="right" label-width="80px" :model="queryForm" @submit.prevent>
        <el-form-item label="">
          <el-input clearable placeholder="项目ID" />
        </el-form-item>
        <el-form-item v-show="!fold" label="">
          <el-input clearable placeholder="项目名称" />
        </el-form-item>
        <tableQuery :fold="fold" :list-loading="listLoading" @handle-fold="handleFold" @on-reset="onReset" @query-data="queryData" />
      </el-form>
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button type="primary" :icon="Plus" size="default" @click="addData">
            添加
          </el-button>
          <el-button type="danger" :icon="Delete" size="default" @click="deleteData">
            删除
          </el-button>
        </FormLeftPanel>

          <FormRightPanel>
            <el-button style="margin-right: 10px;" size="default" @click="">
            导出
          </el-button>
          <TabelControl
            v-model:border="border"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:is-fullscreen="isFullscreen"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px;"
            @click-full-screen="clickFullScreen"
            @query-data="queryData"/>
          </FormRightPanel>


      </el-row>
      <el-table
        style="margin-top: 10px;"
        ref="tableSortRef"
        v-loading="false"
        row-key="id"
        :data="list"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column prop="e" align="center" label="类型" />
        <el-table-column prop="d" align="center" label="项目ID" />
        <el-table-column prop="e" align="center" label="项目名称" />
        <el-table-column prop="a" align="center" label="指定供应商" />
        <el-table-column prop="b" align="center" label="国家" />
        <el-table-column prop="c" align="center" label="原价" />
        <el-table-column prop="h" align="center" label="创建时间" />
        <el-table-column align="center" label="操作" width="170">
          <el-button text type="primary" size="default" @click="editData">
            编辑
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
      <deletes ref="deleteRef"/>
      <edit ref="editRef"/>
    </PageMain>
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
