// 列表配置项
export const columns = [
  // 表格控件-展示列
  {
    label: "供应商/内部站/合作商",
    prop: "typeId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "点击ID",
    prop: "clientId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "项目ID",
    prop: "projectId",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "类型",
    prop: "type",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "说明",
    prop: "remark",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "变动前",
    prop: "beforeBalance",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "加减款",
    prop: "addAndSubtraction",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "变动后",
    prop: "afterBalance",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
  {
    label: "时间",
    prop: "createTime",
    sortable: true,
    disableCheck: false, // 不可更改
    checked: true, // 默认展示
  },
]

// 搜索配置项
export const formSearchList = [
  {
    index: 1,
    show: true,
    type: "input",
    modelName: "supplierId",
    placeholder: "供应商ID",
  },
  {
    index: 2,
    show: true,
    type: "input",
    modelName: "projectId",
    placeholder: "项目ID",
  },
  {
    index: 3,
    show: true,
    type: "select",
    modelName: "operationType",
    placeholder: "加减款",
    option: "operationType",
    optionLabel: "label",
    optionValue: "value",
  },
  {
    index: 4,
    show: true,
    type: "select",
    modelName: "type",
    placeholder: "类型",
    option: "type",
    optionLabel: "label",
    optionValue: "value",
  },
  {
    index: 5,
    show: true,
    type: "input",
    modelName: "TenantId",
    placeholder: "合作商ID",
  },
];
