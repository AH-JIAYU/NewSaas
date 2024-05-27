import api from "../index";

export default {
  list: (data: any) => api.post("project/getProjectList", data),
  create: (data: any) => api.post("project/addProject", data),
  edit: (data: any) => api.post("project/updateProject", data),
  detail: (data: any) => api.post("project/getProject", data),
};
