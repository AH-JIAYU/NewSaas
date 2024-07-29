import api from "../index";

export default {

  list: (data: any) => api.post("callback/getProjectSurveyScreenList", data),
  // 点击展开
  childList: (data: any) => api.post("callback/getProjectScreenMemberChildList", data),
  // 记录管理-前置问卷详情
  getDetail: (data: any) => api.post("callback/getProjectSurveyScreenDetailList", data),

};
