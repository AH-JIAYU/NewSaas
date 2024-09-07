import { cloneDeep } from "lodash-es";
import { createDefu } from "defu";
import useSettingsStore from "./settings";
import useTabbarStore from "./tabbar";
import useRouteStore from "./route";
import useMenuStore from "./menu";
import useNotificationStore from "./notification"; //消息中心
import router from "@/router";
import type { Settings } from "#/global";
import apiUser from "@/api/modules/user";
import apiLogo from "@/api/modules/logo";
import storage from "@/utils/storage";
import settingsDefault from "@/settings";
import api from "@/api/modules/configuration_manager";

const useUserStore = defineStore(
  // 唯一ID
  "user",
  () => {
    const settingsStore = useSettingsStore();
    const tabbarStore = useTabbarStore();
    const routeStore = useRouteStore();
    const menuStore = useMenuStore();
    const notificationStore = useNotificationStore(); //消息中心

    const account = ref(storage.local.get("account") ?? "");
    const token = ref(storage.local.get("token") ?? "");
    const avatar = ref(storage.local.get("avatar") ?? "");
    const userId = ref(storage.local.get("userId") ?? "");
    const permissions = ref<string[]>([]);
    const logo = ref<any>(storage.local.get("logo") ?? "");
    const currencyType = ref<number | string>(3); //货币类型 1=USD 2=CNY 3=未知
    const exchangeRate = ref<number | string>(); //汇率
    const isLogin = computed(() => {
      if (token.value) {
        return true;
      }
      return false;
    });

    // 登录
    /**
     * type 1 账号密码登录  2 手机号登录 3邮箱登录
     */
    async function login(data: {
      account: string;
      password: string;
      type: number;
      code: string;
    }) {
      let res: any;
      {
        const { type, code, password, account } = data;
        switch (type) {
          case 1:
            res = await apiUser.loginBypassword({ account, password });
            break;
          case 2:
            res = await apiUser.loginByPhone({ phone: account, code });
            break;
          case 3:
            res = await apiUser.LoginByEmail({ email: account, code });
            break;
        }
      }
      storage.local.set("account", res.data.account);
      storage.local.set("token", res.data.token);
      storage.local.set("avatar", res.data.avatar);
      storage.local.set("userId", res.data.userId);
      storage.local.set("logo", res.data.logo);
      logo.value = res.data.logo;
      account.value = res.data.account;
      token.value = res.data.token;
      avatar.value = res.data.avatar;
      userId.value = res.data.userId;
      notificationStore.websocketreconnect;
    }
    // 登出
    async function logout(
      val: any,
      redirect = router.currentRoute.value.fullPath
    ) {
      //断开websocket连接
      notificationStore.disconnect()
      //主动退出登录
      if (val !== 0) {
        await api.logout();
        storage.local.remove("login_account");
      }
      storage.local.remove("logo");
      storage.local.remove("account");
      storage.local.remove("token");
      storage.local.remove("avatar");
      storage.local.remove("userId");

      storage.local.remove("tabbarPinData");
      account.value = "";
      token.value = "";
      avatar.value = "";
      userId.value = "";
      permissions.value = [];
      logo.value = '';
      tabbarStore.clean();
      routeStore.removeRoutes();
      menuStore.setActived(0);
      router.push({
        name: "login",
        query: {
          ...(router.currentRoute.value.path !==
            settingsStore.settings.home.fullPath &&
            router.currentRoute.value.name !== "login" && { redirect }),
        },
      });
      // 刷新页面清除store里的数据
      window.location.reload();
    }
    // 删除本地和store里的logo
    function delLogo() {
      logo.value = ''
      storage.local.remove("logo")
    }
    // 存 logo
    function setLogo(val: any) {
      logo.value = val
      storage.local.set("logo", val)
    }
    // 获取权限
    async function getPermissions() {
      const res = await apiUser.permission();
      permissions.value = res.data;
    }

    // 获取货币类型
    async function getCurrencyType() {
      const res = await apiUser.getCurrencyType();
      currencyType.value = res.data.currencyType;
    }
    // 获取汇率
    async function getExchangeRate() {
      const res = await apiUser.getExchangeRate();
      exchangeRate.value = res.data.exchangeRate;
    }

    // 修改密码
    async function editPassword(data: {
      password: string;
      newpassword: string;
    }) {
      await apiUser.passwordEdit(data);
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
        switchMainMenuAndPageJump:
          settingsDefault.menu.switchMainMenuAndPageJump,
        subMenuOnlyOneHide: settingsDefault.menu.subMenuOnlyOneHide,
        subMenuUniqueOpened: settingsDefault.menu.subMenuUniqueOpened,
        subMenuCollapse: settingsDefault.menu.subMenuCollapse,
        subMenuAutoCollapse: settingsDefault.menu.subMenuAutoCollapse,
        enableSubMenuCollapseButton:
          settingsDefault.menu.enableSubMenuCollapseButton,
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
    });
    // 此处没有使用 lodash 的 defaultsDeep 函数，而是基于 defu 库自定义了一个函数，只合并 settings 中有的属性，而不是全部合并，这样做的目的是为了排除用户历史遗留的偏好配置
    const customDefaultsDeep = createDefu((obj, key, value) => {
      if (obj[key] === undefined) {
        delete obj[key];
        return true;
      }
      if (Array.isArray(obj[key]) && Array.isArray(value)) {
        obj[key] = value;
        return true;
      }
    });
    // isPreferencesUpdating 用于防止循环更新
    let isPreferencesUpdating = false;
    watch(
      preferences,
      (val) => {
        if (!settingsStore.settings.userPreferences.enable) {
          return;
        }
        if (!isPreferencesUpdating) {
          isPreferencesUpdating = true;
          settingsStore.updateSettings(cloneDeep(val));
        } else {
          isPreferencesUpdating = false;
        }
        updatePreferences(cloneDeep(val));
      },
      {
        deep: true,
      }
    );
    watch(
      () => settingsStore.settings,
      (val) => {
        if (!settingsStore.settings.userPreferences.enable) {
          return;
        }
        if (!isPreferencesUpdating) {
          isPreferencesUpdating = true;
          preferences.value = customDefaultsDeep(val, preferences.value);
        } else {
          isPreferencesUpdating = false;
        }
      },
      {
        deep: true,
      }
    );
    // isPreferencesInited 用于防止初始化时触发更新
    let isPreferencesInited = false;
    // 获取偏好设置
    async function getPreferences() {
      let data: Settings.all = {};
      if (settingsStore.settings.userPreferences.storageTo === "local") {
        if (storage.local.has("userPreferences")) {
          data =
            JSON.parse(storage.local.get("userPreferences") as string)[
            account.value
            ] || {};
        }
      } else if (
        settingsStore.settings.userPreferences.storageTo === "server"
      ) {
        const res = await apiUser.preferences();
        data = JSON.parse(res.data.preferences || "{}") as Settings.all;
      }
      preferences.value = customDefaultsDeep(data, preferences.value);
    }
    // 更新偏好设置
    async function updatePreferences(data: Settings.all = {}) {
      if (!isPreferencesInited) {
        isPreferencesInited = true;
        return;
      }
      if (settingsStore.settings.userPreferences.storageTo === "local") {
        const userPreferencesData = storage.local.has("userPreferences")
          ? JSON.parse(storage.local.get("userPreferences") as string)
          : {};
        userPreferencesData[account.value] = data;
        storage.local.set(
          "userPreferences",
          JSON.stringify(userPreferencesData)
        );
      } else if (
        settingsStore.settings.userPreferences.storageTo === "server"
      ) {
        await apiUser.preferencesEdit(JSON.stringify(data));
      }
    }

    return {
      account,
      token,
      avatar,
      userId,
      permissions,
      logo,
      currencyType,
      isLogin,
      login,
      delLogo,
      setLogo,
      logout,
      getPermissions,
      getCurrencyType,
      getExchangeRate,
      editPassword,
      preferences,
      getPreferences,
      updatePreferences,
    };
  }
);

export default useUserStore;
