<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import Edit from "./components/Edit/index.vue";
import QuickEdit from './components/QuickEdit/index.vue'//快速编辑
import useUserCustomerStore from "@/store/modules/user_customer";
import api from "@/api/modules/position_manage";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "position_manage",
});

// 客户
const customerStore = useUserCustomerStore();
// 客户列表
const customerList = ref<any>([]);
// 分页
const { pagination, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
//tableSortRef
const tableSortRef = ref("");
// 列表数据
const list = ref<any>([]);
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const editRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false);
// 表格控件-高度自适应
const checkList = ref<any>([]);
const border = ref(false);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
  const QuickEditRef = ref(); //快速编辑
  const current = ref<any>()//表格当前选中
const stripe = ref(false);
const selectRows = ref<any>([]);
  const formSearchList = ref<any>()//表单排序配置
const formSearchName=ref<string>('formSearch-position_manage')// 表单排序name
// 发票状态
const invoiceStatusList = [
  { lable: "启用", value: 1 },
  { lable: "禁用", value: 2 },
];
const columns = ref<any>([
  {
    label: "职位ID",
    prop: "id",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "职位名称",
    prop: "name",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "账户数",
    prop: "count",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "备注",
    prop: "remark",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
]);
// 查询参数
const queryForm = reactive<any>({
  // 分页页码
  page: 1,
  // 每页数量
  limit: 10,
  id: null,
  // 职位名称
  name: "",
  // 是否启用 1启用 2停用
  active: null,
});

// 新增
function addData() {
  editRef.value.showEdit();
}
// 编辑数据
function editData(row: any) {
  editRef.value.showEdit(JSON.stringify(row));
}
function handleCurrentChange(val: any) {
  if (val) current.value = val.id
  else current.value = ''
}
// 快速编辑
function quickEdit(row: any, type: any) {
  /**
    备注 remark
  */
  QuickEditRef.value.showEdit(row, type)
}
// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value;
}
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    id: null,
    // 职位名称
    name: "",
    // 是否启用 1启用 2停用
    active: null,
  });
  fetchData();
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    queryForm.limit = size
    fetchData()
  });
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    queryForm.page = page
    fetchData()
  });
}
// 获取数据
async function fetchData() {
  try {
    listLoading.value = true;
    customerList.value = await customerStore.getCustomerList();
    const { data } = await api.list(queryForm);
    list.value = data.data;
    pagination.value.total = parseInt(data.total) || 0;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}
onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
  formSearchList.value = [
    {index: 1, show: true, type: 'input', modelName: 'id', placeholder: '职位ID'},
    {index: 2, show: true, type: 'input', modelName: 'name', placeholder: '职位名称'},
    {index: 3, show: true, type: 'select', modelName: 'active', placeholder: '状态', option: 'active', optionLabel: 'lable', optionValue: 'value'}
]
});
const formOption={
  active:()=> invoiceStatusList
}

</script>

<template>
  <div :class="{
    'absolute-container': tableAutoHeight,
  }" v-loading="listLoading">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="queryForm" :formOption="formOption" />
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button style="margin-right: 10px" type="primary" size="default" @click="addData">
            新增职位
          </el-button>
        </FormLeftPanel>

        <FormRightPanel>
          <el-button size="default" @click=""> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe" style="margin-left: 12px"
            @query-data="currentChange" />
        </FormRightPanel>
      </el-row>
      <el-table ref="tableSortRef" v-loading="false" style="margin-top: 10px" row-key="id" :data="list" :border="border"
        :size="lineHeight" :stripe="stripe" @selection-change="setSelectRows"  highlight-current-row
 @current-change="handleCurrentChange">
        <el-table-column align="left" type="selection" />
        <el-table-column v-if="checkList.includes('id')" prop="id" show-overflow-tooltip align="left" label="职位ID" >
          <template #default="{row}">
            <div class="copyId tableSmall">
              <div class="id oneLine  ">ID: {{ row.id }}</div>
              <copy class="copy" :content="row.id" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('name')" prop="name" show-overflow-tooltip align="left"
          label="职位名称" >
          <template #default="{row}">
            <div class="tableBig">{{row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('count')" prop="count" show-overflow-tooltip align="left"
          label="账户数">
          <template #default="{ row }">
            <div class="tableBig">{{ row.count ? row.count : "-" }}</div>
          </template></el-table-column>
        <el-table-column v-if="checkList.includes('remark')" prop="remark" show-overflow-tooltip align="left"
          label="备注">
          <template #default="{row}">
            <div class="flex-s  ">
              <div class="oneLine tableBig" style="width: calc(100% - 20px);">
                {{ row.remark ? row.remark : "-" }}
              </div>
              <SvgIcon v-if="row.projectType !== 2" @click="quickEdit(row, 'remark')"
                :class="{ edit: 'edit', current: row.id === current }" name="i-ep:edit" color="#409eff" />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" fixed="right" label="操作" width="170">
          <template #default="{ row }">
            <el-button size="small" plain type="primary" @click="editData(row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @current-change="currentChange" @size-change="sizeChange" />
      <Edit @success="fetchData" ref="editRef" />
      <QuickEdit ref="QuickEditRef" @fetchData="fetchData" />
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

.flex-s {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  >div:nth-of-type(1) {
    max-width: calc(100% - 25px);
    flex-shrink: 0;
  }

  .edit {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    flex-shrink: 0;
    display: none;
    cursor: pointer;
  }

  .current {
    display: block !important;
  }
}
.el-table__row:hover .edit {
  display: block;
}

</style>
