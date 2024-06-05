import apiLevel from "@/api/modules/survey_vipLevel";
const useSurveyVipLevelStore = defineStore(
  // 唯一ID
  "surveyVipLevel",
  () => {
    /**
     *查询会员等级集合-新增会员调用
     * 默认null
     * 为null重新请求
     * 为[]接口没有数据不需要重新请求
     */
    const LevelNameList = ref(null);
    const getLevelNameList = async () => {
      if (!LevelNameList.value) {
        const { data } = await apiLevel.getLevelNameList({});
        LevelNameList.value = data.getMemberLevelNameInfoList;
      }
      return LevelNameList.value;
    };
    return {
      LevelNameList,
      getLevelNameList,
    };
  }
);

export default useSurveyVipLevelStore;
