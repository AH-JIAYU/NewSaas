<script setup lang="ts">
import allocationEdit from "./components/AllocationEdit/index.vue";
import ProjeckEdit from "./components/ProjeckEdit/index.vue";
import ProjectDetail from "./components/ProjectDetails/index.vue";
import ViewAllocation from "./components/ViewAllocation/index.vue";
import QuickEdit from "./components/QuickEdit/index.vue"; //快速编辑
import scheduling from "./components/Edit/index.vue"; //项目调度
import outsource from "@/views/projectManagement/outsource/components/Edit/index.vue"; //项目外包
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/projectManagement";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import useProjectManagementListStore from "@/store/modules/projectManagement_list"; // 项目
import empty from "@/assets/images/empty.png";
import storage from "@/utils/storage";

defineOptions({
  name: "list",
});
// 时间
const { format } = useTimeago();
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const customerStore = useUserCustomerStore(); // 客户
const projectManagementListStore = useProjectManagementListStore(); //项目
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
// 货币类型
const countryType = ref<any>();
const tableSortRef = ref<any>();
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const addAllocationEditRef = ref();
const addProjeckRef = ref();
const projectDetailsRef = ref();
const viewAllocationsRef = ref(); //查看分配
const QuickEditRef = ref(); //快速编辑
const schedulingRef = ref(); //调度
const outsourceRef = ref(); //外包
// 右侧工具栏配置变量
const border = ref(false);
const checkList = ref<any>([]);
const tableAutoHeight = ref(false); // 表格控件-高度自适应
// 表格控件-控制全屏
const lineHeight = ref<any>("default");
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-list"); // 表单排序name
const stripe = ref(false);
const columns = ref([
  { prop: "projectType", label: "项目类型", checked: true, sotrtable: true },
  { prop: "projectId", label: "项目ID", checked: true, sotrtable: true },
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
  { prop: "doMoneyPrice", label: "项目价", checked: true, sotrtable: true },
  { prop: "ir", label: "IR/NIR", checked: true, sotrtable: true },
  { prop: "countryIdList", label: "区域地区", checked: true, sotrtable: true },
  {
    prop: "allocationStatus",
    label: "分配状态",
    checked: true,
    sotrtable: true,
  },
  { prop: "isOnline", label: "项目状态", checked: true, sotrtable: true },
  { prop: "remark", label: "备注", checked: true, sotrtable: true },
  { prop: "create", label: "创建", checked: true, sotrtable: true },
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
  countryId: [], // 所属区域编号Id
  createName: "", // 	创建人-模糊查询
  allocation: "", // 	分配状态:1已经分配 2:未分配
  allocationStatus: "", // 	分配类型: 1:自动分配 2:供应商 3:部门
  status: "", // 	项目状态:1在线 2:离线
}); // 搜索
const list = ref<any>([]);

