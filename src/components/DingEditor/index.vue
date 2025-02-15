<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'
import apiQinliu from '@/api/modules/file'

defineOptions({
  name: 'DingEditor',
})
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})
// Emits
const emits = defineEmits<{
  (event: 'changeDingEditor', val: string): void
}>()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(props.content　||　'')

const mode = ref('default')
// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//   }, 1500)
// })

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  // 配置粘贴图片上传
  pasteImageUpload: true,
  customUploadImg: async (resultFiles, insertImgFn) => {
    console.log('1111111111')
    // resultFiles 是上传的图片文件列表
    // insertImgFn 是插入图片到编辑器的函数
    for (const file of resultFiles) {
      alert(file.size)
      // 限制上传文件的大小为200M
      const MAX_SIZE = 10 * 1024 * 1024 // 10MB in bytes
      if (file.size > MAX_SIZE) {
        ElMessage({
          message: `上传文件大小不得超过200M 当前文件${10}MB `,
          type: 'error',
          duration: 5 * 1000,
        })
        return false
      } else {
        // 创建 FormData 对象
        const formData = new FormData()
        formData.append('file', file)
        apiQinliu
          .upload(formData)
          .then((res: any) => {
            if (res && res.data?.qiNiuUrl) {
              // 根据图片名，
              apiQinliu.detail({ fileName: res.data?.qiNiuUrl }).then((res1: any) => {
                if (res1 && res1.data?.fileUrl) {
                  insertImgFn(res1.data.fileUrl) // 返回上传成功的图片 URL
                }
              })
            }
            else {
              ElMessage({
                message: `图片上传失败 `,
                type: 'error',
                duration: 3 * 1000,
              })
            }
          })
          .catch((error: any) => {
            ElMessage({
              message: `上传失败: ${error.error} `,
              type: 'error',
              duration: 3 * 1000,
            })
          })
      }
    }
  },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) { return }
  editor.destroy()
})

function handleCreated(editor) {
  editorRef.value = editor // 记录 editor 实例，重要！
}
function onChange(editor) {
  // TS 语法
  const content = editor.getHtml()
  emits('changeDingEditor', content) // Emit the updated content
}
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="height: 500px; overflow-y: hidden;"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
      @on-change="onChange"
    />
  </div>
</template>

<style lang="scss" scoped>
// 样式
</style>
