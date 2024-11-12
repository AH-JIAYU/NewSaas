<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/finance_supplierSettlement";
import empty from '@/assets/images/empty.png'
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
const border = ref(false);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
const billStatusList = [
  { label: '待收票', value: 1 },
  { label: '待支付', value: 2 },
  { label: '已支付', value: 3 },
  { label: '已拒绝', value: 4 },];
const payMethod = userSupplier.payMethod; // 付款方式
const formSearchList = ref<any>()//表单排序配置
const formSearchName = ref<string>('formSearch-supplierSettlement')// 表单排序name
const columns = ref<any>([
  { label: "供应商名称", prop: "supplierName", sortable: true, checked: true },
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
    supplierId: '', //	供应商id
    billStatus: null, //账单状态: 1:待收票 2:待支付 3:已支付 4:已拒绝
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
// 手动生成结算（一月一次）
const settlement = async () => {
  const {data} = await api.settlement({})
  if(data) {
    fetchData()
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
  formSearchList.value = [
    { index: 1, show: true, type: 'input', modelName: 'supplierId', placeholder: '供应商ID' },
    { index: 2, show: true, type: 'datetimerange', modelName: 'time', startPlaceHolder: "创建开始日期", endPlaceHolder: "创建结束日期" },
    { index: 3, show: true, type: 'select', modelName: 'billStatus', placeholder: '状态', option: 'billStatus', optionLabel: 'label', optionValue: 'value' }
  ]
});
const formOption = {
  billStatus: () => billStatusList
}
</script>

<template>
  <div :class="{
    'absolute-container': tableAutoHeight,
  }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange"
        @onReset="onReset" :model="queryForm" :formOption="formOption" />
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button size="default" type="primary" @click="settlement"> 手动结算 </el-button>
        </FormLeftPanel>
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
                <el-text class="fontColor">付款方式: {{ payMethod[props.row.billStatus - 1].label }}</el-text>
              </el-col>
              <el-col :span="3"><el-text class="fontColor">账户名称: {{ props.row.accountName ? props.row.accountName : '-' }}</el-text></el-col>
              <el-col :span="3"><el-text class="fontColor">收款账号: {{ props.row.collectionAccount ? props.row.collectionAccount : '-' }}</el-text></el-col>
              <el-col :span="3"><el-text class="fontColor">银行名称: {{ props.row.bankName ? props.row.bankName : '-' }}</el-text></el-col>
              <el-col :span="3"><el-text class="fontColor">结算周期: {{ props.row.settlementCycle ? props.row.settlementCycle : '-' }}</el-text></el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('supplierId')" prop="supplierId" show-overflow-tooltip align="left"
          label="供应商ID" >
          <template #default="{ row }">
            <el-text class="fontColor">{{ row.supplierId ? row.supplierId : "-" }}</el-text>
          </template>
        </el-table-column>
          <el-table-column v-if="checkList.includes('supplierName')" prop="supplierName" show-overflow-tooltip align="left"
          label="供应商名称" >
          <template #default="{ row }">
            <el-text class="fontColor">{{ row.supplierName ? row.supplierName : "-" }}</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('billTime')" prop="billTime" show-overflow-tooltip align="left"
          label="账单日期"><template #default="{ row }">
            <!-- <el-tooltip :content="row.billTime" placement="top">
              <el-tag effect="plain" type="info">{{ row.billTime ? row.billTime : '-'}}</el-tag>
            </el-tooltip> -->
            <el-text class="fontColor">{{ row.billTime ? row.billTime : '-'}}</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('billAmount')" prop="billAmount" show-overflow-tooltip align="left"
          label="账单金额">
          <template #default="{ row }">
            <el-text class="fontColor"><CurrencyType />{{ row.billAmount || 0 }}</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('taxesFees')" prop="taxesFees" show-overflow-tooltip align="left"
          label="税费">
          <template #default="{ row }">
            <el-text class="fontColor"><CurrencyType />{{ row.taxesFees || 0 }}</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('payAmount')" prop="payAmount" show-overflow-tooltip align="left"
          label="实付金额">
          <template #default="{ row }">
            <el-text class="fontColor"><CurrencyType />{{ row.payAmount || 0 }}</el-text>
          </template>
        </el-table-column>
        <ElTableColumn v-if="checkList.includes('billStatus')" align="left" show-overflow-tooltip prop="" label="状态">
          <template #default="{ row }">
            <el-text class="fontColor">{{ billStatusList[row.billStatus - 1].label }}</el-text>
          </template>
        </ElTableColumn>
        <el-table-column align="left" fixed="right" label="操作" width="170">
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
          <el-empty :image="empty" :image-size="300" />
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

.fontColor {
  color: #333333 !important;
}
</style>
