<script lang="ts" setup>
import { ElForm } from "element-plus";
import edit from "@/views/survey/vipLevel/components/Edit/index.vue"; // 快捷操作：新增会员等级
import useBasicDictionaryStore from "@/store/modules/otherFunctions_basicDictionary"; //基础字典
import useSurveyVipLevelStore from "@/store/modules/survey_vipLevel"; //会员等级
import useSurveyVipGroupStore from "@/store/modules/survey_vipGroup"; //会员组
import apiDep from "@/api/modules/department";
const basicDictionaryStore = useBasicDictionaryStore(); //基础字典
const surveyVipLevelStore = useSurveyVipLevelStore(); //会员等级
const surveyVipGroupStore = useSurveyVipGroupStore(); //会员组
const validate = inject<any>("validateTopTabs"); //注入Ref
// 如果希望默认展示第一个 Tab
const props = defineProps({
  leftTab: Object,
  tabIndex: Number,
});
const activeName = ref("basicSettings"); // tabs
const EditRef = ref(); // 快捷操作：新增会员等级 Ref
const data = reactive<any>({
  vipLevelList: [], // 会员等级
  vipGroupList: [], // 会员组
  countryList: [], // 区域
});
// 部门配置
const defaultProps: any = {
  children: "children",
  label: "name",
  // disabled : "distribution",
};
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
    { required: true, message: "请选择区域", trigger: "change" },
  ],
});

// 自定义校验手机号
const validatePhone = (rule: any, value: any, callback: any) => {
  const regExpPhone: any =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  if (!regExpPhone.test(localToptTab.value.memberPhone)) {
    callback(new Error("请输入合法手机号"));
  } else {
    callback();
  }
};
// 自定义校验邮箱
const validateEmail = (rule: any, value: any, callback: any) => {
  const regExpEmail: any =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExpEmail.test(localToptTab.value.emailAddress)) {
    callback(new Error("请输入合法邮箱"));
  } else {
    callback();
  }
};
// 动态新增校验
const changeCountryId = (val: any) => {
  if (val) {
    localToptTab.value.countryType = val === "343" ? 1 : 2;
    if (val === "343") {
      if (rules.emailAddress) {
        delete rules.emailAddress;
      }
      rules.memberPhone = [
        { required: true, message: "请输入手机号码", trigger: "blur" },
        { validator: validatePhone, trigger: "blur" },
      ];
    } else {
      if (rules.memberPhone) {
        delete rules.memberPhone;
      }
      rules.emailAddress = [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { validator: validateEmail, trigger: "blur" },
      ];
    }
  }
};
// 部门change事件
const handleNodeClick = (nodeData: any, checked: any) => {
  if (checked) {
    localToptTab.value.memberGroupId = nodeData.id
    // 如果选中该节点，禁用所有其他节点
    disableAllNodes(nodeData.id);
  } else {
    localToptTab.value.memberGroupId = ''
    // 如果取消选中，恢复所有节点为可选
    enableAllNodes();
  }
};
// 禁用所有节点（除了选中的节点）
const disableAllNodes = (selectedId: any) => {
  const traverse = (nodes: any) => {
    nodes.forEach((node: any) => {
      node.disabled = node.id !== selectedId; // 仅将非选中节点禁用
      if (node.children) {
        traverse(node.children); // 递归处理子节点
      }
    });
  };
  traverse(data.departmentList);
};
// 恢复所有节点为可选
const enableAllNodes = () => {
  const traverse = (nodes: any) => {
    nodes.forEach((node: any) => {
      node.disabled = false; // 恢复为可选
      if (node.children) {
        traverse(node.children); // 递归处理子节点
      }
    });
  };
  traverse(data.departmentList);
};
// 获取会员等级
const getLevelNameList = async () => {
  data.vipLevelList = await surveyVipLevelStore.getLevelNameList();
}
// 获取会员等级 会员组 区域
const getList = async () => {
  await getLevelNameList()
  // 部门
  const res = await apiDep.list({ name: '' });
  data.departmentList = res.data;
  // data.vipGroupList = await surveyVipGroupStore.getGroupNameList();

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
// 快捷操作：新增会员等级
const AddVipLevel = () => {
  EditRef.value.showEdit();
}

onMounted(async () => {
  await getList();
  changeCountryId(localToptTab.value.subordinateCountryId);
});
</script>

<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="会员信息" name="basicSettings">
        <ElForm ref="formRef" :model="localToptTab" :rules="rules" label-width="100px" :validate-on-rule-change="false">
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
                <el-form-item label="所属区域" prop="subordinateCountryId">
                  <el-select clearable filterable v-model="localToptTab.subordinateCountryId" @change="changeCountryId">
                    <el-option v-for="item in data.countryList" :key="item.id" :value="item.id"
                      :label="item.chineseName"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="会员姓名">
                  <el-input clearable v-model="localToptTab.memberName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码" prop="memberPhone">
                  <el-input clearable v-model="localToptTab.memberPhone" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电子邮箱" prop="emailAddress">
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
                <el-form-item label="会员状态">
                  <el-switch :active-value="2" :inactive-value="1" v-model="localToptTab.memberStatus" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="B2B">
                  <el-switch :active-value="2" :inactive-value="1" v-model="localToptTab.b2bStatus" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="B2C">
                  <el-switch :active-value="2" :inactive-value="1" v-model="localToptTab.b2cStatus" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="免审">
                  <el-switch :active-value="2" :inactive-value="1" v-model="localToptTab.exemptionTrial" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="随机身份">
                  <el-switch :active-value="2" :inactive-value="1" v-model="localToptTab.randomStatus" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider content-position="center" />
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="会员等级" prop="memberLevelId">
                  <el-select clearable filterable v-model="localToptTab.memberLevelId">
                    <el-option v-for="item in data.vipLevelList" :key="item.memberLevelId" :value="item.memberLevelId"
                      :label="item.levelNameOrAdditionRatio"></el-option>
                    <template #empty>
                      <div style="display: flex;justify-content: space-between;align-items:center;padding:0 1rem;">
                        暂无数据
                        <el-button type="primary" link @click="AddVipLevel" size="small">
                          快捷新增
                          <SvgIcon name="ant-design:plus-outlined" color="#fff"
                            style="background-color: var(--el-color-primary);border-radius: 50%;padding: 2px;margin:0 2px" />
                        </el-button>
                      </div>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门">
                  <!-- <el-select clearable filterable v-model="localToptTab.memberGroupId">
                    <el-option v-for="item in data.vipGroupList" :key="item.memberGroupId" :label="item.memberGroupName"
                      :value="item.memberGroupId" />
                  </el-select> -->
                  <!-- <el-tree style="max-width: 600px" ref="treeRef" :data="data.departmentList" show-checkbox
                    check-strictly node-key="id" :default-expanded-keys="[]" default-expand-all :props="defaultProps"
                    @check-change="handleNodeClick" /> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </ElForm>
      </el-tab-pane>
    </el-tabs>
    <edit ref="EditRef" @queryData="getLevelNameList" />
  </div>
</template>

<style scoped lang="scss"></style>
