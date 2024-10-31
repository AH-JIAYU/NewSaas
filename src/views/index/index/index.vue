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
import risingAndFalling from "./components/risingAndFalling.vue"; // 较昨日
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useNotificationStore from "@/store/modules/notification"; //消息中心
import empty from "@/assets/images/empty.png";
defineOptions({
  name: "homePage",
});
const notificationStore = useNotificationStore(); //消息中心
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const router = useRouter();
const data = ref<any>({
  search: {
    type: "day",
  },
  dataCenterOverViewVO: {}, //总揽响应
  dataCenterTurnoverVO: {}, //	营业额趋势响应
  dataCenterCustomerVOS: [], //客户总揽
  dataCenterSupplierCompletedQuantities: [], //	供应商完成数
  dataCenterSupplierTurnovers: [], //	供应商营业额排名
  // 区域
  countryList: [],
});

let chart1: any;
let chart2: any;
const chart1Ref = ref();
const chart2Ref = ref();
// 营业额趋势
function echarts1() {
  chart1 = echarts.init(chart1Ref.value);
  const xData = () => {
    return data.value.dataCenterTurnoverVO.map((item: any) => {
      const date = new Date(item.timeBucket);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    });
  };
  const option = {
    color: "#366df7",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        // 自定义圆点
        var dotHtml =
          '<span style="display:inline-block;margin-right:.25rem;border-radius:.625rem;width:.625rem;height:.625rem;background-color:#44ca6a;"></span>';
        var dotHtml2 =
          '<span style="display:inline-block;margin-right:.25rem;border-radius:.625rem;width:.625rem;height:.625rem;background-color:#f56a66;"></span>';
        return `
        <div>${params[0].name}<br> ${dotHtml} 营业额: ${params[0].data.turnover} <br>${dotHtml2} 盈利额 ${params[0].data.profitAmount} </div>
          `;
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
        data: xData(),
        axisLabel: {
          interval: 0,
          rotate: 45, // 文字倾斜
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "营业额",
        type: "bar",
        barWidth: "60%",
        data: data.value.dataCenterTurnoverVO,
      },
    ],
  };
  chart1.setOption(option);
}
// 客户总览
function echarts2() {
  const Data = transformData(cloneDeep(data.value.dataCenterCustomerVOS));
  // const totalData = data.value.dataCenterCustomerVOS.map((item: any) => {
  //   return item.projectTotal;
  // });
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
      //弹框
      trigger: "item",
      formatter(data: any) {
        return `客户名称：${data.name} </br>项目结算: ${data.data.datas.com}</br > 审核率: ${data.data.datas.aud} `;
      },
    },
    label: {
      //饼图文字的显示
      show: true, //默认  显示文字
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["30%", "50%"],
        center: "center",
        text: "省市公司",
        data: Data,
        label: {
          show: true,
        },
      },
    ],
    graphic: [
      {
        type: "group",
        left: "center",
        top: "center",
        bounding: "raw",
        children: [
          // {
          //   type: "text",
          //   style: {
          //     text: `合计: `,
          //     fontSize: 14,
          //     textAlign: "center",
          //     textVerticalAlign: "bottom",
          //   },
          // },
          {
            type: "text",
            style: {
              text: Data.length,
              textAlign: "center",
              textVerticalAlign: "middle",
              fontSize: 30,
              fill: "#000", //合计颜色
            },
          },
        ],
      },
    ],
  };
  // 传入数据
  chart2.setOption(option);
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
        aud: item.auditRate?.toString() + "%",
        com: item.projectTotal?.toString(),
      },
    };
  });

  return transformedArray;
}
// 获取数据
async function getList() {
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
// 切换年月日
const typeChange = () => {
  getList();
};
//过滤未读待办
const filterTodoList = computed(() => {
  return notificationStore.todoList.filter(
    (item: any) => item.isReadAlready === 1
  );
});
// 完成数据排行 区域字段
const filterCountry = (row: any) => {
  const findData = data.value.countryList.find(
    (item: any) => item.id === row.countryId
  );
  return findData?.chineseName;
};

// 前往待办
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
  echarts1();
  echarts2();
  window.addEventListener("resize", () => {
    chart1.resize();
    chart2.resize();
  });
  data.value.countryList = await basicDictionaryStore.getCountry();
});
</script>

