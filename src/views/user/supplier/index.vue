<script setup lang="ts">
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerEdit from "./components/SupplierEdit/index.vue";
import customerDetail from "./components/SupplierDetail/index.vue";
import plusMinusPayments from "./components/SupplierPlusMinusPayments/index.vue";
import QuickEdit from "./components/QuickEdit/index.vue"; //快速编辑
import useConfigurationSupplierLevelStore from "@/store/modules/configuration_supplierLevel";
import { submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/user_supplier";
import useUserSupplierStore from "@/store/modules/user_supplier"; // 供应商
import empty from "@/assets/images/empty.png";
import { useI18n } from "vue-i18n"; // 国际化
const supplierStore = useUserSupplierStore(); // 供应商
import storage from "@/utils/storage";
defineOptions({
  name: "supplier",
});
const { t } = useI18n(); // 国际化
// 时间
const { format } = useTimeago();
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
const QuickEditRef = ref(); //快速编辑
const plusMinusPaymentsRef = ref(); // 加减款 组件ref
const border = ref<any>(false); // 表格控件-是否展示边框
const stripe = ref<any>(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-supplier"); // 表单排序name
const columns = ref<Array<Object>>([
  // 表格控件-展示列
  {
    label: computed(() => t("supplier.supplierID")),
    checked: true,
    sortable: true,
    prop: "tenantSupplierId",
  },
  {
    label: computed(() => t("supplier.supplierName")),
    checked: true,
    sortable: true,
    prop: "supplierAccord",
  },
  {
    label: computed(() => t("supplier.area")),
    checked: true,
    sortable: true,
    prop: "countryAffiliationName",
  },
  {
    label: computed(() => t("supplier.availableBalance")),
    checked: true,
    sortable: true,
    prop: "balanceHumanLife",
  },
  {
    label: computed(() => t("supplier.amountPendingTrial")),
    checked: true,
    sortable: true,
    prop: "amountPendingTrial",
  },
  {
    label: computed(() => t("supplier.supplierLevel")),
    checked: true,
    sortable: true,
    prop: "supplierLevelId",
  },
  { label: "B2B|B2C", checked: true, sortable: true, prop: "b2bStatus" },
  {
    label: computed(() => t("supplier.settlementCycle")),
    checked: true,
    sortable: true,
    prop: "settlementCycle",
  },
  {
    label: computed(() => t("supplier.supplierStatus")),
    checked: true,
    sortable: true,
    prop: "supplierStatus",
  },
  {
    label: computed(() => t("supplier.surveySystem")),
    checked: true,
    sortable: true,
    prop: "surveySystem",
  },
  {
    label: computed(() => t("supplier.createTime")),
    checked: true,
    sortable: true,
    prop: "createTime",
  },
  {
    label: computed(() => t("supplier.remark")),
    checked: true,
    sortable: true,
    prop: "remark",
  },
]);

const queryForm = reactive<any>({
  // 请求接口携带参数
  tenantSupplierId: "", //供应商id
  supplierPhone: "", // 	手机号码-模糊查询
  supplierAccord: "", // 供应商名称-模糊查询
  emailAddress: "", // 	电子邮箱
  accountName: "", // 	账户名称
  supplierStatus: [2], // 	供应商状态:1:关闭 2:开启 3:待审核
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
const current = ref<any>(); //表格当前选中
function handleCurrentChange(val: any) {
  if (val) current.value = val.tenantSupplierId;
  else current.value = "";
}
// 快速编辑
function quickEdit(row: any, type: any) {
  /**
    supplierAccord 供应商名称
    supplierLevelId 供应商等级
     settlementCycle:'结算周期'
    remark 备注
  */
  QuickEditRef.value.showEdit(row, type);
}
// 切换状态
async function changeState(state: any, id: string, name: string) {
  const params = {
    status: state,
    surveySystem: state,
    tenantSupplierId: id,
  };
  if (name === "surveySystem") {
    delete params.status;
  } else {
    delete params.surveySystem;
  }
  const { status } = await submitLoading(api.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  queryData();
  supplierStore.TenantSupplierList = null;
}
//切换调查系统状态
async function changeSystem(state: any, id: string) {
  const params = {
    surveySystem: state,
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
//列表修改b2b b2c
const editBC = async (row: any, name: any, state: any) => {
  let b2bStatus = row.b2bStatus;
  let b2cStatus = row.b2cStatus;
  if (name == "b2b") {
    b2bStatus = state == 1 ? 2 : 1;
  }

  if (name == "b2c") {
    b2cStatus = state == 1 ? 2 : 1;
  }
  const params = {
    b2bStatus: b2bStatus,
    b2cStatus: b2cStatus,
    status: row.status,
    tenantSupplierId: row.tenantSupplierId,
  };
  const { status } = await submitLoading(api.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  queryData();
  supplierStore.TenantSupplierList = null;
};
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
    supplierStatus: [2], // 	供应商状态:1:关闭 2:开启 3:待审核
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
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm,
    };
    if (queryForm.time && !!queryForm.time.length) {
      params.beginTime = queryForm.time[0] || "";
      params.endTime = queryForm.time[1] || "";
    }
    delete params.time;
    const { data } = await api.list(params);
    list.value = data.getTenantSupplierInfoList;
    pagination.value.total = data.total;
    listLoading.value = false;
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
// 表格-单选框
function setSelectRows(val: any) {
  selectRows.value = val;
}
// 获取供应商等级
const supperLevel = (id: any) => {
  const findData = supplierLevelList.value.find(
    (item: any) => item.tenantSupplierLevelId === id,
  );
  return findData?.levelNameOrAdditionRatio;
};
onMounted(async () => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  supplierLevelList.value =
    await configurationSupplierLevelStore.getLevelNameList();
  queryData();

  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "tenantSupplierId",
      placeholder: computed(() => t("supplier.supplierID")),
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "supplierAccord",
      placeholder: computed(() => t("supplier.supplierName")),
    },
    {
      index: 3,
      show: true,
      type: "input",
      modelName: "supplierPhone",
      placeholder: computed(() => t("supplier.phoneNumber")),
    },
    // {
    //   index: 4,
    //   show: true,
    //   type: "input",
    //   modelName: "accountName",
    //   placeholder: "账号名称",
    // },
    {
      index: 5,
      show: true,
      type: "input",
      modelName: "emailAddress",
      placeholder: computed(() => t("supplier.email")),
    },
    {
      index: 6,
      show: true,
      type: "select",
      modelName: "supplierStatus",
      placeholder: computed(() => t("supplier.supplierStatus")),
      option: "supplierStatus",
      optionLabel: "label",
      optionValue: "value",
      multiple: true,
    },
    {
      index: 7,
      show: true,
      type: "datetimerange",
      modelName: "time",
      startPlaceHolder: computed(() => t("supplier.CreationStartDate")),
      endPlaceHolder: computed(() => t("supplier.CreationEndDate")),
    },
  ];
});
const formOption = {
  supplierStatus: () => [
    { label: computed(() => t("supplier.on")), value: 2 },
    { label: computed(() => t("supplier.off")), value: 1 },
    { label: computed(() => t("supplier.pendingApproval")), value: 3 },
  ],
};
//免密登录
const goSupplier = ()=> {
  const tenantId = storage.local.get("tenantId")
  // window.open(`http://localhost:9002/?tenantId =${tenantId}&isLogin=true`, '_blank');
}
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
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
      <el-row>
        <FormLeftPanel>
          <el-button
            type="primary"
            size="default"
            @click="handleAdd"
            v-auth="'supplier-get-addTenantSupplier'"
          >
            {{ t("common.new") }}
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> {{ t("common.export") }} </el-button>
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
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <!-- <el-table-column align="left" type="selection" /> -->
        <el-table-column
          v-if="checkList.includes('supplierStatus')"
          align="left"
          show-overflow-tooltip
          :label="t('supplier.supplierStatus')"
          width="100"
        >
          <template #default="{ row }">
            <ElSwitch
              v-if="row.supplierStatus === 3"
              v-model="row.supplierStatus"
              inline-prompt
              :inactive-value="3"
              :active-value="2"
              :inactive-text="t('supplier.toBeReviewed')"
              :active-text="t('supplier.enable')"
              @change="
                changeState($event, row.tenantSupplierId, 'supplierStatus')
              "
            />
            <ElSwitch
              v-else
              v-model="row.supplierStatus"
              inline-prompt
              :inactive-value="1"
              :active-value="2"
              :inactive-text="t('supplier.disabled')"
              :active-text="t('supplier.enable')"
              @change="
                changeState($event, row.tenantSupplierId, 'supplierStatus')
              "
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('surveySystem')"
          align="left"
          show-overflow-tooltip
          :label="t('supplier.surveyStatus')"
        >
          <template #default="{ row }">
            <ElSwitch
              v-model="row.surveySystem"
              inline-prompt
              :inactive-value="1"
              :active-value="2"
              :inactive-text="t('supplier.disabled')"
              :active-text="t('supplier.enable')"
              @change="changeSystem($event, row.tenantSupplierId)"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('supplierAccord')"
          align="left"
          prop="supplierAccord"
          :label="t('supplier.supplierName')"
        >
          <template #default="{ row }">
            <div class="flex-c tableBig">
              <div class="oneLine" style="width: calc(100% - 20px)">
                <el-tooltip
                  effect="dark"
                  :content="row.supplierAccord"
                  placement="top-start"
                >
                <el-link type="primary" @click="goSupplier"> {{ row.supplierAccord }}</el-link>

                </el-tooltip>
              </div>
              <copy
                v-if="row.projectType !== 2"
                :content="row.supplierAccord"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.tenantSupplierId === current,
                }"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('tenantSupplierId')"
          align="left"
          prop="tenantSupplierId"
          width="200"
          show-overflow-tooltip
          :label="t('supplier.supplierID')"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall tenantSupplierId">
              <div class="id oneLine">
                <el-tooltip
                  effect="dark"
                  :content="row.tenantSupplierId"
                  placement="top-start"
                >
                  {{ row.tenantSupplierId }}
                </el-tooltip>
              </div>
              <copy
                :content="row.tenantSupplierId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.tenantSupplierId === current,
                }"
                class="littleButton"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('supplierLevelId')"
          align="left"
          prop="supplierLevelId"
          show-overflow-tooltip
          :label="t('supplier.supplierLevel')"
        >
          <template #default="{ row }">
            <div class="flex-c">
              <div class="fontC-System" style="width: calc(100% - 20px)">
                {{ row.supplierLevelName ? row.supplierLevelName : "-" }}
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'supplierLevelId')"
                :class="{
                  edit: 'edit',
                  current: row.tenantSupplierId === current,
                }"
                name="i-ep:edit"
                color="#409eff"
                v-auth="'supplier-update-updateTenantSupplier'"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('balanceHumanLife')"
          align="left"
          prop="balanceHumanLife"
          show-overflow-tooltip
          width="100"
          :label="t('supplier.availableBalance')"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <CurrencyType />{{
                row.balanceHumanLife ? row.balanceHumanLife : 0
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('amountPendingTrial')"
          width="100"
          align="left"
          prop="amountPendingTrial"
          show-overflow-tooltip
          :label="t('supplier.amountPendingTrial')"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <CurrencyType />{{
                row.amountPendingTrial ? row.amountPendingTrial : 0
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('countryAffiliationName')"
          width="100"
          align="left"
          prop="countryAffiliationName"
          show-overflow-tooltip
          :label="t('supplier.area')"
        >
          <template #default="{ row }">
            <el-tag type="primary">{{ row.countryAffiliationName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('b2bStatus')"
          align="left"
          show-overflow-tooltip
          width="100"
          label="B2B/B2C"
        >
          <template #default="{ row }">
            <div
              class="flex-s"
              style="justify-content: center !important; cursor: pointer"
            >
              <svg
                v-if="row.b2bStatus && row.b2bStatus === 2"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                @click="editBC(row, 'b2b', 2)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame" clip-path="url(#clip0_409_28184)">
                  <path
                    id="Vector"
                    d="M13.6223 13.2878H1.375C1.28477 13.2878 1.21094 13.214 1.21094 13.1237V0.876465C1.21094 0.78623 1.28477 0.712402 1.375 0.712402H13.6236C13.7139 0.712402 13.7877 0.78623 13.7877 0.876465V13.1251C13.7863 13.2153 13.7139 13.2878 13.6223 13.2878Z"
                    fill="#409EFF"
                  />
                  <path
                    id="Vector_2"
                    d="M12.3645 14H2.63555C1.4584 14 0.5 13.0416 0.5 11.8645V2.13555C0.5 0.958398 1.4584 0 2.63555 0H12.3645C13.5416 0 14.5 0.958398 14.5 2.13555V11.8645C14.5 13.0416 13.5416 14 12.3645 14ZM2.63555 1.42324C2.24316 1.42324 1.92324 1.74316 1.92324 2.13555V11.8645C1.92324 12.2568 2.24316 12.5768 2.63555 12.5768H12.3645C12.7568 12.5768 13.0768 12.2568 13.0768 11.8645V2.13555C13.0768 1.74316 12.7568 1.42324 12.3645 1.42324H2.63555Z"
                    fill="#409EFF"
                  />
                  <path
                    id="Vector_3"
                    d="M6.24753 11.0141C6.10124 11.0141 5.95359 10.969 5.82781 10.8774L2.39343 8.36725C2.07624 8.13483 2.00652 7.69049 2.23894 7.37194C2.47136 7.05475 2.91706 6.98502 3.23425 7.21744L6.14909 9.34752L11.663 3.22116C11.9255 2.92858 12.3766 2.90533 12.6678 3.16784C12.9591 3.43034 12.9837 3.88151 12.7212 4.17272L6.778 10.7762C6.63718 10.9335 6.44304 11.0141 6.24753 11.0141Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_409_28184">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                v-else
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click="editBC(row, 'b2b', 1)"
              >
                <g id="Frame" clip-path="url(#clip0_409_28364)">
                  <path
                    id="Vector"
                    d="M13.6223 13.1901H1.375C1.3387 13.1901 1.30859 13.16 1.30859 13.1237V0.876465C1.30859 0.840165 1.3387 0.810059 1.375 0.810059H13.6236C13.6599 0.810059 13.69 0.840164 13.69 0.876465V13.1242C13.6892 13.1611 13.66 13.1901 13.6223 13.1901Z"
                    stroke="#409EFF"
                    stroke-width="0.195312"
                  />
                  <path
                    id="Vector_2"
                    d="M12.3645 14H2.63555C1.4584 14 0.5 13.0416 0.5 11.8645V2.13555C0.5 0.958398 1.4584 0 2.63555 0H12.3645C13.5416 0 14.5 0.958398 14.5 2.13555V11.8645C14.5 13.0416 13.5416 14 12.3645 14ZM2.63555 1.42324C2.24316 1.42324 1.92324 1.74316 1.92324 2.13555V11.8645C1.92324 12.2568 2.24316 12.5768 2.63555 12.5768H12.3645C12.7568 12.5768 13.0768 12.2568 13.0768 11.8645V2.13555C13.0768 1.74316 12.7568 1.42324 12.3645 1.42324H2.63555Z"
                    fill="#DCDCDC"
                  />
                  <g id="Group 18190">
                    <path
                      id="Vector_3"
                      d="M5 5L10 10"
                      stroke="#DCDCDC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      id="Vector_4"
                      d="M5 10L10 5"
                      stroke="#DCDCDC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_409_28364">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span class="mx-1">/</span>
              <svg
                v-if="row.b2cStatus && row.b2cStatus === 2"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                @click="editBC(row, 'b2c', 2)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame" clip-path="url(#clip0_409_28184)">
                  <path
                    id="Vector"
                    d="M13.6223 13.2878H1.375C1.28477 13.2878 1.21094 13.214 1.21094 13.1237V0.876465C1.21094 0.78623 1.28477 0.712402 1.375 0.712402H13.6236C13.7139 0.712402 13.7877 0.78623 13.7877 0.876465V13.1251C13.7863 13.2153 13.7139 13.2878 13.6223 13.2878Z"
                    fill="#409EFF"
                  />
                  <path
                    id="Vector_2"
                    d="M12.3645 14H2.63555C1.4584 14 0.5 13.0416 0.5 11.8645V2.13555C0.5 0.958398 1.4584 0 2.63555 0H12.3645C13.5416 0 14.5 0.958398 14.5 2.13555V11.8645C14.5 13.0416 13.5416 14 12.3645 14ZM2.63555 1.42324C2.24316 1.42324 1.92324 1.74316 1.92324 2.13555V11.8645C1.92324 12.2568 2.24316 12.5768 2.63555 12.5768H12.3645C12.7568 12.5768 13.0768 12.2568 13.0768 11.8645V2.13555C13.0768 1.74316 12.7568 1.42324 12.3645 1.42324H2.63555Z"
                    fill="#409EFF"
                  />
                  <path
                    id="Vector_3"
                    d="M6.24753 11.0141C6.10124 11.0141 5.95359 10.969 5.82781 10.8774L2.39343 8.36725C2.07624 8.13483 2.00652 7.69049 2.23894 7.37194C2.47136 7.05475 2.91706 6.98502 3.23425 7.21744L6.14909 9.34752L11.663 3.22116C11.9255 2.92858 12.3766 2.90533 12.6678 3.16784C12.9591 3.43034 12.9837 3.88151 12.7212 4.17272L6.778 10.7762C6.63718 10.9335 6.44304 11.0141 6.24753 11.0141Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_409_28184">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                v-else
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click="editBC(row, 'b2c', 1)"
              >
                <g id="Frame" clip-path="url(#clip0_409_28364)">
                  <path
                    id="Vector"
                    d="M13.6223 13.1901H1.375C1.3387 13.1901 1.30859 13.16 1.30859 13.1237V0.876465C1.30859 0.840165 1.3387 0.810059 1.375 0.810059H13.6236C13.6599 0.810059 13.69 0.840164 13.69 0.876465V13.1242C13.6892 13.1611 13.66 13.1901 13.6223 13.1901Z"
                    stroke="#409EFF"
                    stroke-width="0.195312"
                  />
                  <path
                    id="Vector_2"
                    d="M12.3645 14H2.63555C1.4584 14 0.5 13.0416 0.5 11.8645V2.13555C0.5 0.958398 1.4584 0 2.63555 0H12.3645C13.5416 0 14.5 0.958398 14.5 2.13555V11.8645C14.5 13.0416 13.5416 14 12.3645 14ZM2.63555 1.42324C2.24316 1.42324 1.92324 1.74316 1.92324 2.13555V11.8645C1.92324 12.2568 2.24316 12.5768 2.63555 12.5768H12.3645C12.7568 12.5768 13.0768 12.2568 13.0768 11.8645V2.13555C13.0768 1.74316 12.7568 1.42324 12.3645 1.42324H2.63555Z"
                    fill="#DCDCDC"
                  />
                  <g id="Group 18190">
                    <path
                      id="Vector_3"
                      d="M5 5L10 10"
                      stroke="#DCDCDC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      id="Vector_4"
                      d="M5 10L10 5"
                      stroke="#DCDCDC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_409_28364">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('settlementCycle')"
          align="left"
          width="100"
          prop="settlementCycle"
          show-overflow-tooltip
          :label="t('supplier.settlementCycle')"
          ><template #default="{ row }">
            <div class="flex-c fontC-System">
              <div class="oneLine" style="width: calc(100% - 20px)">
                {{ row.settlementCycle ? "net " + row.settlementCycle : "-" }}
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'settlementCycle')"
                :class="{
                  edit: 'edit',
                  current: row.tenantSupplierId === current,
                }"
                name="i-ep:edit"
                color="#409eff"
                v-auth="'supplier-update-updateTenantSupplier'"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('createTime')"
          align="left"
          width="100"
          prop="createTime"
          show-overflow-tooltip
          :label="t('common.create')"
        >
          <template #default="{ row }">
            <el-tooltip :content="row.createTime" placement="top">
              <el-tag effect="plain" type="info">{{
                format(row.createTime)
              }}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('remark')"
          align="left"
          prop="remark"
          width="180"
          :label="t('common.remark')"
        >
          <template #default="{ row }">
            <div class="flex-c fontC-System">
              <div class="oneLine" style="width: calc(100% - 20px)">
                {{ row.remark ? row.remark : "-" }}
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'remark')"
                :class="{
                  edit: 'edit',
                  current: row.tenantSupplierId === current,
                }"
                name="i-ep:edit"
                color="#409eff"
                v-auth="'supplier-update-updateTenantSupplier'"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          prop="i"
          :label="t('common.control')"
          fixed="right"
          width="250"
        >
          <template #default="{ row }">
            <ElSpace>
              <el-button
                size="small"
                plain
                type="primary"
                @click="handlePlusMinusPayments(row)"
                v-auth="'supplier-get-additionSubtractionSupplier'"
              >
                {{ t("supplier.plusOrMinus") }}
              </el-button>
              <el-button
                size="small"
                plain
                type="warning"
                @click="handleEdit(row)"
                v-auth="'supplier-update-updateTenantSupplier'"
              >
                {{ t("common.edit") }}
              </el-button>
              <el-button
                size="small"
                plain
                type="danger"
                @click="handleCheck(row)"
                v-auth="'supplier-get-getTenantSupplierInfo'"
              >
                {{ t("common.detail") }}
              </el-button>
            </ElSpace>
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
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </PageMain>
    <customerEdit ref="editRef" @fetch-data="fetchData" />
    <customerDetail ref="checkRef" @fetch-data="fetchData" />
    <QuickEdit ref="QuickEditRef" @fetchData="fetchData" />
    <plusMinusPayments ref="plusMinusPaymentsRef" @fetch-data="fetchData" />
  </div>
</template>

<style scoped lang="scss">
.tenantSupplierId {
  font-size: 0.875rem;
}

.copyId .current {
  display: block !important;
}

.rowCopy {
  width: 20px;
  display: none;
}

.el-table__row:hover .rowCopy {
  display: block;
}

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

.flex-c {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  > div:nth-of-type(1) {
    width: calc(100% - 25px);
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
