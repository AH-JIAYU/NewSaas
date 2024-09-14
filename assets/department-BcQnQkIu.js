
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

import{a as e}from"./index-D1NMD0Fi.js";const a={list:t=>e.post("department/queryDepartment",t),create:t=>e.post("department/insertDepartment",t),createEvery:()=>e.post("department/getDepartmentStaffList"),departmentGroup:t=>e.post("department/getDepartmentGroupList",t),edit:t=>e.post("department/updateDepartment",t),delete:t=>e.post("department/deleteDepartment",t),detail:t=>e.post("department/getDepartmentQueryDetails",t)};export{a};
