<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'ProjectReview',
})

const radio1 = ref(1)

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
      title="项目审核"
      width="800"
      :before-close="closeHandler"
    >
      <el-form ref="form" label-width="150px" :inline="false">
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
            <el-form-item label="参与/完成/配额/限量">
              <el-input
                placeholder=""
                clearable
                @change=""
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-radio-group v-model="radio1">
            <el-radio :value="1" size="large">
              按成功ID
            </el-radio>
            <el-radio :value="2" size="large">
              按失败ID
            </el-radio>
            <el-radio :value="3" size="large">
              全部通过
            </el-radio>
            <el-radio :value="4" size="large">
              全部失败
            </el-radio>
            <el-radio :value="5" size="large">
              数据冻结
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="radio1 === 1" label="通过ID">
          <el-input
            placeholder=""
            clearable
            :rows="5"
            type="textarea"
            @change=""
          />
        </el-form-item>
        <el-form-item v-if="radio1 === 2" label="失败ID">
          <el-input
            placeholder=""
            clearable
            :rows="5"
            type="textarea"
            @change=""
          />
        </el-form-item>
        <el-form-item v-if="radio1 === 4"  label="第一责任人">
          <el-input
            placeholder=""
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item v-if="radio1 === 4"  label="第二责任人">
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
        <el-form-item v-if="radio1 === 2 || radio1 === 1 || radio1 === 3" label="结算PO号">
          <el-input
            placeholder=""
            clearable
            @change=""
          />
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
