<script setup lang="ts">
// import api from "@/api/modules/survey_vipGroup";
import { obtainLoading } from "@/utils/apiLoading";
const emit = defineEmits(["fetch-data"]);
const { pagination, getParams, onSizeChange, onCurrentChange } =
  usePagination(); // 分页

const drawerisible = ref(false);
const listLoading = ref<boolean>(false);
const list = ref([]); // 列表
// 请求接口携带参数
const queryForm = reactive<any>({
  memberGroupId: "", //	会员组id
});
async function showEdit(row: any) {
  // queryForm.memberGroupId = row.memberGroupId;
  // await fetchData();
  drawerisible.value = true;
}
// 获取列表
async function fetchData() {
  try {
    listLoading.value = true;
    const params: any = {
      ...getParams(),
      ...queryForm,
    };
    // const { data } = await obtainLoading(api.getProjectList(params));
    // list.value = data.getMemberGroupProjectInfoList;
    // pagination.value.total = data.total;
    listLoading.value = false;
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => fetchData());
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => fetchData());
}
function close() {
  drawerisible.value = false;
}

defineExpose({
  showEdit,
});
</script>

<template lang="">
  <el-dialog v-model="drawerisible" title="解析记录" @close="close">
    <el-table v-loading="listLoading" border :data="list" stripe>
      <el-table-column
        align="center"
        prop="projectId"
        show-overflow-tooltip
        label="备案号"
      />
      <el-table-column
        align="center"
        prop="projectName"
        show-overflow-tooltip
        label="记录值"
      />
      <el-table-column
        align="center"
        prop="projectName"
        show-overflow-tooltip
        label="状态"
      />
      <el-table-column
        align="center"
        prop="projectName"
        show-overflow-tooltip
        label="时间"
      />
<template #empty>
        <el-empty class="vab-data-empty" description="暂无数据" />
      </template>
</el-table>
<template #footer>
      <div class="dialog-footer">
        <el-button @click="close"> 取消 </el-button>
        <el-button type="primary" @click="close"> 确定 </el-button>
      </div>
    </template>
<ElPagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size"
  :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination" background
  @size-change="sizeChange" @current-change="currentChange" />
</el-dialog>
</template>

<style scoped lang="scss">
:deep {
  .el-divider {
    margin: 20px 0;
  }

  .el-card {
    margin-bottom: 10px;
  }

  .el-row,
  .el-table {
    width: 94% !important;
    margin: auto !important;
  }
}

.parameter {
  text-align: left !important;
}

.text {
  display: inline-block;
  min-width: 4.375rem;
}
</style>
