import api from '../index'

export default {
  // 查询组织架构
  list: (data: any) => api.post('member-organizationalStructure/queryOrganizationalStructure', data),
  // 根据组织架构id查询员工列表
  itemlist: (data: any) => api.post('member/queryMemberListByOrganizationId', data),
  // 新增组织架构
  create: (data: any) => api.post('member-organizationalStructure/insertOrganizationalStructure', data,),
  // 修改组织架构
  edit: (data: any) => api.post('member-organizationalStructure/updateOrganizationalStructure', data,),
  // 删除组织架构
  delete: (data: any) => api.post('member-organizationalStructure/deleteOrganizationalStructure', data),
  // 查询会员集合列表 组织架构新增时使用
  queryMemberList: () => api.post('member/queryMemberList',),
  // 查询会员集合列表 组织架构修改时使用
  queryMemberListByOrganizationIdToUpdate: (data:any) => api.post('member/queryMemberListByOrganizationIdToUpdate',data),
}
