<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerDetailDetail from "../CustomerDetailDetail/index.vue";
import api from "@/api/modules/user_customer";
import { obtainLoading } from "@/utils/apiLoading";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const tenantStaffStore = useTenantStaffStore();
const checkRef = ref<any>();
const detailData = ref<any>(); // 详情数据
const userList = ref<any>([]);
async function showEdit(row: any) {
  const params = {
    tenantCustomerId: row.tenantCustomerId,
  };

  userList.value = await tenantStaffStore.getStaff();
  const { status, data } = await obtainLoading(api.detail(params));
  detailData.value = data;

  drawerisible.value = true;
}

function close() {
  emit("fetch-data");
  drawerisible.value = false;
}
const handleCheck = (row: any) => {
  checkRef.value.showEdit(row);
};

const operationType = (type: number) => {
  const typeArray = [
    t("common.new"),
    t("common.edit"),
    t("common.enable"),
    t("common.disable"),
  ];
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
    :title="t('customer.detail.detail')"
    @close="close"
  >
    <el-form label-position="right">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">
              {{ t("customer.detail.basicInformation") }}
            </div>
            <div class="rightStatus">
              <img src="@/assets/images/jinyong.png" alt="" v-if="detailData.customerStatus === 1" />
              <img
                src="@/assets/images/qiyong.png"
                alt=""
                v-else
              />
              <!-- <span
                :class="
                  detailData.customerStatus === 1
                    ? 'isOnlineSpanFalse'
                    : 'isOnlineSpanTrue'
                "
              ></span>
              <div
                :class="
                  detailData.customerStatus === 1
                    ? 'isOnlineFalse'
                    : 'isOnlineTrue'
                "
              >
                {{
                  detailData.customerStatus === 1
                    ? t("customer.detail.disable")
                    : t("customer.detail.enable")
                }}
              </div> -->
            </div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.tenantCustomerId')">
              <el-text class="mx-1 copyId">
                {{
                  detailData.tenantCustomerId
                    ? detailData.tenantCustomerId
                    : "-"
                }}
                <copy class="copy" :content="detailData.tenantCustomerId" />
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.customerAccord')">
              <el-text class="mx-1">
                {{
                  detailData.customerAccord ? detailData.customerAccord : "-"
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.customerShortName')">
              <el-text class="mx-1">
                {{
                  detailData.customerShortName
                    ? detailData.customerShortName
                    : "-"
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.companyName')">
              <el-text class="mx-1">
                {{ detailData.companyName ? detailData.companyName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.customerName')">
              <el-text class="mx-1">
                {{ detailData.customerName ? detailData.customerName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.customerPhone')">
              <el-text class="mx-1">
                {{ detailData.customerPhone ? detailData.customerPhone : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.emailAddress')">
              <el-text class="mx-1">
                {{ detailData.emailAddress ? detailData.emailAddress : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.createName')">
              <el-text class="mx-1">
                {{ detailData.createName ? detailData.createName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.createTime')">
              <el-text class="mx-1">
                {{ detailData.createTime ? detailData.createTime : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="PM:">
              <el-text v-for="item in userList" :key="item.id">
                <el-text v-if="detailData.chargeId === item.id" class="mx-1">
                  {{ item.userName }}
                </el-text>
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.settlementCycle')">
              <el-text class="mx-1">
                {{
                  detailData.settlementCycle
                    ? detailData.settlementCycle + t("customer.detail.days")
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
            <span>{{ t("customer.detail.permissionInformation") }}</span>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.customerStatus')">
              <el-text class="mx-1">
                <div v-if="detailData.customerStatus === 1" class="close">
                  {{ t("common.off") }}
                </div>
                <div v-else class="open">{{ t("common.on") }}</div>
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.antecedentQuestionnaire')">
              <el-text class="mx-1">
                <div
                  v-if="detailData.antecedentQuestionnaire === 1"
                  class="close"
                >
                  {{ t("common.off") }}
                </div>
                <div v-else class="open">{{ t("common.on") }}</div>
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.riskControl')">
              <el-text class="mx-1">
                <div v-if="detailData.riskControl === 1" class="close">
                  {{ t("common.off") }}
                </div>
                <div v-else class="open">{{ t("common.on") }}</div>
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.businessLimit')">
              <el-text class="mx-1">
                <CurrencyType />{{ detailData.turnover || 0 }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="t('customer.detail.rateMinValue')">
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
            <span> {{ t("customer.detail.operationLog") }}</span>
          </div>
        </template>
        <el-table :data="detailData.getTenantCustomerOperationInfoList">
          <el-table-column
            align="left"
            type="index"
            :label="t('customer.detail.serialNumber')"
            width="80"
          />
          <el-table-column
            align="left"
            prop="createTime"
            :label="t('customer.detail.operatingTime')"
          />
          <el-table-column
            align="left"
            prop="createName"
            :label="t('customer.detail.operator')"
          />

          <el-table-column
            align="left"
            :label="t('customer.detail.operationalMatters')"
          >
            <template #default="{ row }">
              {{ operationType(row.operationType) }}
            </template>
          </el-table-column>
          <el-table-column align="left" :label="t('customer.detail.detail')">
            <template #default="{ row }">
              <el-button
                type="primary"
                link
                @click="handleCheck(row)"
                v-if="row.operationType === 2"
              >
                {{ t("customer.detail.detail") }}
              </el-button>
              <el-text v-else>-</el-text>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-form>
    <template #footer>
      <div class="flex-c">
        <el-button type="primary" @click="close">{{
          t("common.off")
        }}</el-button>
      </div>
    </template>
    <customerDetailDetail ref="checkRef" />
  </el-drawer>
</template>

<style scoped lang="scss">
.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
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
      width: 49px !important;
      height: 23px !important;
      background: #409eff;
      border-radius: 4px;
      color: var(--el-color-white);
      padding: 4px 8px;
      font-size: 11px;
      font-size: 0.875rem;
      border-radius: 0.25rem;
    }
  }

  .isOnlineSpanTrue {
    background: #03c239;
    // background: url('/src/assets/images/lineCricle.png');
    // background-size:100% 100%;
    width: 0.5625rem;
    height: 0.5625rem;
    // display: block;
    // background-position: center;
    border-radius: 50%;
    border: 1px solid #03c239;
    box-shadow: #03c239 0px 0px 10px;
  }

  .isOnlineSpanFalse {
    background: #d8261a;
    width: 0.5625rem;
    height: 0.5625rem;
    display: block;
    border-radius: 50%;
    border: 1px solid #d8261a;
    box-shadow: #d8261a 0px 0px 10px;
  }

  .rightStatus {
    // position: relative;
    // width: 128px;
    width: 80px;
    display: flex;
    align-items: baseline;

    > div {
      // width: 120px;
      // height: 2.2rem;
      // line-height: 2.2rem;
      // text-align: center;
      // border-radius: 0.3rem;
      // color: #fff;
      // position: absolute;
      // left: 50%;
      // top: 50%;
      // transform: translate(-50%, -50%);
      // font-size: 1.125rem;

      // &::before {
      //   position: absolute;
      //   left: 50%;
      //   top: 50%;
      //   width: 60%;
      //   border-radius: 50%;
      //   transform: translate(-50%, -50%);
      //   aspect-ratio: 1 / 1;
      //   content: "";
      // }

      // &::after {
      //   position: absolute;
      //   left: 50%;
      //   top: 50%;
      //   width: 50%;
      //   border-radius: 50%;
      //   transform: translate(-50%, -50%);
      //   aspect-ratio: 1 / 1;
      //   content: "";
      // }
    }

    > div.isOnlineTrue {
      color: #03c239;
      margin-left: 6px;
    }

    > div.isOnlineFalse {
      color: #d8261a;
      margin-left: 6px;
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
