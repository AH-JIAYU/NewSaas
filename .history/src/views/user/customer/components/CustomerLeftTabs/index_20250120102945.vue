<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { defineProps, provide, ref } from "vue";
import TopTabs from "../CustomerTopTabs/index.vue";
import useUserCustomerStore from "@/store/modules/user_customer"; // 客户
import { useI18n } from "vue-i18n";
const customerStore = useUserCustomerStore(); // 客户
const props: any = defineProps({
  leftTabsData: Array,
  validateTopTabs: Array,
  validateAll: Array,
  title: String,
});
const { t } = useI18n();
const emits: any = defineEmits(["validate"]);
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

function addLeftTab() {
  activeLeftTab.value = ++tabIndex.value;
  localLeftTab.value.push({
    ...customerStore.initialTopTabsData,
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
/**
 * 监听activeLeftTab.value左侧焦点的tabs
 *  props.validateAll 是点击确认后所有组件的校验结果
 * validateIndex 是props.validateAll中值为rejected(校验未通过)的值的索引
 * 当activeLeftTab改变(切换tabs)，并且改变前的值 在validateIndex中存在，
 * 说明他刚改完表单 重新进行校验，取消符合校验规则的lefTabs的红色阴影
 */
watch(
  () => activeLeftTab.value,
  (newVal, oldVal) => {
    const validateIndex = props.validateAll.reduce(
      (acc: any, value: any, index: any) => {
        if (value === "rejected") {
          acc.push(index);
        }
        return acc;
      },
      []
    );
    if (validateIndex.includes(oldVal)) {
      emits("validate");
    }
  }
);
defineExpose({ activeLeftTab });
</script>

<template>
  <div>
    <template v-if="!localLeftTab[0].id">
      <el-button
        class="button"
        :disabled="localLeftTab.length > 29 || props.title !== '新增'"
        @click="addLeftTab()"
      >
        {{ t('newUser.newCustomer') }}
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
          <template #label>
            <div
              :class="
                props.validateAll[index] &&
                props.validateAll[index] === 'rejected'
                  ? 'validateRejected'
                  : ''
              "
            >
              {{ leftTab.memberNickname || "客户" }}
            </div>
          </template>
          <TopTabs :left-tab="leftTab" :tab-index="index" />
        </el-tab-pane>
      </el-tabs>
    </template>
    <template v-else>
      <TopTabs :left-tab="localLeftTab[0]" />
    </template>
  </div>
</template>
