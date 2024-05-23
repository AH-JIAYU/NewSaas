import api from "../index";

export default {
  // list: (data: {
  //   title?: string
  //   from: number
  //   limit: number
  // }) => api.get('otherFunctions/screen_library/list', {
  //   params: data,
  //   baseURL: '/mock/',
  // }),

  // detail: (id: number | string) => api.get('otherFunctions/screen_library/detail', {
  //   params: {
  //     id,
  //   },
  //   baseURL: '/mock/',
  // }),

  // create: (data: any) => api.post('otherFunctions/screen_library/create', data, {
  //   baseURL: '/mock/',
  // }),

  // edit: (data: any) => api.post('otherFunctions/screen_library/edit', data, {
  //   baseURL: '/mock/',
  // }),

  // delete: (id: number | string) => api.post('otherFunctions/screen_library/delete', {
  //   id,
  // }, {
  //   baseURL: '/mock/',
  // }),
  list: (data?: any) =>
    api.post("projectProblem/getProjectProblemCategory", data),

  create: (data: any) =>
    api.post("projectProblem/addProjectProblemCategory", data),

  edit: (data: any) =>
    api.post("projectProblem/updateProjectProblemCategory", data),

  delete: (projectProblemCategoryId: number | string) =>
    api.post("projectProblem/deleteProjectProblemCategory", {
      projectProblemCategoryId,
    }),
  // 设计问卷
  setSurvey: (data: any) => api.post("projectProblem/addProjectProblem", data),
  // 获取问卷
  getSurvey: (projectProblemCategoryId: any) =>
    api.post("projectProblem/getProjectProblem", {
      projectProblemCategoryId,
    }),

  // detail: (id: number | string) =>
  //   api.post(
  //     "otherFunctions/screen_library/delete",
  //     {
  //       id,
  //     },
  //     {
  //       baseURL: "/mock/",
  //     }
  //   ),
};
