<script setup lang="ts">
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/survey_financialLogs";
import { ElMessage } from "element-plus";
import useSettingsStore from "@/store/modules/settings";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "financialLogs",
});
// 时间
const { format } = useTimeago();
const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();
const formSearchList = ref<any>()//表单排序配置
const formSearchName=ref<string>('formSearch-financialLogs')// 表单排序name

// 表格控件-展示列
const columns = ref([
  // 表格控件-展示列
  {
    label: "点击ID",
    prop: "clientId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "会员ID",
    prop: "memberId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "会员名称",
    prop: "memberName",
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
    label: "随机身份",
    prop: "randomIdentity",
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
    label: "变动前",
    prop: "beforeBalance",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "加减款",
    prop: "difference",
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
    label: "创建时间",
    prop: "updateTime",
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
    memberId: "",
    // 会员名称
    memberName: "",
    // 项目id
    projectId: "",
    // 加减款类型 1加款 2减款
    operationType: "",
    // 金额类型 1待审余额 2可用余额
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
function getDataList() {
  try {
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
    memberId: "",
    // 会员名称
    memberName: "",
    // 项目id
    projectId: "",
    // 加减款类型 1加款 2减款
    operationType: "",
    // 金额类型 1待审余额 2可用余额
    type: "",
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

// 函数来格式化余额
const formatRemarkWithBalance = (remark:any) => {
  const match = remark.match(/[-+]?\d*\.?\d+/);
  if (match) {
    const balance = parseFloat(match[0]).toFixed(2);
    return remark.replace(match[0], balance); // 替换原余额
  }
  return remark; // 如果没有找到余额，返回原字符串
};

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
  { index: 1, show: true, type: 'input', modelName: 'memberId', placeholder: '会员ID' },
  { index: 2, show: true, type: 'input', modelName: 'memberName', placeholder: '会员名称' },
  { index: 3, show: true, type: 'input', modelName: 'projectId', placeholder: '项目ID' },
  { index: 4, show: true, type: 'select', modelName: 'operationType', placeholder: '加减款', option: 'operationType', optionLabel: 'label', optionValue: 'value' },
  { index: 5, show: true, type: 'select', modelName: 'type', placeholder: '类型', option: 'type', optionLabel: 'label', optionValue: 'value' }
]
});
const formOption={
  operationType:()=> payments,
  type:()=> paymentsType,
}
onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});
const current = ref<any>(); //表格当前选中

