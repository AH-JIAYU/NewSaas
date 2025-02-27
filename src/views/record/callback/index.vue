<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/record_callback";
import empty from "@/assets/images/empty.png";
import { useI18n } from "vue-i18n";
defineOptions({
  name: "callback",
});

const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
const { t } = useI18n(); // 国际化
// 时间
const { format } = useTimeago();
const listLoading = ref(false);
const list = ref<Array<Object>>([]); // 列表
const selectRows = ref(""); // 表格-选中行
const checkList = ref<Array<Object>>([]); // 表格-展示的列
const border = ref(true); // 表格控件-是否展示边框
const stripe = ref(true); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-callback"); // 表单排序name
const columns = ref([
  // 表格控件-展示列
  {
    prop: "projectQuestionnaireClickId",
    label: computed(() => t("callback.clickID")),
    sortable: true,
    checked: true,
  },
  {
    label: computed(() => t("callback.vipType")),
    prop: "surveySource",
    sortable: true,
    checked: true,
  },
  {
    label: computed(() => t("callback.clientID")),
    prop: "clientId",
    sortable: true,
    checked: true,
  },
  {
    prop: "customerShortName",
    label: computed(() => t("callback.customerAbbreviation")),
    sortable: true,
    checked: true,
  },
  {
    prop: "memberChildId",
    label: computed(() => t("callback.vipSubVipId")),
    sortable: true,
    checked: true,
  },
  {
    prop: "projectId",
    label: computed(() => t("callback.projectID")),
    sortable: true,
    checked: true,
  },
  {
    prop: "projectName",
    label: computed(() => t("callback.projectName")),
    sortable: true,
    checked: true,
  },
  {
    prop: "callbackUrl",
    label: computed(() => t("callback.callbackUrl")),
    sortable: true,
    checked: true,
  },
  {
    prop: "subordinateUrl",
    label: computed(() => t("callback.subordinateUrl")),
    sortable: true,
    checked: true,
  },
  {
    prop: "sourceUrl",
    label: computed(() => t("callback.source")),
    sortable: true,
    checked: true,
  },
  {
    prop: "callbackTime",
    label: computed(() => t("callback.callbackTime")),
    sortable: true,
    checked: true,
  },
  {
    prop: "callbackStatus",
    label: computed(() => t("callback.callbackStatus")),
    sortable: true,
    checked: true,
  },
]);
// 会员类型
const memberType = [
  { label: computed(() => t("callback.internalVip")), value: 1 },
  { label: computed(() => t("callback.externalVip")), value: 2 },
];
//回调状态1:成功 2:回调id不对 3:加密hash不对
type TagType = "success" | "warning" | "info" | "primary" | "danger";
const callbackStatus: { label: string; value: number; type: TagType }[] = [
  { label: t("callback.all"), value: 0, type: "info" },
  { label: t("callback.success"), value: 1, type: "success" },
  { label: t("callback.idWrong"), value: 2, type: "warning" },
  { label: t("callback.hashWrong"), value: 3, type: "danger" },
];



const queryForm = reactive<any>({
  // 请求接口携带参数
  time: [],
  beginTime: "", //	开始时间
  endTime: "", //	结束时间
  surveySource: "", //	会员类型
  projectId: "", //项目Id
  projectName: "", //	项目名称
  memberChildId: "", //	子会员id/会员id
  tenantSupplierId: "", //	供应商id
  clientId: "", //客户id
  callbackStatus: 0, //回调状态
});

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 重置请求
function queryData() {
  pagination.value.page = 1;
  fetchData();
}
// 回调自有客户
const clientIdOptions: { label: string; value: string }[] = [];
//回调记录
const  getCustomer =async()=> {
  clientIdOptions.length = 0;
  const ress = await api.getCustomerCooperation({});

// if (ress.data && ress.data.getCooperationInfoLists ) {
//   ress.data.getCooperationInfoLists.forEach(
//     (item:any) => {
//       clientIdOptions.push({
//         label: item.tenantName,
//         value: item.tenantId,
//       });
//     },
//   );
// }
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
    delete params.time;
    const res = await api.list(params);

    list.value = res.data.customerCallbackRecordInfoList;
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
    time: [],
    beginTime: "", //	开始时间
    endTime: "", //	结束时间
    surveySource: "", //会员类型
    projectId: "", //项目Id
    projectName: "", //	项目名称
    memberChildId: "", //	子会员id/会员id
    tenantSupplierId: "", //	供应商id
    callbackStatus: 0, //回调状态
    clientId: "",
  });
  fetchData();
}
// 表格-单选框
function setSelectRows(val: string) {
  selectRows.value = val;
}

