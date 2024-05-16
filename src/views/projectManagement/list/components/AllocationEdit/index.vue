<script setup lang="ts">
defineOptions({
  name: 'AllocationEdit',
})
import { ref, watch } from 'vue'

const radio1 = ref(1)
// 弹框开关变量
const dialogTableVisible = ref(false)
// 获取数据
const showEdit = (row:any) => {
  dialogTableVisible.value = true
}
// 提交数据
function onSubmit() {

}
watch(() => radio1, (newVal) => {
  console.log('val', newVal)
})
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
      title="分配"
      width="500"
      :before-close="closeHandler"
    >
      <el-table
        v-loading="false"
        row-key="id"
      >
        <el-table-column align="center" label="客户简称" />
        <el-table-column align="center" label="项目编码" />
        <el-table-column align="center" label="项目名称" />
      </el-table>
      <el-form ref="form" label-width="80px" :inline="false">
        <el-form-item label="分配目标" >
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio :value="1" size="large">
              自动分配
            </el-radio>
            <el-radio :value="2" size="large">
              供应商
            </el-radio>
            <el-radio :value="3" size="large">
              会员组
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="radio1 === 2" label="供应商">
          <el-select value-key="" placeholder="" clearable filterable>
            <el-option
              label="1111"
              :value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="radio1 === 3" label="会员组">
          <el-select value-key="" placeholder="" clearable filterable>
            <el-option
              label="1111"
              :value="3"
            />
          </el-select>
        </el-form-item>
      </el-form>

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

<style lang="scss" scoped>
:deep{
  .el-form-item.asterisk-left{
  align-items: center;
}

}


</style>
