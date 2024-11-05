<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { onBeforeUnmount, onMounted, ref } from "vue";
import eventBus from "@/utils/eventBus";
import empty from '@/assets/images/empty.png'
import api from "@/api/modules/survey_data";

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
  try {
    data.value.loading = true;
    const params: any = {
      clickTime: data.value.search.type,
    };
    api.dataList(params).then((res: any) => {
      data.value.loading = false;
      //items.filter(item => item.name && item.name.trim() !== '');
      // 完成数排名,剔除完成数量为0的，completedQuantity

      data.value.memberDataCenterCompletedVOList = res.data.memberDataCenterCompletedVOList.filter(item => item.completedQuantity && item.completedQuantity !=0);

      // 退款额排名，剔除退款数为0的，completedQuantity
      data.value.memberDataCenterRefundVOList =
        res.data.memberDataCenterRefundVOList.filter((item:any) => item.completedQuantity && item.completedQuantity!=0);
      // 业绩排名，剔除收入为0的，price
      data.value.memberDataCenterPriceVOList =
        res.data.memberDataCenterPriceVOList.filter((item:any) => item.price && item.price !=0);
      // 数据总揽
      data.value.dataScreening = res.data.memberDataCenterOverallOverviewVOList;
      pagination.value.total = res.data.total;
    });
  } catch (error) {

  } finally {
    data.value.loading = false;
  }
}
</script>