onMounted(async () => {
  columns.value.forEach((item) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  getCustomer()
  fetchData();
  formSearchList.value = [
    {
      index: 3,
      show: true,
      type: "input",
      modelName: "projectQuestionnaireClickId",
      placeholder: computed(() => t("callback.clickID")),
    },
    {
      index: 1,
      show: true,
      type: "input",
      modelName: "tenantSupplierId",
      placeholder: computed(() => t("callback.supplierID")),
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "projectId",
      placeholder: computed(() => t("callback.projectID")),
    },
    {
      index: 3,
      show: true,
      type: "select",
      modelName: "clientId",
      placeholder: computed(() => t("callback.clientID")),
      option: "clientIdOptions",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 4,
      show: true,
      type: "select",
      modelName: "surveySource",
      placeholder: computed(() => t("callback.vipType")),
      option: "surveySource",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 5,
      show: true,
      type: "input",
      modelName: "projectName",
      placeholder: computed(() => t("callback.projectName")),
    },
    {
      index: 6,
      show: true,
      type: "input",
      modelName: "memberChildId",
      placeholder: computed(() => t("callback.vipSubVipId")),
    },
    {
      index: 7,
      show: true,
      type: "select",
      modelName: "callbackStatus",
      placeholder: computed(() => t("callback.callbackStatus")),
      option: "callbackStatus",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 8,
      show: true,
      type: "datetimerange",
      modelName: "time",
      startPlaceHolder: computed(() => t("callback.startDate")),
      endPlaceHolder: computed(() => t("callback.endDate")),
    },
  ];
});
const formOption = {
  surveySource: () => memberType,
  callbackStatus: () => callbackStatus,
  clientIdOptions: () => clientIdOptions, // 添加 clientId 选项列表
};
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
          <el-button size="default"> {{ t("callback.export") }} </el-button>
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
        <!-- <el-table-column align="left" type="selection" /> -->
        <el-table-column
          v-if="checkList.includes('projectQuestionnaireClickId')"
          align="left"
          prop="projectQuestionnaireClickId"
          show-overflow-tooltip
          :label="t('callback.clickID')"
        >
          <template #default="{ row }">
            {{
              row.projectQuestionnaireClickId
                ? row.projectQuestionnaireClickId
                : "-"
            }}
          </template>
        </el-table-column>
        <el-table-column
          :label="t('callback.project')"
          width="300"
          align="center"
        >
          <template #default="{ row }">
            {{ row.customerShortName }} <br />
            {{ row.projectName }} <br />
            {{ row.projectId }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberChildId')"
          align="center"
          show-overflow-tooltip
          :label="t('callback.vipSubVipId')"
        >
          <template #default="{ row }">
            <p>{{ memberType[row.surveySource - 1].label }}</p>
            {{ row.memberChildId }} <br />
            {{ row.randomIdentityId }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('clientId')"
          align="center"
          show-overflow-tooltip
          :label="t('callback.clientID')"
        >
          <template #default="{ row }">
            {{ row.clientId }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('callbackUrl')"
          align="left"
          prop="callbackUrl"
          :label="t('callback.callbackUrl')"
        />
        <el-table-column
          v-if="checkList.includes('subordinateUrl')"
          align="left"
          prop="subordinateUrl"
          :label="t('callback.subordinateUrl')"
          ><template #default="{ row }">
            {{ row.subordinateUrl ? row.subordinateUrl : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('sourceUrl')"
          align="left"
          prop="sourceUrl"
          :label="t('callback.source')"
          ><template #default="{ row }">
            {{ row.sourceUrl ? row.sourceUrl : "-" }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('callbackTime')"
          align="left"
          prop="callbackTime"
          show-overflow-tooltip
          :label="t('callback.callbackTime')"
          width="200"

          ><template #default="{ row }">
           {{ row.callbackTime ? row.callbackTime : "-" }}
            <!-- <el-tag effect="plain" type="info">{{
              format(row.callbackTime)
            }}</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('callbackStatus')"
          align="left"
          prop="callbackStatus"
          show-overflow-tooltip
          :label="t('callback.callbackStatus')"
        >

          <template #default="{ row }">
            <el-tag
              v-if="row.callbackStatus && callbackStatus[row.callbackStatus]"
              :type="callbackStatus[row.callbackStatus].type"
            >
              {{ callbackStatus[row.callbackStatus].label }}
            </el-tag>
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
