<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_memberSurveyRecords";
import useUserCustomerStore from "@/store/modules/user_customer";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";

defineOptions({
  name: "RecordSurveyIndex",
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
const border = ref(true);
// 表格控件-是否展示斑马条
const stripe = ref(false);
// 表格控件-控制表格大小
const lineHeight = ref<any>("default");
// 表格控件-高度自适应
const tableAutoHeight = ref(false);
// 货币类型
const currencyType = ref<any>();
// 表格控件-展示列
const columns = ref([
  { prop: "id", label: "点击ID", sortable: true, checked: true },
  { prop: "surveySource", label: "会员类型", sortable: true, checked: true },
  {
    prop: "memberChildrenId",
    label: "子会员Id",
    sortable: true,
    checked: true,
  },
  { prop: "memberId", label: "会员Id", sortable: true, checked: true },
  {
    prop: "tenantSupplierId",
    label: "供应商id",
    sortable: true,
    checked: true,
  },

  { prop: "projectId", label: "项目id", sortable: true, checked: true },
  {
    prop: "randomIdentityId",
    label: "随机身份",
    sortable: true,
    checked: true,
  },
  {
    prop: "projectName",
    label: "项目名称/客户简称",
    sortable: true,
    checked: true,
  },
  { prop: "allocationType", label: "分配类型", sortable: true, checked: true },
  {
    prop: "price",
    label: "子会员价/供应商价/原价",
    sortable: true,
    checked: true,
  },
  { prop: "ipBelong", label: "ip/所属国", sortable: true, checked: true },
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
  surveyStatus: "", //调查状态:1 C=完成/待审核 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
  randomIdentityId: "", //随机身份id
});

const data = reactive<any>({
  // 会员类型
  memberType: ["内部会员", "外部会员"],
  // 分配类型
  allocationTypeList: ["未分配", "供应商", "会员组"],
  // 调查状态
  surveyStatusList: ["完成/待审核", "被甄别", "配额满", "安全终止", "未完成"],
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
    surveyStatus: "", //调查状态:1 C=完成/待审核 2 S=被甄别 3 Q=配额满 4 T=安全终止 5未完成
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
});
</script>

<template>
  <div :class="{ 'absolute-container': tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm
            :model="queryForm"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.projectId"
                clearable
                :inline="false"
                placeholder="项目ID"
              />
            </el-form-item>

            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.projectName"
                clearable
                :inline="false"
                placeholder="项目名称"
              />
            </el-form-item>
            <el-form-item label="">
              <el-select
                v-model="queryForm.surveySource"
                clearable
                filterable
                placeholder="会员类型"
              >
                <el-option label="内部会员" :value="1"></el-option>
                <el-option label="外部会员" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model.trim="queryForm.memberId"
                clearable
                :inline="false"
                placeholder="会员ID"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.memberChildId"
                clearable
                :inline="false"
                placeholder="子会员ID"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.randomIdentityId"
                clearable
                :inline="false"
                placeholder="随机身份"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.tenantSupplierId"
                clearable
                :inline="false"
                placeholder="供应商ID"
              />
            </el-form-item>
            <!-- <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.surveyStatus"
                clearable
                filterable
                placeholder="客户简称"
              >
                <el-option
                  v-for="item in data.customerList"
                  :label="item.customerAccord"
                  :value="item.tenantCustomerId"
                  :key="item.tenantCustomerId"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.ip"
                clearable
                :inline="false"
                placeholder="分配类型"
              />
            </el-form-item> -->
            <el-form-item v-show="!fold" label="">
              <el-input
                v-model.trim="queryForm.ip"
                clearable
                :inline="false"
                placeholder="IP地址"
              />
            </el-form-item>
            <!-- <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.surveyStatus"
                clearable
                filterable
                placeholder="所属国家"
              >
                <el-option
                  v-for="item in data.country"
                  :label="item.chineseName"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.surveyStatus"
                clearable
                filterable
                placeholder="调查状态"
              >
                <el-option
                  v-for="(item, index) in data.surveyStatusList"
                  :label="item"
                  :value="index + 1"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                v-model="queryForm.viceStatus"
                clearable
                placeholder="副状态"
              >
                <el-option
                  v-for="(item, index) in data.viceStatusList"
                  :label="item"
                  :value="index + 1"
                ></el-option>
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
              <ElButton link @click="toggle">
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
        <FormLeftPanel />
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
        <el-table-column align="center" type="selection" />
        <el-table-column
          v-if="checkList.includes('id')"
          align="center"
          prop="id"
          show-overflow-tooltip
          label="点击ID"
          ><template #default="{ row }">
            {{ row.id ? row.id : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('surveySource')"
          align="center"
          prop="memberId"
          show-overflow-tooltip
          label="会员类型"
        >
          <template #default="{ row }">
            {{ row.surveySource === 1 ? "内部会员" : "外部会员" }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberChildrenId')"
          align="center"
          prop="memberChildrenId"
          show-overflow-tooltip
          label="子会员ID"
          ><template #default="{ row }">
            {{ row.memberChildrenId ? row.memberChildrenId : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberId')"
          align="center"
          prop="memberId"
          show-overflow-tooltip
          label="会员ID"
          ><template #default="{ row }">
            {{ row.memberId ? row.memberId : "-" }}
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('randomIdentityId')"
          align="center"
          prop="randomIdentityId"
          show-overflow-tooltip
          label="随机身份"
          ><template #default="{ row }">
            {{ row.randomIdentityId ? row.randomIdentityId : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('tenantSupplierId')"
          align="center"
          prop="tenantSupplierId"
          show-overflow-tooltip
          label="供应商ID"
          ><template #default="{ row }">
            {{ row.tenantSupplierId ? row.tenantSupplierId : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('projectId')"
          align="center"
          prop="projectId"
          show-overflow-tooltip
          label="项目ID"
        />
        <el-table-column
          v-if="checkList.includes('projectName')"
          align="center"
          prop="projectName"
          show-overflow-tooltip
          label="项目名称/客户简称"
          ><template #default="{ row }">
            {{ row.projectName ? row.projectName : "-" }}/{{
              row.customerShortName ? row.customerShortName : "-"
            }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('allocationType')"
          align="center"
          show-overflow-tooltip
          label="分配类型"
        >
          <template #default="{ row }">
            {{ data.allocationTypeList[row.allocationType - 1] }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('price')"
          align="center"
          prop="h"
          show-overflow-tooltip
          label="原价/供应商价/子会员价"
        >
          <template #default="{ row }">
            {{ row.doMoneyPrice || 0 }}<CurrencyType /> /
            {{ row.supplierPrice || 0 }}<CurrencyType /> /
            {{ row.memberChildPrice || 0 }}<CurrencyType />
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('ipBelong')"
          align="center"
          prop="ipBelong"
          show-overflow-tooltip
          label="IP/所属国"
        />
        <el-table-column
          v-if="checkList.includes('surveyTime')"
          align="center"
          show-overflow-tooltip
          label="调查时间"
        >
          <template #default="{ row }">
            {{ row.surveyTime ? row.surveyTime + "min" : 0 }}/
            {{ row.projectTime ? row.projectTime + "min" : 0 }}
          </template>
        </el-table-column>
        <ElTableColumn
          v-if="checkList.includes('surveyStatus')"
          align="center"
          show-overflow-tooltip
          prop=""
          label="调查状态"
        >
          <template #default="{ row }">
            {{ data.surveyStatusList[row.surveyStatus - 1] }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="checkList.includes('viceStatus')"
          align="center"
          show-overflow-tooltip
          prop=""
          label="副状态"
        >
          <template #default="{ row }">
            {{
              data.viceStatusList[row.viceStatus - 1]
                ? data.viceStatusList[row.viceStatus - 1]
                : "-"
            }}
          </template>
        </ElTableColumn>
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
