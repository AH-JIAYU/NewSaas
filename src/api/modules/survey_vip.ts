import api from "../index";

export default {
  // 获取集合
  list: (data: AnalyserNode) => api.post("member/getMemberList", data),
  // 获取单个
  detail: (data: any) => api.post("member/getMemberInfo", data),
  // 新增 批量
  create: (data: any) => api.post("member/addMember", data),
  // 修改  单个
  edit: (data: any) => api.post("member/updateMember", data),
  // 修改状态  单个
  changestatus: (data: any) => api.post("member/updateMemberStatus", data),
  // 新增-修改会员组-查询组成员调用此接口
  getNickNameList: (data: any) =>
    api.post("member/getMemberLikeNickNameList", data),
    // 会员加减款
    getMemberPlusMinusPaymentsList: (data: any) =>
    api.post("member/additionSubtractionMember", data),
};
