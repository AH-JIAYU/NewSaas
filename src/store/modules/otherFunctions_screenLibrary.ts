const useOtherFunctionsScreenLibraryStore = defineStore(
  // 唯一ID
  'otherFunctionsScreenLibrary',
  () => {
    const countryId = ref() // 国家id
    
    return {
      countryId,
    }
  },
)

export default useOtherFunctionsScreenLibraryStore
