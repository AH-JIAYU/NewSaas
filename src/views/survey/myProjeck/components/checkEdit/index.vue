<script setup lang="ts">
defineOptions({
  name: 'checkEdit',
})
import { ref } from 'vue'

// 弹框开关变量
const isShow = ref(false)
const total = ref();
// 提交数据
function onSubmit() {

}
// 父级传递数据
const replyData = async (row:any) => {
  total.value = row.length;
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
defineExpose({ isShow })
</script>

<template>
  <div>
    <el-dialog
      v-model="isShow"
      title="项目测试"
      width="500"
      :before-close="closeHandler"
    >
      <el-form ref="form" label-width="80px" :inline="false" size="normal">
        <el-form-item  label="PID">
          <el-text class="mx-1" type="success">3241479</el-text>
        </el-form-item>
        <el-form-item  label="项目名称">
          <el-text class="mx-1" type="danger">PO2303171004W101050 NZ</el-text>
        </el-form-item>
        <el-form-item >
          <el-button type="success" round plain size="default" @click="">直接进入</el-button>
          <el-button type="danger"  round plain size="default" @click="">复制链接</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
