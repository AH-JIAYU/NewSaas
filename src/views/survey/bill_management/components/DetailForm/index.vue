<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { DetailFormProps } from '../../types'
import api from '@/api/modules/survey_billManagement'

const props = withDefaults(
  defineProps<DetailFormProps>(),
  {
    id: '',
  },
)

const loading = ref(false)
const formRef = ref<FormInstance>()
const form = ref({
  id: props.id,
  title: '',
  radio: '',
})
const formRules = ref<FormRules>({
  // 校验
})

onMounted(() => {
  if (form.value.id !== '') {
    getInfo()
  }
})

function getInfo() {
  loading.value = true
  api.detail(form.value.id).then((res: any) => {
    loading.value = false
    form.value.title = res.data.title
  })
}

defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      if (form.value.id === '') {
        formRef.value && formRef.value.validate((valid) => {
          if (valid) {
            api.create(form.value).then(() => {
              ElMessage.success({
                message: '模拟新增成功',
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
            api.edit(form.value).then(() => {
              ElMessage.success({
                message: '模拟编辑成功',
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
      <ElFormItem label="结算方式">
        <el-radio-group v-model="form.radio">
          <el-radio :value="0" size="large">
            全部结算
          </el-radio>
          <el-radio :value="1" size="large">
            指定结算
          </el-radio>
        </el-radio-group>
      </ElFormItem>
      <ElFormItem v-if="!!form.radio" label="指定会员">
        <ElInput v-model="form.title" placeholder="请输入标题" />
      </ElFormItem>
      <ElFormItem label="最低结算额度">
        <ElInput v-model="form.title" disabled placeholder="请输入标题" value="50" />
      </ElFormItem>
      <ElFormItem label="结算金额">
        <ElInput v-model="form.title" placeholder="请输入标题" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
  :deep{
    .el-radio.el-radio--large{
      height: 32px;
    }
  }
</style>
