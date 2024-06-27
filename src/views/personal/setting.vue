<route lang="yaml">
  name: personalSetting
  meta:
    title: 个人设置
    cache: personal-edit.password
  </route>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import api from '@/api/modules/personal_setting'

defineOptions({
  name: 'personalSetting',
})
//基础字典
const basicDictionaryStore = useBasicDictionaryStore();
// 国家list
const countryList = ref<any>([]);
// loading
const loading = ref(false)
// 路由
const router = useRouter()
// 判断手机号或邮箱是否变动
const isTrue = ref(false)
// 弹框开关变量
const dialogTableVisible = ref(false)
// 账户类型
const typeList = [
  { label: '公司', value: 'company' },
  { label: '个人', value: 'personal' }
]
// 货币类型
const currencyType = [
  { label: '人民币', value: 'CNY' },
  { label: '美元', value: 'USD' }
]
// 上传
const fileList = ref([])
// 个人formRef
const userFormRef = ref()
// 账户ref
const accountFormRef = ref()
// 个人信息
const userForm = ref<any>({
  // 账户类型
  type: "personal",
  // 用户名
  name: "",
  // 手机号码
  phone: '15288888888',
  // 电子邮箱
  email: '88888@qq.com',
  // 货币类型
  currencyType: '',
  // 公司名称
  companyName: "",
  // 法人姓名
  legalPersonName: "",
  // 税号
  taxId: "",
})
// 账户数据
const accountForm = ref<any>({
  // 旧密码
  oldPassword: '',
  // 密码
  password: '',
  // 确认密码
  confirmPassword: '',
})
// 自定义校验手机号
const validatePhoneRegistered = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if (!regExpPhone.test(userForm.value.phone)) {
    //
    callback(new Error("请输入合法手机号"));
  } else {
    callback();
  }
};
// 自定义校验邮箱
const validateEmailRegistered = (rule: any, value: any, callback: any) => {
  const regExpEmail: any =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExpEmail.test(userForm.value.email)) {
    callback(new Error("请输入合法邮箱"));
  } else {
    callback();
  }
};
// 个人信息校验
const userFormRules = ref<FormRules>({
  supplierName: [{ required: true, trigger: "blur", message: "请输入姓名" }],
  email: [
    { required: true, trigger: "blur", message: "请输入邮箱" },
    { validator: validateEmailRegistered, trigger: "blur" },
  ],
  phone: [
    { required: true, trigger: "blur", message: "请输入手机号码" },
    { validator: validatePhoneRegistered, trigger: "blur" },
  ],
})
// 账户信息校验
const accountFormRules = ref<FormRules>({
  password: [
    { required: true, trigger: 'blur', message: '请输入新密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
    {
      validator: (rule, value, callback) => {
        if (value === accountForm.value.oldPassword) {
          callback(new Error('新密码不能与旧密码一致'))
        }
        else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  oldPassword: [
    { required: true, trigger: 'blur', message: '请输入旧密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== accountForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        }
        else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})
// 判断手机号/邮箱是否改变
const handleChange = (val: any) => {
  if (val !== userForm.value.phone || val !== userForm.value.email) {
    isTrue.value = true
  }
}
// 提交数据
function userSubmit() {
  userFormRef.value && userFormRef.value.validate(async (valid: any) => {
    if (valid) {
      loading.value = true
      // 类型是个人/公司
      if (userForm.value.type === 'personal') {
        delete userForm.value.companyName
        delete userForm.value.legalPersonName
        delete userForm.value.taxId
        delete userForm.value.country
        delete userForm.value.avatar
      } else {
        delete userForm.value.country
        delete userForm.value.avatar
      }
      // 国家是否是中国
      if (userForm.value.country === 'CN') {
        delete userForm.value.email
      } else {
        delete userForm.value.phone
      }
      // 判断手机号/邮箱是否改变未改变删除字段
      if (!isTrue.value) {
        delete userForm.value.phone
        delete userForm.value.email
      }
      const res = await api.edit(userForm.value)
      if(res.status === -1) return
      getDataList()
      loading.value = false
      ElMessage.success({
        message: '修改成功',
        center: true,
      })
      closeHandler()
    }
  })
}

// 账户提交
const accountSubmit = () => {
  accountFormRef.value && accountFormRef.value.validate(async (valid: any) => {
    if (valid) {
      loading.value = true
      delete accountForm.value.confirmPassword
      console.log('accountForm.value', accountForm.value);
      // return
      const res = await api.edit(accountForm.value)
      if(res.status === -1) return
      getDataList()
      loading.value = false
      ElMessage.success({
        message: '修改成功',
        center: true,
      })
      closeHandler()
    }
  })
}
// 父级传递数据
async function showEdit(row: any) {
  // total.value = row.length
  dialogTableVisible.value = true
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  userFormRef.value.resetFields()
  accountFormRef.value.resetFields()
  // // 重置表单
  Object.assign(userForm, {})
  Object.assign(accountForm, {})
  dialogTableVisible.value = false
}

function handleSuccess(res: any) {
  if (res.error === '') {
    userForm.value.headimg = res.data.path
  }
  else {
    ElMessage.warning(res.error)
  }
}
const getDataList = async () => {
  loading.value = true
  const res = await api.list()
  userForm.value = res.data
  console.log('res',res.data);
  loading.value = false
}
onMounted(async () => {
  getDataList()
  countryList.value = await basicDictionaryStore.getCountry()
})
// 暴露方法
defineExpose({ showEdit })
</script>

<template>
  <div v-loading="loading">
    <el-drawer v-model="dialogTableVisible" title="修改用户信息" direction="rtl" :before-close="closeHandler"
      style="height: 100%;" size="40%">
      <ElTabs tab-position="left">
        <ElTabPane label="个人信息" class="basic">
          <h2>个人信息</h2>
          <ElForm ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px" el-width="120px"
            label-suffix="：">
            <ElFormItem style="display: flex;justify-content: center;align-items: center;" label="头像">
              <ImageUpload v-model:url="userForm.avatar" :action="userForm.avatar" name="image"
                :data="{ token: 'TKD628431923530324' }" notip class="headimg-upload" @on-success="handleSuccess" />
            </ElFormItem>
            <ElFormItem label="账户类型">
              <el-select v-model="userForm.type" value-key="" placeholder="账户类型" clearable filterable>
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </ElFormItem>
            <ElFormItem label="用户名">
              <ElInput disabled v-model="userForm.name" laceholder="请输入你的用户名" />
            </ElFormItem>
            <ElFormItem label="国家">
              <ElSelect v-model="userForm.country" disabled>
                <ElOption v-for="item in countryList" :label="item.chineseName" :value="item.code" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem prop="" label="货币类型">
              <el-select v-model="userForm.currencyType" value-key="" placeholder="请选择货币类型" clearable filterable>
                <el-option v-for="item in currencyType" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </ElFormItem>
            <ElFormItem v-if="userForm.type === 'company'" label="公司名称">
              <ElInput v-model="userForm.companyName" placeholder="请输入你的公司名称" />
            </ElFormItem>
            <ElFormItem v-if="userForm.type === 'company'" label="公司税号">
              <ElInput v-model="userForm.taxId" placeholder="请输入你的公司税号" />
            </ElFormItem>
            <ElFormItem v-if="userForm.type === 'company'" label="法人姓名">
              <ElInput v-model="userForm.legalPersonName" placeholder="请输入你的法人姓名" />
            </ElFormItem>
            <ElFormItem v-if="userForm.country === 'CN'" prop="phone" label="手机号码">
              <ElInput v-model="userForm.phone" placeholder="请输入你的手机号码" @change="handleChange" />
            </ElFormItem>
            <ElFormItem v-else prop="email" label="电子邮箱">
              <ElInput v-model="userForm.email" placeholder="请输入你的电子邮箱" @change="handleChange" />
            </ElFormItem>
            <ElFormItem>
              <ElButton @click="userSubmit" type="primary">
                保存
              </ElButton>
              <ElButton @click="closeHandler" type="primary">
                取消
              </ElButton>
            </ElFormItem>
          </ElForm>
        </ElTabPane>
        <ElTabPane label="账户管理" class="security">
          <h2 style="margin-bottom: 30px;">账户管理</h2>
          <ElForm ref="accountFormRef" :model="accountForm" :rules="accountFormRules" label-width="120px"
            label-suffix="：">
            <ElFormItem prop="oldPassword" label="旧密码">
              <ElInput v-model="accountForm.oldPassword" placeholder="请输入旧密码" />
            </ElFormItem>
            <ElFormItem prop="password" label="新密码">
              <ElInput v-model="accountForm.password" placeholder="请输入新密码" />
            </ElFormItem>
            <ElFormItem prop="confirmPassword" label="确认新密码">
              <ElInput v-model="accountForm.confirmPassword" placeholder="请输入新密码" />
            </ElFormItem>
            <ElFormItem>
              <ElButton @click="accountSubmit" type="primary">
                保存
              </ElButton>
              <ElButton @click="closeHandler" type="primary">
                取消
              </ElButton>
            </ElFormItem>
          </ElForm>
        </ElTabPane>
      </ElTabs>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.headimg-upload) {
  text-align: center;
  width: 6.25rem;
  height: 6.25rem;

  .el-upload-dragger {
    border-radius: 50%;
    width: 6.25rem;
    height: 6.25rem;
  }

  .el-image {
    width: 6.25rem !important;
    height: 6.25rem !important;
  }

  .image-slot {
    width: 6.25rem !important;
    height: 6.25rem !important;
  }

}

:deep(.image-slot) {
  width: 6.25rem;
  height: 6.25rem;
}



.security {
  .setting-list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid var(--el-border-color-lighter);
      transition: var(--el-transition-border);

      .content {
        .title {
          margin-bottom: 5px;
          color: var(--el-text-color-primary);
          transition: var(--el-transition-color);
        }

        .desc {
          font-size: 14px;
          color: var(--el-text-color-secondary);
          transition: var(--el-transition-color);
        }
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
