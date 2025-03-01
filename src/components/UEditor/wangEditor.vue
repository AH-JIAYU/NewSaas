<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import apiQinliu from '@/api/modules/file'

// Props
const props = defineProps({
  valueHtml: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: `wang-editor-${+new Date()}${(Math.random() * 1000).toFixed(0)}`,
  },
})
// Emits
const emits = defineEmits<{
  (event: 'changeEditorValue', val: string): void
}>()

console.log('valueHtml', props.valueHtml)

const valueHtml = ref<string>('')
const mode = ref('default')
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const toolbarConfig = {}
const editorConfig = {
  selector: `#${props.id}`,
  placeholder: '请输入内容...',
  EXTEND_CONF: {
    htmlWhitelist: {
      'div': ['class', 'style'],
      'p': ['class', 'style'],
      'span': ['class', 'style'],
      'strong': [],
      'br': [],
      'table': ['class', 'cellspacing', 'cellpadding', 'border'],
      'tbody': [],
      'tr': [],
      'td': ['class', 'colspan', 'rowspan'],
      '*': ['class', 'style', '__aliyun_node_has_bgcolor', '__aliyun_node_has_color', 'elementToProof', 'aym_table_wrap'],
    },
  },
  MENU_CONF: {
    uploadImage: {
      async customUpload(file, insertFn) {
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
                  insertFn(res1.data?.fileUrl)
                }
              })
            }
            else {

            }
          }).catch((error: any) => {})
      },
    },
  },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) { return }
  editor.destroy()
})
// 监听 props.valueHtml 变化并更新编辑器
// watch(
//   () => props.valueHtml,
//   (newHtml) => {
//     if (editorRef.value) {
//       editorRef.value.setHtml(newHtml)
//     }
//   },
//   { immediate: true },
// )
function handleCreated(editor) {
  editorRef.value = editor // 记录 editor 实例，重要！
  editor.setHtml(props.valueHtml)
  console.log(editor.getHtml())
  // 监听编辑器内容变化并通知父组件（双向绑定）
  editor.on('change', () => {
    const html = editor.getHtml()
    emits('changeEditorValue', html)
  })
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
    />
  </div>
</template>

<style lang="scss" scoped>

</style>
