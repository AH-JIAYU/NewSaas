import api from "@/api/modules/department";

const useDepartmentStore = defineStore(
  // 唯一ID
  'department',
  () => {
    const department = ref<any>(null)
    const departmentList = ref<any>(null)
    const getDepartment = async () => {
      // if (department.value) {
      //   return department.value
      // }
      const { data } = await api.list({ name: '' })
      if(data.length > 0) {
        departmentList.value = flatten(data)
        department.value = data?.data || []
        return departmentList.value
      }
    }
    // 部门扁平化
    function flatten(data: any) {
      let result: any = [];
      // 遍历每一项
      data.forEach((item: any) => {
        // 处理当前项，添加父ID
        result.push({
          ...item, // 拷贝当前项的所有字段
          parentId: item.parentId || null, // 如果没有父ID则为null
        });

        // 如果当前项有子项，则递归调用
        if (item.children && item.children.length > 0) {
          result = result.concat(flatten(item.children)); // 扁平化子项并合并到结果中
        }
      });

      return result;
    }

    return {
      department,
      getDepartment,
      flatten,
      departmentList
    }
  },
)

export default useDepartmentStore
