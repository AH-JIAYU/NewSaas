<script setup lang="ts">
import { onMounted } from "vue";
import api from "@/api/modules/user_subVip";
import empty from "@/assets/images/empty.png";
defineOptions({
  name: "subVip",
});

const { pagination, onSizeChange, onCurrentChange } = usePagination(); // 分页
// 时间
const { format } = useTimeago();
const listLoading = ref<boolean>(false);
const list = ref<Array<Object>>([]); // 列表
const selectRows = ref<string>(); // 表格-选中行
const checkList = ref<any>([]); // 表格-展示的列
const border = ref<boolean>(false); // 表格控件-是否展示边框
const stripe = ref<boolean>(true); // 表格控件-是否展示斑马条
const lineHeight = ref<any>("default"); // 表格控件-控制表格大小
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-subVip"); // 表单排序name
const columns = ref([
  // 表格控件-展示列
  { label: "子会员ID", prop: "memberChildId", sortable: true, checked: true },
  {
    label: "子会员名称",
    prop: "memberNickname",
    sortable: true,
    checked: true,
  },
  { label: "子会员姓名", prop: "memberName", sortable: true, checked: true },
  { label: "待审余额", prop: "pendingBalance", sortable: true, checked: true },
  {
    label: "可用余额",
    prop: "availableBalance",
    sortable: true,
    checked: true,
  },
  {
    label: "供应商ID",
    prop: "tenantSupplierId",
    sortable: true,
    checked: true,
  },
  { label: "B2B", prop: "b2bStatus", sortable: true, checked: true },
  {
    label: "部门",
    prop: "memberChildGroupName",
    sortable: true,
    checked: true,
  },
  {
    label: "子会员状态",
    prop: "memberChildStatus",
    sortable: true,
    checked: true,
  },
  { label: "创建人", prop: "createUserName", sortable: true, checked: true },
  { label: "创建日期", prop: "createTime", sortable: true, checked: true },
]);
const queryForm = ref<any>({
  memberChildId: "", //子会员ID
  memberNickname: "", //子会员名称
  memberName: "", //子会员姓名
  tenantSupplierId: "", //供应商ID
  b2bStatus: "", //B2B
  memberChildGroupName: "", //部门
  memberChildStatus: "", //子会员状态
  createUserName: "", //创建人
  time: [], //创建日期
});
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size);
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  // fetchData();
  onCurrentChange(page);
}
// 分页 后端(刘):这块不好做分页，所有返回全部数据，前端做分页
const DataList = computed(() => {
  let beginTime: any;
  let endTime: any;
  if (queryForm.value.time) {
    beginTime = queryForm.value.time[0]
      ? new Date(queryForm.value.time[0]).getTime()
      : "";
    endTime = queryForm.value.time[1]
      ? new Date(queryForm.value.time[1]).getTime()
      : "";
  } else {
    beginTime = endTime = "";
  }

  const searchList = list.value.filter((item: any) => {
    const rowTime: any = new Date(item.createTime).getTime();
    if (
      (String(item.memberChildId).includes(queryForm.value.memberChildId) ||
        String(item.memberNickname).includes(queryForm.value.memberChildId)) &&
      String(item.memberName).includes(queryForm.value.memberName) &&
      String(item.tenantSupplierId).includes(
        queryForm.value.tenantSupplierId
      ) &&
      (item.b2bStatus === queryForm.value.b2bStatus ||
        !queryForm.value.b2bStatus) &&
      String(item.memberChildGroupName).includes(
        queryForm.value.memberChildGroupName
      ) &&
      (item.memberChildStatus === queryForm.value.memberChildStatus ||
        !queryForm.value.memberChildStatus) &&
      String(item.createUserName).includes(queryForm.value.createUserName) &&
      ((beginTime <= rowTime && rowTime <= endTime) ||
        !beginTime ||
        !endTime ||
        !rowTime)
    ) {
      return true;
    } else {
      return false;
    }
  });
  return searchList.slice(
    (pagination.value.page - 1) * pagination.value.size,
    pagination.value.page * pagination.value.size
  );
});
// 重置请求
function queryData() {
  pagination.value.page = 1;
  Object.assign(queryForm.value, {
    memberChildId: "", //子会员ID
    memberNickname: "", //子会员名称
    memberName: "", //子会员姓名
    tenantSupplierId: "", //供应商ID
    b2bStatus: "", //B2B
    memberChildGroupName: "", //部门
    memberChildStatus: "", //子会员状态
    createUserName: "", //创建人
    time: [], //创建日期
  });
  fetchData();
}

