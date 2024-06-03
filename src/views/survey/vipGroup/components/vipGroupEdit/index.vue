<script setup lang="ts">
const emit = defineEmits(["fetch-data"]);
const drawerisible = ref(false);
const title = ref("新增会员组");
const from = ref<any>({}); //表单
const formRef = ref<any>({}); //表单Ref
// 显隐
async function showEdit(row: any) {
  drawerisible.value = true;
}
// 关闭
function close() {
  emit("fetch-data");
  drawerisible.value = false;
}
// 确定
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
  <el-drawer v-model="drawerisible" size="50%" :title="title" @close="close">
    <ElForm ref="formRef" label-width="100px">
      <!-- <el-card class="box-card"> -->
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="会员组名称"
            prop="name"
            style="float: left; width: 18.5rem"
          >
            <el-input v-model="from.name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8" />
        <el-col :span="8" />
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="组状态"
            prop="client_pid"
            style="float: left; width: 18.5rem"
          >
            <el-switch v-model="isTrue" />
          </el-form-item>
        </el-col>
        <el-col :span="8" />
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item
            label="组成员"
            prop="name"
            style="float: left; width: 18.5rem"
          >
            <el-cascader placeholder="模糊搜索" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item>
            <div class="radius p-2">用户1</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item
            style="float: left; width: 18.5rem"
            label="组长"
            prop="top"
          >
            <el-select placeholder="模糊搜索" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- </el-card> -->
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close"> 取消 </el-button>
        <el-button> 暂存 </el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </div>
    </template>
  </el-drawer>
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
.radius {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  min-height: 6rem;
  width: 100%;
}
</style>
