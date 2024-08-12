import api from '../index'

export default {
  list: (data:any) => api.post('team/getGroupTeam', data),

  create: (data: any) => api.post('team/insertGroupTeam', data,),

  edit: (data: any) => api.post('team/updateGroupTeam', data,),

  delete: (data:any) => api.post('team/deleteGroupTeam', data),
}
