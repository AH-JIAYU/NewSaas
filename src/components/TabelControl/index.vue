<!-- eslint-disable vue/valid-define-props -->
<!-- eslint-disable ts/no-use-before-define -->
<script setup>
import { defineProps, toRefs } from "vue";
import draggable from "vuedraggable";
import useSettingsStore from "@/store/modules/settings";
import { useI18n } from "vue-i18n";

defineOptions({
  name: "TableControl",
});
//全屏
const props = defineProps({
  border: Boolean,
  columns: Array,
  tableAutoHeight: Boolean,
  lineHeight: String,
  stripe: Boolean,
  checkList: Array,
});
const emit = defineEmits([
  "queryData",
  "update:stripe",
  "update:border",
  "update:tableAutoHeight",
  "update:lineHeight",
  "update:checkList",
]);
const ishow = ref(false);
const settingsStore = useSettingsStore();
const { border, columns, tableAutoHeight, lineHeight, stripe, checkList } =
  toRefs(props);
const queryData = () => emit("queryData");
const { t } = useI18n();
function changeStripe(event) {
  // 阻止事件冒泡
  event.stopPropagation();
  // 条纹
  emit("update:stripe", !stripe.value);
}
function changeBorder(event) {
  // 阻止事件冒泡
  event.stopPropagation();
  // 边框
  emit("update:border", !border.value);
}
function changeTableAutoHeight(event) {
  // 阻止事件冒泡
  event.stopPropagation();
  // 高度自适应
  emit("update:tableAutoHeight", !tableAutoHeight.value);
}
function changeRadio(a) {
  // 表格大小
  emit("update:lineHeight", a);
}
function changeCheckbox(a) {
  // 展示列
  emit("update:checkList", a);
}
const dragOptions = computed(() => {
  return {
    animation: 600,
    group: "description",
  };
});
</script>

<template>
  <div>
    <div class="custom-table-right-tools">
      <div v-if="ishow" class="custom-table-right-tools" @click="changeStripe">
        <el-button class="hidden-xs-only button">
          <el-checkbox v-model="stripe" :label="t('tableControl.zebraPattern')" @click.stop />
        </el-button>
        <el-button class="hidden-xs-only button" @click="changeBorder">
          <el-checkbox v-model="border" :label="t('tableControl.borders')" @click.stop />
        </el-button>
        <el-button class="hidden-xs-only button" @click="changeTableAutoHeight">
          <el-checkbox v-model="tableAutoHeight" :label="t('tableControl.adaptive')" @click.stop />
        </el-button>
        <el-button @click="queryData">
          <div class="i-flowbite:refresh-outline h-1.5em w-1.5em" />
        </el-button>
        <el-button @click="settingsStore.setMainPageMaximize()">
          <div class="i-material-symbols:fullscreen h-1.5em w-1.5em" />
        </el-button>
        <el-popover trigger="hover" width="auto">
          <el-radio-group v-model="lineHeight" @change="changeRadio" class="fx-c">
            <el-radio-button value="large">
              {{ t("tableControl.large") }}
            </el-radio-button>
            <el-radio-button value="default">
              {{ t("tableControl.medium") }}
            </el-radio-button>
            <el-radio-button value="small">
              {{ t("tableControl.small") }}
            </el-radio-button>
          </el-radio-group>
          <template #reference>
            <el-button>
              <div class="i-mdi:sort h-1.5em w-1.5em" />
            </el-button>
          </template>
        </el-popover>
        <el-popover popper-class="custom-table-checkbox" trigger="hover">
          <template #reference>
            <el-button style="margin-right: 12px">
              <div class="i-tabler:settings-2 h-1.5em w-1.5em" />
            </el-button>
          </template>
          <el-checkbox-group v-model="checkList" @change="changeCheckbox">
            <!-- draggable：vuedraggable库中的组件  -->
            <draggable item-key="{ element }" :list="JSON.parse(JSON.stringify(columns))" v-bind="dragOptions">
              <template #item="{ element }">
                <div>
                  <el-checkbox :disabled="element.disableCheck" :value="element.prop">
                    {{ element.label }}
                  </el-checkbox>
                </div>
              </template>
            </draggable>
          </el-checkbox-group>
        </el-popover>
      </div>
      <el-button @click="ishow = !ishow">
        <i :class="ishow ? 'i-ep:arrow-right' : 'i-ep:arrow-left'" />
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-table-right-tools {
  display: flex;
  align-items: center;
}

.fx-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  pointer-events: auto;
}

.button * {
  pointer-events: none;
}
</style>
