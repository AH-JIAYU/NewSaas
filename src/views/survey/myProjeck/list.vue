<script setup lang="ts">
import checkEdit from "./components/checkEdit/index.vue";
import Detail from "./components/Detail/index.vue";
import checkMembershipPrice from "./components/checkMembershipPrice/index.vue";
import allocationEdit from "./components/AllocationEdit/index.vue";
import api from "@/api/modules/survey_myProjeck";
import { ElMessage } from "element-plus";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import useClipboard from "vue-clipboard3"; // 复制 js库
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "myProjeck",
});
// 时间
const { format } = useTimeago();
const { toClipboard } = useClipboard();
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const customerStore = useUserCustomerStore(); // 客户
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const countryList: any = ref([]); //所有区域一维
const customerList: any = ref([]); //客户列表
// 货币类型
const countryType = ref<any>();
const tableSortRef = ref("");
const detailRef = ref<any>();
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const CheckEditRef = ref<any>();
const checkMembershipPriceRef = ref<any>();
// 右侧工具栏配置变量
const border = ref(false);
const checkList = ref<any>([]);
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const formSearchList = ref<any>()//表单排序配置
const formSearchName = ref<string>('formSearch-myProjeck')// 表单排序name
// 表格控件-控制全屏
const lineHeight = ref<any>("default");
const stripe = ref(false);
const columns = ref<any>([
  { prop: "project", label: "项目", sortabel: true, checked: true },
  { prop: "projectId", label: "项目ID", sortabel: true, checked: true },
  { prop: "projectName", label: "项目名称", sortabel: true, checked: true },
  {
    prop: "projectIdentificationOrClientName",
    label: "名称/标识",
    sortabel: true,
    checked: true,
  },
  {
    prop: "projectIdentification",
    label: "名称",
    sortabel: true,
    checked: true,
  },
  {
    prop: "projectIdClientName",
    label: "标识",
    sortabel: true,
    checked: true,
  },
  {
    prop: "withoutUrl",
    label: "URL",
    sortabel: true,
    checked: true,
  },
  {
    prop: "participation",
    label: "参数",
    sortabel: true,
    checked: true,
  },
  { prop: "doMoneyPrice", label: "项目价", sortabel: true, checked: true },
  { prop: "memberPrice", label: "成本价(会员)", sortabel: true, checked: true },
  { prop: "countryNameList", label: "区域", sortabel: true, checked: true },
  { prop: "ir", label: "IR/NIR", sortabel: true, checked: true },
  { prop: "memberStatus", label: "分配", sortabel: true, checked: true },
  { prop: "createTime", label: "创建时间", sortabel: true, checked: true },
]);
// 查询参数
const queryForm = reactive<any>({
  projectId: "", //项目id-模糊查询
  projectName: "", //项目名称-模糊查询
  projectIdentification: "", //	项目标识模糊查询
  clientId: "", //	所属客户编号Id
  countryId: [], //所属区域编号Id
  b2bOrB2cStatus: "", //1:b2b的项目 2:b2c的项目,不传查询所有
  time: [], // 时间
  beginTime: "", //开始时间
  endTime: "", //	结束时间
});
const list = ref<any>([]);
const addAllocationEditRef = ref();
// 配额
function check(row: any) {
  detailRef.value.showEdit(row);
}
// 成本价(会员)
function membershipPrice(row: any) {
  checkMembershipPriceRef.value.showEdit(row);
}
// 配额
// function tested(row: any) {
// }
// 分配
function distribution(row: any) {
  addAllocationEditRef.value.showEdit(row, "distribution");
}

// 重新分配
function reassign(row: any) {
  addAllocationEditRef.value.showEdit(row, "reassign");
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
  Object.assign(queryForm, {
    projectId: "", //项目id-模糊查询
    projectName: "", //项目名称-模糊查询
    projectIdentification: "", //	项目标识模糊查询
    clientId: "", //	所属客户编号Id
    countryId: [], //所属区域编号Id
    b2bOrB2cStatus: null, //1:b2b的项目 2:b2c的项目,不传查询所有
    time: [], // 时间
    beginTime: "", //开始时间
    endTime: "", //	结束时间
  });
  fetchData();
}
// 获取列表
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
    if (!Array.isArray(queryForm.countryId) && queryForm.countryId) {
      params.countryId = [queryForm.countryId];
    } else {
      params.countryId = []
    }
    delete params.time
    const res = await api.list(params);
    countryType.value = res.data.currencyType;
    list.value = res.data.getMemberProjectListInfoList;
    pagination.value.total = res.data.total;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}
