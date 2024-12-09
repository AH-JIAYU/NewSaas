import api from "../index";

export default {
  // 获取租户logo
  getTenantLogo: (data?: any) => api.post("tenant-logo/getTenantLogo", data),
  // 修改logo
  uploadLogo: (data?: any) => api.post("tenant-logo/upload", data),
  // 删除logo
  deleteLogo: () => api.post("tenant-logo/deleteLogo"),
};
