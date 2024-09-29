<script setup lang="ts">
import empty from '@/assets/images/empty.png'
import type { FormInstance, FormRules, UploadProps } from "element-plus";
import { ElMessage, ElMessageBox } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import useUserStore from "@/store/modules/user";
import api from "@/api/modules/configuration_site_setting";
import axios from "axios";
import fileDtail from "../fileDtail/index.vue";

const emits = defineEmits(['fetch-data'])
// 分页
const { pagination, getParams, onSizeChange, onCurrentChange } = usePagination();
const drawerisible = ref(false);
// formRef
const formRef = ref()
// fileDtailRef
const fileDtailRef = ref()
// listLoading
const listLoading = ref<boolean>(false);
// 列表
const list = ref<any>([]);
const form = ref<any>({
  // 证书
  certificateContent: '',
  // 密钥
  privateKeyContent: '',
  // 是否开启https
  isChecked: false,
  // 判断顶级域名是否解析
  isAnalysis: false,
  // 是否开启https
  isHttpsStatus: false,
  // 是否上传证书 1未上传 2已上传
  isUploadSSLCert: null,
})
// 上传
const fileList = ref<any>({
  domain: '',
  certificate: [],
  private_key: [],
  forceHttps: 1,
});
// 校验顶级域名
const validateTopLevelDomainName = (rule: any, value: any, callback: any) => {
  // 改进后的正则表达式
  const domainPattern = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(?:\.[A-Za-z0-9-]{1,63}(?<!-))*\.[A-Za-z]{2,}$/;
  if (domainPattern.test(value)) {
    callback(); // 验证通过
  } else {
    callback(new Error('请输入合法的域名')); // 验证失败
  }
};
// 校验
const formRules = ref<FormRules>({
  domain: [
    { required: true, message: "请输入顶级域名", trigger: "blur" },
    { validator: validateTopLevelDomainName, trigger: "submit" },
  ],
  tenantDomain: [
    { required: false, message: "请输入租户域名", trigger: "blur" },
    { validator: validateTopLevelDomainName, trigger: "submit" },
  ],
  supplierDomain: [
    { required: false, message: "请输入供应商域名", trigger: "blur" },
    { validator: validateTopLevelDomainName, trigger: "submit" },
  ],
  memberDomain: [
    { required: false, message: "请输入会员域名", trigger: "blur" },
    { validator: validateTopLevelDomainName, trigger: "submit" },
  ],
});
// 修改
async function showEdit(row: any) {
  list.value = []
  try {
    listLoading.value = true;
    if (row) {
      fileList.value.domain = row.topLevelDomainName
      fileList.value.forceHttps = row.forceHttps
      list.value = [row]
      form.value.certificateContent = row.certificateContent
      form.value.privateKeyContent = row.privateKeyContent
      form.value.isAnalysis = row.isAnalysis
      fileList.value.forceHttps = row.forceHttps
      if (row.httpsStatus === 1 || row.httpsStatus === null) {
        form.value.isHttpsStatus = false
      } else {
        form.value.isHttpsStatus = true
      }
      if (row.isUploadSSLCert === 1 || row.isUploadSSLCert === null) {
        form.value.isUploadSSLCert = false
      } else {
        form.value.isUploadSSLCert = true
      }
      listLoading.value = false;
    } else {
      list.value = []
    }
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
  drawerisible.value = true;
}

// 输入框解析域名
const handleSubmits = async () => {
  formRef.value && formRef.value.validate(async (valid: any) => {
    if (valid) {
      try {
        listLoading.value = true;
        const payload = new FormData();
        if (fileList.value.domain) {
          payload.append('domain', fileList.value.domain);
          payload.append('forceHttps', fileList.value.forceHttps);
          const res = await api.getTenantWebConfigKeepOnRecord({ topLevelDomainName: fileList.value.domain })
          const { status } = await api.uploadSSLCert(payload)
          if (status === 1) {
            ElMessage({
              type: "success",
              message: "修改域名成功",
            });

          }
          if (res.status === 1) {
            list.value = [res.data]
          }
          listLoading.value = false;
        }
      } catch (error) {

      } finally {
        listLoading.value = false;
      }

    }
  })
}
// 上传文件
// token
const userStore = useUserStore();
// 请求头
const token = userStore.token;
const headers = ref({ Token: token });
// 接口地址
const Url = import.meta.env.VITE_APP_API_BASEURL + "/api/tenant-web-config/uploadSSLCert";

const handleFileChange = (field: any) => (file: any, newFileList: any) => {
  const isPEM = file.name.endsWith('.pem');
  if (isPEM) {
    fileList.value[field] = newFileList; // 更新文件列表
  } else {
    fileList.value[field] = [];
    return ElMessage({
      type: "warning",
      message: "上传文件类型不正确，仅支持 .pem 格式。",
    });
  }
};
const handleRemove = (field: any) => (file: any) => {
  fileList.value[field] = fileList.value[field].filter((f: any) => f.uid !== file.uid);
  if (fileList.value.private_key.length || fileList.value.certificate.length) {
    fileList.value.forceHttps = false
  }
  ElMessage.success(`${field} 文件删除成功`);
};

// 上传文件
const handleSubmit = async () => {
  try {
    listLoading.value = true;
    // 这里您可以处理提交的逻辑，包含上传的文件
    const payload = new FormData();

    if (fileList.value.certificate.length > 0) {
      payload.append('certificate', fileList.value.certificate[0].raw);
    }

    if (fileList.value.private_key.length > 0) {
      payload.append('private_key', fileList.value.private_key[0].raw);
    }
    payload.append('forceHttps', fileList.value.forceHttps);
    payload.append('domain', fileList.value.domain);
    try {
      const res: any = await axios.post(Url, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 在这里添加其他请求头，例如身份验证
          'Token': token
        }
      });
      if (res.data.status === 1) {
        ElMessage.success('上传成功');
        listLoading.value = false;
        form.value.isHttpsStatus = true
      } else {
        ElMessage.error(res.data.error);
      }
    } catch (error) {
      ElMessage.error('上传失败');
    }
  } catch (error) {

  } finally {
    listLoading.value = false;
  }

};
// 验证
const onSubmit = async () => {
  try {
    if (fileList.value.domain) {
      listLoading.value = true;
      const res = await api.getTenantWebConfigQueryAnalysis({ url: fileList.value.domain })
      if (!res.data.success) {
        form.value.isAnalysis = res.data.success
        ElMessage({
          type: "warning",
          message: "解析未生效",
        });
      } else {
        form.value.isAnalysis = res.data.success
        listLoading.value = false;
        emits('fetch-data')
        ElMessage({
          type: "success",
          message: "解析已生效",
        });
      }
    } else {
      ElMessage({
        type: "warning",
        message: "请输入顶级域名",
      });
    }
  } catch (error) {

  } finally {
    listLoading.value = false;
  }

}

