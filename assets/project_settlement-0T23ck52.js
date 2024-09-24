
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as e}from"./index-BmzI4w-v.js";const n={list:t=>e.post("projectSettlement/getProjectSettlementList",t),review:t=>e.post("projectSettlement/projectSettlement",t),edit:t=>e.post("projectSettlement/updateProjectSettlement",t),detail:t=>e.post("projectSettlement/getProjectSettlementRefundList",t),omissionProject:t=>e.post("projectSettlement/insertProjectSettlement",t),InvoicingSettlementEdit:t=>e.post("projectSettlement/updateProjectSettlementStatus",t),delete:t=>e.post("menu/delete",{id:t},{baseURL:"/mock/"})};export{n as a};
