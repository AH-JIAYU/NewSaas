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
      width="900"
      :before-close="closeHandler"
    >
      <el-divider content-position="left" />
      <el-row style="width: 868px; margin-left: 2px; margin-bottom: 20px;" :gutter="20">
          <div class="border">
            <p class="pp">项目编码</p>
            <p class="neip">111</p>
          </div>
          <div class="border">
            <p class="pp">项目名称</p>
            <p class="neip">222</p>
          </div>
          <div class="border">
            <p class="pp">配额/限量</p>
            <p class="neip">333</p>
          </div>
          <div class="border">
            <p class="pp">项目退款率</p>
            <p class="neip">333</p>
          </div>
        </el-row>

      <el-table  v-loading="false" row-key="id">
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column align="center" label="子会员ID" />
        <el-table-column align="center" label="姓名" />
        <el-table-column align="center" label="组长ID" />
        <el-table-column align="center" label="供应商ID" />
      </el-table>
      <el-table  v-loading="false" row-key="id">
        <el-table-column type="index" align="center" label="序号" width="55" />
        <el-table-column align="center" label="会员ID" />
        <el-table-column align="center" label="姓名" />
        <el-table-column align="center" label="组长ID" />
        <el-table-column align="center" label="会员组ID" />
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

<style lang="scss" scoped>
.border {
  display: flex;
  align-items: center;
  width: 13.5rem;
  height: 2.5625rem;
  margin: 0;
  border: 1px solid #ebeef5;
}
.pp {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 14px;
  color: #606266;
  background-color: #fafafa;
}
.neip {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 100%;
  color: #606266;
}
</style>
