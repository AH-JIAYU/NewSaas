<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Delete',
})
// 弹框开关变量
const dialogTableVisible = ref(false)
const total = ref()
// 提交数据
function onSubmit() {

}
// 父级传递数据
async function showEdit(row: any) {
  total.value = row.length
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
      title="删除"
      width="500"
      :before-close="closeHandler"
    >
      <div>确认删除这条项目素材吗?</div>
      <template #footer>
        <div style="flex: auto;">
          <el-button type="primary" @click="onSubmit">
            确定
          </el-button>
          <el-button @click="dialogTableVisible = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