function handleCurrentChange(val: any) {
  if (val) current.value = val.id;
  else current.value = "";
  // console.log(current.value,'current.value')
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="data.search"  :formOption="formOption"/>
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
        :data="data.dataList" highlight-current-row height="100%" @sort-change="sortChange"  @current-change="handleCurrentChange"
        @selection-change="data.batch.selectionDataList = $event">
        <el-table-column align="left" prop="a" show-overflow-tooltip type="selection" />
        <ElTableColumn v-if="data.batch.enable" type="selection" show-overflow-tooltip align="left" fixed />
        <ElTableColumn v-if="data.checkList.includes('clientId')" show-overflow-tooltip width="200" align="left"
          prop="clientId" label="点击ID">
          <template #default="{ row }">
            <div v-if="row.clientId" class="hoverSvg">
              <p class="fineBom">{{ row.clientId }}</p>
              <span class="c-fx">
                <copy
                :content="row.clientId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"/>
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('randomIdentity')" show-overflow-tooltip width="200" align="left"
          prop="randomIdentity" label="随机身份">
          <template #default="{ row }">
            <div v-if="row.randomIdentity" class="hoverSvg">
              <p class="fineBom">{{ row.randomIdentity }}</p>
              <span class="c-fx">
                <copy
                :content="row.randomIdentity"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"/>
                <!-- <copy class="copy" :content="row.randomIdentity" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('memberId')" show-overflow-tooltip width="200" align="left"
          prop="memberId" label="会员ID">
          <template #default="{ row }">
            <div v-if="row.memberId" class="hoverSvg">
              <p class="fineBom">{{ row.memberId }}</p>
              <span class="c-fx">
                <copy
                :content="row.memberId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"/>
                <!-- <copy class="copy" :content="row.memberId" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('memberName')" show-overflow-tooltip align="left" prop="memberName"
          label="会员名称">
          <template #default="{ row }">
            <p class="weightColor">{{ row.memberName ? row.memberName : "-" }}</p>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('projectId')" show-overflow-tooltip width="200" align="left"
          prop="projectId" label="项目ID"><template #default="{ row }">
            <div v-if="row.projectId" class="hoverSvg">
              <p class="fineBom">{{ row.projectId }}</p>
              <span class="c-fx">
                <copy
                :content="row.projectId"
                :class="{
                  rowCopy: 'rowCopy',
                  current: row.id === current,
                }"/>
                <!-- <copy class="copy" :content="row.projectId" /> -->
              </span>
            </div>
            <el-text v-else>-</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('type')" show-overflow-tooltip width="120" align="left"
          prop="type" label="类型">
          <template #default="{ row }">
            <el-tag v-if="row.type === 1" type="warning" effect="dark">待审余额</el-tag>
            <el-tag v-if="row.type === 2" type="primary" effect="dark">可用余额</el-tag>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('beforeBalance')" show-overflow-tooltip align="left"
          prop="beforeBalance" label="变动前" width="120">
          <template #default="{ row }">
            <p style="font-weight: 700;"><CurrencyType />{{ row.beforeBalance || 0 }}</p>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('difference')" show-overflow-tooltip align="left"
          prop="difference" label="加减款" width="120">
          <template #default="{ row }">
            <p class="plus" v-if="row.operationType === 1" style="font-weight: 700;">
                <div class="plusSpan i-majesticons:plus-line w-1em h-1em"></div>
              <el-text>
                <CurrencyType />{{ Math.abs(row.difference) }}
              </el-text>
            </p>
            <p class="plus" v-if="row.operationType === 2" style="font-weight: 700;">
                <div class="minusSign i-iconamoon:sign-minus-bold w-1em h-1em"></div>
              <el-text>
                <CurrencyType />{{ Math.abs(row.difference) }}
              </el-text>
            </p>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('afterBalance')" show-overflow-tooltip align="left"
          prop="afterBalance" label="变动后" width="120">
          <template #default="{ row }">
            <p style="font-weight: 700;"> <CurrencyType />{{ row.afterBalance || 0 }}</p>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('updateTime')" show-overflow-tooltip align="left"
          prop="updateTime" label="创建时间">
          <template #default="{ row }">
            <el-tooltip :content="row.updateTime" placement="top">
                <el-tag effect="plain" type="info">{{format(row.updateTime)}}</el-tag>
              </el-tooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('remark')" show-overflow-tooltip align="left" prop="remark"
          label="说明">
          <template #default="{ row }">
            <el-text style="color:#333;font-weight: 700;">{{ formatRemarkWithBalance(row.remark) ||  "-" }}</el-text>
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
 .el-tag--dark.el-tag--warning {
    background-color: #FFAC54 !important;
  }
.rowCopy {
  width: 20px;
  display: none;
}
.current {
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
.fineBom {
  text-align: left !important;
  font-size: .875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hoverSvg {
  display: flex;
  align-items: center;
}

.copy {
  display: flex;
  align-items: center;
  width: 25px;
}

.svg {
  width: .875rem;
  height: .875rem;
  margin-left: .3125rem;
}

.weightColor {
  font-weight: 700;
}

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
.headerIcon {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .timeSvg {
    margin-right: 4px;
  }
}
.c-fx {
  display: flex;
  align-items: center;
  justify-content: center;
}
.copySvg {
  width: 100%;
  height: 100%;
}
</style>