// 请求
async function fetchData() {
  try {
    listLoading.value = true;
    const res = await api.list({});
    list.value = res.data.getMemberChildInfoList;
    pagination.value.total = res.data.getMemberChildInfoList.length;
    listLoading.value = false;
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
// 表格-单选框
function setSelectRows(val: string | undefined) {
  selectRows.value = val;
}
onMounted(() => {
  columns.value.forEach((item: any) => {
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
      modelName: "memberChildId",
      placeholder: "子会员ID、子会员名称",
    },
    {
      index: 2,
      show: true,
      type: "input",
      modelName: "memberName",
      placeholder: "子会员姓名",
    },
    {
      index: 3,
      show: true,
      type: "input",
      modelName: "tenantSupplierId",
      placeholder: "供应商ID",
    },
    {
      index: 4,
      show: true,
      type: "select",
      modelName: "memberChildStatus",
      placeholder: "子会员状态",
      option: "memberChildStatus",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 5,
      show: true,
      type: "select",
      modelName: "b2bStatus",
      placeholder: "B2B",
      option: "b2bStatus",
      optionLabel: "label",
      optionValue: "value",
    },
    {
      index: 6,
      show: true,
      type: "datetimerange",
      modelName: "time",
      startPlaceHolder: "创建开始日期",
      endPlaceHolder: "创建结束日期",
    },
  ];
});
const formOption = {
  memberChildStatus: () => [
    { label: "启用", value: 2 },
    { label: "禁用", value: 1 },
  ],
  b2bStatus: () => [
    { label: "开启", value: 2 },
    { label: "关闭", value: 1 },
  ],
};
const current = ref<any>(); //表格当前选中
function handleCurrentChange(val: any) {
  if (val) current.value = val.memberChildId;
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
        @onReset="queryData"
        :model="queryForm"
        :formOption="formOption"
      />
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
        :data="DataList"
        :size="lineHeight"
        :stripe="stripe"
        @current-change="handleCurrentChange"
        @selection-change="setSelectRows"
      >
        <el-table-column align="left" type="selection" />
        <ElTableColumn
          v-if="checkList.includes('memberChildStatus')"
          align="left"
          show-overflow-tooltip
          prop="memberChildStatus"
          label="状态"
        >
          <template #default="{ row }">
            <div class="tableBig">
              <el-text
                v-if="row.memberChildStatus !== 1"
                effect="light"
                type="success"
                >启用</el-text
              >
              <el-text v-else effect="light" type="danger">禁用</el-text>
            </div>
          </template>
        </ElTableColumn>
        <el-table-column
          v-if="checkList.includes('memberChildId')"
          align="left"
          prop="memberChildId"
          width="180"

          label="子会员ID"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine memberChildId">
                <el-tooltip
                  effect="dark"
                  :content="row.memberChildId"
                  placement="top-start"
                >
                {{ row.memberChildId }}
                </el-tooltip>
                <!-- {{ row.memberChildId }} -->
              </div>
              <copy
                :content="row.memberChildId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.memberChildId === current,
                }"
              />
              <!-- <copy class="copy" :content="row.memberChildId" /> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('tenantSupplierId')"
          align="left"
          prop="tenantSupplierId"
          width="180"
          label="供应商ID"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine memberChildId">

                <el-tooltip
                  effect="dark"
                  :content="row.tenantSupplierId"
                  placement="top-start"
                >
                {{ row.tenantSupplierId }}
                </el-tooltip>

                <!-- {{ row.tenantSupplierId }} -->

              </div>
              <copy
                :content="row.tenantSupplierId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.memberChildId === current,
                }"
              />
              <!-- <copy class="copy" :content="row.tenantSupplierId" /> -->
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('memberNickname')"
          align="left"
          prop="memberNickname"
          show-overflow-tooltip
          label="子会员名称"
        >
          <template #default="{ row }">
            <div class="tableBig">{{ row.memberNickname }}</div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('memberName')"
          align="left"
          prop="memberName"
          show-overflow-tooltip
          label="子会员姓名"
        >
          <template #default="{ row }">
            <div class="tableBig">
              {{ row.memberName ? row.memberName : "-" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('availableBalance')"
          align="left"
          prop="availableBalance"
          show-overflow-tooltip
          label="	可用余额"
        >
          <template #default="{ row }">
            <div class="tableBig">
              <CurrencyType />{{ row.availableBalance || 0 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('pendingBalance')"
          align="left"
          prop="pendingBalance"
          show-overflow-tooltip
          label="	待审余额"
        >
          <template #default="{ row }">
            <div class="tableBig">
              <CurrencyType />{{ row.pendingBalance || 0 }}
            </div>
          </template>
        </el-table-column>
        <ElTableColumn
          v-if="checkList.includes('b2bStatus')"
          align="left"
          show-overflow-tooltip
          prop="b2bStatus"
          label="B2B"
        >
          <template #default="{ row }">
            <svg
              v-if="row.b2bStatus && row.b2bStatus === 2"
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Frame" clip-path="url(#clip0_409_28184)">
                <path
                  id="Vector"
                  d="M13.6223 13.2878H1.375C1.28477 13.2878 1.21094 13.214 1.21094 13.1237V0.876465C1.21094 0.78623 1.28477 0.712402 1.375 0.712402H13.6236C13.7139 0.712402 13.7877 0.78623 13.7877 0.876465V13.1251C13.7863 13.2153 13.7139 13.2878 13.6223 13.2878Z"
                  fill="#409EFF"
                />
                <path
                  id="Vector_2"
                  d="M12.3645 14H2.63555C1.4584 14 0.5 13.0416 0.5 11.8645V2.13555C0.5 0.958398 1.4584 0 2.63555 0H12.3645C13.5416 0 14.5 0.958398 14.5 2.13555V11.8645C14.5 13.0416 13.5416 14 12.3645 14ZM2.63555 1.42324C2.24316 1.42324 1.92324 1.74316 1.92324 2.13555V11.8645C1.92324 12.2568 2.24316 12.5768 2.63555 12.5768H12.3645C12.7568 12.5768 13.0768 12.2568 13.0768 11.8645V2.13555C13.0768 1.74316 12.7568 1.42324 12.3645 1.42324H2.63555Z"
                  fill="#409EFF"
                />
                <path
                  id="Vector_3"
                  d="M6.24753 11.0141C6.10124 11.0141 5.95359 10.969 5.82781 10.8774L2.39343 8.36725C2.07624 8.13483 2.00652 7.69049 2.23894 7.37194C2.47136 7.05475 2.91706 6.98502 3.23425 7.21744L6.14909 9.34752L11.663 3.22116C11.9255 2.92858 12.3766 2.90533 12.6678 3.16784C12.9591 3.43034 12.9837 3.88151 12.7212 4.17272L6.778 10.7762C6.63718 10.9335 6.44304 11.0141 6.24753 11.0141Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_409_28184">
                  <rect
                    width="14"
                    height="14"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <svg
              v-else
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Frame" clip-path="url(#clip0_409_28364)">
                <path
                  id="Vector"
                  d="M13.6223 13.1901H1.375C1.3387 13.1901 1.30859 13.16 1.30859 13.1237V0.876465C1.30859 0.840165 1.3387 0.810059 1.375 0.810059H13.6236C13.6599 0.810059 13.69 0.840164 13.69 0.876465V13.1242C13.6892 13.1611 13.66 13.1901 13.6223 13.1901Z"
                  stroke="#409EFF"
                  stroke-width="0.195312"
                />
                <path
                  id="Vector_2"
                  d="M12.3645 14H2.63555C1.4584 14 0.5 13.0416 0.5 11.8645V2.13555C0.5 0.958398 1.4584 0 2.63555 0H12.3645C13.5416 0 14.5 0.958398 14.5 2.13555V11.8645C14.5 13.0416 13.5416 14 12.3645 14ZM2.63555 1.42324C2.24316 1.42324 1.92324 1.74316 1.92324 2.13555V11.8645C1.92324 12.2568 2.24316 12.5768 2.63555 12.5768H12.3645C12.7568 12.5768 13.0768 12.2568 13.0768 11.8645V2.13555C13.0768 1.74316 12.7568 1.42324 12.3645 1.42324H2.63555Z"
                  fill="#DCDCDC"
                />
                <g id="Group 18190">
                  <path
                    id="Vector_3"
                    d="M5 5L10 10"
                    stroke="#DCDCDC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Vector_4"
                    d="M5 10L10 5"
                    stroke="#DCDCDC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_409_28364">
                  <rect
                    width="14"
                    height="14"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </template>
        </ElTableColumn>
        <el-table-column
          v-if="checkList.includes('memberChildGroupName')"
          align="left"
          prop="memberChildGroupName"
          show-overflow-tooltip
          label="部门"
        >
          <template #default="{ row }">
            <div v-if="row.memberChildGroupId" class="copyId tableSmall">
              <div class="id oneLine memberChildId">{{ row.memberChildGroupId }}</div>
              <copy
                :content="row.memberChildGroupId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.memberChildId === current,
                }"
              />
              <!-- <copy class="copy" :content="row.memberChildGroupId" /> -->
            </div>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>

        <el-table-column
          v-if="checkList.includes('createUserName')"
          align="left"
          prop="createUserName"
          show-overflow-tooltip
          label="创建人"
          ><template #default="{ row }">
            <div class="tableBig">
              {{ row.createUserName ? row.createUserName : "-" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('createTime')"
          align="left"
          label="创建"
          prop="createTime"
        >
          <template #default="{ row }">
            <el-tag effect="plain" type="info">{{
              format(row.createTime)
            }}</el-tag>
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
.memberChildId {
  font-size: 14px;
}
.copyId  .current {
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
</style>
