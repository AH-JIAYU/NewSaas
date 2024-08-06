<route lang="yaml">
meta:
  title: 导航1
</route>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/modules/index_index";
import cloneDeep from "lodash-es/cloneDeep";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典

defineOptions({
  name: "homePage",
});

const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const router = useRouter();
const data = ref<any>({
  search: {
    overviewType: "day", //	总揽类型 day/month/year/select
    overviewStart: "", //	总揽开始
    overviewEnd: "", //总揽结束
    overviewTime: [],
    type: "day",
    turnoverType: "day", //营业额趋势 day/month/year
    completeType: "day", //	完成排名类型 day/month/year/select
    completeStart: "", //	完成排名开始时间
    completeEnd: "", //	完成排名结束时间
    completeTime: [],
  },
  dataCenterOverViewVO: {}, //总揽响应
  dataCenterTurnoverVO: {}, //	营业额趋势响应
  dataCenterCustomerVOS: [], //客户总揽
  dataCenterSupplierCompletedQuantities: [], //	供应商完成数
  dataCenterSupplierTurnovers: [], //	供应商营业额排名
  // 国家
  countryList: [],
});

let chart1: any;
let chart2: any;
const chart1Ref = ref();
const chart2Ref = ref();
// 营业额趋势
function echarts1() {
  chart1 = echarts.init(chart1Ref.value);
  const option = {
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  chart1.setOption(option);
}
// 处理数据
function transformData(inputArray: any) {
  // 新的数组用于存储转换后的对象
  let transformedArray = inputArray.map((item: any) => {
    // 提取客户名，并去除可能的 ":null" 后缀
    let customerName = item.customerName.replace(":null", "");

    // 构造新的对象格式
    return {
      value: item.projectTotal,
      name: customerName,
      datas: {
        aud: item.auditSuccessRate.toString(),
        audR: item.auditRate.toString(),
        com: item.projectTotal.toString(),
      },
    };
  });

  return transformedArray;
}
// 客户总览
function echarts2() {
  const Data = transformData(cloneDeep(data.value.dataCenterCustomerVOS));
  const legendData = data.value.dataCenterCustomerVOS.map((item: any) => {
    return item.customerName;
  });
  chart2 = echarts.init(chart2Ref.value);
  // 配置数据
  const option = {
    title: {
      left: "10%",
      text: "",
      radius: ["40%", "60%"],
      center: ["25%", "50%"],
      subtext: "",
    },
    tooltip: {
      trigger: "item",
      formatter(data: any) {
        return `客户：${data.name}</br>项目完成: ${data.data.datas.com}</br>审核率: ${data.data.datas.aud}`;
      },
    },
    legend: [
      {
        orient: "horizontal",
        x: "55%",
        y: "center",
        bottom: "20",
        itemGap: 20, // 设置图例图形的宽
        center: ["50%", "50%"],
        icon: "stack",
        data: [
          ...legendData,
          {
            name: "查看更多>>",
            icon: "none",
            textStyle: {
              fontSize: 12,
              fontWeight: "bolder",
              color: "#409eff",
            },
          },
        ],
        formatter(name: any) {
          let target, percentage;
          for (let i = 0; i < Data.length; i++) {
            if (Data[i].name === name) {
              target = Data[i].value;
            }
          }
          if (name == "查看更多>>") {
            return name;
          }
          const arr = [
            `{a|${name.length > 5 ? name.substr(0, 5) + "..." : name}} `,
            `{b| ${target}}`,
          ];
          return arr.join(" ");
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        textStyle: {
          rich: {
            a: {
              width: 70,
              backgroundColor: "transparent",
            },
            b: {
              width: 20,
              backgroundColor: "transparent",
            },
          },
        },
      },
    ],
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["40%", "60%"],
        center: ["25%", "50%"],
        text: "省市公司",
        data: [
          ...Data,
          {
            value: "",
            name: "查看更多>>",
          },
        ],
        label: {
          show: false,
        },
      },
    ],
    graphic: [
      {
        type: "group",
        left: "25%",
        top: "center",
        bounding: "raw",
        children: [
          {
            type: "text",
            style: {
              text: `客户总数:${Data.length}`,
              fontSize: 18,
              textAlign: "center",
              textVerticalAlign: "center",
            },
          },
          {
            type: "text",
            style: {
              textAlign: "center",
              textVerticalAlign: "top",
              fontSize: 30,
            },
          },
        ],
      },
    ],
  };
  chart2.on("legendselectchanged", function (params: any) {
    // 如果点击的图例是 '需要新增超链接的图例名称'
    if (params.name === "查看更多>>") {
      // 执行跳转到链接的操作
      router.push("/datacenter");
    }
  });
  // 传入数据
  chart2.setOption(option);
}
async function getList() {
  // 设置总览时间
  // if (
  //   data.value.search.overviewTime &&
  //   !!data.value.search.overviewTime.length
  // ) {
  //   data.value.search.overviewStart = data.value.search.overviewTime[0] || "";
  //   data.value.search.overviewEnd = data.value.search.overviewTime[1] || "";
  // }
  // // 设置完成排名时间
  // if (
  //   data.value.search.completeTime &&
  //   !!data.value.search.completeTime.length
  // ) {
  //   data.value.search.completeStart = data.value.search.overviewTime[0] || "";
  //   data.value.search.completeEnd = data.value.search.overviewTime[1] || "";
  // }
  const res = await api.list({ type: data.value.search.type });
  const {
    dataCenterOverViewVO,
    dataCenterTurnoverVO,
    dataCenterCustomerVOS,
    dataCenterSupplierCompletedQuantities,
    dataCenterSupplierTurnovers,
  } = res.data;
  data.value.dataCenterOverViewVO = dataCenterOverViewVO;
  data.value.dataCenterTurnoverVO = dataCenterTurnoverVO;
  data.value.dataCenterCustomerVOS = dataCenterCustomerVOS;
  data.value.dataCenterSupplierCompletedQuantities =
    dataCenterSupplierCompletedQuantities;
  data.value.dataCenterSupplierTurnovers = dataCenterSupplierTurnovers;
}
const timeChange = () => {
  getList();
};
onMounted(async () => {
  await getList();
  data.value.countryList = await basicDictionaryStore.getCountry();
  echarts1();
  echarts2();
  window.addEventListener("resize", () => {
    chart1.resize();
    chart2.resize();
  });
});
</script>

