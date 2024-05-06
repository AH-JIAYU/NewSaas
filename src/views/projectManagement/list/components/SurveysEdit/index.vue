<script setup lang="ts">
defineOptions({
  name: 'SurveysEdit',
})
import { ref, watch } from 'vue'
import surveyLeftTabs from '../SurveyLeftTabs/index.vue'

const radio1 = ref(1)
// 弹框开关变量
const isShow = ref(false)
// 提交数据
function onSubmit() {

}
watch(() => radio1, (newVal) => {
  console.log('val', newVal)
})
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()
  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  isShow.value = false
}
defineExpose({ isShow })
</script>

<template>
  <div>
    <el-drawer
      v-model="isShow"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      size="70%"
      title=""
    >
      <surveyLeftTabs left-tabs-data="" validate-top-tabs="" />
      <template #footer>
        <el-button @click="closeHandler">
          取消
        </el-button>
        <el-button type="primary" @click="onSubmit">
          确定
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>
