<route lang="yaml">
meta:
  whiteList: true
  title: 登录
  constant: true
  layout: false
</route>

<script setup lang="ts">
// @ts-nocheck
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { ElNotification } from "element-plus";
import { useI18n } from "vue-i18n";
import agreement from "./agreement.vue";
import Copyright from "@/layouts/components/Copyright/index.vue";
import useSettingsStore from "@/store/modules/settings";
import useUserStore from "@/store/modules/user";
import storage from "@/utils/storage";
import { debounce } from "lodash-es";
import api from "@/api/modules/register";
import apiCountry from "@/api/modules/basicDictionary";

defineOptions({
  name: "Login",
});
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const settingsStore = useSettingsStore();

const { t } = useI18n();

const banner = new URL("../assets/images/login-banner.png", import.meta.url)
  .href;
const logo = new URL("../assets/images/logo.png", import.meta.url).href;
const title = import.meta.env.VITE_APP_TITLE;
const isDomain = ref<any>();

// 表单类型，login 登录，register 注册，reset 重置密码
const isRegister = ref<any>();
const formType = ref("login");
const loading = ref(false);
const redirect = ref(
  route.query.redirect?.toString() ?? settingsStore.settings.home.fullPath,
);

//#region 登录
const loginFormRef = ref<any>();
const loginType = ref("password"); // 登录方式
const loginCode = ref<any>("获取验证码");
const loginGetCaptcha = ref(false); // 验证码按钮是否禁用
const loginForm = ref<any>({
  account: storage.local.get("login_account") || "",
  remember: storage.local.has("login_account"),
  // 勾选协议
  agreeToTheAgreement: false,
});
// 自定义校验手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  const regExpPhone: any = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  if (!regExpPhone.test(value)) {
    callback(new Error(t("app.rightPhone")));
  } else {
    callback();
  }
};
// 自定义校验邮箱
const validateEmail = (rule: any, value: any, callback: any) => {
  const regExpEmail: any =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExpEmail.test(loginForm.value.account)) {
    callback(new Error(t("app.rightEmail")));
  } else {
    callback();
  }
};
const loginRules = ref<any>({
  account: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.numberEnter")),
    },
  ],
  code: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.captchaEnter")),
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.pwdEnter")),
    },
    {
      min: 6,
      max: 18,
      trigger: "blur",
      message: computed(() => t("app.6to18")),
    },
  ],
  agreeToTheAgreement: [
    {
      required: true,
      validator: (rule: any, value: any) => value === true,
      message: computed(() => t("app.readCheck")),
      trigger: "change",
    },
  ],
});
//获取自定义域名中间的租户id
const urlNumSplit = (url: any) => {
  const regex = /(\D+)(\d+)\.(\S+)/;
  const match = url.match(regex);

  if (match) {
    const number = match[2];
    return number;
  } else {
    return "";
  }
};
onMounted(async () => {
  const { data } = await api.getTenantConfig();
  isRegister.value = data?.register === false ? false : true;
  if (route.query.isRegister && route.query.isRegister === "true") {
    formType.value = "register";
  }
  const res = await api.getTenantPageTemplate({});
  isDomain.value = res.data.isDomain;
  if (res.data.isDomain === 1) {
    userStore.webName = res.data.webName;
    userStore.description = res.data.description;
    userStore.keyWords = res.data.keyWords;
  }
});
// 动态表单校验
// const chengAccount = () => {
//   // 手机号
//   if (!loginForm.value.account.includes("@")) {
//     loginRules.value.account = [
//       { required: true, trigger: "blur", message: computed(() => t("app.enterPhoneEmail")) },
//       { validator: validatePhone, trigger: "blur" },
//     ];
//   } else {
//     //邮箱
//     loginRules.value.account = [
//       { required: true, trigger: "blur", message: computed(() => t("app.enterPhoneEmail")) },
//       { validator: validateEmail, trigger: "blur" },
//     ];
//   }
// };
const chengAccount = () => {
  const account = loginForm.value.account;
  if (account.includes("@")) {
    // 邮箱
    loginRules.value.account = [
      {
        required: true,
        trigger: "blur",
        message: computed(() => t("app.enterEmail")),
      },
      { validator: validateEmail, trigger: "blur" },
    ];
  } else if (/^\d{11}$/.test(account)) {
    // 假设手机号是10位数字
    loginRules.value.account = [
      {
        required: true,
        trigger: "blur",
        message: computed(() => t("app.enterPhone")),
      },
      { validator: validatePhone, trigger: "blur" },
    ];
  } else if (account.trim() !== "") {
    // 用户名
    loginRules.value.account = [
      {
        required: true,
        trigger: "blur",
        message: computed(() => t("app.enterAccount")),
      },
    ];
  } else {
    // 不触发校验
    loginRules.value.account = [];
  }
};
const loginSendCode = debounce(async (params: any) => {
  const { status } = await api.sendCode(params);
  if (status === 1) {
    ElMessage.success({
      message: computed(() => t("app.sendSuccess")),
    });
    loginCountdown();
  }
}, 1000);
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
      loginCode.value = t("app.sending");
      await loginSendCode(params);
    }
  });
}
// 倒计时
const loginCountdown = () => {
  loginGetCaptcha.value = true;
  let n = 60;
  getPhoneInterval.value = setInterval(() => {
    if (n > 0) {
      n--;
      loginCode.value = `${t("app.please")}${n}${t("app.getAgain")}`;
    } else {
      clearInterval(getPhoneInterval.value);
      loginCode.value = "获取验证码";
      getPhoneInterval.value = null;
      loginGetCaptcha.value = false;
    }
  }, 1000);
};

