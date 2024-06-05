<route lang="yaml">
meta:
  whiteList: true
  title: 登录
  constant: true
  layout: false
</route>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import Copyright from "@/layouts/components/Copyright/index.vue";
import useSettingsStore from "@/store/modules/settings";
import useUserStore from "@/store/modules/user";
import storage from "@/utils/storage";
import api from "@/api/modules/register";

defineOptions({
  name: "Login",
});

const route = useRoute();
const router = useRouter();

const settingsStore = useSettingsStore();
const userStore = useUserStore();

const { t } = useI18n();

const banner = new URL("../assets/images/login-banner.png", import.meta.url)
  .href;
const logo = new URL("../assets/images/logo.png", import.meta.url).href;
const title = import.meta.env.VITE_APP_TITLE;

// 表单类型，login 登录，register 注册，reset 重置密码
const formType = ref("login");
const loading = ref(false);
const redirect = ref(
  route.query.redirect?.toString() ?? settingsStore.settings.home.fullPath
);

// 登录
const loginFormRef = ref<any>();
const loginType = ref("code"); // 登录方式
const loginCode = ref<any>("获取验证码");
const loginGetCaptcha = ref(false); // 验证码按钮是否禁用
const loginForm = ref<any>({
  account: storage.local.get("login_account") || "",
  remember: storage.local.has("login_account"),
});
// 自定义校验手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if (!regExpPhone.test(loginForm.value.account)) {
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
  if (!regExpEmail.test(loginForm.value.account)) {
    callback(new Error("请输入合法邮箱"));
  } else {
    callback();
  }
};
const loginRules = ref<any>({
  account: [{ required: true, trigger: "blur", message: "请输入手机号/邮箱" }],
  code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
  password: [
    { required: true, trigger: "blur", message: "请输入密码" },
    { min: 6, max: 18, trigger: "blur", message: "密码长度为6到18位" },
  ],
  agreeToTheAgreement: [
    {
      validator: (rule: any, value: any) => value === true,
      message: "请阅读并勾选协议",
      trigger: "change",
    },
  ],
});
// 动态表单校验
const chengAccount = () => {
  // 邮箱
  if (!loginForm.value.account.includes("@")) {
    loginRules.value.account = [
      { required: true, trigger: "blur", message: "请输入手机号/邮箱" },
      { validator: validatePhone, trigger: "blur" },
    ];
  } else {
    //手机号
    loginRules.value.account = [
      { required: true, trigger: "blur", message: "请输入手机号/邮箱" },
      { validator: validateEmail, trigger: "blur" },
    ];
  }
  console.log("loginRules", loginRules.value);
};
// 获取验证码
async function loginCaptcha() {
  loginFormRef.value.validateField("account", async (valid: any) => {
    // 校验通过
    if (valid) {
      let params: any;
      // 邮箱
      if (loginForm.value.account.includes("@")) {
        params = {
          email: loginForm.value.account,
          type: "login_email",
        };
      } else {
        // 手机号
        params = {
          phone: loginForm.value.account,
          type: "login_phone_number",
        };
      }
      const { status } = await api.sendCode(params);
      status === 1 &&
        ElMessage.success({
          message: "已发送",
        });
    }
  });
  loginCountdown();
}
// 倒计时
const loginCountdown = () => {
  loginGetCaptcha.value = true;
  let n = 60;
  getPhoneInterval.value = setInterval(() => {
    if (n > 0) {
      n--;
      loginCode.value = `请在${n}s后重新获取`;
    } else {
      clearInterval(getPhoneInterval.value);
      loginCode.value = "获取验证码";
      getPhoneInterval.value = null;
      loginGetCaptcha.value = false;
    }
  }, 1000);
};
function handleLogin() {
  loginFormRef.value &&
    loginFormRef.value.validate((valid: any) => {
      if (valid) {
        let params: any = {
          ...loginForm.value,
        };
        if (loginType.value === "password") {
          params.type = 1;
        } else {
          // 邮箱
          if (loginForm.value.account.includes("@")) {
            params.type = 3;
          } else {
            // 手机号
            params.type = 2;
          }
        }
        loading.value = true;
        userStore
          .login(params)
          .then(() => {
            loading.value = false;
            if (loginForm.value.remember) {
              storage.local.set("login_account", loginForm.value.account);
            } else {
              storage.local.remove("login_account");
            }
            router.push(redirect.value);
          })
          .catch(() => {
            loading.value = false;
          });
      }
    });
}

