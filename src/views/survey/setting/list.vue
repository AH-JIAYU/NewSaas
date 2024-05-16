<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import eventBus from '@/utils/eventBus'
import api from '@/api/modules/survey_setting'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'SurveySettingList',
})

const router = useRouter()
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } = usePagination()
const tabbar = useTabbar()
const settingsStore = useSettingsStore()

const data = ref<any>({
  loading: false,
  formData: {},
  activeTopTab: '基本设置',
})

onMounted(() => {

})
const save = () => {
  console.log('提交')
}




</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <el-tabs v-model="data.activeTopTab">
        <el-form ref="formRef" label-position="left" label-width="120px" :model="data.formData" style="width: 500px;  ">
          <el-tab-pane label="基本设置" name="基本设置">
            <el-form-item label="网站名称" prop="username">
              <el-input v-model="data.formData.username" placeholder="" />
            </el-form-item>
            <el-form-item label="Keywords" prop="email">
              <el-input v-model="data.formData.email" placeholder="" />
            </el-form-item>
            <el-form-item label="网站描述" prop="phone">
              <el-input v-model="data.formData.phone" placeholder="" />
            </el-form-item>
            <el-form-item label="顶级域名" prop="bankName">
              <el-input v-model="data.formData.bankName" placeholder="" />
            </el-form-item>
            <el-form-item label="二级域名" prop="bankName">
              <el-input v-model="data.formData.bankName" placeholder="" />
            </el-form-item>
            <el-form-item label="网站备案" prop="openingBank">
              <el-input v-model="data.formData.openingBank" placeholder="" />
            </el-form-item>
            <el-form-item label="LOGO" prop="account">
              <!-- <el-input v-model="data.formData.account" placeholder="" /> -->
              <el-upload v-model:file-list="data.formData.fileList" class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :limit="3">
                <el-button type="primary">上传</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500KB.
                  </div>
                </template>
              </el-upload>
            </el-form-item>
            <el-button style="width: 100%" type="primary" @click="save">提交</el-button>
          </el-tab-pane>
          <el-tab-pane label="高级设置" name="高级设置">
            <el-form-item label="注册开关" prop="originalPassword">
              <el-switch v-model="data.formData.value2" class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
            </el-form-item>
            <el-form-item label="注册审核" prop="newPassword">
              <el-switch v-model="data.formData.value2" class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
            </el-form-item>
            <el-form-item label="会员推荐" prop="confirmPassword">
              <el-switch v-model="data.formData.value2" class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
            </el-form-item>
            <el-form-item label="价格比例设置(高)" prop="confirmPassword">
              <el-input v-model="data.formData.confirmPassword" placeholder="" />
            </el-form-item>
            <el-form-item label="价格比例设置(低)" prop="confirmPassword">
              <el-input v-model="data.formData.confirmPassword" placeholder="" />
            </el-form-item>
            <el-form-item label="推荐提成" prop="confirmPassword">
              <el-input v-model="data.formData.confirmPassword" placeholder="" />
            </el-form-item>
            <el-form-item label="提现方式" prop="confirmPassword">
              <el-radio-group v-model="data.formData.radio1" class="ml-4">
                <el-radio value="1" size="large">手动提现</el-radio>
                <el-radio value="2" size="large">生成账单</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="提款方式" prop="confirmPassword">
              <el-radio-group v-model="data.formData.radio2" class="ml-4">
                <el-radio value="1" size="large">审核</el-radio>
                <el-radio value="2" size="large">免审</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="抵扣税点" prop="confirmPassword">
              <el-input v-model="data.formData.confirmPassword" placeholder="" />
            </el-form-item>
            <el-form-item label="调查限价" prop="confirmPassword">
              <el-input v-model="data.formData.confirmPassword" placeholder="" />
            </el-form-item>
            <el-form-item label="负责人UID" prop="confirmPassword">
              <el-input v-model="data.formData.confirmPassword" placeholder="" />
            </el-form-item>
            <el-button style="width: 100%" type="primary" @click="save">提交</el-button>
          </el-tab-pane>
          <el-tab-pane label="联系我们" name="联系我们">
            <el-form-item label="Email" prop="originalPassword">
              <el-input v-model="data.formData.originalPassword" placeholder="" />
            </el-form-item>
            <el-form-item label="Phone" prop="newPassword">
              <el-input v-model="data.formData.newPassword" placeholder="" />
            </el-form-item>
            <el-form-item label="QQ" prop="confirmPassword">
              <el-input v-model="data.formData.confirmPassword" placeholder="" />
            </el-form-item>
            <el-form-item label="公司地址" prop="confirmPassword">
              <el-input v-model="data.formData.confirmPassword" placeholder="" />
            </el-form-item>
              <el-button style="width: 100%" type="primary" @click="save">提交</el-button>
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
