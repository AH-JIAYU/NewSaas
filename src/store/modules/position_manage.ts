import api from "@/api/modules/position_manage";

const usePositionManageStore = defineStore(
  // 唯一ID
  'PositionManage',
  () => {
    const PositionManage = ref([])
    const getPositionManage = async () => {
      if (PositionManage.value.length) {
        return PositionManage.value
      }
      const { data } = await api.list({
        page: 1,
        limit: 10,
        id: null,
        name: "",
        active: null
      })
      PositionManage.value = data.data || []
      return data.data
    }
    return {
      PositionManage,
      getPositionManage,
    }
  },
)

export default usePositionManageStore
