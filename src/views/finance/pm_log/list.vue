<script setup lang="ts">
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/financial_pm_log";
import useSettingsStore from "@/store/modules/settings";
import plusMinusPayments from "./components/SupplierPlusMinusPayments/index.vue";
import Detail from "./components/Detail/index.vue";
import usePositionManageStore from "@/store/modules/position_manage";
import { ref } from "vue";
import empty from "@/assets/images/empty.png";
import { ElMessage, ElMessageBox } from "element-plus";
defineOptions({
  name: "financial_pm_log",
});
// 职位
const usePositionManage = usePositionManageStore();
// 职位数据
const positionManageList = ref<any>();
// 时间
// const { format } = useTimeago();
const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();
// 加减款 组件ref
const plusMinusPaymentsRef = ref();
// financeLogRef
const financeLogRef = ref<any>();
const formSearchList = ref<any>(); //表单排序配置
const formSearchName = ref<string>("formSearch-financial_pm_log"); // 表单排序name
// 表格控件-展示列
const columns = ref<any>([
  // 表格控件-展示列
  {
    label: "部门ID",
    prop: "id",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "部门名称",
    prop: "organizationalStructureName",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "主管",
    prop: "name",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "总业绩",
    prop: "totalPerformance",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "提成",
    prop: "commission",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
]);
const data = ref<any>({
  loading: false,
  activeName: "myFinancial",
  tableAutoHeight: false, // 表格是否自适应高度
  border: false, // 表格控件-是否展示边框
  stripe: false, // 表格控件-是否展示斑马条
  lineHeight: "default", // 表格控件-控制表格大小
  checkList: [],
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: "drawer" as "router" | "dialog" | "drawer",
  // 详情
  formModeProps: {
    visible: false,
    id: "",
  },
  // 搜索
  search: {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 部门id
    organizationalStructureId: null,
    // 部门名称
    organizationalStructureName: "",
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
});
// 获取数据
async function getDataList() {
  try {
    const params = {
      ...getParams(),
      ...data.value.search,
    };
    const res = await api.list(params);
    data.value.dataList = res.data.memberVOS;
    pagination.value.total = +res.data.total;
  } catch (error) {
  } finally {
  }
}
// 加减款
function handlePlusMinusPayments(row: any) {
  plusMinusPaymentsRef.value.showEdit(JSON.stringify(row));
}
// 财务日志
function financeLog(row: any) {
  financeLogRef.value.showEdit(row);
}
// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 部门id
    organizationalStructureId: null,
    // 部门名称
    organizationalStructureName: "",
  });
  getDataList();
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => {
    data.value.search.limit = size;
    getDataList();
  });
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => {
    data.value.search.page = page;
    getDataList();
  });
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDataList());
}

onMounted(async () => {
  try {
    data.value.loading = true;
    // 职位
    positionManageList.value =
      (await usePositionManage?.getPositionManage()) || [];
    await getDataList();
    data.value.loading = false;
    if (data.value.formMode === "router") {
      eventBus.on("get-data-list", () => {
        getDataList();
      });
    }
    columns.value.forEach((item: any) => {
      if (item.checked) {
        data.value.checkList.push(item.prop);
      }
    });
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
        type: "input",
        modelName: "organizationalStructureName",
        placeholder: "部门名称",
      },
    ];
  } catch (error) {
  } finally {
    data.value.loading = false;
  }
});
const formOption = {
  positionId: () => positionManageList.value,
};
onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.organizationalStructureId;
  else current.value = "";
}
// 手动生成结算（一月一次）
const settlement = async () => {
  const { status } = await api.organizationalStructureSettlement({});
  if (status == 1) {
    ElMessage.success({
      message: "手动结算成功",
      center: true,
    });
    getDataList();
  }
};
</script>
<!--   <el-table-column align="left" type="selection" />
        <ElTableColumn v-if="data.batch.enable" type="selection" show-overflow-tooltip align="left" fixed /> -->
