<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, ref } from "vue";
import api from "@/api/modules/configuration_site_setting";

defineOptions({
  name: "SettingSiteSettingList",
});
// 加载
const loading = ref(false);
// form ref
const formRef = ref<FormInstance>();
// 定义表单
const form = ref({
  id: '',
  // 注册开关
  registerOffOrOn: true,
  // 注册审核
  registerExamineOffOrOn: false,
  // keyWords
  keyWords: '',
  // 网站名称
  webName: '',
  // 供应商网址
  supplierURL: '',
})
// 校验
const formRules = ref<FormRules>({
  webName: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
  supplierURL: [
    { required: true, message: "请输入供应商网址", trigger: "blur" },
  ],
});
onMounted(() => {
  getDataList();
});
// 获取数据
async function getDataList() {
  loading.value = true
  const { data } = await api.list()
  // const url = data.supplierURL
  // const extracted = url.match(/jiayu\.com/)[0];
  form.value = data
  // form.value.supplierURL = extracted
  loading.value = false
}
// 复制地址
const copyUrl = async () => {
  const str = `https://${form.value.supplierURL}ah-jiayu.github.io/NewControl/`
  try {
    await navigator.clipboard.writeText(str);
    ElMessage.success({
      message: '复制成功',
      center: true,
    })
  } catch (error) {
    console.error(error);
  }
}
// 提交数据
function onSubmit() {
  // 新增
  if (form.value.id === "") {
    // 校验
    formRef.value &&
      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;
          api.create(form.value).then(() => {
            loading.value = false;
            getDataList();
            ElMessage.success({
              message: "新增成功",
              center: true,
            });
          });
        }
      });
  } else {
    // 修改
    formRef.value && formRef.value.validate((valid) => {
      if (valid) {
        let { id, keyWords, registerExamineOffOrOn, registerOffOrOn, supplierURL, webName } = form.value
        // supplierURL = `https://${supplierURL}ah-jiayu.github.io/NewControl/`
        const params = { id, keyWords, registerExamineOffOrOn, registerOffOrOn, supplierURL, webName }
        loading.value = true
        api.edit(params).then(() => {
          loading.value = false
          getDataList()
          ElMessage.success({
            message: '修改成功',
            center: true,
          })
        })
      }
    })
  }
}
</script>

<template>
  <div v-loading="loading">
    <PageHeader title="站点设置管理" />
    <PageMain>
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="100px"
        :inline="false"
      >
        <el-row :gutter="20">
          <el-col :span="3">
            <el-form-item label="注册开关">
              <el-switch v-model="form.registerOffOrOn" active-text="开启" inline-prompt inactive-text="关闭"
                :active-value="true" :inactive-value="false" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="注册审核">
              <el-switch v-model="form.registerExamineOffOrOn" active-text="开启" inline-prompt inactive-text="关闭"
                :active-value="true" :inactive-value="false" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="网站名称" prop="webName">
          <el-input v-model="form.webName" style="width: 18rem" />
        </el-form-item>
        <el-form-item label="keyWords">
          <el-input v-model="form.keyWords" style="width: 18rem" />
        </el-form-item>
        <el-form-item label="供应商网址" prop="supplierURL">
          <el-input v-model="form.supplierURL" style="width: 8rem;" />
          <el-text class="mx-1">ah-jiayu.github.io/NewControl/</el-text>
          <el-button type="primary" link @click="copyUrl">复制</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit"> 确认 </el-button>
        </el-form-item>
      </el-form>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: auto;
    }
  }
}

.page-main {
  .search-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    margin-bottom: -18px;

    :deep(.el-form-item) {
      grid-column: auto / span 1;

      &:last-child {
        grid-column-end: -1;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }

  .el-divider {
    width: calc(100% + 40px);
    margin-inline: -20px;
  }
}
</style>
