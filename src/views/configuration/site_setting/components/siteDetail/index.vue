<script setup lang="ts">
import empty from '@/assets/images/empty.png'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import useUserStore from "@/store/modules/user";
import api from "@/api/modules/configuration_site_setting";
import axios from "axios";

// 分页
const { pagination, getParams, onSizeChange, onCurrentChange } = usePagination();
const drawerisible = ref(false);
// 是否开启
const isChecked = ref(false)
// 判断顶级域名是否解析
const isAnalysis = ref<boolean>(false);
// listLoading
const listLoading = ref<boolean>(false);
// 列表
const list = ref<any>([]);
// 上传
const fileList = ref<any>({
  domain: 'supplier.tctask.net',
  certificate: [],
  private_key: []
});
// 表单
const form = ref<any>({
  isHttps: false,
})
// 修改
async function showEdit(row: any) {
  list.value = []
  try {
    listLoading.value = true;
    if (row) {
      list.value = [row]
      isAnalysis.value = row.data.success
      pagination.value.total = row.data.list.length
      listLoading.value = false;
    } else {
      list.value = row || []
    }
  } catch (error) {

  } finally {
    listLoading.value = false;
  }
  drawerisible.value = true;
}
// 上传文件
// token
const userStore = useUserStore();
// 请求头
const token = userStore.token;
const headers = ref({ Token: token });

// 接口地址
const Url = import.meta.env.VITE_APP_API_BASEURL + "/tenant-web-config/uploadSSLCert";

const handleFileChange = (field: any) => (file: any, newFileList: any) => {
  fileList.value[field] = newFileList; // 更新文件列表
};
const handleRemove = (field: any) => (file: any) => {
  fileList.value[field] = fileList.value[field].filter((f: any) => f.uid !== file.uid);
  ElMessage.success(`${field} 文件删除成功`);
};
const handleSubmit = async () => {
  // 这里您可以处理提交的逻辑，包含上传的文件
  const payload = new FormData();

  if (fileList.value.certificate.length > 0) {
    payload.append('certificate', fileList.value.certificate[0].raw);
  }

  if (fileList.value.private_key.length > 0) {
    payload.append('private_key', fileList.value.private_key[0].raw);
  }
  payload.append('description', fileList.value.domain);
  try {
    const response = await axios.post(Url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 在这里添加其他请求头，例如身份验证
        'Token': token
      }
    });
    if(response.data.status === 1) {
      ElMessage.success('上传成功');
    }else {
      ElMessage.error('上传失败');
    }
  } catch (error) {
    ElMessage.error('上传失败');
  }

};
// 验证
const onSubmit = () => {

}
// 关闭弹框
function close() {
  list.value = []
  drawerisible.value = false;
}
// 暴露
defineExpose({
  showEdit,
});
</script>

