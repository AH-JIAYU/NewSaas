<script setup lang="ts">
import api from "@/api/modules/survey_myProjeck";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";

defineOptions({
  name: "Edit",
});
// 弹框开关变量
const dialogTableVisible = ref(false);
const data = reactive<any>({
  list: [],
});
// 获取数据
async function showEdit(row: any) {
  const res = await obtainLoading(
    api.getMemberPriceList({ projectId: row.projectId })
  );
  data.list = res.data.getMemberPriceListInfoList;
  dialogTableVisible.value = true;
}

// 提交数据
function close() {
  dialogTableVisible.value = false;
}

// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      title="查看你会员价格"
      direction="rtl"
      :close-on-click-modal="false"
    >
      <el-table :data="data.list" border stripe>
        <el-table-column label="会员ID" prop="memberId" />
        <el-table-column label="会员姓名" prop="memberName" />
        <el-table-column label="会员等级" prop="memberLevelName" />
        <el-table-column label="会员价格" prop="memberPrice">
          <template #default="{ row }">
            <el-text style="color: #FD8989;" ><CurrencyType /></el-text>{{ row.memberPrice || 0 }}
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <div>
          <el-button @click="close"> 关闭 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.eldivider {
  font-size: 20px;
  font-weight: 700;
}
.eldividers {
  font-size: 30px;
  text-align: center;
  color: #52b0cb;
}

:deep {
  .rightspan {
    text-align: right;
    font-size: 12px;
    margin-right: 20px;
  }
}
</style>
