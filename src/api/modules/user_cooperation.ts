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
  // 修改租户负责人
  updateInvitationBindUser: (data: any) => api.post("tenantBind/updateInvitationBindUser", data),
  // 项目列表用
  // 项目分配-查询合作租户列表
  getAllocationBindList: (data: any) => api.post("tenantBind/getAllocationBindList", data),
  // 项目分配-查询合作租户列表
  getTenantSupplierMemberNameInfo: (data: any) => api.post("tenantBind/getTenantSupplierMemberNameInfo", data),
  // 查询公司财务日志 (自己是甲方调用该接口)
  queryCompanyRecordQueryAmount: (data: any) => api.post("financial-record/queryCompanyRecordQueryAmount", data),
  //查询合作商财务日志(自己是乙方调用该接口)
  queryBeCompanyRecordQueryAmount: (data: any) => api.post("financial-record/queryBeCompanyRecordQueryAmount", data),


};
