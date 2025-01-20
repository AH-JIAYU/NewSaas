<script lang="ts" setup>
import { ElForm } from "element-plus";
import { defineProps, ref } from "vue";
import api from "@/api/modules/user_customer";
import DictionaryItemDia from "@/views/configuration/user/components/dictionaryItemDialog/index.vue";
import apiUser from '@/api/modules/configuration_manager'
import apiPos from "@/api/modules/position_manage";
import useConfigurationSiteSettingStore from '@/store/modules/configuration_siteSetting'//站点设置
import storage from "@/utils/storage";
import { useI18n } from "vue-i18n";
const configurationSiteSettingStore = useConfigurationSiteSettingStore()//站点设置
// 如果希望默认展示第一个 Tab
const props = defineProps({
  leftTab: Object,
  tabIndex: Number,
});
const redirectUrl = ref<any>()
const serverSideUrl = ref<any>(`${import.meta.env.VITE_APP_API_BASEURL}/api`)
// 国际化
const { t } = useI18n();
// 用户数据
const staffList = ref<any>([]);
const validate = inject<any>("validateTopTabs"); //注入Ref
const rules = reactive<any>({
  customerAccord: [
    { required: true, message: "请输入客户名称", trigger: "blur" },
    { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
  ],
  customerShortName: [
    { required: true, message: "请输入客户简称", trigger: "blur" },
    { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
  ],
  chargeId: [
    { required: true, message: "请选择负责人", trigger: "change" },
  ],
  rateAudit: [
    { required: true, message: "请输入审核率Min值", trigger: "blur" },
    { pattern: /^[1-9]\d*$/, message: "请输入有效的正整数", trigger: "blur" },
    // 其他校验规则
  ],
  turnover: [
    { required: true, message: "请输入营业限额/月", trigger: "blur" },
    { pattern: /^[1-9]\d*$/, message: "请输入有效的正整数", trigger: "blur" },
    // 其他校验规则
  ],

});
const radio1 = ref<any>('all')
const positionList = ref<any>([])
// 查询参数
const queryForm = reactive<any>({
  // 分页页码
  page: 1,
  // 每页数量
  limit: 10,
  id: null,
  // 职位名称
  name: "",
  // 是否启用 1启用 2停用
  active: null,
});
const queryUserForm = reactive<any>({
  page: 1,
  limit: 10,
  id: "",
  userName: "",
  active: null,
  departmentId: null,
  positionId: null,
});
const activeName = ref("basicSettings");
const isEncryption = ref(false);
const secretKeyConfigList = ref<any>([]);
const dictionaryItemVisible = ref<any>(false) // PM组件显隐

const changeConfigInfoList = (val: any) => {
  if (val) {
    localToptTab.value.tenantCustomerConfigInfoList.push({
      callbackWay: 1, //	回调方式:1:服务端回调 2:重定向回调
      isEncryption: 2, //	是否加密:1:加密 2:不加密
      encryptionId: "", //总控配置加密方式主键(外键)-是否加密为是有值
      secretKey: "", //
    });
  } else {
    const findDataIndex =
      localToptTab.value.tenantCustomerConfigInfoList.findIndex(
        (item: any) => item.callbackWay === 1
      );
    if (findDataIndex !== -1) {
      localToptTab.value.tenantCustomerConfigInfoList.splice(findDataIndex, 1);
    }
  }
};

const changeCustomerConfigInfo = async (val: any, index: number) => {
  if (val) {
    const findData = secretKeyConfigList.value.find(
      (item: any) => item.id === val
    );
    const res = await api.generateKey({ type: findData.name });
    if (res.data && res.status === 1) {
      localToptTab.value.tenantCustomerConfigInfoList[index].secretKey = res.data;
    }
  }
};
// 获取PM/用户
const getTenantStaffList = async () => {
  const { data } = await apiUser.getTenantStaffList()
  const res = await apiPos.list(queryForm);
  if (res.data) {
    positionList.value = res.data.data
  }
  if (data) {
    staffList.value = data
  }
}

const handerRadioChange = async (val: any) => {
  if (val !== 'all') {
    queryUserForm.positionId = val
    const { data } = await apiUser.list(queryUserForm)
    if (data) {
      staffList.value = data.data
    }
  } else {
    const { data } = await apiUser.getTenantStaffList()
    if (data) {
      staffList.value = data
    }
  }
}

onBeforeMount(async () => {
  await getTenantStaffList()
  // staffList.value = staffList.value.filter((item:any) => item.distribution === 1)
  isEncryption.value =
    localToptTab.value.tenantCustomerConfigInfoList.length === 2;
  const res = await api.getTenantSecretKeyConfigList();
  secretKeyConfigList.value = res.data;
  const siteRes = await configurationSiteSettingStore.getSiteConfig()
  redirectUrl.value = `${siteRes.httpsStatus === 1 ? 'http' : 'https'}://${siteRes.topLevelDomainName ?? siteRes.personalizedDomainName}`
});
// 使用 InstanceType 来获取 ElForm 实例的类型
const formRef = ref(null);
// 注入主组件中的提供者
const localToptTab = ref<any>(props.leftTab);
// 后端(潘)这里类型不好改，前端判断如果是返回0就给他制空
if(localToptTab.value.rateAudit === 0) {
  localToptTab.value.rateAudit = null;
}
if(localToptTab.value.turnover === 0) {
  localToptTab.value.turnover = null;
}
nextTick(() => {
  // 表单验证方法
  validate(formRef.value);
});
//storage.local.get("anotherName")  //storage.local.get("tenantId")
const tenantId = storage.local.get("anotherName");
</script>

<template>
  <div>
    <ElForm ref="formRef" :rules="rules" :model="localToptTab" label-width="110px">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="t('newCustomer.basicSettings')" name="basicSettings">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{ t('newCustomer.basicInformation') }}</span>
              </div>
            </template>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item :label="t('newCustomer.customerAccord')" prop="customerAccord">
                  <el-input v-model="localToptTab.customerAccord" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="t('newCustomer.customerShortName')" prop="customerShortName">
                  <el-input v-model="localToptTab.customerShortName" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="t('newCustomer.companyName')" prop="companyName">
                  <el-input v-model="localToptTab.companyName" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="t('newCustomer.customerName')" prop="customerName">
                  <el-input v-model="localToptTab.customerName" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="t('newCustomer.customerPhone')" prop="customerPhone">
                  <el-input v-model="localToptTab.customerPhone" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="t('newCustomer.emailAddress')" prop="emailAddress">
                  <el-input v-model="localToptTab.emailAddress" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="t('newCustomer.chargeId')" prop="chargeId">
                  <el-select v-model="localToptTab.chargeId" value-key="" :placeholder="t('newCustomer.chargeSelect')" clearable filterable>
                    <template #header>
                      <el-radio-group v-model="radio1" size="large" style="max-width: 27.875rem;"
                        @change="handerRadioChange">
                        <el-radio-button :label="t('newCustomer.all')" value="all" />
                        <el-radio-button v-for="item in positionList" :key="item.id" :label="item.name"
                          :value="item.id" />
                      </el-radio-group>
                    </template>
                    <el-option v-for="item in staffList" :key="item.id" :label="item.userName" :value="item.id" />
                    <el-button class="buttonClass" @click="dictionaryItemVisible = true" size="small">
                      {{ t('newCustomer.quickAdd') }}
                      <div class="i-ic:round-plus w-1.3em h-1.3em"></div>
                      <!-- <SvgIcon name="ant-design:plus-outlined"
                          style="border-radius: 50%;padding: 2px;margin:0 4px;border: 1px solid #409EFF;"/> -->
                    </el-button>

                    <template #empty>
                      <div style="display: flex;justify-content: space-between;align-items:center;padding:0 1rem;">
                        {{ t('newCustomer.nodata') }}
                        <el-button type="primary" link @click="dictionaryItemVisible = true" size="small">
                          {{ t('newCustomer.quickAdd') }}
                          <div class="i-ic:round-plus w-1.3em h-1.3em"></div>
                          <!-- <SvgIcon name="ant-design:plus-outlined" color="#fff"
                            style="background-color: var(--el-color-primary);border-radius: 50%;padding: 2px;margin:0 2px" /> -->
                        </el-button>
                      </div>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="t('newCustomer.settlementCycle')" prop="settlementCycle">
                  <el-select v-model="localToptTab.settlementCycle">
                    <el-option label="net 30" :value="30"></el-option>
                    <el-option label="net 60" :value="60"></el-option>
                    <el-option label="net 90" :value="90"></el-option>
                    <el-option label="net 180" :value="180"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{ t('newCustomer.customerStatus') }}</span>
              </div>
            </template>
            <el-row :gutter="24">
              <el-col :span="4">
                <el-form-item :label="t('newCustomer.customerStatus')">
                  <el-switch v-model="localToptTab.customerStatus" :active-value="2" :inactive-value="1" inline-prompt
                    active-text="开启" inactive-text="关闭" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="前置问卷">
                  <el-switch v-model="localToptTab.antecedentQuestionnaire" :active-value="2" :inactive-value="1"
                    inline-prompt active-text="开启" inactive-text="关闭" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="风险控制">
                  <el-switch v-model="localToptTab.riskControl" :active-value="2" :inactive-value="1" inline-prompt
                    active-text="开启" inactive-text="关闭" />
                </el-form-item>
              </el-col>
              <el-col v-if="localToptTab.riskControl === 2" :span="12">
                <el-form-item label="营业限额/月" prop="">
                  <el-input v-model="localToptTab.turnover" controls-position="right" />
                </el-form-item>
              </el-col>
              <el-col v-if="localToptTab.riskControl === 2" :span="12">
                <el-form-item label="审核率Min值" prop="">
                  <el-input v-model="localToptTab.rateAudit" controls-position="right">
                    <template #append> % </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="端口设置" name="portSettings">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>重定向配置</span>
              </div>
            </template>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="加密">
                  <el-switch v-model="localToptTab.tenantCustomerConfigInfoList[0].isEncryption
      " :active-value="1" :inactive-value="2" inline-prompt active-text="加密" inactive-text="不加密" />
                </el-form-item>
              </el-col>
              <template v-if="localToptTab.tenantCustomerConfigInfoList[0].isEncryption ===
      1
      ">
                <el-col :span="24">
                  <el-form-item label="加密方式">
                    <el-select @change="changeCustomerConfigInfo($event, 0)" clearable v-model="localToptTab.tenantCustomerConfigInfoList[0]
      .encryptionId
      ">
                      <el-option v-for="item in secretKeyConfigList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="密钥">
                    <el-input disabled v-model="localToptTab.tenantCustomerConfigInfoList[0].secretKey">
                      <template #append>
                        <copy class="copy" :content="localToptTab.tenantCustomerConfigInfoList[0].secretKey" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </template>
              <template v-else>
                <el-col :span="24">
                  <el-form-item label="IP白名单">
                    <el-input placeholder="输入ip两个ip之间用,分开" v-model="localToptTab.tenantCustomerConfigInfoList[0].whitelistIp
      " />
                  </el-form-item>
                </el-col>
              </template>

              <el-col :span="24">
                <el-form-item label="成功重定向">
                  {{ redirectUrl }}
                  <span>
                    {{ `/redirect?tid=${tenantId}&status=c&uid=[uid]` }}
                  </span>
                  <template
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1">
                    <span v-pre>&hash=[hash]</span>
                  </template>
                  <copy
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1"
                    :content="`${redirectUrl}/redirect?tid=${tenantId}&status=c&uid=[uid]&hash=[hash]`" />
                  <copy v-else :content="`${redirectUrl}/redirect?tid=${tenantId}&status=c&uid=[uid]`" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="配额满重定向">
                  {{ redirectUrl }}
                  <span>
                    {{ `/redirect?tid=${tenantId}&status=q&uid=[uid]` }}
                  </span>
                  <template
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1">
                    <span v-pre>&hash=[hash]</span>
                  </template>
                  <copy
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1"
                    :content="`${redirectUrl}/redirect?tid=${tenantId}&status=q&uid=[uid]&hash=[hash]`" />
                  <copy v-else :content="`${redirectUrl}/redirect?tid=${tenantId}&status=q&uid=[uid]`" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="被甄别重定向">
                  {{ redirectUrl }}
                  <span>
                    {{ `/redirect?tid=${tenantId}&status=s&uid=[uid]` }}
                  </span>
                  <template
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1">
                    <span v-pre>&hash=[hash]</span>
                  </template>
                  <copy
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1"
                    :content="`${redirectUrl}/redirect?tid=${tenantId}&status=s&uid=[uid]&hash=[hash]`" />
                  <copy v-else :content="`${redirectUrl}/redirect?tid=${tenantId}&status=s&uid=[uid]`" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="安全重定向">
                  {{ redirectUrl }}
                  <span>
                    {{ `/redirect?tid=${tenantId}&status=t&uid=[uid]` }}
                  </span>
                  <template
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1">
                    <span v-pre>&hash=[hash]</span>
                  </template>
                  <copy
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1"
                    :content="`${redirectUrl}/redirect?tid=${tenantId}&status=t&uid=[uid]&hash=[hash]`" />
                  <copy v-else :content="`${redirectUrl}/redirect?tid=${tenantId}&status=t&uid=[uid]`" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <el-checkbox v-model="isEncryption" size="large" @change="changeConfigInfoList">
                  <span>服务端回调配置</span>
                </el-checkbox>
              </div>
            </template>
            <el-row :gutter="24" v-if="localToptTab.tenantCustomerConfigInfoList.length === 2">
              <el-col :span="24">
                <el-form-item label="加密">
                  <el-switch v-model="localToptTab.tenantCustomerConfigInfoList[1].isEncryption
      " :active-value="1" :inactive-value="2" inline-prompt active-text="加密" inactive-text="不加密" />
                </el-form-item>
              </el-col>
              <template v-if="localToptTab.tenantCustomerConfigInfoList[1].isEncryption ===
      1
      ">
                <el-col :span="24">
                  <el-form-item label="加密方式">
                    <el-select @change="changeCustomerConfigInfo($event, 1)" clearable v-model="localToptTab.tenantCustomerConfigInfoList[1]
      .encryptionId
      ">
                      <el-option v-for="item in secretKeyConfigList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="密钥">
                    <el-input disabled v-model="localToptTab.tenantCustomerConfigInfoList[1].secretKey">
                      <template #append>
                        <copy class="copy" :content="localToptTab.tenantCustomerConfigInfoList[1].secretKey" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </template>
              <template v-else>
                <el-col :span="24">
                  <el-form-item label="IP白名单">
                    <el-input placeholder="输入ip两个ip之间用,分开" v-model="localToptTab.tenantCustomerConfigInfoList[1].whitelistIp
      " />
                  </el-form-item>
                </el-col>
              </template>

              <el-col :span="24">
                <el-form-item label="成功回调">
                  {{ serverSideUrl }}
                  <span>
                    {{ `/callback/serviceCallback?tid=${tenantId}&status=c&uid=[uid]` }}
                  </span>
                  <template
                    v-if="localToptTab.tenantCustomerConfigInfoList[1].encryptionId && localToptTab.tenantCustomerConfigInfoList[1].isEncryption === 1">
                    <span v-pre>
                      &hash=[hash]
                    </span>
                  </template>
                  <copy
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1"
                    :content="`${serverSideUrl}/callback/serviceCallback?tid=${tenantId}&status=c&uid=[uid]&hash=[hash]`" />
                  <copy v-else
                    :content="`${serverSideUrl}/callback/serviceCallback?tid=${tenantId}&status=c&uid=[uid]`" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="配额满回调">
                  {{ serverSideUrl }}
                  <span>{{ `/callback/serviceCallback?tid=${tenantId}&status=q&uid=[uid]` }}</span><template
                    v-if="localToptTab.tenantCustomerConfigInfoList[1].encryptionId && localToptTab.tenantCustomerConfigInfoList[1].isEncryption === 1"><span
                      v-pre>&hash=[hash]</span></template>
                  <copy
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1"
                    :content="`${serverSideUrl}/callback/serviceCallback?tid=${tenantId}&status=q&uid=[uid]&hash=[hash]`" />
                  <copy v-else
                    :content="`${serverSideUrl}/callback/serviceCallback?tid=${tenantId}&status=q&uid=[uid]`" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="被甄别回调">
                  {{ serverSideUrl }}
                  <span>{{ `/callback/serviceCallback?tid=${tenantId}&status=s&uid=[uid]` }}</span><template
                    v-if="localToptTab.tenantCustomerConfigInfoList[1].encryptionId && localToptTab.tenantCustomerConfigInfoList[1].isEncryption === 1"><span
                      v-pre>&hash=[hash]</span></template>
                  <copy
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1"
                    :content="`${serverSideUrl}/callback/serviceCallback?tid=${tenantId}&status=s&uid=[uid]&hash=[hash]`" />
                  <copy v-else
                    :content="`${serverSideUrl}/callback/serviceCallback?tid=${tenantId}&status=s&uid=[uid]`" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="安全终止回调">
                  {{ serverSideUrl }}
                  <span>{{ `/callback/serviceCallback?tid=${tenantId}&status=t&uid=[uid]` }}</span><template
                    v-if="localToptTab.tenantCustomerConfigInfoList[1].encryptionId && localToptTab.tenantCustomerConfigInfoList[1].isEncryption === 1"><span
                      v-pre>&hash=[hash]</span></template>
                  <copy
                    v-if="localToptTab.tenantCustomerConfigInfoList[0].encryptionId && localToptTab.tenantCustomerConfigInfoList[0].isEncryption === 1"
                    :content="`${serverSideUrl}/callback/serviceCallback?tid=${tenantId}&status=t&uid=[uid]&hash=[hash]`" />
                  <copy v-else
                    :content="`${serverSideUrl}/callback/serviceCallback?tid=${tenantId}&status=t&uid=[uid]`" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </ElForm>
    <DictionaryItemDia v-if="dictionaryItemVisible" v-model="dictionaryItemVisible" @success="getTenantStaffList" />
  </div>
