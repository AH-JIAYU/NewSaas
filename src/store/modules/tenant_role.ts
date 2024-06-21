import api from '@/api/modules/configuration_role'

const useTenantRoleStore = defineStore(
  // 唯一ID
  'buttonPermission',
  () => {
    const role = ref([])
    const getRole = computed(async () => {
      if (role.value.length) {
        return role.value
      }
      const { data } = await api.list()
      return data
    })
    return {
      role,
      getRole,
    }
  },
)

export default useTenantRoleStore
