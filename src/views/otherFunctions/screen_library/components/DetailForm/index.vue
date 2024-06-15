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
import { convertData, setSurveyType, customComponents } from '@/utils/screen_library';

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

const props = defineProps(["id", "details"]);
const emits = defineEmits(["onSubmit"]);
const loading = ref(true);
const form = ref({
  projectProblemCategoryId: props.id,
  addProjectProblemInfoList: [], // 问卷对象 后端用
  projectJson: "", // 问卷json 前端用
});
const delList = ref<any>([]) // 编辑时所删除的问题和答案  提交编辑的时候一起调删除接口
const creatorOptions: ICreatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  showTranslationTab: true,


};
let creator: any
// const creator: any = new SurveyCreatorModel(creatorOptions);

// //以下代码将调查左侧的工具箱进行类型分类。
// //通过https://surveyjs.io/form-library/documentation/api-reference/question#getType 来查看工具类名称
// creator.toolbox.allowExpandMultipleCategories = true; // 允许用户展开多个类别
// creator.toolbox.showCategoryTitles = true; // 分类显示
// creator.text = "";
// creator.saveSurveyFunc = (saveNo: number, callback: any) => {
//   window.localStorage.setItem("survey-json", creator.text);
//   callback(saveNo, true);
// };
// creator.onUploadFile.add((_: any, options: any) => {
//   const formData = new FormData();
//   options.files.forEach((file: File) => {
//     formData.append(file.name, file);
//   });
//   fetch("https://example.com/uploadFiles", {
//     method: "post",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       options.callback(
//         "success",
//         // A link to the uploaded file
//         `https://example.com/files?name=${result[options.files[0].name]}`
//       );
//     })
//     .catch((error) => {
//       options.callback(error, "error");
//     });
// });
// // 新增问题事件 添加id
// creator.onQuestionAdded.add(async function (sender: any, options: any) {
//   var q = options.question;
//   q.choices = [];
//   const res = await obtainLoading(api.getId({}));
//   q.surveyType = 1; //1:表示前端生成(新增操作) 2:表示后端返回(修改操作)
//   q.surveyId = res.data.id;
// });
// // 新增答案事件 添加id
// creator.onItemValueAdded.add(async function (sender: any, options: any) {
//   const res = await obtainLoading(api.getId({}));
//   var q = options.newItem;
//   q.surveyType = 1; //1:表示前端生成(新增操作) 2:表示后端返回(修改操作)
//   q.surveyId = res.data.id;
// });
// // 删除问题
// creator.onElementDeleting.add(async function (sender: any, options: any) {
//   if (options.element.surveyType === 2) {
//     const params = {
//       id: options.element.surveyId,
//       type: 1
//     }
//     delList.value.push(params);
//   }
// })
// // // 修改事件
// creator.onSurveyPropertyValueChanged.add(async function (sender: any, options: any) {
//   // 判断是否是删除答案的事件
//   if (options.name === 'choices' && options.newValue.length === 0 && options.newValue.length < options.oldValue.length) {
//     if (options.oldValue[0].surveyType === 2) {
//       const params = {
//         id: options.oldValue[0].surveyId,
//         type: 2
//       }
//       delList.value.push(params);
//     }
//   }

// })
// // 保存
// creator.saveSurveyFunc = (saveNo: number, callback: any) => {
//   callback(saveNo, true);
//   emits("onSubmit");
// };





onMounted(async () => {

  // #region 模板
  const res = await obtainLoading(customComponents())
  console.log('res',res)
    res.forEach((component: any) => {
      // 使用Serializer.findClass来检查组件是否已注册
      try {
        if (component === undefined) {
          return console.error('')
        }
        else {
          if (!Serializer.findClass(component.name)) {
            ComponentCollection.Instance.add({
              name: component.name,
              title: component.title,
              questionJSON: component.questionJSON,
            })
          }
        }
      }
      catch (error) {
        console.error('有一个处理数据为空')
      }
    })

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
    var q = options.question;
    q.choices = [];
    const res = await obtainLoading(api.getId({}));
    q.surveyType = 1; //1:表示前端生成(新增操作) 2:表示后端返回(修改操作)
    q.surveyId = res.data.id;
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
        type: 1
      }
      delList.value.push(params);
    }
  })
  // // 修改事件
  creator.onSurveyPropertyValueChanged.add(async function (sender: any, options: any) {
    // 判断是否是删除答案的事件
    if (options.name === 'choices' && options.newValue.length === 0 && options.newValue.length < options.oldValue.length) {
      if (options.oldValue[0].surveyType === 2) {
        const params = {
          id: options.oldValue[0].surveyId,
          type: 2
        }
        delList.value.push(params);
      }
    }
  })
  // 保存
  creator.saveSurveyFunc = (saveNo: number, callback: any) => {
    callback(saveNo, true);
    emits("onSubmit");
  };
  // #endregion

  // #region  获取问卷
  delList.value = []
  const { data } = await obtainLoading(api.getSurvey(props.id));
  creator.text = setSurveyType(data.projectJson) || "";
  // #endregion

  loading.value=false
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
      // 删除问题和答案
      if (delList.value.length) {
        await submitLoading(api.deleteProjectProblem({ deleteProjectProblemInfoList: delList.value }))
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
  <div v-loading="loading" style="width: 100%; height: 93%; margin-bottom: 80px">
    <div style="width: 100%; height: 100%">
      <survey-creator-component v-if="!loading" :model="creator" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// scss</style>