// 复制地址
const copyUrl = (text: any) => {
  toClipboard(text);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
};
//表格当前选中
const current = ref<any>()
function handleCurrentChange(val: any) {
  current.value = val.projectId
}
// 具体的位置信息
const comCountryId = computed(() => (countryIdList: any) => {
  const list = countryList.value
    .filter((item: any) => countryIdList?.includes(item.id))
    .map((item: any) => item.chineseName);
  return list;
});
onMounted(async () => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      checkList.value.push(item.prop);
    }
  });
  countryList.value = await basicDictionaryStore.getCountry();
  customerList.value = await customerStore.getCustomerList();
  fetchData();
  formSearchList.value = [
    { index: 1, show: true, type: 'input', modelName: 'projectId', placeholder: '项目ID' },
    { index: 2, show: true, type: 'input', modelName: 'projectName', placeholder: '项目名称' },
    { index: 3, show: true, type: 'input', modelName: 'projectIdentification', placeholder: '项目标识' },
    { index: 4, show: true, type: 'select', modelName: 'countryId', placeholder: '区域地区', option: 'global', optionLabel: 'chineseName', optionValue: 'id' },
    { index: 5, show: true, type: 'select', modelName: 'clientId', placeholder: '客户简称', option: 'clientId', optionLabel: 'customerAccord', optionValue: 'tenantCustomerId' },
    { index: 6, show: true, type: 'select', modelName: 'b2bOrB2cStatus', placeholder: 'B2B/B2C', option: 'b2bOrB2cStatus', optionLabel: 'label', optionValue: 'value' },
    { index: 7, show: true, type: 'datetimerange', modelName: 'time', startPlaceHolder: '创建开始日期', endPlaceHolder: '创建结束日期' },
  ];
});
const formOption = {
  clientId: () => customerList.value,
  b2bOrB2cStatus: () => [{ label: 'B2B', value: 1 }, { label: 'B2C', value: 2 }],
}
</script>

