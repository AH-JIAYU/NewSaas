<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { DetailFormProps } from "../../types";
import api from "@/api/modules/otherFunctions_screenLibrary";
import useUserStore from "@/store/modules/user";

import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

import {
  setLicenseKey,
  surveyLocalization,
  ComponentCollection,
  Serializer,
} from "survey-core";
import type { ICreatorOptions } from "survey-creator-core";
import { SurveyCreatorModel, editorLocalization } from "survey-creator-core";
import "survey-creator-core/i18n/french";
import "survey-creator-core/i18n/simplified-chinese";
import "survey-creator-core/survey-creator-core.i18n";

editorLocalization.currentLocale = "zh-cn";
surveyLocalization.supportedLocales = ["en", "fr", "zh-cn"]; //语言可以用字典接口的语言

setLicenseKey(
  "ZjU4MjI0NjMtN2YzYi00ZDMyLWEyYmEtOTliMmVhZmEyODc5OzE9MjAyNS0wMi0yNA=="
);

const props = defineProps(["id", "details"]);
const emits = defineEmits(["onSubmit"]);
const userStore = useUserStore();
const creatorOptions: ICreatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  showTranslationTab: true,
};

const creator = new SurveyCreatorModel(creatorOptions);
//以下代码将调查左侧的工具箱进行类型分类。
//通过https://surveyjs.io/form-library/documentation/api-reference/question#getType 来查看工具类名称
creator.toolbox.allowExpandMultipleCategories = true; // 允许用户展开多个类别
creator.toolbox.showCategoryTitles = true; // 分类显示
creator.text = "";
creator.saveSurveyFunc = (saveNo: number, callback: any) => {
  window.localStorage.setItem("survey-json", creator.text);
  callback(saveNo, true);
};
creator.onUploadFile.add((_, options) => {
  const formData = new FormData();
  options.files.forEach((file: File) => {
    formData.append(file.name, file);
  });
  fetch("https://example.com/uploadFiles", {
    method: "post",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      options.callback(
        "success",
        // A link to the uploaded file
        `https://example.com/files?name=${result[options.files[0].name]}`
      );
    })
    .catch((error) => {
      options.callback(error, "error");
    });
});

const loading = ref(false);
const form = ref({
  projectProblemCategoryId: props.id,
  addProjectProblemInfoList: [], // 问卷对象 后端用
  projectJson: "", // 问卷json 前端用
});

creator.saveSurveyFunc = (saveNo: number, callback: any) => {
  callback(saveNo, true);
  emits("onSubmit");
};

onMounted(async () => {
  const { data } = await api.getSurvey(props.id);
  creator.text = data.projectJson || "";
});

defineExpose({
  submit() {
    return new Promise<void>(async (resolve) => {
      form.value.projectJson = JSON.stringify(creator.JSON);
      const locale = creator.JSON.locale || editorLocalization.currentLocale;
      form.value.addProjectProblemInfoList = await convertData(
        creator.JSON.pages,
        locale
      );
      api.setSurvey(form.value).then(() => {
        ElMessage.success({
          message: "设置成功",
          center: true,
        });
        resolve();
      });
    });
  },
});
const typeMap: any = {
  text: 1, // 输入框
  radiogroup: 2, //单选
  checkbox: 3, // 复选
  dropdown: 4, // 下拉
};
// 转换数据
function convertData(originalData: any, locale: any) {
  const transformedData = originalData.flatMap((item: any) => {
    return item.elements.map((element: any) => {
      const questionType = typeMap[element.type] || 0;
      let question = element.name;
      if (element.title) {
        question =
          element?.title.default || element?.title[locale] || element.name;
      }
      // 新增一个问题，默认标题为name 改变标题后 字段在title里

      let addProjectAnswerInfoList = [];

      if (Array.isArray(element.choices)) {
        addProjectAnswerInfoList = element.choices.map((choice: any) => {
          let answerValue = choice.value || choice;
          let anotherName = "";
          if (typeof choice === "object") {
            //choice为对象说明至少改了显示文本
            //choice.text为对象 说明他改变了语言或者配置了译文 改变语言choice.text里没default字段
            if (typeof choice.text === "object") {
              // 默认为default 如果default不存在说明他一开始就切换了语言
              anotherName = choice.text.default || choice.text[locale];
            } else {
              anotherName = choice.text;
            }
          } else {
            anotherName = choice;
          }
          return {
            answerValue: answerValue,
            anotherName: anotherName,
          };
        });
      }

      return {
        question: question,
        questionType: questionType,
        addProjectAnswerInfoList,
      };
    });
  });
  return transformedData;
}
</script>

<template>
  <div
    v-loading="loading"
    style="width: 100%; height: 93%; margin-bottom: 80px"
  >
    <div style="width: 100%; height: 100%">
      <survey-creator-component :model="creator" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
