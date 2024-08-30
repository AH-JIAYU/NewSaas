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
  // 配置信息 国家和问卷
  // initialProblem: {
  //   countryId: "", // 国家
  //   projectQuotaQuestionType: "", // 问题类型
  // },
  imgUrl: [], // 图片预览
  isOnline: "", //	项目状态:1:在线 2:不在线
  allocationStatus: "", //分配状态:1:未分配 2:已分配
  projectType: 1, //项目类型 1:内部新增 2:租户分配   为租户时需要隐藏客户、前置、操作日志
  srcList: [], // 图片预览
  countryList: [], // 国家
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
const operationTypeList: any = [
  '新增',
  '编辑',
  '分配',
  '调度',
];
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
  data.value.form.projectSettlementStatusSet =
    data.value.form.projectSettlementStatusSet.reduce(
      (accumulator: any, currentValue: any) => {
        let existing = accumulator.find(
          (obj: any) => obj.settlementStatus === currentValue.settlementStatus
        );
        if (!existing) {
          accumulator.push(currentValue);
        }
        return accumulator;
      },
      []
    );
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
}

// 回显国家和问卷
const getCountryQuestion = async () => {
  if (data.value.form.projectQuotaInfoList.length) {
    // 获取国家
    const resCountry = await api.getProjectCountryList({
      countryIdList: data.value.form.countryIdList,
    });
    // 获取问卷
    const params = {
      countryId: data.value.form.projectQuotaInfoList[0].countryId, // 国家
      projectQuotaQuestionType:
        data.value.form.projectQuotaInfoList[0].projectQuotaQuestionType, // 问题类型
    };
    const resQuestionnaire = await api.getProjectCategoryList(params);
    // 查找国家
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
// 回显国家
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
onMounted(async () => {
  data.value.countryList = await basicDictionaryStore.getCountry();
  customerList.value = await customerStore.getCustomerList();
});
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-drawer v-model="dialogTableVisible" append-to-body :close-on-click-modal="false" destroy-on-close draggable
      @close="closeHandler" size="55%" title="项目详情">
      <template v-if="data.form.projectSettlementStatusSet &&
      data.form.projectSettlementStatusSet.length !== 0
      " #header>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-steps style="max-width: 100%" finish-status="success" align-center
              :active="data.form.projectSettlementStatusSet[0].settlementStatus">
              <el-step title="待审核" description="2021-09-09 11:11:11" :icon="CircleCheck" />
              <el-step title="已审核" :description="data.form.projectSettlementStatusSet[0].operationTime
      " :icon="data.form.projectSettlementStatusSet[0].settlementStatus >= 2
      ? CircleCheck
      : Position
      " />
              <el-step title="已开票" description="2021-09-09 11:11:11" :icon="active >= 3 ? CircleCheck : Position" />
              <el-step title="已结算" description="2021-09-09 11:11:11" :icon="active >= 4 ? CircleCheck : Position" />
              <el-step title="已冻结" description="2021-09-09 11:11:11" :icon="active >= 5 ? CircleCheck : Position" />
            </el-steps>
          </el-col>
          <el-row style="width: 100%; margin-top: 0; font-size: 14px" :gutter="20">
            <el-col :span="1"></el-col>
            <el-col :class="{
      colorgreen:
        data.form.projectSettlementStatusSet[0].settlementStatus >= 1,
    }" :span="5">
              <span style="margin-left: 25.5%">{{
      data.form.projectSettlementStatusSet[0].operationName
    }}</span>
            </el-col>
            <el-col :class="{
        colorgreen:
          data.form.projectSettlementStatusSet[0].settlementStatus >= 2,
      }" :span="5">
              <span style="margin-left: 19.5%">操作员</span>
            </el-col>
            <el-col :class="{
      colorgreen:
        data.form.projectSettlementStatusSet[0].settlementStatus >= 3,
    }" :span="5">
              <span style="margin-left: 12.5%">操作员</span>
            </el-col>
            <el-col :class="{
      colorgreen:
        data.form.projectSettlementStatusSet[0].settlementStatus >= 4,
    }" :span="4">
              <span style="margin-left: 8.5%">操作员</span>
            </el-col>
            <el-col :class="{
      colorgreen:
        data.form.projectSettlementStatusSet[0].settlementStatus >= 5,
    }" :span="4">
              <span style="margin-left: 28.5%">操作员</span>
            </el-col>
          </el-row>
        </el-row>
      </template>
      <ElForm label-width="120px">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <div class="leftTitle">
                基本信息
                <span class="m-4 spanStatus">{{
      data.allocationStatus === 1 ? "未分配" : "已分配"
    }}</span>
              </div>
              <div class="rightStatus">
                <!-- <div class="i-ph:seal-light w-1em h-1em"></div> -->
                <div :class="data.isOnline === 1 ? 'isOnlineTrue' : 'isOnlineFalse'
      ">
                  {{ data.isOnline === 1 ? "在线" : "离线" }}
                </div>
              </div>
            </div>
          </template>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="项目ID :">
                <el-text class="mx-1">
                  {{ data.form.projectId ? data.form.projectId : "-" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称 :">
                <el-text class="mx-1">
                  {{ data.form.name ? data.form.name : "-" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目标识 :" prop="client_pid">
                <el-text class="mx-1">
                  {{
      data.form.projectIdentification
        ? data.form.projectIdentification
        : "-"
    }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="data.projectType === 1">
              <el-form-item label="所属客户 :">
                <el-text class="mx-1">
                  {{ getcustsmer?.customerAccord }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属国家 :">
                <el-text class="mx-1">
                  <template v-if="comCountryId(data.form.countryIdList).length > 4">
                    <!-- <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="comCountryId(data.form.countryIdList).join(',')"
                      placement="top"
                    > -->
                    <el-link type="primary">{{
      comCountryId(data.form.countryIdList).length === basicDictionaryStore.country.length
        ? "全球"
        : comCountryId(data.form.countryIdList).length
    }}</el-link>
                    <!-- </el-tooltip> -->
                  </template>
                  <template v-else>
                    <span v-for="item in comCountryId(data.form.countryIdList)" :key="item">
                      {{ item }}&ensp;
                    </span>
                  </template>
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="data.projectType === 1">
              <el-form-item label="原价 :">
                <el-text v-if="data.form.currencyType === 1" class="mx-1">
                  {{
      data.form.doMoneyPrice ? data.form.doMoneyPrice + "$" : "-"
    }}
                </el-text>
                <el-text v-if="data.form.currencyType === 2" class="mx-1">
                  {{
      data.form.doMoneyPrice ? data.form.doMoneyPrice + "￥" : "-"
    }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配额 :">
                <el-text class="mx-1">
                  {{ data.form.num ? data.form.num : "-" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最小时长 :">
                <el-text class="mx-1">
                  {{
      data.form.minimumDuration
        ? data.form.minimumDuration + "min"
        : "-"
    }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="IR/NIR :">
                <el-text class="mx-1">
                  {{ data.form.ir ? data.form.ir + "%" : data.form.ir }} /
                  {{ data.form.nir ? data.form.nir + "%" : data.form.nir }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="URL :">
                <el-text class="mx-1">
                  {{ data.form.uidUrl ? data.form.uidUrl : "-" }}
                </el-text>
                <el-button type="primary" style="margin-left: auto" @click="copyTextToClipboard(data.form.uidUrl)" link>
                  复制
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>其他设置</span>
            </div>
          </template>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="置顶 :">
                <el-text class="mx-1">
                  {{ data.form.isPinned === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="在线 :">
                <el-text class="mx-1">
                  {{ data.form.isOnline === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资料 :">
                <el-text class="mx-1">
                  {{ data.form.isProfile === 2 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="B2B :">
                <el-text class="mx-1">
                  {{}}
                  {{
      data.form.isPinned === 1
        ? data.form.projectType.join(",")
        : "关"
    }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="定时发布 :">
                <el-text class="mx-1">
                  {{ data.form.isTimeReleases === 2 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注 :">
                <el-text class="mx-1">
                  {{ data.formNaNpxark ? data.formNaNpxark : "-" }}
                </el-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card" v-if="data.projectType === 1">
          <template #header>
            <div class="peizjo-header">
              <span>配置信息</span>
              <span style="margin-left: 50px" v-if="data.form.countryName">国家：{{ data.form.countryName }}</span>
              <span style="margin-left: 30px" v-if="data.form.projectProblemCategoryName">问卷：{{
      data.form.projectProblemCategoryName }}</span>
            </div>
          </template>
          <el-row :gutter="10" :class="data.form.projectQuotaInfoList.length ? 'toConfigure' : 'isNone'
      ">
            <el-col :span="8">
              <!-- <el-form-item label="国家 :">
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
            <el-col :span="24" :class="{ isNone: !data.form.projectQuotaInfoList.length }" :gutter="10"
              v-for="item in data.form.projectQuotaInfoList">
              <el-form-item label-width="200px" :label="item.keyValue + ' :'">
                <el-text class="mx-1" v-if="item.answerValueList && item.answerValueList[0] !== 'null'
      ">
                  {{ item.answerValueList.join(", ") }}
                </el-text>
                <el-text class="mx-1" v-else> - </el-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>安全信息</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="小时准入量 :">
                <el-text class="mx-1">
                  {{ data.form.preNum ? data.form.preNum : "-" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="小时完成量 :">
                <el-text class="mx-1">
                  {{
      data.form.limitedQuantity ? data.form.limitedQuantity : "-"
    }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="重复参与:">
                <el-text class="mx-1">
                  {{ data.form.ipDifferenceDetection === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
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
            <div class="card-header">
              <span>描述配额</span>
            </div>
          </template>
          <template v-if="data.form.descriptionUrl">
            <div v-for="item in data.srcList" :key="item" class="demo-image__preview">
              <el-image style="width: 6.25rem; height: 6.25rem" :src="item" :preview-src-list="item" :zoom-rate="1.2"
                :max-scale="7" :min-scale="0.2" :initial-index="0" fit="cover" />
            </div>
            <p v-for="(item, index) in imgList" :key="item">
              <el-button style="padding: 0" type="primary" text @click="download(item, index)">
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
            <div class="card-header">
              <span>操作日志</span>
            </div>
          </template>
          <el-table :data="data.form.projectOperationInfoList" border style="width: 100%">
            <el-table-column align="center" type="index" width="80" label="序号" />
            <el-table-column align="center" prop="operationTime" label="操作时间" />
            <el-table-column align="center" prop="operationName" label="操作人" />
            <el-table-column align="center" prop="operationType" label="操作事项">
              <template #default="{row}">
                {{operationTypeList[row.operationType-1]}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="详情">
              <template #default="{ row }">
                <el-button type="primary" link @click="details(row)" v-if="row.operationType === 2">
                  详情
                </el-button>
                <el-text v-else>-</el-text>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </ElForm>
      <template #footer>
        <el-button @click="closeHandler"> 取消 </el-button>
        <el-button type="primary" @click="closeHandler"> 确定 </el-button>
      </template>
    </el-drawer>
    <logDetails ref="logDetailsRef" />
  </div>
</template>

<style scoped lang="scss">
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .leftTitle {
    .spanStatus {
      width: 60px !important;
      height: 20px !important;
      background: var(--el-color-primary);
      color: var(--el-color-white);
      padding: 0 8px;
      font-size: 0.875rem;
      border-radius: 3.125rem;
    }
  }

  .rightStatus {
    position: relative;
    width: 128px;

    >div {
      width: 120px;
      height: 2.2rem;
      line-height: 2.2rem;
      text-align: center;
      border-radius: 0.3rem;
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 20.8px;

      &::before {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 60%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        content: "";
      }

      &::after {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        aspect-ratio: 1 / 1;
        content: "";
      }
    }

    >div.isOnlineTrue {
      background-color: #70b51a;

      &::after,
      &::before {
        border: 1px #70b51a dashed;
      }
    }

    >div.isOnlineFalse {
      background-color: #d8261a;

      &::after,
      &::before {
        border: 1px #d8261a dashed;
      }
    }

    // > div:nth-child(1) {
    //   font-size: 128px;
    // }
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
      margin: 10px 0;
    }

    .el-col:nth-of-type(n + 3) {
      border-bottom: 1px dashed #d5d5d5;
    }

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

:deep(.el-card) {
  margin: 0.625rem 0;
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
</style>
