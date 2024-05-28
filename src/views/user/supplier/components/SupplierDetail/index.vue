<script setup lang="ts">
import SupplierDetailDetail from "../SupplierDetailDetail/index.vue";

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref(false);
const checkRef = ref<any>();
const title = ref("详情");
async function showEdit(row: any) {
  drawerisible.value = true;
}
function handleCheck(row: any) {
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
    size="70%"
    :title="title"
    @close="close"
  >
    <!-- <el-card> -->
    <el-form label-width="100px" label-position="right">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>基本信息</span>
            <div class="status">
              <div class="i-ph:seal-light w-1em h-1em"></div>
              <div>开启</div>
            </div>
          </div>
        </template>

        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="供应商ID">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商名称">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属国家">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商等级">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商姓名">
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
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>权限信息</span>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="调查系统">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
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
            <el-form-item label="关联国家">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联渠道">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>财务信息</span>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="付款方式">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户名称">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款账号">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算周期">
              <el-input disabled placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>操作日志</span>
          </div>
        </template>
        <el-table :data="list" stripe border>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="a" label="操作时间" />
          <el-table-column prop="b" label="操作人" />
          <el-table-column prop="c" label="操作事项" />
          <el-table-column label="详情">
            <template #default="{ row }">
              <el-button type="primary" link @click="handleCheck(row)">
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-form>
    <!-- </el-card> -->
    <SupplierDetailDetail ref="checkRef" />
  </el-drawer>
</template>

<style scoped lang="scss">
.status {
  position: relative;
  width: 8rem;
  z-index: 999;

  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.3rem;
  }
  > div:nth-child(1) {
    font-size: 8rem;
  }
}
:deep {
  .el-divider {
    margin: 20px 0;
  }

  .el-card {
    margin: 10px 0;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }

  .el-drawer__header {
    border-bottom: 1px solid #aaa !important;
  }

  .el-row,
  .el-table {
    width: 94% !important;
    margin: auto !important;
  }
}
</style>
