<script setup lang="ts">
import type { FormInstance, FormRules, UploadProps } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import api from "@/api/modules/configuration_site_setting";
import apiLogo from "@/api/modules/logo";
import Message from 'vue-m-message'
import useClipboard from "vue-clipboard3";
import { AnyFn } from "@vueuse/core";
import useUserStore from "@/store/modules/user";
import siteDetail from "./components/siteDetail/index.vue"
import useConfigurationSiteSettingStore from '@/store/modules/configuration_siteSetting'//站点设置

defineOptions({
  name: "site_setting",
});

const configurationSiteSettingStore = useConfigurationSiteSettingStore()//站点设置
// token
const userStore = useUserStore();
// detailRef
const recordRef = ref()
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
});
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
  const domainPattern = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(?:\.[A-Za-z0-9-]{1,63}(?<!-))*\.[A-Za-z]{2,}$/;
  if (domainPattern.test(value)) {
    callback(); // 验证通过
  } else {
    callback(new Error('请输入合法的域名')); // 验证失败
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
    { required: false, message: '请输入内容', trigger: 'blur' },
    { max: 50, message: '最多输入 50 字', trigger: 'blur' }
  ],
});
onMounted(() => {
  loading.value = true;
  userStore.logo && (fileList.value = [{ name: 'logo', url: userStore.logo }])
  getDataList();
  loading.value = false;
});
// 获取数据
async function getDataList() {
  try {
    const { data } = await api.list();
    configurationSiteSettingStore.setSiteConfig(data)
    if (data) {
      form.value = data || form.value;
      analyzeRecords.value = form.value
      userStore.setWebName(data.webName)
      userStore.setDescription(data.description)
      userStore.setkeyWords(data.keyWords)
    }
    if (form.value.topLevelDomainName !== '' && form.value.topLevelDomainName !== null) {
      const res = await api.getTenantWebConfigQueryAnalysis({ url: form.value.topLevelDomainName })
      isAnalysis.value = res.data.success
      form.value.isAnalysis = res.data.success
    }
  } catch (error) {

  } finally {
    loading.value = false;
  }
}
// 获取logo
const getLogo = async () => {
  fileList.value = []
  const res = await apiLogo.getTenantLogo();
  if (res.data) {
    userStore.setLogo(res.data.logoUrl),
      fileList.value.push({
        name: "file",
        url: res?.data?.logoUrl,
      });
  }
}
// 解析记录
const record = () => {
  recordRef.value.showEdit(analyzeRecords.value)
}
// 复制地址
const copyToClipboard = () => {
  const text = form.value.personalizedDomainName;
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
const uploadRef = ref<any>()
// 上传
const fileList = ref<any>([]);
// 删除
const handleRemove: any = async () => {
  ElMessage.success({
    message: "删除成功",
    center: true,
  });
  userStore.delLogo()
};
// 上传格式不正确删除
const handleBeforeRemove = (file:any, fileList:any) => {
  // 确保文件列表更新
  fileList.value = fileList.filter((item:any) => item.uid !== file.uid); // 移除文件
  return true; // 返回 true 以允许移除
};
// 上传文件是否符合
const handleFileChange = (file: any, newFileList: any) => {
  // 定义支持的文件扩展名
  const supportedFormats = ['.jpg', '.jpeg', '.png'];
  const fileExtension = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
  // 检查文件扩展名是否在支持的格式中
  if (supportedFormats.includes(`.${fileExtension}`)) {
    // 直接更新文件列表
    // fileList.value = [...newFileList]; // 使用扩展运算符确保更新
  } else {
    fileList.value = []; // 清空文件列表
    // 强制 Vue 更新 UI
    nextTick(() => {
      fileList.value = []; // 确保 UI 刷新
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
    })
    // 过滤上传失败的图片
    fileList.value = fileList.value.filter((item: any) => item.name !== uploadFiles.name)
  } else {
    getLogo()
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
// 提交数据
function onSubmit() {
  if (form.value.email === '' || form.value.email === null) {
    formRules.value.email = []
    formRef.value.clearValidate('email');
  }
  if (form.value.phone === '' || form.value.phone === null) {
    formRules.value.phone = []
    formRef.value.clearValidate('phone');
  }
  if (form.value.qqCode === '' || form.value.qqCode === null) {
    formRules.value.qqCode = []
    formRef.value.clearValidate('qqCode');
  }
  if (form.value.topLevelDomainName === '' || form.value.topLevelDomainName === null) {
    formRules.value.topLevelDomainName = []
    formRef.value.clearValidate('topLevelDomainName');
  }
  formRef.value &&
    formRef.value.validate(async (valid: any) => {
      if (valid) {
        try {
          loading.value = true;
          if (form.value.topLevelDomainName) {
            form.value.topLevelDomainName = form.value.topLevelDomainName.replace(/^https?:\/\//, '');
          }
          if (fileList.value.length) {
            uploadRef.value.submit();
          }
          const res = await api.edit(form.value)
          loading.value = false;
          if (res.status === 1) {
            getDataList();
            ElMessage.success({
              message: "修改成功",
              center: true,
            });
          }
        } catch (error) {
          console.log('error', error)
        } finally {
          loading.value = false;
        }
      }
    });
}
</script>

<template>
  <div v-loading="loading">
    <PageHeader title="站点设置管理" />
    <PageMain>
      <el-tabs v-model="activeTopTab">
        <el-form ref="formRef" :model="form" :rules="formRules" label-width="100px" label-position="right"
          :inline="false">
          <el-tab-pane label="基础设置" name="基本设置">
            <el-row :gutter="20">
              <el-col :span="3">
                <el-form-item label="注册开关">
                  <div class="domainNamess">
                    <el-tooltip class="tooltips " content="注册开关、注册审核，进行变更后，需要点击【确认】才可生效" placement="top">
                      <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                    </el-tooltip>
                  </div>
                  <el-switch v-model="form.registerOffOrOn" active-text="开启" inline-prompt inactive-text="关闭"
                    :active-value="true" :inactive-value="false" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="注册审核">
                  <el-switch v-model="form.registerExamineOffOrOn" active-text="开启" inline-prompt inactive-text="关闭"
                    :active-value="true" :inactive-value="false" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="网站名称" prop="webName">
                  <el-input v-model="form.webName" style="width: 22.4375rem" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="网站关键字">
                  <div class="domainNames">
                    <el-tooltip class="tooltips " content="设定网站关键字，在浏览器中输入该关键字即可搜索到该网站" placement="top">
                      <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                    </el-tooltip>
                  </div>
                  <el-input v-model="form.keyWords" style="width: 22.4375rem" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="网站描述">
                  <div class="domainName">
                    <el-tooltip class="tooltips " content="描述该网址功能及意义，可对外宣传使用" placement="top">
                      <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
                    </el-tooltip>
                  </div>
                  <el-input v-model="form.description" style="width: 22.4375rem" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="默认官网域名" prop="">
                  <el-text class="mx-1">{{ form.personalizedDomainName }}</el-text>
                  <el-button class="copy" type="primary" plain size="small" @click="copyToClipboard">复制</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="域名配置" prop="topLevelDomainName">
                  <el-text class="mx-1">{{ form.topLevelDomainName }}</el-text>
                  <div v-if="form.topLevelDomainName">
                    <div v-if="isAnalysis">
                      <span class="green"></span><span style="margin-right: 10px;">已生效</span>
                    </div>
                    <div v-else>
                      <span class="red"></span><span style="margin-right: 10px;">未生效</span>
                    </div>
                  </div>
                  <el-button class="copy" @click="record" type="primary" size="small" plain>CNAME配置</el-button>
                </el-form-item>
              </el-col>
              <el-col style="margin-bottom: 1rem;" :span="24"><span
                  style="margin-left: 1.625rem; color: #606266; font-size: 14px;">网址Logo</span></el-col>
              <el-col :span="24">
                <ElFormItem style="
                display: flex;
                justify-content: center;
                align-items: center;
              " label="">
                  <el-upload :class="{ hide_box: fileList.length }" ref="uploadRef" drag v-model:file-list="fileList"
                    :headers="headers" :action="Url" :auto-upload="false" list-type="picture-card" :limit="1"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess"
                    :on-change="handleFileChange" :on-exceed="handleExceed" :before-remove="handleBeforeRemove">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <g id="Frame">
                        <path id="Vector"
                          d="M64.2018 37.4596C64.2018 37.4596 63.7118 21.3346 50.5768 18.1296C37.4418 14.9246 31.1118 28.7646 30.9818 29.1596C30.8518 29.5546 30.2068 29.3746 30.2068 29.3746C29.1568 28.3796 24.5268 26.0946 19.6618 29.0246C14.8018 31.9546 16.5618 37.5196 16.5618 37.5196C16.5618 37.5196 9.35676 36.9346 5.66176 48.0596C1.97176 59.1946 14.9168 62.3496 14.9168 62.3496H36.6468V50.5046H32.2968H31.9168H31.6218V50.4846C31.3718 50.4846 31.1718 50.2846 31.1718 50.0296C31.1718 49.8796 31.2518 49.7496 31.3718 49.6646L40.2768 40.2996C40.4018 40.1596 40.5768 40.0646 40.7818 40.0646C40.9918 40.0646 41.1768 40.1696 41.3018 40.3246L50.1418 49.6146C50.1568 49.6246 50.1718 49.6396 50.1868 49.6546L50.2718 49.7446H50.2418C50.2868 49.8246 50.3168 49.8946 50.3168 49.9896C50.3168 50.2696 50.0918 50.4996 49.8068 50.4996C49.7968 50.4996 49.7968 50.4896 49.7868 50.4896V50.5096H44.9968V62.3546H64.7218C64.7218 62.3546 74.1268 59.9996 74.9568 50.2896C75.7968 40.5796 64.2018 37.4596 64.2018 37.4596Z"
                          fill="#409EFF" />
                      </g>
                    </svg>
                    <div class="el-upload__text">
                      支持点击拖拽上传
                    </div>
                    <div style="color:#47a2ff;" class="el-upload__text">
                      支持上传JPG/JPEG/PNG图片，小于10MB
                    </div>
                  </el-upload>

                  <el-dialog v-model="dialogVisible" style="
                  z-index: 1000;
                  transform: translate(0);
                  position: relative;
                ">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                  </el-dialog>
                </ElFormItem>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit"> 确认 </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="高级设置" name="高级设置">
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
                <el-form-item label="最低结算金额" prop="">
                  <el-input v-model.number="form.minimumAmount" style="width: 22.4375rem" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="供应商税点" prop="">
                  <el-input v-model.number="form.taxRate" style="width: 22.4375rem" placeholder=""><template
                      #append>%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit"> 确认 </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="联系我们" name="联系我们">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="电子邮箱" prop="email">
                  <el-input style="width: 22.4375rem" v-model="form.email" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="手机号码" prop="phone">
                  <el-input style="width: 22.4375rem" v-model="form.phone" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="QQ号码" prop="qqCode">
                  <el-input style="width: 22.4375rem" v-model="form.qqCode" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="公司地址" prop="address">
                  <el-input style="width: 22.4375rem" v-model="form.address" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">确认</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-form>
      </el-tabs>
    </PageMain>
    <siteDetail ref="recordRef" @fetch-data="getDataList" :personalizedDomainName="analyzeRecords?.personalizedDomainName" />
  </div>
</template>

<style lang="scss" scoped>
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

// :deep() {
//   background-color: #fafafa;
// }
</style>
