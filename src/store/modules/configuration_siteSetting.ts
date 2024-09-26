import api from "@/api/modules/configuration_site_setting";

const useConfigurationSiteSettingStore = defineStore(
  // 唯一ID
  'configurationSiteSetting',
  () => {
    const siteConfig = ref<any>()

    const getSiteConfig = async () => {
      if (siteConfig.value) {
        return siteConfig.value
      } else {
        const res = await api.list()
        siteConfig.value = res.data
        return res.data
      }
    }
    
    const setSiteConfig = (data: any) => {
      siteConfig.value = data
    }

    return {
      siteConfig,
      getSiteConfig,
      setSiteConfig
    }
  },
)

export default useConfigurationSiteSettingStore
