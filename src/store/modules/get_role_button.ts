import api from '@/api/modules/role_button'

const useRoleButtonStore = defineStore(
  // 唯一ID
  'buttonPermission',
  () => {
    const permissions = ref([])
    const getPermissions = computed(async () => {
      if (permissions.value.length) {
        return permissions.value
      }
      const { data } = await api.list()
      return data
    })
    return {
      permissions,
      getPermissions,
    }
  },
)

export default useRoleButtonStore