<template>
  <div>
    <PageMain style="background: transparent">
      <el-row style="margin: 0 0 1rem 0">
        <el-radio-group v-model="data.search.type" @change="typeChange">
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
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame 3474317">
                  <g clip-path="url(#clip0_168_9988)">
                    <rect
                      width="48"
                      height="48"
                      rx="8"
                      fill="#409EFF"
                      fill-opacity="0.15"
                    />
                    <g id="Group 521">
                      <g id="Rectangle 6018" filter="url(#filter0_d_168_9988)">
                        <rect
                          x="7"
                          y="9"
                          width="24.7273"
                          height="28.8485"
                          rx="4"
                          fill="url(#paint0_linear_168_9988)"
                        />
                      </g>
                      <rect
                        id="Rectangle 6019"
                        x="9.0625"
                        y="14.1514"
                        width="20.6061"
                        height="3.09091"
                        rx="1.54545"
                        fill="white"
                      />
                      <rect
                        id="Rectangle 6020"
                        x="9.0625"
                        y="20.3335"
                        width="14.4242"
                        height="3.09091"
                        rx="1.54545"
                        fill="white"
                      />
                      <rect
                        id="Rectangle 6021"
                        x="9.0625"
                        y="26.5151"
                        width="10.303"
                        height="3.09091"
                        rx="1.54545"
                        fill="white"
                      />
                      <g id="Group 520" filter="url(#filter1_b_168_9988)">
                        <g id="Ellipse 52" filter="url(#filter2_b_168_9988)">
                          <circle
                            cx="31.7259"
                            cy="30.6365"
                            r="9.27273"
                            fill="#D0E7FE"
                            fill-opacity="0.3"
                          />
                        </g>
                        <g id="Group">
                          <g id="Group_2">
                            <path
                              id="Vector"
                              d="M31.9043 29.3581L29.0664 26.5156"
                              stroke="#FCFFFE"
                              stroke-width="2"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                            />
                            <path
                              id="Vector_2"
                              d="M34.7403 26.5156L31.9023 29.3581"
                              stroke="#FCFFFE"
                              stroke-width="2"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                            />
                          </g>
                          <path
                            id="Vector_3"
                            d="M28.6367 30.8755H35.1759"
                            stroke="#FCFFFE"
                            stroke-width="2"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                          />
                          <path
                            id="Vector_4"
                            d="M31.9062 29.2388V35.7885"
                            stroke="#FCFFFE"
                            stroke-width="2"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                          />
                          <path
                            id="Vector_5"
                            d="M28.6367 33.332H35.1759"
                            stroke="#FCFFFE"
                            stroke-width="2"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_168_9988"
                    x="-3"
                    y="0"
                    width="44.7266"
                    height="48.8486"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.376471 0 0 0 0 0.686275 0 0 0 0 1 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_168_9988"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_168_9988"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_b_168_9988"
                    x="18.4531"
                    y="17.3638"
                    width="26.5469"
                    height="26.5454"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur_168_9988"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur_168_9988"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter2_b_168_9988"
                    x="18.4531"
                    y="17.3638"
                    width="26.5469"
                    height="26.5454"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur_168_9988"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur_168_9988"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_168_9988"
                    x1="9.06061"
                    y1="10.0303"
                    x2="29.1515"
                    y2="37.8485"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#74B9FF" />
                    <stop offset="0.95" stop-color="#4FA7FE" />
                  </linearGradient>
                  <clipPath id="clip0_168_9988">
                    <rect width="48" height="48" rx="8" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div>
                <!-- 数量 -->
                <p class="quantity-title">发布项目数额</p>
                <div class="quantity-num">
                  {{
                    data.dataCenterOverViewVO?.projectTotal
                      ? data.dataCenterOverViewVO?.projectTotal
                      : 0
                  }}
                </div>
                <!-- 较昨日 -->
                <risingAndFalling
                  :Difference="
                    data.dataCenterOverViewVO?.projectTotalDifference
                  "
                  :type="data.search.type"
                ></risingAndFalling>
              </div>
            </div>
            <div class="itemBox">
              <svg
                width="51"
                height="48"
                viewBox="0 0 51 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 553">
                  <rect
                    id="Rectangle 6017"
                    x="2.75"
                    width="48"
                    height="48"
                    rx="8"
                    fill="#FFEAE7"
                  />
                  <g id="Group 523" filter="url(#filter0_d_168_10015)">
                    <circle
                      id="Ellipse 56"
                      cx="23.75"
                      cy="22"
                      r="13"
                      fill="#FE9788"
                    />
                    <g id="Frame 3474324" filter="url(#filter1_b_168_10015)">
                      <rect
                        x="22.75"
                        y="19"
                        width="15.6"
                        height="15.6"
                        rx="7.8"
                        fill="#F8EAE8"
                        fill-opacity="0.3"
                      />
                      <path
                        id="Vector 1"
                        d="M30.5508 23.2V27.7L33.2508 30.4"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </g>
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_168_10015"
                    x="0.75"
                    y="0"
                    width="47.6016"
                    height="46"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.996078 0 0 0 0 0.592157 0 0 0 0 0.533333 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_168_10015"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_168_10015"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_b_168_10015"
                    x="20.35"
                    y="16.6"
                    width="20.4016"
                    height="20.4"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur
                      in="BackgroundImageFix"
                      stdDeviation="1.2"
                    />
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur_168_10015"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur_168_10015"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <div>
                <!-- 数量 -->
                <p class="quantity-title">待审核项目数额</p>
                <div class="quantity-num">
                  {{
                    data.dataCenterOverViewVO
                      ?.projectSettlementToBeConfirmedTotal
                      ? data.dataCenterOverViewVO
                          ?.projectSettlementToBeConfirmedTotal
                      : 0
                  }}
                </div>

                <!-- 较昨日 -->
                <risingAndFalling
                  :Difference="
                    data.dataCenterOverViewVO
                      ?.projectSettlementToBeConfirmedDifference
                  "
                  :type="data.search.type"
                >
                </risingAndFalling>
              </div>
            </div>
            <div class="itemBox">
              <svg
                width="49"
                height="49"
                viewBox="0 0 49 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 551">
                  <rect
                    id="Rectangle 6017"
                    x="0.5"
                    width="48"
                    height="48"
                    rx="8"
                    fill="#E4FFF2"
                  />
                  <g id="Group 555" filter="url(#filter0_d_168_10033)">
                    <circle
                      id="Ellipse 57"
                      cx="23.5"
                      cy="24"
                      r="13"
                      fill="#7CCDA7"
                    />
                    <g id="Frame 3474325" filter="url(#filter1_b_168_10033)">
                      <rect
                        x="21.5"
                        y="22"
                        width="15.6"
                        height="15.6"
                        rx="7.8"
                        fill="#A8EECD"
                        fill-opacity="0.3"
                      />
                      <g
                        id="Check-small (&#230;&#160;&#161;&#233;&#170;&#140;-&#229;&#176;&#143;)"
                      >
                        <path
                          id="Vector"
                          d="M26.582 30L28.6654 32.0833L32.832 27.9166"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </g>
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_168_10033"
                    x="0.5"
                    y="2"
                    width="46.6016"
                    height="46.6"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.486275 0 0 0 0 0.803922 0 0 0 0 0.654902 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_168_10033"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_168_10033"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_b_168_10033"
                    x="19.1"
                    y="19.6"
                    width="20.4016"
                    height="20.4"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur
                      in="BackgroundImageFix"
                      stdDeviation="1.2"
                    />
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur_168_10033"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur_168_10033"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>

              <div>
                <!-- 数量 -->
                <p class="quantity-title">已审核项目数额</p>
                <div class="quantity-num">
                  {{
                    data.dataCenterOverViewVO?.projectSettlementConfirmedTotal
                      ? data.dataCenterOverViewVO
                          ?.projectSettlementConfirmedTotal
                      : 0
                  }}
                </div>

                <!-- 较昨日 -->
                <risingAndFalling
                  :Difference="
                    data.dataCenterOverViewVO
                      ?.projectSettlementConfirmedDifference
                  "
                  :type="data.search.type"
                >
                </risingAndFalling>
              </div>
            </div>
            <div class="itemBox">
              <svg
                width="49"
                height="48"
                viewBox="0 0 49 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 548">
                  <rect
                    id="Rectangle 6017"
                    x="0.25"
                    width="48"
                    height="48"
                    rx="8"
                    fill="#D0F5FE"
                  />
                  <g id="Group 526">
                    <rect
                      id="Rectangle 6028"
                      x="14.25"
                      y="7"
                      width="14"
                      height="4"
                      rx="1"
                      fill="#56C5E1"
                    />
                    <rect
                      id="Rectangle 6024"
                      x="9.25"
                      y="10"
                      width="24"
                      height="30"
                      rx="3"
                      fill="url(#paint0_linear_168_10051)"
                    />
                    <rect
                      id="Rectangle 6019"
                      x="12.25"
                      y="13"
                      width="18"
                      height="3"
                      rx="1.5"
                      fill="white"
                    />
                    <rect
                      id="Rectangle 6025"
                      x="14.25"
                      y="18"
                      width="14"
                      height="3"
                      rx="1.5"
                      fill="white"
                    />
                    <rect
                      id="Rectangle 6026"
                      x="12.25"
                      y="23"
                      width="18"
                      height="3"
                      rx="1.5"
                      fill="white"
                    />
                    <g id="Group 550">
                      <g id="Ellipse 52" filter="url(#filter0_b_168_10051)">
                        <circle
                          cx="30.25"
                          cy="34"
                          r="8"
                          fill="#B3F0FF"
                          fill-opacity="0.3"
                        />
                      </g>
                      <path
                        id="Union"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M34.5418 30.2929C34.9323 29.9024 35.5655 29.9024 35.956 30.2929C36.3465 30.6834 36.3465 31.3166 35.956 31.7071L30.4557 37.2075C30.3266 37.3365 30.1711 37.4229 30.0066 37.4667C29.673 37.5558 29.3022 37.4695 29.0405 37.2077L25.5429 33.7101C25.1524 33.3196 25.1524 32.6865 25.5429 32.2959C25.9334 31.9054 26.5666 31.9054 26.9571 32.2959L29.7479 35.0868L34.5418 30.2929Z"
                        fill="#FCFFFE"
                      />
                    </g>
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_b_168_10051"
                    x="18.25"
                    y="22"
                    width="24"
                    height="24"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur_168_10051"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_backgroundBlur_168_10051"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_168_10051"
                    x1="10.75"
                    y1="10"
                    x2="30.25"
                    y2="40"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#5BCAE6" />
                    <stop offset="0.945" stop-color="#42AECA" />
                  </linearGradient>
                </defs>
              </svg>

              <div>
                <!-- 数量 -->
                <p class="quantity-title">已完结项目数额</p>
                <div class="quantity-num">
                  {{
                    data.dataCenterOverViewVO?.projectSettlementCompleteTotal
                      ? data.dataCenterOverViewVO
                          ?.projectSettlementCompleteTotal
                      : 0
                  }}
                </div>

                <!-- 较昨日 -->
                <risingAndFalling
                  :Difference="
                    data.dataCenterOverViewVO
                      ?.projectSettlementCompleteDifference
                  "
                  :type="data.search.type"
                >
                </risingAndFalling>
              </div>
            </div>
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
              <div
                id="echarts1"
                ref="chart1Ref"
                style="width: 100%; height: 15.625rem"
              />
            </div>
            <div class="customerOverview itemBox">
              <div class="itemBoxTitle">
                <div>
                  <span class="blue"> </span>
                  客户总览
                </div>
                <el-button type="info" link @click="router.push('/datacenter')">
                  全部
                  <SvgIcon name="i-ant-design:right-outlined" class="icon" />
                </el-button>
              </div>
              <div
                id="echarts2"
                ref="chart2Ref"
                style="width: 100%; height: 15.625rem"
              />
            </div>
          </div>

          <!-- 完成数据排名 & 供应商营业额排行 -->
          <div class="row table">
            <div class="completionRanking itemBox">
              <div class="itemBoxTitle">
                <div>
                  <span class="blue"> </span>
                  完成数据排名
                </div>
              </div>
              <el-table
                :data="data.dataCenterSupplierCompletedQuantities"
                style="width: 100%;margin-top: 1rem"
              >
                <el-table-column type="index" label="序号" width="55" align="center">
                  <template #default="{ $index }">
                    <div class="center-image">
                    <img
                      v-if="$index ==0"
                      src="../../../assets/images/num1.png"
                      alt=""

                    />
                    <img
                    v-else-if="$index ==1"
                      src="../../../assets/images/num2.png"
                      alt=""

                    />
                    <img
                    v-else-if="$index ==2"
                      src="../../../assets/images/num3.png"
                      alt=""

                    />
                    <span v-else  class="number-font">{{ $index + 1 }}</span>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  align="left"
                  prop="supplierName"
                  label="供应商名称"
                  ><template #default="{ row }">
                    {{ row.supplierName ? row.supplierName : "-" }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="left"
                  prop="completedQuantity"
                  width="80"
                  label="完成数量"
                >
                  <template #default="{ row }">
                    <span class="table-green number-font">
                      {{
                        row.completedQuantity ? row.completedQuantity : "0"
                      }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  align="left"
                  prop="completedAmount"
                  width="85"
                  label="完成金额"
                  ><template #default="{ row }">
                    <span class="table-red">
                      <CurrencyType />    <span class="number-font">{{
                        row.completedAmount ? row.completedAmount : "0"
                      }}</span>
                    </span>
                  </template>
                </el-table-column>

                <el-table-column align="left" prop="b2BProportion" width="70" label="B2B">
                  <template #default="{ row }">
                    <span class="number-font">{{ row.b2BProportion * 100 }}</span>%
                  </template>
                </el-table-column>
                <el-table-column align="left" prop="b2CProportion" width="70" label="B2C">
                  <template #default="{ row }">
                    <span class="number-font">{{ row.b2CProportion * 100 }}</span>%
                  </template>
                </el-table-column>
                <el-table-column width="80" align="left" label="所属区域">
                  <template #default="{ row }">
                    <span v-if="String(row) !== '{}'">{{
                      filterCountry(row)
                    }}</span>
                  </template>
                </el-table-column>
                <template #empty>
                  <el-empty :image="empty" :image-size="200" />
                </template>
              </el-table>
            </div>
            <div class="supplierRevenueRanking itemBox">
              <div class="itemBoxTitle">
                <div>
                  <span class="blue"> </span>
                  供应商营业额排行
                </div>
              </div>
              <el-table
                :data="data.dataCenterSupplierTurnovers"
                style="width: 100%;margin-top: 1rem"
              >
                <el-table-column type="index" label="序号" width="60" align="center">
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
                    <span v-else class="number-font">{{ $index + 1 }}</span>
                    </div>

                  </template>
                </el-table-column>
                <el-table-column align="left" prop="name" width="220" label="供应商名称"
                  ><template #default="{ row }">
                    {{ row.name ? row.name : "-" }}
                  </template>
                </el-table-column>
                <el-table-column
                  sortable
                  align="left"
                  prop="dayTurnover"
                  label="日"
                >
                  <template #default="{ row }">
                    <span class="number-font">{{ row.dayTurnover ? row.dayTurnover : 0 }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  sortable
                  align="left"
                  prop="monthTurnover"
                  label="月"
                >
                  <template #default="{ row }">
                    <span class="number-font">{{
                      row.monthTurnover ? row.monthTurnover : 0
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  sortable
                  align="left"
                  prop="yearTurnover"
                  label="年"
                >
                  <template #default="{ row }">
                    <span class="number-font">{{
                      row.yearTurnover ? row.yearTurnover : 0
                    }}</span>
                  </template>
                </el-table-column>
                <template #empty>
                  <el-empty :image="empty" :image-size="200" />
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
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Frame 3474500">
                    <rect width="44" height="44" fill="white" />
                    <g id="Group 563">
                      <rect
                        id="Rectangle 6070"
                        x="7"
                        y="5"
                        width="26.5747"
                        height="32.1111"
                        rx="4"
                        fill="#E74E4E"
                      />
                      <g id="Group 560">
                        <g
                          id="Rectangle 6071"
                          filter="url(#filter0_b_168_9907)"
                        >
                          <rect
                            x="10.7773"
                            y="6.88892"
                            width="26.5747"
                            height="32.1111"
                            rx="4"
                            fill="#FFE5E5"
                            fill-opacity="0.3"
                          />
                        </g>
                        <path
                          id="Vector"
                          d="M23.9996 14.4443C19.3063 14.4443 15.5009 18.2498 15.5 22.9439C15.5 27.6397 19.3054 31.4443 23.9996 31.4443C28.6945 31.4443 32.5 27.6389 32.5 22.9439C32.5 18.2498 28.6954 14.4443 23.9996 14.4443ZM27.7586 22.8332C27.7873 22.9692 27.8017 23.1238 27.8017 23.2978C27.8017 23.5107 27.7873 23.6898 27.7586 23.8351H24.9736V25.1123H27.7586C27.7873 25.2475 27.8017 25.4021 27.8017 25.5761C27.8017 25.7898 27.7873 25.968 27.7586 26.1133H24.9736V28.3907C24.8561 28.4093 24.7362 28.4245 24.6103 28.4346C24.4845 28.4447 24.3578 28.4498 24.2328 28.4498C24.1069 28.4498 23.9819 28.4448 23.856 28.4346C23.731 28.4245 23.6094 28.4101 23.4928 28.3907V26.1133H20.8235C20.7846 25.9967 20.7652 25.8329 20.7652 25.62C20.7652 25.5321 20.7703 25.446 20.7796 25.3581C20.7897 25.2711 20.804 25.1892 20.8235 25.1123H23.4928V23.8351H20.8235C20.7846 23.7185 20.7652 23.5546 20.7652 23.3418C20.7652 23.2547 20.7703 23.1677 20.7796 23.0799C20.7897 22.9929 20.8041 22.9109 20.8235 22.8332H22.9125L20.2432 18.1332C20.3691 18.1138 20.5068 18.0994 20.6563 18.0901C20.8075 18.08 20.9502 18.0749 21.0854 18.0749C21.2206 18.0749 21.3608 18.08 21.5061 18.0893C21.6514 18.0986 21.7814 18.1129 21.898 18.1324L24.2768 22.5139L26.6133 18.1324C26.7383 18.1129 26.8667 18.0986 26.9976 18.0893C27.1268 18.08 27.2611 18.0749 27.3963 18.0749C27.5315 18.0749 27.6666 18.08 27.8018 18.0893C27.9377 18.0985 28.0636 18.1129 28.1793 18.1324L25.5539 22.8324H27.7587L27.7586 22.8332Z"
                          fill="white"
                        />
                      </g>
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_b_168_9907"
                      x="0.777344"
                      y="-3.11108"
                      width="46.5742"
                      height="52.1111"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="5"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_168_9907"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_168_9907"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>

                <div>
                  <!-- 数量 -->
                  <p class="quantity-title">项目营业额</p>
                  <div class="quantity-num">
                    {{
                      data.dataCenterOverViewVO?.projectTurnover
                        ? data.dataCenterOverViewVO?.projectTurnover
                        : 0
                    }}
                  </div>
                </div>
              </div>
              <div class="itemBox">
                <svg
                  width="45"
                  height="44"
                  viewBox="0 0 45 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Frame 3474500">
                    <rect
                      width="44"
                      height="44"
                      transform="translate(0.5)"
                      fill="white"
                    />
                    <g id="Group 561">
                      <rect
                        id="Rectangle 6070"
                        x="7.5"
                        y="5"
                        width="26.5747"
                        height="32.1111"
                        rx="4"
                        fill="#FEC776"
                      />
                      <g id="Group 560">
                        <g
                          id="Rectangle 6071"
                          filter="url(#filter0_b_168_9917)"
                        >
                          <rect
                            x="11.2773"
                            y="6.88892"
                            width="26.5747"
                            height="32.1111"
                            rx="4"
                            fill="#FEEACB"
                            fill-opacity="0.3"
                          />
                        </g>
                        <g id="Frame" clip-path="url(#clip0_168_9917)">
                          <path
                            id="Vector"
                            d="M26.7934 28.1671C26.7934 26.3164 28.297 24.8166 30.1525 24.8166C30.9015 24.8166 31.5921 25.0606 32.151 25.4736V17.7495C32.151 16.7321 31.3249 15.9081 30.3049 15.9081H19.8305C18.8105 15.9081 17.9844 16.7321 17.9844 17.7495V29.65C17.9844 30.6674 18.8105 31.4914 19.8305 31.4914H29.7159C28.0674 31.2756 26.7934 29.8696 26.7934 28.1671ZM24.904 21.7607L22.8603 24.4825C22.7812 24.5895 22.6665 24.6458 22.5498 24.6458C22.4896 24.6458 22.4275 24.6289 22.371 24.597L20.1956 23.3806C19.9923 23.268 19.9095 22.9865 20.0074 22.7556C20.1071 22.5228 20.3499 22.4271 20.5531 22.5416L22.4463 23.6003L24.4787 20.8917C24.5935 20.7378 24.7835 20.6871 24.9454 20.764L26.8385 21.6744L27.6346 20.9273L27.3711 20.6251C27.277 20.5181 27.2394 20.3642 27.2676 20.2178C27.2958 20.0714 27.388 19.9513 27.5104 19.8987L29.11 19.2323C29.2511 19.1742 29.4092 19.2136 29.5146 19.3356C29.6199 19.4576 29.6557 19.6378 29.6049 19.7992L29.0215 21.6294C28.9763 21.7701 28.871 21.8752 28.743 21.909C28.7148 21.9147 28.6865 21.9165 28.6583 21.9165C28.5567 21.9165 28.4588 21.8715 28.3873 21.787L28.2161 21.5918L27.1679 22.5773C27.0512 22.6861 26.8912 22.7143 26.7501 22.6467L24.904 21.7607Z"
                            fill="white"
                          />
                          <path
                            id="Vector_2"
                            d="M30.0247 25.1163C28.4593 25.1163 27.1914 26.3843 27.1914 27.9497C27.1914 29.5151 28.4593 30.783 30.0247 30.783C31.5901 30.783 32.8581 29.5151 32.8581 27.9497C32.8581 26.3843 31.5883 25.1163 30.0247 25.1163ZM30.8279 27.8307V28.104H30.1976V28.4832H30.8223V28.7621H30.1921V29.3124H29.8518V28.7621H29.2049V28.4832H29.8518V28.1021H29.2049V27.8288H29.7552L29.0859 26.5851H29.4782L29.9429 27.5555C29.9708 27.6057 30.0006 27.6745 30.034 27.76H30.0396C30.0619 27.6912 30.0898 27.6187 30.1307 27.5444L30.6029 26.5851H30.9655L30.2962 27.8288H30.8279V27.8307Z"
                            fill="white"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_b_168_9917"
                      x="1.27734"
                      y="-3.11108"
                      width="46.5742"
                      height="52.1111"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="5"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_168_9917"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_168_9917"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="clip0_168_9917">
                      <rect
                        width="17"
                        height="17"
                        fill="white"
                        transform="translate(16.5664 15.1997)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <div>
                  <!-- 数量 -->
                  <p class="quantity-title">项目盈利额</p>
                  <div class="quantity-num">
                    {{
                      data.dataCenterOverViewVO?.projectProfitability
                        ? data.dataCenterOverViewVO?.projectProfitability
                        : 0
                    }}
                  </div>
                </div>
              </div>
              <div class="itemBox">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Frame 3474500">
                    <rect width="44" height="44" fill="white" />
                    <g id="Group 564">
                      <rect
                        id="Rectangle 6070"
                        x="7"
                        y="5"
                        width="26.5747"
                        height="32.1111"
                        rx="4"
                        fill="#27DDC7"
                      />
                      <g id="Group 560">
                        <g
                          id="Rectangle 6071"
                          filter="url(#filter0_b_168_9929)"
                        >
                          <rect
                            x="10.7773"
                            y="6.88892"
                            width="26.5747"
                            height="32.1111"
                            rx="4"
                            fill="#ECFFFC"
                            fill-opacity="0.3"
                          />
                        </g>
                        <g id="Frame" clip-path="url(#clip0_168_9929)">
                          <path
                            id="Vector"
                            d="M24.6055 13.4999C26.9198 13.4999 28.1626 13.7967 28.2483 13.7967C28.5483 13.8395 28.7626 14.0934 28.7626 14.3892C28.7626 14.7288 28.5912 14.9827 28.3341 15.2367C27.9483 15.6181 27.2626 15.8302 27.2626 16.8888C27.2626 17.4824 29.1483 18.3288 29.8769 19.2609C30.9912 20.7867 32.1055 22.6927 32.1055 25.2342C32.1055 27.0985 31.3341 28.7506 29.8769 29.6399C28.5483 30.4445 26.6626 30.8688 24.6055 30.8688C22.5483 30.8688 20.7055 30.4027 19.3341 29.6399C17.834 28.7935 17.1055 27.1392 17.1055 25.2342C17.1055 22.6927 18.1769 20.7867 19.2912 19.2192C20.0198 18.287 21.9483 17.4395 21.9483 16.846C21.9483 16.1174 21.6248 15.811 21.2958 15.5517L21.1191 15.4124C21.0327 15.3464 20.9517 15.2737 20.8769 15.1949C20.6198 14.9827 20.4483 14.6859 20.4483 14.3474C20.4483 14.0934 20.6626 13.8384 20.9626 13.7967C21.0483 13.7967 22.2912 13.4999 24.6055 13.4999ZM23.3626 19.9595C23.2823 19.9038 23.1773 19.9231 23.0476 20.0174L22.8258 20.1963C22.7078 20.2927 22.5893 20.3885 22.4701 20.4835C22.2179 20.6849 21.9686 20.8899 21.7223 21.0985C21.6366 21.1713 21.5594 21.2431 21.4919 21.3149C21.4244 21.3867 21.3912 21.4563 21.3912 21.5227C21.3912 21.6009 21.4212 21.6652 21.4801 21.7188C21.5391 21.7713 21.6087 21.8302 21.6901 21.8977L22.094 22.2138C22.3372 22.3963 22.5811 22.5778 22.8258 22.7581C22.9201 22.8277 22.9887 22.8759 23.0316 22.9038C23.1933 23.0034 23.3101 23.0313 23.383 22.9874C23.4559 22.9424 23.4923 22.8727 23.4923 22.7785V22.1217H24.778C24.7887 22.1217 24.7951 22.1206 24.7973 22.1174L24.8048 22.1142H24.8176C25.1956 22.1488 25.5568 22.2866 25.8618 22.5126C26.1668 22.7386 26.4038 23.044 26.5469 23.3956C26.6444 23.627 26.6926 23.8777 26.6926 24.1434C26.6926 24.4263 26.6391 24.6899 26.5319 24.9374C26.4237 25.1838 26.2748 25.3981 26.0873 25.5824C25.8987 25.7645 25.6769 25.9102 25.4241 26.0184C25.1687 26.1272 24.8938 26.1827 24.6162 26.1813L23.3626 26.1727C23.2718 26.1726 23.1817 26.1893 23.0969 26.222C23.012 26.2544 22.9325 26.2996 22.8612 26.3559C22.7921 26.4105 22.7345 26.4782 22.6919 26.5552C22.6488 26.6284 22.6265 26.712 22.6272 26.7969C22.628 26.8818 22.6518 26.965 22.6962 27.0374C22.7889 27.1963 22.9351 27.317 23.1087 27.3781C23.1953 27.4111 23.2871 27.4282 23.3798 27.4284H24.7769C24.8257 27.4289 24.8743 27.4231 24.9215 27.4113C25.3368 27.3757 25.7414 27.2615 26.1141 27.0749C26.8407 26.7178 27.4114 26.1067 27.718 25.3574C27.8744 24.9802 27.9526 24.5785 27.9526 24.1509C27.9526 23.7299 27.8755 23.3302 27.7223 22.9531C27.5728 22.5828 27.3563 22.2431 27.0837 21.9513C26.5202 21.3559 25.7617 20.9825 24.9462 20.8992C24.9177 20.8932 24.8891 20.8875 24.8605 20.882C24.8329 20.877 24.8049 20.8745 24.7769 20.8745H23.4912V20.2092C23.4916 20.1602 23.4801 20.112 23.4577 20.0685C23.4353 20.025 23.4027 19.9876 23.3626 19.9595Z"
                            fill="white"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_b_168_9929"
                      x="0.777344"
                      y="-3.11108"
                      width="46.5742"
                      height="52.1111"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="5"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_168_9929"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_168_9929"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="clip0_168_9929">
                      <rect
                        width="18.2143"
                        height="18.2143"
                        fill="white"
                        transform="translate(15.5 13.4999)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <div>
                  <!-- 数量 -->
                  <p class="quantity-title">项目退款额</p>
                  <div class="quantity-num">
                    {{
                      data.dataCenterOverViewVO?.projectRefundAmount
                        ? data.dataCenterOverViewVO?.projectRefundAmount
                        : 0
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="toDoCenter itemBox">
            <div class="itemBoxTitle">
              待办中心
              <el-button
                type="info"
                link
                @click="router.push('/personal/notification?type=2')"
              >
                <SvgIcon name="i-ant-design:right-outlined" class="icon" />
              </el-button>
            </div>
            <OverlayScrollbarsComponent
              :options="{
                scrollbars: { autoHide: 'leave', autoHideDelay: 300 },
              }"
              defer
              class="list"
            >
              <template v-if="filterTodoList.length">
                <div
                  class="item"
                  v-for="item in filterTodoList"
                  @click="cooperation(item)"
                >
                  <div class="item-left">
                    <div
                      :class="item.isReadAlready === 1 ? 'new read' : 'read'"
                    ></div>
                    <div class="info">
                      <div class="title">
                        {{
                          notificationStore.auditTypeList[item.auditType - 1] ||
                          ""
                        }}
                        &emsp;
                        {{ item.messageContent }}
                      </div>
                    </div>
                  </div>
                  <el-button type="info" link>
                    <SvgIcon name="i-ant-design:right-outlined" />
                  </el-button>
                </div>
              </template>
              <template v-else>
                <el-empty :image="empty" :image-size="200" />
                <!-- <div class="flex flex-col items-center py-6 text-stone-5">
                  <SvgIcon name="i-tabler:mood-smile" :size="40" />
                  <p m-2 text-base>没有待办</p>
                </div> -->
              </template>
            </OverlayScrollbarsComponent>
          </div>
        </div>
      </div>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
/* 自定义数字字体样式 */
.number-font {
  font-family: D-DIN Exp; /* 选择字体 */
}
  .center-image {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%; /* 单元格宽度 */
  height: 100%; /* 单元格高度 */
  }
// 去除表格色块 线
:deep {

  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
  }

  .el-table--fit .el-table__inner-wrapper:before {
    width: 0;
  }

  // .el-table__header th {
  //   background: var(--g-header-bg) !important;
  // }
}

.itemBox {
  background: #FFFFFF;
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
}

.itemBoxTitle {
  height: 1.5625rem;
  font-family: PingFang SC, PingFang SC;
  font-weight: 600;
  font-size: 1.125rem;
  color: #333333;
  line-height: 1.5625rem;
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
    width: 1.25rem;
    height: 1.5625rem;
  }

  .blue::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: .625rem;
    height: .625rem;
    background: #409EFF;
    border-radius: 50%;
    margin-right: 1.25rem;
  }

  .hui {
    color: #7f7f7f;
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
      padding: 1.5rem;

      >svg {
        margin-right: .5rem
      }

      >div {
        flex: 1;

        .quantity-title {
          min-height: 1.25rem;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: .875rem;
          color: #333333;
          line-height: 1rem;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .quantity-num {
          // width: 14.5625rem;
          height: 3.125rem;
          line-height: 3.125rem;
          font-family: D-DIN Exp;
          font-weight: 500;
          font-size: 1.75rem;
          color: #333333;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .compare {
          max-width: 7.375rem;
          height: 1.8125rem;
          background: #F0F5FA;
          border-radius: 6.25rem 6.25rem 6.25rem 6.25rem;
          display: flex;
          justify-content: center;
          align-items: center;

          .compare-hui {
            width: 2.625rem;
            height: 1.25rem;
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: .875rem;
            color: #333333;
            line-height: 1.25rem;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          .quantity-num {
            width: 2rem;
            height: 3.125rem;
            line-height: 3.125rem;
            font-family: D-DIN Exp;
            font-weight: 500;
            font-size: 1rem;
            color: #333333;
            text-align: left;
            font-style: normal;
            text-transform: none;
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
    // height: 20.4375rem;

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
      height: 5.75rem;
      padding: 1rem 0;

      >svg {
        margin-right: .5rem
      }

      >div {
        flex: 1;

        .quantity-title {
          min-height: 1.25rem;
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: .875rem;
          color: #333333;
          line-height: 1rem;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .quantity-num {
          height: 3.125rem;
          line-height: 3.125rem;
          font-family: D-DIN Exp;
          font-weight: 500;
          font-size: 1.75rem;
          color: #333333;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .compare {
          max-width: 7.375rem;
          height: 1.8125rem;
          background: #F0F5FA;
          border-radius: 6.25rem 6.25rem 6.25rem 6.25rem;
          display: flex;
          justify-content: center;
          align-items: center;

          .compare-hui {
            width: 2.625rem;
            height: 1.25rem;
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: .875rem;
            color: #333333;
            line-height: 1.25rem;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          .quantity-num {
            width: 1.625rem;
            height: 1.3125rem;
            font-family: D-DIN Exp;
            font-weight: 500;
            font-size: .875rem;
            color: #333333;
            line-height: 1.25rem;
            text-align: left;
            font-style: normal;
            text-transform: none;

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
      --at-apply: flex m-1 items-start gap-3 px-3 py-4 cursor-pointe;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFF8F8;
      margin-bottom: .75rem;
      font-size: .75rem;
      font-family: PingFang SC, PingFang SC;
      padding: .625rem 1rem;

      .item-left {
        display: flex;
        justify-content: start;
        align-items: center;
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
      border-radius: 50%;
      background-color: red;
      margin: 0 .3125rem;
    }

    .read {
      width: .375rem;
      height: .375rem;
      margin: 0 .3125rem;
    }
  }
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

  th .cell {
    color: #202020 !important;
  }

  .el-table {
    // height: calc(20.4375rem - 2rem - 1.5625rem - 0.5rem)
    height: 300px
  }

  // 表格

}

.table-red {
  color: red;
}

.table-green {
  color: green;
}


:deep(.el-card__body) {
  min-height: 25rem;
}

:deep(.el-table__empty-text) {
  line-height: 100%;
}
</style>
