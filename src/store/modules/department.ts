import api from "@/api/modules/department";

const useDepartmentStore = defineStore(
  // 唯一ID
  'department',
  () => {
    const department = ref<any>(null)
    const getDepartment = async () => {
      if (department.value) {
        return department.value
      }
      const { data } = await api.list({})
      department.value = data?.data || []
      return data?.data
    }
    return {
      department,
      getDepartment,
    }
  },
)

export default useDepartmentStore
