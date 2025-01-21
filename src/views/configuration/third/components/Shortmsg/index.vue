
<script setup lang="ts">
import api from "@/api/modules/third";
import type { FormInstance, FormRules, UploadProps } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
defineOptions({
  name: "Shortmsg",
});
const activeName = ref("first");
//阿里云
const form1 = ref<any>({
  accessKey: "",
  secretKey: "",
  templateId: "", //模版id
  activeState: 0,
  signName: "", //签名
});
// 校验
const formRules1 = ref<FormRules>({
  accessKey: [
    { required: true, message: "请输入阿里云AccessKeyId", trigger: "blur" },
    {
      pattern: /^[A-Za-z0-9]*$/,
      message: "请输入字母、数字",
      trigger: "blur",
    },
  ],
  secretKey: [
    {
      required: true,
      trigger: "blur",
      message: "请输入阿里云AccessKeySecret",
    },
    {
      pattern: /^[A-Za-z0-9]*$/,
      message: "请输入字母、数字",
      trigger: "blur",
    },
  ],
});
const formRules2 = ref<FormRules>({
  appId: [
    { required: true, message: "请输入腾讯云appId", trigger: "blur" },
    {
      pattern: /^[A-Za-z0-9]*$/,
      message: "请输入字母、数字",
      trigger: "blur",
    },
  ],
  accessKey: [
    { required: true, message: "请输入腾讯云AccessKeyId", trigger: "blur" },
    {
      pattern: /^[A-Za-z0-9]*$/,
      message: "请输入字母、数字",
      trigger: "blur",
    },
  ],
  secretKey: [
    {
      required: true,
      trigger: "blur",
      message: "请输入腾讯云AccessKeySecret",
    },
    {
      pattern: /^[A-Za-z0-9]*$/,
      message: "请输入字母、数字",
      trigger: "blur",
    },
  ],
});
//腾讯云
const form2 = ref<any>({
  appId: "",
  accessKey: "",
  secretKey: "",
  activeState: 0,
  signName: "", //签名
  // area:'', //短信区域
});
onMounted(() => {
  getDataList();
});
// 获取数据
async function getDataList() {
  try {
    const { data, status } = await api.smsGetConfigList();

    if (data && status === 1) {
      if (data.aliSmsConfig && data.aliSmsConfig != null) {
        form1.value = data.aliSmsConfig;
      }
      if (data.tencentSmsConfig && data.tencentSmsConfig != null) {
        form2.value = data.tencentSmsConfig;
      }
    }
  } catch (error) {
  } finally {
  }
}
const formRef1 = ref();
const formRef2 = ref();
const onSubmit1 = () => {
  formRef1.value &&
    formRef1.value.validate(async (valid: any) => {
      if (valid) {
        try {
          form1.value.activeState =
            form1.value.activeState == 1 ? form1.value.activeState : "0";
          const res = await api.smsUpdateAliConfig(form1.value);
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
        form2.value.activeState =
          form2.value.activeState == 1 ? form2.value.activeState : "0";

        try {
          const res = await api.smsUpdateTencentConfig(form2.value);
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
</script>

<template>
  <div style="margin-left: 30px">
    <el-tabs v-model="activeName">
      <el-tab-pane label="阿里云配置" name="first">
        <el-row :gutter="20">
          <ElForm
            :model="form1"
            label-width="150px"
            label-position="right"
            :inline="false"
            ref="formRef1"
            :rules="formRules1"
          >
            <ElFormItem label="是否启用:">
              <ElSwitch
                v-model="form1.activeState"
                active-value="1"
                inactive-value="0"
              />
            </ElFormItem>

            <ElFormItem label="AccessKeyId:" prop="accessKey">
              <ElInput
                v-model="form1.accessKey"
                placeholder="请输入阿里云AccessKeyId"
                style="width: 22.4375rem"
              />
            </ElFormItem>

            <ElFormItem label="AccessKeySecret:" prop="secretKey">
              <ElInput
                v-model="form1.secretKey"
                placeholder="请输入阿里云AccessKeySecret"
                style="width: 22.4375rem"
              />
            </ElFormItem>

            <ElFormItem label="templateId:">
              <ElInput
                v-model="form1.templateId"
                placeholder="请输入阿里云templateId"
                style="width: 22.4375rem"
              />
            </ElFormItem>

            <ElFormItem label="短信签名:">
              <ElInput
                v-model="form1.signName"
                placeholder="短信签名"
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
      <el-tab-pane label="腾讯云配置" name="second">
        <el-row :gutter="20">
          <ElForm
            :model="form2"
            label-width="150px"
            ref="formRef2"
            label-position="right"
            :inline="false"
            :rules="formRules2"
          >
            <ElFormItem label="是否启用:">
              <ElSwitch
                v-model="form2.activeState"
                active-value="1"
                inactive-value="0"
              />
            </ElFormItem>
            <ElFormItem label="SKD AppID:" prop="appId">
              <ElInput
                v-model="form2.appId"
                placeholder="请输入腾讯云SKD AppID"
                style="width: 22.4375rem"
              />
            </ElFormItem>
            <ElFormItem label="AccessKeyId:" prop="accessKey">
              <ElInput
                v-model="form2.accessKey"
                placeholder="请输入腾讯云AccessKeyId"
                style="width: 22.4375rem"
              />
            </ElFormItem>
            <ElFormItem label="AccessKeySecret:" prop="secretKey">
              <ElInput
                v-model="form2.secretKey"
                placeholder="请输入腾讯云AccessKeySecret"
                style="width: 22.4375rem"
              />
            </ElFormItem>
            <ElFormItem label="短信签名:">
              <ElInput
                v-model="form2.signName"
                placeholder="腾讯云短信签名"
                style="width: 22.4375rem"
              />
            </ElFormItem>
            <!-- <ElFormItem label="短信区域:">
                <ElInput v-model="form2.area" placeholder="短信区域"     style="width: 22.4375rem"/>
              </ElFormItem> -->
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
