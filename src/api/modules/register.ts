import api from "../index";

export default {
  // 发送手机验证码
  sendSms: (phoneNumber: any) => api.post("user/sendSms", { phoneNumber }),
  // 发送邮箱验证码
  sendEmail: (email: any) => api.post("user/sendEmail", { email }),
  // 注册接口
  register: (data: any) => api.post("user/register", data),

};
