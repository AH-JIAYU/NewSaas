import apiDictionary from '@/api/modules/dictionary'

export interface DictionaryItem {
  name: string
  value: string
}

const useDictionaryStore = defineStore(
  // 唯一ID
  'dictionary',
  () => {
    const dictionary = ref<Record<string, DictionaryItem[]>>({})

    async function get(code: string) {
      if (!dictionary.value[code]) {
        const res = await apiDictionary.get(code)
        dictionary.value[code] = res.data.list
      }
      return dictionary.value[code]
    }

    return {
      get,
    }
  },
)

export default useDictionaryStore
