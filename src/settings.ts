import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all = {
  breadcrumb: {
    /**
     * 留空默认
     * modern 现代
     */
    style: 'modern',
  },

  menu: {
    // 导航栏是否圆角
    isRounded: true,
    /**
     * 留空默认
     * arrow 箭头
     * line 线条
     * dot 圆点
     */
    menuActiveStyle: '',
    menuMode: 'head',
  },
  tabbar: {
    enable: true,
    /**
     * fashion 时尚
     * card 卡片
     * square 方块
     */
    style: 'fashion',
  },
  toolbar: {
    favorites: true,
    notification: true,
    i18n: true,
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },

}

export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
