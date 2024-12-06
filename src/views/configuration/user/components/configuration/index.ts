// 列表配置项
export const columns = [
  {
    label: "员工ID",
    prop: "id",
    sortable: true,
    checked: true,
  },
  {
    label: "用户名",
    prop: "userName",
    sortable: true,
    checked: true,
  },
  // { label: "姓名", prop: "name", sortable: true, checked: true },
  // { label: "区域", prop: "country", sortable: true, checked: true },
  { label: "电话号码", prop: "phoneNumber", sortable: true, checked: true },
  { label: "邮箱", prop: "email", sortable: true, checked: true },
  { label: "部门", prop: "departmentId", sortable: true, checked: true },
  { label: "角色", prop: "role", sortable: true, checked: true },
  { label: "职位", prop: "positionId", sortable: true, checked: true },
  { label: "小组", prop: "groupId", sortable: true, checked: true },
  { label: "状态", prop: "active", sortable: true, checked: true },
]

// 搜索配置项
export const formSearchList = [
  { index: 1, show: true, type: 'input', modelName: 'id', placeholder: '员工ID' },
  { index: 2, show: true, type: 'input', modelName: 'userName', placeholder: '用户名' },
  {
    index: 3,
    show: true,
    type: "select",
    modelName: "active",
    placeholder: "状态",
    option: "activeList",
    optionLabel: "label",
    optionValue: "value",
  },
]
