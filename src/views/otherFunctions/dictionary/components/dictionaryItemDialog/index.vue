<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import apiDictionary from '@/api/modules/dictionary'

const props = withDefaults(
  defineProps<{
    dictionaryId: string | number
    id?: string | number
    tree: any[]
  }>(),
  {
    dictionaryId: '',
    id: '',
  },
)

const emits = defineEmits<{
  success: []
}>()

const visible = defineModel<boolean>({
  default: false,
})

const title = computed(() => props.id === '' ? '新增字典项' : '编辑字典项')

const formRef = ref<FormInstance>()
const form = ref({
  dictionaryId: props.dictionaryId,
  id: props.id,
  name: '',
  value: '',
  enable: true,
})
const formRules = ref<FormRules>({
  dictionaryId: [
    { required: true, message: '请选择所属字典' },
  ],
  name: [
    { required: true, message: '请输入字典项名称' },
  ],
  value: [
    { required: true, message: '请输入字典项键值' },
  ],
})

onMounted(() => {
  if (props.id !== '') {
    apiDictionary.itemDetail(props.id).then((res) => {
      // form.value.dictionaryId = res.data.dictionaryId
      form.value.id = res.data.id
      form.value.name = res.data.name
      form.value.value = res.data.value
      form.value.enable = res.data.enable
    })
  }
})

function onSubmit() {
  if (form.value.id === '') {
    formRef.value && formRef.value.validate((valid) => {
      if (valid) {
        apiDictionary.itemCreate(form.value).then(() => {
          ElMessage.success({
            message: '模拟新增成功',
            center: true,
          })
          emits('success')
          onCancel()
        })
      }
    })
  }
  else {
    formRef.value && formRef.value.validate((valid) => {
      if (valid) {
        apiDictionary.itemEdit(form.value).then(() => {
          ElMessage.success({
            message: '模拟编辑成功',
            center: true,
          })
          emits('success')
          onCancel()
        })
      }
    })
  }
}

function onCancel() {
  visible.value = false
}
</script>

<template>
  <ElDialog v-model="visible" :title="title" width="400px" :close-on-click-modal="false" append-to-body destroy-on-close @closed="onCancel">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="100px">
      <ElFormItem label="所属字典" prop="dictionaryId">
        <ElCascader v-model="form.dictionaryId" :options="tree" :props="{ value: 'id', emitPath: false, checkStrictly: true }" :show-all-levels="false" placeholder="请选择所属字典" />
      </ElFormItem>
      <ElFormItem label="字典项名称" prop="name">
        <ElInput v-model="form.name" placeholder="请输入字典项名称" clearable />
      </ElFormItem>
      <ElFormItem label="字典项键值" prop="value">
        <ElInput v-model="form.value" placeholder="请输入字典项键值" clearable />
      </ElFormItem>
      <ElFormItem label="状态" prop="enable">
        <ElSwitch v-model="form.enable" inline-prompt active-text="启用" inactive-text="禁用" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton size="large" @click="onCancel">
        取消
      </ElButton>
      <ElButton type="primary" size="large" @click="onSubmit">
        确定
      </ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
:deep(.el-cascader) {
  width: 100%;
}
</style>
