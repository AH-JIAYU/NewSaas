<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { defineProps, provide, ref } from "vue";
import TopTabs from "../CustomerTopTabs/index.vue";

const props = defineProps({
  leftTabsData: Array,
  validateTopTabs: Array,
  title: String,
});
const client = ref();
const localLeftTab = ref<any>(props.leftTabsData);
const validateTopTabs = ref<any>(props.validateTopTabs);

// 为每个 tab 创建并提供一个唯一的 ref
localLeftTab.value.forEach((tab: any, index: any) => {
  const formRef = ref(null);
  provide(`formRef${index}`, formRef);
});

// const { surveyconfig } = useAclStore()
const tabIndex = ref(0);
const activeLeftTab = ref(0);

const initialTopTabsData = {
  customerAccord: "客户名称", //客户名称
  customerShortName: "", //客户简称
  companyName: "", //公司名称
  customerName: "", //客户姓名
  customerPhone: "", //手机号码
  emailAddress: "", //电子邮箱
  chargeName: "", //负责人
  settlementCycle: null, //结算周期
  customerStatus: null, //客户状态
  antecedentQuestionnaire: null, //前置问卷
  riskControl: null, //风险控制
  turnover: null, //营业限额
  rateAudit: null, //审核Min值
};

// // 同步主项目
// function syncProject() {
//   const syncdata = cloneDeep(localLeftTab.value[0]);
//   localLeftTab.value[activeLeftTab.value] = syncdata;
// }

function addLeftTab() {
  activeLeftTab.value = ++tabIndex.value;
  localLeftTab.value.push({
    ...initialTopTabsData,
  });
}

function tabremove(tabIndexs: any) {
  localLeftTab.value.splice(tabIndexs, 1);
  validateTopTabs.value.splice(tabIndexs, 1);
  if (activeLeftTab.value >= localLeftTab.value.length) {
    activeLeftTab.value = Math.max(0, localLeftTab.value.length - 1);
    tabIndex.value = Math.max(0, localLeftTab.value.length - 1);
  }
}
function setclient(data: number) {
  localLeftTab.value.forEach((item: any) => {
    item.client = data;
  });
  client.value = data;
}
</script>

<template>
  <div>
    <template v-if="!localLeftTab[0].id">
      <el-button
        class="button"
        :disabled="localLeftTab.length > 9 || props.title !== '添加'"
        @click="addLeftTab()"
      >
        新增客户
      </el-button>
      <el-tabs
        v-model="activeLeftTab"
        tab-position="left"
        @tab-remove="tabremove"
      >
        <el-tab-pane
          v-for="(leftTab, index) in localLeftTab"
          :key="index"
          :closable="localLeftTab.length !== 1"
          :label="leftTab.customerAccord"
          :name="index"
        >
          <!-- 在每个左侧 Tab 中使用 TopTabs 组件 -->
          <!-- <el-button
        style="margin-bottom: 5px"
        v-if="activeLeftTab > 0"
        size="small"
        type="primary"
        round
        plain
        @click="syncProject"
      >
        同步主项目数据
      </el-button>
      <HTooltip
        style="z-index: 9; color: #48a2ff; margin-left: 5px"
        text="注意噢！"
        v-if="activeLeftTab > 0"
      >
        <div class="i-bi:exclamation-circle h-1em w-1em" />
      </HTooltip> -->
          <TopTabs
            :left-tab="leftTab"
            :tab-index="index"
            @set-client="setclient"
          />
        </el-tab-pane>
      </el-tabs>
    </template>
    <template v-else>
      <TopTabs :left-tab="localLeftTab[0]" @set-client="setclient" />
    </template>
  </div>
</template>
