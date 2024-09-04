<script setup lang="ts">
import { Model } from "survey-core";
import "survey-core/defaultV2.min.css";
import api from "@/api/modules/record_preInvestigationRecords";
import { cloneDeep } from "lodash-es";

const data = reactive<any>({
  visible: false,
  survey: null,
});
// 获取所有正确答案的集合
const getAllCorrectAnswers = (data: any) => {
  // 合并后的结果数组
  let mergedProjectAnswerIds: any = [];

  // 遍历数组并处理每个对象的 projectCorrectAnswerId
  data.forEach((obj: any) => {
    if (obj.projectCorrectAnswerId.includes(',')) {
      // 如果 projectCorrectAnswerId 包含逗号，则按逗号分割成数组
      const ids = obj.projectCorrectAnswerId.split(',').map((id: any) => id.trim());
      mergedProjectAnswerIds = mergedProjectAnswerIds.concat(ids);
    } else {
      // 否则直接作为单个元素处理
      mergedProjectAnswerIds.push(obj.projectCorrectAnswerId.trim());
    }
  });
  return mergedProjectAnswerIds
}


// 显隐
const showEdit = async (row: any) => {
  const res = await api.getDetail({ id: row.id });

  const projectJson = cloneDeep(JSON.parse(res.data.projectJson));
  // 回显用户选择的答案
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
          // 默认答案（用户选择的答案）
          ite.defaultValue = findDataRadio.map((value: any) => value.value);
        }
      }
    });
  });

  data.survey = new Model(JSON.stringify(projectJson));
  data.survey.showNavigationButtons = false;
  // 获取所有正确答案的集合
  const allCorrectAnswersList = getAllCorrectAnswers(res.data.projectSurveyScreenDetailInfoList)
  // 正确答案范围 文字红色
  data.survey.onUpdateChoiceItemCss.add(function (
    sender: any,
    options: any
  ) {
    if (allCorrectAnswersList.includes(options.item.jsonObj.surveyId)) {
      options.css += ' choicesItemRed'
    }
  });

  data.visible = true;
};

onMounted(async () => { });
defineExpose({ showEdit });
</script>

<template>
  <div>
    <ElDrawer v-model="data.visible" title="查看" size="80%" :close-on-click-modal="false" destroy-on-close>
      <SurveyComponent v-if="data.survey" :model="data.survey" style="width: 100%" />
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
