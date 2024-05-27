import api from "../index";

export default {
  upload: (data?: any) => api.post("project/uploadQiniu", data),
  detail: (data?: any) => api.post("project/getQiniuFileUrl", data),
  delete: (data?: any) => api.post("project/deleteQiniu", data),
};
