<script setup lang="ts">
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

import { setLicenseKey, surveyLocalization } from "survey-core";
import {
  ICreatorOptions,
  SurveyCreatorModel,
  editorLocalization,
} from "survey-creator-core";
import "survey-creator-core/i18n/french";
import "survey-creator-core/i18n/simplified-chinese";
import "survey-creator-core/survey-creator-core.i18n";
editorLocalization.currentLocale = "zh-cn";
surveyLocalization.supportedLocales = ["en", "fr", "zh-cn"];

setLicenseKey(
  "ZjU4MjI0NjMtN2YzYi00ZDMyLWEyYmEtOTliMmVhZmEyODc5OzE9MjAyNS0wMi0yNA=="
);

const creatorOptions: ICreatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  showTranslationTab: true,
};

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
      options.callback(error);
    });
});
</script>

<template>
  <div style="width: 100%; height: 95%;">
    <survey-creator-component :model="creator" />
  </div>
</template>
