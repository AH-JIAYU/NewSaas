<script setup lang="ts">
defineOptions({
  name: 'Edit',
})
import { ref } from "vue";
// 弹框开关变量
const dialogTableVisible = ref(false);
const total = ref();
const fileList=ref([]) //上传
// 提交数据
function onSubmit() { }
// 父级传递数据
const showEdit = async (row:any) => {
  total.value = row.length;
  dialogTableVisible.value = true
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
// 暴露方法
defineExpose({ showEdit });
</script>
<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible"
      title="编辑"
      direction="rtl"
      :before-close="closeHandler"
      size="40%"
    >
      <el-divider content-position="left" />
      <el-form label-width="80px" :inline="false">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目ID">
              <el-input placeholder="" clearable @change=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input placeholder="" clearable @change=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-input placeholder="" clearable @change="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-upload v-model:file-list="fileList" class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"  list-type="picture">
          <el-button type="primary">上传</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
          <el-button @click="dialogTableVisible = false"> 取消 </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
