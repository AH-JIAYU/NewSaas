<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, ref } from "vue";
import api from "@/api/modules/configuration_site_setting";
import useClipboard from "vue-clipboard3";
import { AnyFn } from "@vueuse/core";

defineOptions({
  name: "site_setting",
});

const { toClipboard } = useClipboard();
const activeTopTab = ref<any>("基本设置");
// 加载
const loading = ref(false);
// 供应商基准地址
// const supplierUrl = import.meta.env.VITE_APP_SUPPLIER;
// form ref
const formRef = ref<any>();
// 定义表单
const form = ref<any>({
  id: "",
  // 注册开关
  registerOffOrOn: true,
  // 注册审核
  registerExamineOffOrOn: false,
  // keyWords
  keyWords: "",
  // 网站名称
  webName: "",
  // 供应商网址
  supplierURL: "",
  // 设置顶级域名
  externalSite: "",
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
// 校验
const formRules = ref<FormRules>({
  webName: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
  supplierURL: [
    { required: true, message: "请输入供应商网址", trigger: "blur" },
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
  getDataList();
});
// 获取数据
async function getDataList() {
  try {
    loading.value = true;
    const { data } = await api.list();
    form.value = data || form.value;
    loading.value = false;
  } catch (error) {

  } finally {
    loading.value = false;
  }
}
// 复制地址
const copyToClipboard = () => {
  const text = `${form.value.supplierURL}.front-supplier.surveyssaas.com`;
  toClipboard(text);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
};
// 提交数据
function onSubmit() {
  if (form.value.email === '') {
    formRules.value.email = []
    formRef.value.clearValidate('email');
  }
  if (form.value.phone === '') {
    formRules.value.phone = []
    formRef.value.clearValidate('phone');
  }
  // 新增
  if (form.value.id === "") {
    // 校验
    formRef.value &&
      formRef.value.validate((valid: any) => {
        if (valid) {
          try {
            loading.value = true;
            delete form.value.id;
            api.create(form.value).then(() => {
              loading.value = false;
              getDataList();
              ElMessage.success({
                message: "新增成功",
                center: true,
              });
            });
          } catch (error) {

          } finally {
            loading.value = false;
          }
        }
      });
  } else {
    // 修改
    formRef.value &&
      formRef.value.validate((valid: any) => {
        if (valid) {
          try {
            let {
              id,
              keyWords,
              registerExamineOffOrOn,
              registerOffOrOn,
              supplierURL,
              webName,
              externalSite,
              defaultPriceRatio,
              taxRate,
              minimumAmount,
              phone,
              email,
              qqCode,
              address,
            } = form.value;
            const params = {
              id,
              keyWords,
              registerExamineOffOrOn,
              registerOffOrOn,
              supplierURL,
              webName,
              externalSite,
              defaultPriceRatio,
              taxRate,
              minimumAmount,
              phone,
              email,
              qqCode,
              address,
            };
            loading.value = true;
            api.edit(params).then((res: any) => {
              loading.value = false;
              if (res.status === 1) {
                getDataList();
                ElMessage.success({
                  message: "修改成功",
                  center: true,
                });
              }
            });
          } catch (error) {
          } finally {
            loading.value = false;
          }
        }
      });
  }
}
</script>

<template>
  <div v-loading="loading">
    <PageHeader title="站点设置管理" />
    <PageMain>
      <el-tabs v-model="activeTopTab" type="border-card">
        <el-form ref="formRef" :model="form" :rules="formRules" label-width="100px" label-position="right"
          :inline="false">
          <el-tab-pane label="基础设置" name="基本设置">
            <el-row :gutter="20">
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
                <el-form-item label="keyWords">
                  <el-input v-model="form.keyWords" style="width: 18rem" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="个性化域名" prop="supplierURL">
                  <el-input v-model="form.supplierURL" style="width: 8rem" />
                  <el-text class="mx-1">.front-supplier.surveyssaas.com</el-text>
                  <el-button class="copy" type="primary" link @click="copyToClipboard">复制</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="顶级域名" >
                  <el-input v-model="form.externalSite" style="width: 8rem" />
                  <!-- <el-button class="copy" type="primary" link >设置解析</el-button> -->
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
                  <el-button type="primary" @click="onSubmit"> 确认 </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-form>
      </el-tabs>
    </PageMain>
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

  .el-divider {
    width: calc(100% + 40px);
    margin-inline: -20px;
  }
}

:deep() {
  background-color: #fafafa;
}
</style>