<template>
  <div>
    <PageMain>
      <el-row>
        <el-radio-group v-model="data.search.type" @change="timeChange">
          <el-radio-button label="日" value="day" />
          <el-radio-button label="月" value="month" />
          <el-radio-button label="年" value="year" />
        </el-radio-group>
      </el-row>
      <ElRow :gutter="20">
        <ElCol>
          <ColorfulCard2
            header="发布项目数"
            :num="
              data.dataCenterOverViewVO?.projectTotal
                ? data.dataCenterOverViewVO?.projectTotal
                : 0
            "
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#fbaaa2"
            color-to="#fc5286"
            header="待审核项目数"
            :num="
              data.dataCenterOverViewVO?.projectSettlementToBeConfirmedTotal
                ? data.dataCenterOverViewVO?.projectSettlementToBeConfirmedTotal
                : 0
            "
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#ff763b"
            color-to="#ffc480"
            header="已审核项目数"
            :num="
              data.dataCenterOverViewVO?.projectSettlementConfirmedTotal
                ? data.dataCenterOverViewVO?.projectSettlementConfirmedTotal
                : 0
            "
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#6a8eff"
            color-to="#0e4cfd"
            header="已完结项目数"
            :num="
              data.dataCenterOverViewVO?.projectSettlementCompleteTotal
                ? data.dataCenterOverViewVO?.projectSettlementCompleteTotal
                : 0
            "
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#ffd300"
            color-to="#ff9b0d"
            header="项目营业额"
            :num="
              data.dataCenterOverViewVO?.projectTurnover
                ? data.dataCenterOverViewVO?.projectTurnover
                : 0
            "
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#f49494"
            color-to="#fcd98b"
            header="项目盈利额"
            :num="
              data.dataCenterOverViewVO?.projectProfitability
                ? data.dataCenterOverViewVO?.projectProfitability
                : 0
            "
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#c2005c"
            color-to="#ff980f"
            header="项目退款额"
            :num="
              data.dataCenterOverViewVO?.projectRefundAmount
                ? data.dataCenterOverViewVO?.projectRefundAmount
                : 0
            "
            icon="ant-design:file-outlined"
          />
        </ElCol>
      </ElRow>
      <!-- 营业额趋势 & 客户总览 -->
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card>
            <template #header>
              <p class="title fx-b">营业额趋势</p>
            </template>

            <div
              id="echarts1"
              ref="chart1Ref"
              style="width: 100%; height: 500px"
            />
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card>
            <template #header>
              <p class="title">客户总览</p>
            </template>

            <div
              id="echarts2"
              ref="chart2Ref"
              style="width: 100%; height: 500px"
            />
          </el-card>
        </el-col>
      </el-row>
      <!-- 今日完成排名 & 供应商佣金排行 -->
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card>
            <template #header>
              <p class="title fx-b">完成数排名</p>
            </template>
            <el-table
              :data="data.dataCenterSupplierCompletedQuantities"
              style="width: 100%"
            >
              <el-table-column type="index" />
              <el-table-column
                align="center"
                prop="supplierName"
                label="供应商名称"
                ><template #default="{ row }">
                  {{ row.supplierName ? row.supplierName : "-" }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="completedAmount"
                label="完成金额"
                ><template #default="{ row }">
                  {{ row.completedAmount ? row.completedAmount : "-" }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="completedQuantity"
                label="完成数量"
              />
              <el-table-column
                align="center"
                prop="b2BProportion"
                label="B2B"
              />
              <el-table-column
                align="center"
                prop="b2CProportion"
                label="B2C"
              />
              <el-table-column align="center" label="所属国家">
                <template #default="{ row }">
                  <div v-for="item in data.countryList">
                    <el-text v-if="item.id === row.country">{{
                      item.chineseName
                    }}</el-text>
                  </div>
                </template>
              </el-table-column>
              <template #empty>
                <el-empty description="暂无数据" />
              </template>
            </el-table>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card>
            <template #header>
              <p class="title fx-b">供应商营业额排行</p>
            </template>

            <el-table
              :data="data.dataCenterSupplierTurnovers"
              style="width: 100%"
            >
              <el-table-column type="index" />
              <el-table-column align="center" prop="name" label="供应商名称"
                ><template #default="{ row }">
                  {{ row.name ? row.name : "-" }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                sortable
                prop="turnover"
                label="营业额"
              />
              <template #empty>
                <el-empty description="暂无数据" />
              </template>
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
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 20px 0;

    .el-col {
      flex: 1;

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

.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
:deep(.el-card__body) {
  min-height: 25rem;
}
</style>
