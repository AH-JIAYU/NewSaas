const useStagedDataStore = defineStore(
  // 唯一ID
  "stagedData",
  () => {
    // 项目管理
    const projectManagementList=ref<any>() // 项目列表
    const projectManagementListData=ref<any>() // 项目列表  配置信息需要的数据
    // 用户管理
    const userCustomer = ref<any>(); // 客户列表
    const usersupplier = ref<any>(); // 供应商列表

    // 调查系统
    const surveyVip = ref<any>(); // 会员
    const surveyVipGroup = ref<any>(); // 会员组

    return {
      projectManagementList,
      projectManagementListData,
      userCustomer,
      usersupplier,
      surveyVip,
      surveyVipGroup,
    };
  }
);

export default useStagedDataStore;
