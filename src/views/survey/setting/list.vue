<script setup lang="ts">
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
const form = ref({
  register: true,
  registerExamine: false,
  keyWords: '',
  webName: '',
  supplierURL: '',
})
onMounted(() => {

})
function save() {
  console.log('提交')
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageMain>
      <el-tabs v-model="data.activeTopTab">
        <el-form ref="formRef" label-position="right" label-width="130px" :model="data.formData" style="width: 500px;  ">
          <el-tab-pane label="基本设置" name="基本设置">
            <el-form-item label="网站名称">
              <el-input v-model="form.webName" style="width: 18rem;" />
            </el-form-item>
            <el-form-item label="keyWords">
              <el-input v-model="form.keyWords" style="width: 18rem;" />
            </el-form-item>
            <el-form-item label="会员网址">
              <el-input v-model="form.supplierURL" style="width: 18rem;" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">
                确认
              </el-button>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="高级设置" name="高级设置">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="注册开关">
                  <el-switch v-model="form.register" :active-value="1" :inactive-value="2" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="注册审核">
                  <el-switch v-model="form.registerExamine" :active-value="1" :inactive-value="2" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="默认会员价格比例" prop="confirmPassword">
              <el-input v-model="data.formData.confirmPassword" placeholder="" />
            </el-form-item>
            <el-form-item label="抵扣税点" prop="confirmPassword">
              <el-input v-model="data.formData.confirmPassword" placeholder="" />
            </el-form-item>
            <el-form-item label="提现方式" prop="confirmPassword">
              <el-radio-group v-model="data.formData.radio1" class="ml-4">
                <el-radio value="1" size="large">
                  手动提现
                </el-radio>
                <el-radio value="2" size="large">
                  生成账单
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">
                确认
              </el-button>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="联系我们" name="联系我们">
            <el-form-item label="电子邮箱" prop="originalPassword">
              <el-input v-model="form.keyWords" placeholder="" />
            </el-form-item>
            <el-form-item label="手机号码" prop="newPassword">
              <el-input v-model="form.keyWords" placeholder="" />
            </el-form-item>
            <el-form-item label="QQ号码" prop="confirmPassword">
              <el-input v-model="form.keyWords" placeholder="" />
            </el-form-item>
            <el-form-item label="公司地址" prop="confirmPassword">
              <el-input v-model="form.keyWords" placeholder="" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">
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
