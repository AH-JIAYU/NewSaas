import api from "@/api/modules/basicDictionary";
import customerApi from "@/api/modules/user_customer";
const useBasicDictionaryStore = defineStore(
  // 唯一ID
  "basicDictionary",
  () => {
    const dict = ref() // 字典目录
    const country = ref([]); // 区域
    const B2BType = ref([]); // 项目类型
    const customerList = ref([]); //所属客户
    // 获取字典目录
    const getDict = async () => {
      if (!dict.value) {
        const res = await api.list();
        dict.value = res.data
      }
      return dict.value
    }
    //获取所属客户
    const getCustomer= async () => {
        const res = await customerApi.getCustomerList({});
        customerList.value = res.data.getTenantCustomerAccordInfoList;
      return customerList.value;
    };
    // 获取区域
    const getCountry = async () => {
      if (!country.value.length) {
        const params: any = {
          page: 1,
          limit: -1,
          id: "32", // 区域
        };
        const res = await api.itemlist(params);
        country.value = res.data.records;
      }

      return country.value;
    };

    // 获取项目类别 1级
    const getB2BType = async () => {
      if (!B2BType.value.length) {
        const data = findDataById(await getDict(), "34");
        if (data && data.children) {
          data.children.forEach((item: any) => {
            item.leaf = false; // 有子节点 可以展开
          });
          B2BType.value = data.children;
        }
      }
      return B2BType.value;
    };
    // 获取项目类别下的children
    const getB2BTypeItemChildren = async (id: any) => {
      const data = findDataById(B2BType.value, id);
      if (data && "children" in data && !data.children && !data.leaf) {
        const params: any = {
          page: 1,
          limit: -1,
          id,
        };
        const {
          data: { records },
        } = await api.itemlist(params);
        records.forEach((element: any) => {
          element.leaf = true; // 级联不可展开
        });
        // 如果有值就赋值
        B2BType.value = findAndModifyData(
          B2BType.value,
          id,
          "children",
          records
        );
        if (!records.length) {
          // 如果值为[] 父级关闭展开
          B2BType.value = findAndModifyData(B2BType.value, id, "leaf", true);
        }
        return records;
      }
      return B2BType.value;
    };
    // 在字典目录中查找某一项
    function findDataById(data: any, targetId: any): any {
      if (data) {
        for (let item of data) {
          if (item.id === targetId) {
            return item;
          } else if (Array.isArray(item.children)) {
            const result = findDataById(item.children, targetId);
            if (result) {
              return result;
            }
          }
        }
        return null;
      }
    }
    // 给项目列表某个字段设置值
    function findAndModifyData(
      array: any,
      targetId: any,
      field: any, // 字段
      value: any // 字段的值
    ): any {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === targetId) {
          array[i][field] = value;
          return array;
        } else if (array[i].children && array[i].children.length > 0) {
          array[i].children = findAndModifyData(
            array[i].children,
            targetId,
            field,
            value
          );
        }
      }
      return array;
    }
    return {
      dict,
      country,
      B2BType,
      getDict,
      getCountry,
      getB2BType,
      getB2BTypeItemChildren,
      getCustomer
    };
  }
);

export default useBasicDictionaryStore;
