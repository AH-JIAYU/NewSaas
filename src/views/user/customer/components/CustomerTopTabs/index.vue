<script lang="ts" setup>
import { ElForm } from "element-plus";
import { defineProps, ref } from "vue";
import api from "@/api/modules/user_customer";

// 如果希望默认展示第一个 Tab
const props = defineProps({
  leftTab: Object,
  tabIndex: Number,
});
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
});

const activeName = ref("basicSettings");
const isEncryption = ref(false);
const secretKeyConfigList = ref<any>([]);

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
    localToptTab.value.tenantCustomerConfigInfoList[index].secretKey = res.data;
  }
};

onBeforeMount(async () => {
  isEncryption.value =
    localToptTab.value.tenantCustomerConfigInfoList.length === 2;

  const res = await api.getTenantSecretKeyConfigList();
  secretKeyConfigList.value = res.data;
});
// 使用 InstanceType 来获取 ElForm 实例的类型
const formRef = ref(null);
// 注入主组件中的提供者
const localToptTab = ref<any>(props.leftTab);
nextTick(() => {
  // 表单验证方法
  validate(formRef.value);
});
</script>

<template>
  <div>
    <ElForm
      ref="formRef"
      :rules="rules"
      :model="localToptTab"
      label-width="100px"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础设置" name="basicSettings">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>基本信息</span>
              </div>
            </template>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="客户名称" prop="customerAccord">
                  <el-input v-model="localToptTab.customerAccord" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户简称" prop="customerShortName">
                  <el-input
                    v-model="localToptTab.customerShortName"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称" prop="companyName">
                  <el-input v-model="localToptTab.companyName" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户姓名" prop="customerName">
                  <el-input v-model="localToptTab.customerName" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号码" prop="customerPhone">
                  <el-input v-model="localToptTab.customerPhone" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱" prop="emailAddress">
                  <el-input v-model="localToptTab.emailAddress" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人" prop="chargeName">
                  <el-input v-model="localToptTab.chargeName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结算周期" prop="settlementCycle">
                  <el-select v-model="localToptTab.settlementCycle">
                    <el-option label="30天" :value="30"></el-option>
                    <el-option label="60天" :value="60"></el-option>
                  </el-select>
                  <!-- <el-input-number
                    v-model="localToptTab.settlementCycle"
                    controls-position="right"
                    :min="0"
                  /> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>权限信息</span>
              </div>
            </template>
            <el-row :gutter="24">
              <el-col :span="4">
                <el-form-item label="客户状态">
                  <el-switch
                    v-model="localToptTab.customerStatus"
                    :active-value="2"
                    :inactive-value="1"
                    inline-prompt
                    active-text="开启"
                    inactive-text="关闭"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="前置问卷">
                  <el-switch
                    v-model="localToptTab.antecedentQuestionnaire"
                    :active-value="2"
                    :inactive-value="1"
                    inline-prompt
                    active-text="开启"
                    inactive-text="关闭"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="风险控制">
                  <el-switch
                    v-model="localToptTab.riskControl"
                    :active-value="2"
                    :inactive-value="1"
                    inline-prompt
                    active-text="开启"
                    inactive-text="关闭"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="localToptTab.riskControl === 2" :span="12">
                <el-form-item label="营业限额/月">
                  <el-input-number
                    v-model="localToptTab.turnover"
                    controls-position="right"
                    :min="0"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="localToptTab.riskControl === 2" :span="12">
                <el-form-item label="审核率Min值">
                  <el-input
                    v-model="localToptTab.rateAudit"
                    controls-position="right"
                    :min="1"
                    type="number"
                  >
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
                  <el-switch
                    v-model="
                      localToptTab.tenantCustomerConfigInfoList[0].isEncryption
                    "
                    :active-value="1"
                    :inactive-value="2"
                    inline-prompt
                    active-text="加密"
                    inactive-text="不加密"
                  />
                </el-form-item>
              </el-col>
              <template
                v-if="
                  localToptTab.tenantCustomerConfigInfoList[0].isEncryption ===
                  1
                "
              >
                <el-col :span="24">
                  <el-form-item label="加密方式">
                    <el-select
                      @change="changeCustomerConfigInfo($event, 0)"
                      clearable
                      v-model="
                        localToptTab.tenantCustomerConfigInfoList[0]
                          .encryptionId
                      "
                    >
                      <el-option
                        v-for="item in secretKeyConfigList"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="密钥">
                    <el-input
                      disabled
                      v-model="
                        localToptTab.tenantCustomerConfigInfoList[0].secretKey
                      "
                    />
                  </el-form-item>
                </el-col>
              </template>
              <template v-else>
                <el-col :span="24">
                  <el-form-item label="IP白名单">
                    <el-input
                      placeholder="输入ip两个ip之间用,分开"
                      v-model="
                        localToptTab.tenantCustomerConfigInfoList[0].whitelistIp
                      "
                    />
                  </el-form-item>
                </el-col>
              </template>

              <el-col :span="24">
                <el-form-item label="成功回调">
                  <span v-pre>
                    http:47.96.98.102:9100/callback/serviceCallback?uid=[uid]&status=c
                  </span>
                  <template
                    v-if="
                      localToptTab.tenantCustomerConfigInfoList[0].encryptionId
                    "
                  >
                    <span v-pre>&hash =[hash]</span>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="配额满回调">
                  <span v-pre>
                    http:47.96.98.102:9100/callback/serviceCallback?uid=[uid]&status=q
                  </span>
                  <template
                    v-if="
                      localToptTab.tenantCustomerConfigInfoList[0].encryptionId
                    "
                  >
                    <span v-pre>&hash=[hash]</span>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="被甄别回调">
                  <span v-pre>
                    http:47.96.98.102:9100/callback/serviceCallback?uid=[uid]&status=s
                  </span>
                  <template
                    v-if="
                      localToptTab.tenantCustomerConfigInfoList[0].encryptionId
                    "
                  >
                    <span v-pre>&hash=[hash]</span>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="安全终止回调">
                  <span v-pre>
                    http:47.96.98.102:9100/callback/serviceCallback?uid=[uid]&status=t
                  </span>
                  <template
                    v-if="
                      localToptTab.tenantCustomerConfigInfoList[0].encryptionId
                    "
                  >
                    <span v-pre>&hash=[hash]</span>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <el-checkbox
                  v-model="isEncryption"
                  size="large"
                  @change="changeConfigInfoList"
                >
                  <span>服务端回调配置</span>
                </el-checkbox>
              </div>
            </template>
            <el-row
              :gutter="24"
              v-if="localToptTab.tenantCustomerConfigInfoList.length === 2"
            >
              <el-col :span="24">
                <el-form-item label="加密">
                  <el-switch
                    v-model="
                      localToptTab.tenantCustomerConfigInfoList[1].isEncryption
                    "
                    :active-value="1"
                    :inactive-value="2"
                    inline-prompt
                    active-text="加密"
                    inactive-text="不加密"
                  />
                </el-form-item>
              </el-col>
              <template
                v-if="
                  localToptTab.tenantCustomerConfigInfoList[1].isEncryption ===
                  1
                "
              >
                <el-col :span="24">
                  <el-form-item label="加密方式">
                    <el-select
                      @change="changeCustomerConfigInfo($event, 1)"
                      clearable
                      v-model="
                        localToptTab.tenantCustomerConfigInfoList[1]
                          .encryptionId
                      "
                    >
                      <el-option
                        v-for="item in secretKeyConfigList"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="密钥">
                    <el-input
                      disabled
                      v-model="
                        localToptTab.tenantCustomerConfigInfoList[1].secretKey
                      "
                    />
                  </el-form-item>
                </el-col>
              </template>
              <template v-else>
                <el-col :span="24">
                  <el-form-item label="IP白名单">
                    <el-input
                      placeholder="输入ip两个ip之间用,分开"
                      v-model="
                        localToptTab.tenantCustomerConfigInfoList[1].whitelistIp
                      "
                    />
                  </el-form-item>
                </el-col>
              </template>

              <el-col :span="24">
                <el-form-item label="成功回调">
                  <span v-pre
                    >http://369.front-saas-web.surveyssaas.com/#/redirect?uid=[uid]&status=c</span
                  ><template
                    v-if="
                      localToptTab.tenantCustomerConfigInfoList[1].encryptionId
                    "
                    ><span v-pre>&hash=[hash]</span></template
                  >
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="配额满回调">
                  <span v-pre
                    >http://369.front-saas-web.surveyssaas.com/#/redirect?uid=[uid]&status=q</span
                  ><template
                    v-if="
                      localToptTab.tenantCustomerConfigInfoList[1].encryptionId
                    "
                    ><span v-pre>&hash=[hash]</span></template
                  >
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="被甄别回调">
                  <span v-pre
                    >http://369.front-saas-web.surveyssaas.com/#/redirect?uid=[uid]&status=s</span
                  ><template
                    v-if="
                      localToptTab.tenantCustomerConfigInfoList[1].encryptionId
                    "
                    ><span v-pre>&hash=[hash]</span></template
                  >
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="安全终止回调">
                  <span v-pre
                    >http://369.front-saas-web.surveyssaas.com/#/redirect?uid=[uid]&status=t</span
                  ><template
                    v-if="
                      localToptTab.tenantCustomerConfigInfoList[1].encryptionId
                    "
                    ><span v-pre>&hash=[hash]</span></template
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </ElForm>
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
}
</style>
