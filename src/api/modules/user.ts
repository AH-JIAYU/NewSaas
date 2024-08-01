import api from "../index";

export default {
  // 登录
  loginBypassword: (data: { account: string; password: string }) =>
    api.post("user/loginByAccount", data),

  // 手机号登录
  loginByPhone: (data: { phone: string; code: string }) =>
    api.post("user/loginByPhone", data),

  // 邮箱登录
  LoginByEmail: (data: { email: string; code: string }) =>
    api.post("user/userLoginByEmail", data),

  // 获取权限
  permission: () => api.post("tenant-button/getButtonList"),

  // 货币类型
  getCurrencyType: () => api.post("project/getCurrencyType",{}),

  // 修改密码
  passwordEdit: (data: { password: string; newpassword: string }) =>
    api.post("user/password/edit", data, {
      baseURL: "/mock/",
    }),

  // 获取偏好设置
  preferences: () =>
    api.get("user/preferences", {
      baseURL: "/mock/",
    }),

  // 修改偏好设置
  preferencesEdit: (preferences: string) =>
    api.post(
      "user/preferences/edit",
      {
        preferences,
      },
      {
        baseURL: "/mock/",
      }
    ),

  // 获取标签栏固定标签页数据
  tabbar: () =>
    api.get("user/tabbar", {
      baseURL: "/mock/",
    }),

  // 修改标签栏固定标签页数据
  tabbarEdit: (tabbar: string) =>
    api.post(
      "user/tabbar/edit",
      {
        tabbar,
      },
      {
        baseURL: "/mock/",
      }
    ),

  // 获取收藏夹
  favorites: () =>
    api.get("user/favorites", {
      baseURL: "/mock/",
    }),

  // 修改收藏夹
  favoritesEdit: (favorites: string) =>
    api.post(
      "user/favorites/edit",
      {
        favorites,
      },
      {
        baseURL: "/mock/",
      }
    ),
};
