import api from "../index";

export default {
  list: (data: any) => api.post("bill/getMemberBillList", data),
  // 会员新增结算
  create: (data: any) => api.post("bill/addMemberSettlement", data),
  // 会员新增结算-指定结算获取会员可用余额列表
  getMemberBillAvailableBalance: (data: any) =>
    api.post("bill/getMemberBillAvailableBalance", data),
  // 会员-账单管理修改支付状态
  changestatus: (data: any) => api.post("bill/updateMemberBill", data),
};