</template>

<style scoped lang="scss">
:deep {
  .el-divider {
    margin: 20px 0 !important;
  }

  .el-row {
    width: 94% !important;
    margin: auto !important;
  }

  .el-input-number {
    width: 100%;
  }

  .el-select-dropdown__header {
    width: 416px !important;
  }
}

:deep(.el-popper) {
  width: 25.375rem;
}

:deep(.el-radio-button__inner) {
  border: none !important;
}

:deep(.el-select-dropdown__header) {
  width: 416px !important;
  border-bottom: none !important;
}

:deep(.el-radio-button__inner) {
  height: 1.875rem;
  width: 4.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none !important;
  border-radius: 20px !important;
}

// .el-radio-button__inner {
//   border: none!important;
//   border-radius: 20px !important;
// }

// .el-radio-button:first-child .el-radio-button__inner {
//   border: none!important;
//   border-radius: 0 !important;
// }

// .el-radio-button:last-child .el-radio-button__inner {
//   border-radius: 0 !important;
// }

.buttonClass {
  text-align: center;
  margin: 0.75rem;
  width: 100%;
  height: 2rem;
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  font-size: 0.875rem;
  color: #409eff;
  line-height: 16px;
  background: #f4f8ff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #e9eef3;
}

/* 使按钮在下拉框展开时自适应宽度 */
.el-select-dropdown .buttonClass {
  width: calc(100% - 24px);
  /* 减去两边的 padding */

}
</style>
