import api from "../index";

export default {
  list: (data: any) => api.post("callback/getProjectTerminationScreenDetail", data),
};
