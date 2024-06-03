<route lang="yaml">
  meta:
    title: 导航1
  </route>

  <script setup>
  import * as echarts from "echarts";
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";
  const router = useRouter();

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
        name: "老张",
        title: "1111",
        datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
      },
      {
        value: 70,
        name: "老李",
        title: "1111",
        datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
      },
      {
        value: 80,
        name: "老赵",
        title: "1111",
        datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
      },
      {
        value: 200,
        name: "王总",
        title: "1111",
        datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
      },
      {
        value: 100,
        name: "张总",
        title: "1111",
        datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
      },
      {
        value: 110,
        name: "李总",
        title: "1111",
        datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
      },
      {
        value: 130,
        name: "赵总",
        title: "1111",
        datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
      },
      {
        value: 140,
        name: "老钱",
        title: "1111",
        datas: [{ aud: "333" }, { audR: "333" }, { com: "123123" }],
      },
      {
        value: "",
        name: "查看更多>>",
      },
    ];
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
        formatter(data) {
          return `程序号：${data.name}</br>项目完成数: ${data.data.datas[2].com}</br>审核率: ${data.data.datas[0].aud}</br>审核成功率: ${data.data.datas[1].audR}`;
        },
      },

      legend: [
        // {
        //   orient: "vertical",
        //   x: "55%",
        //   y: "center",
        //   bottom: "10",
        //   itemGap: 20, // 设置图例图形的宽
        //   data: ["张三", "李四", "王五", "赵六", "老王", "老张", "老李"],
        //   formatter(name) {
        //     let target, percentage;
        //     for (let i = 0; i < data.length; i++) {
        //       if (data[i].name === name) {
        //         target = data[i].value;
        //       }
        //     }
        //     const arr = [`${name}`, ` ${target}`];
        //     return arr.join(" ");
        //   },
        // },
        {
          orient: "horizontal",
          x: "55%",
          y: "center",
          bottom: "20",
          itemGap: 20, // 设置图例图形的宽
          center: ["50%", "50%"],
          icon: "stack",
          data: [
            "张三",
            "李四",
            "王五",
            "赵六",
            "老王",
            "老张",
            "老李",
            "老赵",
            "王总",
            "张总",
            "李总",
            "赵总",
            "老钱",
            {
              name: "查看更多>>",
              icon: "none",
              textStyle: {
                fontSize: 12,
                fontWeight: "bolder",
                color: "#3a2acd",
              },
            },
          ],
          formatter(name) {
            let target, percentage;
            for (let i = 0; i < data.length; i++) {
              if (data[i].name === name) {
                target = data[i].value;
              }
            }
            if (name == "查看更多") {
              return name;
            }
            const arr = [`{a|${name}} `, `{b| ${target}}`];
            return arr.join(" ");
          },
          textStyle: {
            rich: {
              a: {
                width: 50,
                backgroundColor: "transparent",
              },
              b: {
                width: 60,
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
          type: "group",
          left: "25%",
          top: "center",
          bounding: "raw",
          children: [
            {
              type: "text",
              style: {
                text: `合计`,
                fontSize: 18,
                textAlign: "center",
                textVerticalAlign: "bottom",
              },
            },
            {
              type: "text",
              style: {
                text: `${data.reduce((total, item) => total + item.value, 0)}`,
                textAlign: "center",
                textVerticalAlign: "top",
                fontSize: 30,
              },
            },
          ],
        },
      ],
    };
    chart2.on("legendselectchanged", function (params) {
      // 如果点击的图例是 '需要添加超链接的图例名称'
      if (params.name === "查看更多>>") {
        // 执行跳转到链接的操作
        router.push("/datacenter");
      }
    });
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
              header="待确认项目数"
              :num="12323"
              icon="ant-design:file-outlined"
            />
          </ElCol>
          <ElCol>
            <ColorfulCard2
              color-from="#ff763b"
              color-to="#ffc480"
              header="已确认项目数"
              :num="123"
              icon="ant-design:file-outlined"
            />
          </ElCol>
          <ElCol>
            <ColorfulCard2
              color-from="#6a8eff"
              color-to="#0e4cfd"
              header="已完结项目数"
              :num="123"
              icon="ant-design:file-outlined"
            />
          </ElCol>
          <ElCol>
            <ColorfulCard2
              color-from="#ffd300"
              color-to="#ff9b0d"
              header="项目营业额"
              :num="123"
              icon="ant-design:file-outlined"
            />
          </ElCol>
          <ElCol>
            <ColorfulCard2
              color-from="#f49494"
              color-to="#fcd98b"
              header="项目盈利额"
              :num="123"
              icon="ant-design:file-outlined"
            />
          </ElCol>
          <ElCol>
            <ColorfulCard2
              color-from="#c2005c"
              color-to="#ff980f"
              header="项目退款额"
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
                  完成数排名
                  <SearchTab />
                </p>
              </template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" />
                <el-table-column prop="name" label="供应商" />
                <el-table-column prop="money" label="完成金额" />
                <el-table-column prop="num" label="完成数量" />
                <el-table-column prop="B2B/B2C" label="B2B/B2C" />
                <el-table-column prop="currency" label="所属国家" />
              </el-table>
            </el-card>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-card>
              <template #header>
                <p class="title fx-b">
                  供应商营业额排行
                  <SearchTab />
                </p>
              </template>

              <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" />
                <el-table-column prop="name" label="供应商" />
                <el-table-column prop="money" label="日" />
                <el-table-column prop="num" label="月" />
                <el-table-column prop="B2B/B2C" label="年" />
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
