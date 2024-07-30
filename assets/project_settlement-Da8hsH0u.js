
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as e}from"./index-XH02SKV1.js";const p={list:t=>e.post("projectSettlement/get/getProjectSettlementList",t),review:t=>e.post("projectSettlement/update/projectSettlement",t),edit:t=>e.post("projectSettlement/update/updateProjectSettlement",t),detail:t=>e.post("projectSettlement/get/getProjectSettlementRefundList",t),omissionProject:t=>e.post("projectSettlement/insert/insertProjectSettlement",t),InvoicingSettlementEdit:t=>e.post("projectSettlement/updateProjectSettlementStatus",t),delete:t=>e.post("menu/delete",{id:t},{baseURL:"/mock/"})};export{p as a};
