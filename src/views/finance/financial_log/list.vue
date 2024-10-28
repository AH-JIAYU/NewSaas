<script setup lang="ts">
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/financial_log";
import useSettingsStore from "@/store/modules/settings";
import { ref } from "vue";
import empty from '@/assets/images/empty.png'

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
const formSearchList = ref<any>()//表单排序配置
const formSearchName = ref<string>('formSearch-financial_log')// 表单排序name
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
    label: "点击ID",
    prop: "clientId",
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
  formSearchList.value = [
    { index: 1, show: true, type: 'input', modelName: 'supplierId', placeholder: '供应商ID' },
    { index: 2, show: true, type: 'input', modelName: 'projectId', placeholder: '项目ID' },
    { index: 3, show: true, type: 'select', modelName: 'operationType', placeholder: '加减款', option: 'operationType', optionLabel: 'label', optionValue: 'value' },
    { index: 4, show: true, type: 'select', modelName: 'type', placeholder: '类型', option: 'type', optionLabel: 'label', optionValue: 'value' }
  ]
});
const formOption={
  operationType:()=>payments,
  type:()=>paymentsType,
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
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange"
        @onReset="onReset" :model="data.search"  :formOption="formOption" />
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
        :data="data.dataList" highlight-current-row height="100%" style="min-height: 370px;" sort-change="sortChange"
        @selection-change="data.batch.selectionDataList = $event" >
        <el-table-column align="left" type="selection" />
        <ElTableColumn v-if="data.batch.enable" type="selection" show-overflow-tooltip align="left" fixed />
        <ElTableColumn v-if="data.checkList.includes('clientId')" show-overflow-tooltip align="left" prop="clientId"
          label="点击ID" width="200">
          <template #default="{ row }">
            <el-text>{{ row.clientId ? row.clientId : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('typeId')" show-overflow-tooltip align="left" prop=""
          label="供应商ID/内部调查站" width="200">
          <template #default="{ row }">
            <el-text v-if="row.typeId == 1"  class="fontColor">内部调查站</el-text>
            <el-text v-else  class="fontColor">{{ row.typeId ? row.typeId : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('projectId')" show-overflow-tooltip align="left" prop="projectId"
          label="项目ID" width="200">
          <template #default="{ row }">
            <el-text  class="fontColor">{{ row.projectId ? row.projectId : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('type')" show-overflow-tooltip align="left" prop="" label="类型">
          <template #default="{ row }">
            <el-tag v-if="row.type === 1" type="warning" effect="dark">待审余额</el-tag>
            <el-tag v-if="row.type === 2" type="primary" effect="dark">可用余额</el-tag>

            <!-- <el-text v-if="row.type == 1"  class="fontColor">待审金额</el-text>
            <el-text v-if="row.type == 2"  class="fontColor">可用金额</el-text> -->
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('remark')" show-overflow-tooltip align="left" prop="remark"
          label="说明" width="200">
          <template #default="{ row }">
            <!-- <el-text v-if="!row.remark.includes('余额')" class="mx-1">{{
              `记录变更:${parseStatusString(row.remark)[0]}变更为${
                parseStatusString(row.remark)[1]
              }`
            }}</el-text> -->
            <el-text class="mx-1 fontColor" >{{ row.remark ? row.remark : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('beforeBalance')" show-overflow-tooltip align="left"
          prop="beforeBalance" width="150" label="变动前" fixed="right">
          <template #default="{ row }">
            <CurrencyType /><el-text class="fontColor">{{ row.beforeBalance || 0 }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('addAndSubtraction')" show-overflow-tooltip align="left"
          prop="addAndSubtraction" width="150" label="加减款" fixed="right"><template #default="{ row }">
            <p class="plus" v-if="row.operationType === 1" >
                <div class="plusSpan i-majesticons:plus-line w-1em h-1em"></div>
              <el-text>
                <CurrencyType />{{ Math.abs(row.addAndSubtraction) }}
              </el-text>
            </p>
            <p class="plus" v-if="row.operationType === 2">
                <div class="minusSign i-iconamoon:sign-minus-bold w-1em h-1em"></div>
              <el-text>
                <CurrencyType />{{ Math.abs(row.addAndSubtraction) }}
              </el-text>
            </p>





            <!-- <el-text v-if="row.operationType === 2" type="danger" class="mx-1 ">-
              <CurrencyType /><el-text class="fontColor tableBig">{{ Math.abs(row.addAndSubtraction) }}</el-text>
            </el-text>
            <el-text v-else type="success" class="mx-1 ">
              +
              <CurrencyType /><el-text class="fontColor tableBig">{{ Math.abs(row.addAndSubtraction) }}</el-text>
            </el-text> -->
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('afterBalance')" show-overflow-tooltip align="left"
          prop="afterBalance" width="150" label="变动后" fixed="right">
          <template #default="{ row }">
            <CurrencyType /><el-text class="fontColor">{{ row.afterBalance || 0 }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('createTime')" show-overflow-tooltip align="left"
          prop="createTime" label="时间" fixed="right"><template #default="{ row }">
            <el-tag effect="plain" type="info">{{ format(row.createTime) }}</el-tag>
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
  </div>
</template>

<style lang="scss" scoped>
:deep {
  tbody {
    color: #333;
  }
  .plusSpan {
    margin-top: -4px;
    color: #03c239;
  }
  .minusSign {
    margin-top: -4px;
    color: #fd8989;
  }
}
 /* 自定义标签背景 */
 .el-tag--dark.el-tag--warning {
    background-color: #FFAC54 !important;
  }

.fontColor {
  color: #333333 !important;
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
</style>
