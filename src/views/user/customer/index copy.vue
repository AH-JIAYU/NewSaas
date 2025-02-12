<script setup lang="ts">
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerEdit from "./components/CustomerEdit/index.vue";
import QuickEdit from "./components/QuickEdit/index.vue";
import AssociatedProjects from "./components/AssociatedProjects/index.vue";
import customerDetail from "./components/CustomerDetail/index.vue";
import { submitLoading } from "@/utils/apiLoading";
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import api from "@/api/modules/user_customer";
import apiUser from "@/api/modules/configuration_manager";
import empty from "@/assets/images/empty.png";
import cooperation from "@/views/user/cooperation/index.vue";
import { useI18n } from "vue-i18n";

const customerStore = useUserCustomerStore(); // 客户
defineOptions({
  name: "customer",
});

const { t } = useI18n(); // 国际化
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
// 用户数据
const staffList = ref<any>([]);
const listLoading = ref(false); // 加载
const list = ref<Array<Object>>([]); // 表格数据
const editRef = ref<any>(); // 组件ref 新增编辑
const checkRef = ref<any>(); // 组件ref 查看
const QuickEditRef = ref(); //快速编辑
const AssociatedProjectsRef = ref(); //查看关联项目数
const current = ref<any>(); //表格当前选中
const selectRows = ref(); // 表格选中行
const border = ref(false); // 表格控件-边框
const stripe = ref(false); // 表格控件-条纹
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const lineHeight = ref<any>("default"); // 表格控件-大小
const checkList = ref<any>([]); // 表格控件-展示列
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-customer"); // 表单排序name
const columns = ref([
  {
    label: computed(() => t("customer.customerCode")),
    checked: true,
    sortable: true,
    prop: "tenantCustomerId",
  },
  {
    label: computed(() => t("customer.customerName")),
    checked: true,
    sortable: true,
    prop: "customerAccord",
  },
  {
    label: computed(() => t("customer.customerShortName")),
    checked: true,
    sortable: true,
    prop: "customerShortName",
  },
  { label: "PM", checked: true, sortable: true, prop: "chargeId" },
  {
    label: computed(() => t("customer.noAssociatedProject")),
    checked: true,
    sortable: true,
    prop: "projectNumber",
  },
  {
    label: computed(() => t("customer.customerStatus")),
    checked: true,
    sortable: true,
    prop: "customerStatus",
  },
  {
    label: computed(() => t("customer.antecedentQuestionnaire")),
    checked: true,
    sortable: true,
    prop: "antecedentQuestionnaire",
  },
  {
    label: computed(() => t("customer.riskControl")),
    checked: true,
    sortable: true,
    prop: "riskControl",
  },
  {
    label: computed(() => t("customer.limit")),
    checked: true,
    sortable: true,
    prop: "turnover",
  },
  {
    label: computed(() => t("customer.rateMin")),
    checked: true,
    sortable: true,
    prop: "rateAudit",
  },
]);
// 新增
function handleAdd() {
  editRef.value.showEdit();
}
// 编辑
function handleEdit(row: Object) {
  editRef.value.showEdit(row);
}
// 切换状态
async function changeState(state: any, type: number, id: string) {
  const params = {
    status: state,
    operationalType: type,
    tenantCustomerId: id,
  };
  const { status } = await submitLoading(api.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: t("customer.editSucess"),
    });
  // 数据改变重新请求
  customerStore.customer = null;
  queryData();
}
// 查看
function handleCheck(row: Object) {
  checkRef.value.showEdit(row);
}
function handleCurrentChange(val: any) {
  if (val) current.value = val.tenantCustomerId;
  else current.value = "";
}
// 快速编辑
function quickEdit(row: any, type: any) {
  /**
   * customerAccord 客户名称
     customerShortName  客户简称
     chargeId PM
  */
  QuickEditRef.value.showEdit(row, type);
}
// 查看关联项目数
function associatedProjects(row: any) {
  AssociatedProjectsRef.value.showEdit(row);
}

