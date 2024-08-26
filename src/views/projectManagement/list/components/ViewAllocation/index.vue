<script setup lang="ts">
import { ElMessage } from "element-plus";
import cooperationApi from "@/api/modules/user_cooperation"; // 合作租户

defineOptions({
  name: "AllocationEdit",
});
const emits = defineEmits(["fetch-data"]);
//loading
const loading = ref<boolean>(false)
// 弹框
const dialogTableVisible = ref(false);
// ref
const formRef = ref<any>();
const data = ref<any>({
  list: [], // 表格
  type: "", //类型
  typeList: ["自动分配", "供应商", "会员组", "租户"],
});

// 显隐
async function showEdit(params: any) {
  try {
    loading.value = true;
    const res = await cooperationApi.getTenantSupplierMemberNameInfo(params);
    data.value.list = [res.data];
    data.value.type = params.type;
    loading.value = false;
    dialogTableVisible.value = true;
  } catch (error) {

  } finally {
    loading.value = false;
  }
}

// 弹框关闭事件
function closeHandler() {
  dialogTableVisible.value = false;
}

onMounted(async () => { });
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog v-model="dialogTableVisible" title="分配" width="700" :before-close="closeHandler">
      <el-table v-if="data.list.length" :data="data.list" v-loading="loading" row-key="id">
        <el-table-column align="center" show-overflow-tooltip type="index" />
        <el-table-column align="center" show-overflow-tooltip :label="data.typeList[data.type - 1] + 'id'" prop="id" />
        <el-table-column align="center" show-overflow-tooltip :label="data.typeList[data.type - 1] + '名称'"
          prop="name" />
      </el-table>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeHandler"> 关闭 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-form-item.asterisk-left {
    align-items: center;
  }
}
</style>