<template>
  <el-dialog v-model="drawerisible" style="height: 850px;" title="详情" @close="close">
    <el-table v-loading="listLoading" border :data="list">
      <el-table-column align="center" prop="host" show-overflow-tooltip label="解析类型">
        <template #default>
          <el-text>CNAME</el-text>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="personalizedDomainName" show-overflow-tooltip label="指向" />
      <el-table-column align="center" prop="host" show-overflow-tooltip label="记录值" />
      <el-table-column align="center" prop="type" show-overflow-tooltip label="状态">
        <template #default>
          <el-text>未生效</el-text>
          <!-- <el-text>已生效</el-text> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="type" show-overflow-tooltip label="操作">
        <template #default>
          <el-button type="primary" plain size="small" @click="onSubmit">
            验证
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty :image="empty" :image-size="300" />
      </template>
    </el-table>
    <div class="step">
      <div class="stepTop">
        <div class="stepTopL">
          <span></span>
          <h3>核心步骤</h3>
        </div>
        <div class="stepTopR">
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
          <p>CNAME解析成功</p>
        </div>
      </div>
      <div class="stepBom">
        <p class="detail">1、登录域名注册商的网站，找到管理域名的控制面板或域名管理页面。</p>
        <p class="detail">2、在域名管理页面中，找到DNS设置、域名解析或类似的选项。</p>
        <p class="detail">3、添加相应的DNS记录来完成域名解析。注意<span>仅支持采用CNAME </span>记录来完成解析。</p>
      </div>
    </div>
    <div class="beCareful">
      <p>
        <span class="svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
            <g id="Frame" clip-path="url(#clip0_735_20343)">
              <path id="Vector"
                d="M13.7494 9.58822C13.3912 10.4156 12.9069 11.1344 12.2964 11.7446C11.6861 12.3551 10.9696 12.8396 10.1474 13.1976C9.32505 13.556 8.44467 13.7349 7.50627 13.7349C6.56811 13.7349 5.68523 13.556 4.85766 13.1976C4.0303 12.8396 3.31148 12.3551 2.70123 11.7446C2.09076 11.1344 1.60623 10.4156 1.24828 9.58822C0.889912 8.76065 0.710938 7.87778 0.710938 6.9396C0.710938 6.0012 0.889912 5.12082 1.24828 4.29844C1.60623 3.47626 2.09076 2.75973 2.70123 2.14947C3.31148 1.539 4.0303 1.05467 4.85766 0.696523C5.68523 0.338372 6.56811 0.15918 7.50627 0.15918C8.44467 0.15918 9.32505 0.338371 10.1474 0.696523C10.9696 1.05469 11.6861 1.539 12.2964 2.14947C12.9069 2.75974 13.3912 3.47628 13.7494 4.29844C14.1075 5.12082 14.2867 6.0012 14.2867 6.9396C14.2867 7.87778 14.1075 8.76065 13.7494 9.58822Z"
                fill="#FF8181" />
              <path id="Vector_2"
                d="M7.49722 9.69629C6.95489 9.69629 6.51562 10.1356 6.51562 10.6779C6.51562 11.2202 6.95489 11.6595 7.49722 11.6595C8.03955 11.6595 8.47882 11.2202 8.47882 10.6779C8.47882 10.1356 8.03955 9.69629 7.49722 9.69629Z"
                fill="white" />
              <path id="Vector_3"
                d="M7.49722 8.74593C7.2263 8.74593 7.00642 8.28775 7.00642 7.72207L6.51562 3.11468C6.51562 2.549 6.95489 2.09082 7.49722 2.09082C8.03955 2.09082 8.47882 2.549 8.47882 3.11468L7.98802 7.72207C7.98802 8.28775 7.76814 8.74593 7.49722 8.74593Z"
                fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_735_20343">
                <rect width="14" height="14" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </span>
        核心步骤完成后支持进行验证操作<span class="red">（关键信息如上）</span>解析设置完成后，需要等待一段时间<span class="bule">（3~24小时）</span>
      </p>

    </div>
    <div style="display: flex; height: 30px; margin-bottom: 24px;">
      <el-form-item label="开启HTTPS">
        <el-checkbox v-model="isChecked" size="large" />
      </el-form-item>
      <el-form-item v-show="isChecked" label="是否强制开启HTTPS">
        <el-switch v-model="form.isHttps" active-text="开启" inactive-text="关闭" inline-prompt active-value="true"
        :inactive-value="false">
      </el-switch>
      </el-form-item>
    </div>
    <div v-show="isChecked" class="form">
      <el-form style="display: flex;" @submit.prevent="handleSubmit">
        <el-form-item label="证书">
          <el-upload class="upload-demo" drag :file-list="fileList.certificate" :action="Url" :headers="headers"
            :on-change="handleFileChange('certificate')" :on-remove="handleRemove('certificate')" list-type="text"
            :limit="1" :auto-upload="false">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              支持点击或拖拽上传
            </div>
            <template #tip>
              <div class="el-upload__tip">
                请上传.PEM格式的文件
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item label="私钥">
          <el-upload class="upload-demo" drag :action="Url" :headers="headers" :file-list="fileList.private_key"
            :on-change="handleFileChange('private_key')" :on-remove="handleRemove('private_key')" list-type="text"
            :limit="1" :auto-upload="false">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              支持点击或拖拽上传
            </div>
            <template #tip>
              <div class="el-upload__tip">
                请上传.KEY格式的文件
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button style="margin-left: 3rem;" plain type="primary" size="default" @click="handleSubmit">上传</el-button>
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
    width: 94% !important;
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

.step {
  width: 672px;
  height: 186px;
  background: #FFFFFF;
  margin-top: 1.5rem;
  box-shadow: 0px 1px 8px 0px rgba(198, 198, 198, 0.6);
  border-radius: 8px 8px 8px 8px;
  padding: 1rem 1rem 1.5rem 1rem;

  .stepTop {
    display: flex;
    justify-content: space-between;
    width: 640px;
    height: 38px;
    border-radius: 0px 0px 0px 0px;
    border-bottom: 1px solid rgba(170, 170, 170, 0.3);

    .stepTopLL {
      width: 131px;
      height: 22px;
    }

    .stepTopL {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      width: 74px;
      height: 22px;

      h3 {
        width: 64px;
        height: 22px;
        font-weight: 500;
        font-size: 16px;
        color: #333333;
        line-height: 19px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .h3 {
        width: 121px;
        height: 22px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #333333;
        line-height: 19px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      span {
        display: inline-block;
        margin-right: .25rem;
        width: 6px;
        height: 6px;
        background: #FF8181;
        border-radius: 50%;
      }
    }

    .stepTopR {
      display: flex;
      justify-content: space-between;
      width: 126px;
      height: 20px;

      p {
        width: 108px;
        height: 20px;
        font-weight: 500;
        font-size: 14px;
        color: #03C239;
        line-height: 16px;
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
    width: 640px;
    height: 92px;
    margin-top: 1rem;
    border-radius: 0px 0px 0px 0px;

    .detail {
      width: 640px;
      margin-bottom: 1rem;
      height: 20px;
      font-weight: 500;
      font-size: 14px;
      color: #333333;
      line-height: 16px;
      text-align: left;
      font-style: normal;
      text-transform: none;

      span {
        color: #60aeff;
      }
    }

    .details {
      width: 640px;
      height: 40px;
      font-weight: 500;
      font-size: 14px;
      color: #333333;
      line-height: 16px;
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
  width: 672px;
  height: 20px;
  margin: 1rem 0 1.5rem 0;

  .svg {
    width: 14px;
    height: 14px;
    margin-right: .25rem;
  }

  p {
    display: flex;
    align-items: center;
    height: 20px;
    font-weight: 400;
    font-size: 14px;
    color: #777777;
    line-height: 16px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

.form {
  display: flex;
  width: 100%;
  height: 5.1875rem;

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
    margin-right: 50px;
  }
}
</style>
