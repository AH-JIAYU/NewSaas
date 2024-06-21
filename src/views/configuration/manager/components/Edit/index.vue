<script setup lang="ts">
import { ElForm, ElMessage } from 'element-plus'
import api from '@/api/modules/configuration_manager'
// import useRoleStore from '@/store/modules/role'

// 父级传递数据
const props = defineProps(['id', 'row'])
// 更新
const emits = defineEmits(['success'])
// 路由 store
// const roleStore = useRoleStore()
// 加载
const loading = ref(false)
// form ref
const formRef = ref<any>()
// 表单
const form = ref<any>({
  id: props.row.id,
  role: '',
  account: '',
})
// 表单校验
const formRules = ref<any>({
  role: [{ required: true, message: '请选择角色码', trigger: 'blur' }],
})
// 路由
const munulevs = ref()
// 弹窗
const visible: any = defineModel({
  default: false,
})
form.value.account = props.row.account
// 标题
const title = '分配角色'
// 提交
function onSubmit() {
  if (form.value.id) {
    formRef.value && formRef.value.validate((valid: any) => {
      if (valid) {
        api.setUserRole(form.value).then((res: any) => {
          ElMessage.success({
            message: res.status === 1 ? '角色赋予成功' : '接口异常',
            center: true,
          })
          // 新增时 是通过list.value 打开的直接调用父传子的方法
          emits('success')
          onCancel()
        })
      }
    })
  }
}

onMounted(async () => {
  loading.value = true
  // 从store获取原始路由
  // munulevs.value = await roleStore.getRole
  loading.value = false
})
// 关闭弹框
function onCancel() {
  visible.value = false
}
</script>

<template>
  <div>
    <ElDialog
      v-model="visible"
      v-loading="loading" :title="title" width="30%" :close-on-click-modal="false" append-to-body
      destroy-on-close
    >
      <ElForm
        ref="formRef" :inline="true" :rules="formRules" :model="form" label-width="120px"
        label-suffix=":"
      >
        <ElFormItem label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option v-for="item in munulevs" :key="item.id" :label="item.roleName" :value="item.roleName" />
          </el-select>
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton size="large" @click="onCancel">
          取消
        </ElButton>
        <ElButton type="primary" size="large" @click="onSubmit">
          确定
        </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<style lang="scss" scoped>
.el-select {
  width: 192px;
}
</style>
