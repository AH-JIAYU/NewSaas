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

defineOptions({
  name: "site_setting",
});
// token
const userStore = useUserStore();
// detailRef
const recordRef = ref()
// 接口地址
const Url = import.meta.env.VITE_APP_API_BASEURL + "/tenant-logo/upload";
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
    { required: false, message: "请输入顶级域名", trigger: "submit" },
    { validator: validateTopLevelDomainName, trigger: "submit" },
  ],
  phone: [
    { required: false, trigger: "submit", message: "请输入手机号" },
    { validator: validatePhone, trigger: "submit" },
  ],
  email: [
    { required: false, trigger: "submit", message: "请输入邮箱" },
    { validator: validateEmail, trigger: "submit" },
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
    if (data) {
      form.value = data || form.value;
      analyzeRecords.value = form.value
      userStore.setWebName(data.webName)
    }
    if (form.value.topLevelDomainName !== '' && form.value.topLevelDomainName !== null) {
      const res = await api.getTenantWebConfigQueryAnalysis({ url: form.value.topLevelDomainName })
      isAnalysis.value = res.data.success
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
  // }
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
              <el-col :span="24">
                <ElFormItem style="
                display: flex;
                justify-content: center;
                align-items: center;
              " label="网址Logo">
                  <el-upload :class="{ hide_box: fileList.length }" v-model:file-list="fileList" :headers="headers"
                    :action="Url" list-type="picture-card" :limit="1" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :on-success="handleSuccess" :on-exceed="handleExceed">
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
              </el-col>
              <el-col :span="3">
                <el-form-item label="注册开关">
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
                  <el-input v-model="form.webName" style="width: 18rem" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="网站关键字">
                  <el-input v-model="form.keyWords" style="width: 18rem" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="网站描述">
                  <el-input v-model="form.description" style="width: 18rem" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="个性化域名" prop="">
                  <!-- <el-input v-model="form.personalizedDomainName" style="width: 8rem" /> -->
                  <el-text class="mx-1">{{ form.personalizedDomainName }}</el-text>
                  <el-button class="copy" type="primary" link @click="copyToClipboard">复制</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="顶级域名" prop="topLevelDomainName">
                  <el-text style="min-width: 11rem" >{{form.topLevelDomainName}}</el-text>
                  <div v-if="isAnalysis">
                    <span class="red"></span><span style="margin-right: 10px;">已生效</span>
                  </div>
                  <div v-else>
                    <span class="green"></span><span style="margin-right: 10px;">未生效</span>
                  </div>
                  <el-button class="copy" @click="record" type="primary" link>CNAME配置</el-button>
                </el-form-item>
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
                    style="width: 18rem"
                    placeholder=""
                  >
                    <template #append>%</template>
</el-input>
</el-form-item>
</el-col> -->
              <el-col :span="24">
                <el-form-item label="最低结算金额" prop="">
                  <el-input v-model.number="form.minimumAmount" style="width: 18rem" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="供应商税点" prop="">
                  <el-input v-model.number="form.taxRate" style="width: 18rem" placeholder=""><template
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
                  <el-input style="width: 18rem" v-model="form.email" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="手机号码" prop="phone">
                  <el-input style="width: 18rem" v-model="form.phone" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="QQ号码" prop="">
                  <el-input style="width: 18rem" v-model="form.qqCode" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="公司地址" prop="">
                  <el-input style="width: 18rem" v-model="form.address" placeholder="" />
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
    <siteDetail ref="recordRef" @fetch-data="getDataList" />
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

// :deep() {
//   background-color: #fafafa;
// }
</style>
