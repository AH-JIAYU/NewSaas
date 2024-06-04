<script setup>
const emit = defineEmits(["fetch-data"]);
const drawerisible = ref(false);
const checkRef = ref("");
async function showEdit(row) {
  drawerisible.value = true;
}
function handleCheck(row) {
  checkRef.value.showEdit(row);
}
function close() {
  emit("fetch-data"); 
  drawerisible.value = false;
}
const save = () => {
  console.log("save");
};
const list = [
  { a: 1, b: 2, c: 3, id: 1 },
  { a: 1, b: 2, c: 3, id: 1 },
];
defineExpose({
  showEdit,
});
</script>

<template lang="">
  <el-dialog v-model="drawerisible"  title="承接项目" @close="close">
    <el-table
      v-loading="listLoading"
      border
      :data="list"
      stripe
      @selection-change="setSelectRows"
    >
      <el-table-column type="index" align="center" label="序号" width="55" />
      <el-table-column
        align="center"
        prop="b"
        show-overflow-tooltip
        label="项目编码"
      />
      <el-table-column
        align="center"
        prop="b"
        show-overflow-tooltip
        label="项目名称"
      />
      <el-table-column
        align="center"
        prop="c"
        show-overflow-tooltip
        label="参与/完成/配额/限量"
      />
      <template #empty>
        <el-empty class="vab-data-empty" description="暂无数据" />
      </template>
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close"> 取消 </el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </div>
    </template>
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
</style>
