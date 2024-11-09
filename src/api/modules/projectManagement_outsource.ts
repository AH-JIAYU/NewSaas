import api from "../index";

export default {
  // 获取集合
  list: (data: any) => api.post("tenantBind/getProjectAllocationList", data),
  meList: (data: any) => api.post("tenantBind/getProjectMeAllocationList", data),
  // 项目管理-项目外包-测查
  getTenantMeasurementList: (data: any) =>
    api.post("tenantBind/getTenantMeasurementList", data),
  // 项目管理-项目外包-测查-点击查询
  getQuestionnaireClickList: (data: any) =>
    api.post("tenantBind/getQuestionnaireClickList", data),
  //接收，取消接收
  updateReceiveStatus: (data: any) =>
    api.post("tenantBind/updateReceiveStatus", data),
};
