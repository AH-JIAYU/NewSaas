<script setup lang="ts">
import DetailForm from '../DetailForm/index.vue'

// 父级传递数据
const props = defineProps(['id', 'row', 'mode'])
// 更新
const emits = defineEmits<{
  success: []
}>()
// 阻止多次点击
const isClicked = ref(false);
// 弹窗
const visible = defineModel<boolean>({
  default: false,
})
const formRef = ref()
// 标题
const title = computed(() => props.id === '' ? '新增角色' : '编辑角色')
// 提交
function onSubmit() {
  // submit() 为组件内部方法
  // if (isClicked.value) return; // 如果已点击，则退出
  isClicked.value = true; // 设置为已点击状态
  formRef.value.submit().then(() => {
    emits('success')
    isClicked.value = false; // 可根据需要重置
    onCancel()
  })
}
// 取消
function onCancel() {
  visible.value = false
}
</script>

<template>
  <div>
    <ElDialog v-if="props.mode === 'dialog'" v-model="visible" :title="title" width="60%" :close-on-click-modal="false" append-to-body destroy-on-close>
      <DetailForm ref="formRef" v-bind="props" />
      <template #footer>
        <div class="flex-c">
          <ElButton size="large" @click="onCancel">
          取消
        </ElButton>
        <ElButton type="primary" size="large" :disabled="isClicked" @click="onSubmit">
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
<style scoped lang="scss">
.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
