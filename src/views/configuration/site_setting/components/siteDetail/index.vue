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
const props = defineProps(['personalizedDomainName'])
// 分页
const { pagination, getParams, onSizeChange, onCurrentChange } = usePagination();
const drawerisible = ref(false);
// formRef
const formRef = ref()
// fileDtailRef
const fileDtailRef = ref()
// listLoading
const listLoading = ref<boolean>(false);
// 获取合作商id
const tenantId = ref<any>();
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
  domain: '',
  tenantDomain: '',
  supplierDomain: '',
  memberDomain: '',
  // 主域名
  mainDomain: '',
})
// 检查顶级域名是否备案
const checkDomainRecord = ref<any>({})
// 其他域名及状态
const statusForm = ref<any>({})
// 上传
const fileList = ref<any>({
  // 顶级域名
  domain: '',
  // 合作商域名
  tenantDomain: '',
  // 供应商域名
  supplierDomain: '',
  // 会员域名
  memberDomain: '',
  // 证书
  certificate: [],
  // 密钥
  private_key: [],
  // 是否开启https
  forceHttps: 2,
});
// 校验顶级域名
const validateTopLevelDomainName = (rule: any, value: any, callback: any) => {
  // 改进后的正则表达式
  const domainPattern = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(?:\.[A-Za-z0-9-]{1,63}(?<!-))*\.[A-Za-z]{2,}$/;
  if (domainPattern.test(value)) {
    callback(); // 验证通过
  } else {
    console.error('Validation failed'); // 打印验证失败的信息
    callback(new Error('请输入合法的域名')); // 验证失败
  }
};
// 校验
const formRules = ref<FormRules>({
  domain: [
    { required: true, message: "请输入官网域名", trigger: "blur" },
    { validator: validateTopLevelDomainName, trigger: "submit" },
  ],
  tenantDomain: [
    { required: false, message: "请输入合作商域名", trigger: "blur" },
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
const validateSubDomainSuffix = (rule: any, value: any, mainDomain: string, callback: any) => {
  // 提取主域名的后缀
  const mainDomainParts = mainDomain.split('.');
  // 获取最后两个部分作为后缀
  const mainDomainSuffix = mainDomainParts.slice(-2).join('.');
  // 提取子域名的后缀
  const valueParts = value.split('.');
  const subDomainSuffix = valueParts.slice(-2).join('.');
  // 校验后缀是否一致
  if (subDomainSuffix === mainDomainSuffix) {
    // 验证通过
    callback();
  } else {
    // 验证失败
    callback(new Error(`域名必须以 ${mainDomainSuffix} 结尾`));
    return ElMessage({
      type: "warning",
      message: `域名必须以 ${mainDomainSuffix} 结尾`,
    });
  }
};

// 修改
async function showEdit(row: any) {
  list.value = []
  try {
    listLoading.value = true;
    if (row) {
      fileList.value.domain = row.topLevelDomainName
      list.value = [row]
      form.value.certificateContent = row.certificateContent
      form.value.privateKeyContent = row.privateKeyContent
      // form.value.domain = row.personalizedDomainName
      const match = row.personalizedDomainName.match(/tenant(\d+)\.surveysaas\.(com|net)/);
      if (match) {
        tenantId.value = match[1];
      }
      // fileList.value.forceHttps = row.forceHttps
      // 顶级域名是否生效
      form.value.isAnalysis = row.isAnalysis
      if (form.value.isAnalysis) {
        handleStatus()
      }
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

// 获取其他域名状态
const handleStatus = async () => {
  if (form.value.isAnalysis) {
    const { data } = await api.getBackgroundRecordList({})
    statusForm.value = data
    fileList.value.tenantDomain = data.tenantBackgroundDomain
    fileList.value.supplierDomain = data.supplierBackgroundDomain
    fileList.value.memberDomain = data.memberBackgroundDomain
  }
}

// 上传文件
// token
const userStore = useUserStore();
// 请求头
const token = userStore.token;
const headers = ref({ Token: token });
// 接口地址
const Url = import.meta.env.VITE_APP_API_BASEURL + "/api/tenant-web-config/uploadSSLCert";
// 上传文件是否符合
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
// 删除文件
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
// 查看是否备案
const getDomainRecord = async (val: any) => {
  const domainName = /^([0-9a-zA-Z-]{1,}\.)+([a-zA-Z]{2,})$/
  if (val) {
    if (domainName.test(val)) {
      const res = await api.checkDomainRecord({ domainName: val })
      checkDomainRecord.value = res.data
      if (res.data.isKeepOnRecord === 1) form.value.domain = res.data.recordedName
      emits('fetch-data')
    } else {
      ElMessage({
        type: "warning",
        message: "请输入合法域名",
      });
    }
  }
}
// 验证
const onSubmit = async (val: any) => {
  if (!fileList.value.tenantDomain) {
    formRules.value.tenantDomain = []
    formRef.value.clearValidate('tenantDomain');
  }
  if (!fileList.value.supplierDomain) {
    formRules.value.supplierDomain = []
    formRef.value.clearValidate('supplierDomain');
  }
  if (!fileList.value.memberDomain) {
    formRules.value.memberDomain = []
    formRef.value.clearValidate('memberDomain');
  }
  formRef.value && formRef.value.validate(async (valid: any) => {
    if (valid) {
      try {
        listLoading.value = true;
        if (val === 1) {
          if (fileList.value.domain) {
            const payload = new FormData();
            payload.append('domain', fileList.value.domain);
            payload.append('forceHttps', fileList.value.forceHttps);
            // 域名是否生效接口
            const { data } = await api.getTenantWebConfigQueryAnalysis({ url: fileList.value.domain })
            // 获取当前域名对应的个性化域名接口
            const res = await api.getTenantWebConfigKeepOnRecord({ topLevelDomainName: fileList.value.domain })
            // 上传证书接口
            const { status } = await api.uploadSSLCert(payload)
            if (!data.success) {
              form.value.isAnalysis = data.success
              ElMessage({
                type: "warning",
                message: "解析未生效",
              });
            } else {
              form.value.isAnalysis = data.success
              listLoading.value = false;
              emits('fetch-data')
              ElMessage({
                type: "success",
                message: "解析已生效",
              });
            }
            if (status === 1) {
              ElMessage({
                type: "success",
                message: "修改域名成功",
              });
            }
            if (res.status === 1) {
              list.value = [res.data]
            }
            handleStatus()
            listLoading.value = false;
          }
        } else if (val === 2) {
          if (fileList.value.tenantDomain) {
            let isTrue
            validateSubDomainSuffix(null, fileList.value.tenantDomain, fileList.value.domain, (error: any) => {
              if (error) {
                return isTrue = false;
              } else {
                isTrue = true;
              }
            });
            if (isTrue) {
              const res = await api.addAnalyzeTenantBackground({ tenantDomain: fileList.value.tenantDomain })
              if (res.data.flag) {
                ElMessage({
                  type: "success",
                  message: '修改域名成功',
                });
                handleStatus()
              }
            }
          } else {
            return ElMessage({
              type: "warning",
              message: '请输入合作商域名',
            });
          }
        } else if (val === 3) {
          if (fileList.value.supplierDomain) {
            let isTrue
            validateSubDomainSuffix(null, fileList.value.supplierDomain, fileList.value.domain, (error: any) => {
              if (error) {
                return isTrue = false;
              } else {
                isTrue = true;
              }
            });
            if (isTrue) {
              const res = await api.addAnalyzeSupplierBackground({ supplierDomain: fileList.value.supplierDomain })
              if (res.data.flag) {
                ElMessage({
                  type: "success",
                  message: '修改域名成功',
                });
                handleStatus()
              }
            }
          } else {
            return ElMessage({
              type: "warning",
              message: '请输入供应商域名',
            });
          }
        } else if (val === 4) {
          if (fileList.value.memberDomain) {
            let isTrue
            validateSubDomainSuffix(null, fileList.value.memberDomain, fileList.value.domain, (error: any) => {
              if (error) {
                return isTrue = false;
              } else {
                isTrue = true;
              }
            });
            if (isTrue) {
              const res = await api.addAnalyzeMemberBackground({ memberDomain: fileList.value.memberDomain })
              if (res.data.flag) {
                ElMessage({
                  type: "success",
                  message: '修改域名成功',
                });
                handleStatus()
              }
            }
          } else {
            return ElMessage({
              type: "warning",
              message: '请输入会员域名',
            });
          }
        }
      } catch (error) {

      } finally {
        listLoading.value = false;
      }

    }
  })
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
    forceHttps: 2,
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
watch(
  () => props.personalizedDomainName,
  (newval: any, oldval: any) => {
    form.value.domain = newval
  }
)
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
            <!-- 若上传证书网址格式默认绑定HTTPS -->
            <!-- <div style="display: flex;
              align-items: center; margin-left: .25rem; margin-top: -0.125rem; color: #333;">
              <el-tooltip class="tooltips" content="核心步骤" placement="top">
                <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
              </el-tooltip>
            </div> -->
          </div>

          <div v-if="form.isHttpsStatus" class="stepTopR">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <g id="Frame" clip-path="url(#clip0_735_20333)">
                <path id="Vector"
                  d="M13.1223 13.2873H0.875C0.784766 13.2873 0.710938 13.2135 0.710938 13.1232V0.875977C0.710938 0.785742 0.784766 0.711914 0.875 0.711914H13.1236C13.2139 0.711914 13.2877 0.785742 13.2877 0.875977V13.1246C13.2863 13.2148 13.2139 13.2873 13.1223 13.2873Z"
                  fill="#03C239" />
                <path id="Vector_2"
                  d="M11.8645 14H2.13555C0.958398 14 0 13.0416 0 11.8645V2.13555C0 0.958398 0.958398 0 2.13555 0H11.8645C13.0416 0 14 0.958398 14 2.13555V11.8645C14 13.0416 13.0416 14 11.8645 14ZM2.13555 1.42324C1.74316 1.42324 1.42324 1.74316 1.42324 2.13555V11.8645C1.42324 12.2568 1.74316 12.5768 2.13555 12.5768H11.8645C12.2568 12.5768 12.5768 12.2568 12.5768 11.8645V2.13555C12.5768 1.74316 12.2568 1.42324 11.8645 1.42324H2.13555Z"
                  fill="#03C239" />
                <path id="Vector_3"
                  d="M5.74753 11.0141C5.60124 11.0141 5.45359 10.969 5.32781 10.8774L1.89343 8.36725C1.57624 8.13483 1.50652 7.69049 1.73894 7.37194C1.97136 7.05475 2.41706 6.98502 2.73425 7.21745L5.64909 9.34752L11.163 3.22116C11.4255 2.92858 11.8766 2.90533 12.1678 3.16784C12.4591 3.43034 12.4837 3.88151 12.2212 4.17272L6.278 10.7762C6.13718 10.9335 5.94304 11.0141 5.74753 11.0141Z"
                  fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_735_20333">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>SSL证书已上传</p>
          </div>
          <div v-else class="stepTopR">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <g id="Frame" clip-path="url(#clip0_734_18750)">
                <path id="Vector"
                  d="M13.1223 13.2873H0.875C0.784766 13.2873 0.710938 13.2135 0.710938 13.1232V0.875977C0.710938 0.785742 0.784766 0.711914 0.875 0.711914H13.1236C13.2139 0.711914 13.2877 0.785742 13.2877 0.875977V13.1246C13.2863 13.2148 13.2139 13.2873 13.1223 13.2873Z"
                  fill="#FF8181" />
                <path id="Vector_2"
                  d="M11.8645 14H2.13555C0.958398 14 0 13.0416 0 11.8645V2.13555C0 0.958398 0.958398 0 2.13555 0H11.8645C13.0416 0 14 0.958398 14 2.13555V11.8645C14 13.0416 13.0416 14 11.8645 14ZM2.13555 1.42324C1.74316 1.42324 1.42324 1.74316 1.42324 2.13555V11.8645C1.42324 12.2568 1.74316 12.5768 2.13555 12.5768H11.8645C12.2568 12.5768 12.5768 12.2568 12.5768 11.8645V2.13555C12.5768 1.74316 12.2568 1.42324 11.8645 1.42324H2.13555Z"
                  fill="#FF8181" />
                <g id="Group 18190">
                  <path id="Vector_3" d="M4.5 5L9.5 10" stroke="white" stroke-width="1.2" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path id="Vector_4" d="M4.5 10L9.5 5" stroke="white" stroke-width="1.2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_734_18750">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p style="color: #FF8181;">SSL证书未上传</p>
          </div>
        </div>
        <div class="stepBom">
          <p class="detail">1、登录域名注册商的网站，找到管理域名的控制面板或域名管理页面。</p>
          <p class="detail">2、在域名管理页面中，找到DNS设置、域名解析或类似的选项。</p>
          <p class="detail">3、添加相应的DNS记录来完成域名解析。注意<span>仅支持采用CNAME </span>记录来完成解析。</p>
          <p class="detail bule">4、下面配置域名, 同属于一个域名下的二三级域名, HTTPS需要配置通配符证书</p>
        </div>
      </div>
      <div class="steps">
        <el-form style="margin: 0; width: 100%; height: 100%;" :model="fileList" ref="formRef" :rules="formRules"
          :inline="false">
          <el-row style="margin: 0 !important" :gutter="20">
            <div class="f-xc">
              <el-col :span="10">
                <el-form-item label="官网域名" prop="domain">
                  <el-input style="width: 14.5rem;" v-model="fileList.domain" :disabled="form.isAnalysis"
                    placeholder="请输入官网域名" @blur="getDomainRecord(fileList.domain)">
                    <template #append>
                      <copy class="copy" :content="fileList.domain" />
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <template v-if="checkDomainRecord.isKeepOnRecord || form.isAnalysis">
                <el-col :span="10">
                  <el-form-item label="指向域名">
                    <!-- <el-input disabled style="width: 16.375rem;" v-model="form.domain" /> -->
                    <div v-if="form.domain" class="hoverSvg">
                      <p class="fineBom">{{ form.domain }}</p>
                      <span class="c-fx">
                        <copy class="copy" :content="form.domain" />
                      </span>
                    </div>
                    <el-text v-else>-</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <p v-if="!form.isAnalysis" class="svgRed">
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
                  <p v-else class="svgGreen">
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
                <el-col style="display:flex; align-items: center;" :span="2">
                  <el-button v-show="!form.isAnalysis" style="margin-left: 1rem;background-color: #ff9d33;border: none;"
                    size="small" type="primary" @click="onSubmit(1)">验证</el-button>
                </el-col>
              </template>

            </div>
            <div class="f-xc" v-show="form.isAnalysis">
              <el-col :span="10">
                <el-form-item label="合作商后台域名" prop="tenantDomain">
                  <el-input style="width: 14.5rem;" v-model="fileList.tenantDomain"
                    :disabled="statusForm.tenantBackgroundStatus !== 1" placeholder="请输入合作商域名">
                    <template #append>
                      <copy class="copy" :content="fileList.tenantDomain" />
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="指向域名">
                  <!-- <el-input disabled style="width: 16.375rem;" v-model="form.tenantDomain" /> -->
                  <div v-if="statusForm.tenantBackground" class="hoverSvg">
                    <p class="fineBom">{{ statusForm.tenantBackground }}</p>
                    <span class="c-fx">
                      <copy class="copy" :content="statusForm.tenantBackground" />
                    </span>
                  </div>
                  <el-text v-else>-</el-text>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <p v-if="statusForm.tenantBackgroundStatus === 1" class="svgRed">
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
                <p v-else class="svgGreen">
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
              <el-col style="display:flex; align-items: center;" :span="2">
                <el-button v-show="statusForm.tenantBackgroundStatus === 1"
                  style="margin-left: 1rem;background-color: #ff9d33;border: none;" size="small" type="primary"
                  @click="onSubmit(2)">验证</el-button>
              </el-col>
            </div>
            <div class="f-xc" v-show="form.isAnalysis">
              <el-col :span="10">
                <el-form-item label="供应商后台域名" prop="supplierDomain">
                  <el-input style="width: 14.5rem;" v-model="fileList.supplierDomain"
                    :disabled="statusForm.supplierBackgroundStatus !== 1" placeholder="请输入供应商域名">
                    <template #append>
                      <copy class="copy" :content="fileList.supplierDomain" />
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="指向域名">
                  <!-- <el-input disabled style="width: 16.375rem;" v-model="form.supplierDomain" /> -->
                  <div v-if="statusForm.supplierBackground" class="hoverSvg">
                    <p class="fineBom">{{ statusForm.supplierBackground }}</p>
                    <span class="c-fx">
                      <copy class="copy" :content="`${statusForm.supplierBackground}/login?tenant_id=${tenantId}`" />
                    </span>
                  </div>
                  <el-text v-else>-</el-text>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <p v-if="statusForm.supplierBackgroundStatus === 1" class="svgRed">
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
                <p v-else class="svgGreen">
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
              <el-col style="display:flex; align-items: center;" :span="2">
                <el-button v-show="statusForm.supplierBackgroundStatus === 1"
                  style="margin-left: 1rem;background-color: #ff9d33;border: none;" size="small" type="primary"
                  @click="onSubmit(3)">验证</el-button>
              </el-col>
            </div>
            <div class="f-xc" v-show="form.isAnalysis">
              <el-col :span="10">
                <el-form-item label="会员后台域名" prop="memberDomain">
                  <el-input style="width: 14.5rem;" v-model="fileList.memberDomain"
                    :disabled="statusForm.memberBackgroundStatus !== 1" placeholder="请输入会员域名">
                    <template #append>
                      <copy class="copy" :content="fileList.memberDomain" />
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="指向域名">
                  <!-- <el-input disabled style="width: 16.375rem;" v-model="form.memberDomain" /> -->
                  <div v-if="statusForm.memberBackground" class="hoverSvg">
                    <p class="fineBom">{{ statusForm.memberBackground }}</p>
                    <span class="c-fx">
                      <copy class="copy" :content="`${statusForm.memberBackground}/login?tenant_id=${tenantId}`" />
                      <!-- `${statusForm.supplierBackground}?tenant_id=${tenantId}` -->
                      <!-- statusForm.memberBackground -->
                    </span>
                  </div>
                  <el-text v-else>-</el-text>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <p v-if="statusForm.memberBackgroundStatus === 1" class="svgRed">
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
                <p v-else class="svgGreen">
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
              <el-col style="display:flex; align-items: center;" :span="2">
                <el-button v-show="statusForm.memberBackgroundStatus === 1"
                  style="margin-left: 1rem;background-color: #ff9d33;border: none;" size="small" type="primary"
                  @click="onSubmit(4)">验证</el-button>
              </el-col>
            </div>
          </el-row>
        </el-form>
      </div>
      <div v-show="!form.isHttpsStatus"
        style="display: flex;justify-content: space-between; height: 30px; margin-bottom: 1.5rem;">
        <div style="display: flex;">
          <el-form-item style="width: 8.25rem; margin-right: 1.5rem;" label="开启HTTPS上传">
            <el-checkbox v-model="form.isChecked" size="large" />
          </el-form-item>
          <div v-show="form.isChecked" style="display: flex;
          align-items: center; margin-left: 4px;color: #333;">
            <el-tooltip class="tooltips" content="证书上传成功后,支持开启此功能" placement="top">
              <SvgIcon class="SvgIcon1" name="i-ri:question-line" />
            </el-tooltip>
            <!-- 若上传证书网址格式默认绑定HTTPS -->
          </div>
          <el-form-item v-show="form.isChecked" label="默认开启 HTTPS">
            <el-switch v-model="fileList.forceHttps"
              :disabled="!fileList.certificate.length && !fileList.private_key.length && !form.isUploadSSLCert"
              inline-prompt :active-value="2" :inactive-value="1" active-text="开启" inactive-text="关闭" />
          </el-form-item>
          <!-- <el-button size="default" type="primary" @click="handleSubmits">确认</el-button>
          <el-button style="margin-left: 1rem;background-color: #aaaaaa;border: none;" size="default" type="primary"
            @click="">已确认</el-button> -->
        </div>

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
            <el-form-item>
              <el-button style="margin-right: 1.5rem;" type="primary" size="default"
                @click="handleSubmit">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="form.isChecked" style="display: flex; height: 30px;">

      </div>
      <!-- <div class="footer">

      </div> -->
      <fileDtail ref="fileDtailRef" />
    </div>
    <template #footer>
      <div style="display: flex; justify-content: center;">
        <el-button style="width: 7.75rem; height: 2rem; background-color: #fff;color: #58aaff;" type="primary"
          size="default" @click="drawerisible = false">关闭</el-button>
      </div>
    </template>
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

  .el-input-group__append {
    width: 1.875rem;
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
  box-shadow: 0px 1px .5rem 0px rgba(198, 198, 198, 0.6);
  border-radius: .5rem .5rem .5rem .5rem;
  padding: 1rem 1rem 1.5rem 1rem;
}

.steps {
  width: 53.1875rem;
  max-height: 14.4375rem;
  background: #FFFFFF;
  margin-bottom: 1.5rem;
  box-shadow: 0px 1px .5rem 0px rgba(198, 198, 198, 0.6);
  border-radius: .5rem .5rem .5rem .5rem;
  padding: 1rem 1rem 1rem 1rem;

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
      width: 6.625rem;
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
    justify-content: space-between;
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
      width: 6.625rem;
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
    width: 9.125rem;
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
  max-width: 12rem;
  text-align: left !important;
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

.f-xc {
  width: 100%;
  display: flex;
  margin-bottom: 15px;
}

.f-xc:nth-child(4) {
  margin-bottom: 0;
}
</style>
