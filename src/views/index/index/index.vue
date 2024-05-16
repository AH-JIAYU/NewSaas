<route lang="yaml">
meta:
  title: 导航1
</route>

<script setup></script>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

let chart1;
let chart2;
const chart1Ref = ref();
const chart2Ref = ref();
const tableData = [
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
  {
    name: "供应商",
    money: 232,
    num: 124,
    "B2B/B2C": "50%/50%",
    currency: "RNB",
  },
];
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
        name: "Email",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          disabled: true,
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
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
// 客户总览
function echarts2() {
  chart2 = echarts.init(chart2Ref.value);
  // 配置数据
  const option = {
    title: {
      text: "用户访问来源",
      subtext: "",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "right",
      data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "直接访问", title: "1111" },
          { value: 310, name: "邮件营销", title: "1111" },
          { value: 234, name: "联盟广告", title: "1111" },
          { value: 135, name: "视频广告", title: "1111" },
          { value: 1548, name: "搜索引擎", title: "1111" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  // 传入数据
  chart2.setOption(option);
}

onMounted(() => {
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
        <SearchTab />
      </el-row>
      <ElRow :gutter="20">
        <ElCol>
          <ColorfulCard header="发布项目数" :num="123" icon="ep:discount" />
        </ElCol>
        <ElCol>
          <ColorfulCard color-from="#fbaaa2" color-to="#fc5286" header="发布项目数" :num="12323" icon="ep:element-plus" />
        </ElCol>
        <ElCol>
          <ColorfulCard color-from="#ff763b" color-to="#ffc480" header="发布项目数" :num="123" icon="ri:pages-line" />
        </ElCol>
        <ElCol>
          <ColorfulCard color-from="#6a8eff" color-to="#0e4cfd" header="业务应用页面" :num="123" icon="ep:link" />
        </ElCol>
        <ElCol>
          <ColorfulCard color-from="#ffd300" color-to="#ff9b0d" header="业务应用页面" :num="123" icon="ep:handbag" />
        </ElCol>
        <ElCol>
          <ColorfulCard color-from="#f49494" color-to="#fcd98b" header="业务应用页面" :num="123" icon="ep:film" />
        </ElCol>
        <ElCol>
          <ColorfulCard color-from="#c2005c" color-to="#ff980f" header="业务应用页面" :num="123" icon="ep:ice-tea" />
        </ElCol>
      </ElRow>
      <!-- 营业额趋势 & 客户总览 -->
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card>
            <template #header>
              <p class="title">营业额趋势</p>
            </template>

            <div id="echarts1" ref="chart1Ref" style="width: 100%; height: 500px" />
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card>
            <template #header>
              <p class="title">客户总览</p>
            </template>

            <div id="echarts2" ref="chart2Ref" style="width: 100%; height: 500px" />
          </el-card>
        </el-col>
      </el-row>
      <!-- 今日完成排名 & 供应商佣金排行 -->
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card>
            <template #header>
              <p class="title fx-b">
                营业额趋势
                <SearchTab />
              </p>
            </template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" />
              <el-table-column prop="name" label="供应商" />
              <el-table-column prop="money" label="完成金额" />
              <el-table-column prop="num" label="完成数量" />
              <el-table-column prop="B2B/B2C" label="B2B/B2C" />
              <el-table-column prop="currency" label="货币类型" />
            </el-table>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card>
            <template #header>
              <p class="title fx-b">
                客户总览
                <SearchTab />
              </p>
            </template>

            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" />
              <el-table-column prop="name" label="供应商" />
              <el-table-column prop="money" label="完成金额" />
              <el-table-column prop="num" label="完成数量" />
              <el-table-column prop="B2B/B2C" label="B2B/B2C" />
              <el-table-column prop="currency" label="货币类型" />
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

.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
