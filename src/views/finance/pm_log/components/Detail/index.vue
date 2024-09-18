<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/financial_pm_log";
import empty from '@/assets/images/empty.png'

// 时间
const { format } = useTimeago();
const emit = defineEmits(["fetch-data"]);
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const monthList = [
  { label: '一月份', value: 1 },
  { label: '二月份', value: 2 },
  { label: '三月份', value: 3 },
  { label: '四月份', value: 4 },
  { label: '五月份', value: 5 },
  { label: '六月份', value: 6 },
  { label: '七月份', value: 7 },
  { label: '八月份', value: 8 },
  { label: '九月份', value: 9 },
  { label: '十月份', value: 10 },
  { label: '十一月份', value: 11 },
  { label: '十二月份', value: 12 },
]
const data = ref<any>({
  loading: false,
  activeName: "myFinancial",
  tableAutoHeight: false, // 表格是否自适应高度
  border: true, // 表格控件-是否展示边框
  stripe: false, // 表格控件-是否展示斑马条
  lineHeight: "default", // 表格控件-控制表格大小
  checkList: [],
  search: {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 月份
    month: null,
    id: null,
    // 类型 1 部门 2小组 3成员
    type: 3,
  },
});
const drawerisible = ref<boolean>(false);
const detailData = ref<any>(); // 详情数据
async function showEdit(row: any) {
  data.value.search.id = row.id
  getDataList()
  drawerisible.value = true;
}
const getDataList = async () => {
  try {
    data.value.loading = true;
    const params = {
      ...data.value.search,
    };
    const res = await api.getStaffFinancial(params)
    detailData.value = res.data.itemList;
    pagination.value.total = +res.data.total;
    data.value.loading = false;

  } catch (error) {

  } finally {
    data.value.loading = false;
  }
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
function close() {
  emit("fetch-data");
  Object.assign(data.value.search, {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 月份
    month: null,
    id: null,
  })
  drawerisible.value = false;
}

onMounted(() => {
  const now = new Date();
  // getMonth() 返回的月份是0-11，所以需要加1
  const currentMonth = now.getMonth() + 1;
  data.value.search.month = currentMonth
})
defineExpose({
  showEdit,
});
</script>

<template lang="">
  <el-drawer
    v-model="drawerisible"
    v-loading="data.loading"
    append-to-body
    :close-on-click-modal="false"
    destroy-on-close
    draggable
    size="60%"
    title="详情"
    @close="close"
  >
    <ElDivider border-style="dashed" />
    <ElForm
      :model="data.search"
      size="default"
      label-width="100px"
      inline-message
      inline
      class="search-form"
    >
      <ElFormItem>
        <el-select style="width:10.5rem" v-model="data.search.month" placeholder="" clearable filterable @change="currentChange()">
        <el-option v-for="item in monthList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
        </el-select>
      </ElFormItem>
    </ElForm>
    <ElTable
      v-loading="data.loading"
      :border="data.border"
      :size="data.lineHeight"
      :stripe="data.stripe"
      class="my-4"
      :data="detailData"
      highlight-current-row
      @sort-change="sortChange"
      @selection-change="data.batch.selectionDataList = $event"
    >
      <!-- <ElTableColumn
        type="selection"
        show-overflow-tooltip
        align="center"
        fixed
      /> -->
      <ElTableColumn
        show-overflow-tooltip
        align="center"
        prop=""
        label="点击ID"
      >
        <template #default="{ row }">
          <el-text v-if="row.typeId == 1">内部调查站</el-text>
          <el-text v-else>{{ row.typeId ? row.typeId : "-" }}</el-text>
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="center" prop="projectId" label="项目ID">
  <template #default="{ row }">
          <el-text>{{ row.projectId ? row.projectId : "-" }}</el-text>
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="center" prop="" label="类型">
  <template #default="{ row }">
          <el-text v-if="row.balanceType == 1">待审金额</el-text>
          <el-text v-if="row.balanceType == 2">可用金额</el-text>
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="center" prop="remark" label="说明"><template #default="{ row }">
          <el-text class="mx-1">{{ row.remark ? row.remark : "-" }}</el-text>
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="center" prop="beforeBalance" width="150" label="变动前">
  <template #default="{ row }">
          <CurrencyType />{{ row.beforeBalance || 0 }}
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="center" prop="addAndSubtraction" width="150" label="加减款"><template
    #default="{ row }">
          <el-text v-if="row.operationType === 2" type="danger" class="mx-1"
            >-<CurrencyType />{{ Math.abs(row.difference) }}</el-text
          >
          <el-text v-else type="success" class="mx-1">
            +<CurrencyType />{{ Math.abs(row.difference) }}</el-text
          >
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="center" prop="afterBalance" width="150" label="变动后">
  <template #default="{ row }">
          <CurrencyType />{{ row.afterBalance || 0 }}
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="center" prop="createTime" label="时间"><template #default="{ row }">
          <el-tag effect="plain" type="info">{{
format(row.createTime)
          }}</el-tag>
        </template>
</ElTableColumn>
<template #empty>
          <el-empty :image="empty" :image-size="300" />
      </template>
</ElTable>
<ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
  :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination" background
  @size-change="sizeChange" @current-change="currentChange" />
</el-drawer>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .rightStatus {
    position: relative;
    width: 128px;

    >div {
      width: 120px;
      height: 2.2rem;
      line-height: 2.2rem;
      text-align: center;
      border-radius: 0.3rem;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 20.8px;

      &::before {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 60%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        content: "";
      }

      &::after {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        content: "";
      }
    }

    >div.isOnlineTrue {
      background-color: #70b51a;

      &::after,
      &::before {
        border: 1px #70b51a dashed;
      }
    }

    >div.isOnlineFalse {
      background-color: #d8261a;

      &::after,
      &::before {
        border: 1px #d8261a dashed;
      }
    }
  }
}
</style>
