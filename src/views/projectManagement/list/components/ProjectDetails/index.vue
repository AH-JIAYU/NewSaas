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
  dialogTableVisible.value = true;
}
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
  const response = await fetch(data.value.imgUrl);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = data.value.form.descriptionUrl; // 根据需要设置文件名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 清理URL对象
  URL.revokeObjectURL(url);
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
      <ElForm label-width="100px">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <div>
                基本信息
                <span
                  class="m-4"
                  style="
                    background: var(--el-color-primary);
                    color: var(--el-color-white);
                    padding: 0 0.5rem;
                  "
                  >{{ data.allocationStatus === 1 ? "未分配" : "已分配" }}</span
                >
              </div>
              <div class="status">
                <div class="i-ph:seal-light w-1em h-1em"></div>
                <div>{{ data.isOnline === 1 ? "在线" : "离线" }}</div>
              </div>
            </div>
          </template>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="项目ID">
                <el-text class="mx-1"> {{ data.form.projectId }} </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称">
                <el-text class="mx-1"> {{ data.form.name }} </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目标识" prop="client_pid">
                <el-text class="mx-1">
                  {{ data.form.projectIdentification }}
                </el-text>
              </el-form-item>
            </el-col>
            <!-- </el-row>
          <el-row :gutter="10"> -->
            <el-col :span="8">
              <el-form-item label="所属客户">
                <el-text class="mx-1"> {{ data.form.clientId }} </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属国家">
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
              <el-form-item label="原价">
                <el-text class="mx-1"> {{ data.form.doMoneyPrice }} </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配额">
                <el-text class="mx-1"> {{ data.form.num }} </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最小时长">
                <el-text class="mx-1">
                  {{ data.form.minimumDuration }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="IR">
                <el-text class="mx-1"> {{ data.form.ir }} </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="URL">
                <el-text class="mx-1"> {{ data.form.uidUrl }} </el-text>
                <el-button
                  type="primary"
                  style="margin-left: auto"
                  @click="copyTextToClipboard(data.form.uidUrl)"
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
              <el-form-item label="置顶">
                <el-text class="mx-1">
                  {{ data.form.isPinned === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="在线">
                <el-text class="mx-1">
                  {{ data.form.isOnline === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资料">
                <el-text class="mx-1">
                  {{ data.form.isProfile === 2 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="B2B">
                <el-text class="mx-1">
                  {{ data.form.isPinned === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="定时发布">
                <el-text class="mx-1">
                  {{ data.form.isTimeReleases === 2 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-text class="mx-1"> {{ data.form.remark }} </el-text>
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
          <el-row :gutter="10">
            <el-col :span="8" v-for="item in data.form.projectQuotaInfoList">
              <el-form-item :label="item.keyValue">
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
              <el-form-item label="小时准入量">
                <el-text class="mx-1"> {{ data.form.preNum }} </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="小时完成量">
                <el-text class="mx-1">
                  {{ data.form.limitedQuantity }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="时差检测">
                <el-text class="mx-1">
                  {{ data.form.timeDifferenceDetection === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="重复IP检测">
                <el-text class="mx-1">
                  {{ data.form.ipDifferenceDetection === 1 ? "开" : "关" }}
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="IP一致性检测">
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
                style="width: 100px; height: 100px"
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

          <el-row :gutter="20">
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
  min-height: 10rem;
  width: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 20px;
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  .status {
    position: relative;
    width: 8rem;

    > div {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.3rem;
    }
    > div:nth-child(1) {
      font-size: 8rem;
    }
  }
}

.el-step__title {
  text-align: center;
}

.one {
  position: relative;
}

.started {
  position: absolute;
  top: 49%;
  left: 7%;
  z-index: 9999;
  content: "已开通";
  transform: translate(-50%, -50%);
}

:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep(.el-card) {
  margin: 10px 0;
}

:deep(.editor) {
  width: 100%;
}

table {
  width: 100%;
  /* 表格宽度设置为100% */
  border-collapse: collapse;
  /* 合并边框 */
}

th,
td {
  padding: 10px;
  /* 单元格内边距 */
  border: 1px solid #ccc;
  /* 边框 */
  text-align: center;
}

th {
  width: 15%;
  font-weight: normal;
}

tr {
  width: 30%;
}
</style>
