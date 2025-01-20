<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_memberSurveyRecords";
import useUserCustomerStore from "@/store/modules/user_customer";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import empty from "@/assets/images/empty.png";
// 国际化
import { useI18n } from "vue-i18n";

defineOptions({
  name: "memberSurveyRecords",
});
// 区域
const useStoreCountry = useBasicDictionaryStore();
// 客户
const customerStore = useUserCustomerStore();
// 分页
const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination();
// 国际化
const { t } = useI18n();
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
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-memberSurveyRecords"); // 表单排序name
// 表格控件-展示列
const columns = ref([
  { prop: "id", label: "点击ID", sortable: true, checked: true },
  { prop: "surveySource", label: "会员类型", sortable: true, checked: true },
  {
    prop: "memberChildId",
    label: "子会员ID",
    sortable: true,
    checked: true,
  },
  {
    prop: "tenantId",
    label: "租户ID",
    sortable: true,
    checked: true,
  },
  { prop: "memberId", label: "会员ID", sortable: true, checked: true },
  {
    prop: "tenantSupplierId",
    label: "供应商id",
    sortable: true,
    checked: true,
  },

  { prop: "projectId", label: "项目ID", sortable: true, checked: true },
  {
    prop: "randomIdentityId",
    label: "随机身份",
    sortable: true,
    checked: true,
  },
  {
    prop: "projectName",
    label: "项目名称",
    sortable: true,
    checked: true,
  },
  {
    prop: "sampleSource",
    label: "样本来源",
    sortable: true,
    checked: true,
  },

  {
    prop: "customerShortName",
    label: "客户简称",
    sortable: true,
    checked: true,
  },
  { prop: "allocationType", label: "分配类型", sortable: true, checked: true },
  {
    prop: "doMoneyPrice",
    label: "项目价",
    sortable: true,
    checked: true,
  },
  {
    prop: "memberPrice",
    label: "成本价",
    sortable: true,
    checked: true,
  },
  { prop: "ipBelong", label: "IP/所属国", sortable: true, checked: true },
  { prop: "surveyTime", label: "调查时间", sortable: true, checked: true },
  { prop: "surveyStatus", label: "调查状态", sortable: true, checked: true },
  { prop: "viceStatus", label: "副状态", sortable: true, checked: true },
]);
const queryForm = reactive<any>({
  memberChildId: "", //	子会员id
  memberId: "", //会员id
  tenantSupplierId: "", //	供应商id
  surveySource: "", //	调查来源 1:内部 2:外部
  projectId: "", //项目id
  projectName: "", //项目名称-模糊查询
  customerId: "", //客户Id
  ip: "", //ip-模糊查询
  surveyStatus: [], //调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
  randomIdentityId: "", //随机身份id
  // 租户id
  tenantId: "",
  // 会员类型
  memberType: "",
  // 点击id
  id: "",
  viceStatus: [],
});

