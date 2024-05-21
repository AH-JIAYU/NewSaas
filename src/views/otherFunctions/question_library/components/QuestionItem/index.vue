<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import type { DetailFormProps } from "../../types";
import api from "@/api/modules/otherFunctions_questionLibrary";
import { Delete } from "@element-plus/icons-vue";

const props = defineProps(["id", "item", "index"]);
const emits = defineEmits(["handle"]);
const preview = ref<any>(); // 预览绑定值
const formRef = ref<any>(); //ref
const form = ref<any>({
  id: props.id,
  question: "",
  questionType: 1,
  answerValue: [],
});

const rules = ref([]); //校验
const type = [
  { value: 1, label: "输入框" },
  { value: 2, label: "单选框" },
  { value: 3, label: "复选框" },
  { value: 4, label: "下拉框" },
];
// 类型切换
const changequestionType = (value: number) => {
  // 类型改变时 至少展示一个选项
  value !== 1 &&
    !form.value.answerValue.length &&
    form.value.answerValue.push("");
  // 切换类型后重置预览绑定的值
  preview.value = [];
};
// 新增选项
const addAnswerValue = () => {
  form.value.answerValue.push("");
};
// 删除选项
const handleDelOption = (index: Number) => {
  form.value.answerValue.splice(index, 1);
};
// 删除当前行
const handleDel = () => {
  emits("handle", props.index);
};
onMounted(() => {
  form.value = props.item;
});
</script>

<template>
  <div>
    <div class="item">
      <div class="left">
        <el-form :model="form" ref="formRef" label-width="80px" :inline="false">
          <el-form-item label="题目">
            <el-input v-model="form.question"></el-input>
          </el-form-item>
          <el-form-item label="选择类型">
            <el-select v-model="form.questionType" @change="changequestionType">
              <el-option
                v-for="item in type"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <template v-if="form.questionType !== 1">
            <el-form-item
              label="选项"
              v-for="(item, index) in form.answerValue"
            >
              <el-input v-model.trim="form.answerValue[index]">
                <template #append>
                  <el-button
                    type="danger"
                    :icon="Delete"
                    circle
                    @click="handleDelOption(index)"
                  />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" text @click="addAnswerValue">
                新增选项</el-button
              >
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class="right">
        <!-- 标题 -->
        <p>{{ form.question }}</p>
        <el-row>
          <!--输入框 -->
          <el-input
            v-if="form.questionType === 1"
            v-model="preview"
            clearable
          ></el-input>
          <!-- 单选框 -->
          <el-radio-group v-if="form.questionType === 2" v-model="preview">
            <el-radio v-for="item in form.answerValue" :value="item">{{
              item
            }}</el-radio>
          </el-radio-group>
          <!-- 复选框 -->
          <el-checkbox-group v-if="form.questionType === 3" v-model="preview">
            <el-checkbox
              v-for="item in form.answerValue"
              :label="item"
              :value="item"
            />
          </el-checkbox-group>
          <!-- 下拉框 -->
          <el-select v-if="form.questionType === 4" v-model="preview">
            <el-option
              v-for="item in form.answerValue"
              :key="item"
              :value="item"
              :label="item"
            />
          </el-select>
        </el-row>
      </div>
    </div>
    <el-row style="display: flex;justify-content: end;margin-top: 5px !important;">
      <el-button text type="info" @click="handleDel">删除</el-button>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.item {
  border: 2px dashed #d3d3d3;
  display: flex;
  justify-content: space-between;
  align-items: start;
  .left {
    padding: 3rem;
    border-right: 2px dashed #d3d3d3;
    width: 65%;
    position: relative;
  }
  .left::after {
    position: absolute;
    right: 0;
    top: 1rem;
    content: "预览\2192";
    color: #fff;
    background-color: #0b6ebd;
    transform: translateX(50%);
  }

  .right {
    padding: 3rem;
    width: 35%;
  }
}
:deep {
  // .el-input-group__append {
  //   background-color: #f56c6c;
  //   color: #fff;
  // }
}
</style>
