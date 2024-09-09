import { setupLayouts } from "virtual:meta-layouts";
import generatedRoutes from "virtual:generated-pages";
import type { RouteRecordRaw } from "vue-router";
import MultilevelMenuExample from "./modules/multilevel.menu.example";
import type { Route } from "#/global";
import { $t } from "@/locales";
import useSettingsStore from "@/store/modules/settings";

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      whiteList: true,
      title: "主页",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
    meta: {
      whiteList: true,
      title: "登录",
      i18n: $t("route.login"),
    },
  },
  // 内部重定向
  {
    path: "/redirect",
    name: "redirect",
    component: () => import("@/views/redirect.vue"),
    meta: { whiteList: true },
  },
  // 支付成功
  {
    path: "/paymentSuccess",
    name: "paymentSuccess",
    component: () => import("@/views/paymentSuccess.vue"),
    meta: { whiteList: true },
  },
 

  {
    path: "/:all(.*)*",
    name: "notFound",
    component: () => import("@/views/[...all].vue"),
    meta: {
      title: "找不到页面",
    },
  },
];


// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/index.vue"),
    meta: {
      title: () => useSettingsStore().settings.home.title,
      breadcrumb: false,
    },
    children: [
      {
        path: "",
        component: () => import("@/views/index.vue"),
        meta: {
          title: () => useSettingsStore().settings.home.title,
          i18n: $t("route.home"),
          icon: "i-ant-design:home-twotone",
          breadcrumb: false,
        },
      },
      {
        path: "reload",
        name: "reload",
        component: () => import("@/views/reload.vue"),
        meta: {
          title: "重新加载",
          breadcrumb: false,
        },
      },
      {
        path: "personal/notification",
        name: "personalNotification",
        component: () => import("@/views/personal/notification.vue"),
        meta: {
          title: "通知中心",
          i18n: $t("route.personal.notification"),
        },
      },
      {
        path: "personal/setting",
        name: "personalSetting",
        component: () => import("@/views/personal/index.vue"),
        meta: {
          title: "个人中心",
          i18n: $t("route.personal.setting"),
          cache: "personalEditPassword",
        },
      },
    ],
  },
];

// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  ...MultilevelMenuExample,
  // {
  //   meta: {
  //     title: '演示',
  //     i18n: 'route.demo',
  //     icon: 'i-uim:box',
  //   },
  //   children: MultilevelMenuExample,

  // },
];

const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant === true;
});

const asyncRoutesByFilesystem = setupLayouts(
  generatedRoutes.filter((item) => {
    return (
      item.meta?.enabled !== false &&
      item.meta?.constant !== true &&
      item.meta?.layout !== false
    );
  })
);

export {
  constantRoutes,
  systemRoutes,
  asyncRoutes,
  constantRoutesByFilesystem,
  asyncRoutesByFilesystem,
};
