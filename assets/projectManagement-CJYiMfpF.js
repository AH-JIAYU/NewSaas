
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as e}from"./index-CFkZrq6v.js";const r={list:t=>e.post("project/getProjectList",t),detail:t=>e.post("project/getProject",t),getProjectOperationRecordList:t=>e.post("project/getProjectOperationRecordList",t),create:t=>e.post("project/addProject",t),edit:t=>e.post("project/updateProject",t),changestatus:t=>e.post("/project/updateProjectStatus",t),allocation:t=>e.post("project/addProjectAllocation",t),getProjectAllocation:t=>e.post("project/getProjectAllocation",t),getProjectCountryList:t=>e.post("project/getProjectCountryList",t),getProjectCategoryList:t=>e.post("project/getProjectCategoryList",t),getProjectProblemList:t=>e.post("/project/getProjectProblemList",t),updateExchangeRate:t=>e.post("project/updateExchangeRate",t),addOrUpdateProjectOutsideInfo:t=>e.post("project/addOrUpdateProjectOutsideInfo",t)};export{r as a};
