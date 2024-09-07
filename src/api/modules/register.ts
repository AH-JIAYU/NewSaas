import api from "../index";

export default {
  // 发送验证码
  sendCode: (data: any) => api.post("user/sendCode", data),
  // 租户忘记密码发送验证码
  forgetCode: (data: any) => api.post("user/updatePasswordSendCode", data),
  // 租户修改密码
  updatePassword: (data: any) => api.post("user/updatePassword", data),
  // 注册接口
  register: (data: any) => api.post("user/register", data),
  // 获取租户配置
  getTenantConfig: (data: any) => api.post("tenant-config/getTenantConfig", data),
};