// 登录
const handleLogin = debounce(() => {
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
        //如果是自定义域名，携带id，就传
        const currentUrl = window.location.href;
        // console.log(currentUrl,urlNumSplit(currentUrl))
        if (urlNumSplit(currentUrl)) {
          params.tenantId = urlNumSplit(currentUrl);
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
}, 500);
//#endregion

// #region 注册
// 倒计时
const getPhoneInterval = ref<any>(null);
const phoneCode = ref<any>("获取验证码");
// 禁用获取验证码按钮
const isGetPhone = ref<boolean>(false);
const registerFormRef = ref<any>();
// 账户类型
const typeList = [
  { label: "公司", value: "company" },
  // { label: "个人", value: "personal" },
];
// 区域list
const countryList = ref<any>([]);
const registerForm = ref<any>({
  // 账号
  name: "",
  // 密码
  password: "",
  //邮箱
  email: "",
  //手机号码
  phoneNumber: "",
  // 验证码
  code: "",
  //区域
  country: "",
  // 注册方式 phone/email
  type: "phone",
  agreeToTheAgreement: false,
  // 账户类型
  companyType: "company",
  // 公司名称
  companyName: "",
  // 法人姓名
  legalPersonName: "",
  // 税号
  taxID: "",
  // 合作商邀约
  // isInvitation: 2,
});
// 自定义校验手机号
const validatePhoneRegistered = (rule: any, value: any, callback: any) => {
  const regExpPhone: any = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  if (!regExpPhone.test(registerForm.value.phoneNumber)) {
    //
    callback(new Error(t("app.rightPhone")));
  } else {
    callback();
  }
};
// 自定义校验邮箱
const validateEmailRegistered = (rule: any, value: any, callback: any) => {
  const regExpEmail: any =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExpEmail.test(registerForm.value.email)) {
    callback(new Error(t("app.rightEmail")));
  } else {
    callback();
  }
};
const registerRules = ref<FormRules>({
  account: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.enterAccount")),
    },
  ],
  companyName: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.companyName")),
    },
  ],
  companyType: [
    {
      required: true,
      trigger: "change",
      message: computed(() => t("app.accountType")),
    },
  ],
  legalPersonName: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.enterLegalPerson")),
    },
  ],
  email: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.enterEmail")),
    },
    { validator: validateEmailRegistered, trigger: "blur" },
  ],
  phoneNumber: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.enterPhone")),
    },
    { validator: validatePhoneRegistered, trigger: "blur" },
  ],
  code: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.captchaEnter")),
    },
  ],
  country: [
    {
      required: true,
      trigger: "change",
      message: computed(() => t("app.areaSelect")),
    },
  ],
  name: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.enterAccount")),
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.pwdEnter")),
    },
    {
      min: 6,
      max: 18,
      trigger: "blur",
      message: computed(() => t("app.6to18")),
    },
  ],
  isInvitation: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.cooperationOfferSelect")),
    },
  ],
  agreeToTheAgreement: [
    {
      required: true,
      validator: (rule: any, value: any) => value === true,
      message: computed(() => t("app.readCheck")),
      trigger: "change",
    },
  ],
});

