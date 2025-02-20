import api from "../index";

export default {
  // 获取集合
  list: (data: any) => api.post("project/getProjectList", data),
  // 详情
  detail: (data: any) => api.post("project/getProject", data),
  // 操作日志详情
  getProjectOperationRecordList: (data: any) => api.post("project/getProjectOperationRecordList", data),



  getProjectOperationList: (data: any) => api.post("project/getProjectOperationList", data),

  // 新增
  create: (data: any) => api.post("project/addProject", data),
  // 编辑
  edit: (data: any) => api.post("project/updateProject", data),
  // 修改状态
  changestatus: (data: any) => api.post("/project/updateProjectStatus", data),
  // 项目分配-重新分配
  allocation: (data: any) => api.post("project/addProjectAllocation", data),
  // 项目分配回显-当项目状态等于已分配调用此接口,如果是未分配不需要调用此接口
  getProjectAllocation: (data: any) => api.post("project/getProjectAllocation", data),

  // 项目选中的区域id集合查询区域列表 "countryIdList": []
  getProjectCountryList: (data: any) =>
    api.post("project/getProjectCountryList", data),
  // 根据区域id查询题库目录
  getProjectCategoryList: (data: any) =>
    api.post("project/getProjectCategoryList", data),
  // 根据题库目录问卷名称id查询具体的问题和答案列表
  getProjectProblemList: (data: any) =>
    api.post("/project/getProjectProblemList", data),
  // 汇率切换计算
  updateExchangeRate: (data: any) => api.post("project/updateExchangeRate", data),
  // 外包项目编辑项目详情(针对外包项目的编辑)
  addOrUpdateProjectOutsideInfo: (data: any) => api.post("project/addOrUpdateProjectOutsideInfo", data),
};
