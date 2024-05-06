<script setup lang="ts">
defineOptions({
  name: 'SyncSettings',
})
import { ref, watch } from 'vue'

const sync = [
  { label: '所属客户', value: 1 },
  { label: '1111', value: 1 },
  { label: '222222', value: 1 },
  { label: '所属客户', value: 1 },
  { label: '所属客户', value: 1 },
  { label: '所属客户', value: 1 },
  { label: '所属客户', value: 1 },
  { label: '所属客户', value: 1 },
  { label: '所属客户', value: 1 },
  { label: '所属客户', value: 1 },
  { label: '所属客户', value: 1 },
  { label: '所属客户', value: 1 },
  { label: '所属客户', value: 1 },
]
const sync1 = [
  { label: '描述配额', value: 1 },
  { label: '终端', value: 1 },
  { label: '性别', value: 1 },
  { label: '年龄', value: 1 },
]
const radio1 = ref(1)
// 弹框开关变量
const isShow = ref(false)
// 提交数据
function onSubmit() {

}
watch(() => radio1, (newVal) => {
})
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()
  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  isShow.value = false
}
// 暴露方法
defineExpose({ isShow })
</script>

<template>
  <div>
    <el-drawer
      v-model="isShow"
      append-to-body
      :close-on-click-modal="false"
      destroy-on-close
      draggable
      size="70%"
      title="同步模块设置"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-table border :data="sync" style="width: 100%;">
            <el-table-column prop="label" label="字段名称" />
            <el-table-column label="基本信息-同步信息">
              <template #default="{ row }">
                <el-switch
                  v-model="row.value"
                  class="ml-2"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table border :data="sync1" style="width: 100%;">
            <el-table-column prop="label" label="字段名称" />
            <el-table-column label="配置信息-同步信息">
              <template #default="{ row }">
                <el-switch
                  v-model="row.value"
                  class="ml-2"
                />
              </template>
            </el-table-column>
          </el-table>
          <el-switch inactive-text="指定项目同步" />
        </el-col>
      </el-row>
      <template #footer>
        <el-button @click="closeHandler">
          取消
        </el-button>
        <el-button type="primary" @click="onSubmit">
          确定
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>
