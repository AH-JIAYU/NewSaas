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
     * 会员数据改变重新调用
     * 会员组数据改变重新调用 (会员组改变说明有成员已经被分配到别的组 一个成员只能在一个组内,所有需要重新调用 )
     */
    const NickNameList = ref(null);
    // 新增的初始数据
    const initialTopTabsData = {
      memberNickname: "", //  	会员昵称,确保唯一性
      memberLevelId: "", // 会员等级表主键
      subordinateCountryId: "", // 所属区域id
      memberName: "", // 会员姓名
      memberPhone: "", // 会员手机号
      emailAddress: "", // 电子邮箱
      b2bStatus: 1, // B2B:    原型默认 关闭       // 1:关闭 2:开启
      b2cStatus: 2, // B2C:    原型默认 开启
      memberStatus: 2, // 会员状态:   原型默认 开启
      exemptionTrial: 1, // 免审状态:   原型默认 关闭
      randomStatus: 1, // 随机状态:1关闭 2开启
      organizationalStructureId:null,//部门id
    };
    const getNickNameList = async () => {
      if (!NickNameList.value) {
        const { data } = await apiVip.getNickNameList({ memberNickname: "" });
        NickNameList.value = data.getMemberLikeNickNameInfoList;
      }
      return NickNameList.value;
    };

    return {
      NickNameList,
      initialTopTabsData,
      getNickNameList,
    };
  }
);

export default useSurveyVipStore;
