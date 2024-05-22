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

// 问卷默认展示数据
const defaultJson = {
  pages: [
    {
      name: "Name",
      elements: [
        {
          name: "country",
          type: "dropdown",
          placeholder: "Select a country...",
          choicesByUrl: {
            url: "https://surveyjs.io/api/CountriesExample",
          },
        },
      ],
    },
  ],
};

const creator = new SurveyCreatorModel(creatorOptions);
creator.text =
  window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
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
  id: props.id,
  addProjectProblemInfoList: [], // 问卷对象 后端用
  projectJson: "", // 问卷json 前端用
});

creator.saveSurveyFunc = (saveNo: number, callback: any) => {
  callback(saveNo, true);
  console.log("保存");
  emits("onSubmit");
};

defineExpose({
  submit() {
    return new Promise<void>(async (resolve) => {
      form.value.projectJson = JSON.stringify(creator.JSON);
      form.value.addProjectProblemInfoList = await convertData(
        creator.JSON.pages
      );
      console.log("form.value", form.value);
      // api.edit(form.value).then(() => {
      //   ElMessage.success({
      //     message: "模拟编辑成功",
      //     center: true,
      //   });
      //   resolve();
      // });
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
function convertData(originalData: any) {
  const transformedData = originalData.flatMap((item: any) => {
    return item.elements.map((element: any) => {
      const questionType = typeMap[element.type] || 0;

      let question = element.name;

      if (element.title && element.title["zh-cn"]) {
        question = element.title["zh-cn"];
      }

      let addProjectAnswerInfoList = [];

      if (Array.isArray(element.choices)) {
        addProjectAnswerInfoList = element.choices.map((choice: any) => {
          let answerValue = "";
          let anotherName = "";

          if (typeof choice === "object") {
            answerValue = choice.value || "";
            if (choice.text && choice.text["zh-cn"]) {
              anotherName = choice.text["zh-cn"];
            }
          } else {
            answerValue = choice;
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
