<script setup lang="ts">
import { ref } from "vue";
import api from "@/api/modules/project_settlement";

defineOptions({
  name: "RefundDetails",
});
const form = ref<any>({});
const list = ref<any>([]);
const data = ref<any>({});
const loading = ref(false);
// 弹框开关变量
const dialogTableVisible = ref(false);
// 获取数据
async function showEdit(row: any) {
  try {
    loading.value = true;
    form.value = JSON.parse(row);
    const res = await api.detail({ projectSettlementId: form.value.projectId });
    data.value = res.data;
    list.value = res.data.result;
    loading.value = false;
    dialogTableVisible.value = true;
  } catch (error) {

  } finally {
    loading.value = false;
  }
}
// 弹框关闭事件
function closeHandler() {
  // // 重置表单
  Object.assign(form, {});
  Object.assign(list, []);
  Object.assign(data, {});
  dialogTableVisible.value = false;
}
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-dialog v-model="dialogTableVisible" title="项目退款详情" width="900" :before-close="closeHandler">
      <el-divider content-position="left" />
      <el-row style="width: 100%; margin-left: 2px; margin-bottom: 20px" :gutter="20">
        <div class="border">
          <p class="pp">项目ID</p>
          <p class="neip">{{ form.projectId ? form.projectId : "-" }}</p>
        </div>
        <div class="border">
          <p class="pp">项目名称</p>
          <p class="neip">
            <el-text class="mx-1">{{
    form.projectName ? form.projectName : "-"
  }}</el-text>
          </p>
        </div>
        <div class="border">
          <p class="pp">项目退款率</p>
          <p class="neip">{{ data.refundRate ? data.refundRate : "-" }}</p>
        </div>
      </el-row>
      <div style="margin: 10px">| 供应商</div>
      <el-table v-loading="loading" :data="list" row-key="id">
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column align="center" prop="supplierId" label="供应商ID" />
        <el-table-column align="center" prop="supplierId" label="供应商名称">
          <template #default="{ row }">
            {{ row.supplierName ? row.supplierName : "-" }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="supplierId" label="手机号码/邮箱"><template #default="{ row }">
            {{ row.info.split(":")[0] }}/{{
    row.info.split(":")[1] !== "null" ? row.info.split(":")[1] : "-"
  }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="refundRate" label="供应商退款率" />
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
      <div style="margin-top: 20px; margin-bottom: 20px">
        | 会员组
        <el-text class="mx-1">退款率{{
      data.memberRefundRate ? data.memberRefundRate + "%" : "-"
    }}</el-text>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.border {
  display: flex;
  align-items: center;
  width: 33%;
  height: 2.5625rem;
  margin: 0;
  border: 1px solid #ebeef5;
}

.pp {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 36%;
  height: 100%;
  font-size: 14px;
  color: #606266;
  background-color: #fafafa;
}

.neip {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 63%;
  height: 100%;
  border-left: 1px solid #ebeef5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
}

:deep(.el-dialog) {
  // height: 25rem;
}
</style>
