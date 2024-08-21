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
import useNotificationStore from "@/store/modules/notification"; //消息中心
defineOptions({
  name: "homePage",
});
const notificationStore = useNotificationStore(); //消息中心
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
  data.value.dataCenterSupplierTurnovers = [
    {
      name: 111,
      turnover: 222
    },
    {
      name: 111,
      turnover: 222
    },
  ]
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
// 待办
const cooperation = (row: any) => {
  router.push({
    path: "/personal/notification",
    query: {
      type: 2,
      id: row.id,
    },
  });
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
    <PageMain style="background:transparent;">
      <el-row>
        <el-radio-group v-model="data.search.type" @change="timeChange">
          <el-radio-button label="日" value="day" />
          <el-radio-button label="月" value="month" />
          <el-radio-button label="年" value="year" />
        </el-radio-group>
      </el-row>
      <div class="row">
        <div class="leftBox">
          <!-- 数量集成 -->
          <div class="row quantityBox">
            <div class="itemBox">
              <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 548">
                  <rect id="Rectangle 6017" x="0.25" width="48" height="48" rx="8" fill="#D0F5FE" />
                  <g id="Group 526">
                    <rect id="Rectangle 6028" x="14.25" y="7" width="14" height="4" rx="1" fill="#56C5E1" />
                    <rect id="Rectangle 6024" x="9.25" y="10" width="24" height="30" rx="3"
                      fill="url(#paint0_linear_168_10051)" />
                    <rect id="Rectangle 6019" x="12.25" y="13" width="18" height="3" rx="1.5" fill="white" />
                    <rect id="Rectangle 6025" x="14.25" y="18" width="14" height="3" rx="1.5" fill="white" />
                    <rect id="Rectangle 6026" x="12.25" y="23" width="18" height="3" rx="1.5" fill="white" />
                    <g id="Group 550">
                      <g id="Ellipse 52" filter="url(#filter0_b_168_10051)">
                        <circle cx="30.25" cy="34" r="8" fill="#B3F0FF" fill-opacity="0.3" />
                      </g>
                      <path id="Union" fill-rule="evenodd" clip-rule="evenodd"
                        d="M34.5418 30.2929C34.9323 29.9024 35.5655 29.9024 35.956 30.2929C36.3465 30.6834 36.3465 31.3166 35.956 31.7071L30.4557 37.2075C30.3266 37.3365 30.1711 37.4229 30.0066 37.4667C29.673 37.5558 29.3022 37.4695 29.0405 37.2077L25.5429 33.7101C25.1524 33.3196 25.1524 32.6865 25.5429 32.2959C25.9334 31.9054 26.5666 31.9054 26.9571 32.2959L29.7479 35.0868L34.5418 30.2929Z"
                        fill="#FCFFFE" />
                    </g>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_b_168_10051" x="18.25" y="22" width="24" height="24" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_168_10051" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_168_10051" result="shape" />
                  </filter>
                  <linearGradient id="paint0_linear_168_10051" x1="10.75" y1="10" x2="30.25" y2="40"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#5BCAE6" />
                    <stop offset="0.945" stop-color="#42AECA" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <!-- 数量 -->
                <p class="quantity-title">发布项目数额</p>
                <div class="quantity-num">{{ data.dataCenterOverViewVO?.projectTotal
          ? data.dataCenterOverViewVO?.projectTotal
          : 0 }}
                </div>
                <!-- 较昨日 -->
                <div class="compare">
                  <div class="compare-hui">较昨日</div>
                  <div class="quantity-num">156</div>
                  <div class="quantity-icon"> <!-- 上升图标 -->
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Frame" clip-path="url(#clip0_168_10011)">
                        <path id="Vector"
                          d="M0.587678 6.69506L6.43968 0.843061C6.74768 0.535061 7.25168 0.535061 7.56668 0.843061L13.4117 6.69506C13.9157 7.19906 13.5587 8.05306 12.8517 8.05306H1.14768C0.440678 8.05306 0.0836778 7.19206 0.587678 6.69506Z"
                          fill="#FF7D7D" />
                        <path id="Vector_2"
                          d="M5.10393 4.37805H8.89793C9.39493 4.37805 9.79393 4.77705 9.79393 5.27405V13.4431C9.79393 13.9401 9.39493 14.3391 8.89793 14.3391H5.11093C4.61393 14.3391 4.21493 13.9401 4.21493 13.4431V5.27405C4.20793 4.77705 4.60693 4.37805 5.10393 4.37805Z"
                          fill="#FF7D7D" />
                      </g>
                      <defs>
                        <clipPath id="clip0_168_10011">
                          <rect width="14" height="14" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="itemBox">
              <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 548">
                  <rect id="Rectangle 6017" x="0.25" width="48" height="48" rx="8" fill="#D0F5FE" />
                  <g id="Group 526">
                    <rect id="Rectangle 6028" x="14.25" y="7" width="14" height="4" rx="1" fill="#56C5E1" />
                    <rect id="Rectangle 6024" x="9.25" y="10" width="24" height="30" rx="3"
                      fill="url(#paint0_linear_168_10051)" />
                    <rect id="Rectangle 6019" x="12.25" y="13" width="18" height="3" rx="1.5" fill="white" />
                    <rect id="Rectangle 6025" x="14.25" y="18" width="14" height="3" rx="1.5" fill="white" />
                    <rect id="Rectangle 6026" x="12.25" y="23" width="18" height="3" rx="1.5" fill="white" />
                    <g id="Group 550">
                      <g id="Ellipse 52" filter="url(#filter0_b_168_10051)">
                        <circle cx="30.25" cy="34" r="8" fill="#B3F0FF" fill-opacity="0.3" />
                      </g>
                      <path id="Union" fill-rule="evenodd" clip-rule="evenodd"
                        d="M34.5418 30.2929C34.9323 29.9024 35.5655 29.9024 35.956 30.2929C36.3465 30.6834 36.3465 31.3166 35.956 31.7071L30.4557 37.2075C30.3266 37.3365 30.1711 37.4229 30.0066 37.4667C29.673 37.5558 29.3022 37.4695 29.0405 37.2077L25.5429 33.7101C25.1524 33.3196 25.1524 32.6865 25.5429 32.2959C25.9334 31.9054 26.5666 31.9054 26.9571 32.2959L29.7479 35.0868L34.5418 30.2929Z"
                        fill="#FCFFFE" />
                    </g>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_b_168_10051" x="18.25" y="22" width="24" height="24" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_168_10051" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_168_10051" result="shape" />
                  </filter>
                  <linearGradient id="paint0_linear_168_10051" x1="10.75" y1="10" x2="30.25" y2="40"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#5BCAE6" />
                    <stop offset="0.945" stop-color="#42AECA" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <!-- 数量 -->
                <p class="quantity-title">发布项目数额</p>
                <div class="quantity-num">{{ data.dataCenterOverViewVO?.projectTotal
          ? data.dataCenterOverViewVO?.projectTotal
          : 0 }}</div>

                <!-- 较昨日 -->
                <div class="compare">
                  <div class="compare-hui">较昨日</div>
                  <div class="quantity-num">156</div>
                  <div class="quantity-icon"> <!-- 上升图标 -->
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Frame" clip-path="url(#clip0_168_10011)">
                        <path id="Vector"
                          d="M0.587678 6.69506L6.43968 0.843061C6.74768 0.535061 7.25168 0.535061 7.56668 0.843061L13.4117 6.69506C13.9157 7.19906 13.5587 8.05306 12.8517 8.05306H1.14768C0.440678 8.05306 0.0836778 7.19206 0.587678 6.69506Z"
                          fill="#FF7D7D" />
                        <path id="Vector_2"
                          d="M5.10393 4.37805H8.89793C9.39493 4.37805 9.79393 4.77705 9.79393 5.27405V13.4431C9.79393 13.9401 9.39493 14.3391 8.89793 14.3391H5.11093C4.61393 14.3391 4.21493 13.9401 4.21493 13.4431V5.27405C4.20793 4.77705 4.60693 4.37805 5.10393 4.37805Z"
                          fill="#FF7D7D" />
                      </g>
                      <defs>
                        <clipPath id="clip0_168_10011">
                          <rect width="14" height="14" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                </div>
              </div>

            </div>
            <div class="itemBox">
              <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 548">
                  <rect id="Rectangle 6017" x="0.25" width="48" height="48" rx="8" fill="#D0F5FE" />
                  <g id="Group 526">
                    <rect id="Rectangle 6028" x="14.25" y="7" width="14" height="4" rx="1" fill="#56C5E1" />
                    <rect id="Rectangle 6024" x="9.25" y="10" width="24" height="30" rx="3"
                      fill="url(#paint0_linear_168_10051)" />
                    <rect id="Rectangle 6019" x="12.25" y="13" width="18" height="3" rx="1.5" fill="white" />
                    <rect id="Rectangle 6025" x="14.25" y="18" width="14" height="3" rx="1.5" fill="white" />
                    <rect id="Rectangle 6026" x="12.25" y="23" width="18" height="3" rx="1.5" fill="white" />
                    <g id="Group 550">
                      <g id="Ellipse 52" filter="url(#filter0_b_168_10051)">
                        <circle cx="30.25" cy="34" r="8" fill="#B3F0FF" fill-opacity="0.3" />
                      </g>
                      <path id="Union" fill-rule="evenodd" clip-rule="evenodd"
                        d="M34.5418 30.2929C34.9323 29.9024 35.5655 29.9024 35.956 30.2929C36.3465 30.6834 36.3465 31.3166 35.956 31.7071L30.4557 37.2075C30.3266 37.3365 30.1711 37.4229 30.0066 37.4667C29.673 37.5558 29.3022 37.4695 29.0405 37.2077L25.5429 33.7101C25.1524 33.3196 25.1524 32.6865 25.5429 32.2959C25.9334 31.9054 26.5666 31.9054 26.9571 32.2959L29.7479 35.0868L34.5418 30.2929Z"
                        fill="#FCFFFE" />
                    </g>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_b_168_10051" x="18.25" y="22" width="24" height="24" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_168_10051" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_168_10051" result="shape" />
                  </filter>
                  <linearGradient id="paint0_linear_168_10051" x1="10.75" y1="10" x2="30.25" y2="40"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#5BCAE6" />
                    <stop offset="0.945" stop-color="#42AECA" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <!-- 数量 -->
                <p class="quantity-title">发布项目数额</p>
                <div class="quantity-num">{{ data.dataCenterOverViewVO?.projectTotal
          ? data.dataCenterOverViewVO?.projectTotal
          : 0 }}</div>

                <!-- 较昨日 -->
                <div class="compare">
                  <div class="compare-hui">较昨日</div>
                  <div class="quantity-num">156</div>
                  <div class="quantity-icon"> <!-- 上升图标 -->
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Frame" clip-path="url(#clip0_168_10011)">
                        <path id="Vector"
                          d="M0.587678 6.69506L6.43968 0.843061C6.74768 0.535061 7.25168 0.535061 7.56668 0.843061L13.4117 6.69506C13.9157 7.19906 13.5587 8.05306 12.8517 8.05306H1.14768C0.440678 8.05306 0.0836778 7.19206 0.587678 6.69506Z"
                          fill="#FF7D7D" />
                        <path id="Vector_2"
                          d="M5.10393 4.37805H8.89793C9.39493 4.37805 9.79393 4.77705 9.79393 5.27405V13.4431C9.79393 13.9401 9.39493 14.3391 8.89793 14.3391H5.11093C4.61393 14.3391 4.21493 13.9401 4.21493 13.4431V5.27405C4.20793 4.77705 4.60693 4.37805 5.10393 4.37805Z"
                          fill="#FF7D7D" />
                      </g>
                      <defs>
                        <clipPath id="clip0_168_10011">
                          <rect width="14" height="14" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                </div>
              </div>

            </div>
            <div class="itemBox">
              <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 548">
                  <rect id="Rectangle 6017" x="0.25" width="48" height="48" rx="8" fill="#D0F5FE" />
                  <g id="Group 526">
                    <rect id="Rectangle 6028" x="14.25" y="7" width="14" height="4" rx="1" fill="#56C5E1" />
                    <rect id="Rectangle 6024" x="9.25" y="10" width="24" height="30" rx="3"
                      fill="url(#paint0_linear_168_10051)" />
                    <rect id="Rectangle 6019" x="12.25" y="13" width="18" height="3" rx="1.5" fill="white" />
                    <rect id="Rectangle 6025" x="14.25" y="18" width="14" height="3" rx="1.5" fill="white" />
                    <rect id="Rectangle 6026" x="12.25" y="23" width="18" height="3" rx="1.5" fill="white" />
                    <g id="Group 550">
                      <g id="Ellipse 52" filter="url(#filter0_b_168_10051)">
                        <circle cx="30.25" cy="34" r="8" fill="#B3F0FF" fill-opacity="0.3" />
                      </g>
                      <path id="Union" fill-rule="evenodd" clip-rule="evenodd"
                        d="M34.5418 30.2929C34.9323 29.9024 35.5655 29.9024 35.956 30.2929C36.3465 30.6834 36.3465 31.3166 35.956 31.7071L30.4557 37.2075C30.3266 37.3365 30.1711 37.4229 30.0066 37.4667C29.673 37.5558 29.3022 37.4695 29.0405 37.2077L25.5429 33.7101C25.1524 33.3196 25.1524 32.6865 25.5429 32.2959C25.9334 31.9054 26.5666 31.9054 26.9571 32.2959L29.7479 35.0868L34.5418 30.2929Z"
                        fill="#FCFFFE" />
                    </g>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_b_168_10051" x="18.25" y="22" width="24" height="24" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_168_10051" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_168_10051" result="shape" />
                  </filter>
                  <linearGradient id="paint0_linear_168_10051" x1="10.75" y1="10" x2="30.25" y2="40"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#5BCAE6" />
                    <stop offset="0.945" stop-color="#42AECA" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <!-- 数量 -->
                <p class="quantity-title">发布项目数额</p>
                <div class="quantity-num">{{ data.dataCenterOverViewVO?.projectTotal
          ? data.dataCenterOverViewVO?.projectTotal
          : 0 }}</div>

                <!-- 较昨日 -->
                <div class="compare">
                  <div class="compare-hui">较昨日</div>
                  <div class="quantity-num">156</div>
                  <div class="quantity-icon"> <!-- 上升图标 -->
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="Frame" clip-path="url(#clip0_168_10011)">
                        <path id="Vector"
                          d="M0.587678 6.69506L6.43968 0.843061C6.74768 0.535061 7.25168 0.535061 7.56668 0.843061L13.4117 6.69506C13.9157 7.19906 13.5587 8.05306 12.8517 8.05306H1.14768C0.440678 8.05306 0.0836778 7.19206 0.587678 6.69506Z"
                          fill="#FF7D7D" />
                        <path id="Vector_2"
                          d="M5.10393 4.37805H8.89793C9.39493 4.37805 9.79393 4.77705 9.79393 5.27405V13.4431C9.79393 13.9401 9.39493 14.3391 8.89793 14.3391H5.11093C4.61393 14.3391 4.21493 13.9401 4.21493 13.4431V5.27405C4.20793 4.77705 4.60693 4.37805 5.10393 4.37805Z"
                          fill="#FF7D7D" />
                      </g>
                      <defs>
                        <clipPath id="clip0_168_10011">
                          <rect width="14" height="14" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                </div>
              </div>

            </div>
            <!-- <ElCol>
          <ColorfulCard2 header="发布项目数" :num="data.dataCenterOverViewVO?.projectTotal
          ? data.dataCenterOverViewVO?.projectTotal
          : 0
          " icon="ant-design:file-outlined" />
        </ElCol>
        <ElCol>
          <ColorfulCard2 color-from="#fbaaa2" color-to="#fc5286" header="待审核项目数" :num="data.dataCenterOverViewVO?.projectSettlementToBeConfirmedTotal
          ? data.dataCenterOverViewVO?.projectSettlementToBeConfirmedTotal
          : 0
          " icon="ant-design:file-outlined" />
        </ElCol>
        <ElCol>
          <ColorfulCard2 color-from="#ff763b" color-to="#ffc480" header="已审核项目数" :num="data.dataCenterOverViewVO?.projectSettlementConfirmedTotal
          ? data.dataCenterOverViewVO?.projectSettlementConfirmedTotal
          : 0
          " icon="ant-design:file-outlined" />
        </ElCol>
        <ElCol>
          <ColorfulCard2 color-from="#6a8eff" color-to="#0e4cfd" header="已完结项目数" :num="data.dataCenterOverViewVO?.projectSettlementCompleteTotal
          ? data.dataCenterOverViewVO?.projectSettlementCompleteTotal
          : 0
          " icon="ant-design:file-outlined" />
        </ElCol>
        <ElCol>
          <ColorfulCard2 color-from="#ffd300" color-to="#ff9b0d" header="项目营业额" :num="data.dataCenterOverViewVO?.projectTurnover
          ? data.dataCenterOverViewVO?.projectTurnover
          : 0
          " icon="ant-design:file-outlined" />
        </ElCol>
        <ElCol>
          <ColorfulCard2 color-from="#f49494" color-to="#fcd98b" header="项目盈利额" :num="data.dataCenterOverViewVO?.projectProfitability
          ? data.dataCenterOverViewVO?.projectProfitability
          : 0
          " icon="ant-design:file-outlined" />
        </ElCol>
        <ElCol>
          <ColorfulCard2 color-from="#c2005c" color-to="#ff980f" header="项目退款额" :num="data.dataCenterOverViewVO?.projectRefundAmount
          ? data.dataCenterOverViewVO?.projectRefundAmount
          : 0
          " icon="ant-design:file-outlined" />
        </ElCol> -->
          </div>
          <!-- 营业额趋势 & 客户总览 -->
          <div class="row echarts">
            <div class="revenueTrend itemBox">
              <div class="itemBoxTitle">
                <div>
                  <span class="blue"> </span>
                  营业额趋势
                </div>
              </div>
              <div id="echarts1" ref="chart1Ref" style="width: 100%; height: 300px" />
            </div>
            <div class="customerOverview itemBox">
              <div class="itemBoxTitle">
                <div>
                  <span class="blue"> </span>
                  客户总览
                </div>
              </div>
              <div id="echarts2" ref="chart2Ref" style="width: 100%; height: 300px" />
            </div>
          </div>

          <!-- 完成数据排名 & 供应商营业额排行 -->
          <div class='row table'>
            <div class="completionRanking itemBox">
              <div class="itemBoxTitle">
                <div>
                  <span class="blue"> </span>
                  完成数排名
                </div>
              </div>
              <el-table :data="data.dataCenterSupplierCompletedQuantities" style="width: 100%">
                <el-table-column type="index" />
                <el-table-column align="center" prop="supplierName" label="供应商名称"><template #default="{ row }">
                    {{ row.supplierName ? row.supplierName : "-" }}
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="completedAmount" label="完成金额"><template #default="{ row }">
                    {{ row.completedAmount ? row.completedAmount : "-" }}
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="completedQuantity" label="完成数量" />
                <el-table-column align="center" prop="b2BProportion" label="B2B" />
                <el-table-column align="center" prop="b2CProportion" label="B2C" />
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
            </div>
            <div class="supplierRevenueRanking itemBox">
              <div class="itemBoxTitle">
                <div>
                  <span class="blue"> </span>
                  营业额趋势
                </div>
              </div>
              <el-table :data="data.dataCenterSupplierTurnovers" style="width: 100%">
                <el-table-column type="index" />
                <el-table-column align="center" prop="name" label="供应商名称"><template #default="{ row }">
                    {{ row.name ? row.name : "-" }}
                  </template>
                </el-table-column>
                <el-table-column align="center" sortable prop="turnover" label="营业额" />
                <template #empty>
                  <el-empty description="暂无数据" />
                </template>
              </el-table>
            </div>
          </div>
        </div>
        <div class="rightBox">
          <div class="itemBox">
            <div class="itemBoxTitle">营业额明细</div>
            <!--营业额明细  -->
            <div class="revenueDetails">
              <div class="itemBox">
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Group 548">
                    <rect id="Rectangle 6017" x="0.25" width="48" height="48" rx="8" fill="#D0F5FE" />
                    <g id="Group 526">
                      <rect id="Rectangle 6028" x="14.25" y="7" width="14" height="4" rx="1" fill="#56C5E1" />
                      <rect id="Rectangle 6024" x="9.25" y="10" width="24" height="30" rx="3"
                        fill="url(#paint0_linear_168_10051)" />
                      <rect id="Rectangle 6019" x="12.25" y="13" width="18" height="3" rx="1.5" fill="white" />
                      <rect id="Rectangle 6025" x="14.25" y="18" width="14" height="3" rx="1.5" fill="white" />
                      <rect id="Rectangle 6026" x="12.25" y="23" width="18" height="3" rx="1.5" fill="white" />
                      <g id="Group 550">
                        <g id="Ellipse 52" filter="url(#filter0_b_168_10051)">
                          <circle cx="30.25" cy="34" r="8" fill="#B3F0FF" fill-opacity="0.3" />
                        </g>
                        <path id="Union" fill-rule="evenodd" clip-rule="evenodd"
                          d="M34.5418 30.2929C34.9323 29.9024 35.5655 29.9024 35.956 30.2929C36.3465 30.6834 36.3465 31.3166 35.956 31.7071L30.4557 37.2075C30.3266 37.3365 30.1711 37.4229 30.0066 37.4667C29.673 37.5558 29.3022 37.4695 29.0405 37.2077L25.5429 33.7101C25.1524 33.3196 25.1524 32.6865 25.5429 32.2959C25.9334 31.9054 26.5666 31.9054 26.9571 32.2959L29.7479 35.0868L34.5418 30.2929Z"
                          fill="#FCFFFE" />
                      </g>
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_b_168_10051" x="18.25" y="22" width="24" height="24"
                      filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                      <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_168_10051" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_168_10051" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_168_10051" x1="10.75" y1="10" x2="30.25" y2="40"
                      gradientUnits="userSpaceOnUse">
                      <stop stop-color="#5BCAE6" />
                      <stop offset="0.945" stop-color="#42AECA" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <!-- 数量 -->
                  <p class="quantity-title">发布项目数额</p>
                  <div class="quantity-num">{{ data.dataCenterOverViewVO?.projectTotal
          ? data.dataCenterOverViewVO?.projectTotal
          : 0 }}</div>


                </div>
              </div>
              <div class="itemBox">
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Group 548">
                    <rect id="Rectangle 6017" x="0.25" width="48" height="48" rx="8" fill="#D0F5FE" />
                    <g id="Group 526">
                      <rect id="Rectangle 6028" x="14.25" y="7" width="14" height="4" rx="1" fill="#56C5E1" />
                      <rect id="Rectangle 6024" x="9.25" y="10" width="24" height="30" rx="3"
                        fill="url(#paint0_linear_168_10051)" />
                      <rect id="Rectangle 6019" x="12.25" y="13" width="18" height="3" rx="1.5" fill="white" />
                      <rect id="Rectangle 6025" x="14.25" y="18" width="14" height="3" rx="1.5" fill="white" />
                      <rect id="Rectangle 6026" x="12.25" y="23" width="18" height="3" rx="1.5" fill="white" />
                      <g id="Group 550">
                        <g id="Ellipse 52" filter="url(#filter0_b_168_10051)">
                          <circle cx="30.25" cy="34" r="8" fill="#B3F0FF" fill-opacity="0.3" />
                        </g>
                        <path id="Union" fill-rule="evenodd" clip-rule="evenodd"
                          d="M34.5418 30.2929C34.9323 29.9024 35.5655 29.9024 35.956 30.2929C36.3465 30.6834 36.3465 31.3166 35.956 31.7071L30.4557 37.2075C30.3266 37.3365 30.1711 37.4229 30.0066 37.4667C29.673 37.5558 29.3022 37.4695 29.0405 37.2077L25.5429 33.7101C25.1524 33.3196 25.1524 32.6865 25.5429 32.2959C25.9334 31.9054 26.5666 31.9054 26.9571 32.2959L29.7479 35.0868L34.5418 30.2929Z"
                          fill="#FCFFFE" />
                      </g>
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_b_168_10051" x="18.25" y="22" width="24" height="24"
                      filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                      <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_168_10051" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_168_10051" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_168_10051" x1="10.75" y1="10" x2="30.25" y2="40"
                      gradientUnits="userSpaceOnUse">
                      <stop stop-color="#5BCAE6" />
                      <stop offset="0.945" stop-color="#42AECA" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <!-- 数量 -->
                  <p class="quantity-title">发布项目数额</p>
                  <div class="quantity-num">{{ data.dataCenterOverViewVO?.projectTotal
          ? data.dataCenterOverViewVO?.projectTotal
          : 0 }}</div>


                </div>
              </div>
              <div class="itemBox">
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Group 548">
                    <rect id="Rectangle 6017" x="0.25" width="48" height="48" rx="8" fill="#D0F5FE" />
                    <g id="Group 526">
                      <rect id="Rectangle 6028" x="14.25" y="7" width="14" height="4" rx="1" fill="#56C5E1" />
                      <rect id="Rectangle 6024" x="9.25" y="10" width="24" height="30" rx="3"
                        fill="url(#paint0_linear_168_10051)" />
                      <rect id="Rectangle 6019" x="12.25" y="13" width="18" height="3" rx="1.5" fill="white" />
                      <rect id="Rectangle 6025" x="14.25" y="18" width="14" height="3" rx="1.5" fill="white" />
                      <rect id="Rectangle 6026" x="12.25" y="23" width="18" height="3" rx="1.5" fill="white" />
                      <g id="Group 550">
                        <g id="Ellipse 52" filter="url(#filter0_b_168_10051)">
                          <circle cx="30.25" cy="34" r="8" fill="#B3F0FF" fill-opacity="0.3" />
                        </g>
                        <path id="Union" fill-rule="evenodd" clip-rule="evenodd"
                          d="M34.5418 30.2929C34.9323 29.9024 35.5655 29.9024 35.956 30.2929C36.3465 30.6834 36.3465 31.3166 35.956 31.7071L30.4557 37.2075C30.3266 37.3365 30.1711 37.4229 30.0066 37.4667C29.673 37.5558 29.3022 37.4695 29.0405 37.2077L25.5429 33.7101C25.1524 33.3196 25.1524 32.6865 25.5429 32.2959C25.9334 31.9054 26.5666 31.9054 26.9571 32.2959L29.7479 35.0868L34.5418 30.2929Z"
                          fill="#FCFFFE" />
                      </g>
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_b_168_10051" x="18.25" y="22" width="24" height="24"
                      filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                      <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_168_10051" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_168_10051" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_168_10051" x1="10.75" y1="10" x2="30.25" y2="40"
                      gradientUnits="userSpaceOnUse">
                      <stop stop-color="#5BCAE6" />
                      <stop offset="0.945" stop-color="#42AECA" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <!-- 数量 -->
                  <p class="quantity-title">发布项目数额</p>
                  <div class="quantity-num">{{ data.dataCenterOverViewVO?.projectTotal
          ? data.dataCenterOverViewVO?.projectTotal
          : 0 }}</div>


                </div>
              </div>
            </div>


          </div>
          <div class="toDoCenter itemBox">
            <div class="itemBoxTitle">待办中心
              <RouterLink v-slot="{ navigate }" to="/personal/notification?type=2" custom>
                <svg @click="navigate" width="20" height="20" viewBox="0 0 20 20" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="Right (&#229;&#143;&#179;)">
                    <path id="Vector" d="M7.91797 5L12.918 10L7.91797 15" stroke="#777777" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                </svg>

              </RouterLink>

            </div>
            <OverlayScrollbarsComponent :options="{
          scrollbars: { autoHide: 'leave', autoHideDelay: 300 },
        }" defer class="list">
              <template v-if="notificationStore.todoList.length">
                <div :class="item.isReadAlready === 1 ? 'item new' : 'item'" v-for="item in notificationStore.todoList"
                  @click="cooperation(item)">
                  <SvgIcon name="i-ri:file-edit-fill" class="service" />
                  <div class="info">
                    <div class="title">
                      {{
          notificationStore.auditTypeList[item.auditType - 1] ||
                      ""
                      }}
                      &emsp;
                      {{ item.messageContent }}
                    </div>
                    <div class="date">
                      {{ item.createTime }}
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="flex flex-col items-center py-6 text-stone-5">
                  <SvgIcon name="i-tabler:mood-smile" :size="40" />
                  <p m-2 text-base>没有待办</p>
                </div>
              </template>
            </OverlayScrollbarsComponent>
          </div>

        </div>
      </div>

    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
// 去除表格色块 线
:deep {
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

.itemBox {
  background: #FFFFFF;
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
}

.itemBoxTitle {
  height: 25px;
  font-family: PingFang SC, PingFang SC;
  font-weight: 600;
  font-size: 1.125rem;
  color: #0F0F0F;
  line-height: 25px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  position: relative;
  margin-bottom: .5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  >div {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .blue {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 25px;
  }

  .blue::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    background: #409EFF;
    border-radius: 50%;
    margin-right: 20px;
  }

}

.fx-b {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.row {
  display: flex;
  justify-content: start;
  width: 100%;
  margin-bottom: 1rem !important;

  .itemBox {
    margin-right: 1rem;
  }

  .itemBox:nth-last-of-type(1) {
    margin-right: 0;
  }
}

:deep(.main-container) {
  padding: 0;
}

.leftBox {
  width: 80%;

  // 数量集成
  .quantityBox {
    .itemBox {
      display: flex;
      align-items: start;
      justify-content: start;
      flex: 1;
      height: 149px;

      >svg {
        margin-right: .5rem
      }

      >div {
        flex: 1;

        .quantity-title {
          min-height: 20px;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: .875rem;
          color: #0F0F0F;
          line-height: 16px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .quantity-num {
          // width: 233px;
          height: 36px;
          font-family: DINPro, DINPro;
          font-weight: 500;
          font-size: 1.75rem;
          color: #0F0F0F;
          line-height: 33px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .compare {
          max-width: 7.375rem;
          height: 29px;
          background: #F0F5FA;
          border-radius: 6.25rem 6.25rem 6.25rem 6.25rem;
          display: flex;
          justify-content: center;
          align-items: center;

          .compare-hui {
            width: 2.625rem;
            height: 20px;
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: .875rem;
            color: #777777;
            line-height: 20px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          .quantity-num {
            width: 1.625rem;
            height: 21px;
            font-family: DINPro, DINPro;
            font-weight: 500;
            font-size: 1rem;
            color: #0F0F0F;
            line-height: 21px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          .quantity-icon {
            // background-color: #fff;
          }
        }
      }
    }
  }

  // 图标
  .echarts {

    // 营业额趋势
    .revenueTrend {
      width: calc(75% - .25rem);
    }

    // 客户总览
    .customerOverview {
      width: calc(25% - .75rem);
    }
  }

  .table {

    .completionRanking,
    .supplierRevenueRanking {
      width: calc(50% - .5rem);
    }

  }
}

.rightBox {
  width: 20%;
  margin-left: 1rem;

  .revenueDetails {
    display: flex;
    justify-content: start;
    align-content: center;
    flex-wrap: wrap;

    .itemBox {
      width: calc(50% - 1rem);
      display: flex;
      align-items: start;
      justify-content: start;
      height: 92px;
      padding: 1rem 0;

      >svg {
        margin-right: .5rem
      }

      >div {
        flex: 1;

        .quantity-title {
          min-height: 20px;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: .875rem;
          color: #0F0F0F;
          line-height: 16px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .quantity-num {
          // width: 233px;
          height: 36px;
          font-family: DINPro, DINPro;
          font-weight: 500;
          font-size: 1.75rem;
          color: #0F0F0F;
          line-height: 33px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .compare {
          max-width: 7.375rem;
          height: 29px;
          background: #F0F5FA;
          border-radius: 6.25rem 6.25rem 6.25rem 6.25rem;
          display: flex;
          justify-content: center;
          align-items: center;

          .compare-hui {
            width: 2.625rem;
            height: 20px;
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: .875rem;
            color: #777777;
            line-height: 20px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          .quantity-num {
            width: 1.625rem;
            height: 21px;
            font-family: DINPro, DINPro;
            font-weight: 500;
            font-size: 1rem;
            color: #0F0F0F;
            line-height: 21px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          .quantity-icon {
            // background-color: #fff;
          }
        }
      }
    }
  }

  .toDoCenter {
    margin-right: 1rem !important;
    margin-top: 1rem !important;
  }

  .list {
    --at-apply: border-block-width-1 border-block-solid border-block-stone-2 dark:border-block-stone-7;

    .item {
      --at-apply: flex m-1 items-start gap-3 px-3 py-4 cursor-pointer border-b-width-1 last:border-b-width-0 border-b-solid border-b-stone-2 dark:border-b-stone-7 hover:bg-stone-1 dark:hover:bg-dark/50;

      i {
        --at-apply: w-6 h-6 text-xs rounded-full text-white bg-blue;

        &.service {
          --at-apply: bg-green;
        }

        &.file-edit {
          --at-apply: bg-orange;
        }

        &.bug {
          --at-apply: bg-pink;
        }
      }

      .info {
        .title {
          --at-apply: text-sm line-clamp-2;
        }

        .date {
          --at-apply: mt-1 text-xs text-stone-5;
        }
      }
    }

    .new {
      position: relative;
    }

    .new::after {
      content: '';
      position: absolute;
      width: 0.625rem;
      height: 0.625rem;
      border-radius: 50%;
      background-color: red;
      top: 0;
      right: 0;
    }
  }
}


// :deep {
//   .el-row {
//     display: flex;
//     justify-content: space-between;
//     width: 100%;
//     margin: 1rem 0 !important;

//     .itemBox {
//       margin-right: 1rem;
//     }

//     .itemBox:nth-last-of-type(1) {
//       margin-right: 0;
//     }

//     .el-col {
//       flex: 1;

//       .title {
//         text-align: left;
//       }
//     }

//     .red {
//       color: red;
//     }
//   }

//   // 表格
//   .el-table__body {
//     tr:nth-of-type(1) {
//       td:nth-of-type(1) {
//         color: red !important;
//       }
//     }

//     tr:nth-of-type(2) {
//       td:nth-of-type(1) {
//         color: #bfbdbc !important;
//       }
//     }

//     tr:nth-of-type(3) {
//       td:nth-of-type(1) {
//         color: #a25316 !important;
//       }
//     }
//   }
// }



:deep(.el-card__body) {
  min-height: 25rem;
}
</style>
