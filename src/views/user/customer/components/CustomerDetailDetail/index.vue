<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import api from "@/api/modules/user_customer";
import { obtainLoading } from "@/utils/apiLoading";
import { useI18n } from "vue-i18n";
const editRecordList = ref(); // 操作日志下编辑的列表
const dialogTableVisible = ref<boolean>(false);
const { t } = useI18n();
const row = ref<any>(); // 当前行数据
async function showEdit(rowObj: any) {
  row.value = rowObj;
  const params = {
    tenantCustomerOperationId: rowObj.tenantCustomerOperationId,
  };
  const { status, data } = await obtainLoading(api.getRecordList(params));
  // 获取修改的列表
  editRecordList.value = data.getTenantCustomerOperationRecordInfoList;
  dialogTableVisible.value = true;
}

defineExpose({ showEdit });
</script>

<template>
  <el-dialog
    v-model="dialogTableVisible"
    :title="t('customer.detail.detail')"
    width="800"
  >
    <p class="m-4">
      <el-text class="mx-1">
        {{ t("customer.detail.operator") }} {{ row.createName }}
      </el-text>
      <el-text class="mx-1">
        {{ t("customer.detail.operatingTime") }} {{ row.createName }}
        {{ row.createTime }}
      </el-text>
    </p>
    <el-table style="margin-top: 10px" border :data="editRecordList">
      <el-table-column
        align="left"
        type="index"
        :label="t('customer.detail.serialNumber')"
        width="150"
      />
      <el-table-column
        align="left"
        prop="operationContent"
        :label="t('customer.detail.operationContent')"
      />
    </el-table>
  </el-dialog>
</template>
