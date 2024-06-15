import api from "../index";

export default {
  // 获取集合
  list: (data: any) => api.post("projectDispatch/getProjectDispatchList", data),
  // 查询未调度的项目列表
  getProjectList: (data: any) => api.post("projectDispatch/getNotDispatchProjectList", data),
  // 新增
  create: (data: any) => api.post("projectDispatch/addProjectDispatch", data),
  // 编辑
  edit: (data: any) => api.post("projectDispatch/updateProjectDispatch", data),
  // 删除
  delete: (data: any) => api.post("projectDispatch/deleteProjectDispatch", data),
  // 根据项目id查询分配的供应商或者会员组列表
  getAllocationGroupOrSupplier: (data: any) => api.post("projectDispatch/getAllocationGroupOrSupplier", data),
};
