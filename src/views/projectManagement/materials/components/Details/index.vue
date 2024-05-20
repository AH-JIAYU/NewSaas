<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Details',
})
// 弹框开关变量
const dialogTableVisible = ref(false)
const total = ref()
// 提交数据
function onSubmit() {}
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
    <el-drawer
      v-model="dialogTableVisible"
      title="详情"
      direction="rtl"
      :before-close="closeHandler"
      size="40%"
    >
      <el-divider content-position="left" />
      <el-form label-width="80px" :inline="false">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目ID">
              <el-input
                placeholder=""
                clearable
                @change=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input
                placeholder=""
                clearable
                @change=""
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-input placeholder="" clearable @change="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary">
          下载
        </el-button>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="dialogTableVisible = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
