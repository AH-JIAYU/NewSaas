<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/investigation_records";
import { ElMessage } from "element-plus";
import useUserCustomerStore from "@/store/modules/user_customer";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "investigation_records",
});
// 客户
const customerStore = useUserCustomerStore();
// 分页
const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination();
// listLoading
const listLoading = ref(false);
// 列表
const list = ref<Array<Object>>([]);
// 表格-选中行
const selectRows = ref("");
// 表格-展示的列
const checkList = ref<Array<Object>>([]);
// 表格控件-是否展示边框
const border = ref(false);
// 表格控件-是否展示斑马条
const stripe = ref(false);
// 表格控件-控制表格大小
const lineHeight = ref<any>("default");
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
// 货币类型
const currencyType = ref<any>();
const formSearchList = ref<any>()//表单排序配置
const formSearchName = ref<string>('formSearch-investigation_records')// 表单排序name
// 表格控件-展示列
const columns = ref([
  {
    prop: "projectName",
    label: "项目名称",
    sortable: true,
    checked: true,
  },
  { prop: "id", label: "点击ID", sortable: true, checked: true },
  { prop: "projectId", label: "项目ID", sortable: true, checked: true },

  { prop: "memberId", label: "会员ID", sortable: true, checked: true },
  {
    prop: "randomIdentityId",
    label: "随机身份",
    sortable: true,
    checked: true,
  },
  // {
  //   prop: "customerShortName",
  //   label: "客户简称",
  //   sortable: true,
  //   checked: true,
  // },
  { prop: "memberName", label: "部门", sortable: true, checked: true },
  { prop: "allocationType", label: "分配类型", sortable: true, checked: true },
  {
    prop: "doMoneyPrice",
    label: "项目价",
    sortable: true,
    checked: true,
  },
  {
    prop: "memberPrice",
    label: "成本价(会员)",
    sortable: true,
    checked: true,
  },
  { prop: "ipBelong", label: "区域/IP", sortable: true, checked: true },
  { prop: "surveyTime", label: "调查时间", sortable: true, checked: true },
  { prop: "surveyStatus", label: "调查状态", sortable: true, checked: true },
  { prop: "viceStatus", label: "副状态", sortable: true, checked: true },
]);
const queryForm = reactive<any>({
  //会员id
  memberId: "",
  id:'',
  //随机身份id
  randomIdentityId: "",
  //会员组id
  memberGroupId: "",
  //项目id
  projectId: "",
  //项目名称-模糊查询
  projectName: "",
  //客户Id
  customerId: "",
  //ip-模糊查询
  ip: "",
  //调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
  surveyStatus: "",
});

const data = reactive<any>({
  // 分配类型
  allocationTypeList: ["未分配", "供应商", "会员组"],
  // 调查状态
  surveyStatusList: [
    { label: '完成', value: 1 },
    { label: '被甄别', value: 2 },
    { label: '配额满', value: 3 },
    { label: '安全终止', value: 4 },
    { label: '未完成', value: 5 },
  ],
  // 副状态
  viceStatusList: [
    "待审",
    "免审",
    "过IR",
    "时间过短",
    "超时完成",
    "超量完成",
    "审核成功",
    "审核失败",
    "数据冻结",
    "时间段过载",
    "ip不一致",
    "id重复参与",
    '和解',
  ],
  //客户列表
  customerList: [],
  // 会员
  vipList: [],
  // 会员组
  vipGroupList: [],
  // 供应商
  tenantSupplierList: [],
});

// 重置请求
function queryData() {
  queryForm.pageNo = 1;
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
    const { data } = await api.list(params);
    list.value = data.memberSurveyRecordInfoList;
    currencyType.value = data.currencyType;
    pagination.value.total = data.total;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}
