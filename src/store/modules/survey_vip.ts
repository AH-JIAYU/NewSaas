import apiVip from "@/api/modules/survey_vip";
const useSurveyVipStore = defineStore(
  // 唯一ID
  "surveyVip",
  () => {
    /**
     * 新增-修改会员组-查询组成员调用
     * 默认null
     * 为null重新请求
     * 为[]接口没有数据不需要重新请求
     */
    const NickNameList = ref(null);
    const getNickNameList = async () => {
      if (!NickNameList.value) {
        const { data } = await apiVip.getNickNameList({ memberNickname: "" });
        NickNameList.value = data.getMemberLikeNickNameInfoList;
      }
      return NickNameList.value;
    };

    return {
      NickNameList,
      getNickNameList,
    };
  }
);

export default useSurveyVipStore;
