import api from "../index";

export default {
  // 获取集合
  list: (data: any) => api.post("memberGroup/getMemberGroupList", data),
  // 获取单个
  detail: (data: any) => api.post("memberGroup/getMemberGroupInfo", data),
  // 获取关联项目列表
  getProjectList: (data: any) =>
    api.post("memberGroup/getMemberGroupProjectList", data),
  // 新增会员-查询会员组列表调用此接口
  getGroupNameList: (data: any) =>
    api.post("memberGroup/getMemberGroupNameList", data),
  // 新增
  create: (data: any) => api.post("memberGroup/addMemberGroup", data),
  // 修改
  edit: (data: any) => api.post("memberGroup/updateMemberGroup", data),
  // 修改状态
  changestatus: (data: any) =>
    api.post("memberGroup/updateMemberGroupStatus", data),
};