// 删除
function handleDelete(row: any) {
  ElMessageBox.confirm(t("customer.delConfirm"), t("customer.delMessage"))
    .then(async () => {
      const { status } = await submitLoading(
        api.delete({
          tenantCustomerId: row.tenantCustomerId,
        })
      );
      status === 1 &&
        ElMessage.success({
          message: t("customer.delSuccess"),
        });
      queryData();
    })
    .catch(() => {});
}
// 查询
const queryForm = reactive<any>({
  customerShortName: "",
  customerStatus: 2,
  antecedentQuestionnaire: null,
});
// 获取PM / 用户;
const getTenantStaffList = async () => {
  const { data } = await apiUser.getTenantStaffList();
  staffList.value = data;
};
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    customerShortName: "",
    customerStatus: 2,
    antecedentQuestionnaire: null,
  });
  queryData();
}
function queryData() {
  pagination.value.page = 1;
  fetchData();
}
// 获取列表数据
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...queryForm,
    };
    const { data } = await api.list(params);
    list.value = data.getTenantCustomerInfoList;
    console.log("客户列表", data);
    pagination.value.total = Number(data.total);
    listLoading.value = false;
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
function setSelectRows(val: any) {
  selectRows.value = val;
}
onMounted(async () => {
  // await getTenantStaffList();
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  queryData();
  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "customerShortName",
      placeholder: computed(() => t("customer.customerShortName")),
    },
    {
      index: 2,
      show: true,
      type: "select",
      modelName: "customerStatus",
      placeholder: computed(() => t("customer.customerStatus")),
      option: "customerStatus",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 3,
      show: true,
      type: "select",
      modelName: "antecedentQuestionnaire",
      placeholder: computed(() => t("customer.antecedentQuestionnaire")),
      option: "antecedentQuestionnaire",
      optionLabel: "label",
      optionValue: "value",
    },
  ];
});
const formOption = {
  customerStatus: () => [
    { label: computed(() => t("customer.forbidden")), value: 1 },
    { label: computed(() => t("customer.enable")), value: 2 },
  ],
  antecedentQuestionnaire: () => [
    { label: computed(() => t("customer.forbidden")), value: 1 },
    { label: computed(() => t("customer.enable")), value: 2 },
  ],
};

const activeName = ref("first");
</script>

