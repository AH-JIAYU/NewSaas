<script setup lang="ts">
import checkEdit from "./components/checkEdit/index.vue";
import checkMembershipPrice from "./components/checkMembershipPrice/index.vue";
import allocationEdit from "./components/AllocationEdit/index.vue";
import api from "@/api/modules/survey_myProjeck";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户

defineOptions({
  name: "SurveyMyProjeckList",
});
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const customerStore = useUserCustomerStore(); // 客户
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const countryList: any = ref([]); //所有国家一维
const customerList: any = ref([]); //客户列表
// 货币类型
const countryType = ref<any>();
const tableSortRef = ref("");
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
  { prop: "projectId", label: "项目Id", sortabel: true, checked: true },
  { prop: "projectName", label: "项目名称", sortabel: true, checked: true },
  {
    prop: "projectIdentificationOrClientName",
    label: "项目标识",
    sortabel: true,
    checked: true,
  },
  {
    prop: "participation",
    label: "参与/完成/配额/限量",
    sortabel: true,
    checked: true,
  },
  { prop: "doMoneyPrice", label: "原价", sortabel: true, checked: true },
  { prop: "memberPrice", label: "会员价", sortabel: true, checked: true },
  { prop: "ir", label: "IR/NIR", sortabel: true, checked: true },
  { prop: "countryNameList", label: "国家地区", sortabel: true, checked: true },
  { prop: "memberStatus", label: "分配状态", sortabel: true, checked: true },
  { prop: "memberGroupName", label: "分配目标", sortabel: true, checked: true },
  { prop: "createTime", label: "创建时间", sortabel: true, checked: true },
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
// 详情
function check(row: any) {
  console.log("详情");
  // CheckEditRef.value.showEdit(row);
}
// 会员价
function membershipPrice(row: any) {
  checkMembershipPriceRef.value.showEdit(row);
}
// 配额
function tested(row: any) {
  console.log("测查");
}
// 分配
function distribution(row: any) {
  console.log("分配");
  addAllocationEditRef.value.showEdit(row);
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size);
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page);
}
// 重置数据
function onReset() {
  Object.assign(queryForm, {
    projectId: "", //项目id-模糊查询
    projectName: "", //项目名称-模糊查询
    projectIdentification: "", //	项目标识模糊查询
    clientId: "", //	所属客户编号Id
    countryId: [], //所属国家编号Id
    b2bOrB2cStatus: 0, //1:b2b的项目 2:b2c的项目,不传查询所有
    time: [], // 时间
    beginTime: "", //开始时间
    endTime: "", //	结束时间
  });
  fetchData();
}
// 分页 后端(刘):这块不好做分页，所有返回全部数据，前端做分页
const DataList = computed(() => {
  return list.value.slice(
    (pagination.value.page - 1) * pagination.value.size,
    pagination.value.page * pagination.value.size
  );
});
// 获取列表
async function fetchData() {
  listLoading.value = true;
  const params = {
    ...queryForm,
  };
  if (queryForm.time && !!queryForm.time.length) {
    params.beginTime = queryForm.time[0] || "";
    params.endTime = queryForm.time[1] || "";
  }
  const res = await api.list(params);
  countryType.value = res.data.currencyType;
  list.value = res.data.getMemberProjectListInfoList;
  pagination.value.total = res.data.getMemberProjectListInfoList.length;
  listLoading.value = false;
}

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
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <el-form
            :model="queryForm.select"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <el-form-item label="">
              <el-input
                v-model="queryForm.projectId"
                clearable
                placeholder="项目ID"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                clearable
                v-model="queryForm.projectName"
                placeholder="项目名称"
              />
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="queryForm.projectIdentification"
                clearable
                placeholder="项目标识"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                placeholder="国家地区"
                v-model="queryForm.countryId"
                clearable
                filterable
                multiple
                collapse-tags
              >
                <ElOption
                  v-for="item in countryList"
                  :label="item.chineseName"
                  :value="item.id"
                ></ElOption>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select placeholder="客户简称" v-model="queryForm.clientId">
                <el-option
                  v-for="item in customerList"
                  :key="item.tenantCustomerId"
                  :value="item.tenantCustomerId"
                  :label="item.customerAccord"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold" label="">
              <el-select
                placeholder="B2B/B2C"
                v-model="queryForm.b2bOrB2cStatus"
              >
                <el-option label="全部" value=""> </el-option>
                <el-option label="B2B" value="1"> </el-option>
                <el-option label="B2C" value="2"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!fold">
              <el-date-picker
                v-model="queryForm.time"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="创建开始日期"
                end-placeholder="创建结束日期"
                size="default"
                style="width: 192px"
                clear-icon="true"
              />
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
                  <SvgIcon
                    :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                  />
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
          <TabelControl
            v-model:border="border"
            v-model:tableAutoHeight="tableAutoHeight"
            v-model:checkList="checkList"
            v-model:columns="columns"
            v-model:line-height="lineHeight"
            v-model:stripe="stripe"
            style="margin-left: 12px"
            @query-data="currentChange"
          />
        </FormRightPanel>
      </el-row>
      <el-table
        ref="tableSortRef"
        v-loading="listLoading"
        style="margin-top: 10px"
        row-key="id"
        :data="DataList"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
      >
        <el-table-column type="selection" />
        <el-table-column
          v-if="checkList.includes('projectId')"
          show-overflow-tooltip
          prop="projectId"
          align="center"
          label="项目ID"
        />
        <el-table-column
          v-if="checkList.includes('projectName')"
          show-overflow-tooltip
          prop="projectName"
          align="center"
          label="项目名称"
        />
        <el-table-column
          v-if="checkList.includes('projectIdentificationOrClientName')"
          show-overflow-tooltip
          prop="projectIdentificationOrClientName"
          align="center"
          label="客户简称/标识"
        />

        <el-table-column
          v-if="checkList.includes('participation')"
          show-overflow-tooltip
          align="center"
          label="参与/完成/配额/限量"
        >
          <template #default="{ row }">
            {{ row.participation }}/ {{ row.complete }}/ {{ row.num }}/
            {{ row.limitedQuantity }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('doMoneyPrice')"
          show-overflow-tooltip
          align="center"
          label="原价"
        >
          <template #default="{ row }">
            <el-text v-if="countryType === 1" class="mx-1"
              >${{ row.doMoneyPrice }}</el-text
            >
            <el-text v-if="countryType === 2" class="mx-1"
              >￥{{ row.doMoneyPrice }}</el-text
            >
            <el-text v-if="countryType === 3" class="mx-1">暂无数据</el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberPrice')"
          show-overflow-tooltip
          align="center"
          label="会员价"
        >
          <template #default="{ row }">
            <el-link
              v-if="row.getMemberGroupNameInfoList.length"
              size="small"
              plain
              type="primary"
              @click="membershipPrice(row)"
            >
              查看
            </el-link>
            <el-text v-else> - </el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('ir')"
          show-overflow-tooltip
          align="center"
          label="IR/NIR"
        >
          <template #default="{ row }"> {{ row.ir }}/ {{ row.nir }} </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('countryNameList')"
          show-overflow-tooltip
          align="center"
          label="国家地区"
        >
          <template #default="{ row }">
            <template v-if="row.countryNameList.length > 4">
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="row.countryNameList.join(',')"
                placement="top"
              >
                <el-link type="primary">{{
                  row.countryNameList.length
                }}</el-link>
              </el-tooltip>
            </template>
            <template v-else>
              <el-tag
                v-for="item in row.countryNameList"
                :key="item"
                type="primary"
              >
                {{ item }}
              </el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberStatus')"
          show-overflow-tooltip
          align="center"
          label="分配状态"
        >
          <template #default="{ row }">
            <el-text
              type="primary"
              v-if="row.getMemberGroupNameInfoList.length"
            >
              已分配
            </el-text>
            <el-text v-else> 未分配 </el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberGroupName')"
          show-overflow-tooltip
          align="center"
          label="分配目标"
        >
          <template #default="{ row }">
            <el-tooltip
              class="box-item"
              effect="dark"
              placement="top"
              v-if="row.getMemberGroupNameInfoList.length"
            >
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
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('createTime')"
          show-overflow-tooltip
          prop="createTime"
          align="center"
          label="创建时间"
        />
        <el-table-column align="center" label="操作" width="200">
          <template #default="{ row }">
            <ElSpace>
              <el-button
                type="primary"
                v-if="!row.getMemberGroupNameInfoList.length"
                plain
                size="small"
                @click="distribution(row)"
              >
                分配
              </el-button>
              <el-button type="primary" plain size="small" @click="tested(row)">
                测查
              </el-button>
              <el-button size="small" plain type="primary" @click="check(row)">
                详情
              </el-button>
            </ElSpace>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无数据" />
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
    <checkEdit ref="CheckEditRef" />
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
</style>
