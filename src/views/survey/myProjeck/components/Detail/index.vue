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
const imgUrl = ref()
const srcList = ref()
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
        const imgres: any = await fileApi.detail({
          fileName: form.value.descriptionUrl,
        })
        imgUrl.value = imgres.data.fileUrl
        srcList.value = [imgres.data.fileUrl]
      }
      loading.value = false
    }
  } catch (error) {

  } finally {
    loading.value = false
  }
}
// 下载
async function download() {
  await DownLoad(imgUrl.value, form.value.descriptionUrl)
}
function close() {
  loadingDisible.value = false
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
        <el-image style="width: 6.25rem; height: 6.25rem;" :src="imgUrl" :preview-src-list="srcList" :zoom-rate="1.2"
          :max-scale="7" :min-scale="0.2" :initial-index="0" fit="cover" />
      </div>
      <el-button v-if="form.descriptionUrl" style="padding: 0;" type="primary" text @click="download">
        {{ form.descriptionUrl }}下载
      </el-button>
      <el-row :gutter="20" :class="{ isNone: !form.descriptionUrl }">
        <el-col :span="24">
          <div class="radius flex gap-2 p-2">
            <Viewer :value="form.richText" />
          </div>
        </el-col>
      </el-row>
      <template v-if="!form.descriptionUrl">
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
