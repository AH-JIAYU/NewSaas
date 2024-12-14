// 列表配置项
export const columns = [
  {
    label: "职位ID",
    prop: "id",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "职位名称",
    prop: "name",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "账户数",
    prop: "count",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
  {
    label: "备注",
    prop: "remark",
    sortable: true,
    // 不可改变的
    disableCheck: false,
    checked: true,
  },
]
// 搜索配置项
export const formSearchList = [
  { index: 1, show: true, type: 'input', modelName: 'id', placeholder: '职位ID' },
  { index: 2, show: true, type: 'input', modelName: 'name', placeholder: '职位名称' },
  // { index: 3, show: true, type: 'select', modelName: 'active', placeholder: '状态', option: 'active', optionLabel: 'lable', optionValue: 'value' }
]
