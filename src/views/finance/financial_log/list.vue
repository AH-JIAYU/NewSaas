<script setup lang="ts">
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/financial_log";
import useSettingsStore from "@/store/modules/settings";
import { ref } from "vue";

defineOptions({
  name: "financial_log",
});
// 时间
const { format } = useTimeago()
const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();
// 表格控件-展示列
const columns = ref<any>([
  // 表格控件-展示列
  {
    label: "供应商ID/内部调查站",
    prop: "typeId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "项目ID",
    prop: "projectId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "类型",
    prop: "type",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "说明",
    prop: "remark",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "变动前",
    prop: "beforeBalance",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "加减款",
    prop: "addAndSubtraction",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "变动后",
    prop: "afterBalance",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "时间",
    prop: "createTime",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
]);
// 加减款
const payments = [
  { label: "加款", value: 1 },
  { label: "减款", value: 2 },
];
// 类型
const paymentsType = [
  { label: "待审余额", value: 1 },
  { label: "可用余额", value: 2 },
];
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
    // 会员id
    supplierId: null,
    // 会员名称
    // memberName: "",
    // 项目id
    projectId: null,
    // 加减款类型 1加款 2减款
    operationType: null,
    // 金额类型 1待审余额 2可用余额
    type: null,
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
});

onMounted(() => {
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

function getDataList() {
  try {
    data.value.loading = true;
    const params = {
      ...getParams(),
      ...data.value.search,
    };
    api.list(params).then((res: any) => {
      data.value.loading = false;
      data.value.dataList = res.data.tenantFinancialRecordInfoList;
      pagination.value.total = +res.data.total;
    });
  } catch (error) {

  } finally {
    data.value.loading = false;
  }
}
// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 会员id
    supplierId: null,
    // 会员名称
    // memberName: null,
    // 项目id
    projectId: null,
    // 加减款类型 1加款 2减款
    operationType: null,
    // 金额类型 1待审余额 2可用余额
    type: null,
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
              <ElInput v-model="data.search.supplierId" placeholder="供应商ID" clearable @keydown.enter="currentChange()"
                @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem>
              <ElInput v-model="data.search.projectId" placeholder="项目ID" clearable @keydown.enter="currentChange()"
                @clear="currentChange()" />
            </ElFormItem>
            <ElFormItem v-show="!fold">
              <el-select v-model="data.search.operationType" value-key="" placeholder="加减款" clearable filterable
                @change="">
                <el-option v-for="item in payments" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </ElFormItem>
            <ElFormItem v-show="!fold">
              <el-select v-model="data.search.type" value-key="" placeholder="类型" clearable filterable @change="">
                <el-option v-for="item in paymentsType" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
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
        <ElTableColumn v-if="data.checkList.includes('typeId')" show-overflow-tooltip align="center" prop=""
          label="供应商ID/内部调查站">
          <template #default="{ row }">
            <el-text v-if="row.typeId == 1">内部调查站</el-text>
            <el-text v-else>{{ row.typeId ? row.typeId : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('projectId')" show-overflow-tooltip align="center" prop="projectId"
          label="项目ID">
          <template #default="{ row }">
            <el-text>{{ row.projectId ? row.projectId : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('type')" show-overflow-tooltip align="center" prop="" label="类型">
          <template #default="{ row }">
            <el-text v-if="row.type == 1">待审金额</el-text>
            <el-text v-if="row.type == 2">可用金额</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('remark')" show-overflow-tooltip align="center" prop="remark"
          label="说明">
          <template #default="{ row }">
            <!-- <el-text v-if="!row.remark.includes('余额')" class="mx-1">{{
              `记录变更:${parseStatusString(row.remark)[0]}变更为${
                parseStatusString(row.remark)[1]
              }`
            }}</el-text> -->
            <el-text class="mx-1">{{ row.remark ? row.remark : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('beforeBalance')" show-overflow-tooltip align="center"
          prop="beforeBalance" width="150" label="变动前">
          <template #default="{ row }">
            <CurrencyType />{{ row.beforeBalance || 0 }}
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('addAndSubtraction')" show-overflow-tooltip align="center"
          prop="addAndSubtraction" width="150" label="加减款"><template #default="{ row }">
            <el-text v-if="row.operationType === 2" type="danger" class="mx-1">-
              <CurrencyType />{{ Math.abs(row.addAndSubtraction) }}
            </el-text>
            <el-text v-else type="success" class="mx-1">
              +
              <CurrencyType />{{ Math.abs(row.addAndSubtraction) }}
            </el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('afterBalance')" show-overflow-tooltip align="center"
          prop="afterBalance" width="150" label="变动后">
          <template #default="{ row }">
            <CurrencyType />{{ row.afterBalance || 0 }}
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('createTime')" show-overflow-tooltip align="center"
          prop="createTime" label="时间"><template #default="{ row }">
            <el-tag effect="plain" type="info">{{ format(row.createTime) }}</el-tag>
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
