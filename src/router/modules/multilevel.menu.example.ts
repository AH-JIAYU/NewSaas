import { $t } from "@/locales";

function Layout() {
  return import("@/layouts/index.vue");
}

const routes: any = [
  // {
  //   meta: {
  //     title: "首页",
  //     icon: "uim:box",
  //   },
  //   children: [
  //     {
  //       path: "/",
  //       component: Layout,
  //       redirect: "/homePage",
  //       name: "multilevelMenuExample",
  //       meta: {
  //         title: "首页",
  //         // i18n: $t('route.multimenu.root'),
  //         icon: "i-heroicons-solid:menu-alt-3",
  //         alwaysOpened: true,
  //       },
  //       children: [
  //         {
  //           path: "homePage",
  //           name: "homePage",
  //           component: () => import("@/views/index/index/index.vue"),
  //           meta: {
  //             title: "数据中心",
  //           },
  //         },
  //         {
  //           path: "datacenter",
  //           name: "datacenter",
  //           component: () => import("@/views/index/data/index.vue"),
  //           meta: {
  //             title: "客户报告",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   meta: {
  //     title: "项目管理",
  //     icon: "uim:box",
  //   },
  //   children: [
  //     {
  //       path: "/projectManagement",
  //       component: Layout,
  //       redirect: "/projectManagement/list",
  //       name: "projectManagement",
  //       meta: {
  //         title: "项目管理",
  //         // i18n: $t('route.multimenu.root'),
  //         icon: "i-heroicons-solid:menu-alt-3",
  //         alwaysOpened: true,
  //       },
  //       children: [
  //         {
  //           path: "list",
  //           name: "list",
  //           component: () => import("@/views/projectManagement/list/list.vue"),
  //           meta: {
  //             title: "项目列表",
  //           },
  //         },
  //         {
  //           path: "settlement",
  //           name: "settlement",
  //           component: () =>
  //             import("@/views/projectManagement/settlement/list.vue"),
  //           meta: {
  //             title: "项目结算",
  //           },
  //         },
  //         {
  //           path: "materials",
  //           name: "materials",
  //           component: () =>
  //             import("@/views/projectManagement/materials/list.vue"),
  //           meta: {
  //             title: "项目素材",
  //           },
  //         },
  //         {
  //           path: "scheduling",
  //           name: "scheduling",
  //           component: () =>
  //             import("@/views/projectManagement/scheduling/list.vue"),
  //           meta: {
  //             title: "项目调度",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   meta: {
  //     title: "用户管理",
  //     icon: "uim:box",
  //   },
  //   children: [
  //     {
  //       path: "/user",
  //       component: Layout,
  //       redirect: "/user/customer",
  //       name: "user",
  //       meta: {
  //         title: "用户管理",
  //         // i18n: $t('route.multimenu.root'),
  //         icon: "i-heroicons-solid:menu-alt-3",
  //         alwaysOpened: true,
  //       },
  //       children: [
  //         {
  //           path: "customer",
  //           name: "customer",
  //           component: () => import("@/views/user/customer/index.vue"),
  //           meta: {
  //             title: "客户列表",
  //           },
  //         },
  //         {
  //           path: "supplier",
  //           name: "supplier",
  //           component: () => import("@/views/user/supplier/index.vue"),
  //           meta: {
  //             title: "供应商列表",
  //           },
  //         },
  //         {
  //           path: "subVip",
  //           name: "subVip",
  //           component: () => import("@/views/user/subVip/index.vue"),
  //           meta: {
  //             title: "子会员列表",
  //           },
  //         },
  //         {
  //           path: "uidParsing",
  //           name: "uidParsing",
  //           component: () => import("@/views/user/uidParsing/index.vue"),
  //           meta: {
  //             title: "uid解析",
  //           },
  //         },
  //         {
  //           path: "dataExport",
  //           name: "dataExport",
  //           component: () => import("@/views/user/dataExport/index.vue"),
  //           meta: {
  //             title: "数据导出",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   meta: {
  //     title: "记录管理",
  //     icon: "uim:box",
  //   },
  //   children: [
  //     {
  //       path: "/record",
  //       component: Layout,
  //       redirect: "/record/survey ",
  //       name: "record",
  //       meta: {
  //         title: "记录管理",
  //         // i18n: $t('route.multimenu.root'),
  //         icon: "i-heroicons-solid:menu-alt-3",
  //         alwaysOpened: true,
  //       },
  //       children: [
  //         {
  //           path: "recordsurvey",
  //           name: "recordsurvey",
  //           component: () => import("@/views/record/subMemberSurveyRecords/index.vue"),
  //           meta: {
  //             title: "调查记录",
  //           },
  //         },
  //         {
  //           path: "callback",
  //           name: "callback",
  //           component: () => import("@/views/record/callback/index.vue"),
  //           meta: {
  //             title: "回调记录",
  //           },
  //         },
  //         {
  //           path: "temination",
  //           name: "temination",
  //           component: () => import("@/views/record/termination/index.vue"),
  //           meta: {
  //             title: "终止记录",
  //           },
  //         },
  //         {
  //           path: "customerManagement",
  //           name: "customerManagement",
  //           component: () =>
  //             import("@/views/record/customerManagement/index.vue"),
  //           meta: {
  //             title: "客户管理记录",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   meta: {
  //     title: "配置管理",
  //     icon: "uim:box",
  //   },
  //   children: [
  //     {
  //       path: "/configuration",
  //       component: Layout,
  //       redirect: "/configuration/supplierLevel ",
  //       name: "configuration",
  //       meta: {
  //         title: "配置管理",
  //         // i18n: $t('route.multimenu.root'),
  //         icon: "i-heroicons-solid:menu-alt-3",
  //         alwaysOpened: true,
  //       },
  //       children: [
  //         {
  //           path: "supplierLevel",
  //           name: "supplierLevel",
  //           component: () =>
  //             import("@/views/configuration/supplierLevel/index.vue"),
  //           meta: {
  //             title: "供应商等级",
  //           },
  //         },
  //         {
  //           path: "role",
  //           name: "role",
  //           component: () => import("@/views/configuration/role/list.vue"),
  //           meta: {
  //             title: "角色管理",
  //             i18n: $t("route.general.role.list"),
  //             breadcrumb: false,
  //           },
  //         },
  //         {
  //           path: "manager",
  //           name: "manager",
  //           component: () => import("@/views/configuration/manager/list.vue"),
  //           meta: {
  //             title: "用户管理",
  //             i18n: $t("route.general.role.list"),
  //             breadcrumb: false,
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   meta: {
  //     title: "财务管理",
  //     icon: "uim:box",
  //   },
  //   children: [
  //     {
  //       path: "/finance",
  //       component: Layout,
  //       redirect: "/finance/supplierSettlement",
  //       name: "finance",
  //       meta: {
  //         title: "财务管理",
  //         // i18n: $t('route.multimenu.root'),
  //         icon: "i-heroicons-solid:menu-alt-3",
  //         alwaysOpened: true,
  //       },
  //       children: [
  //         {
  //           path: "supplierSettlement",
  //           name: "supplierSettlement",
  //           component: () =>
  //             import("@/views/finance/supplierSettlement/list.vue"),
  //           meta: {
  //             title: "供应商结算",
  //           },
  //         },
  //         {
  //           path: "invoice",
  //           name: "invoice",
  //           component: () => import("@/views/finance/invoice/list.vue"),
  //           meta: {
  //             title: "发票管理",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   meta: {
  //     title: "调查系统",
  //     icon: "uim:box",
  //   },
  //   children: [
  //     {
  //       path: "/survey",
  //       component: Layout,
  //       redirect: "/survey/data",
  //       name: "survey",
  //       meta: {
  //         title: "调查系统",
  //         // i18n: $t('route.multimenu.root'),
  //         icon: "i-heroicons-solid:menu-alt-3",
  //         alwaysOpened: true,
  //       },
  //       children: [
  //         {
  //           path: "surveydata",
  //           name: "surveydata",
  //           component: () => import("@/views/survey/data/list.vue"),
  //           meta: {
  //             title: "数据中心",
  //           },
  //         },
  //         {
  //           path: "investigation_records",
  //           name: "investigation_records",
  //           component: () =>
  //             import("@/views/survey/investigation_records/list.vue"),
  //           meta: {
  //             title: "调查记录",
  //           },
  //         },
  //         {
  //           path: "financialLogs",
  //           name: "financialLogs",
  //           component: () => import("@/views/survey/financial_logs/list.vue"),
  //           meta: {
  //             title: "财务日志",
  //           },
  //         },
  //         {
  //           path: "billManagement",
  //           name: "billManagement",
  //           component: () => import("@/views/survey/bill_management/list.vue"),
  //           meta: {
  //             title: "账单管理",
  //           },
  //         },
  //         {
  //           path: "irQuery",
  //           name: "irQuery",
  //           component: () => import("@/views/survey/ir_query/list.vue"),
  //           meta: {
  //             title: "IR查询",
  //           },
  //         },
  //         {
  //           path: "setting",
  //           name: "setting",
  //           component: () => import("@/views/survey/setting/list.vue"),
  //           meta: {
  //             title: "系统设置",
  //           },
  //         },
  //         {
  //           path: "myProjeck",
  //           name: "myProjeck",
  //           component: () => import("@/views/survey/myProjeck/list.vue"),
  //           meta: {
  //             title: "我的项目",
  //           },
  //         },
  //         {
  //           path: "vip",
  //           name: "vip",
  //           component: () => import("@/views/survey/vip/list.vue"),
  //           meta: {
  //             title: "会员",
  //           },
  //         },
  //         {
  //           path: "vipGroup",
  //           name: "vipGroup",
  //           component: () => import("@/views/survey/vipGroup/list.vue"),
  //           meta: {
  //             title: "会员组",
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   meta: {
  //     title: "其他功能",
  //     icon: "uim:box",
  //   },
  //   children: [
  //     {
  //       path: "/otherFunctions",
  //       component: Layout,
  //       redirect: "/otherFunctions/announcement",
  //       name: "otherFunctions",
  //       meta: {
  //         title: "其他功能",
  //         // i18n: $t('route.multimenu.root'),
  //         icon: "i-heroicons-solid:menu-alt-3",
  //         alwaysOpened: true,
  //       },
  //       children: [
  //         {
  //           path: "announcement",
  //           name: "announcement",
  //           component: () =>
  //             import("@/views/otherFunctions/announcement/list.vue"),
  //           meta: {
  //             title: "文章公告",
  //           },
  //         },
  //         {
  //           path: "websites",
  //           name: "websites",
  //           component: () => import("@/views/otherFunctions/websites/list.vue"),
  //           meta: {
  //             title: "内部站点",
  //           },
  //         },
  //         {
  //           path: "nationalTable",
  //           name: "nationalTable",
  //           component: () =>
  //             import("@/views/otherFunctions/nationalTable/list.vue"),
  //           meta: {
  //             title: "区域对照表",
  //           },
  //         },
  //         {
  //           path: "queryIP",
  //           name: "queryIP",
  //           component: () => import("@/views/otherFunctions/queryIP/list.vue"),
  //           meta: {
  //             title: "IP查询",
  //           },
  //         },
  //         {
  //           path: "dictionary",
  //           name: "dictionary",
  //           component: () =>
  //             import("@/views/otherFunctions/dictionary/index.vue"),
  //           meta: {
  //             title: "字典管理",
  //           },
  //         },
  //         {
  //           path: "tenantDictionary",
  //           name: "tenantDictionary",
  //           component: () =>
  //             import("@/views/otherFunctions/tenantDictionary/index.vue"),
  //           meta: {
  //             title: "租户字典管理",
  //           },
  //         },
  //         {
  //           path: "screenLibrary",
  //           name: "screenLibrary",
  //           component: () =>
  //             import("@/views/otherFunctions/screen_library/list.vue"),
  //           meta: {
  //             title: "前置问卷库",
  //           },
  //           children: [
  //             {
  //               path: "screenLibraryCreate",
  //               name: "screenLibraryCreate",
  //               component: () =>
  //                 import("@/views/otherFunctions/screen_library/detail.vue"),
  //               meta: {
  //                 title: "新增前置问卷库",
  //                 menu: false,
  //               },
  //             },
  //             {
  //               path: "screenLibraryEdit/:id",
  //               name: "screenLibraryEdit",
  //               component: () =>
  //                 import("@/views/otherFunctions/screen_library/detail.vue"),
  //               meta: {
  //                 title: "编辑前置问卷库",
  //                 menu: false,
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];
export default routes;
