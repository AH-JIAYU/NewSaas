<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/financial_pm_log";
import apiUse from '@/api/modules/configuration_manager'
import empty from '@/assets/images/empty.png'

// 时间
const { format } = useTimeago();
const emit = defineEmits(["fetch-data"]);
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
// 用户数据
const staffList = ref<any>([]);
// 表单数据
const data = ref<any>({
  loading: false,
  activeName: "myFinancial",
  tableAutoHeight: false, // 表格是否自适应高度
  border: true, // 表格控件-是否展示边框
  stripe: true, // 表格控件-是否展示斑马条
  lineHeight: "default", // 表格控件-控制表格大小
  checkList: [],
  search: {
    // 分页页码
    page: 1,
    // 每页数量
    limit: 10,
    // 用户id
    userId: null,
    // 组织架构id
    organizationalStructureId: null,
  },
});
const drawerisible = ref<boolean>(false);
// 详情数据
const detailData = ref<any>();
// 编辑
async function showEdit(row: any) {
  if (row.organizationalStructureId) {
    data.value.search.organizationalStructureId = row.organizationalStructureId
    await getDataList()
    const ress = await apiUse.queryNotEnableStaffList({ organizationalStructureId: data.value.search.organizationalStructureId })
    staffList.value = ress.data
  }
  drawerisible.value = true;
}
// 获取列表数据
const getDataList = async () => {
  try {
    data.value.loading = true;
    const params = {
      ...data.value.search,
    };
    const res = await api.getStaffFinancial(params)
    detailData.value = res.data.userList;
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
    // 用户id
    userId: null,
    // 组织架构id
    organizationalStructureId: null,
  })
  drawerisible.value = false;
}

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
    size="70%"
    title="财务日志"
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
      <!-- <ElFormItem>
        <el-select style="width:10.5rem" v-model="data.search.userId" placeholder="请选择员工" clearable filterable @change="currentChange()">
        <el-option v-for="item in staffList"
        :key="item.id"
        :label="item.userName"
        :value="item.id">
        </el-option>
        </el-select>
      </ElFormItem> -->
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
        align="left"
        fixed
      /> -->
      <ElTableColumn
        show-overflow-tooltip
        align="left"
        prop=""
        label="点击ID"
      >
        <template #default="{ row }">
          <!-- <el-text v-if="row.typeId == 1">内部调查站</el-text> -->
          <el-text class="color3">{{ row.clientId ? row.clientId : "-" }}</el-text>
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="projectId" label="项目ID">
  <template #default="{ row }">
          <el-text class="color3">{{ row.projectId ? row.projectId : "-" }}</el-text>
        </template>
</ElTableColumn>
<!-- <ElTableColumn show-overflow-tooltip align="left" prop="" label="PM">
  <template #default="{ row }">
          <el-text class="color3">{{row.userName ? row.userName : '-'}}</el-text>
        </template>
</ElTableColumn> -->
<ElTableColumn show-overflow-tooltip align="left" prop="remark" label="业绩"><template #default="{ row }">
          <el-text class="mx-1 color3">{{ row.doMoney ? row.doMoney : "-" }}</el-text>
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="beforeBalance" width="150" label="变动前">
  <template #default="{ row }">
          <CurrencyType /><el-text class="mx-1 color3">{{ row.beforeBalance || 0 }}</el-text>
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="addAndSubtraction" width="150" label="提成"><template
    #default="{ row }">
          <el-text v-if="row.type === 2" type="" class="mx-1 color3"
            ><div class="minusSign i-iconamoon:sign-minus-bold w-1em h-1em"></div><CurrencyType />{{ Math.abs(row.difference) }}</el-text
          >
          <el-text v-else type="" class="mx-1 color3">
            <div class="plusSpan i-typcn:plus w-1em h-1em"></div><CurrencyType />{{ Math.abs(row.difference) }}</el-text
          >
          <!-- <el-text class="mx-1">{{ row.difference ? row.difference : "-" }}</el-text> -->
          <!-- <CurrencyType />{{ row.difference || 0 }} -->
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="afterBalance" width="150" label="变动后">
  <template #default="{ row }">
          <CurrencyType /><el-text class="color3">{{ row.afterBalance || 0 }}</el-text>
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="remark" label="说明"><template #default="{ row }">
          <el-text class="mx-1 color3">{{ row.remark ? row.remark : "-" }}</el-text>
        </template>
</ElTableColumn>
<ElTableColumn show-overflow-tooltip align="left" prop="createTime" width="200" label="时间"><template #default="{ row }">
              <el-tooltip :content="row.createTime" placement="top"  >
                <!-- <el-tag effect="plain" type="info">{{format(row.createTime)}}</el-tag> -->
                {{  row.createTime ? row.createTime : "-" }}
              </el-tooltip>
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

.plusSpan {
  color: #35cd61;
}
.minusSign {
  color: #fb6868;
}
</style>
