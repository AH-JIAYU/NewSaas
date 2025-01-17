<route lang="yaml">
  meta:
    enabled: false
  </route>
<script setup lang="ts">
defineOptions({
  name: "Shortmsg",
});
const activeName = ref("first");
const form1 = reactive({
  accessKeyId: "",
  accessKeySecret: "",
  open: false,
  sign: "",
});

const form2 = reactive({
  appId: "",
  accessKeyId: "",
  accessKeySecret: "",
  open: false,
  sign: "",
  area: "",
});
const onSubmit = () => {};
</script>

<template>
  <div style="margin-left: 30px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="阿里云配置" name="first">
        <ElForm
          :model="form1"
          label-width="120px"
          label-position="right"
          :inline="false"
        >
          <el-row :gutter="20">
            <el-col :span="24">
              <ElFormItem label="是否启用:">
                <ElSwitch v-model="form1.open" />
              </ElFormItem>
            </el-col>
            <el-col :span="24">
              <ElFormItem label="AccessKeyId:">
                <ElInput
                  v-model="form1.accessKeyId"
                  placeholder="请输入阿里云AccessKeyId"
                  style="width: 22.4375rem"
                />
              </ElFormItem>
            </el-col>
            <el-col :span="24">
              <ElFormItem label="AccessKeySecret:">
                <ElInput
                  v-model="form1.accessKeySecret"
                  placeholder="请输入阿里云AccessKeySecret"
                  style="width: 22.4375rem"
                />
              </ElFormItem>
            </el-col>
            <el-col :span="24">
              <ElFormItem label="短信签名:">
                <ElInput
                  v-model="form1.sign"
                  placeholder="短信签名"
                  style="width: 22.4375rem"
                />
              </ElFormItem>
            </el-col>
            <el-col :span="24">
              <ElButton type="primary" @click="onSubmit"> 确定 </ElButton>
              <ElButton>取消</ElButton>
            </el-col>
          </el-row>
        </ElForm>
      </el-tab-pane>
      <el-tab-pane label="腾讯云配置" name="second">
        <ElRow >
          <ElCol>
            <ElForm :model="form2"    label-width="120px"
          label-position="right"
          :inline="false" >
              <ElFormItem label="是否启用:">
                <ElSwitch v-model="form2.open" />
              </ElFormItem>
              <ElFormItem label="SKD AppID:">
                <ElInput
                  v-model="form2.appId"
                  placeholder="请输入腾讯云SKD AppID"
                      style="width: 22.4375rem"
                />
              </ElFormItem>
              <ElFormItem label="AccessKeyId:">
                <ElInput
                  v-model="form2.accessKeyId"
                  placeholder="请输入腾讯云AccessKeyId"
                      style="width: 22.4375rem"
                />
              </ElFormItem>
              <ElFormItem label="AccessKeySecret:">
                <ElInput
                  v-model="form2.accessKeySecret"
                  placeholder="请输入腾讯云AccessKeySecret"
                      style="width: 22.4375rem"
                />
              </ElFormItem>
              <ElFormItem label="腾讯云短信签名:">
                <ElInput v-model="form2.sign" placeholder="腾讯云短信签名"     style="width: 22.4375rem"/>
              </ElFormItem>
              <ElFormItem label="短信区域:">
                <ElInput v-model="form2.area" placeholder="短信区域"     style="width: 22.4375rem"/>
              </ElFormItem>
              <ElFormItem>
                <ElButton type="primary" @click="onSubmit"> 确定 </ElButton>
                <ElButton>取消</ElButton>
              </ElFormItem>
            </ElForm>
          </ElCol>
        </ElRow>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
// 样式
</style>
