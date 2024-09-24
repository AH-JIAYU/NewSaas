<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_memberSurveyRecords";
import useUserCustomerStore from "@/store/modules/user_customer";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "memberSurveyRecords",
});
// 国家
const useStoreCountry = useBasicDictionaryStore();
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
const formSearchName=ref<string>('formSearch-memberSurveyRecords')// 表单排序name
// 表格控件-展示列
const columns = ref([
  { prop: "id", label: "点击ID", sortable: true, checked: true },
  { prop: "surveySource", label: "会员类型", sortable: true, checked: true },
  {
    prop: "memberChildrenId",
    label: "子会员ID",
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
    prop: "customerShortName",
    label: "客户简称",
    sortable: true,
    checked: true,
  },
  { prop: "allocationType", label: "分配类型", sortable: true, checked: true },
  {
    prop: "doMoneyPrice",
    label: "原价",
    sortable: true,
    checked: true,
  },
  {
    prop: "supplierPrice",
    label: "供应商价",
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
  surveyStatus: "", //调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
  randomIdentityId: "", //随机身份id
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
  // 国家
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
    surveyStatus: "", //调查状态:1 C=完成 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
    randomIdentityId: "", //随机身份id
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
    { index: 1, show: true, type: 'input', modelName: 'projectId', placeholder: '项目ID' },
    { index: 2, show: true, type: 'input', modelName: 'projectName', placeholder: '项目名称' },
    { index: 3, show: true, type: 'select', modelName: 'surveySource', placeholder: '会员类型',
      option: [
          { label: '内部会员', value: 1 },
          { label: '外部会员', value: 2 }
      ],
      optionLabel: 'label', optionValue: 'value'
    },
    { index: 4, show: true, type: 'input', modelName: 'memberId', placeholder: '会员ID' },
    { index: 5, show: true, type: 'input', modelName: 'memberChildId', placeholder: '子会员ID' },
    { index: 6, show: true, type: 'input', modelName: 'randomIdentityId', placeholder: '随机身份' },
    { index: 7, show: true, type: 'input', modelName: 'tenantSupplierId', placeholder: '供应商ID' },
    { index: 8, show: true, type: 'input', modelName: 'ip', placeholder: 'IP地址' },
    { index: 9, show: true, type: 'select', modelName: 'surveyStatus', placeholder: '调查状态',
      option: data.surveyStatusList.map((item:any, index:any) => ({ label: item, value: index + 1 })),
      optionLabel: 'label', optionValue: 'value'
    },
    { index: 10, show: true, type: 'select', modelName: 'viceStatus', placeholder: '副状态',
      option: data.viceStatusList.map((item:any, index:any) => ({ label: item, value: index + 1 })),
      optionLabel: 'label', optionValue: 'value'
    },
];
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="queryForm" />
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
        @selection-change="setSelectRows">
        <el-table-column align="left" type="selection" />
        <el-table-column v-if="checkList.includes('id')" align="left" prop="id" width="120" show-overflow-tooltip
          fixed="left" label="点击ID"><template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine ">ID: {{ row.id }}</div>
              <copy class="copy" :content="row.id" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('surveySource')" align="left" prop="memberId" width="120"
          show-overflow-tooltip label="会员">
          <template #default="{ row }">
            <el-tag effect="dark" v-if="row.surveySource === 1" type="primary">内部会员</el-tag>
            <el-tag effect="dark" v-else type="warning">外部会员</el-tag>

            <div class="copyId tableSmall">
              <div class="id oneLine ">ID: {{ row.memberId }}</div>
              <copy class="copy" v-if="row.memberId" :content="row.memberId" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('projectId')" align="left" prop="projectId" show-overflow-tooltip
           label="项目">
          <template #default="{ row }">
            <div class="tableBig oneLine">名称: {{ row.projectName }}</div>
            <div class="copyId tableSmall">
              <div class="id oneLine ">ID: {{ row.projectId }}</div>
              <copy class="copy" v-if="row.projectId" :content="row.projectId" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberChildrenId')" align="left" prop="memberChildrenId"
          show-overflow-tooltip label="子会员ID" width="120">
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <span v-if="row.memberChildrenId" class="id oneLine "> ID: {{ row.memberChildrenId }}</span>
              <span v-else class="id ">-</span>
              <copy class="copy" v-if="row.memberChildrenId" :content="row.memberChildrenId" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('tenantSupplierId')" align="left" prop="tenantSupplierId"
          show-overflow-tooltip width="120" label="供应商ID">
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <span v-if="row.tenantSupplierId" class="id oneLine "> ID: {{ row.tenantSupplierId }}</span>
              <span v-else class="id ">-</span>
              <copy class="copy" v-if="row.tenantSupplierId" :content="row.tenantSupplierId" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('randomIdentityId')" align="left" prop="randomIdentityId"
          show-overflow-tooltip width="120" label="随机身份">
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <span v-if="row.randomIdentityId" class="id oneLine "> ID: {{ row.randomIdentityId }}</span>
              <span v-else class="id ">-</span>
              <copy class="copy" v-if="row.randomIdentityId" :content="row.randomIdentityId" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('customerShortName')" align="left" prop="customerShortName"
          show-overflow-tooltip width="100" label="客户简称" >
          <template #default="{ row }">
            <div class="tableBig">{{ row.customerShortName }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('ipBelong')" align="left" prop="ipBelong" show-overflow-tooltip
          width="150" label="IP/国家">
          <template #default="{ row }">
            <el-tag type="primary"> {{ row.ipBelong.split('/')[1] }} </el-tag>
            <div class="copyId tableSmall">

              <div class="id oneLine ">

                {{ row.ipBelong.split('/')[0] }}
              </div>
              <copy class="copy" :content="row.ipBelong.split('/')[0]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('allocationType')" align="left" show-overflow-tooltip width="100"
          label="分配类型">
          <template #default="{ row }">
            <el-tag effect="dark" style="background-color: #E1E1E1;border: none;" v-if="row.allocationType === 1"
              class="mx-1">未分配</el-tag>
              <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.allocationType===2"
              class="mx-1" type="primary">供应商</el-tag>
            <el-tag effect="dark" style="background-color: #05C9BE;border: none;" v-if="row.allocationType === 3"
              class="mx-1" type="warning">会员组</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('doMoneyPrice')" align="left" prop="doMoneyPrice"
          show-overflow-tooltip width="120" fixed="right" label="价格">
          <template #default="{ row }">
            <div class="tableBig">原价:
              <CurrencyType />{{ row.doMoneyPrice || 0 }}
            </div>
            <div class="tableBig">供应商价格:
              <CurrencyType />{{
    row.supplierPrice || 0
  }}
            </div>
          </template>
        </el-table-column>

        <el-table-column v-if="checkList.includes('surveyTime')" width="120" align="left" fixed="right" show-overflow-tooltip label="调查时间">
          <template #header>
            <span class="flex-c">
              <svg style="  margin-right: 4px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                fill="none">
                <g id="Time (æ¶é´)">
                  <path id="Vector"
                    d="M7.9987 14.6666C11.6806 14.6666 14.6654 11.6818 14.6654 7.99992C14.6654 4.31802 11.6806 1.33325 7.9987 1.33325C4.3168 1.33325 1.33203 4.31802 1.33203 7.99992C1.33203 11.6818 4.3168 14.6666 7.9987 14.6666Z"
                    fill="#409EFF" />
                  <path id="Vector_2" d="M8.00431 4L8.00391 8.00293L10.8304 10.8294" stroke="white" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
              调查时间
            </span>
          </template>
          <template #default="{ row }">
            <el-tag effect="plain" type="info"> {{ row.surveyTime ? row.surveyTime + "min" : 0 }}/
              {{ row.projectTime ? row.projectTime + "min" : 0 }} </el-tag>
          </template>
        </el-table-column>
        <ElTableColumn v-if="checkList.includes('surveyStatus')" align="left" show-overflow-tooltip fixed="right"
          width="100" prop="" label="调查状态">
          <template #default="{ row }">
            <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.surveyStatus === 3"
              class="mx-1" type="primary">配额满</el-tag>
            <el-tag effect="dark" style="background-color: #379AFF;border: none;" v-if="row.surveyStatus === 1"
              class="mx-1" type="success">完成</el-tag>
            <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.surveyStatus === 2"
              class="mx-1" type="danger">被甄别</el-tag>
            <el-tag effect="dark" style="background-color: #05C9BE;border: none;" v-if="row.surveyStatus === 4"
              class="mx-1" type="warning">安全终止</el-tag>
            <el-tag effect="dark" style="background-color: #E1E1E1;border: none;" v-if="row.surveyStatus === 5"
              class="mx-1">未完成</el-tag>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="checkList.includes('viceStatus')" align="left" show-overflow-tooltip fixed="right"
          width="100" prop="" label="副状态">
          <template #default="{ row }">
            <div v-if="row.viceStatus">
              <el-tag effect="dark" style="background-color: #74868b;border: none;" v-if="row.viceStatus === 1"
                class="mx-1" type="success">待审</el-tag>
              <el-tag effect="dark" style="background-color: #475061;border: none;" v-if="row.viceStatus === 2"
                class="mx-1" type="danger">免审</el-tag>
              <el-tag effect="dark" style="background-color: #3e5c78;border: none;" v-if="row.viceStatus === 3"
                class="mx-1" type="primary">过IR</el-tag>
              <el-tag effect="dark" style="background-color: #c8c7bc;border: none;" v-if="row.viceStatus === 4"
                class="mx-1" type="warning">时间过短</el-tag>
              <el-tag effect="dark" style="background-color: #bcc8b8;border: none;" v-if="row.viceStatus === 5"
                class="mx-1">超时完成</el-tag>
              <el-tag effect="dark" style="background-color: #ded6cb;border: none;" v-if="row.viceStatus === 6"
                class="mx-1">超量完成</el-tag>
              <el-tag effect="dark" style="background-color: #03C239;border: none;" v-if="row.viceStatus === 7"
                class="mx-1">审核成功</el-tag>
              <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.viceStatus === 8"
                class="mx-1">审核失败</el-tag>
              <el-tag effect="dark" style="background-color: #FB6868;border: none;" v-if="row.viceStatus === 9"
                class="mx-1">数据冻结</el-tag>
              <el-tag effect="dark" style="background-color: #6683a2;border: none;" v-if="row.viceStatus === 10"
                class="mx-1">时间段过载</el-tag>
              <el-tag effect="dark" style="background-color: #638d93;border: none;" v-if="row.viceStatus === 11"
                class="mx-1">IP不一致</el-tag>
              <el-tag effect="dark" style="background-color: #626a73;border: none;" v-if="row.viceStatus === 12"
                class="mx-1">ID重复参与</el-tag>
              <el-tag effect="dark" style="background-color: #03C239;border: none;" v-if="row.viceStatus === 13"
                class="mx-1">和解</el-tag>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </ElTableColumn>
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
.flex-c{
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-s {
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
