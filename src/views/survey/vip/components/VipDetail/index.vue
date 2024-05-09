<script setup>
import VipDetailDetail from "../VipDetailDetail/index.vue";

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
    <el-card>
      <el-form label-width="100px" label-position="right">
        <el-divider content-position="left"> 基本信息 </el-divider>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="会员名称">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属国家">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会员姓名">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">

          </el-col>
        </el-row>

        <el-divider content-position="left"> 权限信息 </el-divider>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="B2B">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="B2C">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="角色">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="提成比例(%)">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会员组">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left"> 操作日志 </el-divider>

        <el-table :data="list" stripe border>
          <el-table-column align="center" type="index" label="序号" width="50" />
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
      </el-form>
    </el-card>
    <VipDetailDetail ref="checkRef" />
  </el-drawer>
</template>
<style scoped lang="scss">
:deep {
  .el-divider {
    margin: 20px 0;
  }

  .el-row,
  .el-table {
    width: 94% !important;
    margin: auto !important;
  }
}
</style>
