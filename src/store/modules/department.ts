import api from "@/api/modules/department";

const useDepartmentStore = defineStore(
  // 唯一ID
  'department',
  () => {
    const department = ref([])
    const getDepartment = async () => {
      if (department.value.length) {
        return department.value
      }
      const { data } = await api.list({})
      department.value = data.data
      return data.data
    }
    return {
      department,
      getDepartment,
    }
  },
)

export default useDepartmentStore
