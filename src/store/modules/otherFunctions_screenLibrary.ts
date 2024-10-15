const useOtherFunctionsScreenLibraryStore = defineStore(
  // 唯一ID
  'otherFunctionsScreenLibrary',
  () => {
    const countryId = ref() // 区域id

    return {
      countryId,
    }
  },
)

export default useOtherFunctionsScreenLibraryStore
