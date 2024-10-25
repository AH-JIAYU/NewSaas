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
           width="100"
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
            <div v-if="row.b2bStatus && row.b2bStatus === 2" style="color: #67c23a;" class="i-fluent:checkmark-12-filled w-1.5em h-1.5em"></div>
            <div v-else style="color: #fd8989;" class="i-iconamoon:close-bold w-1.5em h-1.5em"></div>
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
  font-size: .875rem;
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
