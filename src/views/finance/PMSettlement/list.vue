<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/financial_PMSettlemet";
import empty from "@/assets/images/empty.png";

defineOptions({
  name: "PMSettlement",
});
const { getParams, pagination, onSizeChange, onCurrentChange } =
  usePagination(); // 分页
// 时间
const { format } = useTimeago();
const tableSortRef = ref("");
// loading加载
const listLoading = ref<boolean>(true);
// 获取组件变量
const editRef = ref();
// 右侧工具栏配置变量
const tableAutoHeight = ref(false); // 表格控件-高度自适应
const checkList = ref<any>([]);
const border = ref(false);
const isFullscreen = ref(false);
const lineHeight = ref<any>("default");
const stripe = ref(false);
const selectRows = ref<any>([]);
const statusList = [
  { label: "待支付", value: 'PENDING' },
  { label: "已支付", value: 'PAID' },
  { label: "已拒绝", value: 'REJECTED' },
];
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-PMSettlement"); // 表单排序name
const columns = ref<any>([
  { label: "部门ID", prop: "organizationalStructureId", sortable: true, checked: true },
  {
    label: "部门名称",
    prop: "name",
    sortable: true,
    checked: true,
  },
  { label: "账单日期", prop: "createTime", sortable: true, checked: true },
  { label: "账单金额", prop: "price", sortable: true, checked: true },
  { label: "状态", prop: "status", sortable: true, checked: true },
]);
// 查询参数
const queryForm = ref<any>({
  organizationalStructureId: "", //	供应商id
  status: [], //账单状态:  1:待支付 2:已支付 3:已拒绝
  time: [],
  startTime: null, //开始时间
  endTime: null, //	结束时间
});
const list = ref<any>([]);

// 获取列表选中数据
function setSelectRows(value: any) {
  selectRows.value = value;
}
// 重置数据
function onReset() {
  Object.assign(queryForm.value, {
    organizationalStructureId: "", //	供应商id
    status: [], //账单状态:  1:待支付 2:已支付 3:已拒绝
    time: [],
    startTime: null, //开始时间
    endTime: null, //	结束时间
  });
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}
// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
// 获取列表数据
async function fetchData() {
  try {
    listLoading.value = true;
    if(queryForm.value.time.length ){
      queryForm.value.startTime = queryForm.value.time[0]
      queryForm.value.endTime = queryForm.value.time[1]
    } else {
      queryForm.value.time = []
      queryForm.value.startTime = null
      queryForm.value.endTime = null
    }
    const params = {
      ...getParams(),
      ...queryForm.value,
    };
    delete params.time
    const res = await api.queryOrganizationalStructureSettlementRecordList(params);

    list.value = res.result;
    pagination.value.total = res.total ? Number(res.total):0;
    listLoading.value = false;
  } catch (error) {
  } finally {
    listLoading.value = false;
  }
}
// 手动生成结算（一月一次）
const settlement = async () => {
  const {status,error} = await api.organizationalStructureSettlement({})
  if(status ==1) {
    ElMessage.success({
        message: '手动结算成功',
        center: true,
      })
      fetchData()
  } else {
    ElMessage.success({
        message: error,
        center: true,
      })
  }
};

// 修改状态
async function changeStatus(id: any, status: any) {
  const res = await api.organizationalStructureSettlementUpdate({ id, status });
    res.status === 1 &&
      ElMessage.success({
        message: "操作成功",
      });
    fetchData();
  // 拒绝时必加一个说明字段
  // if (type === 3) {
  //   ElMessageBox.prompt("请说明拒绝的理由", "说明", {
  //     confirmButtonText: "确定",
  //     cancelButtonText: "取消",
  //     inputPattern: /.{2,}/,
  //     inputErrorMessage: "请输理由-最少2为字符",
  //   }).then(async (value:any) => {
  //     const res = await api.organizationalStructureSettlementUpdate({ id, type, notes: value.value });
  //     res.status === 1 &&
  //       ElMessage.success({
  //         message: "操作成功",
  //       });
  //     fetchData();
  //   });
  // } else {
  //   const res = await api.organizationalStructureSettlementUpdate({ id, type });
  //   res.status === 1 &&
  //     ElMessage.success({
  //       message: "操作成功",
  //     });
  //   fetchData();
  // }
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
      modelName: "organizationalStructureId",
      placeholder: "部门ID",
    },
    {
      index: 2,
      show: true,
      type: "datetimerange",
      modelName: "time",
      startPlaceHolder: "创建开始日期",
      endPlaceHolder: "创建结束日期",
    },
    {
      index: 3,
      show: true,
      type: "select",
      modelName: "status",
      placeholder: "状态",
      option: "status",
      optionLabel: "label",
      optionValue: "value",
      multiple:true,
    },
  ];
});
const formOption = {
  status: () => statusList,
};
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
}
</script>

