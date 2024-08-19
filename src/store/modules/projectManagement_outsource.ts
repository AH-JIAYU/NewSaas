const useProjectManagementOutsourceStore = defineStore(
  // 唯一ID
  "projectManagementOutsource",
  () => {
    // 项目装填
    const projectStatusList = ["进行中(在线)", "已完成(审核通过)", "离线"];
    const typeList = ["租户", "供应商", "会员组"];
    const peopleTypeList = ["会员组", "供应商"];
    const surveyStatusList = [
      '完成',
      '被甄别',
      '配额满',
      '安全终止',
      '未完成'
    ]

    return {
      projectStatusList,
      typeList,
      surveyStatusList,
      peopleTypeList,
    };
  }
);

export default useProjectManagementOutsourceStore;
