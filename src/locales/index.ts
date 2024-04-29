import { cloneDeep } from 'lodash-es'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import useSettingsStore from '@/store/modules/settings'

function setupI18n() {
  const settingsStore = useSettingsStore()
  const i18n = createI18n({
    legacy: false,
    locale: settingsStore.lang,
    flatJson: true,
    fallbackLocale: 'zh-cn',
    messages,
  })
  return i18n
}

function getLocales() {
  return cloneDeep(messages)
}

const localesName: Record<string, any> = {}
for (const key in messages) {
  switch (key) {
    case 'zh-cn':
      localesName[key] = '中文(简体)'
      break
    case 'zh-tw':
      localesName[key] = '中文(繁體)'
      break
    case 'en':
      localesName[key] = 'English'
      break
  }
}

// 用于路由 meta.i18n 配置，方便在 VSCode I18n Ally 插件进行显示，无实际作用
function $t(key: string) {
  return key
}

export {
  setupI18n,
  getLocales,
  localesName,
  $t,
}
