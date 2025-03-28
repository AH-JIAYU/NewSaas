<script setup lang="ts">
import type { FormInstance, FormRules, UploadProps } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, ref, onActivated } from "vue";
import api from "@/api/modules/configuration_site_setting";
import apiLogo from "@/api/modules/logo";
import Message from "vue-m-message";
import useClipboard from "vue-clipboard3";
import { AnyFn } from "@vueuse/core";
import useUserStore from "@/store/modules/user";
import useConfigurationSiteSettingStore from "@/store/modules/configuration_siteSetting";
import siteDetail from "./components/siteDetail/index.vue";
import logo from "@/api/modules/logo";

defineOptions({
  name: "site_setting",
});
// 定义货币
const currencyList = [
  { label: "美元", value: "USD" },
  { label: "人民币", value: "CNY" },
];
// 货币类型
const currencyType = ref<any>();
//站点设置
const configurationSiteSettingStore = useConfigurationSiteSettingStore();
// token
const userStore = useUserStore();
// detailRef
const recordRef = ref();
// 接口地址
const Url = import.meta.env.VITE_APP_API_BASEURL + "/api/tenant-logo/upload";
const { toClipboard } = useClipboard();
const activeTopTab = ref<any>("基本设置");
// 加载
const loading = ref(false);
// form ref
const formRef = ref<any>();
// 根据url判断是否解析顶级域名
const isAnalysis = ref<boolean>(false);
// 解析记录
const analyzeRecords = ref<any>();
const data = ref<any>({
  type: 1,
});
// 定义表单
const form = ref<any>({
  id: "",
  // 注册开关
  registerOffOrOn: true,
  // 注册审核
  registerExamineOffOrOn: false,
  // keyWords
  keyWords: "",
  // 网站描述
  description: "",
  // 网站名称
  webName: "",
  // 设置顶级域名
  topLevelDomainName: "",
  // 默认会员价格比例
  defaultPriceRatio: null,
  // 税率
  taxRate: null,
  // 最低结算金额
  minimumAmount: null,
  // 调查限价
  // fixedPrice: "",
  // 手机号
  phone: "",
  // 邮箱
  email: "",
  // QQ
  qqCode: "",
  // 公司地址
  address: "",
  //外包项目别名
  projectOutAlias: "",
  // 默认美元对人民币币种
  acquiesceExchangeRate: "",
});
// 自定义校验手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[\d]))\d{8}$/;
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
// 自定义校验QQ号
const validateQQ = (rule: any, value: any, callback: any) => {
  const regExpQQ = /^[1-9][0-9]{4,14}$/; // QQ号正则表达式
  if (!regExpQQ.test(value)) {
    callback(new Error("请输入合法QQ号（5到15位数字，不能以0开头）"));
  } else {
    callback();
  }
};
// 校验顶级域名
const validateTopLevelDomainName = (rule: any, value: any, callback: any) => {
  // 改进后的正则表达式
  const domainPattern =
    /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(?:\.[A-Za-z0-9-]{1,63}(?<!-))*\.[A-Za-z]{2,}$/;
  if (domainPattern.test(value)) {
    callback(); // 验证通过
  } else {
    callback(new Error("请输入合法的域名")); // 验证失败
  }
};
// 校验
const formRules = ref<FormRules>({
  webName: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
  topLevelDomainName: [
    { required: false, message: "请输入顶级域名", trigger: "blur" },
    { validator: validateTopLevelDomainName, trigger: "submit" },
  ],
  phone: [
    { required: false, trigger: "blur", message: "请输入手机号" },
    { validator: validatePhone, trigger: "blur" },
  ],
  email: [
    { required: false, trigger: "blur", message: "请输入邮箱" },
    { validator: validateEmail, trigger: "blur" },
  ],
  qqCode: [
    { required: false, trigger: "blur", message: "请输入QQ号码" },
    { validator: validateQQ, trigger: "blur" },
  ],
  address: [
    { required: false, message: "请输入内容", trigger: "blur" },
    { max: 50, message: "最多输入 50 字", trigger: "blur" },
  ],
  acquiesceExchangeRate: [
    { required: true, message: "请输入美元汇率", trigger: "blur" },
    {
      pattern: /^(?!0(\.0+)?$)(\d+(\.\d{1,2})?)$/,
      message: "请输入一个有效的数字，不能小于0，最多保留两位小数",
      trigger: "blur",
    },
  ],
});

