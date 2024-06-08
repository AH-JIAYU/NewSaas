<script setup lang="ts">
// 配置富文本
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/lib/locales/zh_Hans.json";
import "bytemd/dist/index.css";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import { obtainLoading } from "@/utils/apiLoading";
import { UploadFilled } from "@element-plus/icons-vue";
import fileApi from "@/api/modules/file";
import api from "@/api/modules/projectManagement";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典-国家
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import useProjectManagementListStore from "@/store/modules/projectManagement_list"; // 项目
import useStagedDataStore from "@/store/modules/stagedData"; // 暂存

const basicDictionaryStore = useBasicDictionaryStore(); //基础字典-国家
const customerStore = useUserCustomerStore(); // 客户
const projectManagementListStore = useProjectManagementListStore(); //项目
const stagedDataStore = useStagedDataStore(); // 暂存
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
let data = ref<any>({
  //基础设置
  basicSettings: {
    countryList: [], // 国家
    customerList: [], // 客户
  },
});
// 校验
const rules = ref<any>({
  name: [
    { required: true, message: "请输入项目名称", trigger: "blur" },
    { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
  ],
  projectIdentification: [
    { required: true, message: "请输入项目标识", trigger: "blur" },
    { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
  ],
  countryIdList: [
    {
      required: true,
      message: "请选择所属国家",
      type: "aray",
      trigger: "change",
    },
  ],
  clientId: [{ required: true, message: "请选择所属客户", trigger: "change" }],
  uidUrl: [{ required: true, message: "请输入UidUrl", trigger: "blur" }],
  doMoneyPrice: [
    { required: true, message: "请输入原价(美元)", trigger: "blur" },
  ],
  num: [{ required: true, message: "请输入配额", trigger: "blur" }],
  ir: [{ required: true, message: "请输入配额", trigger: "blur" }],
});
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

// 所属国家改变重新获取 配置信息中的国家
const changeCountryId = () => {
  props.leftTab.data.configurationInformation.configurationCountryList = null;
};
// 配置国家改变 重新获取题库目录
const changeConfigurationCountryId = () => {
  props.leftTab.data.configurationInformation.projectCategoryList = null; // 题库目录
  clearData();
};
// 清除数据
const clearData = () => {
  props.leftTab.data.configurationInformation.initialProblem.projectProblemId =
    null; // 题库绑定值
  props.leftTab.data.configurationInformation.ProjectProblemInfoList = null; // 题库下对应的答案
  props.leftTab.addProjectQuotaInfoList = []; // 提交的答案集合
};

// 获取国家集合
const changeTab = async (val: any) => {
  if (
    val === "configurationInformation" &&
    !props.leftTab.data.configurationInformation.configurationCountryList
  ) {
    clearData();
    const res = await obtainLoading(
      api.getProjectCountryList({
        countryIdList: props.leftTab.countryIdList,
      })
    );
    // 配置-国家
    props.leftTab.data.configurationInformation.configurationCountryList =
      res.data.getProjectCountryListInfoList;
    // 初始化 数据 问题
    props.leftTab.data.configurationInformation.initialProblem = cloneDeep(
      projectManagementListStore.initialProblem
    );
    // 问题类型:1:总控问题 2:租户自己问题
    props.leftTab.data.configurationInformation.initialProblem.projectQuotaQuestionType =
      res.data.projectQuotaQuestionType;
  }
};
// 获取题库目录
const getProjectCategoryList = async () => {
  if (props.leftTab.data.configurationInformation.initialProblem.countryId) {
    // 如果配置中的国家不存在就请求，反正不请
    if (!props.leftTab.data.configurationInformation.projectCategoryList) {
      const params = {
        countryId:
          props.leftTab.data.configurationInformation.initialProblem.countryId,
        projectQuotaQuestionType:
          props.leftTab.data.configurationInformation.initialProblem
            .projectQuotaQuestionType, //问题类型:1:总控问题 2:租户自己问题
      };
      const res = await obtainLoading(api.getProjectCategoryList(params));
      props.leftTab.data.configurationInformation.projectCategoryList =
        res.data.getProjectCategoryInfoList;
    }
  } else {
    ElMessage.warning({
      message: "请先选择国家",
      center: true,
    });
  }
};
// 根据目录id查询问题和答案表
const getProjectProblemList = async (id: string | number) => {
  if (id) {
    const { projectProblemCategoryName, ...params } =
      props.leftTab.data.configurationInformation.projectCategoryList.find(
        (item: any) => item.projectProblemCategoryId === id
      );
    const res = await obtainLoading(api.getProjectProblemList(params));
    //问题列表 - 显示的数据
    props.leftTab.data.configurationInformation.ProjectProblemInfoList =
      res.data.getProjectProblemInfoList;
    // 问题列表 - 提交的数据
    for (
      let i = 0;
      i <
      props.leftTab.data.configurationInformation.ProjectProblemInfoList.length;
      i++
    ) {
      const item = cloneDeep(
        props.leftTab.data.configurationInformation.initialProblem
      );
      item.projectProblemId =
        props.leftTab.data.configurationInformation.ProjectProblemInfoList[
          i
        ].id; // 问题
      item.keyValue =
        props.leftTab.data.configurationInformation.ProjectProblemInfoList[
          i
        ].question; // 问题id
      item.projectProblemCategoryId = id; // 目录id
      props.leftTab.addProjectQuotaInfoList.push(item);
    }
  }
};
// 设置 问题的答案和答案id  type: 1 输入框 2单选 3复选 4下拉
const setAnswerValue = (type: number, index: number) => {
  // 选择的id "" | []
  let id: any =
    props.leftTab.addProjectQuotaInfoList[index].projectAnswerIdList;
  // 答案列表 []
  const answerList: any =
    props.leftTab.data.configurationInformation.ProjectProblemInfoList[index]
      .getProjectAnswerInfoList;
  if (type == 2) {
    // 单选 id 为 ""
    id = [id];
  }
  const filteredData = answerList.filter((item: any) => id.includes(item.id));
  props.leftTab.addProjectQuotaInfoList[index].answerValueList =
    filteredData.map((item: any) => item.anotherName);
  if (type == 2) {
    props.leftTab.addProjectQuotaInfoList[index].answerValueList =
      props.leftTab.addProjectQuotaInfoList[index].answerValueList[0];
  }
};

// 获取 客户 国家
const getList = async () => {
  data.value.basicSettings.customerList = await customerStore.getCustomerList();
  data.value.basicSettings.countryList =
    await basicDictionaryStore.getCountry();
};
onMounted(async () => {
  await getList();
});
nextTick(() => {
  // 表单验证方法
  validate(formRef.value);
});
</script>

<template>
  <ElForm
    label-width="100px"
    :rules="rules"
    ref="formRef"
    :model="props.leftTab"
  >
    <el-tabs v-model="activeName" @tab-change="changeTab">
      <el-tab-pane label="基础设置" name="basicSettings">
        <el-card body-style="">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="项目名称" prop="name">
                <el-input v-model="props.leftTab.name" clearable />
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
                    v-for="item in data.basicSettings.customerList"
                    :key="item.tenantCustomerId"
                    :value="item.tenantCustomerId"
                    :label="item.customerAccord"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属国家" prop="countryIdList">
                <ElSelect
                  v-model="props.leftTab.countryIdList"
                  placeholder="国家"
                  clearable
                  filterable
                  multiple
                  collapse-tags
                  @change="changeCountryId"
                >
                  <ElOption
                    v-for="item in data.basicSettings.countryList"
                    :label="item.chineseName"
                    :value="item.id"
                  ></ElOption>
                </ElSelect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="原价(美元)" prop="doMoneyPrice">
                <el-input-number
                  v-model="props.leftTab.doMoneyPrice"
                  :min="1"
                  :precision="1"
                  :step="0.1"
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
                  :max="100"
                  controls-position="right"
                  size="large"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <template #label>
                  <div class="fx-c">
                    <el-tooltip
                      content="这份问卷必须要做到多少分钟"
                      placement="top"
                    >
                      <SvgIcon name="i-ri:question-line" class="ms-4" />
                    </el-tooltip>
                    <span>最小分长</span>
                  </div>
                </template>
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
                  :precision="1"
                  :step="0.1"
                  :max="100"
                  controls-position="right"
                  size="large"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="URL" prop="uidUrl">
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
                <el-input clearable v-model="props.leftTab.mutualExclusionId" />
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
              <el-form-item label="前置问卷">
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
                  :active-value="2"
                  :inactive-value="1"
                  v-model="props.leftTab.isB2b"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="props.leftTab.isB2b === 2">
              <el-form-item label="项目类型">
                <el-select v-model="props.leftTab.projectType"></el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="定时发布">
                <el-switch
                  :active-value="2"
                  :inactive-value="1"
                  v-model="props.leftTab.isTimeReleases"
                />
              </el-form-item>
            </el-col>
            <!-- 定时发布开显示时间，关隐藏 -->
            <el-col :span="6" v-if="props.leftTab.isTimeReleases === 2">
              <el-form-item label="发布时间">
                <el-date-picker
                  type="datetime"
                  value-format="YYYY-MM-DD hh:mm:ss"
                  v-model="props.leftTab.releaseTime"
                  placeholder="请选择时间"
                />
              </el-form-item>
            </el-col>
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
      </el-tab-pane>
      <el-tab-pane
        label="配置信息"
        name="configurationInformation"
        v-if="props.leftTab.isProfile === 1"
      >
        <el-card>
          <template #header>
            <div class="card-header">配置信息</div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="选择国家">
                <el-select
                  v-model="
                    props.leftTab.data.configurationInformation.initialProblem
                      .countryId
                  "
                  filterable
                  clearable
                  placeholder="Select"
                  @change="changeConfigurationCountryId"
                >
                  <ElOption
                    v-for="item in props.leftTab.data.configurationInformation
                      .configurationCountryList"
                    :label="item.countryName"
                    :value="item.countryId"
                  ></ElOption>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="问卷名称">
                <el-select
                  v-model="
                    props.leftTab.data.configurationInformation.initialProblem
                      .projectProblemId
                  "
                  clearable
                  placeholder="Select"
                  @focus="getProjectCategoryList"
                  @change="getProjectProblemList"
                >
                  <el-option
                    v-for="item in props.leftTab.data.configurationInformation
                      .projectCategoryList"
                    :key="item.projectProblemCategoryId"
                    :label="item.projectProblemCategoryName"
                    :value="item.projectProblemCategoryId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 1 输入框 2单选 3复选 4下拉  -->

          <template
            v-if="
              props.leftTab.data.configurationInformation
                .ProjectProblemInfoList &&
              props.leftTab.data.configurationInformation.ProjectProblemInfoList
                .length
            "
          >
            <el-row
              class="allocation"
              :gutter="20"
              v-for="(item, index) in props.leftTab.data
                .configurationInformation.ProjectProblemInfoList"
            >
              <el-col :span="20"> 问题：{{ item.question }} </el-col>
              <el-col :span="20">
                <el-form-item>
                  <!-- 1输入框 -->
                  <el-input
                    v-if="item.questionType === 1"
                    disabled
                    placeholder="输入框无法设置"
                  ></el-input>
                  <!-- 2单选 值为‘’-->
                  <el-radio-group
                    v-else-if="item.questionType === 2"
                    v-model="
                      props.leftTab.addProjectQuotaInfoList[index]
                        .projectAnswerIdList
                    "
                    @change="setAnswerValue(2, index)"
                  >
                    <el-radio
                      :value="ite.id"
                      size="large"
                      v-for="ite in item.getProjectAnswerInfoList"
                    >
                      {{ ite.anotherName }}
                    </el-radio>
                  </el-radio-group>
                  <!-- 3多选 值为[]-->
                  <el-checkbox-group
                    v-else-if="item.questionType === 3"
                    v-model="
                      props.leftTab.addProjectQuotaInfoList[index]
                        .projectAnswerIdList
                    "
                    @change="setAnswerValue(3, index)"
                  >
                    <el-checkbox
                      :label="ite.anotherName"
                      :value="ite.id"
                      v-for="ite in item.getProjectAnswerInfoList"
                    />
                  </el-checkbox-group>
                  <!-- 4下拉 值为[] -->
                  <el-select
                    v-else-if="item.questionType === 4"
                    v-model="
                      props.leftTab.addProjectQuotaInfoList[index]
                        .projectAnswerIdList
                    "
                    @change="setAnswerValue(4, index)"
                    multiple
                    placeholder="Select"
                    style="width: 240px"
                  >
                    <el-option
                      :label="ite.anotherName"
                      :value="ite.id"
                      v-for="ite in item.getProjectAnswerInfoList"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="安全信息" name="securityInformation">
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
  </ElForm>
</template>

<style lang="scss" scoped>
.fx-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
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
