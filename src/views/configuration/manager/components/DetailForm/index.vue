<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import apiUser from '@/api/modules/configuration_manager'
import useBasicDictionaryStore from '@/store/modules/otherFunctions_basicDictionary'
import useTenantRoleStore from '@/store/modules/tenant_role'


const useStoreCountry = useBasicDictionaryStore()
// 角色码
const roleStore = useTenantRoleStore()
// 角色
const munulevs = ref()
const country = ref()
// 父级传递数据
const props = defineProps(['id', 'row'])
// 加载
const loading = ref(false)
// 判断手机号或邮箱是否变动
const isTrue = ref(false)
// formRef
const formRef = ref<FormInstance>()
// 定义表单
const form = ref<any>({
  id: '',
  // 邮箱
  email: '',
  // 手机号
  phone: '',
  // 用户名
  name: '',
  // 国家
  country: '',
  // 密码
  password: '',
  // 角色id
  role: null,
  // 是否启用
  active: true,
  // 类型 phone/email
  type: 'phone',
})
// 自定义校验手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if (!regExpPhone.test(form.value.phone)) {
    //
    callback(new Error("请输入合法手机号"));
  } else {
    callback();
  }
};
// 自定义校验邮箱
const validateEmail = (rule: any, value: any, callback: any) => {
  const regExpEmail: any =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExpEmail.test(form.value.email)) {
    callback(new Error("请输入合法邮箱"));
  } else {
    callback();
  }
};
// 动态表单校验
const chengAccount = () => {
  // 手机号
  if (!form.value.phone.includes("@")) {
    formRules.value.phone = [
      { required: true, trigger: "blur", message: "请输入手机号/邮箱" },
      { validator: validatePhone, trigger: "blur" },
    ];
  } else {
    //邮箱
    formRules.value.email = [
      { required: true, trigger: "blur", message: "请输入手机号/邮箱" },
      { validator: validateEmail, trigger: "blur" },
    ];
  }
};
// 校验
const formRules = ref<FormRules>({
  // password: [
  //   { required: true, trigger: 'blur', message: '请输入密码' },
  //   { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  // ],
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
  ],
})
onMounted(async () => {
  loading.value = true
  country.value = await useStoreCountry.getCountry()
  munulevs.value = await roleStore.getRole
  loading.value = false
  if (props.id) {
    form.value = JSON.parse(props.row)
  }
})
const handleChange = (val: any) => {
  if (val !== form.value.phone || val !== form.value.email) {
    isTrue.value = true
  }
}

// 暴露方法
defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      form.value.type = form.value.country === 'CN' ? 'phone' : 'email'
      if (form.value.id === '') {
        formRef.value && formRef.value.validate((valid) => {
          if (valid) {
            delete form.value.id
            if (form.value.type === 'phone') {
              delete form.value.email
            } else {
              delete form.value.phone
            }
            apiUser.create(form.value).then(() => {
              ElMessage.success({
                message: '新增成功',
                center: true,
              })
              onCancel()
              resolve()
            })
          }
        })
      }
      else {
        formRef.value && formRef.value.validate((valid) => {
          if (valid) {
            const { id, phone, email, password, name, country, active, type, role } = form.value
            const params = { id, phone, email, password, name, country, active, type, role }
            if (type === 'phone') {
              params.email = ''
              delete params.email
            } else {
              params.phone = ''
              delete params.phone
            }
            if (!params.password) {
              delete params.password
            }
            if (!isTrue.value) {
              delete params.phone
              delete params.email
            }
            apiUser.edit(params).then(() => {
              ElMessage.success({
                message: '编辑成功',
                center: true,
              })
              onCancel()
              resolve()
            })
          }
        })
      }
    })
  }, onCancel,
})
// 关闭弹框
function onCancel() {
  form.value = {}
}
</script>

<template>
  <div v-loading="loading">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="130px" label-suffix="：">
      <ElFormItem label="用户名" prop="name">
        <ElInput v-model="form.name" placeholder="请输入用户名" />
      </ElFormItem>
      <ElFormItem label="国家" prop="country">
        <ElSelect v-model="form.country" placeholder="请选择国家" clearable filterable tabindex="2">
          <ElOption v-for="item in country" :label="item.chineseName" :value="item.code"></ElOption>
        </ElSelect>
      </ElFormItem>
      <ElFormItem v-if="form.country === 'CN'" label="手机号" prop="phone">
        <ElInput v-model="form.phone" placeholder="请输入手机号" @change="handleChange" @blur="chengAccount" />
      </ElFormItem>
      <ElFormItem v-else label="邮箱" prop="email">
        <ElInput v-model="form.email" placeholder="请输入邮箱" @change="handleChange" @blur="chengAccount" />
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput v-model="form.password" placeholder="需要修改密码时直接修改即可" />
      </ElFormItem>
      <ElFormItem label="角色" prop="role">
        <el-select v-model="form.role" placeholder="请选择角色">
          <el-option v-for="item in munulevs" :key="item.id" :label="item.roleName" :value="item.roleName" />
        </el-select>
      </ElFormItem>
      <ElFormItem label="是否启用" prop="active">
        <el-switch v-model="form.active" inline-prompt active-text="开启" inactive-text="关闭" :active-value="true"
          :inactive-value="false">
        </el-switch>
      </ElFormItem>
    </ElForm>
  </div>
</template>
