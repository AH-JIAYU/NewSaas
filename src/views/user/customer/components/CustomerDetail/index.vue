<script setup lang="ts">
import customerDetailDetail from '../CustomerDetailDetail/index.vue'
import { ref } from 'vue'

const emit = defineEmits(['fetch-data'])
const drawerisible = ref<boolean>(false)
const checkRef = ref<any>()
const title = ref<string>('详情')
async function showEdit(row: any) {
  drawerisible.value = true
}
function handleCheck(row: object) {
  checkRef.value.showEdit(row)
}
function close() {
  emit('fetch-data')
  drawerisible.value = false
}
const list: Array<object> = [
  { a: 1, b: 2, c: 3, id: 1 },
  { a: 1, b: 2, c: 3, id: 1 },
]
defineExpose({
  showEdit,
})
</script>

<template lang="">
  <el-drawer
    v-model="drawerisible"
    append-to-body
    :close-on-click-modal="false"
    destroy-on-close
    draggable
    size="60%"
    :title="title"
    @close="close"
  >
  <el-card>
    <el-form   label-width="100px" label-position="right"  >
    <el-divider content-position="left">
      基本信息
    </el-divider>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-form-item label="客户编码">
          <el-input  disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客户名称">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客户简称">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="公司名称">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客户姓名">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="手机号码">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="电子邮箱">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建人">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建时间">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="负责人">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="结算周期">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider content-position="left">
      权限信息
    </el-divider>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-form-item label="风险控制">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="营业限额/月">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="审核率Min值">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="风险控制">
          <el-input disabled placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider content-position="left">
      操作日志
    </el-divider>

    <el-table :data="list" stripe border  >
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="a" label="操作时间" />
      <el-table-column prop="b" label="操作人" />
      <el-table-column prop="c" label="操作事项" />
      <el-table-column label="详情">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleCheck(row)">
            详情
          </el-button>
        </template>
</el-table-column>
</el-table>
<customerDetailDetail ref="checkRef" />

</el-form>
</el-card>
</el-drawer>
</template>

<style scoped lang="scss">
:deep {
  .el-divider {
    margin: 20px 0;
  }

  .el-drawer__header {
    border-bottom: 1px solid #aaa !important;
  }

  .el-row,
  .el-table {
    width: 94% !important;
    margin: auto !important;
  }
}
</style>
