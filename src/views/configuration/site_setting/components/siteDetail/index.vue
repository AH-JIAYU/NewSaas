<script setup lang="ts">
import empty from '@/assets/images/empty.png'

// 分页
const { pagination, getParams, onSizeChange, onCurrentChange } = usePagination();
const drawerisible = ref(false);
// 判断顶级域名是否解析
const isAnalysis = ref<boolean>(false);
// listLoading
const listLoading = ref<boolean>(false);
// 列表
const list = ref([]);
async function showEdit(row: any) {
  try {
    listLoading.value = true;
    if (row) {
      list.value = row.data.list
      isAnalysis.value = row.data.success
      pagination.value.total = row.data.list.length
      listLoading.value = false;
    } else {
      list.value = row || []
    }
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
  drawerisible.value = true;
}
// 关闭弹框
function close() {
  list.value = []
  drawerisible.value = false;
}
// 暴露
defineExpose({
  showEdit,
});
</script>

<template>
  <el-dialog v-model="drawerisible" title="解析记录" @close="close">
    <el-table v-loading="listLoading" border :data="list" stripe max-height="370">
      <el-table-column align="center" prop="type" show-overflow-tooltip label="状态" />
      <el-table-column align="center" prop="host" show-overflow-tooltip label="解析类型" />
      <el-table-column align="center" prop="host" show-overflow-tooltip label="记录值" />
      <el-table-column align="center" prop="projectName" show-overflow-tooltip label="指向">
        <template #default>
          {{ isAnalysis ? '已生效' : '未生效' }}
        </template>
      </el-table-column>
      <template #empty>
        <el-empty :image="empty" :image-size="300" />
      </template>
    </el-table>
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
