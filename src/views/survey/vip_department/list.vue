<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import { submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/survey_vip_department";
import apiUser from "@/api/modules/survey_vip";
import empty from '@/assets/images/empty.png'
// import useDepartmentStore from "@/store/modules/department";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
// import useSurveyVipGroupStore from "@/store/modules/survey_sub_vipGroup"; // 部门
import useSurveyVipStore from "@/store/modules/survey_vip"; // 会员
import vipLevel from '@/views/survey/vipLevel/components/Edit/index.vue'
import DictionaryDialog from "./components/dictionaryDialog/index.vue";
import subsidiaryDepartment from "./components/subsidiary_department/index.vue";
import DictionaryItemDia from "./components/dictionaryItemDialog/index.vue";
import VipEdit from "../vip/components/VipEdit/index.vue";
import vipPlusMinusPayments from "../vip/components/vipPlusMinusPayments/index.vue";
// import Detail from "@/views/configuration/department/components/Detail/index.vue";
defineOptions({
  name: "vipDepartment",
});
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
interface Dict {
  id: string | number;
  label: string;
  code: string;
  children?: Dict[];
}
// 区域
const useStoreCountry = useBasicDictionaryStore();
// 区域数据
const filterCountry = ref<any>([]);
// // 部门
// const departmentStore = useDepartmentStore();
// // 部门数据
// const departmentList = ref<any>();
interface Dict {
  id: string | number;
  label: string;
  code: string;
  children?: Dict[];
}
// 状态
const activeList: any = [
  {
    label: "启用",
    value: true,
  },
  {
    label: "禁用",
    value: false,
  },
];
const defaultProps: any = {
  children: "children",
  label: "name",
  // disabled : "distribution",
};
// userRef
const userRef = ref();
// 详情ref
const detailRef = ref<any>();
// 数据
const dataForm = ref<any>({
  search: {
    chineseName: "",
  },
  tree: [] as Dict[],
  currentNode: undefined as Node | undefined,
  currentData: undefined as Dict | undefined,
  dialog: {
    visible: false,
    parentId: "" as Dict["id"],
    id: "" as Dict["id"],
  },
  row: "",
  loading: false,
});
// 重置密码数据
const resetList = ref<any>()
// tableRef
const userItemRef = ref();
// 字典下的数据
const userForm = ref<any>({
  loading: false,
  // 表格是否自适应高度
  tableAutoHeight: false,
  // 表格控件-是否展示边框
  border: false,
  // 表格控件-是否展示斑马条
  stripe: false,
  // 表格控件-控制表格大小
  lineHeight: "default",
  checkList: [],
  // 搜索
  search: {
    page: 1,
    limit: 10,
    id: "" as Dict["id"],
    userName: "",
    active: null,
    departmentId: null,
  },
  // 列表数据
  dataList: [],
  selectionDataList: [],
  row: "",
  dialog: {
    visible: false,
    id: "" as string | number,
    parentId: "",
    level: 1,
  },
});
const dictionaryRef = ref();
// 部门
const dictionary = ref({
  search: {
    name: "",
  },
  tree: [] as Dict[],
  currentNode: undefined as Node | undefined,
  currentData: undefined as Dict | undefined,
  dialog: {
    visible: false,
    parentId: "" as Dict["id"],
    id: "" as Dict["id"],
    isClick: false,
  },
  row: "",
  loading: false,
});
// 子部门
const subsidiaryDictionary = ref({
  search: {
    name: "",
  },
  tree: [] as Dict[],
  currentNode: undefined as Node | undefined,
  currentData: undefined as Dict | undefined,
  dialog: {
    visible: false,
    parentId: "" as Dict["id"],
    id: "" as Dict["id"],
    name: '',
  },
  row: "",
  loading: false,
});
// pagination.value.size = 20;
// pagination.value.sizes = [20, 50, 100];
const dictionaryItemRef = ref();
// 部门下的数据
const dictionaryItem = ref<any>({
  loading: false,
  // 搜索
  search: {
    organizationalStructureId: "" as Dict["id"],
  },
  // 列表数据
  dataList: [],
  selectionDataList: [],
  row: "",
  dialog: {
    visible: false,
    id: "" as string | number,
    parentId: "",
    level: 1,
  },
});
// 请求接口携带参数
const queryForm = reactive<any>({
  memberId: null,
  memberName: "",
  memberLevelId: "",
  memberStatus: "",
  memberGroupId: "",
  beginTime: "",
  endTime: "",
  time: [],
});
// 获取部门
async function getDictionaryList() {
  try {
    dictionary.value.loading = true;
    // dictionaryItem.value.search.organizationalStructureId = "";
    const params = {
      ...dictionary.value.search,
    };
    const res = await api.list(params);
    dictionary.value.tree = res.data;
    dictionary.value.loading = false;
  } catch (error) {

  } finally {
    dictionary.value.loading = false;
  }
}
onMounted(() => {
  getDictionaryList();
});
watch(
  () => dictionary.value.search,
  (val) => {
    dictionaryRef.value!.filter(val);
  }
);
function dictionaryFilter(value: string, data: Dict) {
  if (!value) {
    return true;
  }
  return data.label.includes(value);
}
// 新增部门
function dictionaryAdd(data?: Dict) {
  dictionary.value.currentData = data;
  dictionary.value.dialog.parentId = data?.id ?? "";
  dictionary.value.dialog.id = "";
  dictionary.value.dialog.visible = true;
}
// 新增子部门
function subsidiaryDictionaryAdd(data?: any) {
  subsidiaryDictionary.value.currentData = data;
  subsidiaryDictionary.value.dialog.parentId = data?.id ?? "";
  subsidiaryDictionary.value.dialog.name = data?.name ?? "";
  subsidiaryDictionary.value.dialog.id = "";
  subsidiaryDictionary.value.dialog.visible = true;
}
// 修改部门
function dictionaryEdit(node: Node, data: Dict) {
  dictionary.value.currentNode = node;
  dictionary.value.currentData = data;
  dictionary.value.row = JSON.stringify(data);
  dictionary.value.dialog.parentId = node.parent.data.id ?? "";
  dictionary.value.dialog.id = data.id;
  dictionary.value.dialog.visible = true;
  if (dictionaryItem.value.search.organizationalStructureId) {
    dictionary.value.dialog.isClick = true;
  }
}
// 删除部门
function dictionaryDelete(node: Node, data: any) {
  ElMessageBox.confirm(`确认删除「${data.name}」吗？`, "确认信息").then(
    () => {
      api.delete({ id: data.id }).then(() => {
        ElMessage.success({
          message: "删除成功",
          center: true,
        });
        getDictionaryList()
      });
    }
  );
}

// 部门项详情
function dictionaryClick(data: any) {
  pagination.value.page = 1;
  if (data.id) {
    userForm.value.dialog.parentId = data.id
  }
  dictionaryItem.value.search.organizationalStructureId = data.id;
}
// 监听id变化
watch(
  () => dictionaryItem.value.search.organizationalStructureId,
  () => {
    getDictionaryItemList();
  }
);
// 获取部门项
async function getDictionaryItemList() {
  try {
    listLoading.value = true;
    const params = {
      ...dictionaryItem.value.search,
    };
    const res = await api.itemlist(params);
    if (res.data) {
      listLoading.value = false;
      data.list = res.data;
      dictionaryItem.value.dataList.forEach((item: any) => {
        item.enableLoading = false;
      });
      pagination.value.total = res.data.length || 0;
    }
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}

const surveyVipStore = useSurveyVipStore(); // 会员
// 时间
const { format } = useTimeago();
const listLoading = ref(false);
const data = reactive<any>({
  list: [], // 列表
  vipGroupList: [], // 部门
});
// 编辑等级
const subVipLevelRef = ref<any>()
const selectRows = ref<any>(); // 表格-选中行
const editRef = ref(); // 添加|编辑 组件ref
const vipPlusMinusPaymentsRef = ref(); //加减款
const border = ref<any>(false); // 表格控件-是否展示边框
const stripe = ref<any>(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const checkList = ref<any>([]); // 表格-展示的列
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const formSearchList = ref<any>()//表单排序配置
const formSearchName = ref<string>('formSearch-sub_vip')// 表单排序name
// 表格控件-展示列
const columns = ref<any>([
  { prop: "memberStatus", label: "会员状态", checked: true, sprtable: true },
  { prop: "randomStatus", label: "随机身份", checked: true, sprtable: true },
  { prop: "memberId", label: "会员ID", checked: true, sprtable: true },
  {
    prop: "memberChildNickname",
    label: "会员名称",
    checked: true,
    sprtable: true,
  },
  {
    prop: "memberChildName",
    label: "会员姓名",
    checked: true,
    sprtable: true,
  },
  {
    prop: "memberLevelName",
    label: "会员等级",
    checked: true,
    sprtable: true,
  },
  {
    prop: "memberGroupChildName",
    label: "部门",
    checked: true,
    sprtable: true,
  },
  { prop: "B2B|B2C", label: "B2B|B2C", checked: true, sprtable: true },
  { label: "可用余额", checked: true, sortable: true, prop: "availableBalance" },
  {
    label: "待审金额",
    checked: true,
    sortable: true,
    prop: "pendingBalance",
  },
  { prop: "createName", label: "创建人", checked: true, sprtable: true },
  { prop: "createTime", label: "创建日期", checked: true, sprtable: true },
]);

// 添加
function handleAdd(row: any) {
  editRef.value.showEdit(null, dictionaryItem.value.search.organizationalStructureId);
}
// 编辑
function handleEdit(row: any) {
  editRef.value.showEdit(row, dictionaryItem.value.search.organizationalStructureId);
}
// 加减款
const plusMinusPayments = (row: any) => {
  vipPlusMinusPaymentsRef.value.showEdit(JSON.stringify(row));
};
// 会员等级
const editLevel = (row: any) => {
  subVipLevelRef.value.showEdit(row);
}
// 切换状态
async function changeState(state: any, id: string) {
  const params = {
    memberId: id,
    memberStatus: state,
  };
  const { status } = await submitLoading(apiUser.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  // 数据改变 在部门中需要重新请求
  surveyVipStore.NickNameList = null;
  getDictionaryItemList();
}
//切换供应商
async function editBC(row: any, name: any, state: any) {
   let b2bStatus = row.b2bStatus;
  let b2cStatus = row.b2cStatus;
  if (name == "b2b") {
    b2bStatus = state ==1 ? 2:1;
  }

  if (name == "b2c") {
    b2cStatus = state==1 ? 2:1;
  }

  const params = {
    memberId: row.memberId,
    b2bStatus:b2bStatus,
    b2cStatus:b2cStatus,
  };
  const { status } = await submitLoading(apiUser.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  // 数据改变 在部门中需要重新请求
  surveyVipStore.NickNameList = null;
  getDictionaryItemList();
}
// 随机身份
const changeRandomState = async (state: any, id: string) => {
  const params = {
    memberId: id,
    randomStatus: state,
  };
  const { status } = await submitLoading(apiUser.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  // 数据改变 在部门中需要重新请求
  surveyVipStore.NickNameList = null;
  getDictionaryItemList();
}
// 重置请求
function queryData() {
  pagination.value.page = 1;
  fetchData();
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
  const res = await apiUser.list(params);
  data.list = res.data.getMemberInfoList;
  pagination.value.total = res.data.total;
  listLoading.value = false;
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    memberId: null,
    memberName: "",
    memberLevelId: "",
    memberStatus: "",
    memberGroupId: "",
    beginTime: "",
    endTime: "",
    time: [],
  });
  getDictionaryItemList();
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
  // fetchData();
  // data.vipGroupList = await surveyVipGroupStore.getGroupNameList();
  formSearchList.value = [
    { index: 1, show: true, type: 'input', modelName: 'memberId', placeholder: '会员ID' },
    { index: 2, show: true, type: 'input', modelName: 'memberName', placeholder: '会员名称' },
    { index: 4, show: true, type: 'select', modelName: 'memberStatus', placeholder: '会员状态', option: 'memberStatus', optionLabel: 'label', optionValue: 'value' },
  ]
});
const formOption = {
  memberLevelId: () => data.vipLevelList,
  memberStatus: () => [{ label: '关闭', value: 1 }, { label: '开启', value: 2 }],
  memberGroupId: () => data.vipGroupList,
}
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.memberId;
  else current.value = "";
}
</script>

<template>
  <div class="absolute-container">
    <div class="page-main">
      <LayoutContainer hide-left-side-toggle>
        <template #leftSide>
          <ElButtonGroup class="btns">
            <ElButton type="primary" class="add" @click="dictionaryAdd()">
              新增部门
            </ElButton>
          </ElButtonGroup>
          <ElInput v-model="dictionary.search.name" placeholder="请输入关键词筛选" clearable class="search"
            @keydown.enter="getDictionaryList">
            <template #append>
              <ElButton @click="getDictionaryList">
                <SvgIcon name="i-ep:search" />
              </ElButton>
            </template>
          </ElInput>
          <ElScrollbar class="tree">
            <ElTree ref="dictionaryRef" v-loading="dictionary.loading" :data="dictionary.tree"
              :filter-node-method="dictionaryFilter as any" default-expand-all @node-click="dictionaryClick">
              <template #default="{ node, data }">
                <div class="custom-tree-node">
                  <div class="label" :title="node.label">
                    {{ data.name }}
                  </div>
                  <div class="code">
                    {{ data?.organizationalStructurePersonList?.map((item: any) => item.userName).join('，') }}
                  </div>
                  <div class="actions">
                    <ElButtonGroup>
                      <ElButton type="primary" plain size="default" @click.stop="subsidiaryDictionaryAdd(data)">
                        <template #icon>
                          <SvgIcon name="i-ep:plus" />
                        </template>
                      </ElButton>
                      <ElButton type="info" plain size="default" @click.stop="dictionaryEdit(node, data)">
                        <template #icon>
                          <SvgIcon name="i-ep:edit" />
                        </template>
                      </ElButton>
                      <ElButton type="danger" plain size="default" @click.stop="dictionaryDelete(node, data)">
                        <template #icon>
                          <SvgIcon name="i-ep:delete" />
                        </template>
                      </ElButton>
                    </ElButtonGroup>
                  </div>
                </div>
              </template>
            </ElTree>
          </ElScrollbar>
        </template>
        <div v-show="dictionaryItem.search.organizationalStructureId" class="dictionary-containers">
          <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange"
            @onReset="onReset" :model="queryForm" :formOption="formOption" />
          <ElDivider border-style="dashed" />
          <el-row style="margin:0;">
            <FormLeftPanel>
              <el-button type="primary" size="default" @click="handleAdd">
                新增
              </el-button>
            </FormLeftPanel>
            <FormRightPanel>
              <el-button size="default"> 导出 </el-button>
              <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight"
                v-model:checkList="checkList" v-model:columns="columns" v-model:line-height="lineHeight"
                v-model:stripe="stripe" style="margin-left: 12px" @query-data="queryData" />
            </FormRightPanel>
          </el-row>
          <el-table v-loading="listLoading" :border="border" :data="data.list" :size="lineHeight" :stripe="stripe"
            @selection-change="setSelectRows"     @current-change="handleCurrentChange"     highlight-current-row>
            <el-table-column type="selection" align="left" />
            <el-table-column v-if="checkList.includes('memberStatus')" align="left" show-overflow-tooltip label="会员状态" width="84">
              <template #default="{ row }">
                <ElSwitch v-if="row.memberStatus === 3" v-model="row.memberStatus" inline-prompt :inactive-value="3"
                  :active-value="2" inactive-text="启用" active-text="待审核" @change="changeState($event, row.memberId)" />
                <ElSwitch v-else v-model="row.memberStatus" inline-prompt :inactive-value="1" :active-value="2"
                  inactive-text="禁用" active-text="启用" @change="changeState($event, row.memberId)" />
              </template>
            </el-table-column>
            <el-table-column align="left" v-if="checkList.includes('randomStatus')" show-overflow-tooltip label="随机身份" width="84">
              <template #default="{ row }">
                <ElSwitch v-model="row.randomStatus" inline-prompt :inactive-value="1" :active-value="2"
                  inactive-text="禁用" active-text="启用" @change="changeRandomState($event, row.memberId)" />
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('memberId')" align="left" prop="memberId" show-overflow-tooltip
              width="200" label="会员ID"><template #default="{ row }">
                <p class="crudeTop"></p>
                <div class="hoverSvg">
                  <p class="fineSize">{{ row.memberId }}</p>
                  <copy
                :content="row.memberId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.memberId === current,
                }"
              />

                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('memberChildNickname')" width="120" align="left"
              prop="memberNickname" show-overflow-tooltip label="会员名称">
              <template #default="{ row }">
                <p class="crudeTop tableBig">{{ row.memberNickname ? row.memberNickname : '-' }}</p>
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('memberChildName')" width="120" align="left"
              prop="memberChildName" show-overflow-tooltip label="会员姓名"><template #default="{ row }">
                <p class="crudeTop tableBig">{{ row.memberChildName ? row.memberChildName : "-" }}</p>
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('memberLevelName')" width="120" align="left"
              prop="memberLevelName" show-overflow-tooltip label="会员等级">
              <template #default="{ row }">
                <div v-if="row.memberLevelName" class="editSvg">
                  <p class="edit fontC-System">{{ row.memberLevelName ? row.memberLevelName : "-" }}</p>
                  <span>
                    <svg @click="editLevel(row)" class="svgEdit" xmlns="http://www.w3.org/2000/svg" width="12"
                      height="12" viewBox="0 0 12 12" fill="none">
                      <g id="Frame">
                        <path id="Vector"
                          d="M10.2466 6.00009C10.0479 6.00009 9.88662 6.16137 9.88662 6.36009V9.38409C9.88662 9.66201 9.66054 9.88809 9.38262 9.88809H2.61462C2.3367 9.88809 2.11062 9.66201 2.11062 9.38409V2.61609C2.11062 2.33817 2.3367 2.11209 2.61462 2.11209H5.63862C5.83734 2.11209 5.99862 1.95081 5.99862 1.75209C5.99862 1.55337 5.83734 1.39209 5.63862 1.39209H2.61462C1.93998 1.39209 1.39062 1.94145 1.39062 2.61609V9.38409C1.39062 10.0587 1.93998 10.6081 2.61462 10.6081H9.38262C10.0573 10.6081 10.6066 10.0587 10.6066 9.38409V6.36009C10.6066 6.16137 10.4453 6.00009 10.2466 6.00009Z"
                          fill="#409EFF" />
                        <path id="Vector_2"
                          d="M5.51156 6.487C5.58212 6.55756 5.67428 6.59212 5.76644 6.59212C5.8586 6.59212 5.95076 6.55684 6.02132 6.487L10.5019 2.00644C10.5693 1.93891 10.6072 1.84737 10.6072 1.75192C10.6072 1.65648 10.5693 1.56494 10.5019 1.4974C10.4343 1.42997 10.3428 1.39209 10.2474 1.39209C10.1519 1.39209 10.0604 1.42997 9.99284 1.4974L5.51156 5.97796C5.44413 6.0455 5.40625 6.13704 5.40625 6.23248C5.40625 6.32793 5.44413 6.41947 5.51156 6.487Z"
                          fill="#409EFF" />
                      </g>
                    </svg>
                  </span>
                </div>
                <el-text v-else>-</el-text>
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('memberGroupChildName')" align="left" prop="memberGroupName"
              show-overflow-tooltip label="部门"  width="120"><template #default="{ row }">
                <p class="crudeTop">{{ row.memberGroupName ? row.memberGroupName : "-" }}</p>
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('B2B|B2C')" width="120" align="left" show-overflow-tooltip
              label="B2B/B2C" >
              <template #default="{ row }">
                <div class="isB2b" style="cursor: pointer;">
                  <el-text v-if="row.b2bStatus && row.b2bStatus === 2" class="mx-1 c-fx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none" @click="editBC(row, 'b2b', 2)">
                      <g id="Frame" clip-path="url(#clip0_450_45359)">
                        <path id="Vector"
                          d="M13.6223 13.2878H1.375C1.28477 13.2878 1.21094 13.214 1.21094 13.1237V0.876465C1.21094 0.78623 1.28477 0.712402 1.375 0.712402H13.6236C13.7139 0.712402 13.7877 0.78623 13.7877 0.876465V13.1251C13.7863 13.2153 13.7139 13.2878 13.6223 13.2878Z"
                          fill="#409EFF" />
                        <path id="Vector_2"
                          d="M12.3645 14H2.63555C1.4584 14 0.5 13.0416 0.5 11.8645V2.13555C0.5 0.958398 1.4584 0 2.63555 0H12.3645C13.5416 0 14.5 0.958398 14.5 2.13555V11.8645C14.5 13.0416 13.5416 14 12.3645 14ZM2.63555 1.42324C2.24316 1.42324 1.92324 1.74316 1.92324 2.13555V11.8645C1.92324 12.2568 2.24316 12.5768 2.63555 12.5768H12.3645C12.7568 12.5768 13.0768 12.2568 13.0768 11.8645V2.13555C13.0768 1.74316 12.7568 1.42324 12.3645 1.42324H2.63555Z"
                          fill="#409EFF" />
                        <path id="Vector_3"
                          d="M6.24753 11.0141C6.10124 11.0141 5.95359 10.969 5.82781 10.8774L2.39343 8.36725C2.07624 8.13483 2.00652 7.69049 2.23894 7.37194C2.47136 7.05475 2.91706 6.98502 3.23425 7.21744L6.14909 9.34752L11.663 3.22116C11.9255 2.92858 12.3766 2.90533 12.6678 3.16784C12.9591 3.43034 12.9837 3.88151 12.7212 4.17272L6.778 10.7762C6.63718 10.9335 6.44304 11.0141 6.24753 11.0141Z"
                          fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_450_45359">
                          <rect width="14" height="14" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </el-text>
                  <el-text v-else class="mx-1 c-fx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none" @click="editBC(row, 'b2b', 1)">
                      <g id="Frame" clip-path="url(#clip0_450_45352)">
                        <path id="Vector"
                          d="M13.6223 13.1901H1.375C1.3387 13.1901 1.30859 13.16 1.30859 13.1237V0.876465C1.30859 0.840165 1.3387 0.810059 1.375 0.810059H13.6236C13.6599 0.810059 13.69 0.840164 13.69 0.876465V13.1242C13.6892 13.1611 13.66 13.1901 13.6223 13.1901Z"
                          stroke="#409EFF" stroke-width="0.195312" />
                        <path id="Vector_2"
                          d="M12.3645 14H2.63555C1.4584 14 0.5 13.0416 0.5 11.8645V2.13555C0.5 0.958398 1.4584 0 2.63555 0H12.3645C13.5416 0 14.5 0.958398 14.5 2.13555V11.8645C14.5 13.0416 13.5416 14 12.3645 14ZM2.63555 1.42324C2.24316 1.42324 1.92324 1.74316 1.92324 2.13555V11.8645C1.92324 12.2568 2.24316 12.5768 2.63555 12.5768H12.3645C12.7568 12.5768 13.0768 12.2568 13.0768 11.8645V2.13555C13.0768 1.74316 12.7568 1.42324 12.3645 1.42324H2.63555Z"
                          fill="#DCDCDC" />
                        <g id="Group 18190">
                          <path id="Vector_3" d="M5 5L10 10" stroke="#DCDCDC" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path id="Vector_4" d="M5 10L10 5" stroke="#DCDCDC" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_450_45352">
                          <rect width="14" height="14" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </el-text>
                  /
                  <el-text v-if="row.b2cStatus && row.b2cStatus === 2" class="mx-1 c-fx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none" @click="editBC(row, 'b2c', 2)">
                      <g id="Frame" clip-path="url(#clip0_450_45359)">
                        <path id="Vector"
                          d="M13.6223 13.2878H1.375C1.28477 13.2878 1.21094 13.214 1.21094 13.1237V0.876465C1.21094 0.78623 1.28477 0.712402 1.375 0.712402H13.6236C13.7139 0.712402 13.7877 0.78623 13.7877 0.876465V13.1251C13.7863 13.2153 13.7139 13.2878 13.6223 13.2878Z"
                          fill="#409EFF" />
                        <path id="Vector_2"
                          d="M12.3645 14H2.63555C1.4584 14 0.5 13.0416 0.5 11.8645V2.13555C0.5 0.958398 1.4584 0 2.63555 0H12.3645C13.5416 0 14.5 0.958398 14.5 2.13555V11.8645C14.5 13.0416 13.5416 14 12.3645 14ZM2.63555 1.42324C2.24316 1.42324 1.92324 1.74316 1.92324 2.13555V11.8645C1.92324 12.2568 2.24316 12.5768 2.63555 12.5768H12.3645C12.7568 12.5768 13.0768 12.2568 13.0768 11.8645V2.13555C13.0768 1.74316 12.7568 1.42324 12.3645 1.42324H2.63555Z"
                          fill="#409EFF" />
                        <path id="Vector_3"
                          d="M6.24753 11.0141C6.10124 11.0141 5.95359 10.969 5.82781 10.8774L2.39343 8.36725C2.07624 8.13483 2.00652 7.69049 2.23894 7.37194C2.47136 7.05475 2.91706 6.98502 3.23425 7.21744L6.14909 9.34752L11.663 3.22116C11.9255 2.92858 12.3766 2.90533 12.6678 3.16784C12.9591 3.43034 12.9837 3.88151 12.7212 4.17272L6.778 10.7762C6.63718 10.9335 6.44304 11.0141 6.24753 11.0141Z"
                          fill="white" />
                      </g>
                      <defs>
                        <clipPath id="clip0_450_45359">
                          <rect width="14" height="14" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </el-text>
                  <el-text v-else class="mx-1 c-fx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none" @click="editBC(row, 'b2c', 1)">
                      <g id="Frame" clip-path="url(#clip0_450_45352)">
                        <path id="Vector"
                          d="M13.6223 13.1901H1.375C1.3387 13.1901 1.30859 13.16 1.30859 13.1237V0.876465C1.30859 0.840165 1.3387 0.810059 1.375 0.810059H13.6236C13.6599 0.810059 13.69 0.840164 13.69 0.876465V13.1242C13.6892 13.1611 13.66 13.1901 13.6223 13.1901Z"
                          stroke="#409EFF" stroke-width="0.195312" />
                        <path id="Vector_2"
                          d="M12.3645 14H2.63555C1.4584 14 0.5 13.0416 0.5 11.8645V2.13555C0.5 0.958398 1.4584 0 2.63555 0H12.3645C13.5416 0 14.5 0.958398 14.5 2.13555V11.8645C14.5 13.0416 13.5416 14 12.3645 14ZM2.63555 1.42324C2.24316 1.42324 1.92324 1.74316 1.92324 2.13555V11.8645C1.92324 12.2568 2.24316 12.5768 2.63555 12.5768H12.3645C12.7568 12.5768 13.0768 12.2568 13.0768 11.8645V2.13555C13.0768 1.74316 12.7568 1.42324 12.3645 1.42324H2.63555Z"
                          fill="#DCDCDC" />
                        <g id="Group 18190">
                          <path id="Vector_3" d="M5 5L10 10" stroke="#DCDCDC" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path id="Vector_4" d="M5 10L10 5" stroke="#DCDCDC" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_450_45352">
                          <rect width="14" height="14" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </el-text>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('availableBalance')" align="left" prop="availableBalance"
              show-overflow-tooltip label="可用余额"  width="110">
              <template #default="{ row }">
                <p class="crudeTop">
                  <CurrencyType />{{ row.availableBalance || 0 }}
                </p>
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('pendingBalance')" align="left" prop="pendingBalance"
              show-overflow-tooltip label="待审金额">
              <template #default="{ row }">
                <p class="crudeTop">
                  <CurrencyType />{{ row.pendingBalance || 0 }}
                </p>
              </template></el-table-column>
            <el-table-column v-if="checkList.includes('createName')" align="left" prop="createName"
              show-overflow-tooltip label="创建人"><template #default="{ row }">
                <p class="crudeTop">
                  {{ row.createName ? row.createName : "-" }}
                </p>
              </template>
            </el-table-column>
            <el-table-column v-if="checkList.includes('createTime')" width="100" align="left" prop="createTime"
              show-overflow-tooltip label="创建时间">
              <template #default="{ row }">
                <el-tooltip :content="row.createTime" placement="top">
                  <el-tag effect="plain" type="info">{{ format(row.createTime) }}</el-tag>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="left" label="操作" fixed="right" show-overflow-tooltip width="180">
              <template #default="{ row }">
                <el-button size="small" plain type="primary" @click="plusMinusPayments(row)">
                  加减款
                </el-button>
                <el-button size="small" plain type="warning" @click="handleEdit(row)">
                  编辑
                </el-button>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty :image="empty" :image-size="300" />
            </template>
          </el-table>
          <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
            :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
            background @size-change="sizeChange" @current-change="currentChange" />
        </div>
        <div v-show="!dictionaryItem.search.organizationalStructureId" class="dictionary-container">
          <div class="empty">请在左侧新增或选择一个部门</div>
        </div>
      </LayoutContainer>
      <DictionaryDialog v-if="dictionary.dialog.visible" :id="dictionary.dialog.id" v-model="dictionary.dialog.visible"
        :row="dictionary.row" :parent-id="dictionary.dialog.parentId" :tree="dictionary.tree"
        :isClick="dictionary.dialog.isClick" @get-list="getDictionaryList" @get-Itmelist="getDictionaryItemList" />
      <subsidiaryDepartment v-if="subsidiaryDictionary.dialog.visible" :id="subsidiaryDictionary.dialog.id"
        v-model="subsidiaryDictionary.dialog.visible" :row="subsidiaryDictionary.row"
        :parent-id="subsidiaryDictionary.dialog.parentId" :name="subsidiaryDictionary.dialog.name"
        :tree="subsidiaryDictionary.tree" @get-list="getDictionaryList" />
      <DictionaryItemDia v-if="dictionaryItem.dialog.visible" :id="dictionaryItem.dialog.id"
        v-model="dictionaryItem.dialog.visible" :catalogue-id="dictionaryItem.search.organizationalStructureId"
        :parent-id="dictionaryItem.dialog.parentId" :level="dictionaryItem.dialog.level" :tree="dictionary.tree"
        :dataList="dictionaryItem.dataList" :row="dictionaryItem.row" @success="queryData" />
      <Detail ref="detailRef" />
      <VipEdit ref="editRef" @fetch-data="queryData" @get-list="getDictionaryList"
        @get-Itemlist="getDictionaryItemList" />
      <vipPlusMinusPayments ref="vipPlusMinusPaymentsRef" @fetch-data="queryData" />
      <vipLevel ref="subVipLevelRef" @query-data="queryData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rowCopy {
  width: 20px;
  display: none;
}
.current {
    display: block !important;
  }
