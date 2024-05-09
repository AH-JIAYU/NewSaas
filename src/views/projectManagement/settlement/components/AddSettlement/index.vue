<script setup lang="ts">
defineOptions({
  name: 'AddSettlement',
})
import { ref } from "vue";
// 弹框开关变量
const isShow = ref(false);
// 提交数据
function onSubmit() {}
const replyData = async (row) => {
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
defineExpose({ isShow, replyData });
</script>

<template>
  <div>
    <el-dialog
      v-model="isShow"
      title="添加项目详情"
      width="700"
      :before-close="closeHandler"
    >
    <el-form  label-width="100px" :inline="false" size="normal">
      <el-tabs type="card">
        <el-tab-pane label="遗漏项目添加">
          <el-form-item label="项目ID">
            <el-input/>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="回访项目添加">
          <el-form-item label="回访项目ID">
            <el-input/>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input/>
          </el-form-item>
          <el-form-item label="项目标识">
            <el-input/>
          </el-form-item>
          <el-form-item label="价格$">
            <el-input/>
          </el-form-item>
          <el-form-item label="已加入回访ID">
            <el-input/>
          </el-form-item>
          <el-form-item label="GUID">
            <el-input type="textarea" :rows="15" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="已完结项目补加">
          <el-form-item label="项目名称">
            <el-input/>
          </el-form-item>
          <el-form-item label="价格$">
            <el-input/>
          </el-form-item>
          <el-form-item label="数量">
            <el-input/>
          </el-form-item>
          <el-form-item label="PO号">
            <el-input/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input/>
          </el-form-item>
          <el-form-item label="渠道">
            <el-select >
            <el-option />
            </el-select>

          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
          <el-button @click="isShow = false"> 取消 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