onMounted(() => {
  loading.value = true;
  userStore.logo && (fileList.value = [{ name: "logo", url: userStore.logo }]);
  getDataList();
  loading.value = false;
});
onActivated(() => {
  loading.value = true;
  userStore.logo && (fileList.value = [{ name: "logo", url: userStore.logo }]);
  getDataList();
  loading.value = false;
});
//获取自定义域名中间的租户id
const urlNumSplit = (url: any) => {
  const regex = /(\D+)(\d+)\.(\S+)/;
  const match = url.match(regex);

  if (match) {
    const number = match[2];
    console.log(number); // 输出：692377470037889024
  } else {
    console.log("没有匹配的数字");
  }
};
// 获取数据
async function getDataList() {
  try {
    const { data, status } = await api.list();
    configurationSiteSettingStore.setSiteConfig(data);
    if (data && status === 1) {
      form.value = data || form.value;
      currencyType.value = data.currencyType;
      if (form.value.minimumAmount === 0) form.value.minimumAmount = null;
      analyzeRecords.value = form.value;
      userStore.originalExchangeRate = form.value.exchangeRate;
      if (!form.value.acquiesceExchangeRate) {
        form.value.acquiesceExchangeRate = form.value.exchangeRate;
      }
      userStore.setWebName(data.webName);
      userStore.setDescription(data.description);
      userStore.setkeyWords(data.keyWords);
    }
    if (
      form.value.topLevelDomainName !== "" &&
      form.value.topLevelDomainName !== null
    ) {
      const res = await api.getTenantWebConfigQueryAnalysis({
        url: form.value.topLevelDomainName,
      });
      if (res.data) {
        isAnalysis.value = res.data.success;
        form.value.isAnalysis = res.data.success;
      }
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
}

// 获取logo
const getLogo = async () => {
  fileList.value = [];
  const res = await apiLogo.getTenantLogo();
  if (res.data) {
    userStore.setLogo(res.data.logoUrl),
      fileList.value.push({
        name: "file",
        url: res?.data?.logoUrl,
      });
  }
};

// 解析记录
const record = () => {
  recordRef.value.showEdit(analyzeRecords.value);
};

// 复制地址
const copyToClipboard = (val: any) => {
  const text = val;
  toClipboard(text);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
};

// #regin 上传文件
// 请求头
const token = userStore.token;
const headers = ref({ Token: token });
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const uploadRef = ref<any>();
// 上传
const fileList = ref<any>([]);
// 删除
const handleRemove: any = async () => {
  const res = await apiLogo.deleteLogo();
  if (res.status === 1) {
    ElMessage.success({
      message: "删除成功",
      center: true,
    });
    userStore.delLogo();
  }
};
// 上传格式不正确删除
const handleBeforeRemove = (file: any, fileList: any) => {
  // 确保文件列表更新
  // 移除文件
  fileList.value = fileList.filter((item: any) => item.uid !== file.uid);
  // 返回 true 以允许移除
  return true;
};
// 上传文件是否符合
const handleFileChange = (file: any, newFileList: any) => {
  // 定义支持的文件扩展名
  const supportedFormats = [".jpg", ".jpeg", ".png"];
  const fileExtension = file.name
    .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
    .toLowerCase();
  // 检查文件扩展名是否在支持的格式中
  if (supportedFormats.includes(`.${fileExtension}`)) {
    // 直接更新文件列表
    // fileList.value = [...newFileList]; // 使用扩展运算符确保更新
  } else {
    fileList.value = []; // 清空文件列表
    // 强制 Vue 更新 UI
    nextTick(() => {
      // 确保 UI 刷新
      fileList.value = [];
    });
    return ElMessage({
      type: "warning",
      message: "上传文件类型不正确，仅支持 jpg、jpeg 和 png 格式。",
    });
  }
};

// 上传图片成功
const handleSuccess: any = (uploadFile: any, uploadFiles: any) => {
  if (uploadFile.status === -1) {
    Message.error(uploadFile.error, {
      zIndex: 2000,
    });
    // 过滤上传失败的图片
    fileList.value = fileList.value.filter(
      (item: any) => item.name !== uploadFiles.name,
    );
  } else {
    getLogo();
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

// 切换币种
const currencyTypeChange = (val: any) => {
  if (val) {
    ElMessageBox.confirm(
      `当前系统的会员存在可用余额、待审金额，若切换币种会根据当前汇率直接计算。可能会因为国际汇率的变化，存在金额精度问题，请知悉！`,
      "确认信息",
    )
      .then(() => {
        try {
          currencyType.value = val;
        } catch (error) {}
      })
      .catch(() => {});
  }
};

// 提交数据
function onSubmit() {
  if (form.value.email === "" || form.value.email === null) {
    formRules.value.email = [];
    formRef.value.clearValidate("email");
  }
  if (form.value.phone === "" || form.value.phone === null) {
    formRules.value.phone = [];
    formRef.value.clearValidate("phone");
  }
  if (form.value.qqCode === "" || form.value.qqCode === null) {
    formRules.value.qqCode = [];
    formRef.value.clearValidate("qqCode");
  }
  if (
    form.value.topLevelDomainName === "" ||
    form.value.topLevelDomainName === null
  ) {
    formRules.value.topLevelDomainName = [];
    formRef.value.clearValidate("topLevelDomainName");
  }

  if (!form.value.webName) {
    ElMessage.warning({
      message: "请输入网站名称",
      center: true,
    });
    return;
  }
  // 后端(潘) 汇率需要必填，后端直接取这个字段进行乘除
  if (!form.value.acquiesceExchangeRate) {
    ElMessage.warning({
      message: "请输入汇率",
      center: true,
    });
    return;
  }
  if (form.value.minimumAmount && !/^\d*$/.test(form.value.minimumAmount)) {
    ElMessage.warning("请输入有效的数字");
    return;
  }
  if (form.value.taxRate && !/^\d*$/.test(form.value.taxRate)) {
    ElMessage.warning("请输入有效的数字");
    return;
  }
  formRef.value &&
    formRef.value.validate(async (valid: any) => {
      if (valid) {
        try {
          loading.value = true;
          if (form.value.topLevelDomainName) {
            form.value.topLevelDomainName =
              form.value.topLevelDomainName.replace(/^https?:\/\//, "");
          }
          if (fileList.value.length) {
            uploadRef.value.submit();
          }
          if (form.value.currencyType === "USD") {
            userStore.currencyType = 1;
            if (form.value.acquiesceExchangeRate) {
              form.value.exchangeRate = form.value.acquiesceExchangeRate;
            }
          } else {
            userStore.currencyType = 2;
            if (form.value.acquiesceExchangeRate) {
              form.value.exchangeRate = form.value.acquiesceExchangeRate;
              form.value.exchangeRate =
                Math.floor((1 / form.value.exchangeRate) * 100) / 100;
            }
          }
          const res = await api.edit(form.value);
          console.log(form.value);
          loading.value = false;
          if (res.status === 1) {
            await userStore.getCurrencyType();
            getDataList();
            ElMessage.success({
              message: "修改成功",
              center: true,
            });
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          loading.value = false;
        }
      }
    });
}
const changeType = (num: any) => {
  data.value.type = num;
};
</script>

<template>
  <div v-loading="loading">
    <PageMain>
        <el-button :type="data.type == 1 ? 'primary' : ''" @click="changeType(1)"
          >基础设置
        </el-button>
        <el-button :type="data.type == 2 ? 'primary' : ''" @click="changeType(2)"
          >高级设置</el-button
        >
        <el-button :type="data.type == 3 ? 'primary' : ''" @click="changeType(3)"
          >联系我们</el-button>
        <el-tabs v-model="activeTopTab">
        <el-form
          ref="formRef"
          :model="form"
          :rules="formRules"
          label-width="150px"
          label-position="right"
          :inline="false"
        >
          <el-row :gutter="24" v-if="data.type == 1">
            <el-col :span="12">
              <el-card>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="注册开关">
                      <div class="domainNamess">
                        <el-tooltip
                          class="tooltips"
                          content="注册开关、注册审核，进行变更后，需要点击【确认】才可生效"
                          placement="top"
                        >
                          <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                        </el-tooltip>
                      </div>
                      <el-switch
                        v-model="form.registerOffOrOn"
                        active-text="开启"
                        inline-prompt
                        inactive-text="关闭"
                        :active-value="true"
                        :inactive-value="false"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="注册审核">
                      <el-switch
                        v-model="form.registerExamineOffOrOn"
                        active-text="开启"
                        inline-prompt
                        inactive-text="关闭"
                        :active-value="true"
                        :inactive-value="false"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="网站名称" prop="webName">
                      <el-input
                        v-model="form.webName"
                        style="width: 22.4375rem"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="网站关键字">
                      <div class="domainNames">
                        <el-tooltip
                          class="tooltips"
                          content="设定网站关键字，在浏览器中输入该关键字即可搜索到该网站"
                          placement="top"
                        >
                          <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                        </el-tooltip>
                      </div>
                      <el-input
                        v-model="form.keyWords"
                        style="width: 22.4375rem"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="网站描述">
                      <div class="domainName">
                        <el-tooltip
                          class="tooltips"
                          content="描述该网址功能及意义，可对外宣传使用"
                          placement="top"
                        >
                          <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                        </el-tooltip>
                      </div>
                      <el-input
                        v-model="form.description"
                        style="width: 22.4375rem"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="外包项目别名">
                      <el-input
                        v-model="form.projectOutAlias"
                        style="width: 22.4375rem"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="24" v-auth="'site_setting-update-upload'">
                    <ElFormItem
                      style="display: flex; justify-content: center"
                      label="网址Logo"
                    >
                      <el-upload
                        :class="{ hide_box: fileList.length }"
                        ref="uploadRef"
                        drag
                        v-model:file-list="fileList"
                        :headers="headers"
                        :action="Url"
                        :auto-upload="false"
                        list-type="picture-card"
                        :limit="1"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :on-change="handleFileChange"
                        :on-exceed="handleExceed"
                        :before-remove="handleBeforeRemove"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="80"
                          height="80"
                          viewBox="0 0 80 80"
                          fill="none"
                        >
                          <g id="Frame">
                            <path
                              id="Vector"
                              d="M64.2018 37.4596C64.2018 37.4596 63.7118 21.3346 50.5768 18.1296C37.4418 14.9246 31.1118 28.7646 30.9818 29.1596C30.8518 29.5546 30.2068 29.3746 30.2068 29.3746C29.1568 28.3796 24.5268 26.0946 19.6618 29.0246C14.8018 31.9546 16.5618 37.5196 16.5618 37.5196C16.5618 37.5196 9.35676 36.9346 5.66176 48.0596C1.97176 59.1946 14.9168 62.3496 14.9168 62.3496H36.6468V50.5046H32.2968H31.9168H31.6218V50.4846C31.3718 50.4846 31.1718 50.2846 31.1718 50.0296C31.1718 49.8796 31.2518 49.7496 31.3718 49.6646L40.2768 40.2996C40.4018 40.1596 40.5768 40.0646 40.7818 40.0646C40.9918 40.0646 41.1768 40.1696 41.3018 40.3246L50.1418 49.6146C50.1568 49.6246 50.1718 49.6396 50.1868 49.6546L50.2718 49.7446H50.2418C50.2868 49.8246 50.3168 49.8946 50.3168 49.9896C50.3168 50.2696 50.0918 50.4996 49.8068 50.4996C49.7968 50.4996 49.7968 50.4896 49.7868 50.4896V50.5096H44.9968V62.3546H64.7218C64.7218 62.3546 74.1268 59.9996 74.9568 50.2896C75.7968 40.5796 64.2018 37.4596 64.2018 37.4596Z"
                              fill="#409EFF"
                            />
                          </g>
                        </svg>
                        <div class="el-upload__text">支持点击拖拽上传</div>
                        <div style="color: #47a2ff" class="el-upload__text">
                          支持上传JPG/JPEG/PNG图片，小于10MB
                        </div>
                      </el-upload>

                      <el-dialog
                        v-model="dialogVisible"
                        style="
                          z-index: 1000;
                          transform: translate(0);
                          position: relative;
                        "
                      >
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                      </el-dialog>
                    </ElFormItem>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item >
                      <el-button
                        type="primary"
                        @click="onSubmit"
                        v-auth="[
                          'site_setting-insert-insertSupplierConfig',
                          'site_setting-update-updateSupplierConfig',
                        ]"
                      >
                        确认
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="默认官网域名" prop="">
                      <el-text
                        class="mx-1"
                        v-if="form.personalizedDomainName"
                        >{{ form.personalizedDomainName }}</el-text
                      >
                      <el-button
                        v-if="form.personalizedDomainName"
                        class="copy"
                        type="primary"
                        plain
                        size="small"
                        @click="copyToClipboard(form.personalizedDomainName)"
                        >复制</el-button
                      >
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="租户会员后台域名" prop="">
                      <el-text
                        class="mx-1"
                        v-if="form.personalizedDomainNameMember"
                        >{{ form.personalizedDomainNameMember }}</el-text
                      >
                      <el-button
                        v-if="form.personalizedDomainNameMember"
                        class="copy"
                        type="primary"
                        plain
                        size="small"
                        @click="
                          copyToClipboard(form.personalizedDomainNameMember)
                        "
                        >复制</el-button
                      >
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="租户供应商后台域名" prop="">
                      <el-text
                        class="mx-1"
                        v-if="form.personalizedDomainNameSupplier"
                        >{{ form.personalizedDomainNameSupplier }}</el-text
                      >
                      <el-button
                        v-if="form.personalizedDomainNameSupplier"
                        class="copy"
                        type="primary"
                        plain
                        size="small"
                        @click="
                          copyToClipboard(form.personalizedDomainNameSupplier)
                        "
                        >复制</el-button
                      >
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="租户后台域名" prop="">
                      <el-text
                        class="mx-1"
                        v-if="form.personalizedDomainNameTenant"
                        >{{ form.personalizedDomainNameTenant }}</el-text
                      >
                      <el-button
                        class="copy"
                        type="primary"
                        plain
                        v-if="form.personalizedDomainNameTenant"
                        size="small"
                        @click="
                          copyToClipboard(form.personalizedDomainNameTenant)
                        "
                        >复制</el-button
                      >
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" v-auth="'site_setting-insert-setCname'">
                    <el-form-item label="域名配置" prop="topLevelDomainName">
                      <el-text class="mx-1" v-if="form.topLevelDomainName">{{
                        form.topLevelDomainName
                      }}</el-text>
                      <div v-if="form.topLevelDomainName">
                        <div v-if="isAnalysis">
                          <span class="green"></span
                          ><span style="margin-right: 10px">已生效</span>
                        </div>
                        <div v-else>
                          <span class="red"></span
                          ><span style="margin-right: 10px">未生效</span>
                        </div>
                      </div>
                      <el-button
                        class="copy"
                        @click="record"
                        type="primary"
                        size="small"
                        plain
                        >CNAME配置</el-button
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="24" v-if="data.type == 2">
            <el-col :span="12">
              <el-card>
                <el-row :gutter="20">
                  <!-- <el-col :span="24">
                <el-form-item label="默认供应商价格比例" prop="">
                  <el-input
                    v-model.number="form.defaultPriceRatio"
                    style="width: 22.4375rem"
                    placeholder=""
                  >
                    <template #append>%</template>
                      </el-input>
                      </el-form-item>
                      </el-col> -->
                  <el-col :span="24">
                    <el-form-item label="默认币种" prop="">
                      <el-select
                        v-model="form.currencyType"
                        value-key=""
                        style="width: 22.4375rem"
                        disabled
                        placeholder="请选择币种"
                        clearable
                        filterable
                        @change="currencyTypeChange"
                      >
                        <el-option
                          v-for="item in currencyList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      style="display: flex"
                      label="美元汇率"
                      prop="acquiesceExchangeRate"
                    >
                      <div>
                        <div class="right">
                          <el-input
                            v-model="form.acquiesceExchangeRate"
                            style="width: 22.4375rem"
                            placeholder="请输入数值"
                            clearable
                          >
                            <template #prefix>
                              <!-- 自定义 SVG 图标作为前缀图标 -->
                              <el-text style="color: #333">
                                1 美元
                                (USD)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=
                              </el-text>
                            </template>

                            <template #suffix>
                              <!-- 自定义 SVG 图标作为后缀图标 -->
                              <el-text style="color: #333">
                                人民币 (CNY)
                              </el-text>
                            </template>
                          </el-input>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24"> </el-col>
                  <el-col :span="24">
                    <el-form-item label="最低结算金额" prop="">
                      <div class="domainNamesss">
                        <el-tooltip
                          class="tooltips"
                          content="针对供应商结算金额的配置"
                          placement="top"
                        >
                          <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                        </el-tooltip>
                      </div>
                      <el-input
                        v-model.number="form.minimumAmount"
                        style="width: 22.4375rem"
                        placeholder=""
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="供应商税点" prop="">
                      <el-input
                        v-model.number="form.taxRate"
                        style="width: 22.4375rem"
                        placeholder=""
                        ><template #append>%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="onSubmit"
                        v-auth="[
                          'site_setting-insert-insertSupplierConfig',
                          'site_setting-update-updateSupplierConfig',
                        ]"
                      >
                        确认
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="24" v-if="data.type == 3">
            <el-col :span="12">
              <el-card>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="电子邮箱" prop="">
                      <el-input
                        style="width: 22.4375rem"
                        v-model="form.email"
                        placeholder=""
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="手机号码" prop="">
                      <el-input
                        style="width: 22.4375rem"
                        v-model="form.phone"
                        placeholder=""
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="QQ号码" prop="">
                      <el-input
                        style="width: 22.4375rem"
                        v-model="form.qqCode"
                        placeholder=""
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="公司地址" prop="">
                      <el-input
                        style="width: 22.4375rem"
                        v-model="form.address"
                        placeholder=""
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="onSubmit"
                        v-auth="[
                          'site_setting-insert-insertSupplierConfig',
                          'site_setting-update-updateSupplierConfig',
                        ]"
                        >确认</el-button
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-form>
      </el-tabs>
    </PageMain>
    <siteDetail
      ref="recordRef"
      @fetch-data="getDataList"
      :personalizedDomainName="analyzeRecords?.personalizedDomainName"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep .el-tabs__header {
  margin: 0;
}
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: auto;
    }
  }
}

