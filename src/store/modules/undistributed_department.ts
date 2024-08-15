import api from '@/api/modules/configuration_manager'

const useUndistributedDepartmentStore = defineStore(
  // 唯一ID
  'undistributedDepartment',
  () => {
    const undistributedDepartment = ref([])
    const getUndistributedDepartment = async () => {
      if (undistributedDepartment.value.length) {
        return undistributedDepartment.value
      }
      const { data } = await api.undistributedDepartment()
      undistributedDepartment.value = data.data
      return data.data
    }
    return {
      undistributedDepartment,
      getUndistributedDepartment,
    }
  },
)

export default useUndistributedDepartmentStore
