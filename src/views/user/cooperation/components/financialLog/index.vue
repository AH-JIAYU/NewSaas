<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_customer";

import empty from "@/assets/images/empty.png";
defineOptions({
  name: "financialLog",
});
// 时间
const { format } = useTimeago();
const data = ref<any>({
  dialogTableVisible: false,
  title: "",
  type: "",
  loading: false,
  activeName: "myFinancial",
  tableAutoHeight: false, // 表格是否自适应高度
  border: false, // 表格控件-是否展示边框
  stripe: false, // 表格控件-是否展示斑马条
  lineHeight: "default", // 表格控件-控制表格大小
  // 列表数据
  dataList: [],
  checkList: [],
});

// 表格控件-展示列
const columns = ref<any>([
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
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
// 显隐
async function showEdit(row: any) {
  data.value.loading = true;
  data.value.dialogTableVisible = true;
  getDataList();
  columns.value.forEach((item: any) => {
    if (item.checked) {
      data.value.checkList.push(item.prop);
    }
  });
}
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
// 函数来格式化余额
const formatRemarkWithBalance = (remark: any) => {
  const match = remark.match(/[-+]?\d*\.?\d+/);
  if (match) {
    const balance = parseFloat(match[0]).toFixed(2);
    return remark.replace(match[0], balance); // 替换原余额
  }
  return remark; // 如果没有找到余额，返回原字符串
};

// 弹框关闭事件
function closeHandler() {
  data.value.dialogTableVisible = false;
  data.value.tableData = [];
}

onMounted(async () => {});

// 暴露方法
defineExpose({
  showEdit,
});
// 字段排序
function sortChange({ prop, order }: { prop: string; order: string }) {
  onSortChange(prop, order).then(() => getDataList());
}
</script>

<template>
  <div>
    <el-dialog v-model="data.dialogTableVisible"   title="财务日志" draggable >
      <ElTable v-loading="data.loading" :border="data.border" :size="data.lineHeight" :stripe="data.stripe" class="my-4"
        :data="data.dataList" highlight-current-row height="100%" style="min-height: 370px;" sort-change="sortChange"
        >
        <ElTableColumn v-if="data.checkList.includes('clientId')" show-overflow-tooltip align="left" prop="clientId"
          label="点击ID" width="200">
          <template #default="{ row }">
            <el-text class="fontColor">{{ row.clientId ? row.clientId : "-" }}</el-text>
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
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('remark')" width="260" show-overflow-tooltip align="left" prop="remark"
          label="说明">
          <template #default="{ row }">
            <el-text class="mx-1 fontColor fontC-System" >{{ formatRemarkWithBalance(row.remark) || "-" }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('beforeBalance')" show-overflow-tooltip align="left"
          prop="beforeBalance" width="130" label="变动前" >
          <template #default="{ row }">
            <CurrencyType /><el-text class="fontColor">{{ row.beforeBalance || 0 }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('addAndSubtraction')" show-overflow-tooltip align="left"
          prop="addAndSubtraction" width="150" label="加减款" ><template #default="{ row }">
            <p class="plus" v-if="row.operationType === 1" >
                <div class="plusSpan i-majesticons:plus-line w-1em h-1em"></div>
              <el-text class="color3">
                <CurrencyType />{{ Math.abs(row.addAndSubtraction) }}
              </el-text>
            </p>
            <p class="plus" v-if="row.operationType === 2">
                <div class="minusSign i-iconamoon:sign-minus-bold w-1em h-1em"></div>
              <el-text class="color3">
                <CurrencyType />{{ Math.abs(row.addAndSubtraction) }}
              </el-text>
            </p>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('afterBalance')" show-overflow-tooltip align="left"
          prop="afterBalance" width="130" label="变动后" >
          <template #default="{ row }">
            <CurrencyType /><el-text class="fontColor">{{ row.afterBalance || 0 }}</el-text>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="data.checkList.includes('createTime')" show-overflow-tooltip align="left"
          prop="createTime" label="时间" ><template #default="{ row }" >
            <el-tag effect="plain" type="info">{{ format(row.createTime) }}</el-tag>
          </template>
        </ElTableColumn>
        <template #empty>
          <el-empty :image="empty" :image-size="300" />
        </template>
      </ElTable>

      <template #footer  >
        <div style="text-align:center">
          <el-button type="primary"  @click="closeHandler" >关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

:deep {
  .el-drawer,
  .el-drawer__body,
  .el-tabs.el-tabs--left {
    overflow: visible !important;
  }
  .el-table--fit .el-table__inner-wrapper:before {
    width: 0;
  }
}
.rowCopy {
  width: 20px;
  display: none;
}
.el-table__row:hover .rowCopy {
  display: block;
}
.flex-c {
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
.copyId .current {
  display: block !important;
}
</style>
