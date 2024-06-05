import apiGroup from "@/api/modules/survey_vipGroup";
const useSurveyVipGroupStore = defineStore(
  // 唯一ID
  'surveyVipGroup',
  () => {
    /**
     *新增会员-查询会员组列表调用此接口
     * 默认null
     * 为null重新请求
     * 为[]接口没有数据不需要重新请求
     */
     const GroupNameList = ref(null);
     const getGroupNameList = async () => {
       if (!GroupNameList.value) {
         const { data } = await apiGroup.getGroupNameList({});
         GroupNameList.value = data.getMemberGroupNameInfoList;
       }
       return GroupNameList.value;
     };
     return {
       GroupNameList,
       getGroupNameList,
     };
  },
)

export default useSurveyVipGroupStore
