import api from "../index";

export default {
  list: (data: AnalyserNode) =>
    api.post("memberLevel/getMemberLevelList", data),

  create: (data: any) => api.post("memberLevel/addMemberLevel", data),

  edit: (data: any) => api.post("memberLevel/updateMemberLevel", data),

  delete: (data: any) => api.post("memberLevel/deleteMemberLevel", data),
};
