<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Editor } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfmLocale from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import type { DetailFormProps } from '../../types'
import api from '@/api/modules/announcement'

// 传递数据
const props = defineProps(["id", "row"])
// 类型
const type = [
  { label: '公告', value: 1 },
  { label: '常见问题', value: 2 },
  { label: '帮助', value: 3 },
]
// loading加载
const loading = ref(false)
// formRef
const formRef = ref<FormInstance>()
// 定义表单
const form = ref({
  id: props.id,
  // 标题
  title: '',
  // 类型
  type: '',
  // 内容
  text: '',
  // 是否置顶
  top: false,
})
// 校验
const formRules = ref<FormRules>({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '请选择类型', trigger: 'change' },
  ],
})
// 富文本
const plugins = [
  gfm({
    locale: gfmLocale,
  }),
]
// 赋值富文本数据
function handleChange(v: string) {
  form.value.text = v
}
onMounted(() => {
  if (form.value.id !== '') {
    getInfo()
  }
})
// 修改回显数
function getInfo() {
  loading.value = true
  form.value = props.row
  loading.value = false
}
// 暴露提交
defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      if (form.value.id === '') {
        formRef.value && formRef.value.validate((valid) => {
          if (valid) {
            delete form.value.id
            loading.value = true
            api.create(form.value).then(() => {
              loading.value = false
              ElMessage.success({
                message: '新增成功',
                center: true,
              })
              resolve()
            })
          }
        })
      }
      else {
        formRef.value && formRef.value.validate((valid) => {
          if (valid) {
            loading.value = true
            api.edit(form.value).then(() => {
              loading.value = false
              ElMessage.success({
                message: '编辑成功',
                center: true,
              })
              resolve()
            })
          }
        })
      }
    })
  },
})
</script>

<template>
  <div v-loading="loading">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="120px" label-suffix="：">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" clearable @change="" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" value-key="" placeholder="类型" clearable filterable>
          <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <!-- key解决富文本编译器   先新增  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
        <Editor class="editor" :value="form.text" :plugins="plugins" :locale="zhHans" @change="handleChange" />
      </el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="form.top" label="置顶" size="large" />
      </el-form-item>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep {
  .bytemd-body {
    height: calc(100% - 41px);
  }
}

:deep(.editor) {
  width: 100%;
}
</style>
