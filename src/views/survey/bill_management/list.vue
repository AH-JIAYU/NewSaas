<script setup lang="ts">
import FormMode from "./components/FormMode/index.vue";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/survey_billManagement";
import useSettingsStore from "@/store/modules/settings";
import { ElMessage, ElMessageBox } from "element-plus";
import empty from '@/assets/images/empty.png'

defineOptions({
  name: "billManagement",
});

const router = useRouter();
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const tabbar = useTabbar();
const settingsStore = useSettingsStore();
const formSearchList = ref<any>()//表单排序配置
const formSearchName=ref<string>('formSearch-billManagement')// 表单排序name

// 表格控件-展示列
const columns = ref([
  // 表格控件-展示列
  { label: "会员ID", prop: "memberId", sortable: true, checked: true },
  { label: "会员名称", prop: "memberName", sortable: true, checked: true },
  { label: "账单日期", prop: "billTime", sortable: true, checked: true },
  { label: "账单金额", prop: "billAmount", sortable: true, checked: true },
  { label: "税", prop: "taxesFees", sortable: true, checked: true },
  { label: "实际金额", prop: "payAmount", sortable: true, checked: true },
  { label: "支付时间", prop: "payTime", sortable: true, checked: true },
  { label: "账单状态", prop: "billStatus", sortable: true, checked: true },
  { label: "说明", prop: "notes", sortable: true, checked: true },
]);
const data = ref<any>({
  loading: false,

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
  formMode: "dialog" as "router" | "dialog" | "drawer",
  // 详情
  formModeProps: {
    visible: false,
    id: "",
  },
  // 搜索
  search: {
    memberId: "", //会员id-不支持模糊查询
    memberName: "", //	支持模糊查询-会员id和名称只能传一个
    member: "",
    billStatus: [], //账单状态: 1:待支付 2:已支付 3:已拒绝
  },
  // 账单状态
  billStatusList: [
  {label:'待支付',value:1},
  {label:'已支付',value:2},
  {label:'已拒绝',value:3},
],
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
  } catch (error) {

  } finally {
    data.value.loading = false;
  }
}
// 重置筛选数据
function onReset() {
  Object.assign(data.value.search, {
    memberId: "", //会员id-不支持模糊查询
    memberName: "", //	支持模糊查询-会员id和名称只能传一个
    member: "",
    billStatus: [], //账单状态: 1:待支付 2:已支付 3:已拒绝
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
// 新增结算
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
  formSearchList.value = [
  { index: 1, show: true, type: 'input', modelName: 'memberId', placeholder: '会员ID' },
  { index: 2, show: true, type: 'input', modelName: 'memberName', placeholder: '会员姓名' },
  { index: 3, show: true, type: 'select', modelName: 'billStatus', placeholder: '账单状态', option: 'billStatus',
  optionLabel: 'label', optionValue: 'value',  multiple:true,
}
]
});
const formOption={
  billStatus:()=>data.value.billStatusList
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
}
</script>
<!--   <el-table-column align="left" type="selection" /> -->
<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <FormSearch :formSearchList="formSearchList" :formSearchName="formSearchName" @currentChange="currentChange" @onReset="onReset" :model="data.search"  :formOption="formOption"/>
      <ElDivider border-style="dashed" />
      <el-row>
        <FormLeftPanel>
          <el-button size="default" type="primary" @click="onCreate" v-auth="'supplierSettlement-get-addMemberSettlement'">
            新增结算
          </el-button>
        </FormLeftPanel>
        <FormRightPanel>
          <el-button size="default"> 导出 </el-button>
          <TabelControl v-model:border="data.border" v-model:tableAutoHeight="data.tableAutoHeight"
            v-model:checkList="data.checkList" v-model:columns="columns" v-model:line-height="data.lineHeight"
            v-model:stripe="data.stripe" style="margin-left: 12px" @query-data="getDataList" />
        </FormRightPanel>
      </el-row>
      <ElTable v-loading="data.loading" :border="data.border" :size="data.lineHeight" :stripe="data.stripe" class="my-4"
        :data="data.dataList" highlight-current-row height="100%" @sort-change="sortChange"
        @selection-change="data.batch.selectionDataList = $event"         @current-change="handleCurrentChange" >

        <ElTableColumn v-if="data.checkList.includes('memberId')" show-overflow-tooltip align="left" prop=""
          label="会员ID" width="200">
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
        <ElTableColumn v-if="data.checkList.includes('memberName')" show-overflow-tooltip align="left" prop=""
          label="会员名称" width="120">
          <template #default="{ row }">
            <p class="weightColor">{{ row.memberName ? row.memberName : "-" }}</p>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('billTime')"  align="left" prop="billTime" show-overflow-tooltip
          label="账单日期" width="180"/>
        <ElTableColumn v-if="data.checkList.includes('billAmount')" show-overflow-tooltip align="left"
          prop="billAmount" label="账单金额">
          <template #default="{ row }">
            <p >
              <CurrencyType /><span class="fontC-System">{{ row.billAmount || 0 }}</span>
            </p>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('taxesFees')" show-overflow-tooltip align="left" prop="taxesFees"
          label="税">
          <template #default="{ row }">
            <p>
              <CurrencyType /><span class="fontC-System">{{ row.taxesFees || 0 }}</span>
            </p>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('payAmount')" show-overflow-tooltip align="left" prop="payAmount"
          label="实际金额">
          <template #default="{ row }">
            <p>
              <CurrencyType /><span class="fontC-System">{{ row.payAmount || 0 }}</span>
            </p>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('payTime')" show-overflow-tooltip align="left" prop="payTime"
          label="支付时间" width="180">
          <template #default="{ row }">
            <span class="fontC-System">{{ row.payTime ? row.payTime : '-' }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('billStatus')" align="left" show-overflow-tooltip prop=""
          label="账单状态">
          <template #default="{ row }">
            <el-tag v-if="row.billStatus === 1" type="warning" effect="dark" style="background-color:#FFAC54">待支付</el-tag>
            <el-tag v-if="row.billStatus === 2" type="success" effect="dark">已支付</el-tag>
            <el-tag v-if="row.billStatus === 3" type="danger" effect="dark">已拒绝</el-tag>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('notes')" show-overflow-tooltip align="left" prop="notes"
          label="说明">
          <template #default="{ row }">
            <el-text class="fontC-System"> {{ row.notes ? row.notes : "-" }}</el-text>
          </template>
        </ElTableColumn>
        <el-table-column align="left" prop="i" label="操作" fixed="right" show-overflow-tooltip width="260">
          <template #default="{ row }">
            <template v-if="row.billStatus === 1">
              <el-button size="small" plain type="primary" @click="paymentOperation(row.id, 1)" v-auth="'supplierSettlement-update-updateMemberBill'">
                支付
              </el-button>
              <el-button size="small" plain type="danger" @click="paymentOperation(row.id, 2)" v-auth="'supplierSettlement-update-updateMemberBill'">
                拒绝支付
              </el-button>
            </template>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </ElTable>
      <ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
        :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination"
        background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
    <FormMode v-if="data.formMode === 'dialog' || data.formMode === 'drawer'" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :mode="data.formMode" @success="getDataList" />
  </div>
</template>

<style lang="scss" scoped>
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
:deep(.page-main) {
  height: 100% !important;
}
.fineBom {
  text-align: left !important;
  font-size:.875rem;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
:deep {
  tbody {
    color: #333;
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