const data = reactive<any>({
  // 会员类型
  memberType: ["内部会员", "外部会员"],
  // 分配类型
  allocationTypeList: ["未分配", "供应商", "会员组"],
  // 调查状态
  surveyStatusList: ["完成", "被甄别", "配额满", "安全终止", "未完成"],
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
    "和解",
  ],
  //客户列表
  customerList: [],
  // 区域
  countryList: [],
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
    list.value = data.memberChildSurveyRecordInfoList;
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
    memberChildId: "",
    memberId: "", //会员id
    tenantSupplierId: "",
    surveySource: "", //	调查来源 1:内部 2:外部
    projectId: "", //项目id
    projectName: "", //项目名称-模糊查询
    customerId: "", //客户Id
    ip: "", //ip-模糊查询
    surveyStatus: [], //调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
    randomIdentityId: "", //随机身份id
    // 租户id
    tenantId: "",
    // 会员类型
    memberType: "",
    // 点击id
    id: "",
    viceStatus: [],
  });
  fetchData();
}
onMounted(async () => {
  data.customerList = await customerStore.getCustomerList();
  data.country = await useStoreCountry.getCountry();
  columns.value.forEach((item) => {
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
      modelName: "id",
      placeholder: computed(() => t("RecordsManagement.clickID")),
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "projectId",
      placeholder: computed(() => t("RecordsManagement.projectID")),
    },
    {
      index: 3,
      show: true,
      type: "input",
      modelName: "projectName",
      placeholder: computed(() => t("RecordsManagement.projectName")),
    },
    {
      index: 4,
      show: true,
      type: "select",
      modelName: "memberType",
      placeholder: computed(() => t("RecordsManagement.vipType")),
      option: "memberType",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 5,
      show: true,
      type: "input",
      modelName: "memberId",
      placeholder: computed(() => t("RecordsManagement.vipID")),
    },
    {
      index: 6,
      show: true,
      type: "input",
      modelName: "memberChildId",
      placeholder: computed(() => t("RecordsManagement.subVipID")),
    },
    {
      index: 7,
      show: true,
      type: "input",
      modelName: "randomIdentityId",
      placeholder: computed(() => t("RecordsManagement.randomIdentity")),
    },
    {
      index: 8,
      show: true,
      type: "input",
      modelName: "tenantSupplierId",
      placeholder: computed(() => t("RecordsManagement.supplierID")),
    },
    {
      index: 9,
      show: true,
      type: "input",
      modelName: "ip",
      placeholder: computed(() => t("RecordsManagement.ipAddress")),
    },
    {
      index: 10,
      show: true,
      type: "select",
      modelName: "surveyStatus",
      placeholder: computed(() => t("RecordsManagement.surveyStatus")),
      option: "surveyStatus",
      optionLabel: "label",
      optionValue: "value",
      multiple: true,
    },
    {
      index: 11,
      show: true,
      type: "select",
      modelName: "viceStatus",
      placeholder: computed(() => t("RecordsManagement.viceState")),
      option: "viceStatus",
      optionLabel: "label",
      optionValue: "value",
      multiple: true,
    },
    {
      index: 12,
      show: true,
      type: "input",
      modelName: "tenantId",
      placeholder: computed(() => t("RecordsManagement.tenantID")),
    },
  ];
});
const formOption = {
  memberType: () => [
    { label: "外部会员", value: 1 },
    { label: "内部会员", value: 2 },
    { label: "外包会员", value: 3 },
  ],
  surveyStatus: () =>
    data.surveyStatusList.map((item: any, index: any) => ({
      label: item,
      value: index + 1,
    })),
  viceStatus: () =>
    data.viceStatusList.map((item: any, index: any) => ({
      label: item,
      value: index + 1,
    })),
};
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
}
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
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
        <FormLeftPanel />
        <FormRightPanel>
          <el-button size="default"> {{ t('RecordsManagement.export') }} </el-button>
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
      <!-- 外包会员，点击id，随机身份，租户id，会员id，子会员id，供应商id，项目，ip区域，分配类型，调查时间，调查状态，副状态 -->
      <el-table
        v-loading="listLoading"
        :border="border"
        :data="list"
        :size="lineHeight"
        :stripe="stripe"
        highlight-current-row
        @selection-change="setSelectRows"
        @current-change="handleCurrentChange"
      >
        <!-- <el-table-column align="left" type="selection" /> -->
        <el-table-column
          v-if="checkList.includes('id')"
          width="200"
          align="left"
          prop="id"
          show-overflow-tooltip
          fixed="left"
          :label="t('RecordsManagement.clickID')"
          ><template #default="{ row }">
            <el-tag effect="dark" v-if="row.surveySource === 1" type="primary"
              >{{ t('RecordsManagement.internalVip') }}</el-tag
            >
            <el-tag effect="dark" v-if="row.surveySource === 2" type="warning"
              >{{ t('RecordsManagement.externalVip') }}</el-tag
            >
            <el-tag
              effect="dark"
              v-if="row.surveySource === 3"
              style="background-color: #aed500; border: none"
              >{{ t('RecordsManagement.outsourcingVip') }}</el-tag
            >
            <div class="copyId flex-s tableSmall">
              <div class="id oneLine idFont">{{ row.id ? row.id : "-" }}</div>
              <copy
                :content="row.id"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
              <!-- <copy class="copy edit" :content="row.id" /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectId')"
          width="200"
          align="left"
          prop="projectId"
          show-overflow-tooltip
          :label="t('RecordsManagement.project')"
        >
          <template #default="{ row }">
            <div class="tableBig oneLine">{{ row.projectName }}</div>
            <div class="copyId tableSmall flex-s">
              <div class="id oneLine">
                {{ row.projectId ? row.projectId : "-" }}
              </div>
              <copy
                v-if="row.projectId"
                :content="row.projectId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
              <!-- <copy class="copy edit" v-if="row.projectId" :content="row.projectId" /> -->
            </div>
          </template>
        </el-table-column>
        <!--  样本来源,内部1，外部2，外包3-->
        <el-table-column
          v-if="checkList.includes('sampleSource')"
          align="left"
          prop="customerShortName"
          show-overflow-tooltip
          width="250"
          :label="t('RecordsManagement.sampleSource')"
        >
          <template #default="{ row }">
            <!-- 外包，样本来源显示、乙方的公司名称 -->

            <!-- 内部1，样本来源显示、供应商用户名以及会员用户名；内部站标签以及会员用户名 -->
            <!-- 外部会员2，样本来源显示、供应商用户名、内部站标签；不显示会员用户名 -->
            <div v-if="row.surveySource === 1 || row.surveySource === 2">
              <div style="display: flex" class="oneLine2" v-if="row.memberId">
                <el-tag
                  type="warning"
                  class="tag-with-image"
                  style="color: #a0c205; background: #f7ffd1"
                >
                  <img
                    src="@/assets/images/huiyuan.png"
                    style="
                      width: 0.9375rem;
                      height: 0.9375rem;
                      margin-right: 0.25rem;
                    "
                  />
                  {{ t('RecordsManagement.internalStation') }}</el-tag
                >
                <!-- 会员名称 -->
                <span>{{ row.memberName ? row.memberName : "" }}</span>
              </div>
              <div
                style="display: flex"
                class="oneLine2"
                v-if="row.tenantSupplierId"
              >
                <el-tag type="danger" class="tag-with-image">
                  <img
                    src="@/assets/images/gong.png"
                    style="
                      width: 0.9375rem;
                      height: 0.9375rem;
                      margin-right: 0.25rem;
                    "
                  />
                  <span>{{ t('RecordsManagement.supplier') }}</span>
                </el-tag>
                <span>{{
                  row.tenantSupplierName ? row.tenantSupplierName : ""
                }}</span>
              </div>
              <div
                style="display: flex"
                class="oneLine2"
                v-if="row.surveySource === 1 && row.memberChildId"
              >
                <el-tag
                  type="warning"
                  class="tag-with-image"
                  style="color: #a0c205; background: #f7ffd1"
                >
                  <img
                    src="@/assets/images/huiyuan.png"
                    style="
                      width: 0.9375rem;
                      height: 0.9375rem;
                      margin-right: 0.25rem;
                    "
                  />
                  {{ t('RecordsManagement.v') }}&nbsp;&nbsp;&nbsp;{{ t('RecordsManagement.ip') }}</el-tag
                >
                <span>{{
                  row.memberChildName ? row.memberChildName : ""
                }}</span>
              </div>
            </div>

            <!-- 外包会员 -->
            <div v-if="row.surveySource === 3">
              <div style="display: flex" class="oneLine2">
                <el-tag type="primary" class="tag-with-image">
                  <img
                    src="@/assets/images/he.png"
                    style="
                      width: 0.9375rem;
                      height: 0.9375rem;
                      margin-right: 0.25rem;
                    "
                  />
                  合作商</el-tag
                >
                <span>{{ row.tenantName ? row.tenantName : "" }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- <el-table-column v-if="checkList.includes('randomIdentityId')" width="200" align="left" show-overflow-tooltip
          label="随机身份">
          <template #default="{ row }">
            <div class="copyId flex-s tableSmall" v-if="row.surveySource !== 3">
              <div class="oneLine color3">
                <span class="id oneLine idFont">
                  {{ row.randomIdentityId ? row.randomIdentityId : "-" }}</span>
              </div>
              <copy v-if="row.randomIdentityId" :content="row.randomIdentityId" :class="{
    rowCopy: 'rowCopy',
    current: row.id === current,
  }" />
            </div>
            <span v-else>-</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column v-if="checkList.includes('tenantId')" width="200" align="left" show-overflow-tooltip
          label="租户ID"><template #default="{ row }">
            <div class="copyId flex-s tableSmall color3">
              <div class="id oneLine idFont">
                {{ row.tenantId ? row.tenantId : "-" }}
              </div>
              <copy :content="row.tenantId" :class="{
    rowCopy: 'rowCopy',
    current: row.id === current,
  }" />
            </div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column v-if="checkList.includes('surveySource')" width="200" align="left" show-overflow-tooltip
          label="会员ID">
          <template #default="{ row }">
            <div v-if="row.surveySource === 1 || row.surveySource === 3">
              <div v-if="row.memberId">
                <div class="copyId tableSmall flex-s">
                  <div class="id oneLine idFont">
                    {{ row.memberId ? row.memberId : "-" }}
                  </div>
                  <copy :content="row.memberId" :class="{
    rowCopy: 'rowCopy',
    current: row.id === current,
  }" />
                </div>
              </div>
              <span v-else class="id">-</span>
            </div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column v-if="checkList.includes('memberChildId')" width="200" align="left" show-overflow-tooltip
          label="子会员ID">
          <template #default="{ row }">
            <div v-if="row.surveySource && row.surveySource != 2">
              <div>
                <div class="copyId tableSmall flex-s">
                  <div class="id oneLine idFont">
                    {{ row.memberChildId ? row.memberChildId : "-" }}
                  </div>
                  <copy :content="row.memberChildId" :class="{
    rowCopy: 'rowCopy',
    current: row.id === current,
  }" />
                </div>
              </div>
            </div>
            <span v-else>-</span>
          </template>
        </el-table-column> -->

        <!-- <el-table-column v-if="checkList.includes('tenantSupplierId')" width="200" align="left" show-overflow-tooltip
          label="供应商ID">
          <template #default="{ row }">
            <div class="copyId tableSmall flex-s" v-if="row.surveySource === 1 || row.surveySource === 3">
              <div class="oneLine">
                <span v-if="row.tenantSupplierId" class="id oneLine idFont">
                  {{ row.tenantSupplierId ? row.tenantSupplierId : "-" }}</span>
                <span v-else class="id">-</span>
              </div>
              <copy v-if="row.tenantSupplierId" :content="row.tenantSupplierId" :class="{
    rowCopy: 'rowCopy',
    current: row.id === current,
  }" />
            </div>
          </template>
        </el-table-column> -->

        <el-table-column
          v-if="checkList.includes('customerShortName')"
          align="left"
          prop="customerShortName"
          show-overflow-tooltip
          :label="t('RecordsManagement.CustomerAbbreviation')"
          width="180"
        >
          <!-- 乙方显示甲方公司名称甲方显示客户简称 -->
          <template #default="{ row }">
            <div class="tableBig">
              {{ row.customerShortName ? row.customerShortName : "-" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('ipBelong')"
          align="left"
          prop="ipBelong"
          show-overflow-tooltip
          width="180"
          :label="t('RecordsManagement.IP-Area')"
        >
          <template #default="{ row }">
            <el-tag type="primary">
              {{
                row.ipBelong.split("/")[1] ? row.ipBelong.split("/")[1] : "-"
              }}
            </el-tag>
            <div class="copyId tableSmall flex-s">
              <div class="id oneLine">
                {{
                  row.ipBelong.split("/")[0] ? row.ipBelong.split("/")[0] : "-"
                }}
              </div>
              <copy
                :content="row.ipBelong.split('/')[0]"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
              <!-- <copy class="copy edit" :content="row.ipBelong.split('/')[0]" /> -->
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column v-if="checkList.includes('allocationType')" align="left" show-overflow-tooltip width="230"
          label="分配类型" fixed="right">
          <template #default="{ row }">
            <el-tag effect="plain" type="info" v-if="row.allocationType === 1" class="mx-1">未分配</el-tag>
            <el-tag effect="dark" style="background-color: #fb6868; border: none" v-if="row.allocationType === 2"
              class="mx-1" type="primary">供应商</el-tag>
            <el-tag effect="dark" style="background-color: #05c9be; border: none" v-if="row.allocationType === 3"
              class="mx-1" type="warning">内部站</el-tag>
            <el-tag effect="dark" style="background-color: #ffac54; border: none" v-if="row.allocationType === 4"
              class="mx-1" type="warning">合作商</el-tag>
              <el-button size="small" v-if="row.allocationType?.includes(1)" >
                未分配</el-button
              >
            <div class="flex-c"  style="cursor: pointer;" >
              <div
              style="width: calc(100% - 1.25rem);"  class="parameter1">
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



          </template>
        </el-table-column> -->
        <el-table-column
          v-if="checkList.includes('doMoneyPrice')"
          align="left"
          prop="doMoneyPrice"
          show-overflow-tooltip
          width="120"
          fixed="right"
          :label="t('RecordsManagement.projectPrice')"
        >
          <template #default="{ row }">
            <div class="fontC-System">
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
              <CurrencyType v-if="!row.currencyType" />
              {{ row.doMoneyPrice || 0 }}
              <!-- {{
                (row.doMoneyPrice ?? 0).toFixed(2) || 0
              }} -->
              <!-- <CurrencyType />{{ row.doMoneyPrice || 0 }} -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberPrice')"
          align="left"
          prop="memberPrice"
          show-overflow-tooltip
          width="120"
          fixed="right"
          :label="t('RecordsManagement.costPrice')"
        >
          <template #default="{ row }">
            <div class="fontC-System">
              <svg
                v-if="row.memberCurrencyType === 'USD'"
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
                v-if="row.memberCurrencyType === 'CNY'"
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
              <CurrencyType v-if="!row.memberCurrencyType" />
              <template v-if="row.surveySource === 1">
                <el-text v-if="row.memberChildId">
                  {{ row.supplierPrice ?? 0 }}
                </el-text>
                <el-text v-if="row.memberId">
                  {{ row.memberPrice ?? 0 }}
                </el-text>
              </template>
              <template v-if="row.surveySource === 3">
                {{ row.supplierPrice ?? row.memberPrice }}
              </template>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('surveyTime')"
          width="120"
          align="left"
          fixed="right"
          show-overflow-tooltip
          :label="t('RecordsManagement.surveyTime')"
        >
          <template #default="{ row }">
            <el-tooltip placement="top">
              <template #content>
                <div>
                  <el-text style="color: #fff"
                    >{{ t('RecordsManagement.startTime') }}：{{
                      row.surveyStartTime ? row.surveyStartTime : "-"
                    }}</el-text
                  >
                  <br />
                  <el-text style="color: #fff"
                    >{{ t('RecordsManagement.endTime') }}：{{
                      row.surveyEndTime ? row.surveyEndTime : "-"
                    }}</el-text
                  >
                </div>
              </template>
              <el-tag effect="plain" type="info">
                {{ row.surveyTime ? row.surveyTime + "min" : 0 }}/
                {{ row.projectTime ? row.projectTime + "min" : 0 }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <ElTableColumn
          v-if="checkList.includes('surveyStatus')"
          align="left"
          show-overflow-tooltip
          fixed="right"
          width="120"
          prop=""
          :label="t('RecordsManagement.surveyStatus')"
        >
          <template #default="{ row }">
            <el-tag
              effect="dark"
              style="background-color: #fb6868; border: none"
              v-if="row.surveyStatus === 3"
              class="mx-1"
              type="primary"
              >配额满</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #379aff; border: none"
              v-if="row.surveyStatus === 1"
              class="mx-1"
              type="success"
              >完成</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #fb6868; border: none"
              v-if="row.surveyStatus === 2"
              class="mx-1"
              type="danger"
              >被甄别</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #05c9be; border: none"
              v-if="row.surveyStatus === 4"
              class="mx-1"
              type="warning"
              >安全终止</el-tag
            >
            <el-tag
              effect="dark"
              style="background-color: #e1e1e1; border: none"
              v-if="row.surveyStatus === 5"
              class="mx-1"
              >未完成</el-tag
            >
            <!-- <div
              v-if="
                row.settlementStatus === 0 &&
                row.surveyStatus === 1 &&
                (row.viceStatus === 3 ||
                  row.viceStatus === 4 ||
                  row.viceStatus === 5 ||
                  row.viceStatus === 6)
              "
              style="color: #777"
              class="i-healthicons:no w-1.3em h-1.3em"
            ></div> -->
            <div
              v-if="
                row.settlementStatus === 1 &&
                (row.viceStatus === 3 ||
                  row.viceStatus === 4 ||
                  row.viceStatus === 5 ||
                  row.viceStatus === 6)
              "
              style="color: #4797fb"
              class="i-healthicons:yes w-1.3em h-1.3em"
            ></div>
            <div
              v-if="
                row.settlementStatus === 2 &&
                (row.viceStatus === 3 ||
                  row.viceStatus === 4 ||
                  row.viceStatus === 5 ||
                  row.viceStatus === 6)
              "
              style="color: #f1756c"
              class="i-healthicons:no w-1.3em h-1.3em"
            ></div>
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="checkList.includes('viceStatus')"
          align="left"
          show-overflow-tooltip
          fixed="right"
          width="120"
          prop=""
          label="副状态"
        >
          <template #default="{ row }">
            <div v-if="row.surveyStatus === 1">
              <div v-if="row.viceStatus">
                <el-tag
                  effect="dark"
                  style="background-color: #74868b; border: none"
                  v-if="row.viceStatus === 1 || row.viceStatus === 2"
                  class="mx-1"
                  type="success"
                  >待审核</el-tag
                >
                <!-- <el-tag effect="dark" style="background-color: #03c239; border: none" v-if="row.viceStatus === 2"
                  class="mx-1" type="danger">免审</el-tag> -->
                <el-tag
                  effect="dark"
                  style="background-color: #3e5c78; border: none"
                  v-if="row.viceStatus === 3"
                  class="mx-1"
                  type="primary"
                  >过IR</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #c8c7bc; border: none"
                  v-if="row.viceStatus === 4"
                  class="mx-1"
                  type="warning"
                  >时间过短</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #bcc8b8; border: none"
                  v-if="row.viceStatus === 5"
                  class="mx-1"
                  >超时完成</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #ded6cb; border: none"
                  v-if="row.viceStatus === 6"
                  class="mx-1"
                  >超量完成</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #03c239; border: none"
                  v-if="row.viceStatus === 7"
                  class="mx-1"
                  >审核成功</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #fb6868; border: none"
                  v-if="row.viceStatus === 8"
                  class="mx-1"
                  >审核失败</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #fb6868; border: none"
                  v-if="row.viceStatus === 9"
                  class="mx-1"
                  >数据冻结</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #6683a2; border: none"
                  v-if="row.viceStatus === 10"
                  class="mx-1"
                  >时间段过载</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #638d93; border: none"
                  v-if="row.viceStatus === 11"
                  class="mx-1"
                  >IP不一致</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #626a73; border: none"
                  v-if="row.viceStatus === 12"
                  class="mx-1"
                  >ID重复参与</el-tag
                >
                <el-tag
                  effect="dark"
                  style="background-color: #03c239; border: none"
                  v-if="row.viceStatus === 13"
                  class="mx-1"
                  >和解</el-tag
                >
              </div>
              <el-text v-else>-</el-text>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </ElTableColumn>
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
  </div>
</template>

<style scoped lang="scss">
.tag-with-image {
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  margin-right: 0.5rem; /* 每行标签之间的间距 */
}
:deep(.tag-with-image .el-tag__content) {
  display: flex;
  align-items: center;
}
.oneLine2 {
  // width: 40%;
  text-align: left;
  margin: 0 0.75rem 0.125rem 0;
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
.idFont {
  font-size: 0.875rem;
}

.color3 {
  color: #333;
}

.copyId .idFont {
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

.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.flex-s {
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

.el-table__row:hover .edit {
  display: block;
}

:deep {
  .el-tag {
    min-width: 4.125rem;
  }
}
</style>
