<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Edit',
})

// 弹框开关变量
const dialogTableVisible = ref(false)
// 提交数据
function onSubmit() {

}
// 获取数据
async function showEdit(row: any) {
  dialogTableVisible.value = true
}
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
      <el-form label-width="80px" :inline="false">
        <el-form-item label="">
          <el-input placeholder="项目ID" clearable @change="" />
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="" clearable @change="" />
        </el-form-item>
        <el-form-item label="请粘贴GUID,每行一个">
          <el-input placeholder="" clearable @change="" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto;">
          <el-button type="primary" @click="onSubmit">
            确定
          </el-button>
          <el-button type="" @click="dialogTableVisible = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
