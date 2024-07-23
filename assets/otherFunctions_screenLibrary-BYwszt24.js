
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{k as o}from"./index-D_1RSG3C.js";const r={list:e=>o.post("projectProblem/getProjectProblemCategory",e),create:e=>o.post("projectProblem/addProjectProblemCategory",e),edit:e=>o.post("projectProblem/updateProjectProblemCategory",e),update:e=>o.post("projectProblem/updateCountryDefault",e),delete:e=>o.post("projectProblem/deleteProjectProblemCategory",e),deleteProjectProblem:e=>o.post("projectProblem/deleteProjectProblem",e),setSurvey:e=>o.post("projectProblem/addProjectProblem",e),getSurvey:e=>o.post("projectProblem/getProjectProblem",{projectProblemCategoryId:e}),getId:e=>o.post("/projectProblem/getSnowFlake",e)};export{r as a};
