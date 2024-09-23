import storage from "@/utils/storage";
import api from '@/api/modules/formSearch'

const useFormSearchStore = defineStore(
  // 唯一ID
  'formSearch',
  () => {
        // @ts-ignore
    const formSearchConfig = ref<any>(JSON.parse(storage.local.get("formSearchConfig")) ?? []);

    // 赋值
    const setFormSearchConfig=(val:any)=>{
      formSearchConfig.value=val
      storage.local.set("formSearchConfig",JSON.stringify(val))
    }
    // 通过接口获取 第一次进入/刷新时走
    const getFormSearchConfig=async()=>{
      const {data}=await api.getSearchUserList({})
      setFormSearchConfig(data.getSearchUserList)
    }
    // 更新当前筛选项
    const updateFormSearchConfig=async(obj:any)=>{
      const {data}=await api.setSearchUserList(obj)
      getFormSearchConfig()
    }
    return {
      formSearchConfig,
      setFormSearchConfig,
      getFormSearchConfig,
      updateFormSearchConfig
    }
  },
)

export default useFormSearchStore
