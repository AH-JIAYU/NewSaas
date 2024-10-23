<script setup lang="ts">
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerEdit from "./components/CustomerEdit/index.vue";
import QuickEdit from './components/QuickEdit/index.vue';
import AssociatedProjects from './components/AssociatedProjects/index.vue';
import customerDetail from "./components/CustomerDetail/index.vue";
import { submitLoading } from "@/utils/apiLoading";
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import api from "@/api/modules/user_customer";
import apiUser from '@/api/modules/configuration_manager'
import empty from '@/assets/images/empty.png'
const customerStore = useUserCustomerStore(); // 客户
defineOptions({
  name: "customer",
});

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
const current = ref<any>()//表格当前选中
const selectRows = ref(); // 表格选中行
const border = ref(false); // 表格控件-边框
const stripe = ref(false); // 表格控件-条纹
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const lineHeight = ref<any>("default"); // 表格控件-大小
const checkList = ref<any>([]); // 表格控件-展示列
const formSearchList = ref<any>()//表单排序配置
const formSearchName = ref<string>('formSearch-customer')// 表单排序name
const columns = ref([
  {
    label: "客户编码",
    checked: true,
    sortable: true,
    prop: "tenantCustomerId",
  },
  { label: "客户名称", checked: true, sortable: true, prop: "customerAccord" },
  {
    label: "客户简称",
    checked: true,
    sortable: true,
    prop: "customerShortName",
  },
  { label: "PM", checked: true, sortable: true, prop: "chargeId" },
  { label: "关联项目数", checked: true, sortable: true, prop: "projectNumber" },
  { label: "客户状态", checked: true, sortable: true, prop: "customerStatus" },
  {
    label: "前置问卷",
    checked: true,
    sortable: true,
    prop: "antecedentQuestionnaire",
  },
  { label: "风险控制", checked: true, sortable: true, prop: "riskControl" },
  { label: "客户营业限额/月", checked: true, sortable: true, prop: "turnover" },
  { label: "审核率Min值", checked: true, sortable: true, prop: "rateAudit" },
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
      message: "修改成功",
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
  if (val) current.value = val.tenantCustomerId
  else current.value = ''
}
// 快速编辑
function quickEdit(row: any, type: any) {
  /**
   * customerAccord 客户名称
     customerShortName  客户简称
     chargeId PM
  */
  QuickEditRef.value.showEdit(row, type)
}
// 查看关联项目数
function associatedProjects(row: any) {
  AssociatedProjectsRef.value.showEdit(row)
}

// 删除
function handleDelete(row: any) {
  ElMessageBox.confirm(`您确定要删除当前项吗?`, "确认信息")
    .then(async () => {
      const { status } = await submitLoading(
        api.delete({
          tenantCustomerId: row.tenantCustomerId,
        })
      );
      status === 1 &&
        ElMessage.success({
          message: "删除成功",
        });
      queryData();
    })
    .catch(() => { });
}
// 查询
const queryForm = reactive<any>({
  customerShortName: "",
  customerStatus: null,
  antecedentQuestionnaire: null,
});
// 获取PM/用户
const getTenantStaffList = async () => {
  const { data } = await apiUser.getTenantStaffList()
  staffList.value = data
}
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
    customerStatus: null,
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
  await getTenantStaffList()
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  queryData();
  formSearchList.value = [
    { index: 1, show: true, type: 'input', modelName: 'customerShortName', placeholder: '客户简称' },
    {
      index: 2, show: true, type: 'select', modelName: 'customerStatus', placeholder: '客户状态', option: 'customerStatus', optionLabel: 'label', optionValue: 'value'
    },
    {
      index: 3, show: true, type: 'select', modelName: 'antecedentQuestionnaire', placeholder: '前置问卷', option: 'antecedentQuestionnaire', optionLabel: 'label', optionValue: 'value'
    }
  ]
});
const formOption={
  customerStatus:()=>[{ label: '禁用', value: 1 },{ label: '启用', value: 2 }],
  antecedentQuestionnaire:()=>[{ label: '禁用', value: 1 },{ label: '启用', value: 2 }],
}
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange"
        @onReset="onReset" :model="queryForm"  :formOption="formOption"/>
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="handleAdd">
            新增
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe" style="margin-left: 12px"
            @query-data="queryData" />
        </FormRightPanel>
      </el-row>
      <el-table v-loading="listLoading" :border="border" :data="list" :size="lineHeight" :stripe="stripe"
        @selection-change="setSelectRows" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column align="left" type="selection" />
        <ElTableColumn v-if="checkList.includes('customerStatus')" align="left" show-overflow-tooltip
          prop="customerStatus" label="客户状态"     width="84">
          <template #default="{ row }">
            <ElSwitch v-model="row.customerStatus" inline-prompt :inactive-value="1" :active-value="2" active-text="启用"
              inactive-text="禁用" @change="changeState($event, 1, row.tenantCustomerId)" />
          </template>
        </ElTableColumn>
        <el-table-column v-if="checkList.includes('customerAccord')" align="left" prop="customerAccord"
          show-overflow-tooltip label="客户名称">
          <template #default="{ row }">
            <div class="flex-c tableBig">
              <div class="oneLine" style="width: calc(100% - 20px);"> {{ row.customerAccord }} </div>
              <SvgIcon @click="quickEdit(row, 'customerAccord')"
                :class="{ edit: 'edit', current: row.tenantCustomerId === current }" name="i-ep:edit" color="#409eff" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('tenantCustomerId')" align="left" prop="tenantCustomerId"
            show-overflow-tooltip label="客户编码">
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
        <el-table-column v-if="checkList.includes('customerShortName')" align="left" prop="customerShortName"
          show-overflow-tooltip label="客户简称" width="100">
          <template #default="{ row }">
            <div class="flex-c tableBig">
              <div class="oneLine" style="width: calc(100% - 20px);"> {{ row.customerShortName }} </div>
              <SvgIcon @click="quickEdit(row, 'customerShortName')"
                :class="{ edit: 'edit', current: row.tenantCustomerId === current }" name="i-ep:edit" color="#409eff" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('chargeId')" align="left" prop="chargeId" show-overflow-tooltip
          label="PM"><template #default="{ row }">
            <div class="flex-c tableBig">
              <div class="oneLine" style="width: calc(100% - 20px);">
                <el-text v-for="item in staffList" :key="item.id">
                  <el-text v-if="item.id === row.chargeId">
                    {{ item.userName }}
                  </el-text>
                </el-text>
              </div>
              <SvgIcon @click="quickEdit(row, 'chargeId')"
                :class="{ edit: 'edit', current: row.tenantCustomerId === current }" name="i-ep:edit" color="#409eff" />
            </div>

          </template>
        </el-table-column>

        <el-table-column v-if="checkList.includes('projectNumber')" align="left" prop="turnover" show-overflow-tooltip
          label="关联项目数">
          <template #default="{ row }">
            <span style="display: inline-block" class="tableBig">
              {{ row.projectNumber || 0 }}
            </span>
            <el-button v-if="row.projectNumber" text type="primary" size="small" class="p-1"
              @click="associatedProjects(row)">
              <SvgIcon name="mdi:cursor-default-click" size="16px" color="#409eff" />
            </el-button>

          </template>
        </el-table-column>
        <ElTableColumn v-if="checkList.includes('antecedentQuestionnaire')" align="left" show-overflow-tooltip
          prop="antecedentQuestionnaire" label="前置问卷">
          <template #default="{ row }">
            <ElSwitch v-model="row.antecedentQuestionnaire" inline-prompt :inactive-value="1" :active-value="2"
              active-text="启用" inactive-text="禁用" @change="changeState($event, 2, row.tenantCustomerId)" />
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="checkList.includes('riskControl')" align="left" show-overflow-tooltip prop="riskControl"
          label="风险控制">
          <template #default="{ row }">
            <ElSwitch v-model="row.riskControl" inline-prompt :inactive-value="1" :active-value="2" active-text="启用"
              inactive-text="禁用" @change="changeState($event, 3, row.tenantCustomerId)" />
          </template>
        </ElTableColumn>
        <el-table-column v-if="checkList.includes('turnover')" align="left" prop="turnover" show-overflow-tooltip
          label="客户营业限额/月">
          <template #default="{ row }">
            <div class="tableBig">
              <CurrencyType />{{ row.turnover || 0 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('rateAudit')" align="left" prop="rateAudit" show-overflow-tooltip
          label="审核率Min值"><template #default="{ row }">
            <div class="tableBig">
              {{ row.rateAudit ? row.rateAudit : "-" }}
            </div>
          </template>
        </el-table-column>



        <el-table-column align="left" fixed="right" prop="i" label="操作" width="200">
          <template #default="{ row }">
            <ElSpace>
              <el-button size="small" plain type="primary" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button type="warning" plain size="small" @click="handleCheck(row)">
                详情
              </el-button>
              <el-button type="danger" plain size="small" @click="handleDelete(row)">
                删除
              </el-button>
            </ElSpace>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
      <customerEdit ref="editRef" @fetch-data="queryData" />
      <QuickEdit ref="QuickEditRef" @fetch-data="queryData" />
      <AssociatedProjects ref="AssociatedProjectsRef" @fetch-data="queryData" />
      <customerDetail ref="checkRef" @fetch-data="queryData" />
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
.copyId .projectId {
  font-size:.875rem;
}
.copyId  .current {
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

.el-table__row:hover .edit {
  display: block;
}

.flex-c {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  >div:nth-of-type(1) {
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
