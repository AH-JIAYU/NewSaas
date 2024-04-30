import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes
= [
  {
    path: '/',
    component: Layout,
    redirect: '/homePage',
    name: 'multilevelMenuExample',
    meta: {
      title: '首页',
      // i18n: $t('route.multimenu.root'),
      icon: 'i-heroicons-solid:menu-alt-3',
    },
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('@/views/index/index/index.vue'),
        meta: {
          title: '数据中心',
          // i18n: $t('route.multimenu.page'),
        },
      },
      {
        path: '/data',
        name: 'data',
        component: () => import('@/views/index/data/index.vue'),
        meta: {
          title: '数据中心',
          // i18n: $t('route.multimenu.page'),
        },
      },
    ],
  },
  {
    path: '/projectManagement',
    component: Layout,
    redirect: '/projectManagement/list',
    name: 'projectManagement',
    meta: {
      title: '项目管理',
      // i18n: $t('route.multimenu.root'),
      icon: 'i-heroicons-solid:menu-alt-3',
    },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/projectManagement/list/index.vue'),
        meta: {
          title: '数据中心',
          // i18n: $t('route.multimenu.page'),
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/customer',
    name: 'user',
    meta: {
      title: '用户管理',
      // i18n: $t('route.multimenu.root'),
      icon: 'i-heroicons-solid:menu-alt-3',
    },
    children: [
      {
        path: 'customer',
        name: 'customer',
        component: () => import('@/views/user/customer/index.vue'),
        meta: {
          title: '客户列表',
          // i18n: $t('route.multimenu.page'),
        },
      },
    ],
  },
]

//   {
//    path: '/multilevel_menu_example',
//    component: Layout,
//    redirect: '/multilevel_menu_example/page',
//    name: 'multilevelMenuExample',
//    meta: {
//      title: '多级导航',
//      i18n: $t('route.multimenu.root'),
//      icon: 'i-heroicons-solid:menu-alt-3',
//    },
//    children: [
//      {
//        path: 'page',
//        name: 'multilevelMenuExample1',
//        component: () => import('@/views/multilevel_menu_example/page.vue'),
//        meta: {
//          title: '导航1',
//          i18n: $t('route.multimenu.page'),
//        },
//      },
//      {
//        path: 'level2',
//        name: 'multilevelMenuExample2',
//        redirect: '/multilevel_menu_example/level2/page',
//        meta: {
//          title: '导航2',
//          i18n: $t('route.multimenu.level2.root'),
//        },
//        children: [
//          {
//            path: 'page',
//            name: 'multilevelMenuExample2-1',
//            component: () => import('@/views/multilevel_menu_example/level2/page.vue'),
//            meta: {
//              title: '导航2-1',
//              i18n: $t('route.multimenu.level2.page'),
//            },
//          },
//          {
//            path: 'level3',
//            name: 'multilevelMenuExample2-2',
//            redirect: '/multilevel_menu_example/level2/level3/page1',
//            meta: {
//              title: '导航2-2',
//              i18n: $t('route.multimenu.level2.level3.root'),
//            },
//            children: [
//              {
//                path: 'page1',
//                name: 'multilevelMenuExample2-2-1',
//                component: () => import('@/views/multilevel_menu_example/level2/level3/page1.vue'),
//                meta: {
//                  title: '导航2-2-1',
//                  i18n: $t('route.multimenu.level2.level3.page1'),
//                },
//              },
//              {
//                path: 'page2',
//                name: 'multilevelMenuExample2-2-2',
//                component: () => import('@/views/multilevel_menu_example/level2/level3/page2.vue'),
//                meta: {
//                  title: '导航2-2-2',
//                  i18n: $t('route.multimenu.level2.level3.page2'),
//                },
//              },
//            ],
//          },
//        ],
//      },
//    ],
//  }

export default routes