.page-main {
  .search-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    margin-bottom: -18px;

    :deep(.el-form-item) {
      grid-column: auto / span 1;

      &:last-child {
        grid-column-end: -1;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  border: none;
}

.hide_box :deep(.el-upload--picture-card) {
  display: none;
}

.green {
  margin: 0 10px;
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #74b821;
  border-radius: 50px;
}

.red {
  margin: 0 10px;
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ff8181;
  border-radius: 50px;
}

:deep {
  .el-upload-dragger {
    width: 22.4375rem;
    height: 14rem;
  }

  .el-upload {
    width: 22.4375rem;
    height: 14rem;
  }

  .el-upload--picture-card {
    border: none;
    background-color: #fff;
  }

  .el-form-item__label {
    position: relative;
  }
}

.domainName {
  position: absolute;
  left: -5.3125rem;
  top: -1px;
  color: #606266;
}

.domainNames {
  position: absolute;
  left: -6.125rem;
  top: -1px;
  color: #606266;
}

.domainNamess {
  position: absolute;
  left: -5.3125rem;
  top: -1px;
  color: #606266;
}

.domainNamesss {
  position: absolute;
  left: -6.9375rem;
  top: -1px;
  color: #606266;
}

:deep(.el-input__wrapper) {
  border: none;
}

.exchangeRate {
  display: flex;
  width: 22.4375rem;
  height: 2.25rem;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  align-items: center;
  padding: 0 1rem;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 30%;
    // border: 1px solid #c1c5cd;
    // border-radius: 4px;
    // .top {
    //   display:flex;
    //   justify-content: center;
    //   align-items: center;
    //   border-bottom: 1px solid #f2f2f2 ;
    // }
    // .bottom {
    //   display:flex;
    //   justify-content: center;
    //   align-items: center;
    //   background-color: #dddddd;
    // }
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8%;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;

    // width: 62%;
    // border: 1px solid #c1c5cd;
    // border-radius: 4px;
    // .top {
    //   display:flex;
    //   justify-content: center;
    //   align-items: center;
    //   border-bottom: 1px solid #f2f2f2;
    // }
    .bottom {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    // .right .el-input__wrapper {
    //   box-shadow: none;
    // }
  }
}

.tips {
  display: flex;
  align-items: center;
  height: 1.25rem;
  color: orange;
  font-size: 12px;
}

// :deep(.right .el-input__wrapper) {
//   box-shadow: none;
// }

:deep(.right .el-input__inner) {
  text-align: center;
}
</style>
