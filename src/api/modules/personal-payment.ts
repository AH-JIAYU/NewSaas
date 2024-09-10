import api from "../index";

export default {
  // pay
  pay: (params?: any) =>
    api.get("alipay/pay", { params }),
};