const registerSendCode = debounce(async (params: any) => {
  const { status } = await api.sendCode(params);
  if (status === 1) {
    ElMessage.success({
      message: computed(() => t("app.sendSuccess")),
    });
    countdown();
  }
}, 1000);
// 获取验证码
const mobileVerificationCode = async () => {
  // 首先，验证区域选择
  const countryValid = await registerFormRef.value.validateField("country");
  registerFormRef.value.validateField(
    registerForm.value.country === "CN" ? "phoneNumber" : "email",
    async (valid: any) => {
      if (valid && countryValid) {
        const params = {
          type: "register_phone_number", // 默认手机号
          email: registerForm.value.email,
          phone: registerForm.value.phoneNumber,
          countryCode: registerForm.value.country,
        };
        if (registerForm.value.country === "CN") {
          phoneCode.value = `正在发送验证码`;
          await registerSendCode(params);
        } else {
          params.type = "register_email";
          phoneCode.value = `正在发送验证码`;
          await registerSendCode(params);
        }
      }
    },
  );
};
// 倒计时
const countdown = () => {
  isGetPhone.value = true;
  let n = 60;
  getPhoneInterval.value = setInterval(() => {
    if (n > 0) {
      n--;
      phoneCode.value = `${t("app.please")}${n}${t("app.getAgain")}`;
    } else {
      clearInterval(getPhoneInterval.value);
      phoneCode.value = "获取验证码";
      getPhoneInterval.value = null;
      isGetPhone.value = false;
    }
  }, 1000);
};
// 注册
const handleRegister = debounce(async () => {
  registerFormRef.value &&
    registerFormRef.value.validate(async (valid: any) => {
      if (valid) {
        registerForm.value.type =
          registerForm.value.country === "CN" ? "phone" : "email";
        // registerForm.value.companyName = "";
        // registerForm.value.legalPersonName = "";
        // registerForm.value.taxID = "";
        // delete registerForm.value.agreeToTheAgreement;
        if (registerForm.value.type === "phone") {
          delete registerForm.value.email;
        } else {
          delete registerForm.value.phoneNumber;
        }
        delete registerForm.value.agreeToTheAgreement;
        const { status } = await api.register(registerForm.value);
        if (status === 1) {
          ElMessage.success({
            message: computed(() => t("app.signInSuccess")),
          });
          // 跳转登录 快捷方式
          formType.value = "login";
          loginType.value = "password";
        }
        nextTick(() => {
          loginForm.value.account =
            registerForm.value.email || registerForm.value.phoneNumber;
        });
      }
    });
}, 500);

// #endregion

// #region 重置密码
// 倒计时
const getResultInterval = ref<any>(null);
const resetFormRef = ref<any>();
const resultCode = ref<any>("获取验证码");
// 禁用获取验证码按钮
const isReset = ref<boolean>(false);
const resetForm = ref({
  info: storage.local.get("login_account"),
  code: "",
  newPassword: "",
});
// 校验函数
const validatePassword = (rule, value, callback) => {
  // 匹配包含空格或汉字的情况
  if (/[\s\u4e00-\u9fa5]/.test(value)) {
    callback(new Error("密码中带有空格或汉字")); // 验证失败
  } else {
    callback(); // 验证通过
  }
};
// 校验
const resetRules = ref<FormRules>({
  info: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.enterAccount")),
    },
  ],
  code: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.captchaEnter")),
    },
  ],
  newPassword: [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.newPwdEnter")),
    },
    {
      min: 6,
      max: 18,
      trigger: "blur",
      message: computed(() => t("app.6to18")),
    },
    { validator: validatePassword, trigger: "blur" },
  ],
});
// 重置密码发送验证码
const resultVerificationCode = debounce(() => {
  resetFormRef.value.validateField(
    !resetForm.value.info ? "info" : "",
    async (valid: any) => {
      if (valid) {
        resultCode.value = `正在发送验证码`;
        // 这里编写业务代码
        const { status } = await api.forgetCode({ info: resetForm.value.info });
        if (status === 1) {
          ElMessage.success({
            message: computed(() => t("app.sendSuccess")),
          });
          resultCountdown();
        }
      }
    },
  );
}, 1000);
// 修改密码
const handleReset = debounce(() => {
  resetFormRef.value &&
    resetFormRef.value.validate(async (valid: any) => {
      if (valid) {
        // 这里编写业务代码
        const { status } = await api.updatePassword(resetForm.value);
        if (status === 1) {
          ElMessage.success({
            message: computed(() => t("app.changeSuccess")),
          });
          // 跳转登录 快捷方式
          formType.value = "login";
          nextTick(() => {
            loginForm.value.account = resetForm.value.info;
          });
        }
      }
    });
}, 500);
// 倒计时
const resultCountdown = () => {
  isReset.value = true;
  let n = 60;
  getResultInterval.value = setInterval(() => {
    if (n > 0) {
      n--;
      resultCode.value = `请在${n}s后重新获取`;
    } else {
      clearInterval(getResultInterval.value);
      resultCode.value = "获取验证码";
      getResultInterval.value = null;
      isReset.value = false;
    }
  }, 1000);
};

