import '@/utils/system.copyright'
import ElementPlus from 'element-plus'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import Message from 'vue-m-message'
import 'vue-m-message/dist/style.css'

import VWave from 'v-wave'

import 'overlayscrollbars/overlayscrollbars.css'

import { surveyPlugin } from 'survey-vue3-ui'
import { surveyCreatorPlugin } from 'survey-creator-vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import ui from './ui-provider'
import { setupI18n } from './locales'

// 自定义指令
import directive from '@/utils/directive'

// 错误日志上报
import errorLog from '@/utils/error.log'

// 加载 svg 图标
import 'virtual:svg-icons-register'

// 加载 iconify 图标
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'

import 'virtual:uno.css'

// 全局样式
import '@/assets/styles/globals.scss'
// 调查

const app = createApp(App)
app.use(FloatingVue, {
  distance: 12,
})
app.use(Message)
app.use(VWave, {})
app.use(pinia)
app.use(router)
app.use(ui)
app.use(setupI18n())
app.use(ElementPlus).use(surveyPlugin).use(surveyCreatorPlugin)
directive(app)
errorLog(app)
if (icons.isOfflineUse) {
  for (const info of icons.collections) {
    downloadAndInstall(info)
  }
}

app.mount('#app')
