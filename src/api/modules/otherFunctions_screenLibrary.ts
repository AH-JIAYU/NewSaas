import api from "../index";

export default {
  list: (data?: any) =>
    api.post("projectProblem/getProjectProblemCategory", data),

  create: (data: any) =>
    api.post("projectProblem/addProjectProblemCategory", data),

  edit: (data: any) =>
    api.post("projectProblem/updateProjectProblemCategory", data),
  // 修改默认国家
  update: (data: any) => api.post("projectProblem/updateCountryDefault", data),
  // 删除租户问卷名称或者国家
  delete: (data: any) =>
    api.post("projectProblem/deleteProjectProblemCategory", data),
  // 删除问题或者答案 批量
  deleteProjectProblem: (data: any) =>
    api.post("projectProblem/deleteProjectProblem", data),
  // 设计问卷
  setSurvey: (data: any) => api.post("projectProblem/addProjectProblem", data),
  // 获取问卷
  getSurvey: (projectProblemCategoryId: any) =>
    api.post("projectProblem/getProjectProblem", {
      projectProblemCategoryId,
    }),
  // 获取问卷
  getId: (data: any) => api.post("/projectProblem/getSnowFlake", data),
};
