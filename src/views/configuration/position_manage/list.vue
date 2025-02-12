<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import api from "@/api/modules/position_manage";
//快速编辑
import QuickEdit from "./components/QuickEdit/index.vue";
import useUserCustomerStore from "@/store/modules/user_customer";
import Edit from "./components/Edit/index.vue";
import empty from "@/assets/images/empty.png";
import { columns, formSearchList } from "./components/configuration/index.ts";

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
const lineHeight = ref<any>("default");
//快速编辑
const QuickEditRef = ref();
//表格当前选中
const current = ref<any>();
const stripe = ref(false);
const selectRows = ref<any>([]);
// 表单排序name
const formSearchName = ref<string>("formSearch-position_manage");
// 发票状态
const invoiceStatusList = [
  { lable: "启用", value: 1 },
  { lable: "禁用", value: 2 },
];
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
  if (val) current.value = val.id;
  else current.value = "";
}

// 快速编辑
function quickEdit(row: any, type: any) {
  /**
    备注 remark
  */
  QuickEditRef.value.showEdit(row, type);
}

// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value;
}

// 删除部门
function deleteData(row: any) {
  ElMessageBox.confirm(`确认删除「${row.name}」吗？`, "确认信息").then(
    async () => {
      const res = await api.delete({ id: row.id });
      if (res.status === 1) {
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
        fetchData();
      }
    },
  );
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
    queryForm.limit = size;
    fetchData();
  });
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    queryForm.page = page;
    fetchData();
  });
}
// 获取数据
async function fetchData() {
  try {
    listLoading.value = true;
    customerList.value = await customerStore.getCustomerList();
    const { data, status } = await api.list(queryForm);
    if (data && status === 1) {
      list.value = data.data;
      pagination.value.total = parseInt(data.total) || 0;
    }

    listLoading.value = false;
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
onMounted(() => {
  columns.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
});
const formOption = {
  active: () => invoiceStatusList,
};
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
    v-loading="listLoading"
  >
    <PageMain>
      <FormSearch
        :formSearchList="formSearchList"
        :formSearchName="formSearchName"
        @currentChange="currentChange"
        @onReset="onReset"
        :model="queryForm"
        :formOption="formOption"
      />
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button
            style="margin-right: 10px"
            type="primary"
            size="default"
            @click="addData"
            v-auth="'position_manage-insert-insertPosition'"
          >
            新增职位
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default" @click=""> 导出 </el-button>
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
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <!-- <el-table-column align="left" type="selection" /> -->
        <el-table-column
          v-if="checkList.includes('id')"
          prop="id"
          show-overflow-tooltip
          align="left"
          label="职位ID"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine idFont">{{ row.id }}</div>
              <copy
                :content="row.id"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
                class="littleButton"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('name')"
          prop="name"
          show-overflow-tooltip
          align="left"
          label="职位名称"
        >
          <template #default="{ row }">
            <div class="tableBig">{{ row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('count')"
          prop="count"
          show-overflow-tooltip
          align="left"
          label="账户数"
        >
          <template #default="{ row }">
            <div class="fontC-System">{{ row.count ? row.count : "-" }}</div>
          </template></el-table-column
        >
        <el-table-column
          v-if="checkList.includes('remark')"
          prop="remark"
          show-overflow-tooltip
          align="left"
          label="备注"
        >
          <template #default="{ row }">
            <div class="flex-s">
              <div
                class="oneLine fontC-System"
                style="width: calc(100% - 20px)"
              >
                {{ row.remark ? row.remark : "-" }}
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'remark')"
                :class="{ edit: 'edit', current: row.id === current }"
                name="i-ep:edit"
                color="#409eff"
                v-auth="'position_manage-update-updatePosition'"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" fixed="right" label="操作" width="170">
          <template #default="{ row }">
            <el-button
              size="small"
              plain
              type="primary"
              @click="editData(row)"
              v-auth="'position_manage-update-updatePosition'"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              plain
              type="danger"
              @click="deleteData(row)"
              v-auth="'position_manage-delete-deletePosition'"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
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
        @current-change="currentChange"
        @size-change="sizeChange"
      />
      <Edit @success="fetchData" ref="editRef" />
      <QuickEdit ref="QuickEditRef" @fetchData="fetchData" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.el-pagination {
  margin-top: 15px;
}
.copyId .idFont {
  font-size: 0.875rem;
}
.copyId .current {
  display: block !important;
}
.rowCopy {
  width: 20px;
  display: none;
}
.copyId .current {
  display: block !important;
}
.el-table__row:hover .rowCopy {
  display: block;
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

  > div:nth-of-type(1) {
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

.littleButton {
  position: absolute;
  right: 10px;
}
</style>
