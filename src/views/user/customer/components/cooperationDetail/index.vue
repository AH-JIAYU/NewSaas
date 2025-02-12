<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customerDetailDetail from "../CustomerDetailDetail/index.vue";
import financialLog from "../../../cooperation/components/financialLog/index.vue";
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
const financialLogRef = ref(); // 日志组件
async function showEdit(row: any) {
  const params = {
    tenantCustomerId: row.tenantCustomerId,
  };

  userList.value = await tenantStaffStore.getStaff();
  const { status, data } = await obtainLoading(api.detail(params));

  detailData.value = data;

  drawerisible.value = true;
  console.log(detailData.value);
  console.log("row==>", row);
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
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle">基本信息</div>
            <div class="rightStatus">
              <span
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
                {{ detailData.customerStatus === 1 ? "关闭" : "开启" }}
              </div>
            </div>
          </div>
        </template>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-text class="mx-1 copyId">
                {{ detailData.projectId ? detailData.projectId : "-" }}
                <copy class="copy" :content="detailData.tenantCustomerId" />
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邀请方合作ID">
              <el-text class="mx-1">
                {{
                  detailData.customerAccord ? detailData.customerAccord : "-"
                }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责部门">
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
            <el-form-item label="价格比例">
              <el-text class="mx-1">
                {{ detailData.companyName ? detailData.companyName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩(合作商)可用余额">
              <el-text class="mx-1">
                {{ detailData.customerName ? detailData.customerName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩(我的)可用余额">
              <el-text class="mx-1">
                {{ detailData.customerPhone ? detailData.customerPhone : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8"> </el-col>
          <el-col :span="8">
            <el-form-item label="业绩(合作商)待审余额">
              <el-text class="mx-1">
                {{ detailData.emailAddress ? detailData.emailAddress : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩(我的)待审余额">
              <el-text class="mx-1">
                {{ detailData.createName ? detailData.createName : "-" }}
              </el-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>财务日志</span>
          </div>
        </template>
        <el-row :gutter="24" class="financialLog">
          <financialLog ref="financialLogRef" />
        </el-row>
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
.el-card {
  margin: 10px 0;
  padding-top: 10px;
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
    width: 180px;
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
</style>
