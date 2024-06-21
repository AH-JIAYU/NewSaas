import api from '@/api/modules/user'

const useButtonPermissionStore = defineStore(
  // 唯一ID
  'buttonPermission',
  () => {
    const permissions = ref([])
    const getPermissions = computed(async () => {
      if (permissions.value.length) {
        return permissions.value
      }
      const { data } = await api.permission()
      return data
    })
    return {
      permissions,
      getPermissions,
    }
  },
)

export default useButtonPermissionStore
