<script setup lang="ts">
import { ElMessage } from "element-plus";
import SupplierDetailDetail from "../SupplierDetailDetail/index.vue";
import api from "@/api/modules/user_supplier";
import { obtainLoading } from "@/utils/apiLoading";

const emit = defineEmits(["fetch-data"]);
const drawerisible = ref(false);
const checkRef = ref<any>();
const detailData = ref<any>(); // 详情数据
async function showEdit(row: any) {
  const params = {
    tenantSupplierId: row.tenantSupplierId,
  };
  const { status, data } = await obtainLoading(api.detail(params));
  detailData.value = data;

  drawerisible.value = true;
}
function handleCheck(row: any) {
  checkRef.value.showEdit(row);
}
function close() {
  emit("fetch-data");
  drawerisible.value = false;
}
const operationType = (type: number) => {
  const typeArray = ["新增", "编辑", "启用", "禁用", "审批", "加减款"];
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
    size="70%"
    title="详情"
    @close="close"
  >
    <!-- <el-card> -->
    <el-form label-width="100px" label-position="right">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">基本信息</div>
            <div class="rightStatus">
              <div
                :class="
                  detailData.supplierStatus === 1
                    ? 'isOnlineFalse'
                    : 'isOnlineTrue'
                "
              >
                {{ detailData.supplierStatus === 1 ? "关闭" : "开启" }}
              </div>
            </div>
          </div>
        </template>

        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="供应商ID:">
              {{
                detailData.tenantSupplierId ? detailData.tenantSupplierId : "-"
              }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商名称:">
              {{ detailData.supplierAccord ? detailData.supplierAccord : "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属国家:">
              {{
                detailData.subordinateCountryName
                  ? detailData.subordinateCountryName
                  : "-"
              }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商等级:">
              {{
                detailData.supplierLevelId ? detailData.supplierLevelId : "-"
              }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商姓名:">
              {{ detailData.supplierName ? detailData.supplierName : "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码:">
              {{ detailData.supplierPhone ? detailData.supplierPhone : "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱:">
              {{ detailData.emailAddress ? detailData.emailAddress : "-" }}
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
            <el-form-item label="调查系统:">
              {{ detailData.surveySystem === 1 ? "关闭" : "开启" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="B2B:">
              {{ detailData.surveySystem === 1 ? "关闭" : "开启" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="B2C:">
              {{ detailData.b2cStatus === 1 ? "关闭" : "开启" }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联国家:">
              {{
                detailData.relevanceCountryName
                  ? detailData.relevanceCountryName
                  : "-"
              }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联渠道:">
              {{
                detailData.relevanceCustomerName
                  ? detailData.relevanceCustomerName
                  : "-"
              }}
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
            <el-form-item label="付款方式:">
              {{ detailData.payMethod ? detailData.payMethod : "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户名称:">
              {{ detailData.accountName ? detailData.accountName : "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款账号:">
              {{
                detailData.collectionAccount
                  ? detailData.collectionAccount
                  : "-"
              }}
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="detailData.payMethod === 1">
            <el-form-item label="银行名称:">
              {{ detailData.bankName ? detailData.bankName : "-" }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结算周期:">
              {{
                detailData.settlementCycle ? detailData.settlementCycle : "-"
              }}
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
        <el-table
          :data="detailData.getTenantCustomerOperationInfosList"
          stripe
          border
        >
          <el-table-column
            align="left"
            type="index"
            label="序号"
            width="80"
          />
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
                v-if="row.operationType === 2"
                @click="handleCheck(row)"
              >
                详情
              </el-button>
              <el-text v-else>-</el-text>
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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    width: 128px;

    > div {
      width: 120px;
      height: 2.2rem;
      line-height: 2.2rem;
      text-align: center;
      border-radius: 0.3rem;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 20.8px;
      &::before {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 60%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        content: "";
      }
      &::after {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        content: "";
      }
    }
    > div.isOnlineTrue {
      background-color: #70b51a;
      &::after,
      &::before {
        border: 1px #70b51a dashed;
      }
    }

    > div.isOnlineFalse {
      background-color: #d8261a;
      &::after,
      &::before {
        border: 1px #d8261a dashed;
      }
    }
  }
}
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