.el-table__row:hover .rowCopy {
  display: block;
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
    // 让 page-main 的高度自适应
    flex: 1;
    overflow: auto;

    .flex-container {
      position: static;
    }
  }
}

.flex-container {
  :deep(.left-side) {
    display: flex;
    flex-direction: column;
    height: 100%;

    .btns {
      display: inline-flex;
      width: 100%;

      .add {
        width: 100%;
      }
    }

    .search {
      margin: 15px 0;
    }

    .tree {
      flex: 1;
      overflow-y: auto;

      .el-tree {
        .el-tree-node__content {
          height: 60px;
        }

        .is-current>.el-tree-node__content {
          background-color: var(--el-color-primary-light-9);
        }

        .custom-tree-node {
          position: relative;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          width: 0;
          height: 100%;

          .label {
            width: calc(100% - 10px);
            color: var(--el-text-color-primary);

            @include text-overflow;
          }

          .code {
            width: calc(100% - 10px);
            //color: var(--el-text-color-placeholder);
            color: #ffb05b;
            @include text-overflow;
          }

          &:hover {
            .actions {
              display: block;
            }
          }

          .actions {
            position: absolute;
            top: 50%;
            right: 10px;
            display: none;
            transform: translateY(-50%);

            .el-button {
              padding: 5px 8px;
            }
          }
        }
      }
    }
  }

  :deep(.main) {
    display: flex;
    justify-content: center;
  }

  .dictionary-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;

    .empty {
      font-size: 32px;
      color: var(--el-text-color-placeholder);
      text-align: center;
    }

    .el-table {
      margin: 15px 0;
    }
  }

  .dictionary-containers {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;

    .empty {
      font-size: 32px;
      color: var(--el-text-color-placeholder);
      text-align: center;
    }

    .el-table {
      margin: 15px 0;
    }
  }
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

.hoverSvg {
  display: flex;
  align-items: center;
}

.copy {
  display: flex;
  align-items: center;
  width: 25px;
}

.fineSize {
  color: #333;
  font-size: .875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.crudeTop {
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.isB2b {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.c-fx {
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit {
  text-align: center !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.editSvg {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .125rem;
  }
}

.svgEdit {
  display: none;
  width: .875rem;
  height: .875rem;
  margin-left: .3125rem;
}

.editSvg:hover .svgEdit {
  display: block;
}
</style>
