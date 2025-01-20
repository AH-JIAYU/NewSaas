import api from "../index";

export default {
  // 云存储-启用指定类型的存储配置
  enableConfig: (data: any) =>
    api.post("tenantStorageConfig/enableConfig", data),

  // 云存储-存储配置列表
  getConfigList: () => api.post("tenantStorageConfig/getConfigList"),

  // 云存储-更新阿里云OSS存储配置
  updateAliConfig: (data: any) =>
    api.post("tenantStorageConfig/updateAliConfig", data),

  // 云存储-更新七牛云OSS存储配置
  updateQiniuConfig: (data: any) =>
    api.post("tenantStorageConfig/updateQiniuConfig", data),
};