<template>
  <div :class="{
    'absolute-container': tableAutoHeight,
  }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange"
        @onReset="onReset" :model="queryForm" :formOption="formOption" />
      <ElDivider border-style="dashed" />
      <el-row :gutter="24">
        <FormLeftPanel />
        <FormRightPanel>
          <el-button size="default" @click=""> 导出 </el-button>
          <TabelControl v-model:border="border" v-model:tableAutoHeight="tableAutoHeight" v-model:checkList="checkList"
            v-model:columns="columns" v-model:line-height="lineHeight" v-model:stripe="stripe" style="margin-left: 12px"
            @query-data="currentChange" />
        </FormRightPanel>
      </el-row>
      <el-table ref="tableSortRef" v-loading="listLoading" style="margin-top: 10px" row-key="id" :data="list"
        :border="border" :size="lineHeight" :stripe="stripe" @current-change="handleCurrentChange"
        highlight-current-row>
        <el-table-column align="left" type="selection" />
        <el-table-column v-if="checkList.includes('project')" show-overflow-tooltip align="left"
          prop="projectIdentificationOrClientName" width="200" label="项目">
          <template #default="{ row }">
            <!-- <p v-if="checkList.includes('projectName')" class="crudeTop">名称：{{ row.projectName }}</p> -->
            <div v-if="checkList.includes('projectId')" class="hoverSvg">
              <p class="fineSize">{{ row.projectId }}</p>
              <copy :content="row.projectId" :class="{
    rowCopy: 'rowCopy',
    current: row.projectId === current,
  }" />
              <!-- <copy class="copy" :content="row.projectId" /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('projectIdentificationOrClientName')" show-overflow-tooltip
          prop="projectIdentificationOrClientName" width="200" align="left" label="名称/标识">
          <template #default="{ row }">
            <p v-if="checkList.includes('projectName')" class="crudeTop">
             {{ row.projectName }}</p>
            <p v-if="checkList.includes('projectIdentification')"
              style="text-align: left !important;color: #333333;"><span class="fineBom">{{
      row.projectIdentification }}</span></p>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('withoutUrl')" width="260" prop="withoutUrl" align="left" label="URL">
          <template #default="{ row }">
            <el-tooltip class="box-item" effect="dark" :content="row.withoutUrl" placement="top">
              <!-- <el-button link type="primary" @click="copyUrl(row.withoutUrl)">复制</el-button> -->
              <div class="hoverSvg">
                <p class="withoutUrlSize">{{ row.withoutUrl }}</p>
                <copy :content="row.withoutUrl" :class="{
    rowCopy: 'rowCopy',
    current: row.projectId === current,
  }" />
                <!-- <copy class="copy" :content="row.withoutUrl" /> -->
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('participation')" show-overflow-tooltip width="200" align="left"
          label="参数">
          <template #default="{ row }">
            <p class="parameter oneLine"><el-text class="mx-1 oneLine" style="color:#FB6868;" type="danger">参与：{{
    row.participation
    || 0 }}</el-text><el-text class="mx-1 oneLine" style="color:#03C239;" type="success">完成：{{
    row.complete || 0
  }}</el-text>
              <el-text class="mx-1 oneLine" style="color:#FFAC54;" type="warning">配额：{{ row.num || 0
                }}</el-text><el-text class="mx-1 oneLine" style="color:#AAAAAA;" type="info">限量：{{ row.limitedQuantity
    || 0
                }}</el-text>
            </p>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('doMoneyPrice')" show-overflow-tooltip align="left" label="项目价">
          <template #default="{ row }">
            <el-text v-if="countryType === 3" class="mx-1">暂无数据</el-text>
            <el-text v-else class="mx-1">
              <svg v-if="row.currencyType === 'USD'" xmlns="http://www.w3.org/2000/svg" width="7" height="12"
                  viewBox="0 0 7 12" fill="none">
                  <path id="Vector"
                    d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                    fill="#333333" />
                </svg>
                <svg v-if="row.currencyType === 'CNY'" xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
                  <path id="Vector"
                    d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                    fill="#333333" />
                </svg>
                <CurrencyType v-if="!row.currencyType" />
              <!-- <el-text style="color: #FD8989;">
                <CurrencyType />
              </el-text> -->
              <el-text style="color: #333333;">
                {{ row.doMoneyPrice || 0 }}
              </el-text>
            </el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberPrice')" show-overflow-tooltip align="left" label="成本价(会员)" width="130">
          <template #default="{ row }">
            <el-link v-if="row.getMemberGroupNameInfoList.length" size="small" plain type="primary"
              @click="membershipPrice(row)">
              查看
            </el-link>
            <el-text v-else> - </el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('countryNameList')" show-overflow-tooltip align="left" label="区域">
          <template #default="{ row }">
            <template v-if="row.countryNameList">
              <template v-if="row.countryNameList.length === basicDictionaryStore.country.length">
                <el-tag type="primary">全球</el-tag>
              </template>
              <template v-else-if="comCountryId(row.countryNameList).length > 1">
                <el-tooltip class="box-item" effect="dark" :content="comCountryId(row.countryNameList).join(',')"
                  placement="top">
                  <el-link type="primary"><el-tag type="primary">x{{
    comCountryId(row.countryNameList).length
  }}</el-tag></el-link>
                </el-tooltip>
              </template>
              <template v-else>
                <el-tag v-for="item in comCountryId(row.countryNameList)" :key="item" type="primary">
                  {{ item }}
                </el-tag>
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('ir')" show-overflow-tooltip align="left" label="IR/NIR">
          <template #default="{ row }"><el-text style="color: #333333;font-family: DINPro-Medium;">
              {{ row.ir ? row.ir : '-' }} / {{ row.nir ? row.nir : 0 }}
            </el-text></template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberStatus')" show-overflow-tooltip align="left" label="分配" width="90">
          <template #default="{ row }" >
            <el-tag style="background-color: #05C9BE;color: #fff;" v-if="row.getMemberGroupNameInfoList.length">
              部门
            </el-tag>
            <el-tag effect="plain" type="info" v-else> 未分配 </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column v-if="checkList.includes('memberGroupName')" show-overflow-tooltip align="left" label="分配目标">
          <template #default="{ row }">
            <el-tooltip class="box-item" effect="dark" placement="top" v-if="row.getMemberGroupNameInfoList.length">
              <template #content>
                <div v-for="item in row.getMemberGroupNameInfoList">
                  {{ item.memberGroupName }}-{{ item.memberGroupId }}
                </div>
              </template>
              <el-link type="primary">{{
    row.getMemberGroupNameInfoList.length
  }}</el-link>
            </el-tooltip>
            <el-link v-else>-</el-link>
          </template>
        </el-table-column> -->
        <el-table-column v-if="checkList.includes('createTime')" show-overflow-tooltip prop="createTime" align="left"
          label="创建时间" width="110">
          <template #default="{ row }">
            <el-tooltip :content="row.createTime" placement="top">
              <el-tag effect="plain" type="info">{{ format(row.createTime) }}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="left" fixed="right" label="操作" width="200">
          <template #default="{ row }">
            <ElSpace>
              <el-button type="primary" v-if="row.allocationStatus === 1" :disabled="row.isOnline === 2" plain
                size="small" @click="distribution(row)">
                分配
              </el-button>
              <el-button v-else plain type="primary" :disabled="row.isOnline === 2" size="small" @click="reassign(row)">
                重新分配
              </el-button>
              <!-- <el-button type="primary" plain size="small" @click="tested(row)">
                测查
              </el-button> -->
              <el-button size="small" plain type="warning" @click="check(row)">
                配额
              </el-button>
            </ElSpace>
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
    <checkEdit ref="CheckEditRef" />
    <Detail ref="detailRef" />
    <checkMembershipPrice ref="checkMembershipPriceRef" />
    <allocationEdit ref="addAllocationEditRef" @fetchData="fetchData" />
  </div>
</template>

<style scoped lang="scss">
.copyId .projectId {
  font-size: 14px;
}

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

.crudeTop {
  text-align: left !important;
  color: #333333;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fineBom {
  color: #333333;
  font-size: .875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fineSize {
  color: #333333;
  font-size: .875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.withoutUrlSize {
  color: #333;
  font-size: .875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hidden {
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

// 参数
.parameter {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;

  .oneLine {
    width: 40%;
    text-align: left;
    margin: 0 12px 8px 0
  }

  .oneLine:nth-of-type(n+3) {
    margin: 0 12px 0 0
  }
}

.text {
  display: inline-block;
  min-width: 4.375rem;
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

// .copySvg {
//   width: 100%;
//   height: 100%;
// }</style>
