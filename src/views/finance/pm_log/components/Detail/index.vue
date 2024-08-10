<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
// import api from "@/api/modules/user_customer";
// import { obtainLoading } from "@/utils/apiLoading";

const emit = defineEmits(["fetch-data"]);
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } =
  usePagination();
const data = ref<any>({
  loading: false,
  activeName: "myFinancial",
  tableAutoHeight: false, // 表格是否自适应高度
  border: true, // 表格控件-是否展示边框
  stripe: false, // 表格控件-是否展示斑马条
  lineHeight: "default", // 表格控件-控制表格大小
  checkList: [],
  search: {
    title: "",
  },
});
const drawerisible = ref<boolean>(false);
const checkRef = ref<any>();
const detailData = ref<any>(); // 详情数据
async function showEdit(row: any) {
  console.log("row", row);
  const params = {
    tenantCustomerId: row.tenantCustomerId,
  };
  // const { status, data } = await obtainLoading(api.detail(params));
  // detailData.value = data;
  // status === 1 &&
  //   ElMessage.success({
  //     message: "查询成功",
  //     center: true,
  //   });
  drawerisible.value = true;
}

function close() {
  emit("fetch-data");
  drawerisible.value = false;
}

const operationType = (type: number) => {
  const typeArray = ["新增", "编辑", "启用", "禁用"];
  return typeArray[type - 1];
};
defineExpose({
  showEdit,
});
</script>

<template lang="">
  <el-drawer
    v-model="drawerisible"
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
        <ElInput
          v-model="data.search.title"
          placeholder="月份"
          clearable
          @keydown.enter="currentChange()"
          @clear="currentChange()"
        />
      </ElFormItem>
      <ElFormItem>
        <p>业绩:</p>
      </ElFormItem>
    </ElForm>
    <ElTable
      v-loading="data.loading"
      :border="data.border"
      :size="data.lineHeight"
      :stripe="data.stripe"
      class="my-4"
      :data="detailData?.getTenantCustomerOperationInfoList"
      highlight-current-row
      height="100%"
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
      <ElTableColumn
        show-overflow-tooltip
        align="center"
        prop="projectId"
        label="项目ID"
      >
        <template #default="{ row }">
          <el-text>{{ row.projectId ? row.projectId : "-" }}</el-text>
        </template>
      </ElTableColumn>
      <ElTableColumn show-overflow-tooltip align="center" prop="" label="类型">
        <template #default="{ row }">
          <el-text v-if="row.type == 1">待审金额</el-text>
          <el-text v-if="row.type == 2">可用金额</el-text>
        </template>
      </ElTableColumn>
      <ElTableColumn
        show-overflow-tooltip
        align="center"
        prop="remark"
        label="说明"
        ><template #default="{ row }">
          <!-- <el-text v-if="!row.remark.includes('余额')" class="mx-1">{{
              `记录变更:${parseStatusString(row.remark)[0]}变更为${
                parseStatusString(row.remark)[1]
              }`
            }}</el-text> -->
          <el-text class="mx-1">{{ row.remark ? row.remark : "-" }}</el-text>
        </template>
      </ElTableColumn>
      <ElTableColumn
        show-overflow-tooltip
        align="center"
        prop="beforeBalance"
        width="150"
        label="变动前"
      >
        <template #default="{ row }">
          <CurrencyType />{{ row.beforeBalance || 0 }}
        </template>
      </ElTableColumn>
      <ElTableColumn
        show-overflow-tooltip
        align="center"
        prop="addAndSubtraction"
        width="150"
        label="加减款"
        ><template #default="{ row }">
          <el-text v-if="row.operationType === 2" type="danger" class="mx-1"
            >-<CurrencyType />{{ Math.abs(row.addAndSubtraction) }}</el-text
          >
          <el-text v-else type="success" class="mx-1">
            +<CurrencyType />{{ Math.abs(row.addAndSubtraction) }}</el-text
          >
        </template>
      </ElTableColumn>
      <ElTableColumn
        show-overflow-tooltip
        align="center"
        prop="afterBalance"
        width="150"
        label="变动后"
      >
        <template #default="{ row }">
          <CurrencyType />{{ row.afterBalance || 0 }}
        </template></ElTableColumn
      >
      <ElTableColumn
        show-overflow-tooltip
        align="center"
        prop="createTime"
        label="时间"
        ><template #default="{ row }">
          <el-tag effect="plain" type="info">{{
            format(row.createTime)
          }}</el-tag>
        </template>
      </ElTableColumn>
      <template #empty>
        <el-empty class="vab-data-empty" description="暂无数据" />
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

    > div {
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
    > div.isOnlineTrue {
      background-color: #70b51a;
      &::after,
      &::before {
        border: 1px #70b51a dashed;
      }
    }

    > div.isOnlineFalse {
      background-color: #d8261a;
      &::after,
      &::before {
        border: 1px #d8261a dashed;
      }
    }
  }
}
</style>