// 注册
const getPhoneInterval = ref<any>(null); // 倒计时
const phoneCode = ref<any>("获取验证码");
const isGetPhone = ref<boolean>(false); // 禁用获取验证码按钮
const registerFormRef = ref<any>();
const registerForm = ref<any>({
  account: "", // 账号
  password: "", // 密码
  email: "", //邮箱
  phoneNumber: "", //手机号码
  code: "", // 验证码
  country: "", //国家
  type: "phone", // 注册方式 phone/email
});
// 自定义校验手机号
const validatePhoneRegistered = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if (!regExpPhone.test(registerForm.value.phoneNumber)) {
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
  if (!regExpEmail.test(registerForm.value.email)) {
    callback(new Error("请输入合法邮箱"));
  } else {
    callback();
  }
};
const typeSelect = [
  {
    value: "phone",
    label: "中国",
  },
  {
    value: "email",
    label: "美国",
  },
];
const registerRules = ref<FormRules>({
  account: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  email: [
    { required: true, trigger: "blur", message: "请输入邮箱" },
    { validator: validateEmailRegistered, trigger: "blur" },
  ],
  phoneNumber: [
    { required: true, trigger: "blur", message: "请输入手机号码" },
    { validator: validatePhoneRegistered, trigger: "blur" },
  ],
  code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
  password: [
    { required: true, trigger: "blur", message: "请输入密码" },
    { min: 6, max: 18, trigger: "blur", message: "密码长度为6到18位" },
  ],
  agreeToTheAgreement: [
    {
      validator: (rule, value) => value === true,
      message: "请阅读并勾选协议",
      trigger: "change",
    },
  ],
});
// 获取验证码
const mobileVerificationCode = async () => {
  const params = {
    type: "register_phone_number", // 默认手机号
    email: registerForm.value.email,
    phone: registerForm.value.phoneNumber,
  };
  if (registerForm.value.type === "phone") {
    const data = await api.sendCode(params);
  } else {
    params.type = "register_email";
    const data = await api.sendCode(params);
  }
  countdown();
};
// 倒计时
const countdown = () => {
  isGetPhone.value = true;
  let n = 60;
  getPhoneInterval.value = setInterval(() => {
    if (n > 0) {
      n--;
      phoneCode.value = `请在${n}s后重新获取`;
    } else {
      clearInterval(getPhoneInterval.value);
      phoneCode.value = "获取验证码";
      getPhoneInterval.value = null;
      isGetPhone.value = false;
    }
  }, 1000);
};
async function handleRegister() {
  registerFormRef.value &&
    registerFormRef.value.validate(async (valid: any) => {
      if (valid) {
        // 这里编写业务代码
        const { status } = await api.register(registerForm.value);
        status === 1 &&
          ElMessage.success({
            message: "注册成功",
          });
      }
    });
}

// 重置密码
const resetFormRef = ref<any>();
const resetForm = ref({
  account: storage.local.get("login_account"),
  code: "",
  newPassword: "",
});
const resetRules = ref<FormRules>({
  account: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
  newPassword: [
    { required: true, trigger: "blur", message: "请输入新密码" },
    { min: 6, max: 18, trigger: "blur", message: "密码长度为6到18位" },
  ],
});
function handleReset() {
  ElMessage({
    message: "重置密码仅提供界面演示，无实际功能，需开发者自行扩展",
    type: "info",
  });
  resetFormRef.value &&
    resetFormRef.value.validate((valid: any) => {
      if (valid) {
        // 这里编写业务代码
      }
    });
}
// 清除定时器
onUnmounted(() => {
  clearInterval(getPhoneInterval.value);
  getPhoneInterval.value = null;
});
// 重置校验
const resetCheck = () => {
  loginFormRef.value.resetFields();
};
</script>

