<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { defineProps, provide, ref } from "vue";
import TopTabs from "../SupplierTopTabs/index.vue";
// import { useAclStore } from '/@/store/modules/acl'

const props = defineProps({
  leftTabsData: Array,
  validateTopTabs: Array,
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
  supplierAccord: "名称",
  // subordinateCountryId: "", // 所属国家id
  // supplierLevelId: "", // 供应商等级
  // supplierName: "",   // 供应商姓名
  // supplierPhone: "", // 手机号
  // emailAddress: "", // 邮箱
  // surveySystem: 0, // 调查系统:1:关闭 2:开启
  // b2bStatus: 0, // B2B:1:关闭 2:开启
  // b2cStatus: 0, // 	B2C:1:关闭 2:开启
  // supplierStatus: 0, // 	供应商状态:1:关闭 2:开启 3:待审核
  // relevanceCountryId: "", // 关联国家id
  // relevanceCustomerId: 0, // 关联客户id
  // payMethod: 0, // 付款方式
  // accountName: "", // 账户名称
  // collectionAccount: "", // 	收款账号
  // settlementCycle: 0, // 结算周期
  // bankName: "", // 付款方式为银行支付的时候需要填银行名称
};

// 同步主项目
function syncProject() {
  const syncdata = cloneDeep(localLeftTab.value[0]);
  localLeftTab.value[activeLeftTab.value] = syncdata;
}

function addLeftTab() {
  const syncdata = cloneDeep(localLeftTab.value[0]);
  activeLeftTab.value = ++tabIndex.value;
  localLeftTab.value.push({
    ...initialTopTabsData,
    client: client.value,
    await: syncdata.await,
    multi: syncdata.multi,
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
        :disabled="localLeftTab.length > 9"
        @click="addLeftTab()"
      >
        添加子项目
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
          :label="leftTab.supplierAccord"
          :name="index"
        >
          <div
            style="
              float: right;
              position: sticky;
              top: 19px;
              width: 85%;
              z-index: 1000;
              display: flex;
              justify-content: start;
              align-items: start;
            "
          >
            <!-- 在每个左侧 Tab 中使用 TopTabs 组件 -->
            <el-button
              v-if="activeLeftTab > 0"
              size="small"
              type="primary"
              round
              plain
              @click="syncProject"
            >
              同步主项目数据
            </el-button>
            <!--
      <HTooltip
        style="z-index: 9; color: #48a2ff; margin-left: 5px"
        text="注意噢！"
        v-if="activeLeftTab > 0"
      >
        <div class="i-bi:exclamation-circle h-1em w-1em" />
      </HTooltip> -->
          </div>

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
