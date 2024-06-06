<script setup lang="ts">
// 配置富文本
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import "bytemd/dist/index.css";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典-国家
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import fileApi from "@/api/modules/file";

const basicDictionaryStore = useBasicDictionaryStore(); //基础字典-国家
const customerStore = useUserCustomerStore(); // 客户
defineOptions({
  name: "SurveyTopTabs",
});
const validate = inject<any>("validateTopTabs"); //注入Ref
const props: any = defineProps({
  leftTab: Object,
  tabIndex: Number,
});

const activeName = ref("basicSettings"); // tabs
const formRef = ref<any>(); // Ref 在edit中进行校验
const fold = ref(false); // 折叠 描述配额
const data = reactive<any>({
  countryList: [], // 国家
  customerList: [], // 客户
});

// 校验
const rules = ref<any>({
  customerAccord: [{ required: true, message: "请输入项目名称" }],
  projectIdentification: [{ required: true, message: "请输入项目标识" }],
  countryId: [{ required: true, message: "请选择所属国家" }],
  clientId: [{ required: true, message: "请选择所属客户" }],
  uidUrl: [{ required: true, message: "请输入UidUrl" }],
  doMoneyPrice: [{ required: true, message: "请输入原价(美元)" }],
  num: [{ required: true, message: "请输入配额" }],
});
// 配置信息 死数据 可删除
const options = ref([
  {
    value: "终端",
    label: "终端",
  },
  {
    value: "性别",
    label: "性别",
  },
  {
    value: "年龄",
    label: "年龄",
  },
]);
// 配置信息 年龄绑定值 可删除
const value = ref([4, 8]);
// 富文本配置
const plugins = [
  gfm({
    locale: gfmLocale,
  }),
];
// 富文本设置值
function handleChange(v: string) {
  props.leftTab.richText = v;
}
function open(url: string) {
  window.open(url, "_blank");
}
// 折叠 描述配额
function isHieght() {
  fold.value = !fold.value;
}
// 上传
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

