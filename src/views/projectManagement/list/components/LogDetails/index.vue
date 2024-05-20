<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'LogDetails',
})
const dialogTableVisible = ref<any>(false)
const gridData = [
  { a: 1, b: '最小时长20更为30', id: 1 },
  { a: 1, b: '置顶开更为关', id: 1 },
]
function showEdit(row: any) {
  dialogTableVisible.value = true
}
// 暴露方法
defineExpose({ showEdit })
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      style="height: 20.5rem"
      title="详情"
      width="800"
    >
      <el-divider content-position="left" />

      <el-text class="mx-1">
        操作人: 迪迦
      </el-text>
      <el-text class="mx-1">
        操时间: 2024-05-21 13:14:21
      </el-text>
      <el-table style="margin-top: 10px" border :data="gridData">
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="150"
        />
        <el-table-column align="center" property="b" label="操作内容" />
      </el-table>
    </el-dialog>
  </div>
</template>
