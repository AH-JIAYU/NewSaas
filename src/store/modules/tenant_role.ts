import api from '@/api/modules/configuration_role'

const useTenantRoleStore = defineStore(
  // 唯一ID
  'tenant_role',
  () => {
    const role = ref([])
    const getRole = async () => {
      if (role.value.length) {
        return role.value
      }
      const { data } = await api.list()
      role.value = data || []
      return data
    }
    return {
      role,
      getRole,
    }
  },
)

export default useTenantRoleStore