<template>
  <PageMain>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane :label="t('customer.myCustomer')" name="first">
        <div :class="{ 'absolute-container': tableAutoHeight }">
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
                v-auth="'customer-get-addTenantCustomer'"
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
            <ElTableColumn
              v-if="checkList.includes('customerStatus')"
              align="left"
              show-overflow-tooltip
              prop="customerStatus"
              :label="t('customer.customerStatus')"
              width="84"
            >
              <template #default="{ row }">
                <ElSwitch
                  v-model="row.customerStatus"
                  inline-prompt
                  :inactive-value="1"
                  :active-value="2"
                  :active-text="t('customer.enable')"
                  :inactive-text="t('customer.forbidden')"
                  @change="changeState($event, 1, row.tenantCustomerId)"
                />
              </template>
            </ElTableColumn>
            <el-table-column
              v-if="checkList.includes('customerAccord')"
              align="left"
              prop="customerAccord"
              show-overflow-tooltip
              :label="t('customer.customerName')"
              width="150"
            >
              <template #default="{ row }">
                <div class="flex-c tableBig">
                  <div class="oneLine">{{ row.customerAccord }}</div>
                  <copy
                    :content="row.customerAccord"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.tenantCustomerId === current,
                    }"
                  />
                  <SvgIcon
                    @click="quickEdit(row, 'customerAccord')"
                    :class="{
                      edit: 'edit',
                      current: row.tenantCustomerId === current,
                    }"
                    name="i-ep:edit"
                    color="#409eff"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('customerShortName')"
              align="left"
              prop="customerShortName"
              show-overflow-tooltip
              :label="t('customer.customerShortName')"
              width="150"
            >
              <template #default="{ row }">
                <div class="flex-c tableBig">
                  <div class="oneLine" style="width: calc(100% - 20px)">
                    {{ row.customerShortName }}
                  </div>
                  <SvgIcon
                    @click="quickEdit(row, 'customerShortName')"
                    :class="{
                      edit: 'edit',
                      current: row.tenantCustomerId === current,
                    }"
                    name="i-ep:edit"
                    color="#409eff"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('tenantCustomerId')"
              align="left"
              prop="tenantCustomerId"
              show-overflow-tooltip
              :label="t('customer.customerCode')"
              width="150"
            >
              <template #default="{ row }">
                <div class="copyId tableSmall">
                  <div class="oneLine projectId">
                    {{ row.tenantCustomerId }}
                  </div>
                  <copy
                    :content="row.tenantCustomerId"
                    :class="{
                      rowCopy: 'rowCopy',
                      current: row.tenantCustomerId === current,
                    }"
                  />
                  <!-- <copy /> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('chargeId')"
              align="left"
              prop="chargeId"
              show-overflow-tooltip
              label="PM"
              ><template #default="{ row }">
                <div class="flex-c">
                  <div class="oneLine" style="width: calc(100% - 20px)">
                    <el-text v-for="item in staffList" :key="item.id">
                      <el-text
                        v-if="item.id === row.chargeId"
                        class="fontC-System"
                      >
                        {{ item.userName }}
                      </el-text>
                    </el-text>
                  </div>
                  <SvgIcon
                    @click="quickEdit(row, 'chargeId')"
                    :class="{
                      edit: 'edit',
                      current: row.tenantCustomerId === current,
                    }"
                    name="i-ep:edit"
                    color="#409eff"
                  />
                </div>
              </template>
            </el-table-column>

            <el-table-column
              v-if="checkList.includes('projectNumber')"
              align="left"
              prop="turnover"
              show-overflow-tooltip
              :label="t('customer.noAssociatedProject')"
            >
              <template #default="{ row }">
                <span style="display: inline-block" class="fontC-System">
                  {{ row.projectNumber || 0 }}
                </span>
                <!-- <el-button
                  v-if="row.projectNumber"
                  text
                  type="primary"
                  size="small"
                  class="p-1"
                  @click="associatedProjects(row)"
                >
                  <SvgIcon
                    name="mdi:cursor-default-click"
                    size="16px"
                    color="#409eff"
                  />
                </el-button> -->
              </template>
            </el-table-column>
            <ElTableColumn
              v-if="checkList.includes('antecedentQuestionnaire')"
              align="left"
              show-overflow-tooltip
              prop="antecedentQuestionnaire"
              :label="t('customer.antecedentQuestionnaire')"
            >
              <template #default="{ row }">
                <ElSwitch
                  v-model="row.antecedentQuestionnaire"
                  inline-prompt
                  :inactive-value="1"
                  :active-value="2"
                  :active-text="t('customer.enable')"
                  :inactive-text="t('customer.forbidden')"
                  @change="changeState($event, 2, row.tenantCustomerId)"
                />
              </template>
            </ElTableColumn>
            <ElTableColumn
              v-if="checkList.includes('riskControl')"
              align="left"
              show-overflow-tooltip
              prop="riskControl"
              :label="t('customer.riskControl')"
            >
              <template #default="{ row }">
                <ElSwitch
                  v-model="row.riskControl"
                  inline-prompt
                  :inactive-value="1"
                  :active-value="2"
                  :active-text="t('customer.enable')"
                  :inactive-text="t('customer.forbidden')"
                  @change="changeState($event, 3, row.tenantCustomerId)"
                />
              </template>
            </ElTableColumn>
            <el-table-column
              v-if="checkList.includes('turnover')"
              align="left"
              prop="turnover"
              show-overflow-tooltip
              :label="t('customer.limit')"
            >
              <template #default="{ row }">
                <div v-if="row.turnover > 0" class="fontC-System">
                  <CurrencyType />{{ row.turnover }}
                </div>
                <el-text v-else class="fontC-System">-</el-text>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkList.includes('rateAudit')"
              align="left"
              prop="rateAudit"
              show-overflow-tooltip
              :label="t('customer.rateMin')"
              ><template #default="{ row }">
                <div class="fontC-System">
                  {{ row.rateAudit ? row.rateAudit : "-" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              fixed="right"
              prop="i"
              :label="t('customer.control')"
              width="200"
            >
              <template #default="{ row }">
                <ElSpace>
                  <el-button
                    size="small"
                    plain
                    type="primary"
                    @click="handleEdit(row)"
                    v-auth="'customer-update-updateTenantCustomer'"
                  >
                    {{ t("common.edit") }}
                  </el-button>
                  <el-button
                    type="warning"
                    plain
                    size="small"
                    @click="handleCheck(row)"
                    v-auth="'customer-get-getTenantCustomerInfo'"
                  >
                    {{ t("common.detail") }}
                  </el-button>
                  <el-button
                    type="danger"
                    plain
                    size="small"
                    @click="handleDelete(row)"
                    v-auth="'customer-delete-deleteTenantCustomer'"
                  >
                    {{ t("common.delete") }}
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
          <customerEdit ref="editRef" @fetch-data="queryData" />
          <QuickEdit ref="QuickEditRef" @fetch-data="queryData" />
          <AssociatedProjects
            ref="AssociatedProjectsRef"
            @fetch-data="queryData"
          />
          <customerDetail ref="checkRef" @fetch-data="queryData" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="t('customer.cooperativeMerchant')" name="second">
        <cooperation />
      </el-tab-pane>
    </el-tabs>
  </PageMain>
</template>

<style scoped lang="scss">
.copyId .projectId {
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
  position: relative;
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

.el-table__row:hover .edit {
  display: block;
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
</style>
