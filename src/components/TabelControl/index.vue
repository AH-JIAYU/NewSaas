<!-- eslint-disable vue/valid-define-props -->
<!-- eslint-disable ts/no-use-before-define -->
<script setup>
import { defineProps, toRefs } from 'vue'
import draggable from 'vuedraggable'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'TableControl',
})
//全屏
const props = defineProps({
  border: Boolean,
  columns: Array,
  tableAutoHeight: Boolean,
  lineHeight: String,
  stripe: Boolean,
  checkList: Array,
})
const emit = defineEmits([
  'queryData',
  'update:stripe',
  'update:border',
  'update:tableAutoHeight',
  'update:lineHeight',
  'update:checkList',
])
const ishow = ref(false)
const settingsStore = useSettingsStore()
const { border, columns, tableAutoHeight, lineHeight, stripe, checkList }
  = toRefs(props)
const queryData = () => emit('queryData')
function changeStripe() {
  // 条纹
  emit('update:stripe', !stripe.value)
}
function changeBorder() {
  // 边框
  emit('update:border', !border.value)
}
function changeTableAutoHeight() {
  // 高度自适应
  emit('update:tableAutoHeight', !tableAutoHeight.value)
}
function changeRadio(a) {
  // 表格大小
  emit('update:lineHeight', a)
}
function changeCheckbox(a) {
  // 展示列
  emit('update:checkList', a)
}
const dragOptions = computed(() => {
  return {
    animation: 600,
    group: 'description',
  }
})
</script>

<template>
  <div>
    <div class="custom-table-right-tools">
      <div v-if="ishow" class="custom-table-right-tools">
        <el-button class="hidden-xs-only" @click="changeStripe">
          <el-checkbox v-model="stripe" label="斑马纹" />
        </el-button>
        <el-button class="hidden-xs-only" @click="changeBorder">
          <el-checkbox v-model="border" label="边框" />
        </el-button>
        <el-button class="hidden-xs-only" @click="changeTableAutoHeight">
          <el-checkbox v-model="tableAutoHeight" label="表格高度自适应" />
        </el-button>
        <el-button @click="queryData">
          <div class="i-flowbite:refresh-outline h-1.5em w-1.5em" />
        </el-button>
        <el-button @click="settingsStore.setMainPageMaximize()">
          <div class="i-material-symbols:fullscreen h-1.5em w-1.5em" />
        </el-button>
        <el-popover trigger="hover" :width="162">
          <el-radio-group v-model="lineHeight" @change="changeRadio">
            <el-radio-button value="large">
              大
            </el-radio-button>
            <el-radio-button value="default">
              中
            </el-radio-button>
            <el-radio-button value="small">
              小
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
            <el-button style="margin-right: 12px;">
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
</style>
