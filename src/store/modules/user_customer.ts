import customerApi from "@/api/modules/user_customer";
const useUserCustomerStore = defineStore(
  // 唯一ID
  "userCustomer",
  () => {
    /**
     * 创建项目-供应商,需要选择客户列表-支持按照客户名称模糊查询
     * 默认null
     * 为null重新请求
     * 为[]接口没有数据不需要重新请求
     * 客户数据改变在页面赋值为null重新调用
     */
    const customer = ref(null);
    // 初始数据
    const initialTopTabsData = {
      customerAccord: "", //客户名称
      customerShortName: "", //客户简称
      companyName: "", //公司名称
      customerName: "", //客户姓名
      customerPhone: "", //手机号码
      emailAddress: "", //电子邮箱
      chargeName: "", //负责人
      settlementCycle: null, //结算周期
      customerStatus: 2, //客户状态
      antecedentQuestionnaire: 1, //前置问卷
      riskControl: 1, //风险控制
      turnover: null, //营业限额
      rateAudit: null, //审核Min值
      tenantCustomerConfigInfoList: [
        {
          callbackWay: 1,//	回调方式:1:服务端回调 2:重定向回调
          isEncryption: 2,//	是否加密:1:加密 2:不加密
          encryptionId: "",//总控配置加密方式主键(外键)-是否加密为是有值
          secretKey: "",//
        },
        // {
        //   callbackWay: '',//	回调方式:1:服务端回调 2:重定向回调
        //   isEncryption: 2,//	是否加密:1:加密 2:不加密
        //   encryptionId: "",//总控配置加密方式主键(外键)-是否加密为是有值
        //   secretKey: "",//
        // }
      ]
    };
    const getCustomerList = async () => {
      if (!customer.value) {
        const { data } = await customerApi.getCustomerList({});
        customer.value = data.getTenantCustomerAccordInfoList;
      }
      return customer.value;
    };
    return {
      customer,
      initialTopTabsData,
      getCustomerList,
    };
  }
);
export default useUserCustomerStore;
