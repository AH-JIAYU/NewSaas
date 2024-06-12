import api from "@/api/modules/user_supplier";
const useUserSupplierStore = defineStore(
  // 唯一ID
  "userSupplier",
  () => {
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
      supplierAccord: "",
      // subordinateCountryId: "", // 所属国家id
      // supplierLevelId: "", // 供应商等级
      // supplierName: "",   // 供应商姓名
      // supplierPhone: "", // 手机号
      // emailAddress: "", // 邮箱
      surveySystem: 1, // 调查系统:1:关闭 2:开启
      b2bStatus: 1, // B2B:1:关闭 2:开启
      b2cStatus: 2, // 	B2C:1:关闭 2:开启  原型默认开启
      supplierStatus: 1, // 	供应商状态:1:关闭 2:开启 3:待审核
      // relevanceCountryId: "", // 关联国家id
      // relevanceCustomerId: 0, // 关联客户id
      // payMethod: 0, // 付款方式
      // accountName: "", // 账户名称
      // collectionAccount: "", // 	收款账号
      // settlementCycle: 0, // 结算周期
      // bankName: "", // 付款方式为银行支付的时候需要填银行名称
    };
    // 项目分配查询状态开启的供应商列表
    const TenantSupplierList = ref<any>(null);
    const getTenantSupplierList = async () => {
      if (!TenantSupplierList.value) {
        const { data } = await api.getTenantSupplierProjectList({
          projectId: "",
        });
        TenantSupplierList.value = data.getTenantSupplierProjectInfoList;
      }
      return TenantSupplierList.value;
    };
    return {
      payMethod,
      initialTopTabsData,
      TenantSupplierList,
      getTenantSupplierList,
    };
  }
);

export default useUserSupplierStore;
