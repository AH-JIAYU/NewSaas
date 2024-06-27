<script setup lang="ts">
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { obtainLoading, submitLoading } from "@/utils/apiLoading";
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

import { ElMessage } from "element-plus";
import api from "@/api/modules/otherFunctions_screenLibrary";
import {
  proces,
  convertData,
  setSurveyType,
  customComponents,
} from "@/utils/screen_library";

editorLocalization.currentLocale = "zh-cn";
surveyLocalization.supportedLocales = ["en", "fr", "zh-cn"]; //语言可以用字典接口的语言

setLicenseKey(
  "ZjU4MjI0NjMtN2YzYi00ZDMyLWEyYmEtOTliMmVhZmEyODc5OzE9MjAyNS0wMi0yNA=="
);
// 添加属性id type 不能直接使用id 会冲突 报错
Serializer.addProperty("question", { name: "surveyId" });
Serializer.addProperty("question", { name: "surveyType" });
Serializer.addProperty("itemvalue", { name: "surveyId" });
Serializer.addProperty("itemvalue", { name: "surveyType" });

const props = defineProps(["id", "details", "title"]);
const emits = defineEmits(["onSubmit"]);
const loading = ref(true);
const form = ref({
  projectProblemCategoryId: props.id,
  addProjectProblemInfoList: [], // 问卷对象 后端用
  projectJson: "", // 问卷json 前端用
});
const delList = ref<any>([]); // 编辑时所删除的问题和答案  提交编辑的时候一起调删除接口
const creatorOptions: ICreatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  showTranslationTab: true,
};
let creator: any;
onMounted(async () => {
  // 清空自定义问题
  ComponentCollection.Instance.clear();
  // #region 模板
  const res = await obtainLoading(customComponents());
  res.forEach((component: any) => {
    // 使用 Serializer.findClass来检查组件是否已注册
    try {
      if (component === undefined) {
        return console.error("");
      } else {
        if (!Serializer.findClass(component.name)) {
          ComponentCollection.Instance.add({
            name: component.name,
            title: component.title,
            questionJSON: component.questionJSON,
            onInit() {
              Serializer.addProperty("shippingaddress", {
                name: component.name,
                visible: true,
                readOnly: true, // 模板问题不能修改
                // default: "hidden",
              });
            },
          });
        }
      }
    } catch (error) {
      console.error("有一个处理数据为空");
    }
  });

  // #endregion

  // #region survey.js
  creator = new SurveyCreatorModel(creatorOptions);
  //以下代码将调查左侧的工具箱进行类型分类。
  //通过https://surveyjs.io/form-library/documentation/api-reference/question#getType 来查看工具类名称
  creator.toolbox.allowExpandMultipleCategories = true; // 允许用户展开多个类别
  creator.toolbox.showCategoryTitles = true; // 分类显示
  creator.text = "";
  creator.saveSurveyFunc = (saveNo: number, callback: any) => {
    window.localStorage.setItem("survey-json", creator.text);
    callback(saveNo, true);
  };
  creator.onUploadFile.add((_: any, options: any) => {
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
  // 新增问题事件 添加id
  creator.onQuestionAdded.add(async function (sender: any, options: any) {
    //  #region  判重  模板的问题重复， id也会重复 后端会报错
    const toolboxJSON = ComponentCollection.Instance;
    const toolbox = creator.JSON;
    proces(toolbox, toolboxJSON);
    let findData: any = [];
    toolbox.pages.forEach((item: any) => {
      item.elements.forEach((ite: any) => {
        if (
          ite.surveyId ===
          options.question.customQuestion.json.questionJSON.surveyId
        ) {
          findData.push(ite);
          return;
        }
      });
    });
    // #endregion
    if (findData.length > 1) {
      // 删除当前问题
      sender.deleteElement(sender.selectedElement);
      ElMessage.warning({
        message: "已有该问题,不可重复设置",
        center: true,
      });
      return;
    }
    // options.question.contentQuestion 问题内容 只有问题是自定义的时候才会有这个属性
    if (!options.question.contentQuestion) {
      var q = options.question;
      q.choices = [];
      const res = await obtainLoading(api.getId({}));
      q.surveyType = 1; //1:表示前端生成(新增操作) 2:表示后端返回(修改操作)
      q.surveyId = res.data.id;
    }
  });
  // 新增答案事件 添加id
  creator.onItemValueAdded.add(async function (sender: any, options: any) {
    const res = await obtainLoading(api.getId({}));
    var q = options.newItem;
    q.surveyType = 1; //1:表示前端生成(新增操作) 2:表示后端返回(修改操作)
    q.surveyId = res.data.id;
  });
  // 删除问题
  creator.onElementDeleting.add(async function (sender: any, options: any) {
    if (options.element.surveyType === 2) {
      const params = {
        id: options.element.surveyId,
        type: 1,
      };
      delList.value.push(params);
    }
  });
  // // 修改事件
  creator.onSurveyPropertyValueChanged.add(async function (
    sender: any,
    options: any
  ) {
    // 判断是否是删除答案的事件
    if (
      options.name === "choices" &&
      options.newValue.length === 0 &&
      options.newValue.length < options.oldValue.length
    ) {
      if (options.oldValue[0].surveyType === 2) {
        const params = {
          id: options.oldValue[0].surveyId,
          type: 2,
        };
        delList.value.push(params);
      }
    }
  });
  // 保存
  creator.saveSurveyFunc = (saveNo: number, callback: any) => {
    callback(saveNo, true);
    emits("onSubmit");
  };
  // #endregion

  // #region  获取问卷
  delList.value = [];
  const { data } = await obtainLoading(api.getSurvey(props.id));
  let creatorText;
  if (!data.projectJson) {
    creatorText = {
      title: props.title,
    };
    creator.text = JSON.stringify(creatorText);
  } else {
    creatorText = JSON.parse(data.projectJson);
    creatorText.title = props.title;
    creator.text = setSurveyType(JSON.stringify(creatorText));
  }
  // #endregion
  loading.value = false;
});

defineExpose({
  submit() {
    return new Promise<void>(async (resolve) => {
      const toolboxJSON = ComponentCollection.Instance;
      const toolbox = creator.JSON;

      // 获取自定义问题的具体内容
      proces(toolbox, toolboxJSON);
      // 赋值JSON
      form.value.projectJson = JSON.stringify(toolbox);
      const locale = creator.JSON.locale || editorLocalization.currentLocale;
      // 问题list 后端需要的
      form.value.addProjectProblemInfoList = await convertData(
        toolbox.pages,
        locale
      );
      if (toolbox.title !== props.title) {
        const data = JSON.parse(props.details);
        data.categoryName = toolbox.title;
        submitLoading(api.edit(data));
      }
      // 删除问题和答案
      if (delList.value.length) {
        await submitLoading(
          api.deleteProjectProblem({
            deleteProjectProblemInfoList: delList.value,
          })
        );
      }
      // 编辑
      const { status } = await submitLoading(api.setSurvey(form.value));
      status === 1 &&
        ElMessage.success({
          message: "设置成功",
          center: true,
        });

      resolve();
    });
  },
});
</script>

<template>
  <div
    v-loading="loading"
    style="width: 100%; height: 93%; margin-bottom: 80px"
  >
    <div style="width: 100%; height: 100%">
      <survey-creator-component v-if="!loading" :model="creator" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
