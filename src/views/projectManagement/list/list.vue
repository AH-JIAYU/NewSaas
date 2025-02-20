<script setup lang="ts">
import { ElMessage } from "element-plus";
import allocationEdit from "./components/AllocationEdit/index.vue";
import ProjeckEdit from "./components/ProjeckEdit/index.vue";
import ProjectDetail from "./components/ProjectDetails/index.vue";
import ViewAllocation from "./components/ViewAllocation/index.vue";
import QuickEdit from "./components/QuickEdit/index.vue"; // 快速编辑
import scheduling from "./components/Edit/index.vue"; // 项目调度
import outsource from "@/views/projectManagement/outsource/components/Edit/index.vue"; // 项目外包
import api from "@/api/modules/projectManagement";
import apiOut from "@/api/modules/projectManagement_outsource";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; // 基础字典
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import useProjectManagementListStore from "@/store/modules/projectManagement_list"; // 项目
import useDepartmentStore from "@/store/modules/department";
import empty from "@/assets/images/empty.png";
import { useI18n } from "vue-i18n";
import apiRecord from "@/api/modules/record_callback";
import { multiply } from "lodash-es";
defineOptions({
  name: "list",
});

const departmentStore = useDepartmentStore();
// 时间
const { t } = useI18n();
const { format } = useTimeago();
const basicDictionaryStore = useBasicDictionaryStore(); // 基础字典
const customerStore = useUserCustomerStore(); // 客户
const projectManagementListStore = useProjectManagementListStore(); // 项目
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
const viewAllocationsRef = ref(); // 查看分配
const QuickEditRef = ref(); // 快速编辑
const schedulingRef = ref(); // 调度
const outsourceRef = ref(); // 外包
// 右侧工具栏配置变量
const border = ref(false);
const checkList = ref<any>([]);
const tableAutoHeight = ref(false); // 表格控件-高度自适应
// 表格控件-控制全屏
const lineHeight = ref<any>("default");
const formSearchList = ref<any>(); // 表单排序配置
const formSearchName = ref<string>("formSearch-list"); // 表单排序name
const stripe = ref(false);
const columns = ref([
  // { prop: "projectType", label: "项目类型", checked: true, sotrtable: true },
  {
    prop: "projectId",
    label: computed(() => t("project.projectId")),
    checked: true,
    sotrtable: true,
  },
  {
    prop: "name",
    label: computed(() => t("project.name")),
    checked: true,
    sotrtable: true,
  },
  {
    prop: "clientName",
    label: computed(() => t("project.customer")),
    checked: true,
    sotrtable: true,
  },
  {
    prop: "PCNL",
    label: computed(() => t("project.parameter")),
    checked: true,
    sotrtable: true,
  },
  {
    prop: "allocationType",
    label: computed(() => t("project.AssignmentType")),
    checked: true,
    sotrtable: true,
  },
  // { prop: 'originalPrice', label: '原始价', checked: true, sotrtable: true },
  {
    prop: "doMoneyPrice",
    label: computed(() => t("project.projectPrice")),
    checked: true,
    sotrtable: true,
  },
  { prop: "ir", label: "IR/NIR", checked: true, sotrtable: true },
  {
    prop: "countryIdList",
    label: computed(() => t("project.area")),
    checked: true,
    sotrtable: true,
  },
  {
    prop: "allocationStatus",
    label: computed(() => t("project.AssignmentStatus")),
    checked: true,
    sotrtable: true,
  },
  {
    prop: "isOnline",
    label: computed(() => t("project.projectStatus")),
    checked: true,
    sotrtable: true,
  },
  {
    prop: "remark",
    label: computed(() => t("project.remark")),
    checked: true,
    sotrtable: true,
  },
  {
    prop: "create",
    label: computed(() => t("project.create")),
    checked: true,
    sotrtable: true,
  },
  {
    prop: "createTime",
    label: computed(() => t("project.createTime")),
    checked: true,
    sotrtable: true,
  },
]);

