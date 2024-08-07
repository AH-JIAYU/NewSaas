<script setup lang="ts">
defineOptions({
  name: 'UserDataExport',
})

const form = ref<any>({
  a: '',
  b: '',
  c: '',
})
function exportDemo() {
  // 项目导出
}
function exportID() {
  // id导出
}
</script>

<template>
  <div>
    <PageMain>
      <el-form  label-position="right">
        <el-card>
          <template #header>
            按项目导出会员资料
          </template>
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="项目ID/名称">
                <el-input v-model="form.a" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目状态">
                <el-select
                  v-model="form.b"
                  placeholder="请选择"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button size="default" type="primary" @click="exportDemo">
                导出
              </el-button>
            </el-col>
          </el-row>
        </el-card>

        <el-card>
          <template #header>
            按会员ID导出资料(站长ID＿会员ID)
          </template>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="项目ID/名称">
                <el-input
                  v-model="form.c"
                  type="textarea"
                  :rows="5"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button size="default" type="primary" @click="exportID">
                导出
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
    </PageMain>
  </div>
</template>

<style scoped lang="scss">
:deep {
  .el-col{
    padding-left: 0 !important;
  }
  .el-divider {
    margin:  0;
  }
  .el-card{
    margin-bottom: 10px;
  }

  .el-row,
  .el-table {
    width: 94% !important;
    margin: 0 !important;
  }
}
</style>
