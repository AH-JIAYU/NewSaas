<route lang="yaml">
name: personalSetting
meta:
  title: 个人中心
  cache: personal-edit.password
</route>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { FormInstance, FormRules, UploadProps } from "element-plus";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary";
import api from "@/api/modules/personal_setting";
import Message from 'vue-m-message'
import useUserStore from "@/store/modules/user";

defineOptions({
  name: "personalSetting",
});
// 隐藏上传
const upload = ref(false);
// token
const userStore = useUserStore();
// 更新
const emits = defineEmits(["success"]);
// 接口地址
const Url = import.meta.env.VITE_APP_API_BASEURL + "/api/user/uploadAvatar";
//基础字典
const basicDictionaryStore = useBasicDictionaryStore();
// 国家list
const countryList = ref<any>([]);
// loading
const loading = ref(false);
// 判断手机号或邮箱是否变动
const isTrue = ref(false);
// 弹框开关变量
const dialogTableVisible = ref(false);
// 账户类型
const typeList = [
  { label: "公司", value: "company" },
  // { label: "个人", value: "personal" },
];
// 货币类型
const currencyType = [
  { label: "人民币", value: "CNY" },
  { label: "美元", value: "USD" },
];
// 个人formRef
const userFormRef = ref();
// 账户ref
const accountFormRef = ref();
// 个人信息
const userForm = ref<any>({
  // 账户类型
  type: "company",
  // 用户名
  name: "",
  // 手机号码
  phone: "",
  // 电子邮箱
  email: "",
  // 货币类型
  currencyType: "",
  // 公司名称
  companyName: "",
  // 法人姓名
  legalPersonName: "",
  // 税号
  taxId: "",
  // 合作邀约
  isInvitation: 1,
});
// 账户数据
const accountForm = ref<any>({
  // 旧密码
  oldPassword: "",
  // 密码
  password: "",
  // 确认密码
  confirmPassword: "",
});
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
// 校验密码函数
const validatePassword = (rule: any, value: any, callback: any) => {
  // 匹配包含空格或汉字的情况
  if (/[\s\u4e00-\u9fa5]/.test(value)) {
    callback(new Error('密码中带有空格或汉字')); // 验证失败
  } else {
    callback(); // 验证通过
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
});
// 账户信息校验
const accountFormRules = ref<FormRules>({
  password: [
    { required: true, trigger: "blur", message: "请输入新密码" },
    { min: 6, max: 18, trigger: "blur", message: "密码长度为6到18位" },
    { validator: validatePassword, trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value === accountForm.value.oldPassword) {
          callback(new Error("新密码不能与旧密码一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  oldPassword: [
    { required: true, trigger: "blur", message: "请输入旧密码" },
    { min: 6, max: 18, trigger: "blur", message: "密码长度为6到18位" },
    { validator: validatePassword, trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    { validator: validatePassword, trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== accountForm.value.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});
// 判断手机号/邮箱是否改变
const handleChange = (val: any) => {
  if (val !== userForm.value.phone || val !== userForm.value.email) {
    isTrue.value = true;
  }
};
// 提交数据
function userSubmit() {
  userFormRef.value &&
    userFormRef.value.validate(async (valid: any) => {
      if (valid) {
        try {
          loading.value = true;
          // 类型是个人/公司
          if (userForm.value.type === "personal") {
            delete userForm.value.companyName;
            delete userForm.value.legalPersonName;
            delete userForm.value.taxId;
            delete userForm.value.country;
            delete userForm.value.avatar;
          } else {
            delete userForm.value.country;
            delete userForm.value.avatar;
          }
          // 国家是否是中国
          if (userForm.value.country === "CN") {
            delete userForm.value.email;
          } else {
            delete userForm.value.phone;
          }
          // 判断手机号/邮箱是否改变未改变删除字段
          if (!isTrue.value) {
            delete userForm.value.phone;
            delete userForm.value.email;
          }
          const res = await api.edit(userForm.value);
          if (res.status === -1) {
            return ElMessage.warning({
              message: "修改失败",
              center: true,
            });
          }
          emits("success");
          loading.value = false;
          ElMessage.success({
            message: "修改成功",
            center: true,
          });
          closeHandler();
        } catch (error) {

        } finally {
          loading.value = false;
        }
      }
    });
}

// #regin 上传文件
// 请求头
const token = userStore.token;
const headers = ref({ Token: token });
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
// 上传
const fileList = ref<any>([]);
// 删除
const handleRemove: any = async () => {
  upload.value = false;
  ElMessage.success({
    message: "删除成功",
    center: true,
  });
};
// 上传图片成功
const handleSuccess: any = (uploadFile: any, uploadFiles: any) => {
  if (uploadFile.status === -1) {
    Message.error(uploadFile.error, {
      zIndex: 2000,
    })
    // 过滤上传失败的图片
    fileList.value = fileList.value.filter((item: any) => item.name !== uploadFiles.name)
  } else {
    upload.value = true;
  }
};
// 超出限制
const handleExceed: any = async () => {
  ElMessage.warning({
    message: "只能上传一个,删除原文件后重新上传",
    center: true,
  });
};
// 查看
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
// 账户提交
const accountSubmit = () => {
  accountFormRef.value &&
    accountFormRef.value.validate(async (valid: any) => {
      if (valid) {
        try {
          loading.value = true;
          delete accountForm.value.confirmPassword;
          const res = await api.edit(accountForm.value);
          if (res.status === -1) {
            return ElMessage.warning({
              message: "修改失败",
              center: true,
            });
          }
          emits("success");
          loading.value = false;
          ElMessage.success({
            message: "修改成功",
            center: true,
          });
          closeHandler();
        } catch (error) {

        } finally {
          loading.value = false;
        }
      }
    });
};
// 父级传递数据
async function showEdit(row: any) {
  userForm.value = row;
  fileList.value.push({
    name: "file",
    url: userForm.value.avatar,
  });
  if (userForm.value.avatar !== "") {
    upload.value = true;
  }
  dialogTableVisible.value = true;
}
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  userFormRef.value.resetFields();
  accountFormRef.value.resetFields();
  // // 重置表单
  Object.assign(userForm, {});
  fileList.value = [];
  Object.assign(accountForm, {});
  dialogTableVisible.value = false;
}
// 获取数据
onMounted(async () => {
  try {
    loading.value = true;
    countryList.value = await basicDictionaryStore.getCountry();
    loading.value = false;
  } catch (error) {

  } finally {
    loading.value = false;
  }
});
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div v-loading="loading">
    <el-drawer v-model="dialogTableVisible" title="修改用户信息" direction="rtl" :before-close="closeHandler"
      style="height: 100%" size="40%">
      <ElTabs tab-position="left">
        <ElTabPane label="个人信息" class="basic">
          <h2>个人信息</h2>
          <ElForm ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px" el-width="120px">
            <ElFormItem style="
                display: flex;
                justify-content: center;
                align-items: center;
              " label="头像">
              <el-upload :class="{ hide_box: upload }" v-model:file-list="fileList" :headers="headers" :action="Url"
                list-type="picture-card" :limit="1" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                :on-success="handleSuccess" :on-exceed="handleExceed">
                <el-icon class="el-icon--upload">
                  <Plus />
                </el-icon>
                <!-- <div class="el-upload__text">上传</div> -->
                <template #tip>
                  <div class="el-upload__tip">
                    支持上传JPG/JPEG/PNG图片，小于10MB
                  </div>
                </template>
              </el-upload>

              <el-dialog v-model="dialogVisible" style="
                  z-index: 1000;
                  transform: translate(0);
                  position: relative;
                ">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </ElFormItem>
            <!-- <ElFormItem label="账户类型">
              <el-select v-model="userForm.type" value-key="" placeholder="账户类型" disabled clearable filterable>
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </ElFormItem> -->
            <ElFormItem label="用户名">
              <ElInput disabled v-model="userForm.name" placeholder="请输入你的用户名" />
            </ElFormItem>
            <ElFormItem label="国家">
              <ElSelect v-model="userForm.country" disabled>
                <ElOption v-for="item in countryList" :label="item.chineseName" :value="item.code" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem prop="" label="货币类型">
              <el-select v-model="userForm.currencyType" value-key="" placeholder="请选择货币类型" disabled clearable
                filterable>
                <el-option v-for="item in currencyType" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </ElFormItem>
            <ElFormItem label="公司名称">
              <ElInput v-model="userForm.companyName" placeholder="请输入你的公司名称" />
            </ElFormItem>
            <ElFormItem label="公司税号">
              <ElInput v-model="userForm.taxId" placeholder="请输入你的公司税号" />
            </ElFormItem>
            <ElFormItem label="法人姓名">
              <ElInput v-model="userForm.legalPersonName" placeholder="请输入你的法人姓名" />
            </ElFormItem>
            <ElFormItem v-if="userForm.country === 'CN'" prop="phone" label="手机号码">
              <ElInput v-model="userForm.phone" placeholder="请输入你的手机号码" disabled @change="handleChange" />
            </ElFormItem>
            <ElFormItem v-else prop="email" label="电子邮箱">
              <ElInput v-model="userForm.email" placeholder="请输入你的电子邮箱" disabled @change="handleChange" />
            </ElFormItem>
            <ElFormItem prop="isInvitation" label="合作邀约">
              <el-switch v-model="userForm.isInvitation" inline-prompt active-text="启用" inactive-text="禁用"
                :active-value="2" :inactive-value="1" />
            </ElFormItem>
            <ElFormItem>
              <ElButton @click="userSubmit" type="primary"> 保存 </ElButton>
              <ElButton @click="closeHandler" type="primary"> 取消 </ElButton>
            </ElFormItem>
          </ElForm>
        </ElTabPane>
        <ElTabPane label="账户管理" class="security">
          <h2 style="margin-bottom: 30px">账户管理</h2>
          <ElForm ref="accountFormRef" :model="accountForm" :rules="accountFormRules" label-width="120px">
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
              <ElButton @click="accountSubmit" type="primary"> 保存 </ElButton>
              <ElButton @click="closeHandler" type="primary"> 取消 </ElButton>
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

:deep(.el-upload--picture-card) {
  border-radius: 50%;
}

:deep(.el-upload-list__item-thumbnail) {
  border-radius: 50%;
}

:deep(.el-upload-list__item-actions) {
  border-radius: 50%;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  border: none;
}

.hide_box :deep(.el-upload--picture-card) {
  display: none;
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
