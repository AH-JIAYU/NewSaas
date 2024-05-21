<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { DetailFormProps } from '../../types'
import api from '@/api/modules/otherFunctions_screenLibrary'

import 'survey-core/defaultV2.min.css'
import 'survey-creator-core/survey-creator-core.min.css'

import { setLicenseKey, surveyLocalization } from 'survey-core'
import type {
  ICreatorOptions } from 'survey-creator-core'
import {
  SurveyCreatorModel,
  editorLocalization,
} from 'survey-creator-core'
import 'survey-creator-core/i18n/french'
import 'survey-creator-core/i18n/simplified-chinese'
import 'survey-creator-core/survey-creator-core.i18n'

editorLocalization.currentLocale = 'zh-cn'
surveyLocalization.supportedLocales = ['en', 'fr', 'zh-cn']

setLicenseKey(
  'ZjU4MjI0NjMtN2YzYi00ZDMyLWEyYmEtOTliMmVhZmEyODc5OzE9MjAyNS0wMi0yNA==',
)
const creatorOptions: ICreatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  showTranslationTab: true,
}

const defaultJson = {
  pages: [
    {
      name: 'Name',
      elements: [
        {
          name: 'country',
          type: 'dropdown',
          placeholder: 'Select a country...',
          choicesByUrl: {
            url: 'https://surveyjs.io/api/CountriesExample',
          },
        },
      ],
    },
  ],
}

const creator = new SurveyCreatorModel(creatorOptions)
creator.text
  = window.localStorage.getItem('survey-json') || JSON.stringify(defaultJson)
creator.saveSurveyFunc = (saveNo: number, callback: any) => {
  window.localStorage.setItem('survey-json', creator.text)
  callback(saveNo, true)
}
creator.onUploadFile.add((_, options) => {
  const formData = new FormData()
  options.files.forEach((file: File) => {
    formData.append(file.name, file)
  })
  fetch('https://example.com/uploadFiles', {
    method: 'post',
    body: formData,
  })
    .then(response => response.json())
    .then((result) => {
      options.callback(
        'success',
        // A link to the uploaded file
        `https://example.com/files?name=${result[options.files[0].name]}`,
      )
    })
    .catch((error) => {
      options.callback(error, 'error')
    })
})


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
  <div v-loading="loading"  style="width: 100%; height: 93%; margin-bottom: 80px">
    <div style="width: 100%; height: 100%;">
    <survey-creator-component  :model="creator" />
  </div>

  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
