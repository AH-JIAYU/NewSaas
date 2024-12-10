<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import VipEdit from "./components/VipEdit/index.vue";
import vipPlusMinusPayments from "./components/vipPlusMinusPayments/index.vue";
import { submitLoading } from "@/utils/apiLoading";
import api from "@/api/modules/survey_vip";
import useSurveyVipLevelStore from "@/store/modules/survey_vipLevel"; //会员等级
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //部门
import useSurveyVipStore from "@/store/modules/survey_vip"; // 会员
import empty from '@/assets/images/empty.png'
import vipLevel from './components/Edit/index.vue'

defineOptions({
  name: "vip",
});
const surveyVipLevelStore = useSurveyVipLevelStore(); //会员等级
const surveyVipGroupStore = useSurveyVipGroupStore(); //部门
const surveyVipStore = useSurveyVipStore(); // 会员
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
// 时间
const { format } = useTimeago();
const listLoading = ref(false);
const data = reactive<any>({
  list: [], // 列表
  vipLevelList: [], //会员等级
  vipGroupList: [], // 部门
});
// 编辑等级
const vipLevelRef = ref<any>()
const selectRows = ref<any>(); // 表格-选中行
const editRef = ref(); // 新增|编辑 组件ref
const vipPlusMinusPaymentsRef = ref(); //加减款
const border = ref<any>(false); // 表格控件-是否展示边框
const stripe = ref<any>(false); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const tableAutoHeight = ref(false); // 表格控件-高度自适应

