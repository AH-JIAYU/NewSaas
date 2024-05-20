<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'RefundDetails',
})
// 弹框开关变量
const dialogTableVisible = ref(false)
// 提交数据
function onSubmit() {}
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
defineExpose({ showEdit })
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      title="项目退款详情"
      width="700"
      :before-close="closeHandler"
    >
      <el-divider content-position="left" />
      <el-form ref="form" label-width="80px" :inline="false">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目编码">
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
      </el-form>

      <el-table v-loading="false" row-key="id">
        <el-table-column align="center" label="子会员ID" />
        <el-table-column align="center" label="姓名" />
        <el-table-column align="center" label="组长ID" />
        <el-table-column align="center" label="组长姓名" />
        <el-table-column align="center" sortable label="退款数" />
        <el-table-column align="center" sortable label="退款率" />
        <el-table-column align="center" label="供应商ID" />
      </el-table>
      <template #footer>
        <div style="flex: auto">
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
