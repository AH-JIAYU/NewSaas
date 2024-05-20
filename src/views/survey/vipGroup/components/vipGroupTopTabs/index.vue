<script lang="ts" setup>
import { ElForm } from 'element-plus'

import { defineProps, ref } from 'vue'
// 如果希望默认展示第一个 Tab
const props = defineProps({
  leftTab: Object,
  tabIndex: Number,
})

const emit = defineEmits(['setClient'])
const isShow = ref(false)
const isTrue = ref(true)
const activeName = ref('basicSettings')
function showEdit() {
  isShow.value = true
}
defineExpose({ showEdit })

// 使用 InstanceType 来获取 ElForm 实例的类型
const formRef = ref(null)
// 注入主组件中的提供者
const localToptTab = ref<any>(props.leftTab)
</script>

<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础设置" name="basicSettings">
        <ElForm ref="formRef" label-width="100px">
          <el-card class="box-card">
            <template #header>
              基本信息
            </template>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="会员组名称" prop="name" style="float: left; width: 18.5rem">
                  <el-input v-model="localToptTab.name" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8" />
              <el-col :span="8" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="组状态" prop="client_pid" style="float: left; width: 18.5rem">
                  <el-switch v-model="isTrue" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="接单授权" prop="name" style="float: left; width: 18.5rem">
                  <el-switch v-model="isTrue" />
                </el-form-item>
              </el-col>
              <el-col :span="8" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="组成员" prop="name" style="float: left; width: 18.5rem">
                  <el-cascader placeholder="模糊搜索" clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item prop="name" style="float: left; width: 39rem">
                  <el-input type="textarea" :rows="5" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item style="float: left; width: 18.5rem" label="组长" prop="top">
                  <el-select placeholder="模糊搜索" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item style="float: left; width: 18.5rem" label="小组长" prop="top">
                  <el-select placeholder="模糊搜索" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </ElForm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">

</style>
