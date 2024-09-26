<script lang="ts" setup>
import { ref } from 'vue'

const loadingDisible = ref<boolean>(false)
const title = ref<string>('')
const loading = ref(false)
const fileDtail = ref()

// 回显
async function showEdit(row: any,val:any) {
  try {
    loadingDisible.value = true
    if (row) {
      loading.value = true
      if(val === 'certificate') {
        title.value = '证书详情'
      }else {
        title.value = '密钥详情'
      }
      fileDtail.value = row
      loading.value = false
    }
  } catch (error) {

  } finally {
    loading.value = false
  }
}
function close() {
  fileDtail.value = ''
  loadingDisible.value = false
}

// ... 这里可能还有其他逻辑 ...
defineExpose({
  showEdit,
})
</script>

<template>
  <div v-loading="loading">
    <el-dialog v-model="loadingDisible" append-to-body :close-on-click-modal="false" destroy-on-close :title="title"
      draggable width="50%" @close="close">
      <div class="isDiv">
        {{ fileDtail }}
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.isDiv {
    max-height: 600px;
    /* 设置最大高度 */
    overflow-y: auto;
    /* 超出部分出现滚动条 */
  }
</style>
