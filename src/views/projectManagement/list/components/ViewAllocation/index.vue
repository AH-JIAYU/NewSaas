<script setup lang="ts">
import { ElMessage } from "element-plus";
import cooperationApi from "@/api/modules/user_cooperation"; // 合作合作商

defineOptions({
  name: "AllocationEdit",
});
const emits = defineEmits(["fetch-data"]);
//loading
const loading = ref<boolean>(false);
// 弹框
const dialogTableVisible = ref(false);
// ref
const formRef = ref<any>();
const data = ref<any>({
  list: [], // 表格
  type: "", //类型
  typeList: ["自动分配", "供应商", "会员组", "合作商"],
  supplierList: [], //供应商2
  memberList: [], //内部站3
  tenantList: [], //合作商4
  results: [],
});
// 模拟异步接口调用
const fetchData = async (url: any) => {
  const { data } = await cooperationApi.getTenantSupplierMemberNameInfo(url);

  return data;
};
// 顺序调用接口
const fetchSequentialData = async (params: any) => {
  data.value.supplierList = []
  data.value.memberList =[]
  data.value.tenantList =[]
  for (let item of params.type) {
    // 每次调用接口并等待返回
    const data1 = await fetchData({
      projectId: params.projectId,
      type: item,
    });
    data.value.results.push({
      type: item,
      getTenantSupplierMemberNameList: data1.getTenantSupplierMemberNameList,
    }); // 将返回的数据添加到 results 数组
    data.value.results.forEach((item: any) => {
      if (item.type == 2) {
        data.value.supplierList = item.getTenantSupplierMemberNameList
          ? item.getTenantSupplierMemberNameList
          : [];
      }
      if (item.type == 3) {
        data.value.memberList = item.getTenantSupplierMemberNameList
          ? item.getTenantSupplierMemberNameList
          : [];
      }
      if (item.type == 4) {
        data.value.tenantList = item.getTenantSupplierMemberNameList
          ? item.getTenantSupplierMemberNameList
          : [];
      }
    });
  }
};
// 显隐
async function showEdit(params: any) {
  try {
    loading.value = true;

    fetchSequentialData(params);

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

onMounted(async () => {});
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      title="分配"
      width="700"
      :before-close="closeHandler"
    >
      <!-- <el-button size="small" type="danger" v-if="data.type === 2"
        >供应商 {{ data.list.length > 1 ? data.list.length : "" }}</el-button
      >
      <el-button size="small" type="success" v-else-if="data.type === 3"
        >会员组{{ data.list.length > 1 ? data.list.length : "" }}</el-button
      >
      <el-button size="small" type="primary" v-else-if="data.type === 4"
        >合作商</el-button
      > -->
      <div style="height: 21.875rem;overflow: auto">
      <div class="idList" v-if="data.supplierList.length != 0">
        <el-button size="small" type="danger"
          >供应商
          {{ data.supplierList > 1 ? data.supplierList : "" }}</el-button
        >
        <div class="item" v-for="item in data.supplierList" :key="item.id">
          <b>{{ item.name }}</b> &ensp; <span>ID: {{ item.id }}</span
          ><copy :content="item.id" />
        </div>
      </div>
      <div class="idList" v-if="data.memberList.length != 0">
        <el-button size="small" type="success"
          >内部站 {{ data.memberList > 1 ? data.memberList : "" }}</el-button
        >
        <div class="item" v-for="item in data.memberList" :key="item.id">
          <b>{{ item.name }}</b> &ensp; <span>ID: {{ item.id }}</span
          ><copy :content="item.id" />
        </div>
      </div>
      <div class="idList" v-if="data.tenantList.length != 0">
        <el-button size="small" type="primary"
          >合作商 {{ data.tenantList > 1 ? data.tenantList : "" }}</el-button
        >
        <div class="item" v-for="item in data.tenantList" :key="item.id">
          <b>{{ item.name }}</b> &ensp; <span>ID: {{ item.id }}</span
          ><copy :content="item.id" />
        </div>
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
.idList {
  margin-top: 10px;
  .item {
    margin: 16px 0;
    display: flex;
    justify-content: start;
    align-items: center;
  }
}
</style>
