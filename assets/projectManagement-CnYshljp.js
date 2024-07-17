
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as o}from"./index-B4ooH8ql.js";const r={list:t=>o.post("project/getProjectList",t),detail:t=>o.post("project/getProject",t),create:t=>o.post("project/addProject",t),edit:t=>o.post("project/updateProject",t),changestatus:t=>o.post("/project/updateProjectStatus",t),allocation:t=>o.post("project/addProjectAllocation",t),getProjectAllocation:t=>o.post("project/getProjectAllocation",t),getProjectCountryList:t=>o.post("project/getProjectCountryList",t),getProjectCategoryList:t=>o.post("project/getProjectCategoryList",t),getProjectProblemList:t=>o.post("/project/getProjectProblemList",t)};export{r as a};
