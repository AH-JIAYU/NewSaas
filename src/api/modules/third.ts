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
  //短信-启用指定类型的存储配置
  smsEnableConfig: (data: any) =>
    api.post("tenantSmsConfig/enableConfig", data),
  //短信-短信配置列表
  smsGetConfigList: () => api.post("tenantSmsConfig/getConfigList"),
  //短信-阿里云短信配置
  smsUpdateAliConfig: (data: any) =>
    api.post("tenantSmsConfig/updateAliConfig", data),
  //短信-腾讯云短信配置
  smsUpdateTencentConfig: (data: any) =>
    api.post("tenantSmsConfig/updateTencentConfig", data),
};
