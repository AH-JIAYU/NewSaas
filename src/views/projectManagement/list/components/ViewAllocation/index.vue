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
    data.value.list = res.data.getTenantSupplierMemberNameList;
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
      <el-button size="small" type="danger" v-if="data.type === 2">供应商 {{ data.list.length > 1 ? data.list.length : ''
        }}</el-button>
      <el-button size="small" type="success" v-else-if="data.type === 3">会员组{{ data.list.length > 1 ? data.list.length : ''
        }}</el-button>
      <el-button size="small" type="primary" v-else-if="data.type === 4">租户</el-button>

      <div class="idList">
        <div class="item"  v-for="item in data.list">
            <b>{{  item.name}}</b> &ensp; <span>ID: {{ item.id }}</span><copy :content="item.id"/>
        </div>
      </div>

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
.idList{
  margin-top: 24px;
  .item{
    margin: 16px 0;
    display: flex;
    justify-content: start;
    align-items: center;
  }
}
</style>
