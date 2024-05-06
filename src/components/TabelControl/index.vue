<!-- eslint-disable vue/valid-define-props -->
<!-- eslint-disable ts/no-use-before-define -->
<script setup>
import { defineProps, toRefs } from 'vue'
// import VabDraggable from 'vuedraggable'

defineOptions({
  name: 'TableControl',
})
const props = defineProps({
  border: Boolean,
  columns: Array,
  isFullscreen: Boolean,
  lineHeight: String,
  stripe: Boolean,
  checkList: Array,
})
const emit = defineEmits(['clickFullScreen', 'queryData', 'update:stripe', 'update:border', 'update:lineHeight', 'update:checkList'])
const { border, columns, isFullscreen, lineHeight, stripe, checkList } = toRefs(props)
const clickFullScreen = () => emit('clickFullScreen')
const queryData = () => emit('queryData')
function changeStripe() {
  emit('update:stripe', !stripe.value)
}
function changeBorder() {
  emit('update:border', !border.value)
}
function changeRadio(a) {
  emit('update:lineHeight', a)
}
function changeCheckbox(a) {
  emit('update:checkList', a)

  // emit('update:lineHeight', a)
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
      <el-button class="hidden-xs-only" @click="changeStripe">
        <el-checkbox v-model="stripe" label="斑马纹" />
      </el-button>
      <el-button class="hidden-xs-only" @click="changeBorder">
        <el-checkbox v-model="border" label="边框" />
      </el-button>
      <el-button @click="queryData">
        <div class="i-flowbite:refresh-outline h-1.5em w-1.5em" />
      </el-button>
      <el-button @click="clickFullScreen">
        <div class="i-material-symbols:fullscreen h-1.5em w-1.5em" />
      </el-button>
      <el-popover trigger="hover" :width="162">
        <el-radio-group v-model="lineHeight" @change="changeRadio">
          <el-radio-button label="large">
            大
          </el-radio-button>
          <el-radio-button label="default">
            中
          </el-radio-button>
          <el-radio-button label="small">
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
          <el-button>
            <div class="i-tabler:settings-2 h-1.5em w-1.5em" />
          </el-button>
        </template>
        <el-checkbox-group v-model="checkList" @change="changeCheckbox">
          <!-- <VabDraggable item-key="{ element }" :list="JSON.parse(JSON.stringify(columns))" v-bind="dragOptions"> -->
            <template #item="{ element }">
              <div>
                <el-checkbox :disabled="element.disableCheck" :label="element.prop">
                  {{ element.label }}
                </el-checkbox>
              </div>
            </template>
          <!-- </VabDraggable> -->
        </el-checkbox-group>
      </el-popover>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-table-right-tools {
  display: flex;
  align-items: center;
}
</style>
