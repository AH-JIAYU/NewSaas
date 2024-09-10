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
const countryList: any = ref([]); //所有国家一维
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
const border = ref(true);
const checkList = ref<any>([]);
const tableAutoHeight = ref(false); // 表格控件-高度自适应
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
    prop: "participation",
    label: "参数",
    sortabel: true,
    checked: true,
  },
  {
    prop: "withoutUrl",
    label: "URL",
    sortabel: true,
    checked: true,
  },
  { prop: "doMoneyPrice", label: "原价", sortabel: true, checked: true },
  { prop: "memberPrice", label: "会员价", sortabel: true, checked: true },
  { prop: "countryNameList", label: "国家", sortabel: true, checked: true },
  { prop: "ir", label: "IR/NIR", sortabel: true, checked: true },
  { prop: "memberStatus", label: "分配", sortabel: true, checked: true },
  { prop: "createTime", label: "创建", sortabel: true, checked: true },
]);
// 查询参数
const queryForm = reactive<any>({
  projectId: "", //项目id-模糊查询
  projectName: "", //项目名称-模糊查询
  projectIdentification: "", //	项目标识模糊查询
  clientId: "", //	所属客户编号Id
  countryId: [], //所属国家编号Id
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
// 会员价
function membershipPrice(row: any) {
  checkMembershipPriceRef.value.showEdit(row);
}
// 配额
// function tested(row: any) {
//   console.log("测查");
// }
// 分配
function distribution(row: any) {
  addAllocationEditRef.value.showEdit(row);
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
    countryId: [], //所属国家编号Id
    b2bOrB2cStatus: null, //1:b2b的项目 2:b2c的项目,不传查询所有
    time: [], // 时间
    beginTime: "", //开始时间
    endTime: "", //	结束时间
  });
  fetchData();
}
// // 分页 后端(刘):这块不好做分页，所有返回全部数据，前端做分页
// const DataList = computed(() => {
//   return list.value.slice(
//     (pagination.value.page - 1) * pagination.value.size,
//     pagination.value.page * pagination.value.size
//   );
// });
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
// 复制ID
const svgClick = (id: any) => {
  toClipboard(id);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
}
// 具体的位置信息
const comCountryId = computed(() => (countryIdList: any) => {
  const list = countryList.value
    .filter((item: any) => countryIdList.includes(item.id))
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
});
</script>

