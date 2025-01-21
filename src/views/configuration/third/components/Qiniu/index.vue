
<script setup lang="ts">
import api from "@/api/modules/third";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules, UploadProps } from "element-plus";
defineOptions({
  name: "Qiniu",
});
const activeName = ref("first");
//阿里云
const form1 = ref<any>({
  accessKeyId: "", //阿里云OSS访问密钥ID
  accessKeySecret: "", //阿里云OSS访问密钥
  bucketName: "", //阿里云OSS存储桶名称
  activeState: 0,
  domain: "", //阿里云OSS存储桶域名
  region: "", //阿里云OSS存储区域
});
//七牛云

const form2 = ref<any>({
  accessKey: "",
  secretKey: "",
  bucket: "", //七牛云存储bucket
  activeState: 0,
  domain: "", //七牛云存储域名
});
const validateNumber = (rule: any, value: any, callback: any) => {
  const regex = /[\u4e00-\u9fa5]/; // 匹配汉字的正则表达式
  if (regex.test(value)) {
    callback(new Error("不能输入汉字"));
  } else {
    callback();
  }
};
// 校验
const formRules1 = ref<FormRules>({
  accessKeyId: [
    { required: true, message: "请输入阿里云AccessKeyId", trigger: "blur" },
    { validator: validateNumber, trigger: "blur" },
  ],
  accessKeySecret: [
    {
      required: true,
      trigger: "blur",
      message: "请输入阿里云AccessKeySecret",
    },
    { validator: validateNumber, trigger: "blur" },
  ],
});
const formRules2 = ref<FormRules>({
  appId: [
    { required: true, message: "请输入七牛云appId", trigger: "blur" },
    { validator: validateNumber, trigger: "blur" },
  ],
  accessKey: [
    { required: true, message: "请输入七牛云AccessKeyId", trigger: "blur" },
    { validator: validateNumber, trigger: "blur" },
  ],
  secretKey: [
    {
      required: true,
      trigger: "blur",
      message: "请输入七牛云AccessKeySecret",
    },
    { validator: validateNumber, trigger: "blur" },
  ],
});
const formRef1 = ref();
const formRef2 = ref();
const onSubmit1 = () => {
  formRef1.value &&
    formRef1.value.validate(async (valid: any) => {
      if (valid) {
        try {
          form1.value.activeState =
            form1.value.activeState == 1 ? form1.value.activeState : "0";
          const res = await api.updateAliConfig(form1.value);
          if (res.status === 1) {
            getDataList();
            ElMessage.success({
              message: "修改成功",
              center: true,
            });
          }
        } catch (error) {
          console.log("error", error);
        } finally {
        }
      }
    });
};
const onSubmit2 = () => {
  formRef2.value &&
    formRef2.value.validate(async (valid: any) => {
      if (valid) {
        try {
          form2.value.activeState =
            form2.value.activeState == 1 ? form2.value.activeState : "0";
          const res = await api.updateQiniuConfig(form2.value);
          if (res.status === 1) {
            getDataList();
            ElMessage.success({
              message: "修改成功",
              center: true,
            });
          }
        } catch (error) {
          console.log("error", error);
        } finally {
        }
      }
    });
};
onMounted(() => {
  getDataList();
});
// 获取数据
async function getDataList() {
  try {
    const { data, status } = await api.getConfigList();

    if (data && status === 1) {
      if (data.aliCloudOssConfig && data.aliCloudOssConfig != null) {
        form1.value = data.aliCloudOssConfig;
      }
      if (data.qiniuOssConfig && data.qiniuOssConfig != null) {
        form2.value = data.qiniuOssConfig;
      }
    }
  } catch (error) {
  } finally {
  }
}
</script>

<template>
  <div style="margin-left: 30px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="阿里云配置" name="first">
        <el-row :gutter="20">
          <ElForm
            :model="form1"
            ref="formRef1"
            label-width="150px"
            label-position="right"
            :inline="false"
            :rules="formRules1"
          >
            <ElFormItem label="是否启用:">
              <ElSwitch
                v-model="form1.activeState"
                active-value="1"
                inactive-value="0"
              />
            </ElFormItem>

            <ElFormItem label="AccessKeyId:" prop="accessKeyId">
              <ElInput
                v-model="form1.accessKeyId"
                placeholder="请输入阿里云AccessKeyId"
                style="width: 22.4375rem"
              />
            </ElFormItem>

            <ElFormItem label="AccessKeySecret:" prop="accessKeySecret">
              <ElInput
                v-model="form1.accessKeySecret"
                placeholder="请输入阿里云AccessKeySecret"
                style="width: 22.4375rem"
              />
            </ElFormItem>

            <ElFormItem label="空间名称:">
              <ElInput
                v-model="form1.bucketName"
                placeholder="请输入阿里云空间名称"
                style="width: 22.4375rem"
              />
            </ElFormItem>

            <ElFormItem label="空间域名:">
              <ElInput
                v-model="form1.domain"
                placeholder="请输入阿里云空间域名"
                style="width: 22.4375rem"
              />
            </ElFormItem>

            <ElFormItem label="空间区域:">
              <ElInput
                v-model="form1.region"
                placeholder="请输入阿里云空间区域"
                style="width: 22.4375rem"
              />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" @click="onSubmit1"> 确定 </ElButton>
              <!-- <ElButton>取消</ElButton> -->
            </ElFormItem>
          </ElForm>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="七牛云配置" name="second">
        <el-row :gutter="20">
          <ElForm
            :model="form2"
            label-width="150px"
            label-position="right"
            :inline="false"
            ref="formRef2"
            :rules="formRules2"
          >
            <ElFormItem label="是否启用:">
              <ElSwitch
                v-model="form2.activeState"
                active-value="1"
                inactive-value="0"
              />
            </ElFormItem>
            <ElFormItem label="AccessKeyId:" prop="accessKey">
              <ElInput
                v-model="form2.accessKey"
                placeholder="请输入七牛云AccessKeyId"
                style="width: 22.4375rem"
              />
            </ElFormItem>
            <ElFormItem label="AccessKeySecret:" prop="secretKey">
              <ElInput
                v-model="form2.secretKey"
                placeholder="请输入七牛云AccessKeySecret"
                style="width: 22.4375rem"
              />
            </ElFormItem>
            <ElFormItem label="空间名称:">
              <ElInput
                v-model="form2.bucket"
                placeholder="请输入七牛云存储空间"
                style="width: 22.4375rem"
              />
            </ElFormItem>
            <ElFormItem label="空间域名:">
              <ElInput
                v-model="form2.domain"
                placeholder="请输入七牛云存储域名"
                style="width: 22.4375rem"
              />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" @click="onSubmit2"> 确定 </ElButton>
              <!-- <ElButton>取消</ElButton> -->
            </ElFormItem>
          </ElForm>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
// 样式
</style>
