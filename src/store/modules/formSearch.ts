import storage from "@/utils/storage";
import api from '@/api/modules/formSearch'

// 筛选项配置 + 系统配置
const useFormSearchStore = defineStore(
  // 唯一ID
  'formSearch',
  () => {
    // @ts-ignore 筛选项
    const formSearchConfig = ref<any>(JSON.parse(storage.local.get("formSearchConfig")) ?? []);
    // @ts-ignore 系统配置
    const systemDisposition = ref<any>(JSON.parse(storage.local.get("systemDisposition")) ?? []);

    // 赋值
    const setFormSearchConfig = (val: any) => {
      // 筛选项
      formSearchConfig.value = val.getSearchUserList
      storage.local.set("formSearchConfig", JSON.stringify(val.getSearchUserList))
      // 配置
      systemDisposition.value = JSON.parse(val.systemDispositionJson)
      storage.local.set("systemDisposition",  val.systemDispositionJson)
    }
    // 通过接口获取 第一次进入/刷新时走
    const getFormSearchConfig = async () => {
      const { data } = await api.getSearchUserList({})
      setFormSearchConfig(data)
    }
    // 更新当前筛选项
    const updateFormSearchConfig = async (obj: any) => {
      const { data } = await api.setSearchUserList(obj)
      getFormSearchConfig()
    }
    // 更新系统配置
    const updateSystemDisposition = async (obj: any) => {
      const { data } = await api.setSystemDispositionUser(obj)
      getFormSearchConfig()
    }
    return {
      formSearchConfig,
      systemDisposition,
      setFormSearchConfig,
      getFormSearchConfig,
      updateFormSearchConfig,
      updateSystemDisposition
    }
  },
)

export default useFormSearchStore
