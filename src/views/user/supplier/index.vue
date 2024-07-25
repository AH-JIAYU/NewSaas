<script setup lang="ts">
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerEdit from "./components/SupplierEdit/index.vue";
import customerDetail from "./components/SupplierDetail/index.vue";
import plusMinusPayments from "./components/SupplierPlusMinusPayments/index.vue";
import useConfigurationSupplierLevelStore from "@/store/modules/configuration_supplierLevel";
import { submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/user_supplier";
import useUserSupplierStore from "@/store/modules/user_supplier"; // 供应商
const supplierStore = useUserSupplierStore(); // 供应商

defineOptions({
  name: "UserSupplierIndex",
});
//供应商等级
const configurationSupplierLevelStore = useConfigurationSupplierLevelStore();
const supplierLevelList = ref<any>([]);
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
const listLoading = ref(false);
const list = ref<Array<Object>>([]); // 列表
const selectRows = ref<any>(); // 表格-选中行
const editRef = ref(); // 新增|编辑 组件ref
const checkRef = ref(); // 查看 组件ref
const plusMinusPaymentsRef = ref(); // 加减款 组件ref
const border = ref<any>(true); // 表格控件-是否展示边框
const stripe = ref<any>(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const columns = ref<Array<Object>>([
  // 表格控件-展示列
  {
    label: "供应商id",
    checked: true,
    sortable: true,
    prop: "tenantSupplierId",
  },
  {
    label: "供应商名称+所属国",
    checked: true,
    sortable: true,
    prop: "supplierAccord",
  },
  {
    label: "所属国",
    checked: true,
    sortable: true,
    prop: "countryAffiliationName",
  },
  { label: "余额", checked: true, sortable: true, prop: "balanceUs" },
  {
    label: "待审金额",
    checked: true,
    sortable: true,
    prop: "amountPendingTrial",
  },
  {
    label: "余额-人民币",
    checked: true,
    sortable: true,
    prop: "balanceHumanLife",
  },

  {
    label: "供应商等级id",
    checked: true,
    sortable: true,
    prop: "supplierLevelId",
  },
  { label: "B2B|B2C", checked: true, sortable: true, prop: "B2B|B2C" },
  { label: "结算周期", checked: true, sortable: true, prop: "settlementCycle" },
  {
    label: "供应商状态",
    checked: true,
    sortable: true,
    prop: "supplierStatus",
  },
  { label: "创建时间", checked: true, sortable: true, prop: "createTime" },
  { label: "备注", checked: true, sortable: true, prop: "remark" },
]);

const queryForm = reactive<any>({
  // 请求接口携带参数
  tenantSupplierId: "", //供应商id
  supplierPhone: "", // 	手机号码-模糊查询
  supplierAccord: "", // 供应商名称-模糊查询
  emailAddress: "", // 	电子邮箱
  accountName: "", // 	账户名称
  supplierStatus: "", // 	供应商状态:1:关闭 2:开启 3:待审核
  time: [], // 时间日期选择器
});

// 新增
function handleAdd() {
  editRef.value.showEdit();
}
// 编辑
function handleEdit(row: any) {
  editRef.value.showEdit(row);
}
// 查看
function handleCheck(row: any) {
  checkRef.value.showEdit(row);
}
// 备注
async function handleEditRemark(row: any) {
  const { data } = await api.detail({
    tenantSupplierId: row.tenantSupplierId,
  });
  if (data.remark !== row.remark) {
    data.countryType = data.subordinateCountryId === "343" ? 1 : 2;
    data.remark = row.remark;
    const { status } = await api.edit(data);
    status === 1 &&
      ElMessage.success({
        message: "更新备注",
        center: true,
      });
    queryData();
  }
}
// 切换状态
async function changeState(state: any, id: string) {
  const params = {
    status: state,
    tenantSupplierId: id,
  };
  const { status } = await submitLoading(api.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  queryData();
  supplierStore.TenantSupplierList = null;
}

// 重置请求
function queryData() {
  pagination.value.page = 1;
  fetchData();
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    tenantSupplierId: "", //供应商id
    supplierPhone: "", // 	手机号码-模糊查询
    supplierAccord: "", // 供应商名称-模糊查询
    emailAddress: "", // 	电子邮箱
    accountName: "", // 	账户名称
    supplierStatus: "", // 	供应商状态:1:关闭 2:开启 3:待审核
    time: [], // 时间日期选择器
  });
  fetchData();
}
// 加减款
function handlePlusMinusPayments(row: any) {
  plusMinusPaymentsRef.value.showEdit(JSON.stringify(row));
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 请求
async function fetchData() {
  listLoading.value = true;
  const params = {
    ...getParams(),
    ...queryForm,
  };
  if (queryForm.time && !!queryForm.time.length) {
    params.beginTime = queryForm.time[0] || "";
    params.endTime = queryForm.time[1] || "";
  }
  const { data } = await api.list(params);
  list.value = data.getTenantSupplierInfoList;
  pagination.value.total = data.total;
  listLoading.value = false;
}
// 表格-单选框
function setSelectRows(val: any) {
  selectRows.value = val;
}
onMounted(async () => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  supplierLevelList.value =
    await configurationSupplierLevelStore.getLevelNameList();
  queryData();
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm
            :model="queryForm"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.tenantSupplierId"
                clearable
                :inline="false"
                placeholder="供应商ID"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.supplierAccord"
                clearable
                :inline="false"
                placeholder="供应商名称"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.supplierPhone"
                clearable
                :inline="false"
                placeholder="手机号码"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.accountName"
                clearable
                :inline="false"
                placeholder="账号名称"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.emailAddress"
                clearable
                :inline="false"
                placeholder="邮箱"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.supplierStatus"
                clearable
                placeholder="供应商状态"
              >
                <el-option label="开启" :value="2" />
                <el-option label="关闭" :value="1" />
                <el-option label="待审批" :value="3" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-date-picker
                v-model="queryForm.time"
                type="datetimerange"
                unlink-panels
                range-separator="-"
                start-placeholder="创建开始日期"
                end-placeholder="创建结束日期"
                value-format="YYYY-MM-DD hh:mm:ss"
                size="default"
                style="width: 192px"
                clear-icon="true"
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
          </ElForm>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="handleAdd">
            新增
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px"
            @query-data="queryData"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        v-loading="listLoading"
        :border="border"
        :data="list"
        :size="lineHeight"
        :stripe="stripe"
        @selection-change="setSelectRows"
      >
        <el-table-column align="center" type="selection" />
        <el-table-column
          v-if="checkList.includes('tenantSupplierId')"
          align="center"
          prop="tenantSupplierId"
          show-overflow-tooltip
          label="供应商ID"
        />
        <el-table-column
          v-if="checkList.includes('supplierAccord')"
          align="center"
          prop="supplierAccord"
          show-overflow-tooltip
          label="供应商名称"
        >
          <template #default="{ row }">
            {{ row.supplierAccord }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('balanceUs')"
          align="center"
          prop="countryAffiliationName"
          show-overflow-tooltip
          label="国家"
        />
        <el-table-column
          v-if="checkList.includes('balanceUs')"
          align="center"
          prop="balanceUs"
          show-overflow-tooltip
          label="可用余额"
        />
        <el-table-column
          v-if="checkList.includes('amountPendingTrial')"
          align="center"
          prop="amountPendingTrial"
          show-overflow-tooltip
          label="待审金额"
        />
        <el-table-column
          v-if="checkList.includes('supplierLevelId')"
          align="center"
          prop="supplierLevelId"
          show-overflow-tooltip
          label="供应商等级"
        >
          <template #default="{ row }">
            <div
              v-for="item in supplierLevelList"
              :key="item.tenantSupplierLevelId"
              :value="item.levelNameOrAdditionRatio"
            >
              <el-text
                v-if="item.tenantSupplierLevelId === row.supplierLevelId"
                class="mx-1"
                >{{ item.levelNameOrAdditionRatio }}</el-text
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('B2B|B2C')"
          align="center"
          show-overflow-tooltip
          label="B2B|B2C"
        >
          <template #default="{ row }">
            <el-text v-if="row.b2bStatus && row.b2bStatus === 2" class="mx-1"
              ><div class="i-fluent:checkmark-12-filled w-1.5em h-1.5em"></div
            ></el-text>
            <el-text v-else class="mx-1"
              ><div class="i-entypo:cross w-1.5em h-1.5em"></div
            ></el-text>
            |
            <el-text v-if="row.b2cStatus && row.b2cStatus === 2" class="mx-1"
              ><div class="i-fluent:checkmark-12-filled w-1.5em h-1.5em"></div
            ></el-text>
            <el-text v-else class="mx-1"
              ><div class="i-entypo:cross w-1.5em h-1.5em"></div
            ></el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('settlementCycle')"
          align="center"
          prop="settlementCycle"
          show-overflow-tooltip
          label="结算周期"
          ><template #default="{ row }">
            {{ row.settlementCycle ? row.settlementCycle + "天" : "-" }}
          </template>
        </el-table-column>
        <ElTableColumn
          v-if="checkList.includes('supplierStatus')"
          align="center"
          show-overflow-tooltip
          label="供应商状态"
        >
          <template #default="{ row }">
            <ElSwitch
              v-if="row.supplierStatus === 3"
              v-model="row.supplierStatus"
              inline-prompt
              :inactive-value="3"
              :active-value="2"
              inactive-text="待审核"
              active-text="启用"
              @change="changeState($event, row.tenantSupplierId)"
            />
            <ElSwitch
              v-else
              v-model="row.supplierStatus"
              inline-prompt
              :inactive-value="1"
              :active-value="2"
              inactive-text="禁用"
              active-text="启用"
              @change="changeState($event, row.tenantSupplierId)"
            />
          </template>
        </ElTableColumn>
        <el-table-column
          v-if="checkList.includes('createTime')"
          align="center"
          prop="createTime"
          show-overflow-tooltip
          label="创建日期"
        />
        <el-table-column
          v-if="checkList.includes('remark')"
          align="center"
          prop="remark"
          show-overflow-tooltip
          label="备注"
        >
          <template #default="{ row }">
            <el-input v-model="row.remark" @blur="handleEditRemark(row)" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="i"
          label="操作"
          show-overflow-tooltip
          width="250"
        >
          <template #default="{ row }">
            <ElSpace>
              <el-button
                size="small"
                plain
                type="primary"
                @click="handlePlusMinusPayments(row)"
              >
                加减款
              </el-button>
              <el-button
                size="small"
                plain
                type="primary"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                plain
                type="primary"
                @click="handleCheck(row)"
              >
                详情
              </el-button>
            </ElSpace>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty class="vab-data-empty" description="暂无数据" />
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
    <customerEdit ref="editRef" @fetch-data="fetchData" />
    <customerDetail ref="checkRef" @fetch-data="fetchData" />
    <plusMinusPayments ref="plusMinusPaymentsRef" @fetch-data="fetchData" />
  </div>
</template>

<style scoped lang="scss">
// 高度自适应
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

// 筛选
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
