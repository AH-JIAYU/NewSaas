<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import Edit from "./components/Edit/index.vue";
import useUserCustomerStore from "@/store/modules/user_customer";
import api from "@/api/modules/position_manage";

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
const border = ref(true);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
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
// 删除数据
// function onDel(row: any) {
//   ElMessageBox.confirm(
//     `确认删除「${row.tenantCustomerShortName}」这条数据吗？`,
//     "确认信息"
//   )
//     .then(() => {
//       api.delete({ id: row.id }).then(() => {
//         fetchData();
//         ElMessage.success({
//           message: "删除成功",
//           center: true,
//         });
//       });
//     })
//     .catch(() => {});
// }

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
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
async function fetchData() {
  listLoading.value = true;
  customerList.value = await customerStore.getCustomerList();
  const { data } = await api.list(queryForm);
  console.log("data", data);

  list.value = data.data;
  pagination.value.total = parseInt(data.total) || 0;
  listLoading.value = false;
}
onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
});
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
    v-loading="listLoading"
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
              <el-input v-model="queryForm.id" placeholder="职位ID" clearable />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="queryForm.name"
                placeholder="职位名称"
                clearable
              />
            </el-form-item>
            <el-form-item label="">
              <el-select
                v-model="queryForm.active"
                placeholder="状态"
                clearable
                filterable
              >
                <ElOption
                  v-for="item in invoiceStatusList"
                  :label="item.lable"
                  :value="item.value"
                ></ElOption>
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
        <FormLeftPanel>
          <el-button
            style="margin-right: 10px"
            type="primary"
            size="default"
            @click="addData"
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
      >
        <el-table-column align="center" type="selection" />
        <!-- <el-table-column type="index" align="center" label="序号" width="55" /> -->
        <el-table-column
          v-if="checkList.includes('id')"
          prop="id"
          show-overflow-tooltip
          align="center"
          label="职位ID"
        />
        <el-table-column
          v-if="checkList.includes('name')"
          prop="name"
          show-overflow-tooltip
          align="center"
          label="职位名称"
        />
        <el-table-column
          v-if="checkList.includes('count')"
          prop="count"
          show-overflow-tooltip
          align="center"
          label="账户数"
        >
          <template #default="{ row }">
            {{ row.count ? row.count : "-" }}
          </template></el-table-column
        >
        <el-table-column
          v-if="checkList.includes('remark')"
          prop="remark"
          show-overflow-tooltip
          align="center"
          label="备注"
        >
          <template #default="{ row }">
            {{ row.remark ? row.remark : "-" }}
          </template></el-table-column
        >
        <el-table-column align="center" fixed="right" label="操作" width="170">
          <template #default="{ row }">
            <el-button size="small" plain type="primary" @click="editData(row)">
              编辑
            </el-button>
            <!-- <el-button size="small" plain type="danger" @click="onDel(row)">
              删除
            </el-button> -->
          </template>
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
        @current-change="currentChange"
        @size-change="sizeChange"
      />
      <Edit @success="fetchData" ref="editRef" />
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
