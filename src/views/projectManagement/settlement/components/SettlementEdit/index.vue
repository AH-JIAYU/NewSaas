<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'SettlementEdit',
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
      title="项目结算编辑"
      width="600"
      :before-close="closeHandler"
    >
      <el-form ref="form" label-width="100px" :inline="false">
        <el-form-item label="项目ID">
          <el-text class="mx-1">
            3236382
          </el-text>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            placeholder=""
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="所属客户">
          <el-select>
            <el-option v-for="item in 4 " :key="item" :lable="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="原价(美元)">
          <el-input
            placeholder=""

            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="TC完成数">
          <el-input
            placeholder=""

            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="结算完成数">
          <el-input
            placeholder=""

            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            placeholder=""

            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="结算PO号">
          <el-input
            placeholder=""
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select>
            <el-option v-for="item in 4 " :key="item" :lable="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
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
