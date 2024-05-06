<script setup lang="ts">
defineOptions({
  name: 'UserDataExport',
})
import { ElMessage, ElMessageBox } from "element-plus";

const form = ref<Object>({});
const exportDemo = () => { //项目导出

}
const exportID = () => { //id导出

}
</script>

<template>
  <div>
    <PageMain>
      <el-card>
        <el-form label-width="100px" label-position="right">
          <el-divider content-position="left"> 按项目导出会员资料 </el-divider>
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="项目ID／名称">
                <el-input  v-model="form.a"  placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目状态">
                <el-select  v-model="form.b"  placeholder="请选择" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button size="default" type="primary" @click="exportDemo"> 导出 </el-button>
            </el-col>

          </el-row>
          <el-divider content-position="left"> 按会员ID导出资料(站长ID＿会员ID) </el-divider>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="项目ID／名称">
                <el-input v-model="form.c" type="textarea" rows="5" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button size="default" type="primary" @click="exportID"> 导出 </el-button>
            </el-col>

          </el-row>
        </el-form>
      </el-card>
    </PageMain>
  </div>
</template>
<style scoped lang="scss">
:deep {
  .el-divider {
    margin: 20px 0;
  }

  .el-row,
  .el-table {
    width: 94% !important;
    margin: auto !important;
  }
}
</style>
