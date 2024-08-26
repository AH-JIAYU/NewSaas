<script setup lang="ts">
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/financial_pm_log";
import useSettingsStore from "@/store/modules/settings";
import plusMinusPayments from "./components/SupplierPlusMinusPayments/index.vue";
import Detail from "./components/Detail/index.vue";
import usePositionManageStore from "@/store/modules/position_manage";
import useGroupManageStore from "@/store/modules/group_manage";
import { ref } from "vue";

defineOptions({
  name: "financial_pm_log",
});
// 职位
const usePositionManage = usePositionManageStore();
// 职位数据
const positionManageList = ref<any>();
// 小组
const useGroupManage = useGroupManageStore();
// 小组数据
const groupManageList = ref<any>();
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
  border: true, // 表格控件-是否展示边框
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

onMounted(async () => {
  // 职位
  positionManageList.value = await usePositionManage?.getPositionManage() || [];
  // 小组
  groupManageList.value = await useGroupManage?.getGroupManage() || [];
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
});

onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
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
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <SearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm :model="data.search" size="default" label-width="100px" inline-message inline class="search-form">
            <ElFormItem>
              <ElInput v-model="data.search.id" placeholder="员工ID" clearable @keydown.enter="currentChange()"
                @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem>
              <ElInput v-model="data.search.userName" placeholder="用户名" clearable @keydown.enter="currentChange()"
                @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem>
              <ElInput v-model="data.search.name" placeholder="姓名" clearable @keydown.enter="currentChange()"
                @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem v-show="!fold">
              <el-select v-model="data.search.positionId" value-key="" placeholder="职位" clearable filterable>
                <el-option v-for="item in positionManageList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>

            </ElFormItem>
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
                  <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
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
          <TabelControl v-model:border="data.border" v-model:tableAutoHeight="data.tableAutoHeight"
            v-model:checkList="data.checkList" v-model:columns="columns" v-model:line-height="data.lineHeight"
            v-model:stripe="data.stripe" style="margin-left: 12px" @query-data="getDataList" />
        </FormRightPanel>
      </el-row>
      <ElTable v-loading="data.loading" :border="data.border" :size="data.lineHeight" :stripe="data.stripe" class="my-4"
        :data="data.dataList" highlight-current-row height="100%" @sort-change="sortChange"
        @selection-change="data.batch.selectionDataList = $event">
        <el-table-column align="center" type="selection" />
        <ElTableColumn v-if="data.batch.enable" type="selection" show-overflow-tooltip align="center" fixed />
        <ElTableColumn v-if="data.checkList.includes('id')" show-overflow-tooltip align="center" prop="id" label="员工ID">
          <template #default="{ row }">
            <el-text>{{ row.id ? row.id : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('userName')" show-overflow-tooltip align="center" prop="userName"
          label="用户名">
          <template #default="{ row }">
            {{ row.userName ? row.userName : '-' }}
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('name')" show-overflow-tooltip align="center" prop="name"
          label="姓名">
          <template #default="{ row }">
            {{ row.name ? row.name : '-' }}
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('groupId')" show-overflow-tooltip align="center" prop="groupId"
          width="150" label="所属组">
          <template #default="{ row }">
            <el-text v-if="row.groupId">
              <el-text v-for="item in groupManageList">
                <el-text v-if="row.groupId === item.id">
                  {{ item.name ? item.name : "-" }}
                </el-text>
              </el-text>
            </el-text>
            <el-text v-else>-</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('positionId')" show-overflow-tooltip align="center"
          prop="positionId" width="150" label="职位">
          <template #default="{ row }">
            <el-text v-for="item in positionManageList">
              <el-text v-if="row.positionId === item.id">
                {{ item.name ? item.name : "-" }}
              </el-text>
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('pendingBalance')" show-overflow-tooltip align="center"
          prop="pendingBalance" label="待审提成"><template #default="{ row }">
            {{
    row.pendingBalance ? row.pendingBalance : '-'
  }}
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('availableBalance')" show-overflow-tooltip align="center"
          prop="availableBalance" label="可用提成"><template #default="{ row }">
            {{
    row.availableBalance ? row.availableBalance : '-'
  }}
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" align="center" width="200" label="操作"><template #default="{ row }">
            <ElButton type="primary" size="small" plain @click="financeLog(row)">
              财务日志
            </ElButton>
            <ElButton type="primary" size="small" plain @click="handlePlusMinusPayments(row)">
              加减款
            </ElButton>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty class="vab-data-empty" description="暂无数据" />
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

  .el-divider {
    margin-inline: -20px;
    width: calc(100% + 40px);
  }
}
</style>
