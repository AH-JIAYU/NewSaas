import api from "../index";

export default {
  // 获取集合
  list: (data: AnalyserNode) =>
    api.post("memberLevel/getMemberLevelList", data),
  // 新增
  create: (data: any) => api.post("memberLevel/addMemberLevel", data),
  // 编辑
  edit: (data: any) => api.post("memberLevel/updateMemberLevel", data),
  // 删除
  delete: (data: any) => api.post("memberLevel/deleteMemberLevel", data),
  // 查询会员等级集合-新增会员调用此接口
  getLevelNameList: (data: any) =>
    api.post("memberLevel/getMemberLevelNameList", data),
};
