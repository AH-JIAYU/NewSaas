<script setup lang="ts">
import sort from './sort.vue'
import storage from "@/utils/storage";
defineOptions({
  name: 'FormSearch',
})

// 表单筛选配置项  表单绑定值
const props = defineProps<any>(['formSearchList', 'model','formSearchName'])
const emits = defineEmits(['current-change', 'on-reset'])
const sortRef=ref<any>()//排序组件ref
const formSearchList=ref<any>([])

// 筛选
const currentChange = () => {
  emits('current-change')
}
// 重置
const onReset = () => {
  emits('on-reset')
}
const chagneFormSearchList=(list:any)=>{
  formSearchList.value=list
}
// 排序
const onSort=()=>{
  // 先看本地有没有，没有走默认值
  sortRef.value.showEdit(
    // @ts-ignore
    JSON.parse(storage.local.get(props.formSearchName) ) ?? formSearchList.value,
    props.formSearchName
    )
}
watch(
  () => props.formSearchList,
  (newVal, oleVal) => {
    // @ts-ignore
    formSearchList.value = JSON.parse(storage.local.get(props.formSearchName) ) ?? newVal
  },
  { deep: true }
)

</script>
<template>
  <div>
  <SearchBar :show-toggle="false">
    <template #default="{ fold, toggle }">
      <el-form :model="props.model" size="default" label-width="100px" inline-message inline class="search-form">
        <template v-for="item in formSearchList" :key="item.modelName">
          <el-form-item label="" v-if="item.show">
            <el-input v-if="item.type === 'input'" v-model="props.model[item.modelName]" clearable
              :placeholder="item.placeholder" @keydown.enter="currentChange()" />
            <el-select v-if="item.type === 'select'" v-model="props.model[item.modelName]" clearable
              :placeholder="item.placeholder" @keydown.enter="currentChange()">
              <ElOption v-for="ite in item.option" :label="ite[item.optionLabel]" :value="ite[item.optionValue]">
              </ElOption>
            </el-select>
            <el-date-picker v-if="item.type === 'datetimerange'" v-model="props.model[item.modelName]"
              type="datetimerange" range-separator="-" :start-placeholder="item.startplaceholder"
              :end-placeholder="item.endplaceholder" value-format="YYYY-MM-DD HH:mm:ss" size="" style="width: 192px"
              clear-icon="true" />
          </el-form-item>
        </template>
        <ElFormItem>
          <ElButton type="primary" @click="currentChange()">
            <template #icon>
              <SvgIcon name="i-ep:search" />
            </template>
            筛选
          </ElButton>
          <ElButton @click="onReset">
            <template #icon>
              <div class="i-grommet-icons:power-reset h-1em w-1em" />
            </template>
            重置
          </ElButton>
          <ElButton type="primary" @click="onSort" v-if="formSearchList?.length >= 6">
            <template #icon>
              <SvgIcon name="i-ep:search" />
            </template>
            排序
          </ElButton>
          <ElButton link @click="toggle">
            <template #icon>
              <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
            </template>
            {{ fold ? "展开" : "收起" }}
          </ElButton>
        </ElFormItem>
      </el-form>
    </template>
  </SearchBar>
  <sort ref="sortRef" :formSearchName="formSearchName" @chagneFormSearchList="chagneFormSearchList"/>
</div>
</template>
<style lang="scss" scoped>
.search-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  margin-bottom: -18px;

  :deep(.el-form-item) {
    grid-column: auto / span 1;

    &:last-child {
      grid-column-end: -1;

      .el-form-item__content {
        justify-content: flex-end;
      }
    }
  }
}
</style>
