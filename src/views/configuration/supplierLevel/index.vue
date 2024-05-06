<script setup lang="ts">
defineOptions({
  name: 'ConfigurationSupplierLevelIndex',
})
import { Aim } from '@element-plus/icons-vue'
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Sortable from 'sortablejs' // 拖拽排序插件
import edit from './components/Edit/index.vue'


const listLoading = ref(false);
const layout = ref("total, sizes, prev, pager, next, jumper"); //分页配置
const EditRef = ref() //组件ref 添加/编辑
const list: any = ref([]); //列表
const selectRows = ref(""); //表格-选中行
const total = ref(0); //总页数
const border = ref(true); //表格控件-是否展示边框
const stripe = ref(false); //表格控件-是否展示斑马条
const lineHeight = ref("default"); //表格控件-控制表格大小
const isFullscreen = ref(false); //表格控件-是否全屏
const checkList = ref([]); //表格-展示的列

function handleAdd() {//添加
  EditRef.value.showEdit()
}
function handleEdit(id: any) { //编辑
  EditRef.value.showEdit(id)
}
function handleDelete(row: any) { //删除
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
    if (selectRows.value.length > 0) {
      // const ids = selectRows.value.map(item => item.id).join()
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
      ElMessage.warning('您未选中任何行')
    }
  }
}

const columns = ref([//表格控件-展示列
  {
    label: "等级名称",
    prop: "a",
    sortable: true,
    disableCheck: false, //不可更改
    checked: true, //默认展示
  },
]);
const queryForm = reactive({ //请求接口携带参数
  pageNo: 1,
  pageSize: 10,
  select: {},
});

// 全屏
function clickFullScreen() {
  isFullscreen.value = !isFullscreen.value;
}
// 重置请求
function queryData() {
  queryForm.pageNo = 1;
  fetchData();
}
// 分页-更改每页个数
function handleSizeChange(val: number) {
  queryForm.pageSize = val;
  fetchData();
}
// 分页-更改页数
function handleCurrentChange(val: number) {
  queryForm.pageNo = val;
  fetchData();
}
// 请求
async function fetchData() {
  listLoading.value = true;
  // const { data } = await getList(queryForm)
  // list.value = data[0]
  // total.value = data[0].length
  list.value = [
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 1 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 2 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 3 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 4 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 5 },
    { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, r: 9, i: 10, id: 6 },
  ];
  listLoading.value = false;
}
// 表格-单选框
function setSelectRows(val: any) {
  selectRows.value = val;
}

// 行拖拽
const rowDrag = function () {
  console.log(111)
  // 要拖拽元素的父容器
  const tbody = document.querySelector(
    ".draggable .el-table_body-wrapper tbody"
  );
  if (!tbody) return;
  Sortable.create(tbody as HTMLElement, {
    //  可被拖拽的子元素
    draggable: " .drag-handler .el-table__row",
    onEnd(event:SortableEvent) {
      if (event.oldIndex !== undefined && event.newIndex !== undefined) {
        const currRow = tableList.splice(event.oldIndex, 1)[0];
        tableList.splice(event.newIndex, 0, currRow);
      }
    },
  });
};
onMounted(async () => {
  columns.value.forEach((item: any) => {
    if (item.checked) checkList.value.push(item.prop);
  });
  await fetchData();
  await rowDrag()
});
</script>

<template>
  <div :class="{ 'vab-table-fullscreen': isFullscreen }">
    <PageMain>
      <el-row>
        <FormLeftPanel>
          <el-button size="default" type="primary" @click="handleAdd"> 新增 </el-button>
          <el-button size="default" type="danger" @click="handleDelete"> 删除 </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:checkList="checkList" v-model:columns="columns"
            v-model:is-fullscreen="isFullscreen" v-model:line-height="lineHeight" v-model:stripe="stripe"
            style="margin-left: 12px" @click-full-screen="clickFullScreen" @query-data="queryData" />
        </FormRightPanel>
      </el-row>
      <el-row>
        <el-table v-loading="listLoading" class="draggable" :border="border" :data="list" :size="lineHeight"
          :stripe="stripe" fit @selection-change="setSelectRows">
          <el-table-column align="center" label="" width="80" row-key='id'>
            <template #default="{ }">
              <el-icon class="drag-handler">
                <Aim />
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="a" show-overflow-tooltip type="selection" />
          <el-table-column v-if="checkList.includes('a')" align="center" prop="id" show-overflow-tooltip label="等级名称" />
          <el-table-column align="center" prop="b" show-overflow-tooltip label="加成比例(百分比)" />
          <el-table-column align="center" prop="c" show-overflow-tooltip label="成员数量" />
          <el-table-column align="center" show-overflow-tooltip label="操作">
            <template #default="{ row }">
              <el-button size="default" link type="primary" @click="handleEdit(row)"> 编辑 </el-button>
              <el-button size="default" link type="danger" @click="handleDelete(row)"> 删除 </el-button>
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
    <edit ref='EditRef'></edit>
  </div>
</template>

<style lang="scss" scoped>
// 样式</style>