const search = ref<any>({
  time: [], // 时间
  beginTime: "", // 开始时间 格式:2024-03-01 00:00:00
  endTime: "", // 	结束时间 格式:2024-03-30 23:59:59
  projectId: "", // 	项目Id
  name: "", // 	项目名称模糊匹配
  projectIdentification: "", // 	项目标识模糊查询
  clientIdList: [], // 	所属客户编号Id
  countryId: [], // 所属区域编号Id
  createName: "", // 	创建人-模糊查询
  allocation: "", // 	分配状态:1已经分配 2:未分配
  allocationStatus: [], // 	分配类型: 1:自动分配 2:供应商 3:部门
  status: 1, // 	项目状态:1在线 2:离线
  departmentProject: 1, // 1查所有2部门
  structureIdList: [],
}); // 搜索

const list = ref<any>([]);

const current = ref<any>(); // 表格当前选中
function handleCurrentChange(val: any) {
  if (val) {
    current.value = val.projectId;
  } else {
    current.value = "";
  }
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
//上架，下架
const isOnlineFn =async(type:any)=> {
  const selectList = tableSortRef.value.getSelectionRows();
    if (selectList.length === 0) {
      ElMessage.warning({
        message: t("project.projectSelect"),
        center: true,
      });
      return
    }
    //projectType为1，
    let paramsList1 = [];
    let paramsList1Id:any = [];
    let paramsList2 = [];
    let paramsList2Id:any = [];
    selectList.forEach((item:any) => {
      if(item.projectType==1){
        paramsList1.push(item);
        paramsList1Id.push(item.projectId)
      } else if(item.projectType==2){
        paramsList2.push(item)
        paramsList2Id.push(item.projectId)
      }
    })
    //在线isOnline变离线传2，离线isOnline变在线传1，
    if(paramsList1.length !=0){
      const params = {
      projectId: paramsList1Id,
      isOnline: type =='上架'?1:2,
    };
    const { status } = await submitLoading(api.changestatus(params));
    status === 1 &&
      ElMessage.success({
        message: t("project.changeSuccess"),
        center: true,
      });

    fetchData();
    }

    if(paramsList2.length !=0){
      try {
      const params = {
        type: 4, // 取消接收
        idList: paramsList2Id,
      };
      const msg =
        type=='上架'
          ? t("project.recieveSuccess")
          : t("project.cancelSuccess");
      const { status } = await apiOut.updateReceiveStatus(params);
      status === 1 &&
        ElMessage.success({
          message: msg,
          center: true,
        });
      fetchData();
    } catch (error) {}
    }





}
// 修改状态
async function changeStatus(row: any, val: any) {
  if (row.projectType === 1) {
    const params = {
      projectId: [row.projectId],
      isOnline: val,
    };
    const { status } = await submitLoading(api.changestatus(params));
    status === 1 &&
      ElMessage.success({
        message: t("project.changeSuccess"),
        center: true,
      });

    fetchData();
  } else if (row.projectType === 2) {
    try {
      const params = {
        type: 4, // 取消接收
        idList: [row.projectId],
      };
      const msg =
        row.isOnline == 1
          ? t("project.recieveSuccess")
          : t("project.cancelSuccess");
      const { status } = await apiOut.updateReceiveStatus(params);
      status === 1 &&
        ElMessage.success({
          message: msg,
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
        message: t("project.projectSelect"),
        center: true,
      });
    } else {
      ElMessage.warning({
        message: t("project.onlyOne"),
        center: true,
      });
    }
  } else if (selectList[0].isOnline === 2) {
    ElMessage.warning({
      message: t("project.OfflineUnschedulable"),
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
  if (row.allocationType === 4) {
    type = 0;
  }
  if (row.projectType === 2) {
    type = 1;
  }
  outsourceRef.value.showEdit(row, type);
}
// 查看分配
function viewAllocations(row: any) {
  const params = {
    projectId: row.projectId,
    type: row.allocationType,
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
    clientIdList: [], // 	所属客户编号Id
    countryId: "", // 所属区域编号Id
    createName: "", // 	创建人-模糊查询
    allocation: "", // 	分配状态:1已经分配 2:未分配
    allocationStatus: [], // 	分配类型: 1:自动分配 2:供应商 3:部门
    status: 1, // 	项目状态:1在线 2:离线
    departmentProject: 1, // 1查所有2部门
    structureIdList: [],
  };
  fetchData();
}
// 监听 allocationStatus 和 allocation 的变化
watch(
  () => search.value.allocationStatus,
  (newValue: any) => {
    if (newValue.length > 0) {
      // 如果 allocationStatus 有值，清空 allocation
      search.value.allocation = "";
    }
  },
);

watch(
  () => search.value.allocation,
  (newValue: any) => {
    if (newValue) {
      // 如果 allocation 有值，清空 allocationStatus
      search.value.allocationStatus = [];
    }
  },
);
const checked1 = ref<any>();
// 监听 departmentProject 和 structureIdList 的变化
// 监听 departmentProject 的变化
watch(
  () => checked1.value,
  (newValue: any) => {
    if (newValue === 1) {
      // 如果 departmentProject 为 1，清空 structureIdList
      search.value.structureIdList = [];
      // console.log(search.value.structureIdList,'监听departmentProject')
    }
  },
);

// 监听 structureIdList 的变化
watch(
  () => search.value.structureIdList,
  (newValue: any) => {
    if (newValue.length > 0) {
      // 如果 structureIdList 有值，将 departmentProject 改为 1

      checked1.value = "";
      // console.log(checked1.value,'监听structureIdList')
    }
  },
);
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
    if (checked1.value) {
      params.departmentProject = 2;
    } else {
      params.departmentProject = 1;
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
const countryList: any = ref([]); // 所有区域一维
const customerList: any = ref([]); // 客户列表
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
  getCustomer()
  fetchData();
  formSearchList.value = [
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "projectId",
      placeholder: computed(() => t("project.projectId")),
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "name",
      placeholder: computed(() => t("project.name")),
    },
    // {
    //   index: 3,
    //   show: true,
    //   type: "input",
    //   modelName: "projectIdentification",
    //   placeholder: "项目标识",
    // },
    // {
    //   index: 3,
    //   show: true,
    //   type: "input",
    //   modelName: "projectAlias",
    //   placeholder: "项目别名",
    // },
    {
      index: 4,
      show: true,
      type: "select",
      modelName: "countryId",
      placeholder: computed(() => t("project.area")),
      option: "global",
      optionLabel: "chineseName",
      optionValue: "id",
    },
    {
      index: 5,
      show: true,
      type: "select",
      modelName: "clientIdList",
      placeholder: computed(() => t("project.CustomerAbbreviation")),
      option: "clientId",
      optionLabel: "label",
      optionValue: "value",
      multiple:true,
    },
    {
      index: 6,
      show: true,
      type: "select",
      modelName: "allocationStatus",
      placeholder: computed(() => t("project.AssignmentType")),
      option: "allocationStatus",
      optionLabel: "label",
      optionValue: "value",
      multiple: true,
    },
    {
      index: 6,
      show: true,
      type: "select",
      modelName: "structureIdList",
      placeholder: computed(() => t("project.department")),
      option: "structureIdList",
      optionLabel: "name",
      optionValue: "id",
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
      placeholder: computed(() => t("project.founder")),
    },
    {
      index: 9,
      show: true,
      type: "select",
      modelName: "allocation",
      placeholder: computed(() => t("project.AssignmentStatus")),
      option: "allocation",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 11,
      show: true,
      type: "datetimerange",
      modelName: "time",
      startPlaceHolder: computed(() => t("project.CreationStartDate")),
      endPlaceHolder: computed(() => t("project.CreationEndDate")),
    },
    {
      index: 12,
      show: true,
      type: "select",
      modelName: "status",
      placeholder: computed(() => t("project.OnlineOffline")),
      option: "isOnlineType",
      optionLabel: "label",
      optionValue: "value",
    },
  ];
});
const clientIdOptions: { label: string; value: string }[] = [];
//回调记录
const  getCustomer =async()=> {
  clientIdOptions.length = 0;
  const ress = await apiRecord.getCustomerCooperation({});

if (ress.data && ress.data.getCooperationInfoLists ) {
  ress.data.getCooperationInfoLists.forEach(
    (item:any) => {
      clientIdOptions.push({
        label: item.tenantName,
        value: item.tenantId,
      });
    },
  );
}

if (ress.data && ress.data.getCustomerInfoLists ) {
  ress.data.getCustomerInfoLists.forEach(
    (item:any) => {
      clientIdOptions.push({
        label: item.customerName,
        value: item.customerId,
      });
    },
  );
}

}
const formOption = {
  clientId: () => clientIdOptions,
  allocationStatus: () => [
    { label: "供应商", value: 2 },
    { label: "内部站", value: 3 },
    { label: "合作商", value: 4 },
  ],
  structureIdList: async () => await departmentStore.getDepartment(),
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
  isOnlineType: () => [
  { label: "全部", value: 0 },
    { label: "在线", value: 1 },
    { label: "离线", value: 2 },
  ],
};

function handleChange() {
  fetchData();
}
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain class="hide-drawer-header">
      <FormSearch
        :form-search-list="formSearchList"
        :form-search-name="formSearchName"
        :model="search"
        :form-option="formOption"
        @current-change="currentChange"
        @on-reset="onReset"
      />
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel>
          <!-- v-auth="'/list-insert-addProjectBtn'" -->
          <el-button
            v-auth="'/list-get-addProject'"
            type="primary"
            size="default"
            @click="addProject"
          >
            新增项目
          </el-button>
          <el-button
            v-auth="'/list-get-addProjectDispatch'"
            type="primary"
            size="default"
            @click="dispatch"
          >
            调度
          </el-button>
          <el-button
            type="warning"
            size="default"
            @click="isOnlineFn('上架')"
          >
            上架
          </el-button>
          <el-button
            type="danger"
            size="default"
            @click="isOnlineFn('下架')"
          >
            下架
          </el-button>
          <el-checkbox
            v-model="checked1"
            style="margin-left: 12px"
            :label="t('project.QueryDepartmentList')"
            size="large"
            @change="handleChange"
          />
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
          :label="t('project.status')"
        >
          <template #default="{ row }">
            <ElSwitch
              v-model="row.isOnline"
              inline-prompt
              :active-text="t('project.Online')"
              :inactive-text="t('project.Offline')"
              :active-value="1"
              :inactive-value="2"
              @change="changeStatus(row, $event)"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectId')"
          align="left"
          :label="t('project.project')"
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
                  {{ t("project.internalAddition") }}</el-tag
                >
                <el-tag
                  v-else-if="row.projectType === 2"
                  type="warning"
                  effect="dark"
                  style="background-color: #ffac54"
                >
                  {{ t("project.partnerAllocation") }}</el-tag
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
                class="littleButton"
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
          :label="t('project.name')"
          width="200"
        >
          <template #default="{ row }">
            <div class="flex-c">
              <div style="width: calc(100% - 1.25rem)">
                <p class="tableBig" style="white-space: normal;word-wrap: break-word;overflow-wrap: break-word;">
                  <span :class="row.isB2b === 2 ? 'red' : ''">{{
                    row.name
                  }}</span>
                </p>
                <div
                  v-if="row.projectType === 1"
                  class="oneLine"
                  style="color: #333333"
                >
                  <span>{{ row.projectAlias }}</span>
                </div>
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                v-auth="'/list-update-updateProject'"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
                @click="quickEdit(row, 'name')"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('countryIdList')"
          show-overflow-tooltip
          prop="countryIdList"
          align="left"
          :label="t('project.area')"
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
                <el-tag type="primary"> 全球 </el-tag>
              </template>
              <template v-else-if="comCountryId(row.countryIdList).length > 1">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="comCountryId(row.countryIdList).join(',')"
                  placement="top"
                >
                  <el-link type="primary">
                    <el-tag type="primary">
                      ×{{ comCountryId(row.countryIdList).length }}
                    </el-tag>
                  </el-link>
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
          v-if="checkList.includes('PCNL')"
          align="left"
          :label="t('project.parameter')"
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
                  {{ t("project.participateIn2") }}:
                  {{ row.participation ? row.participation : "-" }}
                  {{ t("project.complete2") }}:
                  {{ row.complete ? row.complete : "-" }}
                  {{ t("project.quota2") }}: {{ row.num ? row.num : "-" }}
                  {{ t("project.limited2") }}:
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
                  >
                    {{ t("project.participateIn2") }}:
                    {{ row.participation || 0 }}
                  </el-text>
                  <el-text
                    style="color: rgb(3, 194, 57)"
                    class="oneLine"
                    type="success"
                  >
                    {{ t("project.complete2") }}: {{ row.complete || 0 }}
                  </el-text>
                  <el-text
                    style="color: rgb(255, 172, 84)"
                    class="oneLine"
                    type="warning"
                  >
                    {{ t("project.quota2") }}: {{ row.num || 0 }}
                  </el-text>
                  <el-text
                    style="color: rgb(170, 170, 170)"
                    class="oneLine"
                    type="info"
                  >
                    {{ t("project.limited2") }}:
                    {{ row.limitedQuantity || "-" }}
                  </el-text>
                </div>
              </el-tooltip>
              <SvgIcon
                v-if="row.projectType !== 2"
                v-auth="'/list-update-updateProject'"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
                @click="quickEdit(row, 'PCNL')"
              />
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
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
        </el-table-column> -->
        <el-table-column
          v-if="checkList.includes('doMoneyPrice')"
          show-overflow-tooltip
          align="left"
          :label="t('project.projectPrice')"
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
              <span v-else></span>
            </div>
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
                v-auth="'/list-update-updateProject'"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
                @click="quickEdit(row, 'doMoneyPrice')"
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
          width="80"
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
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
                @click="quickEdit(row, 'ir')"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="t('project.createTime')" width="200">
          <template #default="{ row }">
            <div class="flex-c">
              {{ row.createTime }}
            </div>
            <div class="flex-c">
              {{ row.updateTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('allocationType')"
          align="left"
          label="分配"
          width="180"
        >
          <template #default="{ row }">
            <el-button v-if="row.allocationStatus == 1" size="small">
              未分配
            </el-button>

            <div
              v-if="row.allocationStatus == 2"
              class="flex-c"
              style="cursor: pointer"
            >
              <div

                class="parameter1"
                @click="viewAllocations(row)"
              >
              <!-- 供应商标签  -->
               <div>
                  <el-tag
                  v-if="row.allocationType?.includes(2)"
                  type="danger"
                  class="tag-with-image oneLine"
                >
                  <img
                    src="@/assets/images/gong.png"
                    style="
                      width: 0.9375rem;
                      height: 0.9375rem;
                      margin-right: 0.25rem;
                    "
                  />
                  <span>供应商</span>
                </el-tag>
               </div>

               <div>
                 <!-- 内部站标签 -->
                <el-tag
                  v-if="row.allocationType?.includes(3)"
                  type="warning"
                  class="tag-with-image oneLine"
                >
                  <img
                    src="@/assets/images/nei.png"
                    style="
                      width: 0.9375rem;
                      height: 0.9375rem;
                      margin-right: 0.25rem;
                    "
                  />
                  内部站
                </el-tag>
               </div>

               <div>
                 <!-- 合作社标签 -->
                <el-tag
                  v-if="row.allocationType?.includes(4)"
                  type="primary"
                  class="tag-with-image oneLine"
                >
                  <img
                    src="@/assets/images/he.png"
                    style="
                      width: 0.9375rem;
                      height: 0.9375rem;
                      margin-right: 0.25rem;
                    "
                  />
                  合作商
                </el-tag>
               </div>
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
          v-if="checkList.includes('remark')"
          show-overflow-tooltip
          prop="remark"
          align="left"
          width="120"
          :label="t('project.remark')"
        >
          <template #default="{ row }">
            <div class="flex-c">
              <div
                class="oneLine fontC-System"
                style="width: calc(100% - 1.25rem)"
              >
                {{ row.remark ? row.remark : "" }}
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
                @click="quickEdit(row, 'remark')"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('clientName')"
          prop="clientName"
          show-overflow-tooltip
          align="left"
          :label="t('project.client')"
          width="140"
        >
          <template #default="{ row }">
            <div class="flex-c">
              <div class="oneLine" style="width: calc(100% - 1.25rem)">
                <b class="tableBig">{{ row.clientName.split("/")[0] }}</b>
                <div class="oneLine" style="color: #333333">
                  {{ row.chargeName }}
                </div>
              </div>
              <SvgIcon
                v-if="row.projectType !== 2"
                v-auth="'/list-update-updateProject'"
                :class="{ edit: 'edit', current: row.projectId === current }"
                name="i-ep:edit"
                color="#409eff"
                @click="quickEdit(row, 'customer')"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('create')"
          prop="create"
          align="left"
          width="120"
          :label="t('project.create')"
          show-overflow-tooltip
        >
          <template #default="{ row }">
              <div class="fontC-System oneLine">
                {{ row.createName }}
              </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          fixed="right"
          :label="t('project.operate')"
          width="230"
        >
          <template #default="{ row }">
            <el-button
              v-if="row.allocationStatus === 1"
              v-auth="'/list-get-addProjectAllocation'"
              plain
              :disabled="row.isOnline === 2"
              type="primary"
              size="small"
              @click="distribution(row)"
            >
              {{ t("project.distribution") }}
            </el-button>
            <el-button
              v-else
              v-auth="'/list-get-addProjectAllocation'"
              plain
              type="primary"
              :disabled="row.isOnline === 2"
              size="small"
              @click="reassign(row)"
            >
              {{ t("project.reallocation") }}
            </el-button>
            <!-- :disabled="row.projectType === 2" -->
            <el-button
              v-auth="'/list-update-updateProject'"
              type="warning"
              plain
              size="small"
              @click="projectEdit(row)"
            >
              {{ t("project.editor") }}
            </el-button>
            <el-button
              v-auth="'/list-get-getProject'"
              type="danger"
              size="small"
              plain
              @click="projectDetails(row)"
            >
              {{ t("project.details") }}
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
    <allocationEdit ref="addAllocationEditRef" @fetch-data="fetchData" />
    <ProjeckEdit ref="addProjeckRef" @fetch-data="fetchData" />
    <QuickEdit ref="QuickEditRef" @fetch-data="fetchData" />
    <ProjectDetail ref="projectDetailsRef" />
    <ViewAllocation ref="viewAllocationsRef" />
    <!-- 项目调度 -->
    <scheduling ref="schedulingRef" @fetch-data="fetchData" />
    <!-- 项目外包 -->
    <outsource ref="outsourceRef" />
  </div>
</template>

<style scoped lang="scss">
.tag-with-image {
  display: flex;
  /* 使用flex布局 */
  align-items: center;
  /* 垂直居中对齐 */
  justify-content: center;
  /* 水平居中对齐 */
  margin-right: 0.5rem;
  /* 每行标签之间的间距 */
}

:deep(.tag-with-image .el-tag__content) {
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
    // margin-left: 0.3125rem;
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
  flex: 1 1 100%;
  display: flex;
  align-content: center;
  flex-wrap: wrap;

  .oneLine {
    // width: 40%;
    text-align: left;
    margin: 0 0.75rem 0.5rem 0;
  }

  .oneLine:nth-of-type(n + 3) {
    margin: 0 0.75rem 0 0;
  }
  div{
    flex: 1 1 50%; /* 这将确保每个元素至少占据容器的50%宽度 */
    min-width: 50%;
    max-width: 50%;
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

.button-box {
  display: flex;
  flex-wrap: nowrap;
}
</style>