<template>
  <div
    :class="{
      'absolute-container': tableAutoHeight,
    }"
  >
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
      <el-row :gutter="24">
        <FormLeftPanel>
          <el-button size="default" type="primary" @click="settlement" v-auth="'PMSettlement-update-organizationalStructureSettlement'">
            手动结算
          </el-button>
        </FormLeftPanel>
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
        :data="list"
        :border="border"
        :size="lineHeight"
        :stripe="stripe"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column
          v-if="checkList.includes('organizationalStructureId')"
          show-overflow-tooltip
          align="left"
          label="部门ID"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine projectId fontColor">
                {{ row.organizationalStructureId ? row.organizationalStructureId : "-" }}
              </div>
              <copy
                :content="row.organizationalStructureId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('name')"
          prop="name"
          show-overflow-tooltip
          align="left"
          label="部门名称"
        >
          <template #default="{ row }">
            <el-text class="fontColor">{{
              row.name
                ? row.name
                : "-"
            }}</el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('createTime')"
          prop="createTime"
          show-overflow-tooltip
          align="left"
          label="账单日期"
          ><template #default="{ row }">
            <el-text class="fontColor">{{
              row.createTime ? row.createTime : "-"
            }}</el-text>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkList.includes('price')"
          prop="price"
          show-overflow-tooltip
          align="left"
          label="账单金额"
        >
          <template #default="{ row }">
            <el-text class="fontColor"
              ><CurrencyType />{{ row.price || 0 }}</el-text
            >
          </template>
        </el-table-column>
        <ElTableColumn
          v-if="checkList.includes('status')"
          align="left"
          show-overflow-tooltip
          prop=""
          label="状态"
        >
          <template #default="{ row }">

            <el-text
              style="color: rgb(255, 172, 84)"
              class="oneLine"
              type="warning"
              v-if="row.status == '待支付'"
              >{{ row.status  }}</el-text
            >
            <el-text
              style="color: rgb(3, 194, 57)"
              class="oneLine"
              type="success"
              v-if="row.status == '已支付'"
              >{{ row.status}}</el-text
            >
            <el-text
              style="color: rgb(251, 104, 104)"
              class="oneLine"
              type="danger"
              v-if="row.status == '已拒绝'"
              >{{ row.status }}</el-text
            >
          </template>
        </ElTableColumn>
        <el-table-column align="left" fixed="right" label="操作" width="170">
          <template #default="{ row }">
            <template v-if="row.status == '待支付'">
              <el-button size="small" type="primary" plain @click="changeStatus(row.id, 'PAID')" v-auth="'PMSettlement-update-organizationalStructureSettlementUpdate'">
                支付
              </el-button>
              <el-button
                size="small"
                plain
                type="danger"
v-auth="'PMSettlement-update-organizationalStructureSettlementUpdate'"
                @click="changeStatus(row.id, 'REJECTED')"
              >
                拒绝
              </el-button>
            </template>
            <template v-else>- </template>
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
.projectId {
  font-size: 0.875rem;
}
.copyId .current {
  display: block !important;
}
.rowCopy {
  width: 20px;
  display: none;
}
.el-table__row:hover .rowCopy {
  display: block;
}
.el-pagination {
  margin-top: 15px;
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

.fontColor {
  color: #333333 !important;
}
</style>
