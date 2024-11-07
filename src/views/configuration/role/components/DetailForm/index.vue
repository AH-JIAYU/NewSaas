<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import api from "@/api/modules/configuration_role";
import useRouteStore from "@/store/modules/route";
import useRoleButtonStore from "@/store/modules/get_role_button";
import cloneDeep from "lodash-es/cloneDeep";

// 父级传递数据
const props = defineProps(["id", "row"]);
// 路由 store
const routeStore = useRouteStore();
// 按钮权限store
const roleButton = useRoleButtonStore();
// 加载
const loading = ref(false);
const formRef = ref<any>();
// tree ref
const treeRef = ref<any>();
// 路由
const menuData = ref<any>([]);
// 权限
const permissionData = ref<any>([]);
// 定义表单
const form = ref<any>({
  id: props.id ?? null,
  // 菜单
  menuId: [],
  // 按钮
  permission: [],
  // 角色码
  roleName: "",
  // 备注
  remark: "",
});
// 校验
const formRules = ref<FormRules>({
  roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
});

onMounted(async () => {
  try {
    loading.value = true;
    if (form.value.id !== "") {
      await getInfo();
    }
    // 调用store的方法获取按钮权限，如果没有就调接口
    permissionData.value = await roleButton.getPermissions();
    // 从store获取原始路由
    menuData.value = routeStore.routesRaw;
    loading.value = false;
  } catch (error) {

  } finally {
    loading.value = false;
  }
});

// 回显form
async function getInfo() {
  loading.value = true;
  // 先回显除menuid的数据，以免直接赋值menuId后再过滤导致页面不更新
  const { menuId, ...newForm } = JSON.parse(props.row);
  form.value = newForm
  // 获取扁平化后的1，2级路由
  const Level1AndLevel2List = await routeStore.obtainLevel1AndLevel2Routing();
  // menuId过滤后只保留第三级的路由，以免1，2级勾选，导致全选
  form.value.menuId = menuId.filter((item: any) => {
    return !Level1AndLevel2List.some((ite: any) => ite.id === item);
  });

  loading.value = false;
}

// 查询当前路由有那些权限
function rowPermission(permissionID: any) {
  return permissionData?.value?.filter(
    (item: any) => permissionID === item.menuId
  );
}

const handleNodeClick = (nodeData: any) => {
  // 判断节点是否被选中
  const arr = [];
  arr.push(nodeData);
  const isChecked = treeRef.value.getNode(nodeData.id).checked;
  if (isChecked) {
    arr.map((ite) => {
      const permissionList = permissionData?.value?.filter(
        (item: any) => ite.id === item.menuId
      );
      if (permissionList && permissionList.length) {
        permissionList.forEach((element: any) => {
          form.value.permission.push(element.id);
        });
      }
    });
  } else {
    arr.map((ite) => {
      const permissionList = permissionData?.value?.filter(
        (item: any) => ite.id === item.menuId
      );
      if (permissionList && permissionList.length) {
        // 将 permissionList 中存在的 id 进行提取
        let idsToRemove = permissionList.map((item: any) => item.id);
        // 使用 filter() 方法过滤掉存在于 idsToRemove 中的 id
        form.value.permission = form.value.permission.filter(
          (id: any) => !idsToRemove.some((removeId: any) => removeId === id)
        );
      }
    });
  }
};
// 暴露
defineExpose({
  submit() {
    loading.value = true; // 开始加载
    const params = cloneDeep(form.value);

    return new Promise<void>((resolve, reject) => {
      try {
        // 同步选中的路由id
        params.menuId = treeRef.value!.getCheckedKeys(false);
        // 获取选中的所有子节点
        const tree = treeRef.value.getCheckedKeys();
        // 获取所有半选的主节点
        const halltree = treeRef.value.getHalfCheckedKeys();
        // 组合一下
        const menupath = tree.concat(halltree);
        params.menuId = menupath;
        form.value.menuId = menupath
        formRef.value.validate(async (valid: any) => {
          if (!valid) {
            loading.value = false; // 验证不通过，停止加载
            return reject(new Error("验证不通过"));
          }
          try {
            if (params.id === "") {
              await api.create(params);
              ElMessage.success({ message: "新增成功", center: true });
            } else {
              await api.edit(params);
              ElMessage.success({ message: "编辑成功", center: true });
            }
            resolve();
          } catch (error) {
            reject(error); // 处理 API 错误
          } finally {
            loading.value = false; // 最终停止加载
          }
        });
      } catch (error) {
        loading.value = false; // 捕获错误，停止加载
        reject(error);
      }
    });
  },
});
</script>

<template>
  <div v-loading="loading">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="120px">
      <ElFormItem label="角色名称" prop="roleName">
        <ElInput v-model="form.roleName" placeholder="请输入角色名称" />
      </ElFormItem>
      <ElFormItem label="备注" prop="remark">
        <ElInput v-model="form.remark" placeholder="请输入备注" />
      </ElFormItem>
      <ElFormItem label="权限" v-if="!loading">
        <el-tree v-if="form.menuId" ref="treeRef" :data="menuData" style="width: 100%"
          :default-checked-keys="form.menuId" :default-expanded-keys="[]" node-key="id" show-checkbox
          @check-change="handleNodeClick" default-expand-all border>
          <template #default="{ data }">
            <div class="custom-tree-node">
              <div class="menu">
                {{ data.meta.title }}
              </div>
              <div class="permission">
                <div v-if="rowPermission(data.id)?.length" class="permissions">
                  <ElCheckboxGroup v-model="form.permission">
                    <ElCheckbox v-for="auth in rowPermission(data.id)" :key="auth.id" :value="auth.id">
                      {{ auth.label }}
                    </ElCheckbox>
                  </ElCheckboxGroup>
                </div>
              </div>
            </div>
          </template>
        </el-tree>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-tree {
    overflow: hidden;
  }

  .el-tree-node__content {
    height: auto;
    min-height: 50px;
    border-bottom: 1px solid #f1f1f1;
  }
}

.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  font-size: 14px;

  .menu {
    flex-shrink: 0;
    width: 20%;
  }

  .permission {
    flex-shrink: 0;
    width: 700px;
    min-height: 50px;
    padding: 0 10px;
    text-align: left;
    border-left: 1px solid #f1f1f1;
  }

  // .permissions {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: start;
  //   justify-content: space-around;
  //   height: 80px;
  // }
  .permission {
    display: flex;
    align-items: center;
    justify-content: start;

    .permissions {
      padding: 1rem 0;

      :deep(.el-checkbox-group) {
        display: flex;
        flex-wrap: wrap;
      }

      :deep(.el-checkbox__label) {
        min-width: 150px;
      }
    }


  }
}
</style>
