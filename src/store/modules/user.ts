import { cloneDeep } from 'lodash-es'
import { createDefu } from 'defu'
import useSettingsStore from './settings'
import useTabbarStore from './tabbar'
import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import type { Settings } from '#/global'
import apiUser from '@/api/modules/user'
import storage from '@/utils/storage'
import settingsDefault from '@/settings'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const settingsStore = useSettingsStore()
    const tabbarStore = useTabbarStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const account = ref(storage.local.get('account') ?? '')
    const token = ref(storage.local.get('token') ?? '')
    const avatar = ref(storage.local.get('avatar') ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      if (token.value) {
        return true
      }
      return false
    })

    // 登录
    async function login(data: {
      account: string
      password: string
    }) {
      const res = await apiUser.login(data)
      storage.local.set('account', res.data.account)
      storage.local.set('token', res.data.token)
      storage.local.set('avatar', res.data.avatar)
      account.value = res.data.account
      token.value = res.data.token
      avatar.value = res.data.avatar
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      storage.local.remove('account')
      storage.local.remove('token')
      storage.local.remove('avatar')
      account.value = ''
      token.value = ''
      avatar.value = ''
      permissions.value = []
      tabbarStore.clean()
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(router.currentRoute.value.path !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取权限
    async function getPermissions() {
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
    }

    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    // 框架已将可提供给用户配置的选项提取出来，请勿新增其他选项，不需要的选项可以在这里注释掉
    const preferences = ref<Settings.all>({
      app: {
        colorScheme: settingsDefault.app.colorScheme,
        lightTheme: settingsDefault.app.lightTheme,
        darkTheme: settingsDefault.app.darkTheme,
        enableProgress: settingsDefault.app.enableProgress,
        defaultLang: settingsDefault.app.defaultLang,
      },
      menu: {
        menuMode: settingsDefault.menu.menuMode,
        isRounded: settingsDefault.menu.isRounded,
        menuActiveStyle: settingsDefault.menu.menuActiveStyle,
        switchMainMenuAndPageJump: settingsDefault.menu.switchMainMenuAndPageJump,
        subMenuOnlyOneHide: settingsDefault.menu.subMenuOnlyOneHide,
        subMenuUniqueOpened: settingsDefault.menu.subMenuUniqueOpened,
        subMenuCollapse: settingsDefault.menu.subMenuCollapse,
        subMenuAutoCollapse: settingsDefault.menu.subMenuAutoCollapse,
        enableSubMenuCollapseButton: settingsDefault.menu.enableSubMenuCollapseButton,
      },
      layout: {
        widthMode: settingsDefault.layout.widthMode,
      },
      mainPage: {
        enableTransition: settingsDefault.mainPage.enableTransition,
        transitionMode: settingsDefault.mainPage.transitionMode,
      },
      topbar: {
        mode: settingsDefault.topbar.mode,
        switchTabbarAndToolbar: settingsDefault.topbar.switchTabbarAndToolbar,
      },
      tabbar: {
        style: settingsDefault.tabbar.style,
        enableIcon: settingsDefault.tabbar.enableIcon,
        enableMemory: settingsDefault.tabbar.enableMemory,
      },
      toolbar: {
        breadcrumb: settingsDefault.toolbar.breadcrumb,
        navSearch: settingsDefault.toolbar.navSearch,
        fullscreen: settingsDefault.toolbar.fullscreen,
        pageReload: settingsDefault.toolbar.pageReload,
        colorScheme: settingsDefault.toolbar.colorScheme,
        layout: settingsDefault.toolbar.layout,
      },
      breadcrumb: {
        style: settingsDefault.breadcrumb.style,
        enableMainMenu: settingsDefault.breadcrumb.enableMainMenu,
      },
    })
    // 此处没有使用 lodash 的 defaultsDeep 函数，而是基于 defu 库自定义了一个函数，只合并 settings 中有的属性，而不是全部合并，这样做的目的是为了排除用户历史遗留的偏好配置
    const customDefaultsDeep = createDefu((obj, key, value) => {
      if (obj[key] === undefined) {
        delete obj[key]
        return true
      }
      if (Array.isArray(obj[key]) && Array.isArray(value)) {
        obj[key] = value
        return true
      }
    })
    // isPreferencesUpdating 用于防止循环更新
    let isPreferencesUpdating = false
    watch(preferences, (val) => {
      if (!settingsStore.settings.userPreferences.enable) {
        return
      }
      if (!isPreferencesUpdating) {
        isPreferencesUpdating = true
        settingsStore.updateSettings(cloneDeep(val))
      }
      else {
        isPreferencesUpdating = false
      }
      updatePreferences(cloneDeep(val))
    }, {
      deep: true,
    })
    watch(() => settingsStore.settings, (val) => {
      if (!settingsStore.settings.userPreferences.enable) {
        return
      }
      if (!isPreferencesUpdating) {
        isPreferencesUpdating = true
        preferences.value = customDefaultsDeep(val, preferences.value)
      }
      else {
        isPreferencesUpdating = false
      }
    }, {
      deep: true,
    })
    // isPreferencesInited 用于防止初始化时触发更新
    let isPreferencesInited = false
    // 获取偏好设置
    async function getPreferences() {
      let data: Settings.all = {}
      if (settingsStore.settings.userPreferences.storageTo === 'local') {
        if (storage.local.has('userPreferences')) {
          data = JSON.parse(storage.local.get('userPreferences') as string)[account.value] || {}
        }
      }
      else if (settingsStore.settings.userPreferences.storageTo === 'server') {
        const res = await apiUser.preferences()
        data = JSON.parse(res.data.preferences || '{}') as Settings.all
      }
      preferences.value = customDefaultsDeep(data, preferences.value)
    }
    // 更新偏好设置
    async function updatePreferences(data: Settings.all = {}) {
      if (!isPreferencesInited) {
        isPreferencesInited = true
        return
      }
      if (settingsStore.settings.userPreferences.storageTo === 'local') {
        const userPreferencesData = storage.local.has('userPreferences') ? JSON.parse(storage.local.get('userPreferences') as string) : {}
        userPreferencesData[account.value] = data
        storage.local.set('userPreferences', JSON.stringify(userPreferencesData))
      }
      else if (settingsStore.settings.userPreferences.storageTo === 'server') {
        await apiUser.preferencesEdit(JSON.stringify(data))
      }
    }

    return {
      account,
      token,
      avatar,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
      preferences,
      getPreferences,
      updatePreferences,
    }
  },
)

export default useUserStore
