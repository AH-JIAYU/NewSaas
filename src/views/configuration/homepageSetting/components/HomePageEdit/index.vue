<script setup lang="ts">
import grapesjs from 'grapesjs'
import basic from 'grapesjs-blocks-basic'
import gjsForms from 'grapesjs-plugin-forms'
import * as tabs from 'grapesjs-tabs'
import customCodePlugin from 'grapesjs-custom-code'
import pluginCountdown from 'grapesjs-component-countdown'
import parserPostCSS from 'grapesjs-parser-postcss'
import presetWebpage from 'grapesjs-preset-webpage'
import pluginTooltip from 'grapesjs-tooltip'
import imageEditor from 'grapesjs-tui-image-editor'
import styleBg from 'grapesjs-style-bg'
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs/dist/grapes.min.js'
// // @ts-expect-error
// import zh from 'grapesjs/locale/zh'
import { ElMessage, ElMessageBox } from 'element-plus'
import { customBlock, htmlJsList, updataText } from '@/utils/homePage'
import api from '@/api/modules/configuration_homepageSetting'

// 更新列表
const emits = defineEmits(['fetch-data'])
// 表单数据
const state = reactive<any>({
  title: '',
  dialogFormVisible: false,
  form: {},
})
// token
const editorRef = ref<any>(null)
const formRef = ref<any>(null)

// 打开弹框
function showEdit(row: any, title: any = '设计模板') {
  state.title = title
  state.form = row
  state.dialogFormVisible = true
}

// 打开grapesjs
async function onDialogOpened() {
  await nextTick()
  editorRef.value = grapesjs.init({
    fromElement: true,
    showOffsets: true,
    container: '#gjs',
    height: '900px',
    width: '100%',
    selectorManager: { componentFirst: true },
    plugins: [
      presetWebpage,
      basic,
      gjsForms,
      pluginCountdown,
      // tabs,
      customCodePlugin,
      parserPostCSS,
      pluginTooltip,
      imageEditor,
      styleBg,
    ],
    pluginsOpts: {
      // [basic]: { flexGrid: true },
      // [basic]: { flexGrid: '0' },
      basic: {
        flexGrid: '0',
      },
      presetWebpage: {
        modalImportTitle: 'Import Template',
        modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
        modalImportContent(editor: { getHtml: () => any, getCss: () => any }) {
          return `${editor.getHtml()}<style>${editor.getCss()}</style>`
        },
      },
      // [presetWebpage]: {
      //   modalImportTitle: 'Import Template',
      //   modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
      //   modalImportContent(editor: { getHtml: () => any, getCss: () => any }) {
      //     return `${editor.getHtml()}<style>${editor.getCss()}</style>`
      //   },
    },
    // i18n: {
    //   locale: 'zh',
    //   messages: { zh },
    // },

    projectData: JSON.parse(state.form.rawData || '{}'),

    storageManager: false,

    // deviceManager: {
    //   devices: [
    //     { id: 'desktop', name: 'Desktop', width: '' },
    //     {
    //       id: 'tablet',
    //       name: 'Tablet',
    //       width: '768px',
    //       widthMedia: '992px',
    //     },
    //     {
    //       id: 'mobilePortrait',
    //       name: 'Mobile portrait',
    //       width: '320px',
    //       widthMedia: '575px',
    //     },
    //   ],
    // },

    // 自定义上传图片
    assetManager: {
      uploadFile: async (e: any) => {
        const file = e.target.files[0]
        if (file) {
          try {
            // 判断文件大小，单位是字节，2MB = 2 * 1024 * 1024 字节
            const maxSize = 2 * 1024 * 1024 // 2mb
            if (Number(file.size) > Number(maxSize)) {
              ElMessage.warning({
                message: '文件大小不能超过 2mb',
                center: true,
              })
            }
            else {
              // 调用自定义接口上传图片
              const formData = new FormData()
              formData.append('file', file)
              formData.append('id', state.form.id)
              api.uploadHomePageTemplateImage(formData).then((res: any) => {
                editorRef.value.AssetManager.add(res.data)
              })
            }
          }
          catch (error) {
            console.error('Image upload failed', error)
          }
        }
      },
    },

    //   blockManager: {
    //   appendTo: 'basic',
    //   blocks: [
    //     {
    //       id: 'image',
    //       label: 'Image',
    //       media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    //           <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
    //       </svg>`,
    //       // Use `image` component
    //       content: { type: 'image' },
    //       // The component `image` is activatable (shows the Asset Manager).
    //       // We want to activate it once dropped in the canvas.
    //       activate: true,
    //       // select: true, // Default with `activate: true`
    //     }
    //   ],
    // }
  })

  // 通过事件改变框架的文本内容为中文
  editorRef.value.on('block:custom', (props: any) => {
    updataText(props.blocks)
  })

  // 监听图片删除事件
  editorRef.value.on('asset:remove', (asset: any) => {
    // 先从 Asset Manager 中移除图片
    const asset1 = editorRef.value.AssetManager.getAll().find(
      (a: any) => a.get('src') === asset.id,
    )

    if (asset1) {
      // 从 Asset Manager 中删除图片
      editorRef.value.AssetManager.remove(asset)

      // 然后从静态网页的服务器上删除图片
      // deleteImageFromServer(src);
    }
    else {
      // console.log("未找到图片:", src);
    }
  })
  // // 批量添加自定义块
  customBlock.forEach((item: any) => {
    editorRef.value.Blocks.add(item.id, item)
  })
  // 添加自定义js组件类型
  htmlJsList.forEach((item) => {
    editorRef.value.Components.addType(item.id, item)
  })

  // const script = function () {
  //   alert('Hi');
  // };

  // editorRef.value.Components.addType('comp-with-js', {
  //   model: {
  //     defaults: {
  //       script,
  //       style: {
  //         width: '100px',
  //         height: '100px',
  //         background: 'red',
  //       },
  //     },
  //   },
  // });

  // // Create a block for the component, so we can drop it easily
  // editorRef.value.Blocks.add('test-block', {
  //   label: '色块',
  //   attributes: { class: 'fa fa-text' },
  //   content: { type: 'comp-with-js' },
  // });
}

// 提交
async function save() {
  if (state.title === '设计模板') {
    const html = editorRef.value.getHtml()
    const css = editorRef.value.getCss()
    const rawData = JSON.stringify(editorRef.value.getProjectData())
    state.form = { ...state.form, html, css, rawData }
    const { status } = await api.edit(state.form)
    status === 1
    && ElMessage.success({
      message: '编辑成功',
      center: true,
    })
    emits('fetch-data')
    close()
  }
}

// 关闭弹框
function close() {
  if (editorRef.value) {
    editorRef.value.destroy()
    editorRef.value = null
  }
  state.form = {}
  state.dialogFormVisible = false
}

// 暴露数据
defineExpose({
  showEdit,
})
</script>

<template>
  <el-drawer
    v-if="state.dialogFormVisible" v-model="state.dialogFormVisible" :title="state.title" size="100%"
    @opened="onDialogOpened" @close="close"
  >
    <div id="gjs" ref="formRef" />
    <template #footer>
      <el-button @click="close">
        取 消
      </el-button>
      <el-button v-if="state.title === '设计模板'" type="primary" @click="save">
        确 定
      </el-button>
    </template>
  </el-drawer>
</template>