<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <FormSearch
        :formSearchList="formSearchList"
        :formSearchName="formSearchName"
        @currentChange="currentChange"
        @onReset="onReset"
        :model="data.search"
        :formOption="formOption"
      />
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel>
          <!-- <el-button
            style="margin-right: 10px"
            type="primary"
            size="default"
            @click="settlement"
          >
            手动结算
          </el-button> -->
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl
            v-model:border="data.border"
            v-model:tableAutoHeight="data.tableAutoHeight"
            v-model:checkList="data.checkList"
            v-model:columns="columns"
            v-model:line-height="data.lineHeight"
            v-model:stripe="data.stripe"
            style="margin-left: 12px"
            @query-data="getDataList"
          />
        </FormRightPanel>
      </el-row>
      <ElTable
        v-loading="data.loading"
        :border="data.border"
        :size="data.lineHeight"
        :stripe="data.stripe"
        class="my-4"
        :data="data.dataList"
        highlight-current-row
        height="100%"
        @sort-change="sortChange"
        @selection-change="data.batch.selectionDataList = $event"
        @current-change="handleCurrentChange"
      >
        <ElTableColumn
          v-if="data.checkList.includes('id')"
          show-overflow-tooltip
          align="left"
          prop="id"
          label="部门ID"
        >
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine idFont">
                {{ row.organizationalStructureId }}
              </div>
              <copy
                :content="row.organizationalStructureId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.organizationalStructureId === current,
                }"
                class="littleButton"
              />
              <!-- <copy class="copy" :content="row.organizationalStructureId" /> -->
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="data.checkList.includes('organizationalStructureName')"
          show-overflow-tooltip
          align="left"
          prop="userName"
          label="部门名称"
        >
          <template #default="{ row }">
            <el-text class="tableBig">
              {{
                row.organizationalStructureName
                  ? row.organizationalStructureName
                  : "-"
              }}
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="data.checkList.includes('name')"
          show-overflow-tooltip
          align="left"
          prop="name"
          label="主管"
        >
          <template #default="{ row }">
            <el-text v-if="row.userList.length" class="fontC-System">
              {{ row.userList?.map((item: any) => item.name).join("，") }}
            </el-text>
            <el-text v-else class="fontC-System">-</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="data.checkList.includes('totalPerformance')"
          show-overflow-tooltip
          align="left"
          prop="positionId"
          label="总业绩"
        >
          <template #default="{ row }">
            <el-text>
              <CurrencyType /><span class="fontC-System">{{
                row.totalPerformance || 0
              }}</span>
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="data.checkList.includes('commission')"
          show-overflow-tooltip
          align="left"
          prop="pendingBalance"
          label="提成"
          ><template #default="{ row }">
            <el-text>
              <CurrencyType /><span class="fontC-System">{{
                row.commission || 0
              }}</span>
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" align="left" width="200" label="操作"
          ><template #default="{ row }">
            <ElButton
              type="primary"
              size="small"
              plain
              @click="financeLog(row)"
              v-auth="
                'pm_log-get-queryOrganizationalStructureRecordQueryAmount'
              "
            >
              财务日志
            </ElButton>
            <ElButton
              type="warning"
              size="small"
              plain
              @click="handlePlusMinusPayments(row)"
              v-auth="'pm_log-insert-additionAndSubtraction'"
            >
              加减款
            </ElButton>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </ElTable>
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
    <plusMinusPayments ref="plusMinusPaymentsRef" @fetch-data="getDataList" />
    <Detail ref="financeLogRef" />
  </div>
</template>

<style lang="scss" scoped>
.copyId .idFont {
  font-size: 0.875rem;
}
.copyId .current {
  display: block !important;
}
.rowCopy {
  width: 20px;
  display: none;
}
.copyId .current {
  display: block !important;
}
.el-table__row:hover .rowCopy {
  display: block;
}
.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
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

.littleButton {
  position: absolute;
  right: 15px;
}
</style>
