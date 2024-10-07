<script setup lang="ts">
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/financial_pm_log";
import useSettingsStore from "@/store/modules/settings";
import plusMinusPayments from "./components/SupplierPlusMinusPayments/index.vue";
import Detail from "./components/Detail/index.vue";
import usePositionManageStore from "@/store/modules/position_manage";
import { ref } from "vue";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "financial_pm_log",
});
// 职位
const usePositionManage = usePositionManageStore();
// 职位数据
const positionManageList = ref<any>();
// 时间
const { format } = useTimeago();
const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();
// 加减款 组件ref
const plusMinusPaymentsRef = ref();
// financeLogRef
const financeLogRef = ref<any>()
  const formSearchList = ref<any>()//表单排序配置
const formSearchName=ref<string>('formSearch-financial_pm_log')// 表单排序name
// 表格控件-展示列
const columns = ref<any>([
  // 表格控件-展示列
  {
    label: "员工ID",
    prop: "id",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "用户名",
    prop: "userName",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "姓名",
    prop: "name",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "所属组",
    prop: "groupId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "职位",
    prop: "positionId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "待审提成",
    prop: "pendingBalance",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "可用提成",
    prop: "availableBalance",
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
    id: null,
    // 用户名
    userName: '',
    // 姓名
    name: '',
    // 部门id
    positionId: null,
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
function getDataList() {
  try {
    data.value.loading = true;
    const params = {
      ...getParams(),
      ...data.value.search,
    };
    api.list(params).then((res: any) => {
      data.value.loading = false;
      data.value.dataList = res.data.data;
      pagination.value.total = +res.data.total;
    });
  } catch (error) {

  } finally {
    data.value.loading = false;
  }
}
// 加减款
function handlePlusMinusPayments(row: any) {
  plusMinusPaymentsRef.value.showEdit(JSON.stringify(row));
}
// 财务日志
function financeLog(row: any) {
  financeLogRef.value.showEdit(row)
}
// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    id: null,
    // 用户名
    userName: '',
    // 姓名
    name: '',
    // 部门id
    positionId: null,
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
  // 职位
  positionManageList.value = await usePositionManage?.getPositionManage() || [];
  getDataList();
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
    { index: 1, show: true, type: 'input', modelName: 'id', placeholder: '员工ID' },
    { index: 2, show: true, type: 'input', modelName: 'userName', placeholder: '用户名' },
    { index: 3, show: true, type: 'input', modelName: 'name', placeholder: '姓名' },
    { index: 4, show: true, type: 'select', modelName: 'positionId', placeholder: '职位', option: 'positionId', optionLabel: 'name', optionValue: 'id' }
]
});
const formOption={
  positionId:()=>positionManageList.value
}
onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="data.search"  :formOption="formOption" />
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel />
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="data.border" v-model:tableAutoHeight="data.tableAutoHeight"
            v-model:checkList="data.checkList" v-model:columns="columns" v-model:line-height="data.lineHeight"
            v-model:stripe="data.stripe" style="margin-left: 12px" @query-data="getDataList" />
        </FormRightPanel>
      </el-row>
      <ElTable v-loading="data.loading" :border="data.border" :size="data.lineHeight" :stripe="data.stripe" class="my-4"
        :data="data.dataList" highlight-current-row height="100%" @sort-change="sortChange"
        @selection-change="data.batch.selectionDataList = $event">
        <el-table-column align="left" type="selection" />
        <ElTableColumn v-if="data.batch.enable" type="selection" show-overflow-tooltip align="left" fixed />
        <ElTableColumn v-if="data.checkList.includes('id')" show-overflow-tooltip align="left" prop="id" label="员工ID">
          <template #default="{ row }">
            <div class="copyId tableSmall">
              <div class="id oneLine ">ID: {{ row.id }}</div>
              <copy class="copy" :content="row.id" />
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('userName')" show-overflow-tooltip align="left" prop="userName"
          label="用户名">
          <template #default="{ row }">
            <el-text class="tableBig">
              {{ row.userName ? row.userName : '-' }}
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('name')" show-overflow-tooltip align="left" prop="name"
          label="姓名">
          <template #default="{ row }">
            <el-text class="tableBig">
              {{ row.name ? row.name : '-' }}
            </el-text>
          </template>
        </ElTableColumn>
        <!-- <ElTableColumn v-if="data.checkList.includes('groupId')" show-overflow-tooltip align="left" prop="groupId"
          width="150" label="所属组">
          <template #default="{ row }">
            <el-text v-if="row.groupId">
              <el-text v-for="item in groupManageList">
                <el-text v-if="row.groupId === item.id">
                  <el-text class="tableBig">
                    {{ item.name ? item.name : "-" }}
                  </el-text>
                </el-text>
              </el-text>
            </el-text>
            <el-text v-else>-</el-text>
          </template>
        </ElTableColumn> -->
        <ElTableColumn v-if="data.checkList.includes('positionId')" show-overflow-tooltip align="left"
          prop="positionId" width="150" label="职位">
          <template #default="{ row }">
            <el-text v-for="item in positionManageList">
              <el-text v-if="row.positionId === item.id">
                <el-text class="tableBig">
                  {{ item.name ? item.name : "-" }}
                </el-text>
              </el-text>
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('pendingBalance')" show-overflow-tooltip align="left"
          prop="pendingBalance" label="待审提成"><template #default="{ row }">
            <el-text class="tableBig">
              {{
    row.pendingBalance ? row.pendingBalance : '-'
  }}
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('availableBalance')" show-overflow-tooltip align="left"
          prop="availableBalance" label="可用提成"><template #default="{ row }">
            <el-text class="tableBig">
              {{
    row.availableBalance ? row.availableBalance : '-'
  }}
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" align="left" width="200" label="操作"><template #default="{ row }">
            <ElButton type="primary" size="small" plain @click="financeLog(row)">
              财务日志
            </ElButton>
            <ElButton type="warning" size="small" plain @click="handlePlusMinusPayments(row)">
              加减款
            </ElButton>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </ElTable>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
    <plusMinusPayments ref="plusMinusPaymentsRef" @fetch-data="getDataList" />
    <Detail ref="financeLogRef" />
  </div>
</template>

<style lang="scss" scoped>
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
