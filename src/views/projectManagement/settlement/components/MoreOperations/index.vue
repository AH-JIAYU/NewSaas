<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'MoreOperations',
})
const title = ref()
// 弹框开关变量
const dialogTableVisible = ref(false)
// 提交数据
function onSubmit() {

}
// 获取数据
async function showEdit(row: any) {
  title.value = row === 1 ? '开票' : '结算'
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
defineExpose({ showEdit })
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      :title="title"
      width="600"
      :before-close="closeHandler"
    >
      <div>确认对一下项目进行{{ title }}操作吗?</div>
      <el-table
        v-loading="false"
        row-key="id"
      >
        <el-table-column width="80" type="index" align="center" label="序号" />
        <el-table-column align="center" label="项目ID" />
        <el-table-column align="center" label="项目名称" />
      </el-table>
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
