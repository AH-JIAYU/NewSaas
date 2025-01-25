import { setupLayouts } from "virtual:meta-layouts";
import generatedRoutes from "virtual:generated-pages";
import type { RouteRecordRaw } from "vue-router";
import MultilevelMenuExample from "./modules/multilevel.menu.example";
import type { Route } from "#/global";
import { $t } from "@/locales";
import useSettingsStore from "@/store/modules/settings";
function Layout() {
  return import("@/layouts/index.vue");
}

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
  // {
  //   path: "/home",
  //   name: "home",
  //   // component: () => import("@/views/home/index.vue"),
  //   component: () => Layout,
  //   meta: {
  //     whiteList: false,
  //   },
  // },
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
        name: "notification",
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
      {
        path: "/list",
        name: "list",
        component: () => import("@/views/projectManagement/list/list.vue"),
        meta: {
          title: "项目列表",
          i18n: $t("route.projectManagement.projectlist"),
        }
      },
      {
        path: "projectManagement/settlement",
        name: "settlement",
        component: () => import("@/views/projectManagement/settlement/list.vue"),
        meta: {
          title: "项目结算",
          i18n: $t("route.projectManagement.settlement"),
        }
      },
      {
        path: "projectManagement/scheduling",
        name: "scheduling",
        component: () => import("@/views/projectManagement/scheduling/list.vue"),
        meta: {
          title: "项目调度",
          i18n: $t("route.projectManagement.projectscheduling"),
        }
      },
      {
        path: "projectManagement/materials",
        name: "materials",
        component: () => import("@/views/projectManagement/materials/list.vue"),
        meta: {
          title: "项目素材",
          i18n: $t("route.projectManagement.projectmaterials"),
        }
      },
      {
        path: "projectManagement/outsource",
        name: "outsource",
        component: () => import("@/views/projectManagement/outsource/list.vue"),
        meta: {
          title: "项目外包",
          i18n: $t("route.projectManagement.projectoutsource"),
        }
      },
      {
        path: "user/customer",
        name: "customer",
        component: () => import("@/views/user/customer/index.vue"),
        meta: {
          title: "客户列表",
          i18n: $t("route.user.customerlist"),
        }
      },
      {
        path: "user/supplier",
        name: "supplier",
        component: () => import("@/views/user/supplier/index.vue"),
        meta: {
          title: "供应商列表",
          i18n: $t("route.user.supplierlist"),
        }
      },
      {
        path: "user/subVip",
        name: "subVip",
        component: () => import("@/views/user/subVip/index.vue"),
        meta: {
          title: "子会员列表",
          i18n: $t("route.user.subVip"),
        }
      },
      {
        path: "record/memberSurveyRecords",
        name: "memberSurveyRecords",
        component: () => import("@/views/record/memberSurveyRecords/index.vue"),
        meta: {
          title: "调查记录",
          i18n: $t("route.record.memberSurveyRecords"),
        }
      },
      {
        path: "record/preInvestigationRecords",
        name: "preInvestigationRecords",
        component: () => import("@/views/record/preInvestigationRecords/index.vue"),
        meta: {
          title: "前置记录",
          i18n: $t("route.record.preInvestigationRecords"),
        }
      },
      {
        path: "record/alter",
        name: "alter",
        component: () => import("@/views/record/alter/list.vue"),
        meta: {
          title: "记录变更",
          i18n: $t("route.record.alter"),
        }
      },
      {
        path: "record/termination",
        name: "termination",
        component: () => import("@/views/record/termination/index.vue"),
        meta: {
          title: "终止记录",
          i18n: $t("route.record.termination"),
        }
      },
      {
        path: "record/callback",
        name: "callback",
        component: () => import("@/views/record/callback/index.vue"),
        meta: {
          title: "回调记录",
          i18n: $t("route.record.callback"),
        }
      },
      {
        path: "configuration/user",
        name: "configuration",
        component: () => import("@/views/configuration/user/index.vue"),
        meta: {
          title: "用户管理",
          i18n: $t("route.configuration.user"),
        }
      },
      {
        path: "configuration/department",
        name: "department",
        component: () => import("@/views/configuration/department/list.vue"),
        meta: {
          title: "部门管理",
          i18n: $t("route.configuration.department"),
        }
      },
      {
        path: "configuration/role",
        name: "role",
        component: () => import("@/views/configuration/role/list.vue"),
        meta: {
          title: "角色管理",
          i18n: $t("route.configuration.role"),
        }
      },
      {
        path: "configuration/position_manage",
        name: "position_manage",
        component: () => import("@/views/configuration/position_manage/list.vue"),
        meta: {
          title: "职位管理",
          i18n: $t("route.configuration.positionmanage"),
        }
      },
      {
        path: "configuration/supplierLevel",
        name: "supplierLevel",
        component: () => import("@/views/configuration/supplierLevel/index.vue"),
        meta: {
          title: "供应商等级",
          i18n: $t("route.configuration.supplierLevel"),
        }
      },
      {
        path: "configuration/screen_library",
        name: "screen_library",
        component: () => import("@/views/configuration/screen_library/list.vue"),
        meta: {
          title: "前置问卷库",
          i18n: $t("route.configuration.screenlibrary"),
        }
      },
      {
        path: "configuration/site_setting",
        name: "site_setting",
        component: () => import("@/views/configuration/site_setting/list.vue"),
        meta: {
          title: "站点设置",
          i18n: $t("route.configuration.sitesetting"),
        }
      },
      {
        path: "configuration/homepageSetting",
        name: "homepageSetting",
        component: () => import("@/views/configuration/homepageSetting/list.vue"),
        meta: {
          title: "站点模板",
          i18n: $t("route.configuration.homepageSetting"),
        }
      },
      {
        path: "configuration/third_config",
        name: "third_config",
        component: () => import("@/views/configuration/third/index.vue"),
        meta: {
          title: "第三方配置",
          i18n: $t("route.configuration.thirdconfig"),
        }
      },
      {
        path: "finance/financial_log",
        name: "financial_log",
        component: () => import("@/views/finance/financial_log/list.vue"),
        meta: {
          title: "财务日志",
          i18n: $t("route.finance.financiallog"),
        }
      },
      {
        path: "finance/partner_financial_log",
        name: "partner_financial_log",
        component: () => import("@/views/finance/partner_financial_log/list.vue"),
        meta: {
          title: "合作财务商日志",
          i18n: $t("route.finance.partnerfinanciallog"),
        }
      },
      {
        path: "finance/supplierSettlement",
        name: "supplierSettlement",
        component: () => import("@/views/finance/supplierSettlement/list.vue"),
        meta: {
          title: "供应商结算",
          i18n: $t("route.finance.supplierSettlement"),
        }
      },
      {
        path: "finance/PMSettlement",
        name: "PMSettlement",
        component: () => import("@/views/finance/PMSettlement/list.vue"),
        meta: {
          title: "部门结算",
          i18n: $t("route.finance.PMSettlement"),
        }
      },
      {
        path: "finance/pm_log",
        name: "pm_log",
        component: () => import("@/views/finance/pm_log/list.vue"),
        meta: {
          title: "部门提成",
          i18n: $t("route.finance.pmlog"),
        }
      },
      {
        path: "finance/invoice",
        name: "invoice",
        component: () => import("@/views/finance/invoice/list.vue"),
        meta: {
          title: "发票管理",
          i18n: $t("route.finance.invoice"),
        }
      },
      {
        path: "otherFunctions/announcement",
        name: "announcement",
        component: () => import("@/views/otherFunctions/announcement/list.vue"),
        meta: {
          title: "文章公告",
          i18n: $t("route.otherFunctions.announcement"),
        }
      },
      {
        path: "otherFunctions/basicDictionary",
        name: "basicDictionary",
        component: () => import("@/views/otherFunctions/basicDictionary/index.vue"),
        meta: {
          title: "基础字典",
          i18n: $t("route.otherFunctions.basicDictionary"),
        }
      },
      {
        path: "otherFunctions/tenantDictionary",
        name: "tenantDictionary",
        component: () => import("@/views/otherFunctions/tenantDictionary/index.vue"),
        meta: {
          title: "租户字典",
          i18n: $t("route.otherFunctions.tenantDictionary"),
        }
      },
      {
        path: "otherFunctions/queryIP",
        name: "queryIP",
        component: () => import("@/views/otherFunctions/queryIP/list.vue"),
        meta: {
          title: "IP查询",
          i18n: $t("route.otherFunctions.queryIP"),
        }
      },
      {
        path: "otherFunctions/uidParsing",
        name: "uidParsing",
        component: () => import("@/views/otherFunctions/uidParsing/index.vue"),
        meta: {
          title: "UID解析",
          i18n: $t("route.otherFunctions.uidParsing"),
        }
      },
      {
        path: "survey/surveydata",
        name: "surveydata",
        component: () => import("@/views/survey/data/list.vue"),
        meta: {
          title: "数据中心",
          i18n: $t("route.survey.surveydata"),
        }
      },
      {
        path: "survey/myProjeck",
        name: "myProjeck",
        component: () => import("@/views/survey/myProjeck/list.vue"),
        meta: {
          title: "我的项目",
          i18n: $t("route.survey.myProjeck"),
        }
      },
      {
        path: "survey/investigation_records",
        name: "investigation_records",
        component: () => import("@/views/survey/investigation_records/list.vue"),
        meta: {
          title: "调查记录",
          i18n: $t("route.survey.investigationrecords"),
        }
      },
      {
        path: "survey/vip",
        name: "vip",
        component: () => import("@/views/survey/vip/list.vue"),
        meta: {
          title: "会员管理",
          i18n: $t("route.survey.vip"),
        }
      },
      {
        path: "survey/vipDepartment",
        name: "vipDepartment",
        component: () => import("@/views/survey/vip_department/list.vue"),
        meta: {
          title: "部门管理",
          i18n: $t("route.survey.vipDepartment"),
        }
      },
      {
        path: "survey/vipLevel",
        name: "vipLevel",
        component: () => import("@/views/survey/vipLevel/index.vue"),
        meta: {
          title: "会员等级",
          i18n: $t("route.survey.vipLevel"),
        }
      },
      {
        path: "survey/irQuery",
        name: "irQuery",
        component: () => import("@/views/survey/ir_query/list.vue"),
        meta: {
          title: "IR查询",
          i18n: $t("route.survey.irQuery"),
        }
      },
      {
        path: "survey/financialLogs",
        name: "financialLogs",
        component: () => import("@/views/survey/financial_logs/list.vue"),
        meta: {
          title: "财务日志",
          i18n: $t("route.survey.financialLogs"),
        }
      }, {
        path: "survey/billManagement",
        name: "billManagement",
        component: () => import("@/views/survey/bill_management/list.vue"),
        meta: {
          title: "账单管理",
          i18n: $t("route.survey.billManagement"),
        }
      },
      {
        path: "survey/setting",
        name: "setting",
        component: () => import("@/views/survey/setting/list.vue"),
        meta: {
          title: "站点设置",
          i18n: $t("route.survey.setting"),
        }
      }
    ],
  }
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
