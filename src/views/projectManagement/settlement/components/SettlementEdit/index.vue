<script setup lang="ts">
defineOptions({
  name: 'SettlementEdit',
})
import { ref } from "vue";

// 弹框开关变量
const isShow = ref(false);
// 提交数据
function onSubmit() {}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()
  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  isShow.value = false
}
defineExpose({ isShow });
</script>

<template>
  <div>
    <el-dialog
      v-model="isShow"
      title="项目结算编辑"
      width="600"
      :before-close="closeHandler"
    >
      <el-form ref="form" label-width="100px" :inline="false" size="normal">
        <el-form-item label="项目ID">
          <el-text class="mx-1">3236382</el-text>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            placeholder=""
            size="normal"
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="价格$">
          <el-input
            placeholder=""
            size="normal"
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="tc完成数">
          <el-input
            placeholder=""
            size="normal"
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="结算完成数">
          <el-input
            placeholder=""
            size="normal"
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            placeholder=""
            size="normal"
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="结算PO号">
          <el-input
            placeholder=""
            size="normal"
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select >
          <el-option>
          </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="客户简称">
          <el-select >
          <el-option>
          </el-option>
          </el-select>

        </el-form-item>
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
