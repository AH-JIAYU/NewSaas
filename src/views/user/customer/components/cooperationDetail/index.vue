<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerDetailDetail from "../CustomerDetailDetail/index.vue";
import financialLog from "../../../cooperation/components/financialLog/index.vue";
import api from "@/api/modules/user_customer";
import { obtainLoading } from "@/utils/apiLoading";
import useTenantStaffStore from "@/store/modules/configuration_manager";
import { useI18n } from "vue-i18n";
import apiUser from "@/api/modules/configuration_manager";
const { t } = useI18n();
const emit = defineEmits(["fetch-data"]);
const drawerisible = ref<boolean>(false);
const tenantStaffStore = useTenantStaffStore();
const checkRef = ref<any>();
const detailData = ref<any>(); // 详情数据
const userList = ref<any>([]);
const financialLogRef = ref(); // 日志组件
const staffList = ref<any>([]);
async function showEdit(row: any) {
  await getTenantStaffList();

  detailData.value = row;

  drawerisible.value = true;
}

function close() {
  emit("fetch-data");
  drawerisible.value = false;
}
const handleCheck = (row: any) => {
  checkRef.value.showEdit(row);
  financialLogRef.value.showEdit(row);
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
// 获取PM / 用户;
const getTenantStaffList = async () => {
  const { data } = await apiUser.getTenantStaffList();
  staffList.value = data;
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
    :title="t('customer.detail.detail')"
    @close="close"
  >
    <el-form label-position="right">
      <el-card >
        <template #header>
          <div class="card-header">
            <div class="leftTitle">基本信息</div>
            <div class="rightStatus">
              <img src="@/assets/images/noCooperation.png" alt="" v-if="detailData.customerStatus === 4" />
              <img
                src="@/assets/images/cooperation.png"
                alt=""
                v-else
              />

              <!-- <span
                :class="
                  detailData.customerStatus === 4
                    ? 'isOnlineSpanFalse'
                    : 'isOnlineSpanTrue'
                "
              ></span>
              <div
                :class="
                  detailData.customerStatus === 4
                    ? 'isOnlineFalse'
                    : 'isOnlineTrue'
                "
              >
                {{ detailData.customerStatus === 4 ? "解约" : "合作" }}
              </div> -->
            </div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="项目名称：">
              <el-text class="mx-1 copyId">
                {{
                  detailData.customerAccord ? detailData.customerAccord : "-"
                }}
                <copy class="copy" :content="detailData.customerAccord" />
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邀请方合作ID：">
              <el-text class="mx-1">
                {{
                  detailData.beInvitationTenantId
                    ? detailData.beInvitationTenantId
                    : "-"
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责部门：">
              <el-text class="mx-1">
                {{ detailData.chargeName ? detailData.chargeName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="价格比例：">
              <el-text class="mx-1">
                {{ detailData.priceRatio ? detailData.priceRatio : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩(合作商)可用余额：">
              <el-text class="mx-1">
                <svg
                  v-if="detailData.currencyType === 'USD'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                    fill="#333333"
                  />
                </svg>
                <svg
                  v-if="detailData.currencyType === 'CNY'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="10"
                  viewBox="0 0 9 10"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                    fill="#333333"
                  />
                </svg>
                <CurrencyType v-if="!detailData.currencyType" />{{
                  detailData.availableBalance || 0
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩(我的)可用余额：">
              <el-text class="mx-1">
                <svg
                  v-if="detailData.personalCurrencyType === 'USD'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                    fill="#333333"
                  />
                </svg>
                <svg
                  v-if="detailData.personalCurrencyType === 'CNY'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="10"
                  viewBox="0 0 9 10"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                    fill="#333333"
                  />
                </svg>
                <CurrencyType v-if="!detailData.personalCurrencyType" />{{
                  detailData.personalAvailableBalance || 0
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
          <el-col :span="8">
            <el-form-item label="业绩(合作商)待审余额：">
              <el-text class="mx-1">
                <svg
                  v-if="detailData.currencyType === 'USD'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                    fill="#333333"
                  />
                </svg>
                <svg
                  v-if="detailData.currencyType === 'CNY'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="10"
                  viewBox="0 0 9 10"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                    fill="#333333"
                  />
                </svg>
                <CurrencyType v-if="!detailData.currencyType" />{{
                  detailData.pendBalance || 0
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩(我的)待审余额：">
              <el-text class="mx-1">
                <svg
                  v-if="detailData.personalCurrencyType === 'USD'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M2.83487 12V11.0864C2.23394 11.0106 1.82794 10.876 1.45186 10.6825C1.07578 10.489 0.750979 10.1763 0.477227 9.74469C0.203474 9.31305 0.0443987 8.78572 0 8.16248L1.20826 7.9355C1.30181 8.58082 1.46634 9.05473 1.70235 9.35745C2.04044 9.78458 2.36334 9.87195 2.83511 9.92086V6.24645C2.34102 6.1529 1.91817 5.96177 1.402 5.67235C1.01927 5.45867 0.724387 5.16284 0.517589 4.78462C0.310553 4.4064 0.207273 3.97689 0.207273 3.4961C0.207273 2.64161 0.509754 1.94974 1.11519 1.42005C1.52 1.06414 2.03854 0.791105 2.83534 0.711092V0H3.83087V0.711092C4.52962 0.777809 4.87792 1.03755 5.28748 1.38016C5.81267 1.81631 6.12868 2.41486 6.23553 3.17581L4.99379 3.36267C4.92256 2.8909 4.77251 2.5312 4.5498 2.27787C4.44272 2.15607 4.22239 1.86071 3.83087 1.78046V5.24522C4.43607 5.39646 4.631 5.51446 4.82688 5.59899C5.20082 5.76376 5.50544 5.96391 5.74144 6.19968C5.97721 6.43568 6.1586 6.71608 6.28562 7.04088C6.41241 7.36568 6.4758 7.7173 6.4758 8.09552C6.4758 8.9277 6.21107 9.62194 5.68137 10.1782C5.15168 10.7345 4.67207 11.0327 3.83087 11.0729V11.9998H2.83487V12ZM2.83487 1.76716C2.36761 1.83839 2.08152 2.02525 1.81227 2.32797C1.54303 2.63068 1.40841 2.98896 1.40841 3.40279C1.40841 3.81235 1.52285 4.15496 1.75221 4.43085C1.98132 4.70698 2.28736 4.92707 2.83487 5.09184V1.76716ZM3.8304 9.93463C4.29765 9.87693 4.46504 9.79953 4.78295 9.46429C5.03747 9.19576 5.24024 8.68767 5.24024 8.17601C5.24024 7.73986 5.13221 7.38942 4.91639 7.12469C4.70057 6.85996 4.47549 6.62301 3.83016 6.41383V9.93463H3.8304Z"
                    fill="#333333"
                  />
                </svg>
                <svg
                  v-if="detailData.personalCurrencyType === 'CNY'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="10"
                  viewBox="0 0 9 10"
                  fill="none"
                >
                  <path
                    id="Vector"
                    d="M8.79096 0L5.5738 4.56065H8.10931V5.56885H5.15558V6.95736H8.10931V7.97816H5.15558V10H3.63591V7.97816H0.574054V6.95736H3.63591V5.56885H0.574054V4.56065H3.18642L0 0H1.7134C3.20235 2.26497 4.10624 3.70177 4.42676 4.30931H4.45749C4.56617 4.05905 4.86361 3.55523 5.34877 2.79785L7.17085 0H8.79096Z"
                    fill="#333333"
                  />
                </svg>
                <CurrencyType v-if="!detailData.personalCurrencyType" />{{
                  detailData.personalPendBalance || 0
                }}
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card >
        <template #header>
          <div class="card-header">
            <span>财务日志</span>
          </div>
        </template>

          <financialLog ref="financialLogRef" />

      </el-card>

      <!-- <el-card class="box-card">
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
              {{ operationType(detailData.operationType) }}
            </template>
          </el-table-column>
          <el-table-column align="left" :label="t('customer.detail.detail')">
            <template #default="{ row }">
              <el-button
                type="primary"
                link
                @click="handleCheck(row)"
                v-if="detailData.operationType === 2"
              >
                {{ t("customer.detail.detail") }}
              </el-button>
              <el-text v-else>-</el-text>
            </template>
          </el-table-column>
        </el-table>
      </el-card> -->
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


.el-drawer {
  overflow-y: hidden; // 添加这一行来隐藏右侧滚动条
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

    display: flex;
    align-items: baseline;
    // background-color: #f2f2f2;
    justify-content: space-between;

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

.financialLog {
  margin-top: -20px;
}
:deep(.el-drawer__body .el-card .el-card__body){
  padding: 0  !important;
}
:deep(.el-drawer__body .el-card){
  padding:24px 0 0 0 !important;
  margin-bottom:0 !important;
}
:deep(.el-pagination){
  margin:0 !important;
}
</style>
