<script setup lang="ts">
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/survey_financialLogs";
import useSettingsStore from "@/store/modules/settings";

defineOptions({
  name: "SurveyFinancialLogsList",
});

const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();

// 表格控件-展示列
const columns = ref([
  // 表格控件-展示列
  {
    label: "等级名称",
    prop: "a",
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
  { label: "免审余额", value: 2 },
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
    memberId: "",
    // 会员名称
    memberName: "",
    // 项目id
    projectId: "",
    // 加减款类型 1加款 2减款
    operationType: "",
    // 金额类型 1待审余额 2免审余额
    type: "",
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
});

onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});

function getDataList() {
  data.value.loading = true;
  const params = {
    ...getParams(),
    ...data.value.search,
  };
  api.vipList(params).then((res: any) => {
    data.value.loading = false;
    data.value.dataList = res.data.items;
    pagination.value.total = +res.data.total;
  });
}
// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 会员id
    memberId: "",
    // 会员名称
    memberName: "",
    // 项目id
    projectId: "",
    // 加减款类型 1加款 2减款
    operationType: "",
    // 金额类型 1待审余额 2免审余额
    type: "",
  });
  getDataList();
}
// const tabChange = () => {
//   data.value.search.page = 1;
//   data.value.search.limit = 10;
//   onReset();
// };
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
              <ElForm
                :model="data.search"
                size="default"
                label-width="100px"
                inline-message
                inline
                class="search-form"
              >
                <ElFormItem>
                  <ElInput
                    v-model="data.search.memberId"
                    placeholder="会员ID"
                    clearable
                    @keydown.enter="currentChange()"
                    @clear="currentChange()"
                  />
                </ElFormItem>
                <ElFormItem>
                  <ElInput
                    v-model="data.search.memberName"
                    placeholder="会员名称"
                    clearable
                    @keydown.enter="currentChange()"
                    @clear="currentChange()"
                  />
                </ElFormItem>
                <ElFormItem>
                  <ElInput
                    v-model="data.search.projectId"
                    placeholder="项目ID"
                    clearable
                    @keydown.enter="currentChange()"
                    @clear="currentChange()"
                  />
                </ElFormItem>
                <ElFormItem v-show="!fold">
                  <el-select
                    v-model="data.search.operationType"
                    value-key=""
                    placeholder="加减款"
                    clearable
                    filterable
                    @change=""
                  >
                    <el-option
                      v-for="item in payments"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </ElFormItem>
                <ElFormItem v-show="!fold">
                  <el-select
                    v-model="data.search.type"
                    value-key=""
                    placeholder="类型"
                    clearable
                    filterable
                    @change=""
                  >
                    <el-option
                      v-for="item in paymentsType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
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
                      <SvgIcon
                        :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'"
                      />
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
          >
            <el-table-column
              align="center"
              prop="a"
              show-overflow-tooltip
              type="selection"
            />
            <ElTableColumn
              v-if="data.batch.enable"
              type="selection"
              show-overflow-tooltip
              align="center"
              fixed
            />
            <ElTableColumn
              show-overflow-tooltip
              align="center"
              prop="memberId"
              label="会员ID/姓名"
            >
              <template #default="{ row }">
                {{ `${row.memberId}/${row.memberName}` }}
              </template>
            </ElTableColumn>
            <ElTableColumn
              show-overflow-tooltip
              align="center"
              prop="title"
              label="随机身份"
            >
              <template #default="{ row }">
                {{ row.randomIdentity ? row.randomIdentity : "-" }}
              </template>
            </ElTableColumn>
            <ElTableColumn
              show-overflow-tooltip
              align="center"
              prop="projectId"
              label="项目ID"
            />
            <ElTableColumn
              show-overflow-tooltip
              width="120"
              align="center"
              prop=""
              label="类型"
              ><template #default="{ row }">
                <el-text class="mx-1">{{
                  paymentsType[row.type - 1].label
                }}</el-text>
              </template>
            </ElTableColumn>
            <ElTableColumn
              show-overflow-tooltip
              align="center"
              prop="remark"
              label="说明"
            >
              <template #default="{ row }">
                <el-text v-if="row.remark[1].includes('-')" class="mx-1"
                  >{{ row.remark[0] }}
                  <el-text type="danger" class="mx-1">{{
                    row.remark[1]
                  }}</el-text></el-text
                >
                <el-text v-else class="mx-1"
                  >{{ row.remark[0] }}
                  <el-text type="success" class="mx-1">{{
                    row.remark[1]
                  }}</el-text></el-text
                >
              </template>
            </ElTableColumn>
            <ElTableColumn
              show-overflow-tooltip
              align="center"
              prop="beforeBalance"
              label="变动前"
              width="120"
            />
            <ElTableColumn
              show-overflow-tooltip
              align="center"
              prop="difference"
              label="加减款"
              width="120"
              ><template #default="{ row }">
                <el-text
                  v-if="row.remark[1].includes('-')"
                  type="danger"
                  class="mx-1"
                  >-{{ row.difference }}</el-text
                >
                <el-text v-else type="success" class="mx-1"
                  >+{{ row.difference }}</el-text
                >
              </template>
            </ElTableColumn>
            <ElTableColumn
              show-overflow-tooltip
              align="center"
              prop="afterBalance"
              label="变动后"
              width="120"
            />
            <ElTableColumn
              show-overflow-tooltip
              align="center"
              prop="updateTime"
              label="时间"
            />
            <template #empty>
              <el-empty description="暂无数据" />
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
