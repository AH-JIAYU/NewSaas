<script lang="ts" setup>
import { ElForm } from "element-plus";
import { obtainLoading } from "@/utils/apiLoading";
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典-国家
import useSurveyVipLevelStore from "@/store/modules/survey_vipLevel"; //会员等级
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典-国家
const surveyVipLevelStore = useSurveyVipLevelStore(); //会员等级
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组
const validate = inject<any>("validateTopTabs"); //注入Ref
// 如果希望默认展示第一个 Tab
const props = defineProps({
  leftTab: Object,
  tabIndex: Number,
});
const activeName = ref("basicSettings"); // tabs
const data = reactive<any>({
  vipLevelList: [], // 会员等级
  vipGroupList: [], // 会员组
  countryList: [], // 国家
});
// 校验
const rules = reactive<any>({
  memberNickname: [
    { required: true, message: "请输入会员昵称", trigger: "blur" },
    { min: 2, max: 50, message: "内容在2-50个字之间", trigger: "blur" },
  ],
  memberLevelId: [
    { required: true, message: "请选择会员等级", trigger: "change" },
  ],
  subordinateCountryId: [
    { required: true, message: "请选择国家", trigger: "change" },
  ],
});

onMounted(async () => {
  await obtainLoading(getList());
});
// 获取会员等级 会员组 国家
const getList = async () => {
  data.vipLevelList = await surveyVipLevelStore.getLevelNameList();
  data.vipGroupList = await surveyVipGroupStore.getGroupNameList();
  data.countryList = await basicDictionaryStore.getCountry();
};
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
    <el-tabs v-model="activeName">
      <el-tab-pane label="会员信息" name="basicSettings">
        <ElForm
          ref="formRef"
          :model="localToptTab"
          :rules="rules"
          label-width="100px"
        >
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>基本信息</span>
              </div>
            </template>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-form-item label="会员名称" prop="memberNickname">
                  <el-input v-model="localToptTab.memberNickname" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属国家" prop="subordinateCountryId">
                  <el-select
                    clearable
                    filterable
                    v-model="localToptTab.subordinateCountryId"
                  >
                    <el-option
                      v-for="item in data.countryList"
                      :key="item.id"
                      :value="item.id"
                      :label="item.chineseName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="会员姓名">
                  <el-input clearable v-model="localToptTab.memberName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input clearable v-model="localToptTab.memberPhone" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电子邮箱">
                  <el-input clearable v-model="localToptTab.emailAddress" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="初始密码">
                  <el-input clearable value="123456" disabled />
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
            <el-row :gutter="20">
              <el-col :span="4">
                <el-form-item label="B2B">
                  <el-switch
                    :active-value="2"
                    :inactive-value="1"
                    v-model="localToptTab.b2bStatus"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="B2C">
                  <el-switch
                    :active-value="2"
                    :inactive-value="1"
                    v-model="localToptTab.b2cStatus"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="会员状态">
                  <el-switch
                    :active-value="2"
                    :inactive-value="1"
                    v-model="localToptTab.memberStatus"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="免审">
                  <el-switch
                    :active-value="2"
                    :inactive-value="1"
                    v-model="localToptTab.exemptionTrial"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider content-position="center" />
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="会员等级" prop="memberLevelId">
                  <el-select
                    clearable
                    filterable
                    v-model="localToptTab.memberLevelId"
                  >
                    <el-option
                      v-for="item in data.vipLevelList"
                      :key="item.memberLevelId"
                      :value="item.memberLevelId"
                      :label="item.levelNameOrAdditionRatio"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="会员组">
                  <el-select
                    clearable
                    filterable
                    v-model="localToptTab.memberGroupId"
                  >
                    <el-option
                      v-for="item in data.vipGroupList"
                      :key="item.memberGroupId"
                      :label="item.memberGroupName"
                      :value="item.memberGroupId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </ElForm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
@/store/modules/otherFunctions_basicDictionary
