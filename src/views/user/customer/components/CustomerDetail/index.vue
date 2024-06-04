<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerDetailDetail from "../CustomerDetailDetail/index.vue";
import api from "@/api/modules/user_customer";
import apiLoading from "@/utils/apiLoading";

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const checkRef = ref<any>();
const detailData = ref<any>(); // 详情数据
const detailStatus = ref("开启");
async function showEdit(row: any) {
  const params = {
    tenantCustomerId: row.tenantCustomerId,
  };
  const { status, data } = await apiLoading(api.detail(params));
  detailStatus.value = data.customerStatus === 1 ? "关闭" : "开启";
  detailData.value = data;
  status === 1 &&
    ElMessage.success({
      message: "查询成功",
      center: true,
    });
  drawerisible.value = true;
}
function handleCheck(row: object) {
  checkRef.value.showEdit(row);
}
function close() {
  emit("fetch-data");
  drawerisible.value = false;
}

const operationType = (type: number) => {
  const typeArray = ["新增", "编辑", "启用", "禁用"];
  return typeArray[type - 1];
};

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
    size="60%"
    title="详情"
    @close="close"
  >
    <el-form label-width="100px" label-position="right">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>基本信息</span>

            <div class="status">
              <div class="i-ph:seal-light w-1em h-1em"></div>
              <div>{{detailStatus}}</div>
            </div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="客户编码:">
              <el-text class="mx-1">
                {{ detailData.tenantCustomerId }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称:">
              <el-text class="mx-1"> {{ detailData.customerAccord }} </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户简称:">
              <el-text class="mx-1">
                {{ detailData.customerShortName }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司名称:">
              <el-text class="mx-1"> {{ detailData.companyName }} </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户姓名:">
              <el-text class="mx-1"> {{ detailData.customerName }} </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码:">
              <el-text class="mx-1"> {{ detailData.customerPhone }} </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱:">
              <el-text class="mx-1"> {{ detailData.emailAddress }} </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人:">
              <el-text class="mx-1"> {{ detailData.createName }} </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间:">
              <el-text class="mx-1"> {{ detailData.createTime }} </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人:">
              <el-text class="mx-1"> {{ detailData.chargeName }} </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算周期:">
              <el-text class="mx-1"> {{ detailData.settlementCycle }} </el-text>
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
            <el-form-item label="客户状态:">
              <el-text class="mx-1">
                {{ detailData.customerStatus === 1 ? "关闭" : "开启" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资料:">
              <el-text class="mx-1">
                {{ detailData.antecedentQuestionnaire === 1 ? "关闭" : "开启" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="风险控制:">
              <el-text class="mx-1">
                {{ detailData.riskControl === 1 ? "关闭" : "开启" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业限额/月:">
              <el-text class="mx-1"> {{ detailData.turnover }} </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核率Min值:">
              <el-text class="mx-1"> {{ detailData.turnover }} </el-text>
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
        <el-table :data="detailData.getTenantCustomerOperationInfoList" border>
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="createTime" label="操作时间" />
          <el-table-column prop="createName" label="操作人" />

          <el-table-column label="操作事项">
            <template #default="{ row }">
              {{ operationType(row.operationType) }}
            </template>
          </el-table-column>
          <el-table-column label="详情:">
            <template #default="{ row }">
              <el-button
                type="primary"
                link
                @click="handleCheck(row)"
                v-if="row.operationType === 2"
              >
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <customerDetailDetail ref="checkRef" />
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.status {
  position: relative;
  width: 8rem;

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
