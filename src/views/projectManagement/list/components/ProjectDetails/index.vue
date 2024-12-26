<script setup lang="ts">
import { CircleCheck, Position, Select } from "@element-plus/icons-vue";
// 配置富文本
import { Editor, Viewer } from "@bytemd/vue-next";
// 富文本编辑器配置
import gfm from "@bytemd/plugin-gfm";
import zhHans from "bytemd/locales/zh_Hans.json";
import fileApi from "@/api/modules/file";
import gfmLocale from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import "bytemd/dist/index.css";
import { obtainLoading } from "@/utils/apiLoading";
import api from "@/api/modules/projectManagement";
import logDetails from "../LogDetails/index.vue";
import DownLoad from "@/utils/download";
import { ElMessage } from "element-plus";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useUserCustomerStore from "@/store/modules/user_customer";
import asteriskImage from "@/assets/images/asterisk.png";
import * as echarts from "echarts";
defineOptions({
  name: "ProjectDetails",
});
// 客户
const customerStore = useUserCustomerStore();
// 客户列表
const customerList = ref<any>([]);
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const content = ref("# Fantastic-admin");
const logDetailsRef = ref();
const active = ref(1);
const data = ref<any>({
  form: {}, // 表格
  // 配置信息 区域和问卷
  // initialProblem: {
  //   countryId: "", // 区域
  //   projectQuotaQuestionType: "", // 问题类型
  // },
  imgUrl: [], // 图片预览
  isOnline: "", //	项目状态:1:在线 2:不在线
  allocationStatus: "", //分配状态:1:未分配 2:已分配
  projectType: 1, //项目类型 1:内部新增 2:合作商分配   为合作商时需要隐藏客户、前置、操作日志
  srcList: [], // 图片预览
  countryList: [], // 区域
});
const imgList = ref<any>();
const plugins = [
  gfm({
    locale: gfmLocale,
  }),
];
function handleChange(v: string) {
  content.value = v;
}
const operationTypeList: any = ["新增", "编辑", "分配", "调度"];
// 详情
function details(row: any) {
  logDetailsRef.value.showEdit(row);
}
// 弹框开关变量
const dialogTableVisible = ref(false);
// 显隐
async function showEdit(row: any, projectType: any) {
  data.value.projectType = projectType; // 项目类型
  data.value.isOnline = row.isOnline;
  data.value.allocationStatus = row.allocationStatus;
  const res = await obtainLoading(api.detail({ projectId: row.projectId }));
  data.value.form = res.data;
  active.value =
    res.data.projectSettlementStatusSet.length > 0
      ? res.data.projectSettlementStatusSet[0].settlementStatus
      : 0;
  data.value.form.projectSettlementStatusSet =
    data.value.form.projectSettlementStatusSet
      .reduce((accumulator: any, currentValue: any) => {
        let existing = accumulator.find(
          (obj: any) => obj.settlementStatus === currentValue.settlementStatus
        );
        if (!existing) {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, [])
      .sort((a: any, b: any) => a.settlementStatus - b.settlementStatus);
  imgList.value = data.value.form.descriptionUrl.split(",");
  if (imgList.value.length) {
    imgList.value.forEach(async (item: any) => {
      if (item) {
        const imgres: any = await fileApi.detail({
          fileName: item,
        });
        data.value.imgUrl.push(imgres.data.fileUrl);
        data.value.srcList.push(imgres.data.fileUrl);
      }
    });
  }
  getCountryQuestion();
  dialogTableVisible.value = true;
  // nextTick(() => {
  //   echarts1();
  //   echarts2();
  // });

  // window.addEventListener("resize", () => {
  //   chart1.resize();
  //   chart2.resize();
  // });
}

// 回显区域和问卷
const getCountryQuestion = async () => {
  if (data.value.form.projectQuotaInfoList.length) {
    // 获取区域
    const resCountry = await api.getProjectCountryList({
      countryIdList: data.value.form.countryIdList,
    });
    // 获取问卷
    const params = {
      countryId: data.value.form.projectQuotaInfoList[0].countryId, // 区域
      projectQuotaQuestionType:
        data.value.form.projectQuotaInfoList[0].projectQuotaQuestionType, // 问题类型
    };
    const resQuestionnaire = await api.getProjectCategoryList(params);
    // 查找区域
    const countryData = findData(
      resCountry.data.getProjectCountryListInfoList,
      "countryId",
      params.countryId
    );
    // 查找问卷
    const questionnaireData = findData(
      resQuestionnaire.data.getProjectCategoryInfoList,
      "projectProblemCategoryId",
      data.value.form.projectQuotaInfoList[0].projectProblemCategoryId
    );
    data.value.form.countryName = countryData.countryName;
    data.value.form.projectProblemCategoryName =
      questionnaireData.projectProblemCategoryName;
  }
};
const findData = (arr: any, keyName: any, id: any) => {
  return arr.find((item: any) => item[keyName] === id);
};
// 回显区域
const comCountryId = computed(() => (countryIdList: any) => {
  const list = data.value.countryList
    .filter((item: any) => countryIdList.includes(item.id))
    .map((item: any) => item.chineseName);
  return list;
});
// 复制
async function copyTextToClipboard(text: any) {
  try {
    await navigator.clipboard.writeText(text);
    ElMessage.success({
      message: "已复制文本",
      center: true,
    });
  } catch (err) {
    ElMessage.warning({
      message: "复制失败,请重试",
      center: true,
    });
  }
}
// 下载
async function download(item: any, index: any) {
  await DownLoad(data.value.imgUrl[index], item);
}
// 弹框关闭事件
function closeHandler() {
  data.value.srcList = [];
  dialogTableVisible.value = false;
}
// 根据id查找客户
const getcustsmer = computed(() => {
  return customerList.value.find(
    (item: any) => item.tenantCustomerId === data.value.form.clientId
  );
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
      left: "10%",
      text: "",
      radius: ["40%", "60%"],
      center: ["50%", "50%"],
      subtext: "",
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "90%", // 饼图半径

        // 数据内容
        data: [
          { value: 10, name: "Android", itemStyle: { color: "#6FD195 " } },
          { value: 15, name: "Linux", itemStyle: { color: "#8979FF" } },
          { value: 25, name: "Windows", itemStyle: { color: "#FF928A" } },
          { value: 25, name: "Max OS", itemStyle: { color: "#3CC3DF" } },
          { value: 15, name: "其他", itemStyle: { color: "#FFAE4C" } },
          { value: 10, name: "IOS", itemStyle: { color: "#537FF1" } },
        ],

        // 饼图的标签配置
        label: {
          normal: {
            show: true, // 显示标签
            position: "inner", // 标签显示在模块内部
            formatter: "{b}\n{d}%", // 标签格式：显示模块名称和百分比
            textStyle: {
              color: "#ffffff", // 设置字体颜色为白色
              fontSize: 14, // 设置字体大小
            },
          },
        },

        // 饼图的标签外接线配置（如果需要）
        labelLine: {
          normal: {
            show: false, // 不显示外接线
          },
        },
      },
    ],
  };
  chart1.setOption(option);
}
// 客户总览
function echarts2() {
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
      center: ["50%", "50%"],
      subtext: "",
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "90%", // 饼图半径

        // 数据内容
        data: [
          { value: 10, name: "Android", itemStyle: { color: "#6FD195 " } },
          { value: 15, name: "Linux", itemStyle: { color: "#8979FF" } },
          { value: 25, name: "Windows", itemStyle: { color: "#FF928A" } },
          { value: 25, name: "Max OS", itemStyle: { color: "#3CC3DF" } },
          { value: 15, name: "其他", itemStyle: { color: "#FFAE4C" } },
          { value: 10, name: "IOS", itemStyle: { color: "#537FF1" } },
        ],

        // 饼图的标签配置
        label: {
          normal: {
            show: true, // 显示标签
            position: "inner", // 标签显示在模块内部
            formatter: "{b}\n{d}%", // 标签格式：显示模块名称和百分比
            textStyle: {
              color: "#ffffff", // 设置字体颜色为白色
              fontSize: 14, // 设置字体大小
            },
          },
        },

        // 饼图的标签外接线配置（如果需要）
        labelLine: {
          normal: {
            show: false, // 不显示外接线
          },
        },
      },
    ],
  };
  // 传入数据
  chart2.setOption(option);
}
onMounted(async () => {
  data.value.countryList = await basicDictionaryStore.getCountry();
  customerList.value = await customerStore.getCustomerList();
});
const tableData = [
  {
    a1: "Linux",
    a2: "1000",
    a3: "1000",
    a4: "1000",
    a5: "1000",
  },
  {
    a1: "Windows",
    a2: "1000",
    a3: "1000",
    a4: "1000",
    a5: "1000",
  },
  {
    a1: "Max OS",
    a2: "1000",
    a3: "1000",
    a4: "1000",
    a5: "1000",
  },
  {
    a1: "其他",
    a2: "1000",
    a3: "1000",
    a4: "1000",
    a5: "1000",
  },
  {
    a1: "IOS",
    a2: "1000",
    a3: "1000",
    a4: "1000",
    a5: "1000",
  },
  {
    a1: "Android",
    a2: "1000",
    a3: "1000",
    a4: "1000",
    a5: "1000",
  },
];

// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      @close="closeHandler"
      size="55%"
      title="项目详情"
    >
      <template
        v-if="
          data.form.projectSettlementStatusSet &&
          data.form.projectSettlementStatusSet.length !== 0
        "
        #header
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <el-steps
              style="max-width: 100%"
              finish-status="success"
              align-center
              :active="active"
            >
              <el-step
                title="待审核"
                :description="
                  active >= 1
                    ? data.form?.projectSettlementStatusSet[0]?.pendReviewTime
                    : '-'
                "
                :icon="active >= 1 ? CircleCheck : Position"
              />
              <el-step
                title="已审核"
                :description="
                  active >= 2
                    ? data.form?.projectSettlementStatusSet[0]?.reviewTime
                    : '-'
                "
                :icon="active >= 2 ? CircleCheck : Position"
              />
              <el-step
                title="已开票"
                :description="
                  active >= 3
                    ? data.form?.projectSettlementStatusSet[0]?.invoicedOutTime
                    : '-'
                "
                :icon="active >= 3 ? CircleCheck : Position"
              />
              <el-step
                title="已结算"
                :description="
                  active >= 4
                    ? data.form?.projectSettlementStatusSet[0]?.settledTime
                    : '-'
                "
                :icon="active >= 4 ? CircleCheck : Position"
              />
              <el-step
                title="已冻结"
                :description="
                  active >= 5
                    ? data.form?.projectSettlementStatusSet[0]?.frozenTime
                    : '-'
                "
                :icon="active >= 5 ? CircleCheck : Position"
              />
            </el-steps>
          </el-col>
          <el-row
            style="width: 100%; margin-top: 0; font-size: 14px"
            :gutter="20"
          >
            <el-col :span="1"></el-col>
            <el-col
              :class="{
                colorgreen: active >= 1,
              }"
              :span="5"
            >
              <span style="margin-left: 25.5%">{{
                active >= 1
                  ? data.form?.projectSettlementStatusSet[0]?.operationName
                  : ""
              }}</span>
            </el-col>
            <el-col
              :class="{
                colorgreen: active >= 2,
              }"
              :span="5"
            >
              <span style="margin-left: 19.5%">
                {{
                  active >= 2
                    ? data.form?.projectSettlementStatusSet[0]?.operationName
                    : ""
                }}
              </span>
            </el-col>
            <el-col
              :class="{
                colorgreen: active >= 3,
              }"
              :span="5"
            >
              <span style="margin-left: 12.5%">
                {{
                  active >= 3
                    ? data.form?.projectSettlementStatusSet[0]?.operationName
                    : ""
                }}
              </span>
            </el-col>
            <el-col
              :class="{
                colorgreen: active >= 4,
              }"
              :span="4"
            >
              <span style="margin-left: 8.5%">
                {{
                  active >= 4
                    ? data.form?.projectSettlementStatusSet[0]?.operationName
                    : ""
                }}
              </span>
            </el-col>
            <el-col
              :class="{
                colorgreen: active >= 5,
              }"
              :span="4"
            >
              <span style="margin-left: 28.5%">
                {{
                  active >= 5
                    ? data.form?.projectSettlementStatusSet[0]?.operationName
                    : ""
                }}
              </span>
            </el-col>
          </el-row>
        </el-row>
      </template>

      <!-- <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle font-s18">操作系统</div>
          </div>
        </template>
        <div class="system-content">
          <div>
            <div
              id="echarts1"
              ref="chart1Ref"
              style="width: 100%; height: 18.625rem"
            />
            <el-radio-group size="medium">
              <el-radio-button label="参与"></el-radio-button>
              <el-radio-button label="完成"></el-radio-button>
              <el-radio-button label="审核成功"></el-radio-button>
              <el-radio-button label="审核失败"></el-radio-button>
            </el-radio-group>
          </div>
          <div>
            <el-table
              border
              highlight-current-row
              height="100%"
              :data="tableData"
              width="100%"
            >
              <el-table-column
                prop="a1"
                align="center"
                width="120"
                label="操作系统"
              >
                <template #default="{ row }">
                  <span
                    style="
                      background: #6fd195;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == 'Android'"
                    >{{ row.a1 }}</span
                  >
                  <span
                    style="
                      background: #8979ff;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == 'Linux'"
                    >{{ row.a1 }}</span
                  >
                  <span
                    style="
                      background: #ff928a;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == 'Windows'"
                    >{{ row.a1 }}</span
                  >
                  <span
                    style="
                      background: #3cc3df;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == 'Max OS'"
                    >{{ row.a1 }}</span
                  >
                  <span
                    style="
                      background: #ffae4c;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == '其他'"
                    >{{ row.a1 }}</span
                  >
                  <span
                    style="
                      background: #537ff1;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == 'IOS'"
                    >{{ row.a1 }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="a2"
                align="center"
                label="参与"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="a3"
                align="center"
                label="完成"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="a4"
                align="center"
                label="审核通过"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="a5"
                align="center"
                label="审核失败"
                width="120"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle font-s18">浏览器</div>
          </div>
        </template>
        <div class="system-content">
          <div>
            <div
              id="echarts2"
              ref="chart2Ref"
              style="width: 100%; height: 18.625rem"
            />
            <el-radio-group size="medium">
              <el-radio-button label="参与"></el-radio-button>
              <el-radio-button label="完成"></el-radio-button>
              <el-radio-button label="审核成功"></el-radio-button>
              <el-radio-button label="审核失败"></el-radio-button>
            </el-radio-group>
          </div>
          <div>
            <el-table
              border
              highlight-current-row
              height="100%"
              :data="tableData"
              width="100%"
            >
              <el-table-column
                prop="a1"
                align="center"
                width="120"
                label="操作系统"
              >
                <template #default="{ row }">
                  <span
                    style="
                      background: #6fd195;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == 'Android'"
                    >{{ row.a1 }}</span
                  >
                  <span
                    style="
                      background: #8979ff;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == 'Linux'"
                    >{{ row.a1 }}</span
                  >
                  <span
                    style="
                      background: #ff928a;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == 'Windows'"
                    >{{ row.a1 }}</span
                  >
                  <span
                    style="
                      background: #3cc3df;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == 'Max OS'"
                    >{{ row.a1 }}</span
                  >
                  <span
                    style="
                      background: #ffae4c;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == '其他'"
                    >{{ row.a1 }}</span
                  >
                  <span
                    style="
                      background: #537ff1;
                      padding: 0.85rem;
                      border-radius: 1rem;
                      color: white;
                    "
                    v-if="row.a1 == 'IOS'"
                    >{{ row.a1 }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="a2"
                align="center"
                label="参与"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="a3"
                align="center"
                label="完成"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="a4"
                align="center"
                label="审核通过"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="a5"
                align="center"
                label="审核失败"
                width="120"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card> -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="leftTitle font-s18">
              基本信息
              <span class="m-4 spanStatus">{{
                data.allocationStatus === 1 ? "未分配" : "已分配"
              }}</span>
            </div>
            <div class="rightStatus">
              <span
                :class="
                  data.isOnline === 1 ? 'isOnlineSpanTrue' : 'isOnlineSpanFalse'
                "
              ></span>
              <div
                :class="data.isOnline === 1 ? 'isOnlineTrue' : 'isOnlineFalse'"
              >
                {{ data.isOnline === 1 ? "在线" : "离线" }}
              </div>
            </div>
          </div>
        </template>
        <ElForm label-position="top">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="项目名称">
                <el-text class=" text-bg">
                  {{ data.form.name ? data.form.name : "-" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目ID">
                <div class="copyId text-bg">
                  <el-text class="">
                    {{ data.form.projectId ? data.form.projectId : "-" }}
                  </el-text>
                  <copy class="copy" :content="data.form.projectId" />
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="项目标识" prop="client_pid">
                <el-text class=" text-bg">
                  {{
                    data.form.projectIdentification
                      ? data.form.projectIdentification
                      : "-"
                  }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="data.projectType === 1">
              <el-form-item label="所属客户">
                <el-text class="text-bg">
                  {{ getcustsmer?.customerAccord }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属区域">
                <el-text class=" text-bg">
                  <template
                    v-if="comCountryId(data.form.countryIdList).length > 4"
                  >
                    <el-link type="primary">{{
                      comCountryId(data.form.countryIdList).length ===
                      basicDictionaryStore.country.length
                        ? "全球"
                        : comCountryId(data.form.countryIdList).length
                    }}</el-link>
                    <!-- </el-tooltip> -->
                  </template>
                  <template v-else>
                    <span
                      v-for="item in comCountryId(data.form.countryIdList)"
                      :key="item"
                    >
                      {{ item }}&ensp;
                    </span>
                  </template>
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="data.projectType === 1">
              <el-form-item label="项目价">
                <el-text v-if="data.form.currencyType === 1" class=" text-bg">
                  {{
                    data.form.doMoneyPrice ? data.form.doMoneyPrice + "$" : "-"
                  }}
                </el-text>
                <el-text v-if="data.form.currencyType === 2" class="text-bg">
                  {{
                    data.form.doMoneyPrice ? data.form.doMoneyPrice + "￥" : "-"
                  }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配额">
                <el-text class="text-bg">
                  {{ data.form.num ? data.form.num : "-" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最小时长">
                <el-text class=" text-bg">
                  {{
                    data.form.minimumDuration
                      ? data.form.minimumDuration + "min"
                      : "-"
                  }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="IR/NIR">
                <el-text class="text-bg">
                  {{ data.form.ir ? data.form.ir + "%" : data.form.ir }} /
                  {{ data.form.nir ? data.form.nir + "%" : data.form.nir }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="URL">
                <el-text class="text-bg">
                  {{ data.form.uidUrl ? data.form.uidUrl : "-" }}
                  <el-button
                    type="primary"
                    style="margin-left: auto"
                    @click="copyTextToClipboard(data.form.uidUrl)"
                    link
                  >
                    复制
                  </el-button>
                </el-text>
              </el-form-item>
            </el-col>
          </el-row>
        </ElForm>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header font-s18">
            <span style="display: flex;align-items: center;">
              其他设置
              <span class="title-bg">2</span>
            </span>


          </div>
        </template>
        <!-- <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="性别" class="flex">
                <el-radio-group size="medium">
                  <el-radio-button label="不限"></el-radio-button>
                  <el-radio-button label="男"></el-radio-button>
                  <el-radio-button label="女"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="年龄" class="flex">
                <el-input clearable style="width: 2.5rem !important" />
                <span style="margin:0 .25rem">-</span>
                <el-input clearable style="width: 2.5rem !important" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="操作系统" class="flex">
                <el-select placeholder="请选择操作系统" filterable> </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1">

            </el-col>
            <el-col :span="6">
              <el-form-item label="浏览器" class="flex">
                <el-select placeholder="请选择浏览器" filterable> </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
        <el-row :gutter="10">
          <el-col :span="3">
            <div :class=" data.form.isPinned === 1 ?'text-bg2' :'text-bgClose'">
              置顶 : <span>{{ data.form.isPinned === 1 ?'开启':'关闭' }}</span>
              <img v-if="data.form.isPinned === 1" src="@/assets/images/open.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;" />
              <img v-else src="@/assets/images/close.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;">
            </div>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="3">
            <div label="在线 :" :class="data.form.isOnline === 1 ?'text-bg2' :'text-bgClose'">

              在线 : <span v-if="data.form.isOnline === 1" >{{ data.form.isOnline === 1?'开启':'关闭' }}</span>

              <img v-if="data.form.isOnline === 1" src="@/assets/images/open.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;" />
              <img v-else src="@/assets/images/close.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;">
            </div>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="3">
            <div  :class="data.form.isProfile === 2 ?'text-bg2' :'text-bgClose'">

              资料 : <span >{{ data.form.isProfile === 2 ?'开启':'关闭' }}</span>
              <img v-if="data.form.isProfile === 2" src="@/assets/images/open.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;" />
              <img v-else src="@/assets/images/close.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;">

            </div>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="3">
            <div  :class="data.form.isPinned === 1 ?'text-bg2' :'text-bgClose'">

              B2B : <span  >
                  {{ data.form.isPinned === 1 ? data.form.projectType.join(","):'关闭' }}
                </span>
                <img v-if="data.form.isPinned === 1" src="@/assets/images/open.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;" />
                <img v-else src="@/assets/images/close.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;">

              </div>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="4">
            <div :class="data.form.isTimeReleases === 2 ?'text-bg2' :'text-bgClose'">

              定时发布 : <span >{{ data.form.isTimeReleases === 2 ?'开启':'关闭'}}</span>
              <img v-if="data.form.isTimeReleases === 2" src="@/assets/images/open.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;" />
              <img v-else src="@/assets/images/close.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;">

            </div>
          </el-col>

        </el-row>
        <el-row>

          <el-col :span="11">
            <div class="text-bg2">

              备注 : {{ data.form.remark ? data.form.remark : "-" }}

            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" v-if="data.projectType === 1">
        <template #header>
          <div class="peizjo-header">
            <span class="font-s18">配置信息<span class="title-bg">3</span></span>
            <span
              style="margin-left: 50px; font-weight: 700; margin-right: 10px"
              v-if="data.form.projectProblemCategoryName"
              >问卷名称：{{ data.form.projectProblemCategoryName }}</span
            >
            <el-button
              type="primary"
              plain
              size="small"
              v-if="data.form.countryName"
              >{{ data.form.countryName }}</el-button
            >

            <!-- <span style="margin-left: 50px" v-if="data.form.countryName"
                >区域：{{ data.form.countryName }}</span
              >
              <span
                style="margin-left: 30px"
                v-if="data.form.projectProblemCategoryName"
                >问卷：{{ data.form.projectProblemCategoryName }}</span
              > -->
          </div>
        </template>
        <el-row
          :gutter="10"
          :class="
            data.form.projectQuotaInfoList.length ? 'toConfigure' : 'isNone'
          "
        >
          <el-col :span="8">
            <!-- <el-form-item label="区域 :">
                <el-text class="mx-1">
                  {{ data.form.countryName ? data.form.countryName : "-" }}
                </el-text>
              </el-form-item> -->
          </el-col>
          <el-col :span="8">
            <!-- <el-form-item label="问卷 :">
                <el-text class="mx-1">
                  {{
                    data.form.projectProblemCategoryName
                      ? data.form.projectProblemCategoryName
                      : "-"
                  }}
                </el-text>
              </el-form-item> -->
          </el-col>
          <el-col
            :span="24"
            :class="{ isNone: !data.form.projectQuotaInfoList.length }"
            :gutter="10"
            v-for="item in data.form.projectQuotaInfoList"
          >
            <div class="quotaInfoDiv">
              <!-- 问题 -->
              <div :class="{ bottom: !item.answerValueList }">
                <img :src="asteriskImage" />
                <span class="tableBig">{{ item.keyValue }}</span>
              </div>

              <!-- 答案 -->
              <div
                class="answer"
                v-if="
                  item.answerValueList && item.answerValueList[0] !== 'null'
                "
              >
                {{ item.answerValueList.join(", ") }}
              </div>
            </div>
            <!-- <el-form-item label-width="200px" :label="item.keyValue + ' :'">
                <el-text
                  class="mx-1"
                  v-if="
                    item.answerValueList && item.answerValueList[0] !== 'null'
                  "
                >
                  {{ item.answerValueList.join(", ") }}
                </el-text>
                <el-text class="mx-1" v-else> - </el-text>
              </el-form-item> -->
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header font-s18">
            <span>安全信息<span class="title-bg">4</span></span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="text-ye">
              小时准入量 :<span>{{ data.form.preNum ? data.form.preNum : "-" }}</span>
              <img src="@/assets/images/open-ye.png" alt="" v-if="data.form.preNum">
            </div>

          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="4">
            <div class="text-bl">
              小时完成量 :<span>{{ data.form.limitedQuantity ? data.form.limitedQuantity : "-" }}</span>
              <img src="@/assets/images/open-bl.png" alt="" v-if="data.form.limitedQuantity">
            </div>



          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="4">
            <div :class="data.form.ipDifferenceDetection === 1 ?'text-bg2' :'text-bgClose'">

              重复参与:<span >{{ data.form.ipDifferenceDetection === 1 ?'开启':'关闭'}}</span>
<img v-if="data.form.ipDifferenceDetection === 1" src="@/assets/images/open.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;" />
<img v-else src="@/assets/images/close.png" style="width: 1rem;height: 1rem;margin-left: 0.3125rem;">

</div>


            <!-- <el-form-item label="重复参与:">
              <el-text class="mx-1">
                <div v-if="data.form.ipDifferenceDetection === 1" class="open">
                  开
                </div>
                <div v-else class="close">关</div>
              </el-text>
            </el-form-item> -->
          </el-col>
          <!-- <el-col :span="8">
              <el-form-item label="IP一致性检测:">
                <el-text class="mx-1">
                  {{ data.form.ipConsistency === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col> -->
          <!-- 暂时隐藏 -->
          <!-- <el-col :span="8">
              <el-form-item label="时差检测 :">
                <el-text class="mx-1">
                  {{ data.form.timeDifferenceDetection === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="重复IP检测 :">
                <el-text class="mx-1">
                  {{ data.form.ipDifferenceDetection === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col> -->
        </el-row>
      </el-card>
      <el-card v-if="data.form.descriptionUrl" class="box-card">
        <template #header>
          <div class="card-header font-s18">
            <span>描述配额<span class="title-bg">5</span></span>
          </div>
        </template>
        <template v-if="data.form.descriptionUrl">
          <div
            v-for="item in data.srcList"
            :key="item"
            class="demo-image__preview"
          >
            <el-image
              style="width: 6.25rem; height: 6.25rem"
              :src="item"
              :preview-src-list="item"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :initial-index="0"
              fit="cover"
            />
          </div>
          <p v-for="(item, index) in imgList" :key="item">
            <el-button
              style="padding: 0"
              type="primary"
              text
              @click="download(item, index)"
            >
              {{ item }} 下载
            </el-button>
          </p>
        </template>
        <el-row :class="{ isNone: !data.form.descriptionUrl }" :gutter="20">
          <el-col :span="24">
            <div class="radius p-2 flex gap-2">
              <Viewer :value="data.form.richText" />
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card" v-if="data.projectType === 1">
        <template #header>
          <div class="card-header font-s18">
            <span>操作日志<span class="title-bg">6</span></span>
          </div>
        </template>
        <el-table
          :data="data.form.projectOperationInfoList"
          style="width: 100%"
        >
          <el-table-column align="left" type="index" width="80" label="序号" />
          <el-table-column align="left" prop="operationTime" label="操作时间" />
          <el-table-column align="left" prop="operationName" label="操作人" />
          <el-table-column align="left" prop="operationType" label="操作事项">
            <template #default="{ row }">
              {{ operationTypeList[row.operationType - 1] }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="详情">
            <template #default="{ row }">
              <el-button
                type="primary"
                link
                @click="details(row)"
                v-if="row.operationType !== 1"
              >
                详情
              </el-button>
              <el-text v-else>-</el-text>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <template #footer>
        <div class="flex-c">
          <el-button type="primary" @click="closeHandler"> 关闭 </el-button>
        </div>
      </template>
    </el-drawer>
    <logDetails ref="logDetailsRef" />
  </div>
</template>

<style scoped lang="scss">
.box-card {
  border-radius: 0.5rem !important;
  border: 0.5px solid #dde2e9 !important;
  padding: 24px;
}
.text-bg2 {
  color: #409EFF;
  background: #E7F3FF;
  border-radius: 0.25rem;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}
.title-bg {
  color: #409EFF;
  background: #E7F3FF;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  margin-left: .3125rem;
  width: 18px;
  height: 18px;
  display: inline-block;
  text-align: center;
}
.text-bgClose {
  color: #B1B1B1 ;
  background: #F3F4F4;
  border-radius: 0.25rem;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}
.text-ye {
  color: #FEB468 ;
  background: #FFE7CE;
  border-radius: 0.25rem;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}
.text-bl {
  color: #03C239 ;
  background: #E2FFEA;
  border-radius: 0.25rem;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}
.text-bg {
  background: #F3F4F4;
  border-radius: 0.3125rem;
  padding: .25rem 0.625rem;
  width: 100%;
}
.system-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.quotaInfoDiv {
  border-bottom: 1px dashed #d5d5d5;
  margin-bottom: 0.875rem;
}

.quotaInfoDiv .bottom {
  margin-bottom: 1rem;
}

.quotaInfoDiv .answer {
  background: #f5faff;
  border-radius: 4px 4px 4px 4px;
  font-weight: 400;
  font-size: 14px;
  color: #686c70;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.radius {
  min-height: 160px;
  width: 100%;
  border: 0.0625rem solid var(--el-border-color);
  border-radius: 0;
  margin-top: 1.25rem;
}

.demo-image__error .image-slot {
  font-size: 1.875rem;
}

.demo-image__error .image-slot .el-icon {
  font-size: 1.875rem;
}

.demo-image__error .el-image {
  width: 100%;
  height: 12.5rem;
}
.font-s18 {
  font-size: 18px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .leftTitle {
    font-size: 18px;
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
    width: 80px;
    display: flex;
    align-items: baseline;

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

.demo-image__preview {
  margin-right: 10px;
  display: inline-block;
}

.peizjo-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

// 配置信息问题答案
.toConfigure {
  max-height: 31.25rem;
  overflow-y: auto;

  :deep {
    .el-form-item {
      margin: 0;
    }

    // .el-col:nth-of-type(n + 3) {
    //   border-bottom: 1px dashed #d5d5d5;
    // }

    .el-form-item__label {
      align-items: flex-start;
      box-sizing: border-box;
      color: var(--el-text-color-regular);
      display: inline-flex;
      flex: 0 0 auto;
      font-size: var(--el-form-label-font-size);
      height: auto;
      justify-content: flex-end;
      line-height: auto;
      padding: 12px 0;
    }
  }
}

:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep(.el-drawer__body .el-card) {
  box-shadow: none !important;
}
:deep(.el-card) {
  margin: 0.625rem 0;
  padding-top: 10px;

}

:deep(.editor) {
  width: 100%;
}

.isNone {
  display: none;
}

.colorgreen {
  color: #7ecb57;
}

.open {
  color: #409eff;
}

.close {
  color: #e2e2e2;
}
</style>
