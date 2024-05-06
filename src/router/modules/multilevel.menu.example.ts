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
          title: '客户报告',
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
          title: '项目列表',
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
      {
        path: 'supplier',
        name: 'supplier',
        component: () => import('@/views/user/supplier/index.vue'),
        meta: {
          title: '供应商列表',
          // i18n: $t('route.multimenu.page'),
        },
      },
      {
        path: 'subVip',
        name: 'subVip',
        component: () => import('@/views/user/subVip/index.vue'),
        meta: {
          title: '子会员列表',
          // i18n: $t('route.multimenu.page'),
        },
      },
      {
        path: 'uidParsing',
        name: 'uidParsing',
        component: () => import('@/views/user/uidParsing/index.vue'),
        meta: {
          title: 'uid解析',
          // i18n: $t('route.multimenu.page'),
        },
      },
      {
        path: 'dataExport',
        name: 'dataExport',
        component: () => import('@/views/user/dataExport/index.vue'),
        meta: {
          title: '数据导出',
          // i18n: $t('route.multimenu.page'),
        },
      },
    ],
  },
  {
    path:'/record',
    component: Layout,
    redirect: '/record/survey ',
    name: 'record',
    meta: {
      title: '记录管理',
      // i18n: $t('route.multimenu.root'),
      icon: 'i-heroicons-solid:menu-alt-3',
    },
    children:[
      {
        path: 'survey',
        name: 'survey',
        component: () => import('@/views/record/survey/index.vue'),
        meta: {
          title: '调查记录',
          // i18n: $t('route.multimenu.page'),
        },
      },
      {
        path: 'callback',
        name: 'callback',
        component: () => import('@/views/record/callback/index.vue'),
        meta: {
          title: '回调记录',
          // i18n: $t('route.multimenu.page'),
        },
      },
      {
        path: 'allocation',
        name: 'allocation',
        component: () => import('@/views/record/allocation/index.vue'),
        meta: {
          title: '分配记录',
          // i18n: $t('route.multimenu.page'),
        },
      },
      {
        path: 'flowOrder',
        name: 'flowOrder',
        component: () => import('@/views/record/flowOrder/index.vue'),
        meta: {
          title: '流单记录',
          // i18n: $t('route.multimenu.page'),
        },
      },
      {
        path: 'temination',
        name: 'temination',
        component: () => import('@/views/record/termination/index.vue'),
        meta: {
          title: '终止记录',
          // i18n: $t('route.multimenu.page'),
        },
      },
      {
        path: 'customerManagement',
        name: 'customerManagement',
        component: () => import('@/views/record/customerManagement/index.vue'),
        meta: {
          title: '客户管理记录',
          // i18n: $t('route.multimenu.page'),
        },
      },
    ]
  },
  {
    path:'/configuration',
    component: Layout,
    redirect: '/configuration/supplierLevel ',
    name: 'configuration',
    meta: {
      title: '配置管理',
      // i18n: $t('route.multimenu.root'),
      icon: 'i-heroicons-solid:menu-alt-3',
    },
    children:[
      {
        path: 'supplierLevel',
        name: 'supplierLevel',
        component: () => import('@/views/configuration/supplierLevel/index.vue'),
        meta: {
          title: '供应商等级',
          // i18n: $t('route.multimenu.page'),
        },
      },

    ]
  }
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
