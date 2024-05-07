<script setup lang="ts">
defineOptions({
  name: 'InvoicingEdit',
})
import { ref } from 'vue'
const title = ref()
// 弹框开关变量
const isShow = ref(false)
// 提交数据
function onSubmit() {

}
const replyData = async (id,row) => {
  title.value = id === 1 ? '开票' : '结算'
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
defineExpose({ isShow,replyData })
</script>

<template>
  <div>
    <el-dialog
      v-model="isShow"
      :title="title"
      width="500"
      :before-close="closeHandler"
    >
      <div>确认对项目ID+项目名称进行{{title}}操作吗?</div>
      <template #footer>
        <div style="flex: auto;">
          <el-button type="primary" @click="onSubmit">
            确定
          </el-button>
          <el-button @click="isShow = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
