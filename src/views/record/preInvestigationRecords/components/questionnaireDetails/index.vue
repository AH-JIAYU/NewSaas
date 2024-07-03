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
