<script lang="ts" setup>
// 配置富文本
import { Editor, Viewer } from '@bytemd/vue-next'
import 'bytemd/dist/index.css'
import { ref } from 'vue'
import api from "@/api/modules/survey_myProjeck";
import fileApi from '@/api/modules/file'
import DownLoad from '@/utils/download'
import empty from '@/assets/images/empty.png'

const loadingDisible = ref<boolean>(false)
const title = ref<string>('')
const form = ref<any>({})
const imgUrl = ref<any>([])
const srcList = ref<any>([])
const pictureList = ref<any>([])
const loading = ref(false)

// 回显
async function showEdit(row: any) {
  try {
    loadingDisible.value = true
    title.value = '项目详情'
    if (row) {
      loading.value = true
      const res = await api.getQuotaProjectInfo({ projectId: row.projectId })
      form.value = res.data
      if (form.value.descriptionUrl !== '') {
        const urlArr = form.value.descriptionUrl.split(',');
        srcList.value = urlArr
        const url = [".jpg", ".jpeg", ".png", ".gif"]
        urlArr.map(async (item: any) => {
          const imgres: any = await fileApi.detail({
            fileName: item,
          })
          if (url.some(extension => imgres.data.fileUrl.includes(extension))) {
            pictureList.value.push(imgres.data.fileUrl);
          }
          imgUrl.value.push(imgres.data.fileUrl)
        })
      }
      srcList.value = imgUrl.value
      loading.value = false
    }
  } catch (error) {

  } finally {
    loading.value = false
  }
}

// 下载
async function download(val: any) {
  if(val) {
    const decodedFileName = decodeURIComponent(val.split('/').pop().split('?')[0]);
    await DownLoad(val, decodedFileName)
  }
}
function close() {
  title.value = ''
  form.value = {}
  imgUrl.value = []
  srcList.value = []
  pictureList.value = []
  loadingDisible.value = false
}

// 转码
const decode = (val: any) => {
  const decodedFileName = decodeURIComponent(val.split('/').pop().split('?')[0]);
  return decodedFileName;
}

// ... 这里可能还有其他逻辑 ...
defineExpose({
  showEdit,
})
</script>

<template>
  <div v-loading="loading">
    <el-dialog v-model="loadingDisible" append-to-body :close-on-click-modal="false" destroy-on-close :title="title"
      draggable width="50%" @close="close">
      <div v-if="form.descriptionUrl" class="demo-image__preview">
        <el-image v-for="(item, index) in pictureList" :key="index"
          style="width: 6.25rem; height: 6.25rem; margin-right: 5px;" :src="item" :preview-src-list="pictureList"
          :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :initial-index="index" fit="cover"
           />
      </div>
      <div v-if="form.descriptionUrl" v-for="item in srcList">
        <div class="i-f7:doc-text w-1rem h-1rem"></div>
        <el-link style=" padding: 0; margin: 0;" :underline="false" type="primary" @click="download(item)">{{ decode(item)
          }}下载</el-link>
      </div>
      <el-row :gutter="20" :class="{ isNone: !form.descriptionUrl && !form.richText }">
        <el-col :span="24">
          <div class="radius flex gap-2 p-2">
            <Viewer :value="form.richText" />
          </div>
        </el-col>
      </el-row>
      <template v-if="!form.descriptionUrl && !form.richText">
        <el-empty :image="empty" :image-size="300" />
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.radius {
  width: 100%;
  min-height: 160px;
  margin-top: 1.25rem;
  border: 0.0625rem solid var(--el-border-color);
  border-radius: 0;
}

.isNone {
  display: none;
}
</style>
