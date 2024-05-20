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
  const data = [
    {
      value: 100,
      name: "张三",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 20,
      name: "李四",
      title: "1111",
      datas: [{ aud: "444" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 30,
      name: "王五",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 40,
      name: "赵六",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 50,
      name: "老王",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 60,
      name: "老王1",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 70,
      name: "老王2",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 80,
      name: "老王3",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 200,
      name: "老王4",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 100,
      name: "老王5",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 110,
      name: "老王6",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 120,
      name: "老王7",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 130,
      name: "老王8",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
    {
      value: 140,
      name: "老王9",
      title: "1111",
      datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
    },
  ];
  chart2 = echarts.init(chart2Ref.value);
  // 配置数据
  const option = {
    title: {
      left: "10%",
      text: "总金额",
      radius: ["40%", "60%"],
      center: ["25%", "50%"],
      subtext: "",
    },
    tooltip: {
      trigger: "item",
      formatter(data) {
        return `程序号：${data.name}</br>项目完成数: ${data.data.datas[2].com}</br>审核率: ${data.data.datas[0].aud}</br>审核成功率: ${data.data.datas[1].audR}`;
      },
    },

    legend: [
      {
        orient: "vertical",
        x: "65%",
        y: "center",
        bottom: "10",
        itemGap: 20, // 设置图例图形的宽
        data: ["张三", "李四", "王五", "赵六", "老王", "老王1", "老王2"],
        formatter(name) {
          let target, percentage;
          for (let i = 0; i < data.length; i++) {
            if (data[i].name === name) {
              target = data[i].value;
            }
          }
          const arr = [`${name} `, ` ${target}`];
          return arr.join(" ");
        },
      },
      {
        orient: "vertical",
        x: "80%",
        y: "center",
        bottom: "10",
        itemGap: 20, // 设置图例图形的高
        data: ["老王3", "老王4", "老王5", "老王6", "老王7", "老王8", "老王9"],
        formatter(name) {
          let target, percentage;
          for (let i = 0; i < data.length; i++) {
            if (data[i].name === name) {
              target = data[i].value;
            }
          }
          const arr = [`${name} `, ` ${target}`];
          return arr.join(" ");
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
        data,
        label: {
          normal: {
            position: "inner",
            show: false,
          },
        },
      },
    ],
    graphic: [
      {
        type: "text",
        left: "22.5%",
        top: "44%",
        style: {
          text: `合计`,
          textAlign: "center",
          fill: "#333",
          fontSize: 18,
          fontWeight: "",
        },
      },
      {
        type: "text",
        left: "20%",
        top: "50%",
        style: {
          text: `${data.reduce((total, item) => total + item.value, 0)}`,
          textAlign: "center",
          fill: "#333",
          fontSize: 30,
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
          <ColorfulCard2
            header="发布项目数"
            :num="123"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#fbaaa2"
            color-to="#fc5286"
            header="发布项目数"
            :num="12323"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#ff763b"
            color-to="#ffc480"
            header="发布项目数"
            :num="123"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#6a8eff"
            color-to="#0e4cfd"
            header="业务应用页面"
            :num="123"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#ffd300"
            color-to="#ff9b0d"
            header="业务应用页面"
            :num="123"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#f49494"
            color-to="#fcd98b"
            header="业务应用页面"
            :num="123"
            icon="ant-design:file-outlined"
          />
        </ElCol>
        <ElCol>
          <ColorfulCard2
            color-from="#c2005c"
            color-to="#ff980f"
            header="业务应用页面"
            :num="123"
            icon="ant-design:file-outlined"
          />
        </ElCol>
      </ElRow>
      <!-- 营业额趋势 & 客户总览 -->
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card>
            <template #header>
              <p class="title">营业额趋势</p>
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
