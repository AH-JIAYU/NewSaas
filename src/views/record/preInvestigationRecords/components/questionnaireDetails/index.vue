<script setup lang="ts">
import { Model } from "survey-core";
import "survey-core/defaultV2.min.css";
import api from "@/api/modules/record_preInvestigationRecords";
import { cloneDeep } from "lodash-es";

const data = reactive<any>({
  visible: false,
  survey: null,
});
const showEdit = async (row: any) => {
  const res = await api.getDetail({ id: row.id });

  const projectJson = cloneDeep(JSON.parse(res.data.projectJson));

  projectJson.pages.forEach((item: any) => {
    item.elements.forEach((ite: any) => {
      ite.readOnly = true; //设为只读
      const findData = res.data.projectSurveyScreenDetailInfoList.find(
        (value: any) => value.projectProblemId === ite.surveyId
      );

      if (findData) {
        if (ite.type === "radiogroup") {
          const findDataRadio = ite.choices.filter((value: any) =>
            findData.projectAnswerId.includes(value.surveyId)
          );

          ite.defaultValue = findDataRadio.map((value: any) => value.value);
        }
      }
    });
  });

  data.survey = new Model(JSON.stringify(projectJson));
  data.survey.onUpdateQuestionCssClasses.add(function (
    survey: any,
    options: any
  ) {
    // // .jsonObj.choices[0].cssClasses
    // console.log("survey, options", options.question.choices);
    // // options.question.choices[1].css = "color: 'red'";
    // options.question.choices[1].cssClasses.label += " sq-label";
    // options.question.choices[1].cssClasses.defaultSizeMode += " choicesItemRed";
    // options.question.choices[1].cssClasses.smallSizeMode += " choicesItemRed";
    // options.question.choices[1].cssClasses.itemWithTitle += " choicesItemRed";
    // options.question.choices[1].cssClasses.itemAsIcon += " choicesItemRed";
    // options.question.choices[1].cssClasses.itemActive += " choicesItemRed";
    // options.question.choices[1].cssClasses.itemPressed += " choicesItemRed";
    // options.question.choices[1].cssClasses.itemTitle += " choicesItemRed";
    // options.question.choices[1].cssClasses.itemTitleWithIcon += " choicesItemRed";
    // options.question.choices[1].cssClasses.label += " choicesItemRed";
    /**
     *
     * {
    "root": "sv-action-bar",
    "defaultSizeMode": "sv-action-bar--default-size-mode",
    "smallSizeMode": "sv-action-bar--small-size-mode",
    "item": "sv-action-bar-item choicesItemRed choicesItemRed",
    "itemWithTitle": "",
    "itemAsIcon": "sv-action-bar-item--icon",
    "itemActive": "sv-action-bar-item--active",
    "itemPressed": "sv-action-bar-item--pressed",
    "itemIcon": "sv-action-bar-item__icon",
    "itemTitle": "sv-action-bar-item__title",
    "itemTitleWithIcon": "sv-action-bar-item__title--with-icon",
    "label": "undefined choicesItemRed"
}
    */
    // var classes = options.cssClasses;

    // classes.mainRoot += " sv_qstn";
    // classes.root = "sq-root";
    // classes.title += " sq-title";
    // classes.item += " sq-item";
    // classes.label += " sq-label";

    // if (options.question.isRequired) {
    //   classes.title += " sq-title-required";
    //   classes.root += " sq-root-required";
    // }

    // if (options.question.getType() === "checkbox") {
    //   classes.root += " sq-root-cb";
    // }
  });

  data.visible = true;
};

onMounted(async () => {});
defineExpose({ showEdit });
</script>

<template>
  <div>
    <ElDrawer
      v-model="data.visible"
      title="查看"
      size="80%"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <SurveyComponent
        v-if="data.survey"
        :model="data.survey"
        style="width: 100%"
      />
      <template #footer>
        <ElButton size="large" @click="data.visible = false"> 取消 </ElButton>
        <ElButton type="primary" size="large" @click="data.visible = false">
          确定
        </ElButton>
      </template>
    </ElDrawer>
  </div>
</template>

<style scoped lang="scss"></style>
