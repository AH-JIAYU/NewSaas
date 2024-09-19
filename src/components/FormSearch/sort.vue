<script setup lang="ts">
import { cloneDeep } from "lodash-es";
import Sortable from "sortablejs";
import storage from "@/utils/storage";
defineOptions({
  name: 'FormSearchSort',
})
const emits=defineEmits(['chagne-form-search-list'])

const data=ref<any>({
  dialogTableVisible:false,// 罩层
  formSearchList:[],// 表单筛选
  formSearchSelectList:[],// 表单筛选选中
  formSearchName:'',//name
})

  // 表单筛选配置项  表单绑定值
const showEdit=(list:any,name:string)=>{
data.value.dialogTableVisible=true
data.value.formSearchName=name
const copyList=cloneDeep(list)
// 全部筛选项还按初始的顺序排
data.value.formSearchSelectList=copyList.filter((item:any)=>item.show)
data.value.formSearchList=copyList.sort((a:any,b:any)=>a.index-b.index);

 nextTick(() => {
  const grid = document.querySelector(".tagGrid");
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
const onChangeShow=(val:any)=>{
  val.show=!val.show
  if(val.show){
    data.value.formSearchSelectList.push(val)
  }else{
    const findInex= data.value.formSearchSelectList.findIndex((item:any)=>item.modelName===val.modelName)
    data.value.formSearchSelectList.splice(findInex, 1)
  }
}

const onSubmit=()=>{
const showFalseList=data.value.formSearchList.filter((item:any)=>!item.show)
const setLocalFormSearchList=cloneDeep(data.value.formSearchSelectList)
setLocalFormSearchList.push(...showFalseList)
// 存本地
  storage.local.set(data.value.formSearchName,JSON.stringify(setLocalFormSearchList))
  data.value.dialogTableVisible=false
  emits('chagne-form-search-list',setLocalFormSearchList)
}


 defineExpose({showEdit})
</script>

<template>
<div>
  <el-drawer v-model="data.dialogTableVisible"   append-to-body   destroy-on-close draggable size="50%">
   <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass" style="display:flex;justify-content:start;align-items:center">
        设置筛选项 &ensp;
        <el-button round type="primary" size="default" @click="onSubmit">保存</el-button>
       </h4>
    </template>
    <p class="Big">全部筛选项 <span class="Small" > 不被选中的筛选项将会被隐藏 </span> </p>
    <div class="grid"><el-button :type="item.show?'primary':''" v-for="item in data.formSearchList" @click="onChangeShow(item)">{{item.placeholder?? `${item.startplaceholder}-${item.endplaceholder}`}}</el-button></div>
    <p class="Big">展示效果 <span class="Small" > 长按筛选项，可拖拽调整展示顺序 </span> </p>
    <div class="grid tagGrid">
      <template  v-for="item in data.formSearchSelectList"  :key="item.modelName" >
        <el-tag v-if="item.show" class="gridItem"closable   type="primary" @close="onChangeShow(item)">
        {{item.placeholder?? `${item.startplaceholder}-${item.endplaceholder}`}}
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
    margin: 0 16px 16px 0 ;
    height:32px;
  }
  :deep(.el-tag) {
    grid-column: auto / span 1;
    margin: 0 16px 16px 0 ;
    height:32px;
  }
}

.Big {
  font-weight: 700;
  color: #333333;
  display:flex;
  justify-content:start;
  align-items:center;
  margin:16px 0;
}

.Small {
  font-size: 12px;
  color: #949494;
  margin-left:5px;
}

</style>
