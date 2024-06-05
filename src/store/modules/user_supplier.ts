import customerApi from "@/api/modules/user_customer";
const useUserSupplierStore = defineStore(
  // 唯一ID
  "userSupplier",
  () => {
    const customer = ref([]);
    // 支付方式
    const payMethod = [
      {
        value: 1,
        label: "银行转账",
      },
      {
        value: 2,
        label: "支付宝",
      },
      {
        value: 3,
        label: "paypal",
      },
    ];
    // 供应商初始数据
    const initialTopTabsData = {
      supplierAccord: "名称",
      // subordinateCountryId: "", // 所属国家id
      // supplierLevelId: "", // 供应商等级
      // supplierName: "",   // 供应商姓名
      // supplierPhone: "", // 手机号
      // emailAddress: "", // 邮箱
      surveySystem: 1, // 调查系统:1:关闭 2:开启
      b2bStatus: 1, // B2B:1:关闭 2:开启
      b2cStatus: 1, // 	B2C:1:关闭 2:开启
      supplierStatus: 1, // 	供应商状态:1:关闭 2:开启 3:待审核
      // relevanceCountryId: "", // 关联国家id
      // relevanceCustomerId: 0, // 关联客户id
      // payMethod: 0, // 付款方式
      // accountName: "", // 账户名称
      // collectionAccount: "", // 	收款账号
      // settlementCycle: 0, // 结算周期
      // bankName: "", // 付款方式为银行支付的时候需要填银行名称
    };

    const getCustomerList = async () => {
      if (!customer.value.length) {
        const { data } = await customerApi.getCustomerList({});
        customer.value = data.getTenantCustomerAccordInfoList;
      }
      return customer.value;
    };
    return {
      customer,
      payMethod,
      initialTopTabsData,
      getCustomerList,
    };
  }
);

export default useUserSupplierStore;
