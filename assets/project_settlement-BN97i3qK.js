
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as e}from"./index-puGejJ6c.js";const l={list:t=>e.post("projectSettlement/getProjectSettlementList",t),review:t=>e.post("projectSettlement/projectSettlement",t),edit:t=>e.post("projectSettlement/updateProjectSettlement",t),detail:t=>e.post("projectSettlement/getProjectSettlementRefundList",t),omissionProject:t=>e.post("projectSettlement/insertProjectSettlement",t),InvoicingSettlementEdit:t=>e.post("projectSettlement/updateProjectSettlementStatus",t),getProjectSettlementDetails:t=>e.post("projectSettlement/getProjectSettlementDetails",t),getProjectSettlementClickIdDetails:t=>e.post("projectSettlement/getProjectSettlementClickIdDetails",t),getSettlementWebSocket:t=>e.get(`settlement-socket/getSettlementWebSocket?projectId=${t}`),exportProjectSettlementList:t=>e.post("projectSettlement/exportProjectSettlementList",t,{responseType:"blob"}),exportProjectSettlementDetails:t=>e.post("projectSettlement/exportProjectSettlementDetails",t,{responseType:"blob"}),exportProjectSettlementClickIdDetails:t=>e.post("projectSettlement/exportProjectSettlementClickIdDetails",t,{responseType:"blob"}),delete:t=>e.post("menu/delete",{id:t},{baseURL:"/mock/"})};export{l as a};
