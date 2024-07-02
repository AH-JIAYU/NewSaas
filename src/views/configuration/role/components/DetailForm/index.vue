<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import api from '@/api/modules/configuration_role'
import useRouteStore from '@/store/modules/route'
import useRoleButtonStore from '@/store/modules/get_role_button'

// 父级传递数据
const props = defineProps(['id', 'row'])
// 路由 store
const routeStore = useRouteStore()
// 按钮权限store
const roleButton = useRoleButtonStore()
// 加载
const loading = ref(false)
const formRef = ref<FormInstance>()
// tree ref
const treeRef = ref<any>()
// 路由
const menuData = ref<any>([])
// 权限
const permissionData = ref<any>([])
// 定义表单
const form = ref<any>({
  id: props.id ?? null,
  // 菜单
  menuId: [],
  // 按钮
  permission: [],
  // 角色码
  roleName: '',
  // 备注
  remark: '',
})
// 校验
const formRules = ref<FormRules>({
  roleName: [
    { required: true, message: '请输入角色吗', trigger: 'blur' },
  ],
})

onMounted(async () => {
  if (form.value.id !== '') {
    await getInfo()
  }
  loading.value = true
  // 从store获取原始路由
  menuData.value = routeStore.routesRaw
  // 调用store的方法获取按钮权限，如果没有就调接口
  permissionData.value = await roleButton.getPermissions
  loading.value = false
})

// 获取
async function getInfo() {
  loading.value = true
  // 编辑时获取该id的具体数据
  form.value = JSON.parse(props.row)
  loading.value = false
}

// 查询当前路由有那些权限
function rowPermission(permissionID: any) {
  return permissionData?.value.filter((item: any) => permissionID === item.menuId)
}
// 暴露
defineExpose({
  submit() {
    // 同步选中的路由id
    form.value.menuId = treeRef.value!.getCheckedKeys(false)
    return new Promise<void>((resolve) => {
      if (form.value.id === '') {
        formRef.value && formRef.value.validate((valid: any) => {
          if (valid) {
            api.create(form.value).then(() => {
              ElMessage.success({
                message: '新增成功',
                center: true,
              })
              resolve()
            })
          }
        })
      }
      else {
        formRef.value && formRef.value.validate((valid: any) => {
          if (valid) {
            api.edit(form.value).then(() => {
              ElMessage.success({
                message: '编辑成功',
                center: true,
              })
              resolve()
            })
          }
        })
      }
    })
  },
})
</script>

<template>
  <div v-loading="loading">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="120px" label-suffix="：">
      <ElFormItem label="角色码" prop="roleName">
        <ElInput v-model="form.roleName" :disabled="!!form.id" placeholder="请输入角色码" />
      </ElFormItem>
      <ElFormItem label="备注" prop="remark">
        <ElInput v-model="form.remark" placeholder="请输入备注" />
      </ElFormItem>
      <ElFormItem label="权限">
        <el-tree
          ref="treeRef" :data="menuData" style="width: 100%;" :default-checked-keys="form.menuId"
          :default-expanded-keys="[]" node-key="id" show-checkbox default-expand-all highlight-current border
        >
          <template #default="{ data }">
            <div class="custom-tree-node">
              <div class="menu">
                {{ data.meta.title }}
              </div>
              <div class="permission">
                <div v-if="rowPermission(data.id).length" class="permissions">
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

  .permissions {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-around;
    height: 80px;
  }
}
</style>
