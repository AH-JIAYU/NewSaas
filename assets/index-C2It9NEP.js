
/**
 * 由 Fantastic-admin 提供技术支持
 * Powered by Fantastic-admin
 * Gitee  https://fantastic-admin.gitee.io
 * Github https://fantastic-admin.github.io
 */

const e=[{label:"供应商/内部站/合作商",prop:"typeId",sortable:!0,disableCheck:!1,checked:!0},{label:"点击ID",prop:"clientId",sortable:!0,disableCheck:!1,checked:!0},{label:"项目ID",prop:"projectId",sortable:!0,disableCheck:!1,checked:!0},{label:"类型",prop:"type",sortable:!0,disableCheck:!1,checked:!0},{label:"说明",prop:"remark",sortable:!0,disableCheck:!1,checked:!0},{label:"变动前",prop:"beforeBalance",sortable:!0,disableCheck:!1,checked:!0},{label:"加减款",prop:"addAndSubtraction",sortable:!0,disableCheck:!1,checked:!0},{label:"变动后",prop:"afterBalance",sortable:!0,disableCheck:!1,checked:!0},{label:"时间",prop:"createTime",sortable:!0,disableCheck:!1,checked:!0}],l=[{index:1,show:!0,type:"input",modelName:"supplierId",placeholder:"供应商ID"},{index:2,show:!0,type:"input",modelName:"projectId",placeholder:"项目ID"},{index:3,show:!0,type:"select",modelName:"operationType",placeholder:"加减款",option:"operationType",optionLabel:"label",optionValue:"value"},{index:4,show:!0,type:"select",modelName:"type",placeholder:"类型",option:"type",optionLabel:"label",optionValue:"value"},{index:5,show:!0,type:"input",modelName:"TenantId",placeholder:"合作商ID"}];export{e as columns,l as formSearchList};
