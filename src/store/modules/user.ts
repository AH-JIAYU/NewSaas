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
import { resetPinia } from '@/store/index'

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
    const tenantId= ref(storage.local.get("tenantId") ?? "");
    const anotherName= ref(storage.local.get("anotherName") ?? "");
    const permissions = ref<string[]>([]);
    const logo = ref<any>(storage.local.get("logo") ?? "");//logo
    const expirationTime = ref<any>(storage.local.get("expirationTime") ?? "");//到期时间
    const domain = ref<any>(storage.local.get("domain") ?? "");//租户首页网址
    const webName = ref<any>(storage.local.get("webName") ?? "");// 网站名称
    const name = ref<any>(storage.local.get("name") ?? "");// 用户名
    const keyWords = ref<any>(storage.local.get("keyWords") ?? "");//网站关键字
    const description = ref<any>(storage.local.get("description") ?? "");//网站描述
    const topLevelDomainName = ref<any>(storage.local.get("topLevelDomainName") ?? "");// 顶级域名
    const personalizedDomainName = ref<any>(storage.local.get("personalizedDomainName") ?? "");// 个性化域名
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
      storage.local.set("expirationTime", res.data.expirationTime);
      storage.local.set("domain", res.data.domain);
      storage.local.set("webName", res.data.webName);
      storage.local.set("name", res.data.name);
      storage.local.set("keyWords", res.data.keyWords);
      storage.local.set("description", res.data.description);
      storage.local.set("tenantId", res.data.tenantId);
      storage.local.set("anotherName", res.data.anotherName);
      // storage.local.set("tend", res.data.description);
      webName.value = res.data.webName;
      expirationTime.value = res.data.expirationTime;
      domain.value = res.data.domain;
      name.value = res.data.name;
      keyWords.value = res.data.keyWords;
      description.value = res.data.description;
      logo.value = res.data.logo;
      account.value = res.data.account;
      token.value = res.data.token;
      avatar.value = res.data.avatar;
      userId.value = res.data.userId;
      tenantId.value = res.data.tenantId,
      anotherName.value = res.data.anotherName,
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
      storage.local.remove("webName");
      storage.local.remove("expirationTime");
      storage.local.remove("domain");
      storage.local.remove("name");
      storage.local.remove("description");
      storage.local.remove("keyWords");
      storage.local.remove("account");
      storage.local.remove("token");
      storage.local.remove("avatar");
      storage.local.remove("userId");
      storage.local.remove("tabbarPinData");
      storage.local.remove("tenantId");
      storage.local.remove("anotherName");
      account.value = "";
      token.value = "";
      avatar.value = "";
      userId.value = "";
      tenantId.value = "";
      anotherName.value ='';
      permissions.value = [];
      logo.value = '';
      webName.value = '';
      expirationTime.value = '';
      domain.value = '';
      name.value = '';
      description.value = '';
      keyWords.value = '';
      tabbarStore.clean();
      routeStore.removeRoutes();
      menuStore.setActived(0);
      await router.push({
        name: "login",
        query: {
          ...(router.currentRoute.value.path !==
            settingsStore.settings.home.fullPath &&
            router.currentRoute.value.name !== "login" && { redirect }),
        },
      });
      nextTick(() => {
        // 清除pinia里的数据
        resetPinia()
      })
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
    // 删除本地和store里的网站名称
    function delWebName() {
      webName.value = ''
      storage.local.remove("webName")
    }
    // 存 webName
    function setWebName(val: any) {
      webName.value = val
      storage.local.set("webName", val)
    }
     // 删除本地和store里的网站名称
     function delname() {
      name.value = ''
      storage.local.remove("name")
    }
    // 存 name
    function setname(val: any) {
      name.value = val
      storage.local.set("name", val)
    }
    // 删除本地和store里的keyWords
    function delkeyWords() {
      keyWords.value = ''
      storage.local.remove("keyWords")
    }
    // 存 keyWords
    function setkeyWords(val: any) {
      keyWords.value = val
      storage.local.set("keyWords", val)
    }
    // 删除本地和store里的description
    function delDescription() {
      description.value = ''
      storage.local.remove("description")
    }
      // 存 租户id
      function setTenantId(val: any) {
        tenantId.value = val
        storage.local.set("tenantId", val)
      }
    //删除被动租户id
    function delTenantId() {
      tenantId.value = ''
      storage.local.remove("tenantId")
    }
      // 存 租户id
      function setanotherName(val: any) {
        anotherName.value = val
        storage.local.set("anotherName", val)
      }
    //删除被动租户id
    function delanotherName() {
      anotherName.value = ''
      storage.local.remove("anotherName")
    }
    // 存 description
    function setDescription(val: any) {
      description.value = val
      storage.local.set("description", val)
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
      webName,
      expirationTime,
      domain,
      name,
      tenantId,
      anotherName,
      description,
      keyWords,
      topLevelDomainName,
      personalizedDomainName,
      currencyType,
      isLogin,
      login,
      delLogo,
      delWebName,
      delname,
      delDescription,
      delTenantId,
      setTenantId,
      delkeyWords,
      setanotherName,
      delanotherName,
      setLogo,
      setWebName,
      setname,
      setkeyWords,
      setDescription,
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