<template>
  <div>
    <div class="bg-banner" />
    <I18nSelector placement="bottom-end" class="i18n-selector">
      <SvgIcon name="i-ri:translate" />
    </I18nSelector>
    <div id="login-box">
      <div class="login-banner">
        <!-- <img :src="logo" class="logo" />
        <img :src="banner" class="banner" /> -->
        <h1 style="font-size: 50px; font-weight: normal">欢迎 !</h1>
        <h3 h1 style="font-size: 30px; font-weight: normal">
          来到租户系统 ! 👋🏻
        </h3>
      </div>
      <ElForm
        v-show="formType === 'login'"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <div class="title-container">
          <div class="fx-c">
            <el-radio-group
              v-model="loginType"
              size="large"
              @change="resetCheck"
            >
              <el-radio-button label="验证码登录" value="code" />
              <el-radio-button label="密码登录" value="password" />
            </el-radio-group>
          </div>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput
              v-model="loginForm.account"
              :placeholder="t('app.account')"
              type="text"
              tabindex="1"
            >
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
              <template #append v-if="loginType === 'code'">
                <el-button
                  type="primary"
                  :disabled="loginGetCaptcha"
                  @click="loginCaptcha"
                  >{{ loginCode }}</el-button
                >
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password" v-if="loginType === 'password'">
            <ElInput
              v-model="loginForm.password"
              type="password"
              :placeholder="t('app.password')"
              tabindex="2"
              autocomplete="new-password"
              show-password
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="code" v-if="loginType === 'code'">
            <ElInput
              v-model="loginForm.code"
              type="text"
              :placeholder="t('app.captcha')"
              tabindex="2"
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <SvgIcon name="i-ep:message" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="agreeToTheAgreement">
            <div class="flex-bar" style="margin: 0; width: 100%">
              <!-- {{loginForm.agreeToTheAgreement}} -->
              <ElCheckbox v-model="loginForm.agreeToTheAgreement" tabindex="3"
                >我已阅读并同意《xxxx协议》
              </ElCheckbox>
              <ElLink
                v-if="loginType === 'password'"
                type="primary"
                :underline="false"
                @click="formType = 'reset'"
              >
                忘记密码了?
              </ElLink>
            </div>
          </ElFormItem>
        </div>
        <div class="flex-bar">
          <ElCheckbox v-model="loginForm.remember" tabindex="4"> 保持登录 </ElCheckbox>
        </div>
        <ElButton
          :loading="loading"
          type="primary"
          size="large"
          style="width: 100%"
          @click.prevent="handleLogin" tabindex="5"
        >
          {{ t("app.login") }}
        </ElButton>
        <div class="sub-link">
          <span class="text">还不是会员?</span>
          <ElLink
            type="primary"
            :underline="false"
            @click="formType = 'register'"
          >
            立即注册
          </ElLink>
        </div>
      </ElForm>
      <ElForm
        v-show="formType === 'register'"
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        class="login-form"
        auto-complete="on"
      >
        <div>
          <ElFormItem prop="account">
            <ElInput
              v-model="registerForm.account"
              placeholder="用户名"
              tabindex="1"
            >
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="type">
            <ElSelect
              v-model="registerForm.type"
              placeholder="注册方式"
              tabindex="2"
            >
              <template #prefix>
                <SvgIcon name="i-mdi:format-list-bulleted-type" />
              </template>
              <ElOption
                v-for="item in typeSelect"
                :label="item.label"
                :value="item.value"
              ></ElOption>
            </ElSelect>
          </ElFormItem>
          <ElFormItem prop="phoneNumber" v-if="registerForm.type === 'phone'">
            <ElInput
              v-model="registerForm.phoneNumber"
              placeholder="手机号"
              tabindex="3"
            >
              <template #prefix>
                <SvgIcon name="i-ant-design:phone-outlined" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="email" v-if="registerForm.type === 'email'">
            <ElInput
              v-model="registerForm.email"
              placeholder="邮箱"
              tabindex="3"
            >
              <template #prefix>
                <SvgIcon name="i-mdi:email" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="code">
            <ElInput
              v-model="registerForm.code"
              placeholder="验证码"
              tabindex="4"
            >
              <template #prefix>
                <SvgIcon name="i-ic:baseline-verified-user" />
              </template>
              <template #append>
                <ElButton
                  :disabled="isGetPhone"
                  @click="mobileVerificationCode"
                >
                  {{ phoneCode }}</ElButton
                >
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput
              v-model="registerForm.password"
              type="password"
              placeholder="密码"
              tabindex="5"
              show-password
            >
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="agreeToTheAgreement">
            <div class="flex-bar" style="margin: 0">
              <ElCheckbox v-model="registerForm.agreeToTheAgreement" tabindex="6">
                我已阅读并同意《xxxx协议》
              </ElCheckbox>
            </div>
          </ElFormItem>
        </div>

        <ElButton
        tabindex="7"
          :loading="loading"
          type="primary"
          size="large"
          style="width: 100%; margin-top: 20px"
          @click.prevent="handleRegister"
        >
          注册
        </ElButton>
        <div class="sub-link">
          <span class="text">已经有帐号?</span>
          <ElLink type="primary" :underline="false" @click="formType = 'login'">
            去登录
          </ElLink>
        </div>
      </ElForm>
      <ElForm
        v-show="formType === 'reset'"
        ref="resetFormRef"
        :model="resetForm"
        :rules="resetRules"
        class="login-form"
      >
        <div class="title-container">
          <h3 class="title">忘记密码了? 🔒</h3>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput
              v-model="resetForm.account"
              :placeholder="t('app.account')"
              type="text"
              tabindex="1"
            >
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="code">
            <ElInput
              v-model="resetForm.code"
              :placeholder="t('app.code')"
              type="text"
              tabindex="2"
            >
              <template #prefix>
                <SvgIcon name="i-ic:baseline-verified-user" />
              </template>
              <template #append>
                <ElButton>{{ t("app.sendCaptcha") }}</ElButton>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="newPassword">
            <ElInput
              v-model="resetForm.newPassword"
              type="password"
              :placeholder="t('app.newPassword')"
              tabindex="3"
              show-password
            >
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <ElButton
          :loading="loading"
          type="primary"
          size="large"
          style="width: 100%; margin-top: 20px"
          @click.prevent="handleReset"
        >
          {{ t("app.check") }}
        </ElButton>
        <div class="sub-link">
          <ElLink type="primary" :underline="false" @click="formType = 'login'">
            {{ t("app.goLogin") }}
          </ElLink>
        </div>
      </ElForm>
    </div>
    <Copyright />
  </div>
