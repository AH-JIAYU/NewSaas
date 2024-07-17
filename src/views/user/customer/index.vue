<script setup lang="ts">
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerEdit from "./components/CustomerEdit/index.vue";
import customerDetail from "./components/CustomerDetail/index.vue";
import { submitLoading } from "@/utils/apiLoading";
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import api from "@/api/modules/user_customer";
const customerStore = useUserCustomerStore(); // 客户
defineOptions({
  name: "UserCustomerIndex",
});

const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页

const listLoading = ref(false); // 加载
const list = ref<Array<Object>>([]); // 表格数据
const editRef = ref<any>(); // 组件ref 添加编辑
const checkRef = ref<any>(); // 组件ref 查看
const selectRows = ref(); // 表格选中行
const border = ref(true); // 表格控件-边框
const stripe = ref(false); // 表格控件-条纹
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const lineHeight = ref<any>("default"); // 表格控件-大小
const checkList = ref<any>([]); // 表格控件-展示列
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
  { label: "负责人", checked: true, sortable: true, prop: "chargeName" },
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
// 添加
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
    .catch(() => {});
}
// 查询
const queryForm = reactive<any>({
  customerShortName: "",
  customerStatus: null,
  antecedentQuestionnaire: null,
});

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
async function fetchData() {
  listLoading.value = true;
  const params = {
    ...getParams(),
    ...queryForm,
  };
  const { data } = await api.list(params);
  list.value = data.getTenantCustomerInfoList;
  pagination.value.total = Number(data.total);
  listLoading.value = false;
}
function setSelectRows(val: any) {
  selectRows.value = val;
}
onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  queryData();
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm
            :model="queryForm.select"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item v-show="!fold">
              <el-input
                v-model="queryForm.customerShortName"
                clearable
                placeholder="客户简称"
              >
                <el-option label="name" value="name" />
              </el-input>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-select
                v-model="queryForm.customerStatus"
                clearable
                placeholder="客户状态"
              >
                <el-option label="禁用" :value="1" />
                <el-option label="启用" :value="2" />
                <!-- <el-option label="风险暂停" :value="3" /> -->
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-select
                v-model="queryForm.antecedentQuestionnaire"
                clearable
                placeholder="前置问卷"
              >
                <el-option label="禁用" :value="1" />
                <el-option label="启用" :value="2" />
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
          </ElForm>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="handleAdd">
            <template #icon>
              <SvgIcon name="i-ep:plus" />
            </template>
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
        <el-table-column
          align="center"
          show-overflow-tooltip
          type="selection"
        />
        <el-table-column
          v-if="checkList.includes('tenantCustomerId')"
          align="center"
          prop="tenantCustomerId"
          show-overflow-tooltip
          label="客户编码"
        />
        <el-table-column
          v-if="checkList.includes('customerAccord')"
          align="center"
          prop="customerAccord"
          show-overflow-tooltip
          label="客户名称"
        />

        <el-table-column
          v-if="checkList.includes('customerShortName')"
          align="center"
          prop="customerShortName"
          show-overflow-tooltip
          label="客户简称"
        />
        <el-table-column
          v-if="checkList.includes('turnover')"
          align="center"
          prop="turnover"
          show-overflow-tooltip
          label="客户营业限额($/月)"
        ><template #default="{ row }">
            {{ row.turnover ? row.turnover : '-' }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('rateAudit')"
          align="center"
          prop="rateAudit"
          show-overflow-tooltip
          label="审核率Min值"
        ><template #default="{ row }">
            {{ row.rateAudit ? row.rateAudit : '-' }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('chargeName')"
          align="center"
          prop="chargeName"
          show-overflow-tooltip
          label="负责人"
        ><template #default="{ row }">
            {{ row.chargeName ? row.chargeName : '-' }}
          </template>
        </el-table-column>
        <ElTableColumn
          v-if="checkList.includes('customerStatus')"
          align="center"
          show-overflow-tooltip
          prop="customerStatus"
          label="客户状态"
        >
          <template #default="{ row }">
            <ElSwitch
              v-model="row.customerStatus"
              inline-prompt
              :inactive-value="1"
              :active-value="2"
              active-text="启用"
              inactive-text="禁用"
              @change="changeState($event, 1, row.tenantCustomerId)"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="checkList.includes('antecedentQuestionnaire')"
          align="center"
          show-overflow-tooltip
          prop="antecedentQuestionnaire"
          label="前置问卷"
        >
          <template #default="{ row }">
            <ElSwitch
              v-model="row.antecedentQuestionnaire"
              inline-prompt
              :inactive-value="1"
              :active-value="2"
              active-text="启用"
              inactive-text="禁用"
              @change="changeState($event, 2, row.tenantCustomerId)"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="checkList.includes('riskControl')"
          align="center"
          show-overflow-tooltip
          prop="riskControl"
          label="风险控制"
        >
          <template #default="{ row }">
            <ElSwitch
              v-model="row.riskControl"
              inline-prompt
              :inactive-value="1"
              :active-value="2"
              active-text="启用"
              inactive-text="禁用"
              @change="changeState($event, 3, row.tenantCustomerId)"
            />
          </template>
        </ElTableColumn>
        <el-table-column
          align="center"
          prop="i"
          label="操作"
          show-overflow-tooltip
          width="200"
        >
          <template #default="{ row }">
            <ElSpace>
              <el-button
                size="small"
                plain
                type="primary"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                type="primary"
                plain
                size="small"
                @click="handleCheck(row)"
              >
                详情
              </el-button>
              <el-button
                type="danger"
                plain
                size="small"
                @click="handleDelete(row)"
              >
                删除
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
      <customerEdit ref="editRef" @fetch-data="queryData" />
      <customerDetail ref="checkRef" @fetch-data="queryData" />
    </PageMain>
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
