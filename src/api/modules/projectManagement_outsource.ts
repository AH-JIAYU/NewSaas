import api from "../index";

export default {
  // 获取集合
  list: (data: any) => api.post("tenantBind/getProjectAllocationList", data),
  // 项目管理-项目外包-测查
  getTenantMeasurementList: (data: any) =>
    api.post("tenantBind/getTenantMeasurementList", data),
};
