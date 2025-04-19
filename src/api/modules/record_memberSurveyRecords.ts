import api from "../index";

export default {

  // list: (data: any) => api.post("callback/getMemberSurveyRecord", data),
  list: (data: any) => api.post("callback/getMemberChildSurveyRecord", data),
// 导出项目结算
exportProjectSettlementList: (data: any) => api.post('callback/exportExcelSurveyRecord', data,{ responseType: 'blob',timeout:120000 }),
};
