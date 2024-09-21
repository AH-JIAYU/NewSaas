<script setup lang="ts">
import api from "@/api/modules/survey_vipGroup";
import { obtainLoading } from "@/utils/apiLoading";
import empty from '@/assets/images/empty.png'
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
  queryForm.memberGroupId = row.memberGroupId;
  await fetchData();
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
    const { data } = await obtainLoading(api.getProjectList(params));
    list.value = data.getMemberGroupProjectInfoList;
    pagination.value.total = data.total;
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
  <el-dialog v-model="drawerisible" title="承接项目" @close="close">
    <el-table v-loading="listLoading" border :data="list" stripe>
      <el-table-column type="index" align="left" label="序号" width="55" />
      <el-table-column
        align="left"
        prop="projectId"
        show-overflow-tooltip
        label="项目编码"
      />
      <el-table-column
        align="left"
        prop="projectName"
        show-overflow-tooltip
        label="项目名称"
      />
      <el-table-column
        align="left"
        prop="c"
        show-overflow-tooltip
        label="参数"
      >
      <template #default="{ row }">
            <p class="parameter"><el-text class="mx-1 text" style="color:#FB6868;" type="danger">参与：{{ row.participation
    || 0 }}</el-text><el-text class="mx-1 text" style="color:#03C239;" type="success">完成：{{
    row.comcompleteplete || 0
  }}</el-text></p>
            <p class="parameter"><el-text class="mx-1 text" style="color:#FFAC54;" type="warning">配额：{{ row.num || 0
                }}</el-text><el-text class="mx-1 text" style="color:#AAAAAA;" type="info">限量：{{ row.limitedQuantity || 0
                }}</el-text></p>
          </template>
</el-table-column>

<template #empty>
          <el-empty :image="empty" :image-size="300" />
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
