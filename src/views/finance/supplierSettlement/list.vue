<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/finance_supplierSettlement";
import UseUserSupplier from "@/store/modules/user_supplier"; // 供应商
const userSupplier = UseUserSupplier(); // 供应商

defineOptions({
  name: "supplierSettlement",
});
const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
// 时间
const { format } = useTimeago();
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const editRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const checkList = ref<any>([]);
const border = ref(true);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
const billStatusList = ["待收票", "待支付", "已支付", "已拒绝"];
const payMethod = userSupplier.payMethod; // 付款方式
const columns = ref<any>([
  { label: "供应商ID", prop: "supplierId", sortable: true, checked: true },
  { label: "账单日期", prop: "billTime", sortable: true, checked: true },
  { label: "账单金额", prop: "billAmount", sortable: true, checked: true },
  { label: "税费", prop: "taxesFees", sortable: true, checked: true },
  { label: "实付金额", prop: "payAmount", sortable: true, checked: true },
  { label: "状态", prop: "billStatus", sortable: true, checked: true },
]);
// 查询参数
const queryForm = ref<any>({
  supplierId: "", //	供应商id
  billStatus: "", //账单状态: 1:待收票 2:待支付 3:已支付 4:已拒绝
  time: [],
  beginTime: "", //开始时间
  endTime: "", //	结束时间
});
const list = ref<any>([]);

// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value;
}
// 重置数据
function onReset() {
  Object.assign(queryForm.value, {
    supplierId: 0, //	供应商id
    billStatus: 0, //账单状态: 1:待收票 2:待支付 3:已支付 4:已拒绝
    time: [],
    beginTime: "", //开始时间
    endTime: "", //	结束时间
  });
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 获取列表数据
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm.value,
    };
    const res = await api.list(params);
    list.value = res.data.tenantSupplierBillInfoList;
    pagination.value.total = res.data.total;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}

// 修改状态
async function changeStatus(id: any, type: any) {
  // 拒绝时必加一个说明字段
  if (type === 3) {
    ElMessageBox.prompt("请说明拒绝的理由", "说明", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputPattern: /.{2,}/,
      inputErrorMessage: "请输理由-最少2为字符",
    }).then(async (value) => {
      const res = await api.changestatus({ id, type, notes: value.value });
      res.status === 1 &&
        ElMessage.success({
          message: "操作成功",
        });
      fetchData();
    });
  } else {
    const res = await api.changestatus({ id, type });
    res.status === 1 &&
      ElMessage.success({
        message: "操作成功",
      });
    fetchData();
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
  <div :class="{
    'absolute-container': tableAutoHeight,
  }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form :model="queryForm" size="default" label-width="100px" inline-message inline class="search-form">
            <el-form-item label="">
              <el-input v-model="queryForm.supplierId" clearable placeholder="供应商ID" />
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker v-model="queryForm.time" type="datetimerange" unlink-panels range-separator="-"
                start-placeholder="创建开始日期" end-placeholder="创建结束日期" value-format="YYYY-MM-DD hh:mm:ss" size="default" />
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="queryForm.billStatus" placeholder="状态" clearable filterable>
                <el-option v-for="(item, index) in billStatusList" :key="item" :label="item"
                  :value="index + 1"></el-option>
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
          <el-button size="default" @click=""> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe" style="margin-left: 12px"
            @query-data="currentChange" />
        </FormRightPanel>
      </el-row>
      <el-table ref="tableSortRef" v-loading="listLoading" style="margin-top: 10px" row-key="id" :data="list"
        :border="border" :size="lineHeight" :stripe="stripe" @selection-change="setSelectRows">
        <el-table-column type="expand">
          <template #default="props">
            <el-row :gutter="20" style="margin: 10px 0">
              <el-col :span="1"> </el-col>
              <el-col :span="3">
                付款方式: {{ payMethod[props.row.billStatus - 1].label }}
              </el-col>
              <el-col :span="3">账户名称: {{ props.row.accountName }}</el-col>
              <el-col :span="3">收款账号: {{ props.row.collectionAccount }}</el-col>
              <el-col :span="3">银行名称: {{ props.row.bankName }}</el-col>
              <el-col :span="3">结算周期: {{ props.row.settlementCycle }}</el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('supplierId')" prop="supplierId" show-overflow-tooltip align="center"
          label="供应商ID" />
        <el-table-column v-if="checkList.includes('billTime')" prop="billTime" show-overflow-tooltip align="center"
          label="账单日期"><template #default="{ row }">
            <el-tag effect="plain" type="info">{{
    format(row.billTime)
  }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('billAmount')" prop="billAmount" show-overflow-tooltip align="center"
          label="账单金额">
          <template #default="{ row }">
            <CurrencyType />{{ row.billAmount || 0 }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('taxesFees')" prop="taxesFees" show-overflow-tooltip align="center"
          label="税费">
          <template #default="{ row }">
            <CurrencyType />{{ row.taxesFees || 0 }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('payAmount')" prop="payAmount" show-overflow-tooltip align="center"
          label="实付金额">
          <template #default="{ row }">
            <CurrencyType />{{ row.payAmount || 0 }}
          </template>
        </el-table-column>
        <ElTableColumn v-if="checkList.includes('billStatus')" align="center" show-overflow-tooltip prop="" label="状态">
          <template #default="{ row }">
            {{ billStatusList[row.billStatus - 1] }}
          </template>
        </ElTableColumn>

        <el-table-column align="center" fixed="right" label="操作" width="170">
          <template #default="{ row }">
            <template v-if="row.billStatus === 1">
              <el-button size="small" plain type="primary" @click="changeStatus(row.id, 1)">
                确认收票
              </el-button>
            </template>
            <template v-else-if="row.billStatus === 2">
              <el-button size="small" plain @click="changeStatus(row.id, 2)">
                支付
              </el-button>
              <el-button size="small" plain type="danger" @click="changeStatus(row.id, 3)">
                拒绝
              </el-button>
            </template>
            <template v-else>- </template>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
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
