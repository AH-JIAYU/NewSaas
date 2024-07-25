const useAvatarStore = defineStore(
  // 唯一ID
  'avatar',
  () => {
    const permissions = ref<any>()
    return {
      permissions,
    }
  },
)

export default useAvatarStore