<template>
  <div v-loading="data.loading" :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <el-row style="margin:0 0 1rem 0;">
        <el-radio-group v-model="data.search.type" @change="timeChange">
          <el-radio-button label="日" value="day" />
          <el-radio-button label="月" value="month" />
          <el-radio-button label="年" value="year" />
        </el-radio-group>
      </el-row>
      <div class="showDataRow" :gutter="24">
        <div class="showDataCol">
          <p class="showDataP" v-show="data.search.type === 'day'">今日参与量</p>
          <p class="showDataP" v-show="data.search.type === 'month'">当月参与量</p>
          <p class="showDataP" v-show="data.search.type === 'year'">年度参与量</p>
          <div class="showDataCount">
            <span class="showDataSpanLeft number-font">{{ data.dataScreening?.participationVolume || 0 }}</span>
            <span class="showDataSpanRight" v-if="data.search.type !== 'year'"><span class="dd"></span><span class="participate">{{data.search.type === 'month' ? '上月' : '昨日'}}：<span class="number-font">{{ data.dataScreening?.participationVolumeDifference || 0 }}</span></span></span>
          </div>
        </div>
        <div class="showDataCol">
          <p class="showDataP" v-show="data.search.type === 'day'">今日完成量</p>
          <p class="showDataP" v-show="data.search.type === 'month'">当月完成量</p>
          <p class="showDataP" v-show="data.search.type === 'year'">年度完成量</p>
          <div class="showDataCount">
            <span class="showDataSpanLeft number-font">{{ data.dataScreening?.completedQuantity || 0 }}</span>
            <span class="showDataSpanRight" v-if="data.search.type !== 'year'"><span class="dd"></span><span class="participate">{{data.search.type === 'month' ? '上月' : '昨日'}}：<span class="number-font">{{ data.dataScreening?.completedQuantityDifference || 0 }}</span></span></span>
          </div>
        </div>
        <div class="showDataCol">
          <p class="showDataP" v-show="data.search.type === 'day'">今日营业额</p>
          <p class="showDataP" v-show="data.search.type === 'month'">当月营业额</p>
          <p class="showDataP" v-show="data.search.type === 'year'">年度营业额</p>
          <div class="showDataCount">
            <span class="showDataSpanLeft number-font">{{ data.dataScreening?.turnover || 0 }}</span>
            <span class="showDataSpanRight" v-if="data.search.type !== 'year'"><span class="dd"></span><span class="participate">{{data.search.type === 'month' ? '上月' : '昨日'}}：<span class="number-font">{{ data.dataScreening?.turnoverDifference || 0 }}</span></span></span>
          </div>
        </div>
        <div class="showDataCol">
          <p class="showDataP">待审金额</p>
          <div class="showDataCount">
            <span class="showDataSpanLeft number-font">{{ data.dataScreening?.pendingBalance || 0 }}</span>
            <!-- <span class="showDataSpanRight"><span class="dd"></span><span class="participate">{{data.search.type === 'month' ? '上月' : '昨日'}}：{{ data.dataScreening?.pendingBalanceDifference || 0 }}</span></span> -->
          </div>
        </div>
        <div class="showDataCol">
          <p class="showDataP">可用余额</p>
          <div class="showDataCount">
            <span class="showDataSpanLeft number-font">{{ data.dataScreening?.availableBalance || 0 }}</span>
            <!-- <span class="showDataSpanRight"><span class="dd"></span><span class="participate">{{data.search.type === 'month' ? '上月' : '昨日'}}：{{ data.dataScreening?.availableBalanceDifference || 0 }}</span></span> -->
          </div>
        </div>
      </div>
      <!-- 今日完成排名 & 供应商佣金排行 -->
      <div class="ranking">
        <div class="rankingCol">
          <p class="rankingColP"><span class="rankingColSpan"></span>完成排行榜</p>
          <el-table :data="data.memberDataCenterCompletedVOList" class="tabless"
            :style="{ '--el-table-border-color': 'none' }">
            <el-table-column align="center" type="index" width="60"  label="序号" >
              <template #default="{ $index }">
                    <div class="center-image">
                      <img
                      v-if="$index ==0"
                      src="../../../assets/images/num1.png"
                    />
                    <img
                      v-else-if="$index ==1"
                      src="../../../assets/images/num2.png"
                    />
                    <img
                    v-else-if="$index ==2"
                      src="../../../assets/images/num3.png"
                    />
                    <span v-else class="number-font font-c">{{ $index + 1 }}</span>
                    </div>

                  </template>
                </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="memberId" label="会员ID">
              <template #default="{ row }">
                <span class="font-c">{{ row.memberId ? row.memberId : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="memberName" label="会员名称">
              <template #default="{ row }">
                <span class="font-c">{{ row.memberName ? row.memberName : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="completedQuantity" label="完成数量">
              <template #default="{ row }">
                <span class="number-font font-c">{{ row.completedQuantity ? row.completedQuantity : '-' }}</span>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty :image="empty" :image-size="300" />
            </template>
          </el-table>
        </div>
        <div class="rankingCol">
          <p class="rankingColP"><span class="rankingColSpan"></span>退款排行榜</p>
          <el-table :data="data.memberDataCenterRefundVOList" :style="{ '--el-table-border-color': 'none' }">
            <el-table-column align="center" type="index" width="60"  label="序号">
              <template #default="{ $index }">
                    <div class="center-image">
                      <img
                      v-if="$index ==0"
                      src="../../../assets/images/num1.png"
                    />
                    <img
                      v-else-if="$index ==1"
                      src="../../../assets/images/num2.png"
                    />
                    <img
                    v-else-if="$index ==2"
                      src="../../../assets/images/num3.png"
                    />
                    <span v-else class="number-font font-c">{{ $index + 1 }}</span>
                    </div>

                  </template>
                </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="memberId" label="会员ID">
              <template #default="{ row }">
                <span class="font-c">{{ row.memberId ? row.memberId : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="memberName" label="会员名称">
              <template #default="{ row }">
                <span class="font-c">{{ row.memberName ? row.memberName : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="completedQuantity" label="退款数">
              <template #default="{ row }">
                <span  class="number-font font-c">{{ row.completedQuantity ? row.completedQuantity : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="refund" label="退款金额">
              <template #default="{ row }">
                <span  class="number-font font-c">{{ row.refund ? row.refund : 0 }}</span>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty :image="empty" :image-size="300" />
            </template>
          </el-table>
        </div>
        <div class="rankingCol">
          <p class="rankingColP"><span class="rankingColSpan"></span>业绩排行榜</p>
          <el-table :data="data.memberDataCenterPriceVOList" :style="{ '--el-table-border-color': 'none' }">
            <el-table-column align="center" type="index" width="60"  label="序号">
              <template #default="{ $index }">
                    <div class="center-image">
                      <img
                      v-if="$index ==0"
                      src="../../../assets/images/num1.png"
                    />
                    <img
                      v-else-if="$index ==1"
                      src="../../../assets/images/num2.png"
                    />
                    <img
                    v-else-if="$index ==2"
                      src="../../../assets/images/num3.png"
                    />
                    <span v-else class="number-font font-c">{{ $index + 1 }}</span>
                    </div>

                  </template>
                </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="memberId" label="会员ID">
              <template #default="{ row }">
                <span class="font-c">{{ row.memberId ? row.memberId : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="memberName" label="会员名称">
              <template #default="{ row }">
                <span class="font-c">{{ row.memberName ? row.memberName : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="left" prop="price" label="业绩">
              <template #default="{ row }">
                <span  class="number-font font-c">{{ row.price ? row.price : 0 }}</span>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty :image="empty" :image-size="300" />
            </template>
          </el-table>
        </div>
      </div>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.font-c {
  color: #333333
}
/* 自定义数字字体样式 */
.number-font {
  font-family: D-DIN Exp; /* 选择字体 */
  font-size: .875rem;

}
  .center-image {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%; /* 单元格宽度 */
  height: 100%; /* 单元格高度 */
  }
:deep {

  // 去除表格色块 线
  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
  }

  .el-table--fit .el-table__inner-wrapper:before {
    width: 0;
  }

  .el-table__header th {
    background: var(--g-header-bg) !important;
  }
}

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

:deep {
  .el-row {
    // display: flex;
    // justify-content: space-between;
    // width: 100%;
    // margin: 20px 0;

    .el-col {
      flex: 1;
      //  margin: 20px 0;
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
        color: #FB6060 !important;
      }
    }

    tr:nth-of-type(2) {
      td:nth-of-type(1) {
        color: #F9C057 !important;
      }
    }

    tr:nth-of-type(3) {
      td:nth-of-type(1) {
        color: #409EFF !important;
      }
    }
  }
}

:deep(.main-container) {
  background-color: #f2f2f2;
  padding: 0px !important;
}

.showDataRow {
  display: flex;
  width: 100%;
  height: 104.006px;

  .showDataCol {
    width: calc(20% - .75rem);
    height: 104.006px;
    background: #fff;
    margin-right: .9996rem;
    border-radius: .5004rem .5004rem .5004rem .5004rem;

    .showDataP {
      margin: .9996rem;
      width: 90%;
      height: 20.006px;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      font-size: .8748rem;
      color: #333333;
      line-height: .9996rem;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .showDataCount {
      margin: 0px .9996rem .9996rem .9996rem;
      width: 90%;
      height: 36px;
      border-radius: 0px 0px 0px 0px;

      .showDataSpanLeft {
        display: inline-block;
        min-width: 2.8128rem;
        height: 36px;
        font-family: D-DIN Exp;
        font-weight: 500;
        font-size: 1.6248rem;
        color: #333333;
        line-height: 2.0628rem;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .showDataSpanRight {
        margin-left: 1.1256rem;
        display: inline-block;
        // width: 4.3752rem;
        height: 16.992px;
        line-height: 1.062rem
          /* 16.992/16 */
        ;
        border-radius: 0px 0px 0px 0px;

        .dd {
          display: inline-block;
          width: .3756rem;
          height: .3756rem;
          background: #FF8D8D;
          border-radius: 50%;
          margin: .312rem .3756rem .0624rem 0px;
        }

        .participate {
          display: inline-block;
          min-width: 3.6252rem;
          height: 16.992px;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: .875rem
            /* 12/16 */
          ;
          color: #333333;
          line-height: .8748rem;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }
    }
  }

  .showDataCol:nth-last-of-type(1) {
    margin-right: 0px;
  }

}

.ranking {
  display: flex;
  margin-top: 1rem;
  width: 100%;
  min-height: 690px;
  border-radius: 0px 0px 0px 0px;

  .rankingCol {
    margin-right: 1rem;
    width: calc(33.333% - 10px);
    min-height: 690px;
    padding: 1rem;
    background: #FFFFFF;
    border-radius: 8px 8px 8px 8px;

    .rankingColP {
      display: flex;
      align-items: center;
      width: 100%;
      height: 25px;
      font-family: PingFang SC, PingFang SC;
      font-weight: 700;
      font-size: 1.125rem;
      color: #333333;
      line-height: 1.3125rem;
      text-align: left;
      font-style: normal;
      text-transform: none;

      .rankingColSpan {
        margin-right: .25rem;
        display: inline-block;
        border-radius: 50%;
        width: .625rem;
        height: .625rem;
        background: #409EFF;
      }
    }
  }

  .rankingCol:nth-last-of-type(1) {
    margin-right: 0px;
  }
}

:deep(.el-table thead) {
  color: #333333;
}

:deep(.el-table--fit) {
  margin: 16px;
}

:deep(:root) {
  --el-table-border-color: none;
}

:root {
  --el-table-border-color: none;
}

:root {
  --el-table-border: none;
}

:deep(.el-table th, .el-table td, .el-table tr) {
  border-bottom: none !important;
  /* 去除下划线 */
  border: none !important;
  /* 去除表格的边框 */
}
:deep {
  // 单选框背景色
  .el-radio-button__inner {
    background-color: transparent;
    width: 2.125rem;
    height: 2rem;
    line-height: 2rem;
    font-size: .875rem;
    padding: 0 !important;

  }

  .el-table__empty-block {
    margin-top: 100px;
  }
  .el-table--fit {
    margin-left: 10px;
  }
}
</style>
