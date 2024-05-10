<script setup lang="ts">
defineOptions({
  name: 'Delete',
})
import { ref } from 'vue'
// 弹框开关变量
const isShow = ref(false)
const total = ref()
// 提交数据
function onSubmit() {

}
// 父级传递数据
const replyData = async (row: any) => {
  total.value = row.length
}
// 弹框关闭事件
function closeHandler() {
  isShow.value = false
}
// 暴露方法
defineExpose({ isShow, replyData })
</script>

<template>
  <div>
    <el-dialog v-model="isShow" title="删除" width="500" :before-close="closeHandler">
      <div>确认删除这条数据吗?</div>
      <template #footer>
        <div style="flex: auto;">
          <el-button type="primary" @click="onSubmit">
            确定
          </el-button>
          <el-button @click="isShow = false">
            取消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
