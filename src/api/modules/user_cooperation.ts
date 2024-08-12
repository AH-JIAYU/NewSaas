import api from "../index";
import axios from "axios";

export default {
  // 获取列表
  list: (data: any) => api.post("tenantBind/getTenantBindList", data),
  // 查询租户列表(激活的租户列表) 邀请租户调用
  getTenantUserList: (data: any) => api.post("tenantBind/getTenantUserList", data),
  // 公司邀请-发起邀请
  addInvitationBind: (data: any) => api.post("tenantBind/addInvitationBind", data),
  // 修改价格比例
  updateInvitationBind: (data: any) => api.post("tenantBind/updateInvitationBind", data),
  // 租户解约-终止合作
  updateRescindTenant: (data: any) => api.post("tenantBind/updateRescindTenant", data),

};
