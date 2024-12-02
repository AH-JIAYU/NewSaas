<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import Edit from "./components/Edit/index.vue";
import useUserCustomerStore from "@/store/modules/user_customer";
import api from "@/api/modules/finance_invoice";
import empty from "@/assets/images/empty.png";

defineOptions({
  name: "invoice",
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
const columns = ref<any>([
  {
    label: "客户简称",
    prop: "tenantCustomerShortName",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "发票编号",
    prop: "invoiceCode",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "金额",
    prop: "invoiceAmount",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "手续费(税)",
    prop: "invoiceTax",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "实收款",
    prop: "actualReceipts",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "开票日期",
    prop: "invoiceDate",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "收款日期",
    prop: "paymentDate",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "状态",
    prop: "invoiceStatus",
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
  // 客户id
  tenantCustomerId: "",
  // 发票状态
  invoiceStatus: [],
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
  editRef.value.showEdit("");
}
// 编辑数据
function editData(row: any) {
  editRef.value.showEdit(JSON.stringify(row));
}
// 删除数据
function onDel(row: any) {
  ElMessageBox.confirm(
    `确认删除「${row.tenantCustomerShortName}」这条数据吗？`,
    "确认信息"
  )
    .then(() => {
      try {
        listLoading.value = true;
        api.delete({ id: row.id }).then(() => {
          listLoading.value = false;
          fetchData();
          ElMessage.success({
            message: "删除成功",
            center: true,
          });
        });
      } catch (error) {
      } finally {
        listLoading.value = false;
      }
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
    invoiceStatus: [],
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
  currentChange();
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
  currentChange();
};
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
                @change="currentChange()"
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
                @change="currentChange()"
                :multiple=true
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
            type="primary"
            size="default"
            @click="addData"
          >
            新增发票
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
        class="my-4"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column align="left" type="selection" />
        <!-- <el-table-column type="index" align="left" label="序号" width="55" /> -->
        <el-table-column
          v-if="checkList.includes('tenantCustomerShortName')"
          prop="tenantCustomerShortName"
          show-overflow-tooltip
          align="left"
          width="100"
          label="客户简称"
        >
          <template #default="{ row }">
            <el-text class="fontColor tableBig">{{
              row.tenantCustomerShortName
            }}</el-text>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('invoiceCode')"
          prop="invoiceCode"
          show-overflow-tooltip
          align="left"
          label="发票编号"
        >
          <template #default="{ row }">
            <el-text class="fontColor">{{ row.invoiceCode }}</el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('invoiceAmount')"
          prop="invoiceAmount"
          show-overflow-tooltip
          align="left"
          label="金额"
        >
          <template #default="{ row }">
            <CurrencyType />
            <el-text class="fontColor">{{ row.invoiceAmount || 0 }}</el-text>
          </template></el-table-column
        >
        <el-table-column
          v-if="checkList.includes('invoiceTax')"
          prop="invoiceTax"
          show-overflow-tooltip
          align="left"
          label="手续费(税)"
        >
          <template #default="{ row }">
            <CurrencyType /><el-text class="fontColor">{{ row.invoiceTax || 0 }}</el-text>
          </template></el-table-column
        >
        <el-table-column
          v-if="checkList.includes('actualReceipts')"
          prop="actualReceipts"
          show-overflow-tooltip
          align="left"
          label="实收款"
        >
          <template #default="{ row }">
            <CurrencyType /><el-text class="fontColor">{{
              row.actualReceipts || 0
            }}</el-text>
          </template></el-table-column
        >
        <el-table-column
          v-if="checkList.includes('invoiceDate')"
          prop="invoiceDate"
          show-overflow-tooltip
          align="left"
              width="180"
          label="开票日期"
        >
        <template #default="{ row }">
            <el-text class="fontColor">{{
              row.invoiceDate
            }}</el-text>
          </template></el-table-column
        >
        <el-table-column
          v-if="checkList.includes('paymentDate')"
          prop="paymentDate"
          show-overflow-tooltip
          align="left"
                width="180"
          label="收款日期"
        >
        <template #default="{ row }">
            <el-text class="fontColor">{{
              row.paymentDate
            }}</el-text>
          </template></el-table-column
        >
        <ElTableColumn
          v-if="checkList.includes('invoiceStatus')"
          align="left"
          show-overflow-tooltip
          prop="invoiceStatus"
          label="状态"
        >
          <template #default="{ row }">
            <el-text v-if="row.invoiceStatus === 1" class="mx-1  color1 fontC-System"
              >未收款</el-text
            >
            <el-text v-if="row.invoiceStatus === 2" class="mx-1  color2 fontC-System"
              >部分收款</el-text
            >
            <el-text v-if="row.invoiceStatus === 3" class="mx-1  color3 fontC-System"
              >已完结</el-text
            >
            <el-text v-if="row.invoiceStatus === 4" class="mx-1  color4 fontC-System"
              >坏账</el-text
            >
          </template>
        </ElTableColumn>
        <el-table-column
          v-if="checkList.includes('remark')"
          prop="remark"
          align="left"
          label="备注"
        >
        <template #default="{ row }">
        <el-text class="mx-1  fontC-System"
              >{{ row.remark }}</el-text
            >
            </template>
        </el-table-column>
        <el-table-column align="left" fixed="right" label="操作" width="170">
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
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.fontColor {
  color: #333333 !important;
}
.color1 {
  color:#FFB365 !important;
}
.color2 {
  color:#409EFF !important;
}
.color3 {
  color:#03C239 !important;
}
.color4{
  color:#FB6868 !important;
}
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