<template>
  <div :class="{
    'absolute-container': tableAutoHeight,
  }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form :model="queryForm.select" size="default" label-width="100px" inline-message inline
            class="search-form">
            <el-form-item label="">
              <el-input v-model="queryForm.projectId" clearable placeholder="项目ID" @keydown.enter="currentChange()" />
            </el-form-item>
            <el-form-item label="">
              <el-input clearable v-model="queryForm.projectName" placeholder="项目名称" @keydown.enter="currentChange()" />
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="queryForm.projectIdentification" clearable placeholder="项目标识"
                @keydown.enter="currentChange()" />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="国家地区" v-model="queryForm.countryId" clearable filterable multiple collapse-tags
                @change="currentChange()">
                <ElOption v-for="item in countryList" :label="item.chineseName" :value="item.id"></ElOption>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="客户简称" clearable filterable v-model="queryForm.clientId" @change="currentChange()">
                <el-option v-for="item in customerList" :key="item.tenantCustomerId" :value="item.tenantCustomerId"
                  :label="item.customerAccord"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="B2B/B2C" clearable filterable v-model="queryForm.b2bOrB2cStatus"
                @change="currentChange()">
                <el-option label="B2B" value="1"> </el-option>
                <el-option label="B2C" value="2"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker v-model="queryForm.time" type="datetimerange" unlink-panels range-separator="-"
                start-placeholder="创建开始日期" end-placeholder="创建结束日期" size="default" value-format="YYYY-MM-DD HH:mm:ss"
                style="width: 192px" clear-icon="true" @change="currentChange()" />
            </el-form-item>
            <ElFormItem>
              <ElButton type="primary" @click="fetchData()">
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
                  <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                </template>
                {{ fold ? "展开" : "收起" }}
              </ElButton>
            </ElFormItem>
          </el-form>
        </template>
      </SearchBar>
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
        :border="border" :size="lineHeight" :stripe="stripe">
        <el-table-column align="center" type="selection" />
        <!-- <el-table-column v-if="checkList.includes('projectId')" show-overflow-tooltip width="180" fixed="left"
          prop="projectId" align="center" label="项目ID" /> -->
        <el-table-column v-if="checkList.includes('project')" show-overflow-tooltip align="center"
          prop="projectIdentificationOrClientName" width="200" label="项目">
          <template #default="{ row }">
            <p v-if="checkList.includes('projectName')" class="crudeTop">名称：{{ row.projectName }}</p>
            <div class="hoverSvg">
              <p v-if="checkList.includes('projectId')" class="fineBom">ID：{{ row.projectId }}</p>
              <span>
                <svg
                @click="svgClick(row.projectId)" class="svg" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                viewBox="0 0 14 14" fill="none">
                <g id="Frame 3475223">
                  <g id="Frame" clip-path="url(#clip0_450_48083)">
                    <path id="Vector"
                      d="M10.7625 2.1875H0.9625C0.4375 2.1875 0 2.625 0 3.15V12.95C0 13.475 0.4375 13.9125 0.9625 13.9125H10.7625C11.2875 13.9125 11.725 13.475 11.725 12.95V3.15C11.6375 2.625 11.2875 2.1875 10.7625 2.1875ZM8.3125 10.2375H3.4125C3.15 10.2375 2.8875 9.975 2.8875 9.7125C2.8875 9.45 3.0625 9.1 3.4125 9.1H8.3125C8.575 9.1 8.8375 9.3625 8.8375 9.625C8.8375 9.975 8.6625 10.2375 8.3125 10.2375ZM8.3125 6.9125H3.4125C3.15 6.9125 2.8875 6.65 2.8875 6.3875C2.8875 6.125 3.0625 5.775 3.4125 5.775H8.3125C8.575 5.775 8.8375 6.0375 8.8375 6.3C8.8375 6.65 8.6625 6.9125 8.3125 6.9125Z"
                      fill="#409EFF" />
                    <path id="Vector_2"
                      d="M12.95 0H2.8C2.1875 0 1.75 0.4375 1.75 1.05V1.3125H10.85C11.8125 1.3125 12.6 2.1 12.6 3.0625V12.25H12.95C13.5625 12.25 14 11.8125 14 11.2V1.05C14 0.4375 13.5625 0 12.95 0Z"
                      fill="#409EFF" />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_450_48083">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              </span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column v-if="checkList.includes('projectName')" show-overflow-tooltip width="180" prop="projectName"
          align="center" label="项目名称" /> -->
        <el-table-column v-if="checkList.includes('projectIdentificationOrClientName')" show-overflow-tooltip
          prop="projectIdentificationOrClientName" width="180" align="center" label="名称/标识">
          <template #default="{ row }">
            <p v-if="checkList.includes('projectIdentification')" class="crudeTop" >
              名称：{{ row.projectIdentification }}</p>
            <p v-if="checkList.includes('projectIdClientName')" class="fineBom" >标识：{{
    row.clientName }}</p>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('participation')" show-overflow-tooltip width="180" align="center"
          label="参数">
          <template #default="{ row }">
            <p class="parameter"><el-text class="mx-1 text" style="color:#FB6868;" type="danger">参与：{{ row.participation
    || 0 }}</el-text><el-text class="mx-1 text" style="color:#03C239;" type="success">完成：{{
    row.complete || 0
  }}</el-text></p>
            <p class="parameter"><el-text class="mx-1 text" style="color:#FFAC54;" type="warning">配额：{{ row.num || 0
                }}</el-text><el-text class="mx-1 text" style="color:#AAAAAA;" type="info">限量：{{ row.limitedQuantity || 0
                }}</el-text></p>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('withoutUrl')" prop="withoutUrl" align="center" label="URL">
          <template #default="{ row }">
            <el-tooltip class="box-item" effect="dark" :content="row.withoutUrl" placement="top">
              <el-button link type="primary" @click="copyUrl(row.withoutUrl)">复制</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('doMoneyPrice')" show-overflow-tooltip align="center" label="原价">
          <template #default="{ row }">
            <el-text v-if="countryType === 3" class="mx-1">暂无数据</el-text>
            <el-text v-else class="mx-1">
              <el-text style="color: #FD8989;">
                <CurrencyType />
              </el-text>{{ row.doMoneyPrice || 0 }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberPrice')" show-overflow-tooltip align="center" label="会员价">
          <template #default="{ row }">
            <el-link v-if="row.getMemberGroupNameInfoList.length" size="small" plain type="primary"
              @click="membershipPrice(row)">
              查看
            </el-link>
            <el-text v-else> - </el-text>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('countryNameList')" show-overflow-tooltip align="center" label="国家">
          <template #default="{ row }">
            <template v-if="row.countryNameList">
              <template v-if="row.countryNameList.length === basicDictionaryStore.country.length">
                <el-link type="primary"><el-tag type="warning">全球</el-tag></el-link>
              </template>
              <template v-else-if="comCountryId(row.countryNameList).length > 4">
                <el-tooltip class="box-item" effect="dark" :content="comCountryId(row.countryNameList).join(',')"
                  placement="top">
                  <el-link type="primary"><el-tag type="success">{{
    comCountryId(row.countryNameList).length
  }}</el-tag></el-link>
                </el-tooltip>
              </template>
              <template v-else>
                <el-tag type="primary">
                  x{{ comCountryId(row.countryNameList).length }}
                </el-tag>
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('ir')" show-overflow-tooltip align="center" label="IR/NIR">
          <template #default="{ row }"> {{ row.ir ? row.ir : '-' }} / {{ row.nir ? row.nir : '-' }} </template>
        </el-table-column>
        <el-table-column v-if="checkList.includes('memberStatus')" show-overflow-tooltip align="center" label="分配">
          <template #default="{ row }">
            <el-tag style="background-color: #05C9BE;color: #fff;" v-if="row.getMemberGroupNameInfoList.length">
              会员组
            </el-tag>
            <el-tag effect="plain" type="info" v-else> 未分配 </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column v-if="checkList.includes('memberGroupName')" show-overflow-tooltip align="center" label="分配目标">
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
        <el-table-column v-if="checkList.includes('createTime')" show-overflow-tooltip prop="createTime" align="center"
          label="创建">
          <template #header>
            <span class="headerIcon">
              <svg class="timeSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g id="Time (æ¶é´)">
                  <path id="Vector"
                    d="M7.9987 14.6666C11.6806 14.6666 14.6654 11.6818 14.6654 7.99992C14.6654 4.31802 11.6806 1.33325 7.9987 1.33325C4.3168 1.33325 1.33203 4.31802 1.33203 7.99992C1.33203 11.6818 4.3168 14.6666 7.9987 14.6666Z"
                    fill="#409EFF" />
                  <path id="Vector_2" d="M8.00431 4L8.00391 8.00293L10.8304 10.8294" stroke="white" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
              创建
            </span>
          </template>
          <template #default="{ row }">
            <el-tag effect="plain" type="info">{{
    format(row.createTime)
  }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template #default="{ row }">
            <ElSpace>
              <el-button type="primary" v-if="!row.getMemberGroupNameInfoList.length" plain size="small"
                @click="distribution(row)">
                分配
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
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fineBom {
  text-align: left !important;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hoverSvg {
  display: flex;
  align-items: center;
}
.hoverSvg:hover .svg {
  display: block;
}

.svg {
  display: none;
  width: 14px;
  height: 14px;
  margin-left: 5px;
}

.parameter {
  text-align: left !important;
}

.text {
  display: inline-block;
  min-width: 4.375rem;
}
.headerIcon {
  display:flex;
  align-items: center;
  justify-content: center;
  .timeSvg {
    margin-right: 4px;
  }
}
</style>