// 清除定时器
onUnmounted(() => {
  clearInterval(getPhoneInterval.value);
  getPhoneInterval.value = null;
  clearInterval(getResultInterval.value);
  getResultInterval.value = null;
});
// 重置校验
const resetCheck = () => {
  loginRules.value.account = [
    {
      required: true,
      trigger: "blur",
      message: computed(() => t("app.numberEnter")),
    },
  ];
  loginForm.value.code = "";
  loginFormRef.value.resetFields();
};

// #endregion
// 监听切换变化，清除表单数据
watch(
  () => formType.value,
  async (newValue: any) => {
    // login 登录， register 注册， reset 重置密码
    switch (newValue) {
      case "login":
        resetCheck();
        clearInterval(getPhoneInterval.value);
        loginCode.value = t("app.getCaptcha");
        getPhoneInterval.value = null;
        loginGetCaptcha.value = false;
        loginForm.value = {
          account: storage.local.get("login_account") || "",
          remember: storage.local.has("login_account"),
          agreeToTheAgreement: false,
        };
        break;
      case "register":
        registerFormRef.value.resetFields();
        clearInterval(getPhoneInterval.value);
        phoneCode.value = t("app.getCaptcha");
        getPhoneInterval.value = null;
        isGetPhone.value = false;
        registerForm.value.agreeToTheAgreement = false;
        registerForm.value = {
          name: "", // 账号
          password: "", // 密码
          email: "", //邮箱
          phoneNumber: "", //手机号码
          code: "", // 验证码
          country: "", //区域
          type: "phone", // 注册方式 phone/email
          // isInvitation: 2, // 合作商邀约
          agreeToTheAgreement: false,
        };
        break;
      case "reset":
        resetFormRef.value.resetFields();
        clearInterval(getResultInterval.value);
        resultCode.value = "获取验证码";
        getResultInterval.value = null;
        isReset.value = false;
        resetForm.value = {
          info: "", // 账号
          newPassword: "", // 新密码
          code: "", // 验证码
        };
        break;
    }
    // 注册 获取区域
    if (newValue === "register") {
      const res = await apiCountry.itemlist({
        page: 1,
        limit: -1,
        id: "32", // 区域
      });
      countryList.value = res.data.records;
    }
  },
);
const agreementRef = ref<any>();
// 协议弹框
const agreements = (val: any) => {
  agreementRef.value.showEdit(val);
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
        <!--<h1 style="font-size: 3.125rem; font-weight: normal">欢迎</h1>
        <h3 h1 style="font-size: 1.875rem; font-weight: normal">来到合作商系统 !</h3>-->
      </div>
      <el-form
        v-show="formType === 'login'"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        :validate-on-rule-change="false"
      >
        <div class="title-container">
          <div class="fx-c">
            <el-radio-group
              v-model="loginType"
              size="large"
              @change="resetCheck"
            >
              <el-radio-button label="密码登录" value="password" />
              <el-radio-button label="验证码登录" value="code" />
            </el-radio-group>
          </div>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput
              v-model.trim="loginForm.account"
              :placeholder="t('app.account')"
              type="text"
              tabindex="1"
              @blur="chengAccount"
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
              v-model.trim="loginForm.password"
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
              v-model.trim="loginForm.code"
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
          <ElFormItem prop="agreeToTheAgreement" style="margin-bottom: 0.5rem">
            <div class="flex-bar" style="width: 100%; margin: 0">
              <ElCheckbox v-model="loginForm.agreeToTheAgreement" tabindex="3">
                {{ t("app.readAgree") }}
                <el-button
                  type="primary"
                  size="default"
                  link
                  @click="agreements(1)"
                  >{{ t("app.vipAgreement") }}</el-button
                >{{ t("app.and")
                }}<el-button
                  type="primary"
                  size="default"
                  link
                  @click="agreements(2)"
                  >{{ t("app.serviceAgreement") }}</el-button
                >
              </ElCheckbox>
            </div>
          </ElFormItem>
          <ElFormItem>
            <div class="flex-bar">
              <ElCheckbox v-model="loginForm.remember" tabindex="4">
                {{ t("app.keepLogin") }}
              </ElCheckbox>
              <ElLink
                v-if="loginType === 'password'"
                type="primary"
                :underline="false"
                @click="formType = 'reset'"
              >
                {{ t("app.forgetPassword") }}
              </ElLink>
            </div>
          </ElFormItem>
        </div>

        <ElButton
          :loading="loading"
          type="primary"
          size="large"
          style="width: 100%"
          @click.prevent="handleLogin"
          tabindex="5"
        >
          {{ t("app.login") }}
        </ElButton>
        <div v-if="isDomain !== 1" class="sub-link" v-show="isRegister">
          <span class="text">{{ t("app.notMember") }}</span>
          <ElLink
            type="primary"
            :underline="false"
            @click="formType = 'register'"
          >
            {{ t("app.register") }}
          </ElLink>
        </div>
      </el-form>
      <ElForm
        v-show="formType === 'register'"
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        class="login-form"
        auto-complete="on"
      >
        <div>
          <!-- <ElFormItem prop="companyType">
            <el-select
              v-model="registerForm.companyType"
              value-key=""
              :placeholder="t('app.AccountType')"
              clearable
              filterable
            >
              <template #prefix>
                <div
                  class="i-ic:round-supervisor-account w-1.5em h-1.5em"
                ></div>
              </template>
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </ElFormItem> -->
          <!-- v-if="registerForm.companyType === 'company'" -->
          <ElFormItem prop="companyName">
            <ElInput
              v-model.trim="registerForm.companyName"
              :placeholder="t('app.CompanyName')"
              tabindex="1"
            >
              <template #prefix>
                <SvgIcon name="i-mdi:greenhouse" />
              </template>
            </ElInput>
          </ElFormItem>
          <!--  v-if="registerForm.companyType === 'company'" -->
          <!-- <ElFormItem prop="taxID">
            <ElInput v-model.trim="registerForm.taxID" placeholder="请输入公司税号" />
          </ElFormItem> -->
          <!--  v-if="registerForm.companyType === 'company'" -->
          <!-- <ElFormItem prop="legalPersonName">
            <ElInput v-model.trim="registerForm.legalPersonName" placeholder="请输入法人姓名" />
          </ElFormItem> -->
          <ElFormItem prop="name">
            <ElInput
              v-model.trim="registerForm.name"
              :placeholder="t('app.Username')"
              tabindex="2"
            >
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="country">
            <ElSelect
              v-model="registerForm.country"
              :placeholder="t('app.Area')"
              clearable
              filterable
              tabindex="3"
            >
              <template #prefix>
                <SvgIcon name="i-mdi:format-list-bulleted-type" />
              </template>
              <ElOption
                v-for="item in countryList"
                :label="item.chineseName"
                :value="item.code"
              ></ElOption>
            </ElSelect>
          </ElFormItem>
          <ElFormItem prop="phoneNumber" v-if="registerForm.country === 'CN'">
            <ElInput
              v-model.trim="registerForm.phoneNumber"
              :placeholder="t('app.PhoneNumber')"
              tabindex="4"
            >
              <template #prefix>
                <SvgIcon name="i-ant-design:phone-outlined" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="email" v-else>
            <ElInput
              v-model.trim="registerForm.email"
              :placeholder="t('app.Email')"
              tabindex="4"
            >
              <template #prefix>
                <SvgIcon name="i-mdi:email" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="code">
            <ElInput
              v-model.trim="registerForm.code"
              :placeholder="t('app.captcha')"
              tabindex="5"
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
              v-model.trim="registerForm.password"
              type="password"
              :placeholder="t('app.password')"
              tabindex="6"
              show-password
            >
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <!-- <ElFormItem prop="isInvitation">
            <el-select
              v-model="registerForm.isInvitation"
              tabindex="7"
              :placeholder="t('app.CooperationOffer')"
              filterable
            >
              <template #prefix>
                <SvgIcon name="i-ant-design:container-outlined" />
              </template>
              <el-option :label="t('app.On')" :value="2"> </el-option>
              <el-option :label="t('app.Off')" :value="1"> </el-option>
            </el-select>
          </ElFormItem> -->
          <ElFormItem prop="agreeToTheAgreement">
            <ElCheckbox v-model="registerForm.agreeToTheAgreement" tabindex="8">
              {{ t("app.readAgree") }}
              <el-button
                type="primary"
                size="default"
                link
                @click="agreements(1)"
                >{{ t("app.vipAgreement") }}</el-button
              >{{ t("app.and")
              }}<el-button
                type="primary"
                size="default"
                link
                @click="agreements(2)"
                >{{ t("app.serviceAgreement") }}</el-button
              >
            </ElCheckbox>
          </ElFormItem>
        </div>
        <ElButton
          tabindex="9"
          :loading="loading"
          type="primary"
          size="large"
          style="width: 100%; margin-top: 1.25rem"
          @click.prevent="handleRegister"
        >
          {{ t("app.Register") }}
        </ElButton>
        <div class="sub-link">
          <span class="text">{{ t("app.haveAccount") }}</span>
          <ElLink type="primary" :underline="false" @click="formType = 'login'">
            {{ t("app.toLogin") }}
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
          <h3 class="title">{{ t("app.forgetPassword") }} 🔒</h3>
        </div>
        <div>
          <ElFormItem prop="info">
            <ElInput
              v-model.trim="resetForm.info"
              :placeholder="t('app.account')"
              type="text"
              tabindex="1"
              @blur="chengAccount"
            >
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="code">
            <ElInput
              v-model.trim="resetForm.code"
              :placeholder="t('app.captcha')"
              type="text"
              tabindex="2"
            >
              <template #prefix>
                <SvgIcon name="i-ic:baseline-verified-user" />
              </template>
              <template #append>
                <ElButton :disabled="isReset" @click="resultVerificationCode">{{
                  resultCode
                }}</ElButton>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="newPassword">
            <ElInput
              v-model.trim="resetForm.newPassword"
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
          style="width: 100%; margin-top: 1.25rem"
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
    <agreement ref="agreementRef" />
  </div>
</template>

<style lang="scss" scoped>
.fx-c {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.125rem;
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
      padding: 1.25rem 0;

      .banner {
        position: relative;
        top: inherit;
        right: inherit;
        display: inherit;
        width: 100%;
        max-width: 23.4375rem;
        margin: 0 auto;
        transform: translateY(0);
      }
    }

    .login-form {
      width: 100%;
      min-height: auto;
      padding: 1.875rem;
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
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1;
  font-size: 1.125rem;
  // color: var(--el-text-color-primary);
  color: #fff;
  cursor: pointer;
}

.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/images/background.png") center center fixed
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
  border-radius: 0.625rem;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  padding: 0 20%;
  box-sizing: border-box;

  .login-banner {
    position: relative;
    // width: 60%;
    width: 28.125rem;
    overflow: hidden;
    color: #fff;
    // background-color: var(--g-bg);

    .banner {
      width: 100%;

      @include position-center(y);
    }

    .logo {
      position: absolute;
      top: 1.25rem;
      left: 1.25rem;
      height: 1.875rem;
      border-radius: 0.25rem;
      box-shadow: var(--el-box-shadow-light);
    }
  }

  .login-form {
    background-color: var(--g-container-bg);
    box-shadow: var(--el-box-shadow);
    border-radius: 0.625rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
    width: 31.25rem;
    min-height: 31.25rem;
    padding: 3.125rem;

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 1.875rem;
        font-size: 1.3em;
        font-weight: bold;
        color: var(--el-text-color-primary);
      }
    }
  }

  .el-form-item {
    margin-bottom: 1.5rem;

    :deep(.el-select__wrapper) {
      width: 100%;
      height: 3rem;
      line-height: inherit;
    }

    :deep(.el-input) {
      width: 100%;
      height: 3rem;
      line-height: inherit;

      input {
        height: 3rem;
      }

      .el-input__prefix,
      .el-input__suffix {
        display: flex;
        align-items: center;
      }

      .el-input__prefix {
        left: 0.625rem;
      }

      .el-input__suffix {
        right: 0.625rem;
      }
    }
  }

  :deep(.el-divider__text) {
    background-color: var(--g-container-bg);
  }

  .flex-bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .sub-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.25rem;
    font-size: 0.875rem;
    color: var(--el-text-color-secondary);

    .text {
      margin-inline-end: 0.625rem;
    }
  }
}

.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1.25rem;
  margin: 0;
}

.login-switcher {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
}

:deep(.el-checkbox__label) {
  display: flex;
  align-items: center;
}

.el-button + .el-button {
  margin: 0;
}
</style>
