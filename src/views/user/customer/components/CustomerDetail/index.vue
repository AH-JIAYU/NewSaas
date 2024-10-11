<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerDetailDetail from "../CustomerDetailDetail/index.vue";
import api from "@/api/modules/user_customer";
import { obtainLoading } from "@/utils/apiLoading";

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const checkRef = ref<any>();
const detailData = ref<any>(); // 详情数据
async function showEdit(row: any) {
  const params = {
    tenantCustomerId: row.tenantCustomerId,
  };
  const { status, data } = await obtainLoading(api.detail(params));
  detailData.value = data;

  drawerisible.value = true;
}

function close() {
  emit("fetch-data");
  drawerisible.value = false;
}
const handleCheck = (row: any) => {
  checkRef.value.showEdit(row)
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
    <el-form  label-position="right">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">基本信息</div>
            <div class="rightStatus">
              <div
                :class="
                  detailData.customerStatus === 1
                    ? 'isOnlineFalse'
                    : 'isOnlineTrue'
                "
              >
                {{ detailData.customerStatus === 1 ? "禁用" : "启用" }}
              </div>
            </div>
          </div>
        </template>
<el-row :gutter="24">
  <el-col :span="8">
    <el-form-item label="客户编码:">
      <el-text class="mx-1 copyId">
        {{
        detailData.tenantCustomerId
        ? detailData.tenantCustomerId
        : "-"
        }}
              <copy class="copy" :content="detailData.tenantCustomerId " />
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="客户名称:">
      <el-text class="mx-1">
        {{
        detailData.customerAccord ? detailData.customerAccord : "-"
        }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="客户简称:">
      <el-text class="mx-1">
        {{
        detailData.customerShortName ? detailData.customerAccord : "-"
        }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="公司名称:">
      <el-text class="mx-1">
        {{ detailData.companyName ? detailData.companyName : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="客户姓名:">
      <el-text class="mx-1">
        {{ detailData.customerName ? detailData.customerName : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="手机号码:">
      <el-text class="mx-1">
        {{ detailData.customerPhone ? detailData.customerPhone : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="电子邮箱:">
      <el-text class="mx-1">
        {{ detailData.emailAddress ? detailData.emailAddress : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="创建人:">
      <el-text class="mx-1">
        {{ detailData.createName ? detailData.createName : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="创建时间:">
      <el-text class="mx-1">
        {{ detailData.createTime ? detailData.createTime : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="负责人:">
      <el-text class="mx-1">
        {{ detailData.chargeName ? detailData.chargeName : "-" }}
      </el-text>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item label="结算周期:">
      <el-text class="mx-1">
        {{
        detailData.settlementCycle
        ? detailData.settlementCycle + "天"
        : "-"
        }}
      </el-text>
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
          <div v-if="detailData.customerStatus === 1" class="close">关闭</div>
        <div v-else class="open">开启</div>
        </el-text>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="资料:">
        <el-text class="mx-1">
          <div v-if="detailData.antecedentQuestionnaire === 1" class="close">关闭</div>
        <div v-else class="open">开启</div>
        </el-text>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="风险控制:">
        <el-text class="mx-1">
          <div v-if="detailData.riskControl === 1" class="close">关闭</div>
        <div v-else class="open">开启</div>
        </el-text>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="营业限额/月:">
        <el-text class="mx-1">
          <CurrencyType />{{ detailData.turnover || 0 }}
        </el-text>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="审核率Min值:">
        <el-text class="mx-1">
          {{ detailData.turnover ? detailData.turnover + "%" : "-" }}
        </el-text>
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
  <el-table :data="detailData.getTenantCustomerOperationInfoList">
    <el-table-column align="left" type="index" label="序号" width="80" />
    <el-table-column align="left" prop="createTime" label="操作时间" />
    <el-table-column align="left" prop="createName" label="操作人" />

    <el-table-column align="left" label="操作事项">
      <template #default="{ row }">
              {{ operationType(row.operationType) }}
            </template>
    </el-table-column>
    <el-table-column align="left" label="详情">
      <template #default="{ row }">
              <el-button
                type="primary"
                link
                @click="handleCheck(row)"
                v-if="row.operationType === 2"
              >
                详情
              </el-button>
              <el-text v-else>-</el-text>
            </template>
    </el-table-column>
  </el-table>
</el-card>
</el-form>
<template #footer>
      <div style="flex: auto">
        <el-button type="primary" @click="close">关闭</el-button>
      </div>
    </template>
<customerDetailDetail ref="checkRef" />
</el-drawer>
</template>

<style scoped lang="scss">
  .el-card {
    margin: 10px 0;
    padding-top: 10px;
  }
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center !important;

  .leftTitle {
    .spanStatus {
      width: 60px !important;
      height: 20px !important;
      background: var(--el-color-primary);
      color: var(--el-color-white);
      padding: 0 8px;
      font-size: 0.875rem;
      border-radius: 3.125rem;
    }
  }

  .rightStatus {
    position: relative;

    >div {
      width: 100px;
      text-align: center;
      border-radius: 0.3rem;
      color: #fff;
      font-size: 20.8px;
    }

    >div.isOnlineTrue {
      background-color: #03C239;
    }

    >div.isOnlineFalse {
      background-color: #d8261a;
    }
  }
}
.open {
  color: #409eff;
}

.close {
  color: #e2e2e2;
}
</style>
