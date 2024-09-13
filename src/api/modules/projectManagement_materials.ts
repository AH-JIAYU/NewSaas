import api from "../index";

export default {
  // 获取集合
  list: (data: any) => api.post("projectMaterial/getProjectMaterialList", data),
  // 新增
  create: (data: any) =>
    api.post("projectMaterial/addProjectMaterialDetails", data),
  // 删除
  delete: (data: any) =>
    api.post("projectMaterial/deleteProjectMaterial", data),
  //
  deleteMaterialDetails: (data: any) =>
    api.post("projectMaterial/deleteProjectMaterialDetails", data),
  // 
  changeRemark: (data: any) =>
    api.post("projectMaterial/updateProjectMaterialInstructions", data),
};
