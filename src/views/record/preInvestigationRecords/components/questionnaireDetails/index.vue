<script setup lang="ts">
import { Model } from "survey-core";
import "survey-core/defaultV2.min.css";
import api from "@/api/modules/record_preInvestigationRecords";
import { cloneDeep } from "lodash-es";
import { ElMessage } from "element-plus";
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
    if (obj.projectCorrectAnswerId.includes(",")) {
      // 如果 projectCorrectAnswerId 包含逗号，则按逗号分割成数组
      const ids = obj.projectCorrectAnswerId
        .split(",")
        .map((id: any) => id.trim());
      mergedProjectAnswerIds = mergedProjectAnswerIds.concat(ids);
    } else {
      // 否则直接作为单个元素处理
      mergedProjectAnswerIds.push(obj.projectCorrectAnswerId.trim());
    }
  });
  return mergedProjectAnswerIds;
};

// 显隐
const showEdit = async (row: any) => {
  const res = await api.getDetail({ id: row.id });

  const projectJson = cloneDeep(JSON.parse(res.data.projectJson));
  console.log(projectJson,'projectJson')
  if(!projectJson){
    ElMessage.warning({
              message: "无详情数据",
              center: true,
            });
  }else{
  // 回显用户选择的答案
  console.log(projectJson.pages,'projectJson.pages')
  projectJson.pages.forEach((item: any) => {
    item.elements.forEach((ite: any) => {
      ite.readOnly = true; //设为只读
      const findData = res.data.projectSurveyScreenDetailInfoList.find(
        (value: any) => value.projectProblemId === ite.surveyId,
      );
      if (findData) {
        if (ite.type === "radiogroup") {
          const findDataRadio = ite.choices.filter((value: any) =>
            findData.projectAnswerId.includes(value.surveyId),
          );
          // 默认答案（用户选择的答案）
          ite.defaultValue = findDataRadio.map((value: any) => value.value);
        }
        if(ite.type == 'text'){
          ite.defaultValue = findData.answerValue;
        }
      }
    });
  });


  data.survey = new Model(JSON.stringify(projectJson));
  data.survey.showNavigationButtons = false;
  // 获取所有正确答案的集合
  const allCorrectAnswersList = getAllCorrectAnswers(
    res.data.projectSurveyScreenDetailInfoList,
  );
  // 正确答案范围 文字红色
  data.survey.onUpdateChoiceItemCss.add(function (sender: any, options: any) {
    if (allCorrectAnswersList.includes(options.item.jsonObj.surveyId)) {
      options.css += " choicesItemRed";
    }
  });

  data.visible = true;




}


};

onMounted(async () => {});
defineExpose({ showEdit });
</script>

<template>
  <div>
    <ElDrawer
      v-model="data.visible"
      title=""
      size="80%"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <template #header>
        <div class="heade">
          <div class="title">
            查看
            <el-tooltip
              class="tooltips"
              content=""
              placement="top"
              effect="light"
            >
              <template #content>
                <div class="tooltip">
                  <div>
                    <div class="label"><span class="red">红色</span></div>
                    : 正确答案
                  </div>
                  <div>
                    <div class="label">
                      <span class="spot"></span>
                    </div>
                    : 所选答案
                  </div>
                </div>
              </template>
              <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
            </el-tooltip>
          </div>
        </div>
      </template>
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

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.red {
  color: red;
}
.spot {
  display: inline-block;
  width: var(--sjs-base-unit, var(--base-unit, 8px));
  height: var(--sjs-base-unit, var(--base-unit, 8px));
  border-radius: 50%;
  background-color: var(--sjs-general-forecolor, var(--foreground, #161616));
}
.tooltip {
  > div {
    display: flex;
    align-items: center;
    .label {
      width: 30px;
      text-align: center;
    }
  }
}
</style>
