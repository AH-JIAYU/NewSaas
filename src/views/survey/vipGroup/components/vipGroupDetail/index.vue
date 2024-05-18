<script setup>
import vipGroupDetailDetail from "../vipGroupDetailDetail/index.vue";

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref(false);
const checkRef = ref("");
const title = ref("详情");
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
const list = [
  { a: 1, b: 2, c: 3, id: 1 },
  { a: 1, b: 2, c: 3, id: 1 },
];
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
    size="55%"
    :title="title"
    @close="close"
  >

      <el-form label-width="100px" label-position="right">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
<el-row :gutter="24">
  <el-col :span="8">
    <el-form-item label="会员组ID">
      <el-text class="mx-1">xxxxxx</el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="会员组名称">
      <el-text class="mx-1">xxxxxx</el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="组长">
      <el-text class="mx-1">xxxxxx</el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="小组长">
      <el-text class="mx-1">xxxxxx</el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="接单授权">
      <el-text class="mx-1">xxxxxx</el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="创建人">
      <el-text class="mx-1">xxxxxx</el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="创建时间">
      <el-text class="mx-1">xxxxxx</el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">

  </el-col>
</el-row>
</el-card>
<el-card class="box-card">
  <template #header>
            <div class="card-header">
              <span>小组成员</span>
            </div>
          </template>
  <el-table :data="list" stripe border>
    <el-table-column align="center" type="index" label="序号" width="60" />
    <el-table-column align="center" prop="a" label="私域会员ID" />
    <el-table-column align="center" prop="b" label="私域会员名称" />
    <el-table-column align="center" prop="c" label="角色" />
  </el-table>
</el-card>
<el-card class="box-card">
  <template #header>
            <div class="card-header">
              <span>操作日志</span>
            </div>
          </template>
  <el-table :data="list" stripe border>
    <el-table-column align="center" type="index" label="序号" width="60" />
    <el-table-column align="center" prop="a" label="操作时间" />
    <el-table-column align="center" prop="b" label="操作人" />
    <el-table-column align="center" prop="c" label="操作事项" />
    <el-table-column align="center" label="详情">
      <template #default="{ row }">
              <el-button type="primary" link @click="handleCheck(row)">
                详情
              </el-button>
            </template>
    </el-table-column>
  </el-table>
</el-card>
</el-form>

<vipGroupDetailDetail ref="checkRef" />
</el-drawer>
</template>
<style scoped lang="scss">
:deep {
  .el-divider {
    margin: 20px 0;
  }
  .el-card{
    margin-bottom: 10px;
  }
  .el-row,
  .el-table {
    width: 94% !important;
    margin: auto !important;
  }
  
}
</style>