// 表格-单选框
function setSelectRows(val: string) {
  selectRows.value = val;
}
// 重置筛选数据
function onReset() {
  Object.assign(queryForm, {
    //会员id
    memberId: "",
    id:'',
    //随机身份id
    randomIdentityId: "",
    //会员组id
    memberGroupId: "",
    //项目id
    projectId: "",
    //项目名称-模糊查询
    projectName: "",
    //客户Id
    customerId: "",
    //ip-模糊查询
    ip: "",
    //调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
    surveyStatus: "",
  });
  fetchData();
}
onMounted(async () => {
  data.customerList = await customerStore.getCustomerList();
  columns.value.forEach((item) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  fetchData();
  formSearchList.value = [
    { index: 1, show: true, type: 'input', modelName: 'memberId', placeholder: '会员ID' },
    { index: 2, show: true, type: 'input', modelName: 'randomIdentityId', placeholder: '随机身份', event: 'keydown.enter' },
    { index: 3, show: true, type: 'input', modelName: 'projectId', placeholder: '项目ID', event: 'keydown.enter' },
    { index: 4, show: true, type: 'input', modelName: 'projectName', placeholder: '项目名称', event: 'keydown.enter' },
    { index: 5, show: true, type: 'select', modelName: 'customerId', placeholder: '客户简称', option: 'customerId', optionLabel: 'customerAccord', optionValue: 'tenantCustomerId' },
    { index: 6, show: true, type: 'input', modelName: 'ip', placeholder: 'IP地址' },
    { index: 7, show: true, type: 'select', modelName: 'surveyStatus', placeholder: '调查状态', option: 'surveyStatus', optionLabel: 'label', optionValue: 'value' },
    { index: 8, show: true, type: 'input', modelName: 'id', placeholder: '点击ID', event: 'keydown.enter'},
  ];
});
const formOption = {
  customerId: () => data.customerList,
  surveyStatus: () => data.surveyStatusList,
}
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
}
</script>
<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange"
        @onReset="onReset" :model="queryForm" :formOption="formOption" />
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel />
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe" style="margin-left: 12px"
            @query-data="queryData" />
        </FormRightPanel>
      </el-row>
      <el-table v-loading="listLoading" :border="border" :data="list" :size="lineHeight" :stripe="stripe"
        @selection-change="setSelectRows" @current-change="handleCurrentChange" highlight-current-row>
        <el-table-column align="left" type="selection" />
        <el-table-column v-if="checkList.includes('id')" show-overflow-tooltip align="left" prop="id"
          label="点击ID" width="200">
          <template #default="{ row }">
            <el-text class="fontColor">{{ row.id ? row.id : "-" }}</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('randomIdentityId')" align="left" prop="randomIdentityId"
          show-overflow-tooltip label="随机身份" width="200">
          <template #default="{ row }">
            <div v-if="row.randomIdentityId" class="hoverSvg">
              <p class="fineBom">{{ row.randomIdentityId }}</p>
              <span class="c-fx">
                <copy :content="row.randomIdentityId" :class="{
    rowCopy: 'rowCopy',
    current: row.id === current,
  }" />
                <!-- <copy class="copy" :content="row.randomIdentityId" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberId')" align="left" prop="memberId" show-overflow-tooltip
          width="200" label="会员ID">
          <template #default="{ row }">
            <div v-if="row.memberId" class="hoverSvg">
              <p class="fineBom">{{ row.memberId }}</p>
              <span class="c-fx">
                <copy :content="row.memberId" :class="{
    rowCopy: 'rowCopy',
    current: row.id === current,
  }" />
                <!-- <copy class="copy" :content="row.memberId" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('projectName')" align="left" prop="projectName" show-overflow-tooltip
          label="项目名称">
          <template #default="{ row }">
            <el-text style="font-weight: 700;color: #333333;">{{ row.projectName ? row.projectName : "-" }}</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('projectId')" align="left" prop="projectId" show-overflow-tooltip
          width="200" label="项目ID">
          <template #default="{ row }">
            <div v-if="row.projectId" class="hoverSvg">
              <p class="fineBom">{{ row.projectId }}</p>
              <span class="c-fx">
                <copy :content="row.projectId" :class="{
    rowCopy: 'rowCopy',
    current: row.id === current,
  }" />
                <!-- <copy class="copy" :content="row.projectId" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <!-- <el-table-column v-if="checkList.includes('customerShortName')" align="left" prop="customerShortName"
          show-overflow-tooltip label="客户简称" width="100">
          <template #default="{ row }">
            <el-text style="font-weight: 700;color: #333333;">{{ row.customerShortName ? row.customerShortName : "-"
              }}</el-text>
          </template>
        </el-table-column> -->
        <el-table-column v-if="checkList.includes('memberName')" width="100" align="left" prop="memberName"
          show-overflow-tooltip label="部门">
          <template #default="{ row }">
            <div v-if="row.memberName" class="hoverSvg">
              <el-text style="color: #333333;">{{ row.memberName.split('/')[0] }}</el-text>
              &nbsp;&nbsp;
              <p class="fineBom">{{ row.memberName.split('/')[1] }}</p>
              <span class="c-fx">
                <copy :content="row.memberName.split('/')[1]" :class="{
    rowCopy: 'rowCopy',
    current: row.id === current,
  }" />
                <!-- <copy class="copy" :content="row.memberName.split('/')[1]" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('allocationType')" align="left" show-overflow-tooltip width="100"
          label="分配类型" fixed="right">
          <template #default="{ row }">
            <el-tag effect="plain" type="info" v-if="row.allocationType === 1"> 未分配 </el-tag>
            <el-tag style="background-color: #626aef;color: #fff;" v-if="row.allocationType === 2">
              供应商
            </el-tag>
            <el-tag style="background-color: #05C9BE;color: #fff;" v-if="row.allocationType === 3">
              会员组
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('doMoneyPrice')" width="80" align="left" prop="h"
          show-overflow-tooltip label="项目价" fixed="right">
          <template #default="{ row }">
            <el-text>
              <CurrencyType />
            </el-text>
            <el-text style="color: #333333;">
              {{ row.doMoneyPrice || 0 }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberPrice')" width="110" align="left" prop="h"
          show-overflow-tooltip label="成本价(会员)" fixed="right">
          <template #default="{ row }">
            <el-text>
              <CurrencyType />
            </el-text>
            <el-text style="color: #333333;">
              {{ row.memberPrice || 0 }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('ipBelong')" align="left" width="150" prop="ipBelong"
          show-overflow-tooltip label="区域/IP" fixed="right">
          <template #default="{ row }">
            <div v-if="row.ipBelong" class="hoverSvg">
              <el-tag >{{ row.ipBelong.split("/")[1]
                }}</el-tag>
              &nbsp;&nbsp;
              <p class="fineBom">
                {{ row.ipBelong.split("/")[0] }}</p>
              <copy :content="row.ipBelong.split('/')[0]" :class="{
    rowCopy: 'rowCopy',
    current: row.id === current,
  }" />
              <!-- <copy class="copy" :content="row.ipBelong.split('/')[0]" /> -->

            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('surveyTime')" align="left" show-overflow-tooltip label="调查时间" fixed="right">
          <template #default="{ row }">
            <el-tooltip placement="top">
              <template #content>
                <div>
                  <el-text style="color: #fff;">开始时间：{{ row.surveyStartTime }}</el-text>
                  <br>
                  <el-text style="color: #fff;">结束时间：{{ row.surveyEndTime ? row.surveyEndTime : '-' }}</el-text>
                </div>
              </template>
              <el-tag effect="plain" type="info"> {{ row.surveyTime ? row.surveyTime + "min" : 0 }}/
                {{ row.projectTime ? row.projectTime + "min" : 0 }} </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <ElTableColumn v-if="checkList.includes('surveyStatus')" align="left" show-overflow-tooltip prop=""
          label="调查状态">
          <template #default="{ row }">
            <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.surveyStatus === 3"
              class="mx-1" type="primary" fixed="right">配额满</el-tag>
            <!-- <el-tag effect="dark" style="background-color: #379AFF;border: none;" v-if="row.surveyStatus === 1"
              class="mx-1" type="success">完成</el-tag> -->
            <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.surveyStatus === 2"
              class="mx-1" type="danger">被甄别</el-tag>
            <el-tag effect="dark" style="background-color: #05C9BE;border: none;" v-if="row.surveyStatus === 4"
              class="mx-1" type="warning">安全终止</el-tag>
            <el-tag effect="dark" style="background-color: #E1E1E1;border: none;" v-if="row.surveyStatus === 5"
              class="mx-1">未完成</el-tag>
            <el-tag effect="dark" style="background-color: #74868b; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 1" class="mx-1" type="success">待审</el-tag>
            <el-tag effect="dark" style="background-color: #475061; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 2" class="mx-1" type="danger">完成</el-tag>
            <el-tag effect="dark" style="background-color: #3e5c78; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 3" class="mx-1" type="primary">过IR</el-tag>
            <el-tag effect="dark" style="background-color: #c8c7bc; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 4" class="mx-1" type="warning">时间过短</el-tag>
            <el-tag effect="dark" style="background-color: #bcc8b8; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 5" class="mx-1">超时完成</el-tag>
            <el-tag effect="dark" style="background-color: #ded6cb; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 6" class="mx-1">超量完成</el-tag>
            <el-tag effect="dark" style="background-color: #03c239; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 7" class="mx-1">审核成功</el-tag>
            <el-tag effect="dark" style="background-color: #fb6868; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 8" class="mx-1">审核失败</el-tag>
            <el-tag effect="dark" style="background-color: #fb6868; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 9" class="mx-1">数据冻结</el-tag>
            <el-tag effect="dark" style="background-color: #6683a2; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 10" class="mx-1">时间段过载</el-tag>
            <el-tag effect="dark" style="background-color: #638d93; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 11" class="mx-1">IP不一致</el-tag>
            <el-tag effect="dark" style="background-color: #626a73; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 12" class="mx-1">ID重复参与</el-tag>
            <el-tag effect="dark" style="background-color: #03c239; border: none"
              v-if="row.surveyStatus === 1 && row.viceStatus === 13" class="mx-1">和解</el-tag>
            <el-text v-if="row.settlementRemarks">
              <div v-if="row.settlementRemarks === '结算成功'" style="color:#4797fb;"
                class="i-healthicons:yes w-1.3em h-1.3em"></div>
              <div v-if="row.settlementRemarks === '结算失败'" style="color:#f1756c;"
                class="i-healthicons:no w-1.3em h-1.3em"></div>
            </el-text>
          </template>
        </ElTableColumn>
        <!-- <ElTableColumn v-if="checkList.includes('viceStatus')" align="left" show-overflow-tooltip prop="" label="副状态">
          <template #default="{ row }">
            <div v-if="row.surveyStatus === 1">
              <div v-if="row.viceStatus">
                <el-tag effect="dark" style="background-color: #74868b; border: none" v-if="row.viceStatus === 1"
                  class="mx-1" type="success">待审</el-tag>
                <el-tag effect="dark" style="background-color: #475061; border: none" v-if="row.viceStatus === 2"
                  class="mx-1" type="danger">完成</el-tag>
                <el-tag effect="dark" style="background-color: #3e5c78; border: none" v-if="row.viceStatus === 3"
                  class="mx-1" type="primary">过IR</el-tag>
                <el-tag effect="dark" style="background-color: #c8c7bc; border: none" v-if="row.viceStatus === 4"
                  class="mx-1" type="warning">时间过短</el-tag>
                <el-tag effect="dark" style="background-color: #bcc8b8; border: none" v-if="row.viceStatus === 5"
                  class="mx-1">超时完成</el-tag>
                <el-tag effect="dark" style="background-color: #ded6cb; border: none" v-if="row.viceStatus === 6"
                  class="mx-1">超量完成</el-tag>
                <el-tag effect="dark" style="background-color: #03c239; border: none" v-if="row.viceStatus === 7"
                  class="mx-1">审核成功</el-tag>
                <el-tag effect="dark" style="background-color: #fb6868; border: none" v-if="row.viceStatus === 8"
                  class="mx-1">审核失败</el-tag>
                <el-tag effect="dark" style="background-color: #fb6868; border: none" v-if="row.viceStatus === 9"
                  class="mx-1">数据冻结</el-tag>
                <el-tag effect="dark" style="background-color: #6683a2; border: none" v-if="row.viceStatus === 10"
                  class="mx-1">时间段过载</el-tag>
                <el-tag effect="dark" style="background-color: #638d93; border: none" v-if="row.viceStatus === 11"
                  class="mx-1">IP不一致</el-tag>
                <el-tag effect="dark" style="background-color: #626a73; border: none" v-if="row.viceStatus === 12"
                  class="mx-1">ID重复参与</el-tag>
                <el-tag effect="dark" style="background-color: #03c239; border: none" v-if="row.viceStatus === 13"
                  class="mx-1">和解</el-tag>
              </div>
              <el-text v-else></el-text>
            </div>
            <el-text v-else></el-text>
          </template>
        </ElTableColumn> -->
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </el-table>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
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

.f-jc {
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: .875rem;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.svg {
  // display: none;
  width: 14px;
  height: 14px;
  margin-left: 5px;
}

.headerIcon {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .timeSvg {
    margin-right: 4px;
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

:deep {
  .el-tag {
    width: 4.125rem;
  }
}
</style>
