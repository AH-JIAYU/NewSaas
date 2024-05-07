<script setup lang="ts">
defineOptions({
  name: 'Edit',
})
import { ref } from 'vue'

// 弹框开关变量
const isShow = ref(false)
// 提交数据
function onSubmit() {

}
// 父级传递数据
const replyData = async () => {
};
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
defineExpose({ isShow,replyData })
</script>

<template>
  <div>
    <el-dialog
      v-model="isShow"
      title="编辑"
      width="700"
      :before-close="closeHandler"
    >
      <el-form label-width="80px" :inline="false" >
        <el-form-item >
         <el-tag type="success">cube</el-tag>
        </el-form-item>
        <el-form-item  label="渠道">
          <el-select >
          <el-option/>
          </el-select>
        </el-form-item>
        <el-form-item  label="发票编号">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="发票金额">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="手续费(税)">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="实际收款">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="发票状态">
          <el-select >
          <el-option/>
          </el-select>
        </el-form-item>
        <el-form-item  label="开票日期">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="收款日期">
          <el-input placeholder=""  clearable @change=""></el-input>
        </el-form-item>
        <el-form-item  label="备注">
          <el-input placeholder="备注说明"  clearable :rows="15"  type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto;">
          <el-button type="primary" @click="onSubmit">
            确定
          </el-button>
          <el-button type="" @click="isShow=false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
