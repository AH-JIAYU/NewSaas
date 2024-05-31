<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import apiDictionary from '@/api/modules/dictionary'

const props = withDefaults(
  defineProps<{
    parentId?: string | number
    id?: string | number
    tree: any[]
  }>(),
  {
    parentId: '',
    id: '',
  },
)

const emits = defineEmits<{
  addNode: [
    node: {
      id: string | number
      label: string
      code: string
    },
  ]
  editNode: [
    node: {
      id: string | number
      label: string
      code: string
    },
    parentId: string | number,
  ]
}>()

const visible = defineModel<boolean>({
  default: false,
})

const title = computed(() => props.id === '' ? '新增字典' : '编辑字典')
function formatTree(tree: any[], id: string | number, childrenDisabled = false) {
  const data: any[] = []
  tree.forEach((item) => {
    const temp = { ...item }
    if (temp.id === id || childrenDisabled) {
      temp.disabled = true
      if (temp.children) {
        temp.children = formatTree(temp.children, id, true)
      }
    }
    else {
      temp.disabled = false
      if (temp.children) {
        temp.children = formatTree(temp.children, id, childrenDisabled)
      }
    }
    data.push(temp)
  })
  return data
}
const myTree = computed(() => formatTree(props.tree, props.id))

const formRef = ref<FormInstance>()
const form = ref({
  parentId: props.parentId,
  id: props.id,
  name: '',
  code: '',
})
const formRules = ref<FormRules>({
  name: [
    { required: true, message: '请输入字典名称' },
  ],
  code: [
    { required: true, message: '请输入字典编码' },
  ],
})

onMounted(() => {
  if (props.id !== '') {
    apiDictionary.detail(props.id).then((res:any) => {
      // form.value.parentId = res.data.parentId
      form.value.id = res.data.id
      form.value.name = res.data.name
      form.value.code = res.data.code
    })
  }
})

function onSubmit() {
  if (form.value.id === '') {
    formRef.value && formRef.value.validate((valid) => {
      if (valid) {
        apiDictionary.create(form.value).then((res:any) => {
          ElMessage.success({
            message: '模拟新增成功',
            center: true,
          })
          emits('addNode', {
            id: res.data.data,
            label: form.value.name,
            code: form.value.code,
          })
          onCancel()
        })
      }
    })
  }
  else {
    formRef.value && formRef.value.validate((valid) => {
      if (valid) {
        apiDictionary.edit(form.value).then(() => {
          ElMessage.success({
            message: '模拟编辑成功',
            center: true,
          })
          emits('editNode', {
            id: form.value.id,
            label: form.value.name,
            code: form.value.code,
          }, form.value.parentId)
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
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="80px">
      <ElFormItem label="父级字典" prop="parentId">
        <ElCascader v-model="form.parentId" :options="myTree" :props="{ value: 'id', emitPath: false, checkStrictly: true }" :show-all-levels="false" placeholder="请选择父级字典，默认为根字典" clearable />
      </ElFormItem>
      <ElFormItem label="字典名称" prop="name">
        <ElInput v-model="form.name" placeholder="请输入字典名称" clearable />
      </ElFormItem>
      <ElFormItem label="字典编码" prop="code">
        <ElInput v-model="form.code" placeholder="请输入字典编码" clearable />
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
