<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import api from "@/api/modules/survey_site_setting";
import useClipboard from "vue-clipboard3";
import { onMounted, ref } from "vue";
defineOptions({
  name: "setting",
});

const { toClipboard } = useClipboard();
const activeTopTab = ref<any>("基本设置");
// 加载
const loading = ref(false);
// 会员基准地址
// const webSiteUrl = import.meta.env.VITE_APP_WEBSITE;
// form ref
const formRef = ref<FormInstance>();
// 定义表单
const form = ref<any>({
  // 网站名称
  webName: "",
  // 关键字
  keyWords: "",
  // 会员网址
  // memberURL: "",
  // 是否开启注册,默认为true
  registerOffOrOn: true,
  // 是否开启注册审核,默认为false
  registerExamineOffOrOn: false,
  // 默认会员价格比例 %
  priceProportion: null,
  // 代扣会员税点
  taxPointsProportion: null,
  // 最低结算金额
  minimumAmount: null,
  // 调查限价
  fixedPrice: null,
  //	外部站点
  externalSite: "",
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
  memberURL: [{ required: true, message: "请输入会员网址", trigger: "blur" }],
  phone: [
    { required: false, trigger: "blur", message: "请输入手机号" },
    { validator: validatePhone, trigger: "blur" },
  ],
  email: [
    { required: false, trigger: "blur", message: "请输入邮箱" },
    { validator: validateEmail, trigger: "blur" },
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
  const text = `${form.value.memberURL}.front-saas-web.surveyssaas.com`;
  toClipboard(text);
  ElMessage({
    type: "success",
    message: "复制成功",
  });
};
// 联系我们
function onSubmit() {
  // 新增
  if (!form.value.id) {
    // 校验
    formRef.value &&
      formRef.value.validate((valid) => {
        if (valid) {
          try {
            loading.value = true;
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
      formRef.value.validate((valid) => {
        if (valid) {
          try {
            let {
              id,
              keyWords,
              registerExamineOffOrOn,
              registerOffOrOn,
              webName,
              priceProportion,
              taxPointsProportion,
              minimumAmount,
              fixedPrice,
              externalSite,
              phone,
              email,
              qqCode,
              address,
            } = form.value;
            //  memberURL,
            const params = {
              id,
              keyWords,
              registerExamineOffOrOn,
              registerOffOrOn,
              webName,
              priceProportion,
              taxPointsProportion,
              minimumAmount,
              fixedPrice,
              externalSite,
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
    <PageMain>
      <el-tabs v-model="activeTopTab" type="border-card">
        <el-form ref="formRef" :model="form" :rules="formRules" label-position="right" label-width="140px"
          style="width: 500px">
          <el-tab-pane label="基础设置" name="基本设置">
            <el-row :gutter="20">
              <el-col :span="7">
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
                <el-form-item label="最低结算金额" prop="confirmPassword">
                  <el-input v-model.number="form.minimumAmount" style="width: 18rem" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="会员税点" prop="confirmPassword">
                  <el-input v-model.number="form.taxPointsProportion" style="width: 18rem" placeholder=""><template
                      #append>%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="调查限价" prop="confirmPassword">
                  <el-input v-model.number="form.fixedPrice" style="width: 18rem" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-form-item prop="webName" label="网站名称">
              <el-input v-model="form.webName" style="width: 18rem" />
            </el-form-item>
            <el-form-item label="keyWords">
              <el-input v-model="form.keyWords" style="width: 18rem" />
            </el-form-item> -->
            <!-- <el-form-item
              style="width: 34rem"
              label="个性化域名"
              prop="memberURL"
            >
            <el-input v-model="form.memberURL" style="width: 8rem" />
                  <el-text class="mx-1"
                    >.front-saas-web.surveyssaas.com</el-text
                  >
                  <el-button class="copy" type="primary" link @click="copyToClipboard"
                    >复制</el-button>
            </el-form-item>
            <el-form-item style="width: 34rem" label="站点系统域名">
              <el-input v-model="form.externalSite" />
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="onSubmit"> 确认 </el-button>
            </el-form-item>
          </el-tab-pane>
          <!-- <el-tab-pane label="高级设置" name="高级设置">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="默认会员价格比例" prop="confirmPassword">
                  <el-input
                    v-model.number="form.priceProportion"
                    style="width: 18rem"
                    placeholder=""
                    ><template #append>%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="最低结算金额" prop="confirmPassword">
                  <el-input
                    v-model.number="form.minimumAmount"
                    style="width: 18rem"
                    placeholder=""
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="会员税点" prop="confirmPassword">
                  <el-input
                    v-model.number="form.taxPointsProportion"
                    style="width: 18rem"
                    placeholder=""
                    ><template #append>%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="调查限价" prop="confirmPassword">
                  <el-input
                    v-model.number="form.fixedPrice"
                    style="width: 18rem"
                    placeholder=""
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit"> 确认 </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane> -->

          <el-tab-pane label="联系我们" name="联系我们">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="电子邮箱" prop="">
                  <el-input style="width: 18rem" v-model="form.email" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="手机号码" prop="">
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
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
    margin-inline: -20px;
    width: calc(100% + 40px);
  }
}

:deep() {
  background-color: #fafafa;
}
</style>
