<script setup lang="ts">
defineOptions({
  name: 'ProjectReview',
})
import { ref } from "vue";

const radio1=ref('')

// 弹框开关变量
const dialogTableVisible = ref(false);
// 提交数据
function onSubmit() {}
// 获取数据
const showEdit = async (row:any) => {
  dialogTableVisible.value = true;
};
// 弹框关闭事件
function closeHandler() {
  // 移除校验
  // formRef.value.resetFields()
  // delete formData.id
  // // 重置表单
  // Object.assign(formData, defaultState)
  dialogTableVisible.value = false
}
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      title="项目审核"
      width="700"
      :before-close="closeHandler"
    >
      <el-divider content-position="left" />
      <el-form ref="form" label-width="80px" :inline="false" >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目编码">
              <el-input
                placeholder=""
                clearable
                @change=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input
                placeholder=""
                clearable
                @change=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-input
                placeholder=""
                clearable
                @change=""
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-radio-group v-model="radio1" class="ml-4">
            <el-radio :value="1" size="large"> 按成功ID </el-radio>
            <el-radio :value="2" size="large"> 按失败ID </el-radio>
            <el-radio :value="3" size="large"> 全部通过 </el-radio>
            <el-radio :value="3" size="large"> 全部失败 </el-radio>
            <el-radio :value="3" size="large"> 数据冻结 </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            placeholder=""
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="结算PO号">
          <el-input
            placeholder=""
            clearable
            @change=""
          />
        </el-form-item>
        <el-form-item label="通过ID">
          <el-input
            placeholder=""
            clearable
            @change=""
            :rows="5"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="修改价格">
          <el-input-number
            class="mx-4"
            :min="1"
            :max="100"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
          <el-button @click="dialogTableVisible = false"> 取消 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
