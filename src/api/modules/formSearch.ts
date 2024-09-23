import api from '../index'

export default {
  //查询搜索记录(用户)
  getSearchUserList: (data:any) => api.post('search/getSearchUserList', data),
  //新增搜索记录(用户)
  setSearchUserList: (data:any) => api.post('search/addSearchUser', data),

}