// 删除
const handleRemove: any = async (uploadFile: any, uploadFiles: any) => {
  const { status } = await fileApi.delete({
    fileName: props.leftTab.descriptionUrl,
  });
  status === 1 &&
    ElMessage.success({
      message: "删除成功",
      center: true,
    });
};
// 上传图片成功
const handleSuccess: any = (uploadFile: any, uploadFiles: any) => {
  props.leftTab.descriptionUrl = uploadFile.data.qiNiuUrl;
};
// 超出限制
const handleExceed: any = async (uploadFile: any, uploadFiles: any) => {
  ElMessage.warning({
    message: "只能上传一个,删除原文件后重新上传",
    center: true,
  });
};
// 查看
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
onMounted(async () => {
  data.customerList = await customerStore.getCustomerList();
  data.countryList = await basicDictionaryStore.getCountry();
});
nextTick(() => {
  // 表单验证方法
  validate(formRef.value);
});
</script>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="基础设置" name="basicSettings">
      <ElForm
        label-width="100px"
        :rules="rules"
        ref="formRef"
        :model="props.leftTab"
      >
        <el-card body-style="">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="项目名称" prop="customerAccord">
                <el-input v-model="props.leftTab.customerAccord" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目标识" prop="projectIdentification">
                <el-input
                  clearable
                  v-model="props.leftTab.projectIdentification"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- 单个 -->
              <el-form-item label="所属客户" prop="clientId">
                <el-select
                  placeholder="Select"
                  v-model="props.leftTab.clientId"
                >
                  <el-option
                    v-for="item in data.customerList"
                    :key="item.tenantCustomerId"
                    :value="item.tenantCustomerId"
                    :label="item.customerAccord"
                  ></el-option>
                </el-select>
                <!-- <el-input
                  placeholder="Select"
                  v-model.number="props.leftTab.clientId"
                /> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- 可以选多个， 字符串格式 以,分割 -->
              <el-form-item label="所属国家" prop="countryId">
                <!-- <el-cascader
                  clearable
                  filterable
                  v-model="props.leftTab.countryId"
                /> -->
                <el-input
                  clearable
                  filterable
                  v-model="props.leftTab.countryId"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="原价(美元)" prop="doMoneyPrice">
                <el-input-number
                  v-model="props.leftTab.doMoneyPrice"
                  :min="1"
                  controls-position="right"
                  size="large"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="配额" prop="num">
                <el-input-number
                  v-model="props.leftTab.num"
                  :step="1"
                  step-strictly
                  :min="1"
                  controls-position="right"
                  size="large"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最小分长">
                <el-input-number
                  v-model="props.leftTab.minimumDuration"
                  :min="1"
                  :step="1"
                  step-strictly
                  controls-position="right"
                  size="large"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="IR">
                <el-input-number
                  v-model="props.leftTab.ir"
                  :min="1"
                  controls-position="right"
                  size="large"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="UidUrl" prop="uidUrl">
                <el-input clearable v-model="props.leftTab.uidUrl" />
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item label="填写互斥ID">
                <el-checkbox
                  v-model="props.leftTab.mutualExclusion"
                  style="top: -4px"
                  size="large"
                  :true-value="1"
                  :false-value="2"
                />
              </el-form-item>
            </el-col>
            <el-col v-if="props.leftTab.mutualExclusion === 1" :span="12">
              <el-form-item label="互斥ID">
                <el-input clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card>
          <template #header>
            <div
              style="display: flex; justify-content: space-between"
              class="card-header"
            >
              <span>描述配额</span>
              <el-button type="primary" link size="default" @click="isHieght">
                {{ fold ? "收起" : "展开" }}
              </el-button>
            </div>
          </template>
          <div v-if="fold">
            <el-form-item label="上传图片">
              <!-- <el-upload
                class="upload-demo"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
              >
                <el-icon class="el-icon--upload">
                  <UploadFilled />
                </el-icon>
                <div class="el-upload__text">
                  在这里放下文件或点击 <em>上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload> -->
              <el-upload
                action="http://saas-api.surveysaas.com/project/uploadQiniu"
                list-type="picture-card"
                :limit="1"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-exceed="handleExceed"
              >
                <el-icon class="el-icon--upload">
                  <UploadFilled />
                </el-icon>
                <div class="el-upload__text">上传</div>
                <template #tip>
                  <div class="el-upload__tip">jpg/png单文件大小小于10 mb</div>
                </template>
              </el-upload>

              <el-dialog
                v-model="dialogVisible"
                style="
                  z-index: 1000;
                  transform: translate(0);
                  position: relative;
                "
              >
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="项目描述">
                  <!-- key解决富文本编译器   先添加  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
                  <Editor
                    class="editor"
                    :value="props.leftTab.richText"
                    :plugins="plugins"
                    :locale="zhHans"
                    @change="handleChange"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card>
          <template #header>
            <div class="card-header">
              <span>其他设置</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="3">
              <el-form-item label="置顶">
                <el-switch
                  :active-value="1"
                  :inactive-value="2"
                  v-model="props.leftTab.isPinned"
                />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="在线">
                <el-switch
                  :active-value="1"
                  :inactive-value="2"
                  v-model="props.leftTab.isOnline"
                />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="资料">
                <el-switch
                  :active-value="1"
                  :inactive-value="2"
                  v-model="props.leftTab.isProfile"
                />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="B2B">
                <el-switch
                  :active-value="1"
                  :inactive-value="2"
                  v-model="props.leftTab.isB2b"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="props.leftTab.isB2b === 1">
              <el-form-item label="项目类型">
                <el-select v-model="props.leftTab.projectType"></el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="定时发布">
                <el-switch
                  :active-value="1"
                  :inactive-value="2"
                  v-model="props.leftTab.isTimeReleases"
                />
              </el-form-item>
            </el-col>
            <!-- 定时发布开显示时间，关隐藏 -->
            <el-col :span="6" v-if="props.leftTab.isTimeReleases === 1">
              <el-form-item label="发布时间">
                <el-date-picker
                  type="datetime"
                  v-model="props.leftTab.releaseTime"
                  placeholder="请选择时间"
                />
              </el-form-item>
            </el-col>
            <br />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-form-item label="备注">
                <el-input
                  maxlength="200"
                  show-word-limit
                  style="width: 29rem"
                  type="textarea"
                  :rows="5"
                  v-model="props.leftTab.remark"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </ElForm>
    </el-tab-pane>
    <el-tab-pane label="配置信息" v-if="props.leftTab.isProfile === 1">
      <el-card>
        <template #header>
          <div class="card-header">配置信息</div>
        </template>
        <el-row :gutter="20">
          <!-- 等字典接口 -->
          <el-col :span="6">
            <el-form-item label="选择国家">
              <el-select
                v-model="props.leftTab.addProjectQuotaInfoList.country"
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="Select"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="问卷名称">
              <el-select
                v-model="props.leftTab.addProjectQuotaInfoList.projectProblemId"
                multiple
                collapse-tags
                collapse-tags-tooltip
                placeholder="Select"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="allocation" :gutter="20">
          <el-col :span="20"> 问题：性别 </el-col>
          <el-col :span="20">
            <el-form-item>
              <el-radio-group>
                <el-radio value="1" size="large"> 男 </el-radio>
                <el-radio value="2" size="large"> 女 </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="allocation" :gutter="20">
          <el-col :span="20"> 问题：支持终端 </el-col>
          <el-col :span="20">
            <el-form-item>
              <el-checkbox-group>
                <el-checkbox label="PC" value="Value A" />
                <el-checkbox label="平板" value="Value B" />
                <el-checkbox label="Mobile" value="Value C" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="allocation" :gutter="20">
          <el-col :span="20"> 问题：年龄 </el-col>
          <el-col :span="20">
            <el-form-item>
              <el-form-item style="width: 30rem" label="年龄">
                <el-slider v-model="value" range show-stops :max="100" />
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item style="width: 30rem" label="年龄">
              <el-slider v-model="value" range show-stops :max="100" />
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="安全信息">
      <el-card>
        <template #header>
          <div class="card-header">安全信息</div>
        </template>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="小时准入量">
              <el-input-number
                v-model="props.leftTab.preNum"
                :min="1"
                :step="1"
                step-strictly
                controls-position="right"
                size="large"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="小时完成量">
              <el-input-number
                v-model="props.leftTab.limitedQuantity"
                :min="1"
                :step="1"
                step-strictly
                controls-position="right"
                size="large"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="时差检测">
              <el-switch
                v-model="props.leftTab.timeDifferenceDetection"
                :active-value="1"
                :inactive-value="2"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="重复IP检测">
              <el-switch
                v-model="props.leftTab.ipDifferenceDetection"
                :active-value="1"
                :inactive-value="2"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="IP一致性检测">
              <el-switch
                v-model="props.leftTab.ipConsistency"
                :active-value="1"
                :inactive-value="2"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep(.editor) {
  width: 100%;
}

