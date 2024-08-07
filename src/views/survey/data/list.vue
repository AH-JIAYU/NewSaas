<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { onBeforeUnmount, onMounted, ref } from "vue";
import eventBus from "@/utils/eventBus";
import api from "@/api/modules/survey_data";
// import useTabbar from '@/utils/composables/useTabbar'

defineOptions({
  name: "surveydata",
});

const { pagination, getParams } = usePagination();

const data = ref<any>({
  loading: false,
  // 表格是否自适应高度
  tableAutoHeight: false,
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: "router" as "router" | "dialog" | "drawer",
  // 详情
  formModeProps: {
    visible: false,
    id: "",
  },
  // 搜索
  search: {
    type: "day",
  },
  // 批量操作
  batch: {
    enable: false,
    selectionDataList: [],
  },
  // 完成数排名
  memberDataCenterCompletedVOList: [],
  // 退款额排名
  memberDataCenterRefundVOList: [],
  // 业绩排名
  memberDataCenterPriceVOList: [],
  // 数据总揽
  dataScreening: {
    // 当天记录的总参与次数
    participationVolume: "",
    // 当天完成的调查数量
    completedQuantity: "",
    // 当天从完成的调查中产生的总营业额
    turnover: "",
    // 与调查点击相关的项目结算完成与系统完成的比例，表示已完成工作的百分比
    settlementRatio: "",
    // 	与调查活动相关的待审核和结算的总余额
    pendingBalance: "",
    // 可用于进一步交易或结算的总可用余额
    availableBalance: "",
  },
});
// 切换
const timeChange = () => {
  getDataList();
};
onMounted(() => {
  getDataList();
  if (data.value.formMode === "router") {
    eventBus.on("get-data-list", () => {
      getDataList();
    });
  }
});

onBeforeUnmount(() => {
  if (data.value.formMode === "router") {
    eventBus.off("get-data-list");
  }
});

function getDataList() {
  data.value.loading = true;
  const params: any = {
    clickTime: data.value.search.type,
  };
  api.dataList(params).then((res: any) => {
    data.value.loading = false;
    data.value.memberDataCenterCompletedVOList =
      res.data.memberDataCenterCompletedVOList;
    data.value.memberDataCenterRefundVOList =
      res.data.memberDataCenterRefundVOList;
    data.value.memberDataCenterPriceVOList =
      res.data.memberDataCenterPriceVOList;
    data.value.dataScreening = res.data.memberDataCenterOverallOverviewVOList;
    pagination.value.total = res.data.total;
  });
}
</script>

<template>
  <div
    v-loading="data.loading"
    :class="{ 'absolute-container': data.tableAutoHeight }"
  >
    <PageMain>
      <el-row>
        <el-radio-group v-model="data.search.type" @change="timeChange">
          <el-radio-button label="日" value="day" />
          <el-radio-button label="月" value="month" />
          <el-radio-button label="年" value="year" />
        </el-radio-group>
      </el-row>
      <ElRow :gutter="24">
        <ElCol>
          <ColorfulCard2
            header="参与量"
            :num="data.dataScreening?.participationVolume || 0"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#fbaaa2"
            color-to="#fc5286"
            header="完成量"
            :num="data.dataScreening?.completedQuantity || 0"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#ff763b"
            color-to="#ffc480"
            header="营业额"
            :num="data.dataScreening?.turnover || 0"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#6a8eff"
            color-to="#0e4cfd"
            header="审核率"
            :num="data.dataScreening?.settlementRatio || 0"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#ffd300"
            color-to="#ff9b0d"
            header="待审金额"
            :num="data.dataScreening?.pendingBalance || 0"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#f49494"
            color-to="#fcd98b"
            header="可用金额"
            :num="data.dataScreening?.availableBalance || 0"
            icon="ant-design:file-outlined"
          />
        </ElCol>
      </ElRow>

      <!-- 今日完成排名 & 供应商佣金排行 -->
      <el-row :gutter="24">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-card>
            <template #header> 完成排行榜 </template>
            <el-table
              :data="data.memberDataCenterCompletedVOList"
              style="width: 100%"
            >
              <el-table-column type="index" />
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="memberId"
                label="会员ID"
              />
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="memberName"
                label="会员名称"
              />
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="completedQuantity"
                label="完成数量"
              />
            </el-table>
          </el-card>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-card>
            <template #header> 退款排行榜 </template>
            <el-table
              :data="data.memberDataCenterRefundVOList"
              style="width: 100%"
            >
              <el-table-column type="index" />
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="memberId"
                label="会员ID"
              />
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="memberName"
                label="会员名称"
              />
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="completedQuantity"
                label="退款数"
              />
              <el-table-column
                show-overflow-tooltip
                width="110"
                align="center"
                prop="refund"
                label="退款金额"
              />
            </el-table>
          </el-card>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-card>
            <template #header> 业绩排行榜 </template>
            <el-table
              :data="data.memberDataCenterPriceVOList"
              style="width: 100%"
            >
              <el-table-column type="index" />
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="memberId"
                label="会员ID"
              />
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="memberName"
                label="会员名称"
              />
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="price"
                label="今日收入"
              />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-row {
    .el-col {
      flex: 1;
      text-align: center;

      .title {
        text-align: left;
      }
    }

    .red {
      color: red;
    }
  }

  // 表格
  .el-table__body {
    tr:nth-of-type(1) {
      td:nth-of-type(1) {
        color: red !important;
      }
    }

    tr:nth-of-type(2) {
      td:nth-of-type(1) {
        color: #bfbdbc !important;
      }
    }

    tr:nth-of-type(3) {
      td:nth-of-type(1) {
        color: #a25316 !important;
      }
    }
  }
}

.page-header {
  text-align: center;
}

.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-header {
    flex: 1;

    :deep {
      .text-2xl {
        font-size: 30px !important;
        font-weight: bold !important;
      }
    }
  }

  div:nth-of-type(2) {
    opacity: 0.5;
  }
}

:deep(.el-card__body) {
  min-height: 25rem;
}
</style>
