<script setup lang="ts">
import type { DetailFormProps } from '../../types'
import DetailForm from '../DetailForm/index.vue'

// 父级传递数据
const props = defineProps(['id', 'row', 'mode'])
// 更新数据
const emits = defineEmits<{
  success: []
}>()
// 弹框开关
const visible = defineModel<boolean>({
  default: false,
})
// formRef
const formRef = ref()
// 标题
const title = computed(() => props.id === '' ? '新增文章公告' : '编辑文章公告')
// 提交
function onSubmit() {
  formRef.value.submit().then(() => {
    emits('success')
    onCancel()
  })
}
// 关闭弹框
function onCancel() {
  visible.value = false
}
</script>

<template>
  <div>
    <ElDialog v-if="props.mode === 'dialog'" v-model="visible" :title="title" width="600px" :close-on-click-modal="false" append-to-body destroy-on-close>
      <DetailForm ref="formRef" v-bind="props" />
      <template #footer>
        <div class="flex-c">
        <ElButton size="large" @click="onCancel">
          取消
        </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit">
          确定
        </ElButton>
        </div>
      </template>
    </ElDialog>
    <ElDrawer v-else-if="props.mode === 'drawer'" v-model="visible" :title="title" size="60%" :close-on-click-modal="false" destroy-on-close>
      <DetailForm ref="formRef" v-bind="props" />
      <template #footer>
        <div class="flex-c">
        <ElButton size="large" @click="onCancel">
          取消
        </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit">
          确定
        </ElButton>
      </div>
      </template>
    </ElDrawer>
  </div>
</template>
<style lang="scss" scoped>
.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
