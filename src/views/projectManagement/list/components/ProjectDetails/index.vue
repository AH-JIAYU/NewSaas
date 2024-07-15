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

defineOptions({
  name: "ProjectDetails",
});
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
  imgUrl: "", // 图片预览
  isOnline: "", //	项目状态:1:在线 2:不在线
  allocationStatus: "", //分配状态:1:未分配 2:已分配
  srcList: [], // 图片预览
  countryList: [], // 国家
});
const plugins = [
  gfm({
    locale: gfmLocale,
  }),
];
function handleChange(v: string) {
  content.value = v;
}
const list = [
  { a: 1, b: 2, c: 3, id: 1 },
  { a: 1, b: 2, c: 3, id: 1 },
  { a: 1, b: 2, c: 3, id: 1 },
];
// 详情
function details(row: any) {
  logDetailsRef.value.showEdit(row);
}
// 弹框开关变量
const dialogTableVisible = ref(false);
// 显隐
async function showEdit(row: any) {
  data.value.isOnline = row.isOnline;
  data.value.allocationStatus = row.allocationStatus;
  const res = await obtainLoading(api.detail({ projectId: row.projectId }));
  data.value.form = res.data;
  const imgres: any = await fileApi.detail({
    fileName: data.value.form.descriptionUrl,
  });
  data.value.imgUrl = imgres.data.fileUrl;
  data.value.srcList = [imgres.data.fileUrl];
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
async function download() {
  await DownLoad(data.value.imgUrl, data.value.form.descriptionUrl);
}
// 弹框关闭事件
function closeHandler() {
  dialogTableVisible.value = false;
}
onMounted(async () => {
  data.value.countryList = await basicDictionaryStore.getCountry();
});
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
      size="55%"
      title="项目详情"
    >
      <template #header>
        <el-row :gutter="20">
          <el-col :span="2" />
          <el-col :span="20">
            <el-steps
              style="max-width: 100%"
              finish-status="success"
              align-center
              :active="active"
            >
              <el-step
                title="已开始"
                description="2021-09-09 11:11:11"
                :icon="Select"
              />
              <el-step
                title="已确认"
                description="2021-09-09 11:11:11"
                :icon="active >= 2 ? CircleCheck : Position"
              />
              <el-step
                title="已开票"
                description="2021-09-09 11:11:11"
                :icon="active >= 3 ? CircleCheck : Position"
              />
              <el-step
                title="已完结"
                description="2021-09-09 11:11:11"
                :icon="active >= 4 ? CircleCheck : Position"
              />
            </el-steps>
          </el-col>
          <el-col :span="2" />
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
                <div
                  :class="
                    data.isOnline === 1 ? 'isOnlineTrue' : 'isOnlineFalse'
                  "
                >
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
            <el-col :span="8">
              <el-form-item label="所属客户 :">
                <el-text class="mx-1">
                  {{ data.form.clientId ? data.form.clientId : "-" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属国家 :">
                <el-text class="mx-1">
                  <template
                    v-if="comCountryId(data.form.countryIdList).length > 4"
                  >
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="comCountryId(data.form.countryIdList).join(',')"
                      placement="top"
                    >
                      <el-link type="primary">{{
                        comCountryId(data.form.countryIdList).length
                      }}</el-link>
                    </el-tooltip>
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
            <el-col :span="8">
              <el-form-item label="原价 :">
                <el-text class="mx-1">
                  {{ data.form.doMoneyPrice ? data.form.doMoneyPrice : "-" }}
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
                    data.form.minimumDuration ? data.form.minimumDuration : "-"
                  }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="IR :">
                <el-text class="mx-1">
                  {{ data.form.ir ? data.form.ir : "-" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="URL :">
                <el-text class="mx-1">
                  {{ data.form.uidUrl ? data.form.uidUrl : "-" }}
                </el-text>
                <el-button
                  type="primary"
                  style="margin-left: auto"
                  @click="copyTextToClipboard(data.form.uidUrl)"
                  link
                >
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
                  {{ data.form.isPinned === 1 ? "开" : "关" }}
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
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>配置信息</span>
            </div>
          </template>
          <el-row
            :gutter="10"
            :class="
              data.form.projectQuotaInfoList.length ? 'toConfigure' : 'isNone'
            "
          >
            <el-col :span="8">
              <el-form-item label="国家 :">
                <el-text class="mx-1">
                  {{ data.form.countryName ? data.form.countryName : "-" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="问卷 :">
                <el-text class="mx-1">
                  {{
                    data.form.projectProblemCategoryName
                      ? data.form.projectProblemCategoryName
                      : "-"
                  }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col
              :span="24"
              :class="{ isNone: !data.form.projectQuotaInfoList.length }"
              :gutter="10"
              v-for="item in data.form.projectQuotaInfoList"
            >
              <el-form-item :label="item.keyValue + ' :'">
                <el-text
                  class="mx-1"
                  v-if="
                    item.answerValueList && item.answerValueList[0] !== 'null'
                  "
                >
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="IP一致性检测:">
                <el-text class="mx-1">
                  {{ data.form.ipConsistency === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>描述及配额</span>
            </div>
          </template>
          <template v-if="data.form.descriptionUrl">
            <div class="demo-image__preview">
              <el-image
                style="width: 6.25rem; height: 6.25rem"
                :src="data.imgUrl"
                :preview-src-list="data.srcList"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :initial-index="0"
                fit="cover"
              />
            </div>
            <el-button style="padding: 0" type="primary" text @click="download">
              {{ data.form.descriptionUrl }} 下载
            </el-button>
          </template>
          <el-row :class="{ isNone: !data.form.descriptionUrl }" :gutter="20">
            <el-col :span="24">
              <div class="radius p-2 flex gap-2">
                <Viewer :value="data.form.richText" />
              </div>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>操作日志</span>
            </div>
          </template>
          <el-table :data="list" border style="width: 100%">
            <el-table-column
              align="center"
              type="index"
              width="80"
              label="序号"
            />
            <el-table-column align="center" prop="a" label="操作时间" />
            <el-table-column align="center" prop="b" label="操作人" />
            <el-table-column align="center" prop="c" label="操作事项" />
            <el-table-column align="center" prop="d" label="详情">
              <el-button text type="primary" size="default" @click="details">
                详情
              </el-button>
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

    > div {
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
    > div.isOnlineTrue {
      background-color: #70b51a;
      &::after,
      &::before {
        border: 1px #70b51a dashed;
      }
    }

    > div.isOnlineFalse {
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
</style>
