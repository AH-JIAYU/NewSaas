import api from '@/api/modules/role_button'

const useRoleButtonStore = defineStore(
  // 唯一ID
  'buttonPermission',
  () => {
    const permissions = ref([])
    const getPermissions = async () => {
      if (permissions.value.length) {
        return permissions.value
      }
      const { data } = await api.list()
      permissions.value = data
      return data
    }
    return {
      permissions,
      getPermissions,
    }
  },
)

export default useRoleButtonStore
