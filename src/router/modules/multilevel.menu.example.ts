import type { RouteRecordRaw } from "vue-router";
import { $t } from "@/locales";

function Layout() {
  return import("@/layouts/index.vue");
}

const routes = [
  {
    meta: {
      title: "首页",
      icon: "uim:box",

    },
    children: [
      {
        path: "/",
        component: Layout,
        redirect: "/homePage",
        name: "multilevelMenuExample",
        meta: {
          title: "首页",
          // i18n: $t('route.multimenu.root'),
          icon: "i-heroicons-solid:menu-alt-3",
          alwaysOpened:true,

        },
        children: [
          {
            path: "homePage",
            name: "homePage",
            component: () => import("@/views/index/index/index.vue"),
            meta: {
              title: "数据中心",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "datacenter",
            name: "datacenter",
            component: () => import("@/views/index/data/index.vue"),
            meta: {
              title: "客户报告",
              // i18n: $t('route.multimenu.page'),
            },
          },
        ],
      },
    ],
  },
  {
    meta: {
      title: "项目管理",
      icon: "uim:box",
    },
    children: [
      {
        path: "/projectManagement",
        component: Layout,
        redirect: "/projectManagement/list",
        name: "projectManagement",
        meta: {
          title: "项目管理",
          // i18n: $t('route.multimenu.root'),
          icon: "i-heroicons-solid:menu-alt-3",
          alwaysOpened:true,
        },
        children: [
          {
            path: "list",
            name: "list",
            component: () => import("@/views/projectManagement/list/list.vue"),
            meta: {
              title: "项目列表",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "settlement",
            name: "settlement",
            component: () =>
              import("@/views/projectManagement/settlement/list.vue"),
            meta: {
              title: "项目结算",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "materials",
            name: "materials",
            component: () =>
              import("@/views/projectManagement/materials/list.vue"),
            meta: {
              title: "项目素材",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "supplementaryPaymentRefund",
            name: "supplementaryPaymentRefund",
            component: () =>
              import(
                "@/views/projectManagement/supplementaryPaymentRefund/list.vue"
              ),
            meta: {
              title: "项目补退款",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "scheduling",
            name: "scheduling",
            component: () =>
              import("@/views/projectManagement/scheduling/list.vue"),
            meta: {
              title: "项目调度",
              // i18n: $t('route.multimenu.page'),
            },
          },
        ],
      },
    ],
  },
  {
    meta: {
      title: "用户管理",
      icon: "uim:box",
    },
    children: [
      {
        path: "/user",
        component: Layout,
        redirect: "/user/customer",
        name: "user",
        meta: {
          title: "用户管理",
          // i18n: $t('route.multimenu.root'),
          icon: "i-heroicons-solid:menu-alt-3",
          alwaysOpened:true,
        },
        children: [
          {
            path: "customer",
            name: "customer",
            component: () => import("@/views/user/customer/index.vue"),
            meta: {
              title: "客户列表",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "supplier",
            name: "supplier",
            component: () => import("@/views/user/supplier/index.vue"),
            meta: {
              title: "供应商列表",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "subVip",
            name: "subVip",
            component: () => import("@/views/user/subVip/index.vue"),
            meta: {
              title: "子会员列表",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "uidParsing",
            name: "uidParsing",
            component: () => import("@/views/user/uidParsing/index.vue"),
            meta: {
              title: "uid解析",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "dataExport",
            name: "dataExport",
            component: () => import("@/views/user/dataExport/index.vue"),
            meta: {
              title: "数据导出",
              // i18n: $t('route.multimenu.page'),
            },
          },
        ],
      },
    ],
  },
  {
    meta: {
      title: "记录管理",
      icon: "uim:box",
    },
    children: [
      {
        path: "/record",
        component: Layout,
        redirect: "/record/survey ",
        name: "record",
        meta: {
          title: "记录管理",
          // i18n: $t('route.multimenu.root'),
          icon: "i-heroicons-solid:menu-alt-3",
          alwaysOpened:true,
        },
        children: [
          {
            path: "recordsurvey",
            name: "recordsurvey",
            component: () => import("@/views/record/survey/index.vue"),
            meta: {
              title: "调查记录",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "callback",
            name: "callback",
            component: () => import("@/views/record/callback/index.vue"),
            meta: {
              title: "回调记录",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "allocation",
            name: "allocation",
            component: () => import("@/views/record/allocation/index.vue"),
            meta: {
              title: "分配记录",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "flowOrder",
            name: "flowOrder",
            component: () => import("@/views/record/flowOrder/index.vue"),
            meta: {
              title: "流单记录",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "temination",
            name: "temination",
            component: () => import("@/views/record/termination/index.vue"),
            meta: {
              title: "终止记录",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "customerManagement",
            name: "customerManagement",
            component: () =>
              import("@/views/record/customerManagement/index.vue"),
            meta: {
              title: "客户管理记录",
              // i18n: $t('route.multimenu.page'),
            },
          },
        ],
      },
    ],
  },
  {
    meta: {
      title: "配置管理",
      icon: "uim:box",
    },
    children: [
      {
        path: "/configuration",
        component: Layout,
        redirect: "/configuration/supplierLevel ",
        name: "configuration",
        meta: {
          title: "配置管理",
          // i18n: $t('route.multimenu.root'),
          icon: "i-heroicons-solid:menu-alt-3",
          alwaysOpened:true,
        },
        children: [
          {
            path: "supplierLevel",
            name: "supplierLevel",
            component: () =>
              import("@/views/configuration/supplierLevel/index.vue"),
            meta: {
              title: "供应商等级",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "role",
            name: "role",
            component: () => import("@/views/configuration/role/list.vue"),
            meta: {
              title: "角色管理",
              i18n: $t("route.general.role.list"),
              breadcrumb: false,
            },
          },
          {
            path: "manager",
            name: "manager",
            component: () => import("@/views/configuration/manager/list.vue"),
            meta: {
              title: "用户管理",
              i18n: $t("route.general.role.list"),
              breadcrumb: false,
            },
          },
        ],
      },
    ],
  },
  {
    meta: {
      title: "财务管理",
      icon: "uim:box",
    },
    children: [
      {
        path: "/finance",
        component: Layout,
        redirect: "/finance/supplierSettlement",
        name: "finance",
        meta: {
          title: "财务管理",
          // i18n: $t('route.multimenu.root'),
          icon: "i-heroicons-solid:menu-alt-3",
          alwaysOpened:true,
        },
        children: [
          {
            path: "supplierSettlement",
            name: "supplierSettlement",
            component: () =>
              import("@/views/finance/supplierSettlement/list.vue"),
            meta: {
              title: "供应商结算",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "invoice",
            name: "invoice",
            component: () => import("@/views/finance/invoice/list.vue"),
            meta: {
              title: "发票管理",
              // i18n: $t('route.multimenu.page'),
            },
          },
        ],
      },
    ],
  },
  {
    meta: {
      title: "调查系统",
      icon: "uim:box",
    },
    children: [
      {
        path: "/survey",
        component: Layout,
        redirect: "/survey/data",
        name: "survey",
        meta: {
          title: "调查系统",
          // i18n: $t('route.multimenu.root'),
          icon: "i-heroicons-solid:menu-alt-3",
          alwaysOpened:true,
        },
        children: [
          {
            path: "surveydata",
            name: "surveydata",
            component: () => import("@/views/survey/data/list.vue"),
            meta: {
              title: "数据中心",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "investigation_records",
            name: "investigation_records",
            component: () =>
              import("@/views/survey/investigation_records/list.vue"),
            meta: {
              title: "调查记录",
            },
          },
          {
            path: "financialLogs",
            name: "financialLogs",
            component: () => import("@/views/survey/financial_logs/list.vue"),
            meta: {
              title: "财务日志",
            },
          },
          {
            path: "billManagement",
            name: "billManagement",
            component: () => import("@/views/survey/bill_management/list.vue"),
            meta: {
              title: "账单管理",
            },
          },
          {
            path: "irQuery",
            name: "irQuery",
            component: () => import("@/views/survey/ir_query/list.vue"),
            meta: {
              title: "IR查询",
            },
          },
          {
            path: "setting",
            name: "setting",
            component: () => import("@/views/survey/setting/list.vue"),
            meta: {
              title: "系统设置",
            },
          },
          {
            path: "myProjeck",
            name: "myProjeck",
            component: () => import("@/views/survey/myProjeck/list.vue"),
            meta: {
              title: "我的项目",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "vip",
            name: "vip",
            component: () => import("@/views/survey/vip/list.vue"),
            meta: {
              title: "会员",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "vipGroup",
            name: "vipGroup",
            component: () => import("@/views/survey/vipGroup/list.vue"),
            meta: {
              title: "会员组",
              // i18n: $t('route.multimenu.page'),
            },
          },
        ],
      },
    ],
  },
  {
    meta: {
      title: "其他功能",
      icon: "uim:box",
    },
    children: [
      {
        path: "/otherFunctions",
        component: Layout,
        redirect: "/otherFunctions/announcement",
        name: "otherFunctions",
        meta: {
          title: "其他功能",
          // i18n: $t('route.multimenu.root'),
          icon: "i-heroicons-solid:menu-alt-3",
          alwaysOpened:true,
        },
        children: [
          {
            path: "announcement",
            name: "announcement",
            component: () =>
              import("@/views/otherFunctions/announcement/list.vue"),
            meta: {
              title: "文章公告",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "websites",
            name: "websites",
            component: () => import("@/views/otherFunctions/websites/list.vue"),
            meta: {
              title: "内部站点",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "nationalTable",
            name: "nationalTable",
            component: () =>
              import("@/views/otherFunctions/nationalTable/list.vue"),
            meta: {
              title: "国家对照表",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "queryIP",
            name: "queryIP",
            component: () => import("@/views/otherFunctions/queryIP/list.vue"),
            meta: {
              title: "IP查询",
              // i18n: $t('route.multimenu.page'),
            },
          },
          {
            path: "questionnaire",
            name: "questionnaire",
            component: () =>
              import("@/views/otherFunctions/questionnaire/list.vue"),
            meta: {
              title: "问卷",
              // i18n: $t('route.multimenu.page'),
            },
          },
        ],
      },
    ],
  },
];
export default routes;