const formSearchList = ref<any>()//表单排序配置
const formSearchName=ref<string>('formSearch-vip')// 表单排序name
// 表格控件-展示列
const columns = ref<Array<Object>>([
  { prop: "memberStatus", label: "会员状态", checked: true, sprtable: true },
  { prop: "randomStatus", label: "随机身份", checked: true, sprtable: true },
  { prop: "memberId", label: "会员ID", checked: true, sprtable: true },
  {
    prop: "memberNickname",
    label: "会员名称",
    checked: true,
    sprtable: true,
  },
  { label: "会员姓名", checked: true, sortable: true, prop: "memberName" },
  {
    prop: "memberLevelName",
    label: "会员等级",
    checked: true,
    sprtable: true,
  },
  { prop: "memberGroupName", label: "部门", checked: true, sprtable: true },
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

// 新增
function handleAdd() {
  editRef.value.showEdit();
}
// 编辑
function handleEdit(row: any) {
  editRef.value.showEdit(row);
}
// 会员等级
const editLevel = (row: any) => {
  vipLevelRef.value.showEdit(row);
}
// 加减款
const plusMinusPayments = (row: any) => {
  vipPlusMinusPaymentsRef.value.showEdit(JSON.stringify(row));
};
// 切换状态
async function changeState(state: any, id: string) {
  const params = {
    memberId: id,
    memberStatus: state,
  };
  const { status } = await submitLoading(api.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  // 数据改变 在部门中需要重新请求
  surveyVipStore.NickNameList = null;
  queryData();
}

//切换供应商
async function editBC(row: any, name: any, state: any) {
  let b2bStatus = row.b2bStatus;
  let b2cStatus = row.b2cStatus;
  if (name == "b2b") {
    b2bStatus = state ==1 ? 2:1;
    // b2cStatus = b2bStatus ==1 ?2 :1;
  }

  if (name == "b2c") {
    b2cStatus = state==1 ? 2:1;
    // b2bStatus = b2cStatus ==1 ?2 :1;
  }

  const params = {
    memberId: row.memberId,
    b2bStatus:b2bStatus,
    b2cStatus:b2cStatus,
  };
  const { status } = await submitLoading(api.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  // 数据改变 在部门中需要重新请求
  surveyVipStore.NickNameList = null;
  queryData();
}



// 随机身份
const changeRandomState = async (state: any, id: string) => {
  const params = {
    memberId: id,
    randomStatus: state,
  };
  const { status } = await submitLoading(api.changestatus(params));
  status === 1 &&
    ElMessage.success({
      message: "修改成功",
    });
  // 数据改变 在部门中需要重新请求
  surveyVipStore.NickNameList = null;
  queryData();
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
    delete params.time
    const res = await api.list(params);
    data.list = res.data.getMemberInfoList;
    pagination.value.total = res.data.total;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
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
  queryData();
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
  fetchData();
  data.vipLevelList = await surveyVipLevelStore.getLevelNameList();
  data.vipGroupList = await surveyVipGroupStore.getGroupNameList();

  formSearchList.value =[
  { index: 1, show: true, type: 'input', modelName: 'memberId', placeholder: '会员ID' },
  { index: 2, show: true, type: 'input', modelName: 'memberName', placeholder: '会员名称' },
  { index: 3, show: true, type: 'select', modelName: 'memberLevelId', placeholder: '会员等级', option: 'memberLevelId', optionLabel: 'levelNameOrAdditionRatio', optionValue: 'memberLevelId' },
  { index: 4, show: true, type: 'select', modelName: 'memberStatus', placeholder: '会员状态', option: 'memberStatus', optionLabel: 'label', optionValue: 'value' },
  { index: 5, show: true, type: 'select', modelName: 'memberGroupId', placeholder: '所属部门', option: 'memberGroupId', optionLabel: 'memberGroupName', optionValue: 'memberGroupId' },
  { index: 6, show: true, type: 'datetimerange', modelName: 'time', startPlaceHolder: '创建开始日期', endPlaceHolder: '创建结束日期' }
]
});
const formOption={
  memberLevelId:()=> data.vipLevelList,
  memberStatus:()=>[{ label: '关闭', value: 1 }, { label: '开启', value: 2 }],
  memberGroupId:()=>data.vipGroupList,
}
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.memberId;
  else current.value = "";
}
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="queryForm"  :formOption="formOption"/>
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
      <el-table v-loading="listLoading" :border="border" :data="data.list" :size="lineHeight" :stripe="stripe"
        @selection-change="setSelectRows" @current-change="handleCurrentChange"    highlight-current-row>
        <!-- <el-table-column align="left" type="selection" /> -->
        <el-table-column align="left" v-if="checkList.includes('memberStatus')" show-overflow-tooltip label="会员状态" width="84">
          <template #default="{ row }">
            <ElSwitch v-if="row.memberStatus === 3" v-model="row.memberStatus" inline-prompt :inactive-value="3"
              :active-value="2" inactive-text="待审核" active-text="启用" @change="changeState($event, row.memberId)" />
            <ElSwitch v-else v-model="row.memberStatus" inline-prompt :inactive-value="1" :active-value="2"
              inactive-text="禁用" active-text="启用" @change="changeState($event, row.memberId)" />
          </template>
        </el-table-column>
        <el-table-column align="left" v-if="checkList.includes('randomStatus')" show-overflow-tooltip label="随机身份" width="84">
          <template #default="{ row }">
            <ElSwitch v-model="row.randomStatus" inline-prompt :inactive-value="1" :active-value="2" inactive-text="禁用"
              active-text="启用" @change="changeRandomState($event, row.memberId)" />
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberId')" align="left" prop="memberId" width="200"
          show-overflow-tooltip label="会员ID">
          <template #default="{ row }">
            <div v-if="row.memberId" class="hoverSvg">
              <p class="fineBom">{{ row.memberId }}</p>
              <span class="c-fx">
                <copy
                :content="row.memberId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.memberId === current,
                }"
              />
                <!-- <copy class="copy" :content="row.memberId" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberNickname')" align="left" prop="memberNickname"
          show-overflow-tooltip label="会员名称" >


          <template #default="{ row }">
            <div style="display: flex; align-items: center">
              <svg xmlns="http://www.w3.org/2000/svg" v-if="row.enableChargePerson === 1" style="margin-top: 2px; margin-right: 7px;" width="20" height="20" viewBox="0 0 20 20" fill="none">
<g id="Group 18384">
<circle id="Ellipse 105" cx="10" cy="10" r="10" fill="#F8BB4F"/>
<path id="ç®¡" d="M13.9946 9.3605V12.1892H7.43481V12.9031H14.6277V16.4995H13.3481V16.0146H7.43481V16.486H6.15517V9.3605H13.9946ZM7.43481 14.8831H13.3481V13.9133H7.43481V14.8831ZM7.43481 11.1655H12.7419V10.3842H7.43481V11.1655ZM15.8534 7.67677V10.2495H14.6008V8.75436H5.52209V10.2495H4.2694V7.67677H9.48222C9.37446 7.40738 9.25323 7.16492 9.13201 6.9494L10.2635 6.76083L10.0345 6.61266C10.6541 5.80447 11.1121 4.9424 11.3815 4.01298L12.6072 4.28238C12.5264 4.51136 12.4591 4.72688 12.3782 4.9424H16.1228V6.06039H13.9273C14.1428 6.35673 14.3179 6.65307 14.4661 6.92246L13.3346 7.34003C13.1191 6.90899 12.8631 6.47796 12.5668 6.06039H11.8799C11.6509 6.5049 11.3949 6.92246 11.1121 7.29962L10.4655 6.88206C10.5733 7.12451 10.6676 7.39391 10.7753 7.67677H15.8534ZM6.08782 6.06039C5.79149 6.54531 5.46821 7.00328 5.118 7.42085L4 6.72042C4.78125 5.88529 5.33351 4.96934 5.67026 3.99951L6.89601 4.26891C6.81519 4.4979 6.72091 4.72688 6.64009 4.9424H10.0345V6.06039H8.01401C8.25647 6.39714 8.47198 6.72042 8.63362 7.03022L7.46175 7.47473C7.23276 6.98981 6.97683 6.51837 6.6805 6.06039H6.08782Z" fill="white"/>
</g>
</svg>
            <span class="tableBig">{{ row.memberNickname }}</span>
            </div>
          </template>
</el-table-column>
        <el-table-column v-if="checkList.includes('memberName')" align="left" prop="memberName" show-overflow-tooltip
          label="会员姓名"><template #default="{ row }">
            <span class="tableBig">{{ row.memberName ? row.memberName : '-' }} </span></template></el-table-column>
        <el-table-column v-if="checkList.includes('memberLevelName')" align="left" prop="memberLevelName"
          show-overflow-tooltip label="会员等级">
          <template #default="{ row }">
            <div v-if="row.memberLevelName" class="editSvg">
              <p class="edit">{{ row.memberLevelName }}</p>
              <span>
                <svg @click="editLevel(row)" class="svgEdit" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                  viewBox="0 0 12 12" fill="none">
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
        <el-table-column v-if="checkList.includes('memberGroupName')" align="left" prop="memberGroupName"
          show-overflow-tooltip label="部门" width="140">
          <template #default="{ row }">

                    <el-text class="fontC-System" >
                      {{ row.memberGroupName ? row.memberGroupName : '-' }}
                    </el-text>

          </template>


          </el-table-column>
        <el-table-column v-if="checkList.includes('B2B|B2C')" width="100" align="left" show-overflow-tooltip label="B2B/B2C">
          <template #default="{ row }">
            <div class="isB2b " style="cursor: pointer;">
              <el-text v-if="row.b2bStatus && row.b2bStatus === 2" class="mx-1 c-fx">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none"     @click="editBC(row, 'b2b', 2)">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none"     @click="editBC(row, 'b2b', 1)">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none"    @click="editBC(row, 'b2c', 2)">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none"  @click="editBC(row, 'b2c', 1)">
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
          show-overflow-tooltip label="可用余额">
          <template #default="{ row }">
            <CurrencyType />{{ row.availableBalance || 0 }}
          </template></el-table-column>
        <el-table-column v-if="checkList.includes('pendingBalance')" align="left" prop="pendingBalance"
          show-overflow-tooltip label="待审金额">
          <template #default="{ row }">
            <CurrencyType />{{ row.pendingBalance || 0 }}
          </template></el-table-column>
        <el-table-column v-if="checkList.includes('createName')" align="left" prop="createName" show-overflow-tooltip
          label="创建人">
          <template #default="{ row }">
            {{ row.createName ? row.createName : "-" }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('createTime')" align="left" prop="createTime" show-overflow-tooltip
          label="创建时间">
          <template #default="{ row }">
            <el-tooltip :content="row.createTime" placement="top">
                <el-tag effect="plain" type="info">{{format(row.createTime)}}</el-tag>
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
    </PageMain>
    <VipEdit ref="editRef" @fetch-data="queryData" />
    <vipPlusMinusPayments ref="vipPlusMinusPaymentsRef" @fetch-data="queryData" />
    <vipLevel ref="vipLevelRef" @query-data="fetchData" />
  </div>
</template>

<style scoped lang="scss">
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

.fineBom {
  text-align: left !important;
  font-size: .875rem;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  justify-content: start;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .125rem;
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

.svgEdit {
  display: none;
  width: .875rem;
  height: .875rem;
  margin-left: .3125rem;
}

.editSvg:hover .svgEdit {
  display: block;
}

.svg {
  // display: none;
  width: 14px;
  height: 14px;
  margin-left: 5px;
}

:deep {
  tbody {
    color: #333333;
    // font-weight: 700;
  }
}

.headerIcon {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .timeSvg {
    margin-right: 4px;
  }
}
.isB2b {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

:deep {
  .el-tag__content {
    font-weight: normal;
  }
}

.c-fx {
  display: flex;
  align-items: center;
  justify-content: center;
}
.copySvg {
  width: 100%;
  height: 100%;
}
</style>
