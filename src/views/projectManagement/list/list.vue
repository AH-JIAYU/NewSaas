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
import apiOut from "@/api/modules/projectManagement_outsource";
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
  // { prop: "projectType", label: "项目类型", checked: true, sotrtable: true },
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
    label: "参数",
    checked: true,
    sotrtable: true,
  },
  { prop: "allocationType", label: "分配类型", checked: true, sotrtable: true },
  { prop: "originalPrice", label: "原始价", checked: true, sotrtable: true },
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
  allocationStatus: [], // 	分配类型: 1:自动分配 2:供应商 3:部门
  // status: "", // 	项目状态:1在线 2:离线
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
  if (row.projectType === 1) {
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
  } else if (row.projectType === 2) {
    try {
      let params = {
        type: 4, //取消接收
        idList: [row.projectId],
      };
      const { status } = await apiOut.updateReceiveStatus(params);
      status === 1 &&
        ElMessage.success({
          message: "取消接收成功",
          center: true,
        });
      fetchData();
    } catch (error) {}
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
    if (selectList.length === 0) {
      ElMessage.warning({
        message: "请选择一个项目",
        center: true,
      });
    } else {
      ElMessage.warning({
        message: "只能选择一个项目调度",
        center: true,
      });
    }
  } else if (selectList[0].isOnline === 2) {
    ElMessage.warning({
      message: "离线不可调度",
      center: true,
    });
  } else {
    schedulingRef.value.showEdit(selectList[0], "projectList");
  }
  // else if (selectList[0].projectType === 2) {
  //   ElMessage.warning({
  //     message: "外包项目不可调度",
  //     center: true,
  //   });
  // }
}
// 外包查看点击id
function outsourceDetails(row: any) {
  let type;
  if (row.allocationType === 4) type = 0;
  if (row.projectType === 2) type = 1;
  outsourceRef.value.showEdit(row, type);
}
// 查看分配
function viewAllocations(row: any) {
  const params = {
    projectId: row.projectId,
    type:row.allocationType,
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
    countryId: "", // 所属区域编号Id
    createName: "", // 	创建人-模糊查询
    allocation: "", // 	分配状态:1已经分配 2:未分配
    allocationStatus: [], // 	分配类型: 1:自动分配 2:供应商 3:部门
    // status: "", // 	项目状态:1在线 2:离线
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
// const selectable = (row: any) => {
//   const filterDataId = list.value
//     .filter((item: any) => item.projectType === 2)
//     .map((item: any) => item.projectId);
//   return !filterDataId.includes(row.projectId);
// };
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
      index: 55,
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
      multiple: true,
    },
    // {
    //   index: 7,
    //   show: true,
    //   type: "select",
    //   modelName: "status",
    //   placeholder: "项目状态",
    //   option: "status",
    //   optionLabel: "label",
    //   optionValue: "value",
    // },
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
    // {
    //   index: 10,
    //   show: true,
    //   type: "select",
    //   modelName: "projectType",
    //   placeholder: "项目类型",
    //   option: "projectType",
    //   optionLabel: "label",
    //   optionValue: "value",
    // },
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
    { label: "内部站", value: 3 },
    { label: "合作商", value: 4 },
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
    { label: "内部新增", value: 1 },
    { label: "合作商分配", value: 2 },
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
        <!-- :selectable="selectable" -->
        <el-table-column align="left" type="selection" />
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
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectId')"
          align="left"
          label="项目"
          width="180"
        >
          <template #default="{ row }">
            <p>
              <span class="tableBig">
                <el-tag
                  v-if="row.projectType === 1"
                  type="primary"
                  effect="dark"
                >
                  内部新增</el-tag
                >
                <el-tag
                  v-else-if="row.projectType === 2"
                  type="warning"
                  effect="dark"
                  style="background-color: #ffac54"
                >
                  合作商分配</el-tag
                >
              </span>
            </p>
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
        <!-- <el-table-column
              v-if="checkList.includes('projectType')"
              show-overflow-tooltip
              prop="projectType"
              align="left"
              width="140"
              label="项目类型"
            >
              <template #default="{ row }">
                <span class="tableBig">
                  <el-text v-if="row.projectType === 1" type="primary">
                    内部新增</el-text
                  >
                  <el-text v-else-if="row.projectType === 2" type="info">
                    合作商分配</el-text
                  >
                </span>
              </template>
            </el-table-column> -->
        <el-table-column
          v-if="checkList.includes('name')"
          show-overflow-tooltip
          prop="name"
          align="left"
          label="名称/标识"
          width="220"
          ><template #default="{ row }">
            <div class="flex-c">
              <div class="oneLine" style="width: calc(100% - 1.25rem)">
                <p class="oneLine tableBig">
                  <span :class="row.isB2b === 2 ? 'red' : ''">{{
                    row.name
                  }}</span>
                </p>
                <div
                  v-if="row.projectType === 1"
                  class="oneLine"
                  style="color: #333333"
                >
                  <span>{{ row.clientName.split("/")[1] }}</span>
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
          width="140"
          ><template #default="{ row }">
            <div class="flex-c">
              <div class="oneLine" style="width: calc(100% - 1.25rem)">
                <b class="tableBig">{{ row.clientName.split("/")[0] }}</b>
                <div class="oneLine" style="color: #333333">
                  PM：{{ row.chargeName }}
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
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="row.participation"
                placement="top-start"
              >
                <template #content>
                  参与: {{ row.participation ? row.participation : "-" }} 完成:
                  {{ row.complete ? row.complete : "-" }} 配额:
                  {{ row.num ? row.num : "-" }} 限量:
                  {{ row.limitedQuantity ? row.limitedQuantity : "-" }}
                </template>
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
              </el-tooltip>
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
          width="230"
        >
          <template #default="{ row }">
            <el-button size="small" v-if="row.allocationStatus==1" >
                未分配</el-button
              >
            <div class="flex-c" v-if="row.allocationStatus==2" style="cursor: pointer;" >
              <el-button
                class="tableBut"
                size="small"
                @click="viewAllocations(row)"
                type="danger"
                v-if="row.allocationType?.includes(1)"
                plain
                >自动分配</el-button
              >
              <div @click="viewAllocations(row)"
              style="width: calc(100% - 1.25rem);"  class=" parameter1">
                <el-tag type="danger"  v-if="row.allocationType?.includes(2)" class="tag-with-image oneLine" >
                  <img src="@/assets/images/gong.png" style="width: 0.9375rem;height: 0.9375rem;margin-right: 0.25rem;">
                  <span>供应商</span>
                  </el-tag>
                <el-tag type="warning" v-if="row.allocationType?.includes(3)" class="tag-with-image oneLine">
                  <img src="@/assets/images/nei.png" style="width: 0.9375rem;height: 0.9375rem;margin-right: 0.25rem;">
                  内部站</el-tag>

                <el-tag type="primary" v-if="row.allocationType?.includes(4)" class="tag-with-image oneLine">
                  <img src="@/assets/images/he.png" style="width: 0.9375rem;height: 0.9375rem;margin-right: 0.25rem;">
                  合作商</el-tag>
              </div>


            </div>

            <!-- <el-button class="tableBut" size="small" @click="viewAllocations(row, 1)" type="danger"
              v-if="row.allocationType === 1" plain>自动分配</el-button>
            <el-button class="tableBut" size="small" @click="viewAllocations(row, 2)" type="danger"
              v-else-if="row.allocationType === 2">供应商</el-button>
            <el-button class="tableBut" size="small" @click="viewAllocations(row, 3)" type="success"
              v-else-if="row.allocationType === 3">内部站</el-button>
            <el-button class="tableBut" size="small" @click="viewAllocations(row, 4)" type="primary"
              v-else-if="row.allocationType === 4">合作商</el-button>
            <el-button size="small" v-else class="tableBut"> 未分配</el-button> -->
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('originalPrice')"
          show-overflow-tooltip
          align="left"
          label="原始价"
          width="110"
        >
          <template #default="{ row }">
            <div class="flex-c">
              <div
                v-if="row.originalPrice"
                class="oneLine fontC-System"
                style="width: calc(100% - 1.25rem)"
              >
                <svg
                  v-if="row.beCurrencyType === 'USD'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                    fill="#333333"
                  />
                </svg>
                <svg
                  v-if="row.beCurrencyType === 'CNY'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="10"
                  viewBox="0 0 9 10"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                    fill="#333333"
                  />
                </svg>
                <CurrencyType v-if="!row.beCurrencyType" />{{
                  row.originalPrice.toFixed(2) || 0
                }}
              </div>
              <span v-else>-</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('doMoneyPrice')"
          show-overflow-tooltip
          align="left"
          label="项目价"
          width="110"
        >
          <template #default="{ row }">
            <div class="flex-c">
              <div
                class="oneLine fontC-System"
                style="width: calc(100% - 1.25rem)"
              >
                <svg
                  v-if="row.currencyType === 'USD'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                    fill="#333333"
                  />
                </svg>
                <svg
                  v-if="row.currencyType === 'CNY'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="10"
                  viewBox="0 0 9 10"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                    fill="#333333"
                  />
                </svg>
                <CurrencyType v-if="!row.currencyType" />{{
                  row.doMoneyPrice || 0
                }}
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
              <div
                class="oneLine fontC-System"
                style="width: calc(100% - 1.25rem)"
              >
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
                <el-tag type="primary">全球</el-tag>
              </template>
              <template v-else-if="comCountryId(row.countryIdList).length > 1">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="comCountryId(row.countryIdList).join(',')"
                  placement="top"
                >
                  <el-link type="primary"
                    ><el-tag type="primary"
                      >×{{ comCountryId(row.countryIdList).length }}</el-tag
                    ></el-link
                  >
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
          v-if="checkList.includes('remark')"
          show-overflow-tooltip
          prop="remark"
          align="left"
          width="150"
          label="备注"
          ><template #default="{ row }">
            <div class="flex-c">
              <div
                class="oneLine fontC-System"
                style="width: calc(100% - 1.25rem)"
              >
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
        <el-table-column
          v-if="checkList.includes('create')"
          prop="createTime"
          align="left"
          width="120"
          label="创建"
          show-overflow-tooltip
          ><template #default="{ row }">
            <div>
              <div class="fontC-System oneLine">{{ row.createName }}</div>
              <el-tooltip :content="row.createTime" placement="top">
                <el-tag effect="plain" type="info">{{
                  format(row.createTime)
                }}</el-tag>
              </el-tooltip>
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
            <!-- :disabled="row.projectType === 2" -->
            <el-button
              type="warning"
              plain
              size="small"
              @click="projectEdit(row)"
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
.tag-with-image {
  display: flex;          /* 使用flex布局 */
  align-items: center;    /* 垂直居中对齐 */
  justify-content: center;/* 水平居中对齐 */
  margin-right: 0.5rem;      /* 每行标签之间的间距 */
}
:deep(.tag-with-image .el-tag__content){
  display: flex;
  align-items: center;
}
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
.parameter1 {
  display: flex;
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