</template>

<style lang="scss" scoped>

.fx-c {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
[data-mode="mobile"] {
  #login-box {
    position: relative;
    top: inherit;
    left: inherit;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
    transform: translateX(0) translateY(0);

    .login-banner {
      width: 100%;
      padding: 20px 0;

      .banner {
        position: relative;
        top: inherit;
        right: inherit;
        display: inherit;
        width: 100%;
        max-width: 375px;
        margin: 0 auto;
        transform: translateY(0);
      }
    }

    .login-form {
      width: 100%;
      min-height: auto;
      padding: 30px;
    }
  }

  .copyright {
    position: relative;
  }

  .login-switcher {
    display: none;
  }
}

:deep(input[type="password"]::-ms-reveal) {
  display: none;
}

:deep(.i18n-selector) {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  font-size: 18px;
  // color: var(--el-text-color-primary);
  color: #fff;
  cursor: pointer;
}

.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/images/background.jpg") center center fixed
    no-repeat;
  background-size: cover;
  // background: radial-gradient(
  //   circle at center,
  //   var(--g-container-bg),
  //   var(--g-bg)
  // );
}

#login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 10px;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  padding: 0 20%;
  box-sizing: border-box;

  .login-banner {
    position: relative;
    // width: 60%;
    width: 450px;
    overflow: hidden;
    color: #fff;
    // background-color: var(--g-bg);

    .banner {
      width: 100%;

      @include position-center(y);
    }

    .logo {
      position: absolute;
      top: 20px;
      left: 20px;
      height: 30px;
      border-radius: 4px;
      box-shadow: var(--el-box-shadow-light);
    }
  }

  .login-form {
    background-color: var(--g-container-bg);
    box-shadow: var(--el-box-shadow);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
    width: 500px;
    min-height: 500px;
    padding: 50px;

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 30px;
        font-size: 1.3em;
        font-weight: bold;
        color: var(--el-text-color-primary);
      }
    }
  }

  .el-form-item {
    margin-bottom: 24px;

    :deep(.el-select__wrapper) {
      width: 100%;
      height: 48px;
      line-height: inherit;
    }

    :deep(.el-input) {
      width: 100%;
      height: 48px;
      line-height: inherit;

      input {
        height: 48px;
      }

      .el-input__prefix,
      .el-input__suffix {
        display: flex;
        align-items: center;
      }

      .el-input__prefix {
        left: 10px;
      }

      .el-input__suffix {
        right: 10px;
      }
    }
  }

  :deep(.el-divider__text) {
    background-color: var(--g-container-bg);
  }

  .flex-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .sub-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
    color: var(--el-text-color-secondary);

    .text {
      margin-inline-end: 10px;
    }
  }
}

.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  margin: 0;
}

.login-switcher {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
