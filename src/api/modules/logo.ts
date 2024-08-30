import api from "../index";

export default {
  getTenantLogo: (data?: any) => api.post("tenant-logo/getTenantLogo", data),
  uploadLogo: (data?: any) => api.post("tenant-logo/upload", data),
};
