import api from '@/api/modules/configuration_manager'

const useTenantStaffStore = defineStore(
  // 唯一ID
  'tenantStaff',
  () => {
    const staff = ref([])
    const getStaff = async () => {
      if (staff.value.length) {
        return staff.value
      }
      const { data } = await api.getTenantStaffList()
      staff.value = data
      return data
    }
    return {
      staff,
      getStaff,
    }
  },
)

export default useTenantStaffStore
