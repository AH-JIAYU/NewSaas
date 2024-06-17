import api from "../index";

export default {
  // 获取集合
  list: (data: AnalyserNode) => api.post("member/getMemberProjectList", data),
  // 调查系统-我的项目-查看会员价
  getMemberPriceList: (data: any) => api.post("member/getMemberPriceList", data),

};
