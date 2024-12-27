<script setup lang="ts">
import { ref } from "vue";
import fileApi from "@/api/modules/file";
import api from "@/api/modules/projectManagement_materials";
import DownLoad from "@/utils/download"; // 下载
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "Details",
});
const emits = defineEmits(["fetchData"]);
// 弹框开关变量
const dialogTableVisible = ref(false);
const data = ref<any>({
  showData: {},
  idList: [], //删除的图片id集合
  materialUrlList: [], //新增图片
});
const dialogImageUrl = ref(""); // 图片url
const dialogVisible = ref(false); // 图片查看
// 接口地址
const Url = import.meta.env.VITE_APP_API_BASEURL + "/api/project/uploadQiniu";

// 显隐
async function showEdit(row: any) {
  data.value.showData = row;
  dialogTableVisible.value = true;
  await getUpLoad(row.materialUrl);
}
// #region 上传
// 回显图片
const getUpLoad = async (file: any) => {
  if (file.length) {
    file.forEach(async (item: any) => {
      const res: any = await fileApi.detail({
        fileName: item.materialUrl,
      });

      item.url = res.data.fileUrl;
      item.name = item.materialUrl;
    });
  }
};
// 查看
const handlePreview: any = (file: any) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
// 删除图片
const handleRemove: any = async (uploadFile: any, uploadFiles: any) => {
  // 有id列表里的
  if (uploadFile.id) {
    data.value.idList.push(uploadFile.id);
  } else {
    //没有id是后增的
    await fileApi.delete({
      fileName: uploadFile.response.data.qiNiuUrl,
    });
  }
};
// 上传失败
const handleError = () => {
  ElMessage.warning({
    message: "上传失败了,换张图片试试吧",
    center: true,
  });
};
// 上传图片成功
const handleSuccess: any = (uploadFile: any, uploadFiles: any) => {
  data.value.materialUrlList.push(uploadFile.data.qiNiuUrl);
};
// #endregion

// 下载
function download() {
  data.value.showData.materialUrl.forEach((item: any) => {
    DownLoad(item.url, item.name);
  });
}

// 弹框关闭事件
async function close() {
  // 新增图片接口;
  if (data.value.materialUrlList.length) {
    await api.create({
      id: data.value.showData.id,
      materialUrlList: data.value.materialUrlList,
    });
  }
  // 删除原图片接口
  if (data.value.idList.length) {
    await api.deleteMaterialDetails({
      idList: data.value.idList,
    });
  }
  dialogTableVisible.value = false;
  emits("fetchData");
  data.value.idList = [];
  data.value.materialUrlList = [];
}
// 暴露方法
defineExpose({ showEdit });
</script>

<template>
  <div>
    <el-drawer
      v-model="dialogTableVisible"
      title="详情"
      direction="rtl"
      :before-close="close"
      size="40%"
    >
      <el-divider content-position="left" />
      <el-form label-width="80px" :inline="false">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目ID">
              <!-- <el-input disabled :value="data.showData.projectId" /> -->
              <el-text>{{data.showData.projectId}}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <!-- <el-input disabled :value="data.showData.projectName" /> -->
              <el-text>{{data.showData.projectName}}</el-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会员名称">
              <!-- <el-input disabled :value="data.showData.memberChildName" /> -->
              <el-text>{{data.showData.memberChildName}}</el-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-upload
          v-model:file-list="data.showData.materialUrl"
          class="upload-demo"
          :action="Url"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          list-type="picture"
        >
          <template #trigger>
            <el-button type="primary" class="m-4">上传</el-button>
          </template>
          <el-button type="primary" @click="download"> 下载 </el-button>
        </el-upload>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="close"> 关闭 </el-button>
        </div>
      </template>
      <el-dialog
        v-model="dialogVisible"
        style="z-index: 1000; transform: translate(0); position: relative"
      >
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-drawer>
  </div>
</template>
