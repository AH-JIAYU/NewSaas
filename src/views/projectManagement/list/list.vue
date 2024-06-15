<script setup lang="ts">
import allocationEdit from "./components/AllocationEdit/index.vue";
import ProjeckEdit from "./components/ProjeckEdit/index.vue";
import ProjectDetail from "./components/ProjectDetails/index.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/projectManagement";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import useProjectManagementListStore from "@/store/modules/projectManagement_list"; // 项目

const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const customerStore = useUserCustomerStore(); // 客户
const projectManagementListStore = useProjectManagementListStore(); //项目
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();

pagination.value.size = 5;
pagination.value.sizes = [5, 10, 20, 50];
defineOptions({
  name: "ProjectManagementListIndex",
});
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const addAllocationEditRef = ref();
const addProjeckRef = ref();
const projectDetailsRef = ref();
// 右侧工具栏配置变量
const border = ref(true);
const checkList = ref<any>([]);
const tableAutoHeight = ref(false); // 表格控件-高度自适应
// 表格控件-控制全屏
const lineHeight = ref<any>("default");
const stripe = ref(false);
const columns = ref([
  { prop: "projectId", label: "项目id", checked: true, sotrtable: true },
  { prop: "name", label: "项目名称", checked: true, sotrtable: true },
  {
    prop: "clientName",
    label: "客户名称/标识",
    checked: true,
    sotrtable: true,
  },
  {
    prop: "PCNL",
    label: "参与/完成/配额/限量",
    checked: true,
    sotrtable: true,
  },
  { prop: "allocationType", label: "分配类型", checked: true, sotrtable: true },
  { prop: "doMoneyPrice", label: "原价", checked: true, sotrtable: true },
  { prop: "ir", label: "IR/NIR", checked: true, sotrtable: true },
  { prop: "countryIdList", label: "国家地区", checked: true, sotrtable: true },
  {
    prop: "allocationStatus",
    label: "分配状态",
    checked: true,
    sotrtable: true,
  },
  { prop: "isOnline", label: "项目状态", checked: true, sotrtable: true },
  { prop: "remark", label: "备注", checked: true, sotrtable: true },
  { prop: "createName", label: "创建人", checked: true, sotrtable: true },
  { prop: "createTime", label: "创建时间", checked: true, sotrtable: true },
]);
const search = ref<any>({
  time: [], // 时间
  beginTime: "", // 开始时间 格式:2024-03-01 00:00:00
  endTime: "", // 	结束时间 格式:2024-03-30 23:59:59
  projectId: "", // 	项目Id
  name: "", // 	项目名称模糊匹配
  projectIdentification: "", // 	项目标识模糊查询
  clientId: "", // 	所属客户编号Id
  countryId: [], // 所属国家编号Id
  createName: "", // 	创建人-模糊查询
  allocation: "", // 	分配状态:1已经分配 2:未分配
  allocationStatus: "", // 	分配类型: 1:自动分配 2:供应商 3:会员组
  status: "", // 	项目状态:1在线 2:离线
}); // 搜索
const list = ref<any>([]);
// 分配
function distribution(row: any) {
  addAllocationEditRef.value.showEdit(row, "distribution");
}
// 重新分配
function reassign(row: any) {
  addAllocationEditRef.value.showEdit(row, "reassign");
}
// 新增项目
function addProject() {
  addProjeckRef.value.showEdit();
}
// 编辑项目
function projectEdit(row: any) {
  if (row.allocationStatus === 1) {
    addProjeckRef.value.showEdit(row);
  } else {
    ElMessage.warning({
      message: "已分配项目不能修改",
      center: true,
    });
  }
}
// 修改状态
async function changeStatus(row: any, val: any) {
  if (row.allocationStatus === 1) {
    const params = {
      projectId: row.projectId,
      isOnline: val,
    };
    const { status } = await submitLoading(api.changestatus(params));
    status === 1 &&
      ElMessage.success({
        message: "修改「状态」成功",
        center: true,
      });
    fetchData();
  } else {
    ElMessage.warning({
      message: "已分配项目不能修改状态",
      center: true,
    });
  }
}
// 项目详情
function projectDetails(row: any) {
  projectDetailsRef.value.showEdit(row);
}
// 表格控件-控制全屏

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
  search.value = {
    time: [], // 时间
    beginTime: "", // 开始时间 格式:2024-03-01 00:00:00
    endTime: "", // 	结束时间 格式:2024-03-30 23:59:59
    projectId: "", // 	项目Id
    name: "", // 	项目名称模糊匹配
    projectIdentification: "", // 	项目标识模糊查询
    clientId: "", // 	所属客户编号Id
    countryId: [], // 所属国家编号Id
    createName: "", // 	创建人-模糊查询
    allocation: "", // 	分配状态:1已经分配 2:未分配
    allocationStatus: "", // 	分配类型: 1:自动分配 2:供应商 3:会员组
    status: "", // 	项目状态:1在线 2:离线
  };
  fetchData();
}
// 获取集合
async function fetchData() {
  listLoading.value = true;
  const params = {
    ...getParams(),
    ...search.value,
  };
  if (search.value.time && !!search.value.time.length) {
    params.beginTime = search.value.time[0] || "";
    params.endTime = search.value.time[1] || "";
  }
  const { data } = await api.list(params);
  list.value = data.getChildrenProjectInfoList;
  pagination.value.total = data.total;
  listLoading.value = false;
}
const countryList: any = ref([]); //所有国家一维
const customerList: any = ref([]); //客户列表
// 具体的位置信息
const comCountryId = computed(() => (countryIdList: any) => {
  const list = countryList.value
    .filter((item: any) => countryIdList.includes(item.id))
    .map((item: any) => item.chineseName);
  return list;
});

