<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import Edit from "./components/Edit/index.vue";
import useUserCustomerStore from "@/store/modules/user_customer";
import api from "@/api/modules/finance_invoice";

defineOptions({
  name: "FinanceInvoiceIndex",
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
const checkList = ref([]);
const border = ref(true);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
// 发票状态
const invoiceStatusList = [
  { lable: "未收款", value: 1 },
  { lable: "部分收款", value: 2 },
  { lable: "已完结", value: 3 },
  { lable: "坏账", value: 4 },
];
// 时间类型
const type = ref<any>(null);
const timeArr = ref<any>([]);
const timeType = [
  { lable: "开票日期", value: 1 },
  { lable: "收款日期", value: 2 },
];
const columns = ref([
  {
    label: "选择渠道",
    prop: "ID",
    sortable: true,
    // 不可改变的
    disableCheck: true,
    checked: true,
  },
]);
// 查询参数
const queryForm = reactive<any>({
  // 分页页码
  page: 1,
  // 每页数量
  limit: 10,
  // 客户id
  tenantCustomerId: "",
  // 发票状态
  invoiceStatus: null,
  // 开票日期开始
  invoiceDateStart: "",
  // 开票日期结束
  invoiceDateEnd: "",
  // 收款日期开始
  paymentDateStart: "",
  // 收款日期结束
  paymentDateEnd: "",
});

// 新增
function addData() {
  editRef.value.showEdit("", customerList.value);
}
// 编辑数据
function editData(row: any) {
  editRef.value.showEdit(JSON.stringify(row), customerList.value);
}
// 删除数据
function onDel(row: any) {
  ElMessageBox.confirm(
    `确认删除「${row.tenantCustomerShortName}」这条数据吗？`,
    "确认信息"
  )
    .then(() => {
      api.delete({ id: row.id }).then(() => {
        fetchData();
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
      });
    })
    .catch(() => {});
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
    // 客户id
    tenantCustomerId: "",
    // 发票状态
    invoiceStatus: null,
    // 开票日期开始
    invoiceDateStart: "",
    // 开票日期结束
    invoiceDateEnd: "",
    // 收款日期开始
    paymentDateStart: "",
    // 收款日期结束
    paymentDateEnd: "",
  });
  type.value = null;
  fetchData();
}
// 类型变化时间跟着变化
const selectChange = (val: any) => {
  type.value = val;
  timeArr.value = [];
  queryForm.invoiceDateStart = "";
  queryForm.invoiceDateEnd = "";
  queryForm.paymentDateStart = "";
  queryForm.paymentDateEnd = "";
};
// 处理时间
const timeChange = () => {
  if (type.value === 1) {
    queryForm.invoiceDateStart = timeArr.value[0];
    queryForm.invoiceDateEnd = timeArr.value[1];
  } else {
    queryForm.paymentDateStart = timeArr.value[0];
    queryForm.paymentDateEnd = timeArr.value[1];
  }
};
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
  list.value = data.data;
  pagination.value.total = parseInt(data.total) || 0;
  listLoading.value = false;
}
onMounted(() => {
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
              <el-select
                v-model="queryForm.tenantCustomerId"
                placeholder="客户简称"
                clearable
                filterable
              >
                <el-option
                  v-for="item in customerList"
                  :key="item.tenantCustomerId"
                  :value="item.tenantCustomerId"
                  :label="item.customerAccord"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select
                v-model="queryForm.invoiceStatus"
                placeholder="发票状态"
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
            <el-form-item label="">
              <el-select
                v-model="type"
                placeholder="时间类型"
                clearable
                filterable
                @change="selectChange"
              >
                <ElOption
                  v-for="item in timeType"
                  :label="item.lable"
                  :value="item.value"
                ></ElOption>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker
                v-model="timeArr"
                :disabled="!type"
                value-format="YYYY-MM-DD hh:mm:ss"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                size=""
                @change="timeChange"
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
              <ElButton link @click="toggle">
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
            :icon="Plus"
            type="primary"
            size="default"
            @click="addData"
          >
            添加发票
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
          prop="tenantCustomerShortName"
          show-overflow-tooltip
          align="center"
          label="客户简称"
        />
        <el-table-column
          prop="invoiceCode"
          show-overflow-tooltip
          align="center"
          label="发票编号"
        />
        <el-table-column
          prop="invoiceAmount"
          show-overflow-tooltip
          align="center"
          label="金额"
        />
        <el-table-column
          prop="invoiceTax"
          show-overflow-tooltip
          align="center"
          label="手续费(税)"
        />
        <el-table-column
          prop="actualReceipts"
          show-overflow-tooltip
          align="center"
          label="实收款"
        />
        <el-table-column
          prop="invoiceDate"
          show-overflow-tooltip
          align="center"
          label="开票日期"
        />
        <el-table-column
          prop="paymentDate"
          show-overflow-tooltip
          align="center"
          label="收款日期"
        />
        <ElTableColumn
          align="center"
          show-overflow-tooltip
          prop="invoiceStatus"
          label="状态"
        >
          <template #default="{ row }">
            <el-text v-if="row.invoiceStatus === 1" class="mx-1" type="info"
              >未收款</el-text
            >
            <el-text v-if="row.invoiceStatus === 2" class="mx-1" type="warning"
              >部分收款</el-text
            >
            <el-text v-if="row.invoiceStatus === 3" class="mx-1" type="success"
              >已完结</el-text
            >
            <el-text v-if="row.invoiceStatus === 4" class="mx-1" type="danger"
              >坏账</el-text
            >
          </template>
        </ElTableColumn>
        <el-table-column prop="remark" align="center" label="备注" />
        <el-table-column align="center" label="操作" width="170">
          <template #default="{ row }">
            <el-button size="small" plain type="primary" @click="editData(row)">
              编辑
            </el-button>
            <el-button size="small" plain type="danger" @click="onDel(row)">
              删除
            </el-button>
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
