import api from "@/api/modules/basicDictionary";
const useBasicDictionaryStore = defineStore(
  // 唯一ID
  "basicDictionary",
  () => {
    const country = ref([]); // 国家

    const getCountry = async () => {
      if (!country.value.length) {
        const params: any = {
          page: 1,
          limit: -1,
          id: "32", // 国家
        };
        const res = await api.itemlist(params);
        country.value=res.data.records
      }
      return country.value;
    };
    return {
      country,
      getCountry,
    };
  }
);

export default useBasicDictionaryStore;