// 文件详情
const handleFileDtail = (val: any) => {
  if (form.value.certificateContent) {
    if (val === 'certificate') {
      fileDtailRef.value.showEdit(form.value.certificateContent, 'certificate')
    } else {
      fileDtailRef.value.showEdit(form.value.privateKeyContent, 'private_key')
    }
  }
}
// 关闭弹框
function handleClose() {
  list.value = []
  Object.assign(fileList, {
    domain: '',
    certificate: [],
    private_key: [],
    forceHttps: 1,
  })
  Object.assign(form, {
    // 证书
    certificateContent: '',
    // 密钥
    privateKeyContent: '',
    // 是否开启https
    isChecked: false,
    // 判断顶级域名是否解析
    isAnalysis: false,
    // 是否开启https
    isHttpsStatus: false,
    // 是否上传证书 1未上传 2已上传
    isUploadSSLCert: null,
  })
  drawerisible.value = false;
}
// 暴露
defineExpose({
  showEdit,
});
</script>

<template>
  <el-dialog v-model="drawerisible" style="min-height: 35rem; width: 56.25rem;" title="域名配置" @close="handleClose">
    <div v-loading="listLoading">
      <div class="step">
        <div class="stepTop">
          <div class="stepTopL">
            <span></span>
            <h3>核心步骤</h3>
          </div>
          <div style="display: flex;
          align-items: center; margin-left: .25rem; margin-top: .125rem; color: #333;">
            <el-tooltip class="tooltips" content="核心步骤" placement="top">
              <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
            </el-tooltip>
            <!-- 若上传证书网址格式默认绑定HTTPS -->
          </div>
        </div>
        <div class="stepBom">
          <p class="detail">1、登录域名注册商的网站，找到管理域名的控制面板或域名管理页面。</p>
          <p class="detail">2、在域名管理页面中，找到DNS设置、域名解析或类似的选项。</p>
          <p class="detail">3、添加相应的DNS记录来完成域名解析。注意<span>仅支持采用CNAME </span>记录来完成解析。</p>
          <p class="detail bule">4、顶级域名请用一级域名；租户域名、供应商域名、会员域名，为顶级域名下的二级域名，HTTPS需要配置通配符证书</p>
        </div>
      </div>
      <div class="step">
        <el-form style="margin: 0; width: 100%; height: 100%;" :model="fileList" ref="formRef" :rules="formRules"
          label-width="120px" :inline="false">
          <el-row style="margin: 0 !important" :gutter="20">
            <el-col :span="12">
              <el-form-item label="顶级域名" prop="domain">
                <el-input style="width: 19.5rem;" v-model="fileList.domain" placeholder="请输入顶级域名" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="指向域名">
                <el-input disabled style="width: 16.375rem;" v-model="fileList.domain" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <p class="svgRed">
                <span class="colorRed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Group 18219">
                      <circle id="Ellipse 84" cx="7" cy="7" r="7" fill="#FFD5D5" />
                      <circle id="Ellipse 83" cx="7" cy="7" r="3.5" fill="#FF8181" />
                    </g>
                  </svg>
                </span>
                未生效
              </p>
              <p class="svgGreen">
                <span class="colorGreen">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Group 18219">
                      <circle id="Ellipse 84" cx="7" cy="7" r="7" fill="#DDFED5" />
                      <circle id="Ellipse 83" cx="7" cy="7" r="3.5" fill="#01D83D" />
                    </g>
                  </svg>
                </span>
                已生效
              </p>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租户后台域名" prop="tenantDomain">
                <el-input style="width: 19.5rem;" v-model="fileList.domain" placeholder="请输入租户域名" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="指向域名">
                <el-input disabled style="width: 16.375rem;" v-model="fileList.domain" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <p class="svgRed">
                <span class="colorRed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Group 18219">
                      <circle id="Ellipse 84" cx="7" cy="7" r="7" fill="#FFD5D5" />
                      <circle id="Ellipse 83" cx="7" cy="7" r="3.5" fill="#FF8181" />
                    </g>
                  </svg>
                </span>
                未生效
              </p>
              <p class="svgGreen">
                <span class="colorGreen">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Group 18219">
                      <circle id="Ellipse 84" cx="7" cy="7" r="7" fill="#DDFED5" />
                      <circle id="Ellipse 83" cx="7" cy="7" r="3.5" fill="#01D83D" />
                    </g>
                  </svg>
                </span>
                已生效
              </p>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商后台域名" prop="supplierDomain">
                <el-input style="width: 19.5rem;" v-model="fileList.domain" placeholder="请输入供应商域名" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="指向域名">
                <el-input disabled style="width: 16.375rem;" v-model="fileList.domain" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <p class="svgRed">
                <span class="colorRed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Group 18219">
                      <circle id="Ellipse 84" cx="7" cy="7" r="7" fill="#FFD5D5" />
                      <circle id="Ellipse 83" cx="7" cy="7" r="3.5" fill="#FF8181" />
                    </g>
                  </svg>
                </span>
                未生效
              </p>
              <p class="svgGreen">
                <span class="colorGreen">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Group 18219">
                      <circle id="Ellipse 84" cx="7" cy="7" r="7" fill="#DDFED5" />
                      <circle id="Ellipse 83" cx="7" cy="7" r="3.5" fill="#01D83D" />
                    </g>
                  </svg>
                </span>
                已生效
              </p>
            </el-col>
            <el-col :span="12">
              <el-form-item label="会员后台域名" prop="memberDomain">
                <el-input style="width: 19.5rem;" v-model="fileList.domain" placeholder="请输入会员域名" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="指向域名">
                <el-input disabled style="width: 16.375rem;" v-model="fileList.domain" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <p class="svgRed">
                <span class="colorRed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Group 18219">
                      <circle id="Ellipse 84" cx="7" cy="7" r="7" fill="#FFD5D5" />
                      <circle id="Ellipse 83" cx="7" cy="7" r="3.5" fill="#FF8181" />
                    </g>
                  </svg>
                </span>
                未生效
              </p>
              <p class="svgGreen">
                <span class="colorGreen">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g id="Group 18219">
                      <circle id="Ellipse 84" cx="7" cy="7" r="7" fill="#DDFED5" />
                      <circle id="Ellipse 83" cx="7" cy="7" r="3.5" fill="#01D83D" />
                    </g>
                  </svg>
                </span>
                已生效
              </p>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="display: flex;justify-content: space-between; height: 30px; margin: 24px 0;">
        <div>
          <el-button size="default" type="primary" @click="handleSubmits">确认</el-button>
          <el-button style="margin-left: 1rem;background-color: #aaaaaa;border: none;" size="default" type="primary"
            @click="handleSubmits">已确认</el-button>
          <el-button style="margin-left: 1rem;background-color: #ff9d33;border: none;" size="default" type="primary"
            @click="handleSubmits">验证</el-button>
        </div>
        <el-form-item style="width: 8.25rem;" label="开启HTTPS上传">
          <el-checkbox v-model="form.isChecked" size="large" />
        </el-form-item>
      </div>
      <div v-show="form.isChecked" class="update">
        <div class="title">
          <span style="margin-right: 50px;">证书</span>
          <span>私钥</span>
        </div>
        <div class="form">
          <el-form style="display: flex; width: 23rem; height:10.625rem;" @submit.prevent="handleSubmit">
            <el-form-item label="">
              <el-upload class="upload-demo" drag :file-list="fileList.certificate" :action="Url" :headers="headers"
                :on-change="handleFileChange('certificate')" :on-remove="handleRemove('certificate')" list-type="text"
                :limit="1" :auto-upload="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
                  <g id="Frame">
                    <path id="Vector"
                      d="M64.7018 37.4596C64.7018 37.4596 64.2118 21.3346 51.0768 18.1296C37.9418 14.9246 31.6118 28.7646 31.4818 29.1596C31.3518 29.5546 30.7068 29.3746 30.7068 29.3746C29.6568 28.3796 25.0268 26.0946 20.1618 29.0246C15.3018 31.9546 17.0618 37.5196 17.0618 37.5196C17.0618 37.5196 9.85676 36.9346 6.16176 48.0596C2.47176 59.1946 15.4168 62.3496 15.4168 62.3496H37.1468V50.5046H32.7968H32.4168H32.1218V50.4846C31.8718 50.4846 31.6718 50.2846 31.6718 50.0296C31.6718 49.8796 31.7518 49.7496 31.8718 49.6646L40.7768 40.2996C40.9018 40.1596 41.0768 40.0646 41.2818 40.0646C41.4918 40.0646 41.6768 40.1696 41.8018 40.3246L50.6418 49.6146C50.6568 49.6246 50.6718 49.6396 50.6868 49.6546L50.7718 49.7446H50.7418C50.7868 49.8246 50.8168 49.8946 50.8168 49.9896C50.8168 50.2696 50.5918 50.4996 50.3068 50.4996C50.2968 50.4996 50.2968 50.4896 50.2868 50.4896V50.5096H45.4968V62.3546H65.2218C65.2218 62.3546 74.6268 59.9996 75.4568 50.2896C76.2968 40.5796 64.7018 37.4596 64.7018 37.4596Z"
                      fill="#409EFF" />
                  </g>
                </svg>
                <div class="el-upload__text">
                  支持点击或拖拽上传
                </div>
                <template #tip>
                  <div v-if="form.isUploadSSLCert" class="el-upload__tip">
                    <el-button type="primary" size="default" link
                      @click="handleFileDtail('certificate')">点击查看文件详情</el-button>
                  </div>
                  <div v-else class="el-upload__tip">
                    请上传.PEM格式的文件
                  </div>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item label="">
              <el-upload class="upload-demo" drag :action="Url" :headers="headers" :file-list="fileList.private_key"
                :on-change="handleFileChange('private_key')" :on-remove="handleRemove('private_key')" list-type="text"
                :limit="1" :auto-upload="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
                  <g id="Frame">
                    <path id="Vector"
                      d="M64.7018 37.4596C64.7018 37.4596 64.2118 21.3346 51.0768 18.1296C37.9418 14.9246 31.6118 28.7646 31.4818 29.1596C31.3518 29.5546 30.7068 29.3746 30.7068 29.3746C29.6568 28.3796 25.0268 26.0946 20.1618 29.0246C15.3018 31.9546 17.0618 37.5196 17.0618 37.5196C17.0618 37.5196 9.85676 36.9346 6.16176 48.0596C2.47176 59.1946 15.4168 62.3496 15.4168 62.3496H37.1468V50.5046H32.7968H32.4168H32.1218V50.4846C31.8718 50.4846 31.6718 50.2846 31.6718 50.0296C31.6718 49.8796 31.7518 49.7496 31.8718 49.6646L40.7768 40.2996C40.9018 40.1596 41.0768 40.0646 41.2818 40.0646C41.4918 40.0646 41.6768 40.1696 41.8018 40.3246L50.6418 49.6146C50.6568 49.6246 50.6718 49.6396 50.6868 49.6546L50.7718 49.7446H50.7418C50.7868 49.8246 50.8168 49.8946 50.8168 49.9896C50.8168 50.2696 50.5918 50.4996 50.3068 50.4996C50.2968 50.4996 50.2968 50.4896 50.2868 50.4896V50.5096H45.4968V62.3546H65.2218C65.2218 62.3546 74.6268 59.9996 75.4568 50.2896C76.2968 40.5796 64.7018 37.4596 64.7018 37.4596Z"
                      fill="#409EFF" />
                  </g>
                </svg>
                <div class="el-upload__text">
                  支持点击或拖拽上传
                </div>
                <template #tip>
                  <div v-if="form.isUploadSSLCert" class="el-upload__tip">
                    <el-button type="primary" size="default" link
                      @click="handleFileDtail('private_key')">点击查看文件详情</el-button>
                  </div>
                  <div v-else class="el-upload__tip">
                    请上传.PEM格式的文件
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="form.isChecked" style="display: flex; height: 30px; margin-bottom: 1.5rem">
        <el-button style="margin-right: 1.5rem;" type="primary" size="default" @click="handleSubmit">确认</el-button>
        <div  style="display: flex;
          align-items: center; margin-right: 4px;color: #333;">
          <el-tooltip class="tooltips" content="证书上传成功后,支持开启此功能" placement="top">
            <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
          </el-tooltip>
          <!-- 若上传证书网址格式默认绑定HTTPS -->
        </div>
        <el-form-item  label="">
          <el-switch v-model="fileList.forceHttps"
            :disabled="!fileList.certificate.length && !fileList.private_key.length && !form.isUploadSSLCert"
            inline-prompt :active-value="2" :inactive-value="1" active-text="开启" inactive-text="关闭" />
        </el-form-item>
      </div>
      <div class="footer">
        <el-button style="width: 7.75rem; height: 2rem; background-color: #fff;color: #58aaff;" type="primary" size="default" @click="drawerisible = false">关闭</el-button>
      </div>
      <fileDtail ref="fileDtailRef" />
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
:deep {
  .el-divider {
    margin: 20px 0;
  }

  .el-card {
    margin-bottom: 10px;
  }

  .el-row,
  .el-table {
    width: 100% !important;
    height: 100% !important;
    margin: auto !important;
  }
}

