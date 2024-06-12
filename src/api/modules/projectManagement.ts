import api from "../index";

export default {
  // 获取集合
  list: (data: any) => api.post("project/getProjectList", data),
  // 详情
  detail: (data: any) => api.post("project/getProject", data),
  // 新增
  create: (data: any) => api.post("project/addProject", data),
  // 编辑
  edit: (data: any) => api.post("project/updateProject", data),
  // 项目分配-重新分配
  allocation: (data: any) => api.post("project/addProjectAllocation", data),
  // 项目选中的国家id集合查询国家列表 "countryIdList": []
  getProjectCountryList: (data: any) =>
    api.post("project/getProjectCountryList", data),
  // 根据国家id查询题库目录
  getProjectCategoryList: (data: any) =>
    api.post("project/getProjectCategoryList", data),
  // 根据题库目录问卷名称id查询具体的问题和答案列表
  getProjectProblemList: (data: any) =>
    api.post("/project/getProjectProblemList", data),
};
