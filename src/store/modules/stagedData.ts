const useStagedDataStore = defineStore(
  // 唯一ID
  "stagedData",
  () => {
    // 用户管理
    const userCustomer = ref<any>(); // 客户列表
    const usersupplier = ref<any>(); // 供应商列表

    return {
      userCustomer,
      usersupplier
    };
  }
);

export default useStagedDataStore;
