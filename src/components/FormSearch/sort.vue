<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import Sortable from "sortablejs";
import storage from "@/utils/storage";
import useFormSearchStore from '@/store/modules/formSearch' // 筛选项配置
defineOptions({
  name: 'FormSearchSort',
})
const emits = defineEmits(['chagne-form-search-list'])
const FormSearchStore = useFormSearchStore(); //筛选项配置
const data = ref<any>({
  dialogTableVisible: false,// 罩层
  formSearchList: [],// 表单筛选
  formSearchSelectList: [],// 表单筛选选中
  formSearchName: '',//name
})
// 对比原始搜索数据
const copyformSearchList = ref<any>([])

// 表单筛选配置项  表单绑定值
const showEdit = (list: any, name: string, copy: any) => {
  copyformSearchList.value = copy
  data.value.dialogTableVisible = true
  data.value.formSearchName = name
  const copyList = cloneDeep(list)
  // 选中的筛选项 按当前顺序过滤出来
  data.value.formSearchSelectList = copyList.filter((item: any) => item.show)
  // 全部筛选项还按初始的顺序排
  data.value.formSearchList = copyList.sort((a: any, b: any) => a.index - b.index);

  nextTick(() => {
    const grid: any = document.querySelector(".tagGrid");
    //sortable对象
    new Sortable(grid, {
      animation: 150,
      handle: ".gridItem", //对grid的子对象中，带有.grid-item启动拖拽效果
      onEnd: (evt) => {
        // 通过index更改数据，获取拖拽排序之后的数据
        const changeData = data.value.formSearchSelectList.splice(evt.oldIndex || 0, 1)
        data.value.formSearchSelectList.splice(evt.newIndex || 0, 0, changeData[0])
      }
    });
  })
}
// 改变选中值
const onChangeShow = (val: any) => {
  val.show = !val.show
  if (val.show) {
    data.value.formSearchSelectList.push(val)
  } else {
    const findInex = data.value.formSearchSelectList.findIndex((item: any) => item.modelName === val.modelName)
    data.value.formSearchSelectList.splice(findInex, 1)
  }
}

// 提交
const onSubmit = () => {
  const showFalseList = data.value.formSearchList.filter((item: any) => !item.show)//未选中
  const setLocalFormSearchList = cloneDeep(data.value.formSearchSelectList) //选中
  setLocalFormSearchList.push(...showFalseList)//保存的筛选项
  const params = {
    searchType: data.value.formSearchName,
    addSearchUserInfoList: setLocalFormSearchList
  }
  params.addSearchUserInfoList = setLocalFormSearchList.map((item: any) => {
    copyformSearchList.value.value.forEach((ite: any) => {
      if (item.modelName === ite.modelName) {
        // 在这里直接修改原始 item，或者返回新对象
        item = {
          ...item,
          multiple: ite.multiple ? true : false,
        };
      }
    });
    return item;  // 返回修改后的 item
  });
  // 存本地
  FormSearchStore.updateFormSearchConfig(params)
  data.value.dialogTableVisible = false
  emits('chagne-form-search-list', setLocalFormSearchList)
}

defineExpose({ showEdit })
</script>

<template>
  <div>
    <el-drawer v-model="data.dialogTableVisible" append-to-body destroy-on-close draggable size="50%">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass" style="display:flex;justify-content:start;align-items:center">
          设置筛选项 &ensp;
          <el-button round type="primary" size="default" @click="onSubmit">保存</el-button>
        </h4>
      </template>
      <p class="Big">全部筛选项 <span class="Small"> 不被选中的筛选项将会被 </span> </p>
      <div class="grid"><el-button :type="item.show ? 'primary' : ''" v-for="item in data.formSearchList"
          @click="onChangeShow(item)">{{ item.placeholder ??
      `${item.startPlaceHolder}-${item.endPlaceHolder}` }}</el-button>
      </div>
      <p class="Big">展示效果 <span class="Small"> 长按筛选项，可拖拽调整展示顺序 </span> </p>
      <div class="grid tagGrid">
        <template v-for="item in data.formSearchSelectList" :key="item.modelName">
          <el-tag v-if="item.show" class="gridItem" closable type="primary" @close="onChangeShow(item)"
            style="cursor: pointer;">
            {{ item.placeholder ?? `${item.startPlaceHolder}-${item.endPlaceHolder}` }}
          </el-tag>
        </template>

      </div>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-bottom: -18px;

  :deep(.el-button) {
    grid-column: auto / span 1;
    margin: 0 16px 16px 0;
    height: 32px;
  }

  :deep(.el-tag) {
    grid-column: auto / span 1;
    margin: 0 16px 16px 0;
    height: 32px;
  }
}

.Big {
  font-weight: 700;
  color: #333333;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 16px 0;
}

.Small {
  font-size: 12px;
  color: #777777;
  margin-left: 5px;
}
</style>