.parameter {
  text-align: left !important;
}

.text {
  display: inline-block;
  min-width: 4.375rem;
}

.update {
  width: 53.1875rem;
  min-height: 14.875rem;
  background: #FFFFFF;
  margin-top: 1.5rem;
  // box-shadow: 0px 1px .5rem 0px rgba(198, 198, 198, 0.6);
  border-radius: .5rem .5rem .5rem .5rem;
  padding: 1rem 1rem 1.5rem 1rem;
}

.step {
  width: 53.1875rem;
  height: 14.4375rem;
  background: #FFFFFF;
  margin-bottom: 1.5rem;
  box-shadow: 0px 1px .5rem 0px rgba(198, 198, 198, 0.6);
  border-radius: .5rem .5rem .5rem .5rem;
  padding: 1rem 1rem 1.5rem 1rem;

  .stepTop {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 51.1875rem;
    height: 2.375rem;
    border-radius: 0px 0px 0px 0px;
    border-bottom: 1px solid rgba(170, 170, 170, 0.3);

    .stepTopLL {
      width: 8.1875rem;
      height: 1.375rem;
    }

    .stepTopL {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      width: 4.625rem;
      height: 1.375rem;

      h3 {
        width: 4rem;
        height: 1.375rem;
        font-weight: 500;
        font-size: 1rem;
        color: #333333;
        line-height: 1.1875rem;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .h3 {
        width: 7.5625rem;
        height: 1.375rem;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: 1rem;
        color: #333333;
        line-height: 19px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      span {
        display: inline-block;
        margin-right: .25rem;
        width: .375rem;
        height: .375rem;
        background: #FF8181;
        border-radius: 50%;
      }
    }

    .stepTopR {
      display: flex;
      justify-content: space-between;
      width: 7.875rem;
      height: 1.25rem;

      p {
        width: 6.75rem;
        height: 1.25rem;
        font-weight: 500;
        font-size: .875rem;
        color: #03C239;
        line-height: 1rem;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .redd {
        color: #FF8181;
      }
    }
  }

  .stepBom {
    width: 51.1875rem;
    height: 5.75rem;
    margin-top: 1rem;
    border-radius: 0px 0px 0px 0px;

    .detail {
      width: 51.1875rem;
      height: 1.25rem;
      margin-bottom: 1rem;
      font-weight: 500;
      font-size: .875rem;
      color: #333333;
      line-height: 1rem;
      text-align: left;
      font-style: normal;
      text-transform: none;

      span {
        color: #ff8181;
      }
    }

    .bule {
      color: #5eacff;
    }

    .details {
      width: 40rem;
      height: 2.5rem;
      font-weight: 500;
      font-size: .875rem;
      color: #333333;
      line-height: 1rem;
      text-align: left;
      font-style: normal;
      margin-bottom: 1rem;
      text-transform: none;

      span {
        color: #60aeff;
      }
    }

    .detail:last-child {
      margin-bottom: 0px;
      /* 去除最后一个 .item 的边距 */
    }
  }
}


.beCareful {
  width: 42rem;
  height: 1.25rem;
  margin: 1rem 0 1.5rem 0;

  .svg {
    width: .875rem;
    height: .875rem;
    margin-right: .25rem;
  }

  p {
    display: flex;
    align-items: center;
    height: 1.25rem;
    font-weight: 400;
    font-size: .875rem;
    color: #777777;
    line-height: 1rem;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .red {
    color: #FF8181;
  }

  .bule {
    color: #60aeff;
  }
}

.form {
  display: flex;
  width: 100%;
  min-height: 13.1875rem;

  .formL {
    width: 50%;
    height: 100%;
  }

  .formR {
    display: flex;
    align-items: flex-end;
    width: 50%;
    height: 100%;
  }
}

:deep {
  .el-dialog .el-dialog__footer {
    text-align: center
  }

  .asterisk-left {
    margin: 0px;
  }

  .el-checkbox.el-checkbox--large {
    display: flex;
    align-items: center;
    height: 0px !important;
    margin-right: 3.125rem;
  }

  .el-upload {
    width: 8.75rem !important;
    height: 8.75rem !important;
  }

  .el-upload-dragger {
    width: 8.75rem !important;
    height: 8.75rem !important;
    padding: .5rem .875rem 1rem .875rem !important;
  }

  .el-upload__text {
    font-size: .75rem !important;
  }

  .upload-demo {
    margin-right: 2.375rem;
  }

  .el-upload__tip {
    font-size: .875rem !important;
    text-align: center;
    color: #5babff;
  }

  .el-dialog>div {
    height: 40rem !important;
    z-index: 999;
  }

  .el-dialog footer {
    text-align: center;
  }

  .el-upload__tip {
    // width: 105%;
  }

  .el-upload-list--text {
    width: 8.75rem;
  }

  .el-col {
    padding: 0 !important;
  }
}

:deep(.el-dialog .el-dialog__body) {
  height: 40rem !important;
  z-index: 9999;
}

.SvgIcon1 {
  margin-top: 2px;
}

.btn {
  display: flex;
  align-items: flex-end;
  width: 12.5rem;
  height: 10.625rem;
}

.footer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 3rem;
  border-top: 1px solid rgba(170, 170, 170, 0.3);
}

.hoverSvg {
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy {
  display: flex;
  align-items: center;
  width: 1.5625rem;
}

.fineBom {
  // text-align: left !important;
  font-size: .75rem;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 20.125rem;
  height: 1.375rem;
  font-size: 1rem;
  color: #333;
  margin-bottom: .5rem;
}

.svgRed {
  display: flex;
  align-items: center;
  width: 3.8125rem;
  height: 1.25rem;
  margin-left: .4375rem;
  margin-top: .375rem;
  color: #FF8181;

  .colorRed {
    display: inline-block;
    width: .875rem;
    height: .875rem;
    margin-right: .25rem;
  }
}

.svgGreen {
  display: flex;
  align-items: center;
  width: 3.8125rem;
  height: 1.25rem;
  margin-left: .4375rem;
  margin-top: .375rem;
  color: #01D83D;

  .colorGreen {
    display: inline-block;
    width: .875rem;
    height: .875rem;
    margin-right: .25rem;
  }
}
</style>
