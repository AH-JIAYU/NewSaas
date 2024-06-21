<script setup lang="ts">
import DetailForm from '../DetailForm/index.vue'

// 父级传递数据
const props = defineProps(['id', 'mode', 'row'])
// 更新
const emits = defineEmits<{
  success: []
}>()
// 弹框变量
const visible = defineModel<boolean>({
  default: false,
})

const formRef = ref()
// 标题
const title = computed(() => props.id === '' ? '新增用户' : '编辑用户')
// 提交
function onSubmit() {
  // submit() 为组件内部方法
  formRef.value.submit().then(() => {
    emits('success')
    onCancel()
  })
}
// 取消
function onCancel() {
  visible.value = false
  formRef.value.onCancel()
}
</script>

<template>
  <div>
    <ElDialog v-if="props.mode === 'dialog'" v-model="visible" :title="title" width="600px" :close-on-click-modal="false" append-to-body destroy-on-close>
      <DetailForm ref="formRef" v-bind="props" />
      <template #footer>
        <ElButton size="large" @click="onCancel">
          取 消
        </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit">
          确 定
        </ElButton>
      </template>
    </ElDialog>
    <ElDrawer v-else-if="props.mode === 'drawer'" v-model="visible" :title="title" size="600px" :close-on-click-modal="false" destroy-on-close>
      <DetailForm ref="formRef" v-bind="props" />
      <template #footer>
        <ElButton size="large" @click="onCancel">
          取 消
        </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit">
          确 定
        </ElButton>
      </template>
    </ElDrawer>
  </div>
</template>
