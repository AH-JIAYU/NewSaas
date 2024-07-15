<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { defineProps, provide, ref } from "vue";
import TopTabs from "../SupplierTopTabs/index.vue";
import UseUserSupplier from "@/store/modules/user_supplier";
const userSupplier = UseUserSupplier();

const props: any = defineProps({
  leftTabsData: Array,
  validateTopTabs: Array,
  validateAll: Array,
  title: String,
});
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

// 同步主项目
function syncProject() {
  const syncdata = cloneDeep(localLeftTab.value[0]);
  localLeftTab.value[activeLeftTab.value] = syncdata;
}

function addLeftTab() {
  const syncdata = cloneDeep(localLeftTab.value[0]);
  activeLeftTab.value = ++tabIndex.value;
  localLeftTab.value.push({
    ...userSupplier.initialTopTabsData,
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
        :disabled="localLeftTab.length > 9 || props.title !== '添加'"
        @click="addLeftTab()"
      >
        添加供应商
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
          <template #label>
            <div
              :class="
                props.validateAll[index] &&
                props.validateAll[index] === 'rejected'
                  ? 'validateRejected'
                  : ''
              "
            >
              {{ leftTab.supplierAccord || "供应商名称" }}
            </div>
          </template>
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

          <TopTabs :left-tab="leftTab" :tab-index="index" />
        </el-tab-pane>
      </el-tabs>
    </template>
    <template v-else>
      <TopTabs :left-tab="localLeftTab[0]" />
    </template>
  </div>
</template>
@/store/modules/user_supplier