const current = ref<any>(); //表格当前选中
function handleCurrentChange(val: any) {
  if (val) current.value = val.projectId;
  else current.value = "";
}

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
  addProjeckRef.value.showEdit(row);
}
// 快速编辑
function quickEdit(row: any, type: any) {
  /**
   * 参数  PCNL
    客户 customer
    名称/标识 name
    项目价 doMoneyPrice
    IR ir
    备注 remark
  */
  QuickEditRef.value.showEdit(row, type);
}
// 修改状态
async function changeStatus(row: any, val: any) {
  if (row.projectType !== 2) {
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
  }
}
// 项目详情
function projectDetails(row: any) {
  projectDetailsRef.value.showEdit(row, row.projectType);
}
// 项目调度 快捷操作
function dispatch() {
  const selectList = tableSortRef.value.getSelectionRows();
  if (selectList.length !== 1) {
    ElMessage.warning({
      message: "请选择一个项目",
      center: true,
    });
  } else if (selectList[0].isOnline === 2) {
    ElMessage.warning({
      message: "离线不可调度",
      center: true,
    });
  } else if (selectList[0].projectType === 2) {
    ElMessage.warning({
      message: "外包项目不可调度",
      center: true,
    });
  } else {
    schedulingRef.value.showEdit(selectList[0], "projectList");
  }
}
// 外包查看点击id
function outsourceDetails(row: any) {
  let type;
  if (row.allocationType === 4) type = 0;
  if (row.projectType === 2) type = 1;
  outsourceRef.value.showEdit(row, type);
}
// 查看分配
function viewAllocations(row: any, type: number) {
  const params = {
    projectId: row.projectId,
    type,
  };
  viewAllocationsRef.value.showEdit(params);
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
  search.value = {
    time: [], // 时间
    beginTime: "", // 开始时间 格式:2024-03-01 00:00:00
    endTime: "", // 	结束时间 格式:2024-03-30 23:59:59
    projectId: "", // 	项目Id
    name: "", // 	项目名称模糊匹配
    projectIdentification: "", // 	项目标识模糊查询
    clientId: "", // 	所属客户编号Id
    countryId: '', // 所属区域编号Id
    createName: "", // 	创建人-模糊查询
    allocation: "", // 	分配状态:1已经分配 2:未分配
    allocationStatus: "", // 	分配类型: 1:自动分配 2:供应商 3:部门
    status: "", // 	项目状态:1在线 2:离线
  };
  fetchData();
}
// 获取集合
async function fetchData() {
  try {
    listLoading.value = true;
    const params = {
      ...getParams(),
      ...search.value,
    };
    if (!Array.isArray(params.countryId)) {
      params.countryId = params.countryId?.split(",");
    }
    if (search.value.time && !!search.value.time.length) {
      params.beginTime = search.value.time[0] || "";
      params.endTime = search.value.time[1] || "";
    }

    const { data } = await api.list(params);
    countryType.value = data.currencyType;
    list.value = data.getChildrenProjectInfoList;
    pagination.value.total = data.total;
    listLoading.value = false;
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
// 表格时候可勾选
const selectable = (row: any) => {
  const filterDataId = list.value
    .filter((item: any) => item.projectType === 2)
    .map((item: any) => item.projectId);
  return !filterDataId.includes(row.projectId);
};
const countryList: any = ref([]); //所有区域一维
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
  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "projectId",
      placeholder: "项目ID",
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "name",
      placeholder: "项目名称",
    },
    {
      index: 3,
      show: true,
      type: "input",
      modelName: "projectIdentification",
      placeholder: "项目标识",
    },
    {
      index: 4,
      show: true,
      type: "select",
      modelName: "countryId",
      placeholder: "区域地区",
      option: "global",
      optionLabel: "chineseName",
      optionValue: "id",
    },
    {
      index: 5,
      show: true,
      type: "select",
      modelName: "clientId",
      placeholder: "客户简称",
      option: "clientId",
      optionLabel: "customerAccord",
      optionValue: "tenantCustomerId",
    },
    {
      index: 6,
      show: true,
      type: "select",
      modelName: "allocationStatus",
      placeholder: "分配类型",
      option: "allocationStatus",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 7,
      show: true,
      type: "select",
      modelName: "status",
      placeholder: "项目状态",
      option: "status",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 8,
      show: true,
      type: "input",
      modelName: "createName",
      placeholder: "创建人",
    },
    {
      index: 9,
      show: true,
      type: "select",
      modelName: "allocation",
      placeholder: "分配状态",
      option: "allocation",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 10,
      show: true,
      type: "select",
      modelName: "projectType",
      placeholder: "项目类型",
      option: "projectType",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 11,
      show: true,
      type: "datetimerange",
      modelName: "time",
      startPlaceHolder: "创建开始日期",
      endPlaceHolder: "创建结束日期",
    },
  ];
});
const formOption = {
  clientId: async () => await customerStore.getCustomerList(),
  allocationStatus: () => [
    { label: "供应商", value: 2 },
    { label: "部门", value: 3 },
    { label: "租户", value: 4 },
  ],
  status: () => [
    { label: "在线", value: 1 },
    { label: "离线", value: 2 },
  ],
  allocation: () => [
    { label: "已分配", value: 1 },
    { label: "未分配", value: 2 },
  ],
  projectType: () => [
    { label: "自有项目", value: 1 },
    { label: "外包项目", value: 2 },
  ],
};
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain class="hide-drawer-header"> 
      <FormSearch
        :formSearchList="formSearchList"
        :formSearchName="formSearchName"
        @currentChange="currentChange"
        @onReset="onReset"
        :model="search"
        :formOption="formOption"
      />
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button type="primary" size="default" @click="addProject">
            新增项目
          </el-button>
          <el-button type="primary" size="default" @click="dispatch">
            调度
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
            style="margin-left: 0.75rem"
            @query-data="currentChange"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        ref="tableSortRef"
        v-loading="listLoading"
        style="margin-top: 0.625rem"
        row-key="projectId"
        :data="list"
        :tree-props="{ children: 'getChildrenProjectListInfoList' }"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
        highlight-current-row
        height="100%"
        @current-change="handleCurrentChange"
      >
        <el-table-column
          align="left"
          type="selection"
          :selectable="selectable"
        />
        <el-table-column
          v-if="checkList.includes('isOnline')"
          show-overflow-tooltip
          prop="isOnline"
          align="left"
          width="84"
          label="状态"
        >
          <template #default="{ row }">
            <ElSwitch
              @change="changeStatus(row, $event)"
              inline-prompt
              v-model="row.isOnline"
              active-text="在线"
              inactive-text="离线"
              :active-value="1"
              :inactive-value="2"
              :disabled="row.projectType === 2"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectType')"
          align="left"
          label="项目"
          width="150"
        >
          <template #default="{ row }">
            <div>
              <el-button
                class="p-1"
                size="small"
                type="warning"
                v-if="row.projectType === 2"
                >外包</el-button
              >
              <el-button class="p-1" size="small" type="primary" v-else
                >自有</el-button
              >
              <el-button
                class="p-1"
                size="small"
                text
                type="primary"
                v-if="row.projectLinkType === 2"
                @click="outsourceDetails(row)"
              >
                <SvgIcon
                  name="i-ri:share-forward-line"
                  color="#409eff"
                  size="1.25rem"
                />
              </el-button>
            </div>
            <div class="copyId tableSmall">
              <div class="id oneLine">
                <el-tooltip
                  effect="dark"
                  :content="row.projectId"
                  placement="top-start"
                >
                  {{ row.projectId }}
                </el-tooltip>
              </div>

              <copy
                :content="row.projectId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.projectId === current,
                }"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('name')"
          show-overflow-tooltip
          prop="name"
          align="left"
          label="名称/标识"
          width="150"
          ><template #default="{ row }">
            <div class="flex-c">
              <div class="oneLine" style="width: calc(100% - 1.25rem)">
                <b class="oneLine tableBig"
                  >名:
                  <span :class="row.isB2b === 2 ? 'red' : ''">{{
                    row.name
                  }}</span></b
                >
                <div class="oneLine">
                  标:
                  <span :class="row.isB2b === 2 ? 'red' : ''">{{
                    row.clientName.split("/")[1]
                  }}</span>
                </div>
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'name')"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('clientName')"
          prop="clientName"
          show-overflow-tooltip
          align="left"
          label="客户"
          width="120"
          ><template #default="{ row }">
            <div class="flex-c">
              <div class="oneLine" style="width: calc(100% - 1.25rem)">
                <b class="tableBig">{{ row.clientName.split("/")[0] }}</b>
                <div class="oneLine">
                  <!-- <img :src="row.avatar" alt="" class="avatar" />
                  <span class="">{{ row.chargeName }}</span> -->
                  <el-tooltip
                    effect="dark"
                    :content="row.chargeName"
                    placement="top-start"
                  >
                    PM：{{ row.chargeName }}
                  </el-tooltip>
                  <!-- PM：{{ row.chargeName }} -->
                </div>
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'customer')"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('PCNL')"
          align="left"
          label="参数"
          width="200"
        >
          <template #default="{ row }">
            <div class="flex-c">
              <div
                class="oneLine parameter"
                style="width: calc(100% - 1.25rem)"
              >
                <el-text
                  style="color: rgb(251, 104, 104)"
                  class="oneLine"
                  type="danger"
                  >参与: {{ row.participation || 0 }}</el-text
                >
                <el-text
                  style="color: rgb(3, 194, 57)"
                  class="oneLine"
                  type="success"
                  >完成: {{ row.complete || 0 }}</el-text
                >
                <el-text
                  style="color: rgb(255, 172, 84)"
                  class="oneLine"
                  type="warning"
                  >配额: {{ row.num || 0 }}</el-text
                >
                <el-text
                  style="color: rgb(170, 170, 170)"
                  class="oneLine"
                  type="info"
                  >限量: {{ row.limitedQuantity || "-" }}</el-text
                >
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'PCNL')"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('allocationType')"
          align="left"
          label="分配"
          width="90"
        >
          <template #default="{ row }">
            <el-button
              class="tableBut"
              size="small"
              @click="viewAllocations(row, 1)"
              type="danger"
              v-if="row.allocationType === 1"
              plain
              >自动分配</el-button
            >
            <el-button
              class="tableBut"
              size="small"
              @click="viewAllocations(row, 2)"
              type="danger"
              v-else-if="row.allocationType === 2"
              >供应商</el-button
            >
            <el-button
              class="tableBut"
              size="small"
              @click="viewAllocations(row, 3)"
              type="success"
              v-else-if="row.allocationType === 3"
              >部门</el-button
            >
            <el-button
              class="tableBut"
              size="small"
              @click="viewAllocations(row, 4)"
              type="primary"
              v-else-if="row.allocationType === 4"
              >租户</el-button
            >
            <el-button class="tableBut" size="small" plain v-else type="info">
              未分配</el-button
            >
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('doMoneyPrice')"
          show-overflow-tooltip
          align="left"
          label="项目价"
          width="100"
        >
          <template #default="{ row }">
            <div class="flex-c">
              <div class="oneLine tableBig" style="width: calc(100% - 1.25rem)">
                <CurrencyType />{{ row.doMoneyPrice || 0 }}
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'doMoneyPrice')"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('ir')"
          show-overflow-tooltip
          prop="ir"
          align="left"
          label="IR/NIR"
          width="120"
        >
          <template #default="{ row }">
            <div class="flex-c">
              <div class="oneLine tableBig" style="width: calc(100% - 1.25rem)">
                {{ row.ir ? row.ir : 0 }}/{{ row.nir ? row.nir : 0 }}
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'ir')"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('countryIdList')"
          show-overflow-tooltip
          prop="countryIdList"
          align="left"
          label="区域"
          width="80"
        >
          <template #default="{ row }">
            <template v-if="row.countryIdList">
              <template
                v-if="
                  row.countryIdList.length ===
                  basicDictionaryStore.country.length
                "
              >
                <el-tag size="small" type="primary">全球</el-tag>
              </template>
              <template v-else-if="comCountryId(row.countryIdList).length > 1">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="comCountryId(row.countryIdList).join(',')"
                  placement="top"
                >
                  <el-link type="primary"
                    ><el-tag size="small" type="primary"
                      >×{{ comCountryId(row.countryIdList).length }}</el-tag
                    ></el-link
                  >
                </el-tooltip>
              </template>
              <template v-else>
                <el-tag
                  size="small"
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
          v-if="checkList.includes('create')"
          prop="createTime"
          align="left"
          width="120"
          label="创建"
          show-overflow-tooltip
          ><template #default="{ row }">
            <div>
              <div class="tableBig oneLine">{{ row.createName }}</div>
              <el-tooltip :content="row.createTime" placement="top">
                <el-tag effect="plain" type="info">{{format(row.createTime)}}</el-tag>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('remark')"
          show-overflow-tooltip
          prop="remark"
          align="left"
          label="备注"
          ><template #default="{ row }">
            <div class="flex-c">
              <div class="oneLine tableBig" style="width: calc(100% - 1.25rem)">
                {{ row.remark ? row.remark : "-" }}
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                @click="quickEdit(row, 'remark')"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" fixed="right" label="操作" width="230">
          <template #default="{ row }">
            <el-button
              v-if="row.allocationStatus === 1"
              plain
              :disabled="row.isOnline === 2"
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
              :disabled="row.isOnline === 2"
              size="small"
              @click="reassign(row)"
            >
              重新分配
            </el-button>
            <el-button
              type="warning"
              plain
              size="small"
              @click="projectEdit(row)"
              :disabled="row.projectType === 2"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              plain
              @click="projectDetails(row)"
            >
              详情
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
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </PageMain>
    <allocationEdit ref="addAllocationEditRef" @fetchData="fetchData" />
    <ProjeckEdit ref="addProjeckRef" @fetchData="fetchData" />
    <QuickEdit ref="QuickEditRef" @fetchData="fetchData" />
    <ProjectDetail ref="projectDetailsRef" />
    <ViewAllocation ref="viewAllocationsRef" />
    <!-- 项目调度 -->
    <scheduling ref="schedulingRef" @fetchData="fetchData" />
    <!-- 项目外包 -->
    <outsource ref="outsourceRef"></outsource>
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
}

.flex-c {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;

  > div:nth-of-type(1) {
    width: calc(100% - 1.5625rem);
    flex-shrink: 0;
  }

  .edit {
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.3125rem;
    flex-shrink: 0;
    display: none;
    cursor: pointer;
  }

  .current {
    display: block !important;
  }
}
.copyId .current {
  display: block !important;
}

.el-table__row:hover .edit {
  display: block;
}
.rowCopy {
  width: 20px;
  display: none;
}
.el-table__row:hover .rowCopy {
  display: block;
}

// 头像
.avatar {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  margin-right: 0.3125rem;
  vertical-align: bottom;
}

// 参数
.parameter {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;

  .oneLine {
    width: 40%;
    text-align: left;
    margin: 0 0.75rem 0.5rem 0;
  }

  .oneLine:nth-of-type(n + 3) {
    margin: 0 0.75rem 0 0;
  }
}

.red {
  color: rgb(251, 104, 104);
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
    grid-template-columns: repeat(auto-fit, minmax(20.625rem, 1fr));
    margin-bottom: -1.125rem;

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

:deep(.el-table__empty-block) {
  height: 100% !important;
}
.tableBut {
  width: 3.75rem;
}
</style>
