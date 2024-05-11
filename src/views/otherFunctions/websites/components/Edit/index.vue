<script setup lang="ts">
defineOptions({
  name: 'Edit',
})
import { ref } from 'vue'
const val = ref(1)
// 弹框开关变量
const dialogTableVisible = ref(false)
// 提交数据
function onSubmit() {

}
// 获取数据
const showEdit = async (row:any) => {
  dialogTableVisible.value = true;
};
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()

  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  dialogTableVisible.value = false
}
// 暴露方法
defineExpose({ showEdit })
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      title="编辑"
      width="700"
      :before-close="closeHandler"
    >
      <el-form ref="form" label-width="120px" :inline="false" >
        <el-form-item label="供应商ID">
         <el-tag type="success">cube</el-tag>
        </el-form-item>
        <el-form-item  label="网站名称">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="网站关键词">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="网站描述">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="网站备案号">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="状态">
          <el-switch :active-value="true" :inactive-value="false"/>
        </el-form-item>
        <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item  label="注册开关">
          <el-switch :active-value="true" :inactive-value="false"/>
        </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="注册审核">
          <el-switch :active-value="true" :inactive-value="false"/>
        </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item  label="推广">
          <el-switch :active-value="true" :inactive-value="false"/>
        </el-form-item>
        </el-col>
        </el-row>
        <el-form-item  label="账单生成">
          <el-radio-group v-model="val">
            <el-radio-button label="手动" :value="1" />
            <el-radio-button label="自动" :value="2" />
          </el-radio-group>
        </el-form-item>
        <el-form-item  label="账单手续费(%)">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="到期时间">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto;">
          <el-button type="primary" @click="onSubmit">
            确定
          </el-button>
          <el-button type="" @click="dialogTableVisible=false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