.page-main {
  .search-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    margin-bottom: -18px;

    :deep(.el-form-item) {
      grid-column: auto / span 1;

      &:last-child {
        grid-column-end: -1;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }
}

.allocation {
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px dashed #d5d5d5;
}

:deep {
  .el-input-number,
  .el-select,
  .el-select__wrapper,
  .el-input__wrapper,
  .el-cascader,
  .el-form-item__content {
    width: 100% !important;
    min-width: 10.5rem !important;
  }

  td .el-form-item {
    margin: 0;
  }

  .bytemd-body {
    height: calc(100% - 41px);
  }

  .el-input-number.is-controls-right[class*="large"] [class*="decrease"],
  .el-input-number.is-controls-right[class*="large"] [class*="increase"] {
    --el-input-number-controls-height: none;
  }

  .el-input__wrapper {
    height: 2rem;
    width: 10.75rem;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  /* 使边框合并 */
}

th,
td {
  padding: 10px;
  /* 单元格内部填充 */
  text-align: center;
  /* 文本左对齐 */
  border: 1px solid #e4e7ed;
  /* 给每个单元格添加边框 */
}

th {
  background-color: #efefef;
  /* 表头背景颜色 */
  line-height: 100%;
  font-weight: bold;
  /* 表头文字加粗 */
}

tr:hover {
  background-color: #f9f9f9;
  /* 鼠标悬停效果 */
}
</style>
