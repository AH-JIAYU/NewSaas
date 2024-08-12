import api from "../index";

export default {
  //查询代办列表
  getTenantAuditList: (data: any) =>
    api.post("auditMessage/getTenantAuditList", data),
  //查询消息列表
  getTenantMessageList: (data: any) =>
    api.post("auditMessage/getTenantMessageList", data),
  //修改代办状态-已读或者未读
  updateTenantAudit: (data: any) =>
    api.post("auditMessage/updateTenantAudit", data),
  //未读消息改成已读消息
  updateTenantMessage: (data: any) =>
    api.post("auditMessage/updateTenantMessage", data),
};
