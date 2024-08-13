const useProjectManagementOutsourceStore = defineStore(
  // 唯一ID
  "projectManagementOutsource",
  () => {
    // 项目装填
    const projectStatusList = ["进行中(在线)", "已完成(审核通过)", "离线"];
    const typeList = ["租户", "供应商", "会员组"];

    return {
      projectStatusList,
      typeList,
    };
  }
);

export default useProjectManagementOutsourceStore;