onMounted(async () => {
  countryList.value = await basicDictionaryStore.getCountry();
  customerList.value = await customerStore.getCustomerList();
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
  >
    <PageMain class="hide-drawer-header">
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form
            :model="search"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model="search.projectId"
                clearable
                placeholder="项目ID"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="search.name"
                clearable
                placeholder="项目名称"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                clearable
                v-model="search.projectIdentification"
                placeholder="项目标识"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="search.countryId"
                placeholder="国家地区"
                clearable
                filterable
                multiple
                collapse-tags
              >
                <ElOption
                  v-for="item in countryList"
                  :label="item.chineseName"
                  :value="item.id"
                ></ElOption>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select v-model="search.clientId" placeholder="客户简称">
                <el-option
                  v-for="item in customerList"
                  :key="item.tenantCustomerId"
                  :value="item.tenantCustomerId"
                  :label="item.customerAccord"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="search.allocationStatus"
                placeholder="分配类型"
              >
                <el-option label="自动分配" :value="1"> </el-option>
                <el-option label="供应商" :value="2"> </el-option>
                <el-option label="会员组" :value="3"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select v-model="search.status" placeholder="项目状态">
                <el-option label="已分配" :value="1" />
                <el-option label="未分配" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-input
                v-model="search.createName"
                clearable
                placeholder="创建人"
              />
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker
                v-model="search.time"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="创建开始日期"
                end-placeholder="创建结束日期"
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
          </el-form>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="addProject">
            添加项目
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
        v-loading="listLoading"
        style="margin-top: 10px"
        row-key="projectId"
        :data="list"
        :tree-props="{ children: 'getChildrenProjectListInfoList' }"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
      >
        <el-table-column type="selection" />
        <el-table-column
          v-if="checkList.includes('projectId')"
          show-overflow-tooltip
          prop="projectId"
          align="center"
          label="项目ID"
        />
        <el-table-column
          v-if="checkList.includes('name')"
          show-overflow-tooltip
          prop="name"
          align="center"
          label="项目名称"
        />
        <el-table-column
          v-if="checkList.includes('clientName')"
          show-overflow-tooltip
          prop="clientName"
          align="center"
          label="客户简称/标识"
        />
        <el-table-column
          v-if="checkList.includes('PCNL')"
          show-overflow-tooltip
          align="center"
          label="参与/完成/配额/限量"
        >
          <template #default="{ row }">
            {{ row.participation }}/ {{ row.complete }}/ {{ row.num }}/
            {{ row.limitedQuantity }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('allocationType')"
          show-overflow-tooltip
          prop="allocationType"
          align="center"
          label="分配类型"
        >
          <template #default="{ row }">
            {{
              projectManagementListStore.allocationTypeList[row.allocationType]
            }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('doMoneyPrice')"
          show-overflow-tooltip
          align="center"
          label="原价"
        >
          <template #default="{ row }">
            $ {{ row.doMoneyPrice }} ￥{{ row.memberPrice }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('name')"
          show-overflow-tooltip
          prop=""
          align="center"
          label="供应商价"
        />
        <el-table-column
          v-if="checkList.includes('ir')"
          show-overflow-tooltip
          prop="ir"
          align="center"
          label="IR/NIR"
        />
        <el-table-column
          v-if="checkList.includes('countryIdList')"
          show-overflow-tooltip
          prop="countryIdList"
          align="center"
          label="国家地区"
          width="200"
        >
          <template #default="{ row }">
            <template v-if="row.countryIdList">
              <template v-if="comCountryId(row.countryIdList).length > 4">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="comCountryId(row.countryIdList).join(',')"
                  placement="top"
                >
                  <el-link type="primary">{{
                    comCountryId(row.countryIdList).length
                  }}</el-link>
                </el-tooltip>
              </template>
              <template v-else>
                <el-tag
                  v-for="item in comCountryId(row.countryIdList)"
                  :key="item"
                  type="primary"
                >
                  {{ item }}
                </el-tag>
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('allocationStatus')"
          show-overflow-tooltip
          prop="allocationStatus"
          align="center"
          label="分配状态"
        >
          <template #default="{ row }">
            {{ row.allocationStatus === 1 ? "未分配" : "已分配" }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('isOnline')"
          show-overflow-tooltip
          prop="isOnline"
          align="center"
          label="项目状态"
        >
          <template #default="{ row }">
            <ElSwitch
              :disabled="row.allocationStatus === 2"
              @change="changeStatus(row, $event)"
              inline-prompt
              v-model="row.isOnline"
              active-text="在线"
              inactive-text="离线"
              :active-value="1"
              :inactive-value="2"
            />
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('remark')"
          show-overflow-tooltip
          prop="remark"
          align="center"
          label="备注"
        />
        <el-table-column
          v-if="checkList.includes('createName')"
          show-overflow-tooltip
          prop="createName"
          align="center"
          label="创建人"
        />
        <el-table-column
          v-if="checkList.includes('createTime')"
          show-overflow-tooltip
          prop="createTime"
          align="center"
          label="创建时间"
        />
        <el-table-column align="center" label="操作" width="250">
          <template #default="{ row }">
            <el-button
              v-if="row.allocationStatus === 1"
              plain
              type="primary"
              size="small"
              @click="distribution(row)"
            >
              分配
            </el-button>
            <el-button
              v-else
              plain
              type="primary"
              size="small"
              @click="reassign(row)"
            >
              重新分配
            </el-button>
            <el-button
              type="primary"
              plain
              size="small"
              :disabled="row.allocationStatus === 2"
              @click="projectEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              size="small"
              plain
              @click="projectDetails(row)"
            >
              详情
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
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </PageMain>
    <allocationEdit ref="addAllocationEditRef" @fetchData="fetchData" />
    <ProjeckEdit ref="addProjeckRef" @fetchData="fetchData" />
    <ProjectDetail ref="projectDetailsRef" />
  </div>
</template>

<style scoped lang="scss">
:deep {
  table {
    width: 100% !important;
  }

  thead {
    z-index: 999;
    background-color: #f2f3f5 !important;
  }

  .el-table__header {
    th {
      background: var(--el-fill-color-lighter) !important;
    }
  }
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
