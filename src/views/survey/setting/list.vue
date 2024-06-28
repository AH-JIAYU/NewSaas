<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import api from "@/api/modules/survey_site_setting";
defineOptions({
  name: 'SurveySettingList',
})

const activeTopTab = ref<any>('基本设置')
// 加载
const loading = ref(false);
// 会员基准地址
const webSiteUrl = import.meta.env.VITE_APP_WEBSITE
// form ref
const formRef = ref<FormInstance>();
// 定义表单
const form = ref<any>({
  // 网站名称
  webName: '',
  // 关键字
  keyWords: '',
  // 会员网址
  memberURL: '',
  // 是否开启注册,默认为true
  registerOffOrOn: true,
  // 是否开启注册审核,默认为false
  registerExamineOffOrOn: false,
  // 会员价格比例 %
  priceProportion: null,
  // 提现方式
  withdrawalMethod: 1,
  // 代扣税点
  taxPointsProportion: null,
})
// 校验
const formRules = ref<FormRules>({
  webName: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
  memberURL: [
    { required: true, message: "请输入供应商网址", trigger: "blur" },
  ],
});
onMounted(() => {
  getDataList()
})
// 获取数据
async function getDataList() {
  loading.value = true
  const { data } = await api.list()
  // const url = data.supplierURL
  // const extracted = url.match(/jiayu\.com/)[0];
  form.value = data || form.value
  // form.value.supplierURL = extracted
  loading.value = false
}
// 复制地址
const copyUrl = async () => {
  const str = `http://${form.value.memberURL}.${webSiteUrl}`
  try {
    await navigator.clipboard.writeText(str);
    ElMessage.success({
      message: '复制成功',
      center: true,
    })
  } catch (error) {
    console.error(error);
  }
}
// 提交数据
function onSubmit() {
  // 新增
  if (!form.value.id) {
    // 校验
    formRef.value &&
      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          console.log('form.value',form.value);
          api.create(form.value).then(() => {
            loading.value = false;
            getDataList();
            ElMessage.success({
              message: "新增成功",
              center: true,
            });
          });
        }
      });
  } else {
    // 修改
    formRef.value && formRef.value.validate((valid) => {
      if (valid) {
        let { id, keyWords, registerExamineOffOrOn, registerOffOrOn, memberURL, webName,priceProportion,withdrawalMethod,taxPointsProportion } = form.value
        const params = { id, keyWords, registerExamineOffOrOn, registerOffOrOn, memberURL, webName,priceProportion,withdrawalMethod,taxPointsProportion }
        loading.value = true
        api.edit(params).then(() => {
          loading.value = false
          getDataList()
          ElMessage.success({
            message: '修改成功',
            center: true,
          })
        })
      }
    })
  }
}
</script>

<template>
  <div v-loading="loading">
    <PageMain>
      <el-tabs v-model="activeTopTab">
        <el-form ref="formRef" :model="form" :rules="formRules" label-position="right" label-width="130px"
          style="width: 500px; ">
          <el-tab-pane label="基本设置" name="基本设置">
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
            </el-row>
            <el-form-item  prop="webName" label="网站名称">
              <el-input v-model="form.webName" style="width: 18rem;" />
            </el-form-item>
            <el-form-item label="keyWords">
              <el-input v-model="form.keyWords" style="width: 18rem;" />
            </el-form-item>
            <el-form-item style="width: 33rem;" label="会员网址" prop="memberURL">
              <el-input v-model="form.memberURL" style="width: 8rem;" />
              <el-text class="mx-1">{{ webSiteUrl }}</el-text>
              <el-button type="primary" link @click="copyUrl">复制</el-button>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="高级设置" name="高级设置">
            <el-form-item label="默认会员价格比例" prop="confirmPassword">
              <el-input v-model.number="form.priceProportion" style="width: 18rem;" placeholder="" />
            </el-form-item>
            <el-form-item label="抵扣税点" prop="confirmPassword">
              <el-input v-model.number="form.taxPointsProportion" style="width: 18rem;" placeholder="" />
            </el-form-item>
            <el-form-item label="提现方式" prop="confirmPassword">
              <el-radio-group v-model="form.withdrawalMethod" class="ml-4">
                <el-radio :value="1" size="large">
                  手动提现
                </el-radio>
                <el-radio :value="2" size="large">
                  生成账单
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">
                确认
              </el-button>
            </el-form-item>
          </el-tab-pane>
        </el-form>
        <el-form>
          <el-tab-pane label="联系我们" name="联系我们">
            <el-form-item label="电子邮箱" prop="originalPassword">
              <el-input style="width: 18rem;" v-model="form.keyWords" placeholder="" />
            </el-form-item>
            <el-form-item label="手机号码" prop="newPassword">
              <el-input style="width: 18rem;" v-model="form.keyWords" placeholder="" />
            </el-form-item>
            <el-form-item label="QQ号码" prop="confirmPassword">
              <el-input style="width: 18rem;" v-model="form.keyWords" placeholder="" />
            </el-form-item>
            <el-form-item label="公司地址" prop="confirmPassword">
              <el-input style="width: 18rem;" v-model="form.keyWords" placeholder="" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" >
                确认
              </el-button>
            </el-form-item>
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
</style>
