<script setup lang="ts">
defineOptions({
  name: 'Edit',
})
import { ref } from 'vue'

const radio1 = ref(1)
// 弹框开关变量
const isShow = ref(false)
// 提交数据
function onSubmit() {

}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()

  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  isShow.value = false
}
// 暴露方法
defineExpose({ isShow })
</script>

<template>
  <div>
    <el-dialog
      v-model="isShow"
      title="编辑"
      width="600"
      :before-close="closeHandler"
    >
      <el-form ref="form" label-width="80px" :inline="false" size="normal">
        <el-form-item label="类型">
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio :value="1" size="large">
              指定价格
            </el-radio>
            <el-radio :value="2" size="large">
              指定关闭
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item  label="项目ID">
          <el-input placeholder="" size="normal" clearable @change=""></el-input>
        </el-form-item>
        <el-form-item v-if="radio1 === 1"  label="指定价格">
          <el-input placeholder="" size="normal" clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="会员">
          <el-input placeholder="" size="normal" clearable @change=""></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto;">
          <el-button type="primary" @click="onSubmit">
            添加
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
