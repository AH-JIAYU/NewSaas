<script setup lang="ts">
import FormMode from "./components/FormMode/index.vue";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/survey_billManagement";
import useSettingsStore from "@/store/modules/settings";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SurveyBillManagementList",
});

const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();

// 表格控件-展示列
const columns = ref([
  // 表格控件-展示列
  { label: "会员ID/姓名", prop: "memberId", sortable: true, checked: true },
  { label: "账单日期", prop: "billTime", sortable: true, checked: true },
  { label: "账单金额", prop: "billAmount", sortable: true, checked: true },
  { label: "税", prop: "taxesFees", sortable: true, checked: true },
  { label: "实际金额", prop: "payAmount", sortable: true, checked: true },
  { label: "支付时间", prop: "payTime", sortable: true, checked: true },
  { label: "说明", prop: "notes", sortable: true, checked: true },
  { label: "账单状态", prop: "billStatus", sortable: true, checked: true },
]);
const data = ref<any>({
  loading: false,

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
  formMode: "dialog" as "router" | "dialog" | "drawer",
  // 详情
  formModeProps: {
    visible: false,
    id: "",
  },
  // 搜索
  search: {
    // memberId: "", //会员id-不支持模糊查询
    // memberName: "", //	支持模糊查询-会员id和名称只能传一个
    member: "",
    billStatus: "", //账单状态: 1:待支付 2:已支付 3:已拒绝
  },
  // 账单状态
  billStatusList: ["待支付", "已支付", "已拒绝"],
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
});

onMounted(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) {
      data.value.checkList.push(item.prop);
    }
  });
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
  if (data.value.search.member) {
    const regExp = /^\d+$/;
    // 纯数字为id
    if (regExp.test(params.member)) {
      params.memberId = params.member;
    } else {
      params.memberName = params.member;
    }
  }
  api.list(params).then((res: any) => {
    data.value.loading = false;
    data.value.dataList = res.data.memberBillInfoList;
    pagination.value.total = res.data.total;
  });
}
// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    // memberId: "", //会员id-不支持模糊查询
    // memberName: "", //	支持模糊查询-会员id和名称只能传一个
    member: "",
    billStatus: "", //账单状态: 1:待支付 2:已支付 3:已拒绝
  });
  getDataList();
}
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList());
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList());
}

// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDataList());
}
// 添加结算
function onCreate() {
  if (data.value.formMode === "router") {
    if (
      settingsStore.settings.tabbar.enable &&
      settingsStore.settings.tabbar.mergeTabsBy !== "activeMenu"
    ) {
      tabbar.open({
        name: "routerName",
      });
    } else {
      router.push({
        name: "routerName",
      });
    }
  } else {
    data.value.formModeProps.id = "";
    data.value.formModeProps.visible = true;
  }
}
//  完成操作
async function paymentOperation(id: any, type: any) {
  if (type === 2) {
    ElMessageBox.prompt("请说明拒绝的理由", "说明", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputPattern: /.{2,}/,
      inputErrorMessage: "请输理由-最少2为字符",
    }).then(async (value) => {
      const res = await api.changestatus({ id, type, notes: value.value });
      res.status === 1 &&
        ElMessage.success({
          message: "操作成功",
        });
      getDataList();
    });
  } else {
    const res = await api.changestatus({ id, type });
    res.status === 1 &&
      ElMessage.success({
        message: "操作成功",
      });
    getDataList();
  }
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
                v-model="data.search.member"
                placeholder="会员ID/会员姓名"
                clearable
                @clear="currentChange()"
              />
            </ElFormItem>
            <ElFormItem>
              <el-select
                v-model="data.search.billStatus"
                value-key=""
                placeholder="账单状态"
                clearable
                filterable
              >
                <el-option
                  v-for="(item, index) in data.billStatusList"
                  :key="item"
                  :value="index + 1"
                  :label="item"
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
              <ElButton disabled link @click="toggle">
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
        <FormLeftPanel>
          <el-button size="default" type="primary" @click="onCreate">
            添加结算
          </el-button>
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
      >
        <el-table-column
          align="center"
          show-overflow-tooltip
          type="selection"
        />
        <ElTableColumn
          v-if="data.checkList.includes('memberId')"
          show-overflow-tooltip
          align="center"
          prop=""
          label="会员ID/姓名"
          width="250"
        >
          <template #default="{ row }">
            {{ row.memberId }}/
            {{ row.memberName }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="data.checkList.includes('billTime')"
          show-overflow-tooltip
          align="center"
          prop="billTime"
          label="账单日期"
        />
        <ElTableColumn
          v-if="data.checkList.includes('billAmount')"
          show-overflow-tooltip
          align="center"
          prop="billAmount"
          label="账单金额"
        />
        <ElTableColumn
          v-if="data.checkList.includes('taxesFees')"
          show-overflow-tooltip
          align="center"
          prop="taxesFees"
          label="税"
        />
        <ElTableColumn
          v-if="data.checkList.includes('payAmount')"
          show-overflow-tooltip
          align="center"
          prop="payAmount"
          label="实际金额"
        />
        <ElTableColumn
          v-if="data.checkList.includes('payTime')"
          show-overflow-tooltip
          align="center"
          prop="payTime"
          label="支付时间"
        />
        <ElTableColumn
          v-if="data.checkList.includes('notes')"
          show-overflow-tooltip
          align="center"
          prop="notes"
          label="说明"
        >
          <template #default="{ row }">
            {{ row.notes ? row.notes : "-" }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="data.checkList.includes('billStatus')"
          align="center"
          show-overflow-tooltip
          prop=""
          label="账单状态"
        >
          <template #default="{ row }">
            {{ data.billStatusList[row.billStatus - 1] }}
          </template>
        </ElTableColumn>
        <el-table-column
          align="center"
          prop="i"
          label="操作"
          show-overflow-tooltip
          width="260"
        >
          <template #default="{ row }">
            <template v-if="row.billStatus === 1">
              <el-button
                size="small"
                plain
                type="primary"
                @click="paymentOperation(row.id, 1)"
              >
                支付
              </el-button>
              <el-button
                size="small"
                plain
                type="danger"
                @click="paymentOperation(row.id, 2)"
              >
                拒绝支付
              </el-button>
            </template>
          </template>
        </el-table-column>
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
    <FormMode
      v-if="data.formMode === 'dialog' || data.formMode === 'drawer'"
      :id="data.formModeProps.id"
      v-model="data.formModeProps.visible"
      :mode="data.formMode"
      @success="getDataList"
    />
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
