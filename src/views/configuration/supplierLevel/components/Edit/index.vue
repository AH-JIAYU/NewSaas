<script setup lang="ts">
defineOptions({
  name: 'ConfigurationSupplierLevelIndex',
})
const dialogTableVisible = ref(false)
const title = ref('')
const form = ref() // 表单
const formRef = ref() // 表单ref
const rules = reactive({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  number: [{ required: true, message: '请输入比例', trigger: 'blur' }],
})
async function showEdit(row: any) { // 显示弹框
  if (!row) {
    title.value = '添加'
    form.value = {}
  }
  else {
    title.value = '编辑'
    form.value = row
  }
  dialogTableVisible.value = true
}
function close() { // 关闭
  formRef.value.resetFields()
  dialogTableVisible.value = false
}
function onSubmit() { // 提交
  close()
}

defineExpose({ showEdit })
</script>

<template>
  <el-dialog v-model="dialogTableVisible" :title="title" width="600">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="等级名称" prop="name">
        <el-input v-model="form.name" maxlength="100" />
      </el-form-item>
      <el-form-item label="加成比例" prop="number">
        <el-input v-model="form.number" type="number">
          <template #append>
            %
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onSubmit">
          确定
        </el-button>
        <el-button @click="close">
          取消
        </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
// 样式
</style>
