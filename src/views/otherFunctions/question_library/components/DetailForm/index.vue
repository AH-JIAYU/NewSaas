<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { DetailFormProps } from "../../types";
import api from "@/api/modules/otherFunctions_questionLibrary";
import { cloneDeep } from "lodash-es";
import QuestionItem from "../QuestionItem/index.vue";

const props = withDefaults(defineProps<DetailFormProps>(), {
  id: "",
});

const loading = ref(false);
const formRef = ref<FormInstance>();
const form = ref<any>({
  countryIdList: [], //国家数组
  addProjectProblemInfoList: [],
});
const formRules = ref<FormRules>({
  countryIdList: [
    { required: true, message: "请选择问卷归属国家", trigger: "blur" },
  ],
});

const Initial = {
  // 问题初始值
  question: "",
  questionType: 1, // 1输入框 2单选框 3复选框 4下拉框
  answerValue: [], //答案 string[] ,分开
};
//新增问题
function handleAddQuestion() {
  form.value.addProjectProblemInfoList.push({ ...Initial });
}
//删除问题
function handleDelQuestion(index: Number) {
  form.value.addProjectProblemInfoList.splice(index, 1);
}

onMounted(() => {
  loading.value = true;
  if (!form.value.addProjectProblemInfoList.length) {
    getInfo();
  }
});

function getInfo() {
  form.value.addProjectProblemInfoList.push({ ...Initial }); // 默认展示一共题目
  loading.value = false;
}

defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      if (form.value.id === "") {
        formRef.value &&
          formRef.value.validate((valid) => {
            if (valid) {
              api.create(form.value).then(() => {
                ElMessage.success({
                  message: "模拟新增成功",
                  center: true,
                });
                resolve();
              });
            }
          });
      } else {
        formRef.value &&
          formRef.value.validate((valid) => {
            if (valid) {
              api.edit(form.value).then(() => {
                ElMessage.success({
                  message: "模拟编辑成功",
                  center: true,
                });
                resolve();
              });
            }
          });
      }
    });
  },
});
</script>

<template>
  <div v-loading="loading">
    <ElForm
      ref="formRef"
      :model="form"
      :rules="formRules"
      label-width="160px"
      label-suffix="："
    >
      <ElFormItem label="问卷归属国家" prop="countryIdList">
        <ElSelect
          v-model="form.countryIdList"
          placeholder="请选择问卷归属国家"
        />
      </ElFormItem>
      <template
        v-for="(item, index) in form.addProjectProblemInfoList"
        :key="item"
      >
        <QuestionItem
          :item="item"
          :index="index"
          @handle="handleDelQuestion"
        ></QuestionItem>
      </template>

      <ElFormItem>
        <el-button type="primary" text size="default" @click="handleAddQuestion"
          >新增问题</el-button
        >
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
