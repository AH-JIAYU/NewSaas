import api from "@/api/modules/group_manage";

const useGroupManageStore = defineStore(
  // 唯一ID
  'groupManage',
  () => {
    const groupManage = ref([])
    const getGroupManage = async () => {
      if (groupManage.value.length) {
        return groupManage.value
      }
      const { data } = await api.list({
        page: 1,
        limit: 10,
        id: null,
        name: "",
        active: null
      })
      groupManage.value = data.data
      return data.data
    }
    return {
      groupManage,
      getGroupManage,
    }
  },
)

export default useGroupManageStore
