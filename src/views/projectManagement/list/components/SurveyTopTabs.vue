<!-- <script lang="ts" setup>
// import VMdEditor from '@kangc/v-md-editor'
// import '@kangc/v-md-editor/lib/style/base-editor.css'
// import githubTheme from '@kangc/v-md-editor/lib/theme/github'
// import '@kangc/v-md-editor/lib/theme/style/github.css'
// import type { FormRules } from 'element-plus'
// import { ElForm } from 'element-plus'
// import md5 from 'js-md5'
// import * as qiniu from 'qiniu-js'
// import { defineProps, ref } from 'vue'
// import { qiniu_token } from '@/api/modules/user'
// import { getLanguage, translate } from '@/i18n'
// import { useAclStore } from '@/store/modules/acl'
// 如果希望默认展示第一个 Tab

// const props = defineProps({
//   leftTab: Object,
//   tabIndex: Number,
// })
// const emit = defineEmits(['setClient'])
// // 创建动态表单引用名称
// const store = useAclStore()
// const { currency, country, surveycategory, question, languagemap, getClient } = storeToRefs<any>(store)
// const countryprops = computed(() => {
//   return { label: getLanguage() === 'en' ? 'value' : 'remark', multiple: true, checkStrictly: true, value: 'key' }
// })
// const surveycategoryprops = computed(() => {
//   return { label: getLanguage() === 'en' ? 'value' : 'remark', multiple: true, checkStrictly: true, value: 'key' }
// })
// // 货币类型 中英切换
// function currencyLabel(item: any) {
//   return getLanguage() === 'en' ? item.value : item.remark
// }
// // 配额控制 中英切换
// function DynamicRendeOption(item: any) {
//   return getLanguage() === 'en' ? item.code : item.name
// }
// const rules = reactive<FormRules>({
//   name: [{ required: true, trigger: 'blur', message: '请输入项目名称' }],
//   client_pid: [{ required: true, trigger: 'blur', message: translate('请输入') + translate('项目标识') }],
//   money: [{ required: true, trigger: 'blur', message: translate('请输入') + translate('价格') }],
//   location: [{ required: true, trigger: 'change', message: translate('请选择') + translate('项目所在地理位置') }],
//   category: [{ required: true, trigger: 'change', message: translate('请选择') + translate('类别') }],
//   ir: [{ required: true, trigger: 'blur', message: translate('请输入') + translate('IR') }],
//   loi: [{ required: true, trigger: 'blur', message: translate('请输入') + translate('时长') }],
//   url: [{ required: true, trigger: 'blur', message: translate('请输入') + translate('RUL') }],
// })

// const clientCom = computed({
//   get() {
//     if (localToptTab.value.client) { return localToptTab.value.client.name ? localToptTab.value.client.name : localToptTab.value.client }
//   },
//   set(vlaue) {
//     localToptTab.value.client = vlaue
//   },
// })

// // 动态渲染参数
// const DynamicRendering = ref<any>([])
// // 注入主组件中的提供者
// const validate = inject<any>('validateTopTabs')
// const activeTopTab = ref('基础设置')// 编辑器图片上传到七牛
// const domain = 'https://pimgs.tctask.com'
// async function handlerUploadImg(event: any, insertImage: any, files: any) {
//   // 生成上传凭证
//   const uploadToken = await qiniu_token()
//   for (const file of files) {
//     const file = files[0]
//     // 设置上传的文件名
//     const key = `saas/${md5(file.name + new Date().getTime())}`
//     const options = {
//       quality: 0.92,
//       noCompressIfLarger: true,
//       // maxWidth: 1000,
//       // maxHeight: 618
//     }
//     qiniu.compressImage(file, options).then((data) => {
//       const observable = qiniu.upload(file, key, uploadToken.data.token)
//       const observer = {
//         next: (response) => {
//           console.log('上传中')
//         },
//         error: (err) => {
//           console.log(`上传中错误：${err}`)
//         },
//         complete: (response) => {
//           // 上传完成
//           const imgUrl = `${domain}/${response.key}`
//           insertImage({ url: imgUrl, desc: '图片' })
//         },
//       }
//       const subscription = observable.subscribe(observer) // 上传开始
//     })
//   }
// }

// const localToptTab = ref<any>(props.leftTab)
// // 选择资格开关绑定值
// const qualificationOptions = ref<any>([])

// // 如果父组件更新了 leftTab，反映这些更改到本地副本
// watch(
//   () => props.leftTab,
//   (newVal) => {
//     localToptTab.value = newVal
//     echoscreen()
//   },
//   { deep: true, immediate: true },
// )

// function qualificationchange(value: string[]) {
//   // 存在就是选中状态
//   if (value.includes('age')) {
//     // 如果没有值，就赋空值
//     if (!localToptTab.value.screen.minage && !localToptTab.value.screen.maxage) {
//       localToptTab.value.screen.minage = ''
//       localToptTab.value.screen.maxage = ''
//     }
//     // 不存在就是非选中状态 给赋的值删掉
//   }
//   else {
//     delete localToptTab.value.screen.minage
//     delete localToptTab.value.screen.maxage
//   }

//   if (value.includes('gender')) {
//     if (!localToptTab.value.screen.gender) { localToptTab.value.screen.gender = '' }
//   }
//   else { delete localToptTab.value.screen.gender }
//   const va = question.value.filter((item: { code: string }) => value.includes(item.code)) || []
//   DynamicRendering.value = va
// }

// // 单个问题源选择事件
// function qualificationcheckbox(value: any) {
//   const isChecked = qualificationOptions.value.includes(value)
//   if (!isChecked) {
//     delete localToptTab.value.screen[value]
//   }
// }

// // checkbox点击事件
// function checkbox(value: any) {
//   if (!localToptTab.value.screen[value]) {
//     localToptTab.value.screen[value] = []
//   }
// }

// function getChildrenByLanguage(dictdata: any) {
//   // 无论有多少个国家只选取首选项
//   const country = localToptTab.value.location[0][0]

//   // 获取该国家的语言代码,如果没有找到默认en
//   const langobject = languagemap.value.find((item: { value: any }) => item.value === country)
//   const lang = langobject ? langobject.key : 'en'

//   // 通过获取的语言代码进行查找相关问题库条目
//   const languageItem
//     = dictdata.find((item: { key: string }) => item.key.startsWith(`${lang}_`))
//     || dictdata.find((item: { key: string }) => item.key.startsWith('en_'))
//   return languageItem.children
// }

// // 使用 InstanceType 来获取 ElForm 实例的类型
// const formRef = ref(null)
// function echoscreen() {
//   // 解构以去除不需要的属性
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { id, createdAt, updatedAt, ...rest } = localToptTab.value.screen

//   // 使用 Object.entries 筛选出值不为空的键
//   let t = Object.entries(rest)
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     .filter(([key, value]) => value !== null && value !== undefined)
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     .map(([key, _]) => key)
//   const hasMinAge = t.includes('minage')
//   const hasMaxAge = t.includes('maxage')
//   if (hasMinAge || hasMaxAge) {
//     const filteredArray = t.filter(item => item !== 'minage' && item !== 'maxage')
//     t = ['age', ...filteredArray]
//   }
//   qualificationOptions.value = t
//   const va = question.value.filter((item: { code: string }) => qualificationOptions.value.includes(item.code))
//   DynamicRendering.value = va
// }

// // 更新客户
// function setclient(data: number) {
//   emit('setClient', data)
// }

// nextTick(() => {
//   validate(formRef.value)
//   // 表单验证方法
//   echoscreen()
//   // 孙组件可以调用这个方法来触发验证
// })
// VMdEditor.use(githubTheme)
</script> -->

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { Editor, Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfmLocale from '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import { ref } from 'vue'

const value = ref([4, 8])
const content = ref('# Fantastic-admin')

const plugins = [
  gfm({
    locale: gfmLocale,
  }),
]

function handleChange(v: string) {
  content.value = v
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <el-tabs>
    <el-tab-pane label="基础设置" name="基础设置">
      <ElForm label-width="100px" model="" rules="rules">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="项目名称" prop="name" style="float: left; width: 18.5rem;">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目标识" prop="client_pid" style="float: left; width: 18.5rem;">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属客户" prop="client" style="float: left; width: 15.5rem;">
                <el-select disabled="" placeholder="Select">
                  <el-option />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属国家" prop="currency" style="float: left; width: 15.5rem;">
                <el-cascader
                  clearable
                  filterable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="left" />
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="原价(美元)" prop="money">
                <el-input type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="配额" prop="quota">
                <el-input-number clearable :min="1" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="限量/h" prop="ir">
                <el-input-number clearable :min="1" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="准入量" prop="loi">
                <el-input-number clearable :min="1" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="IR" prop="location">
                <el-input-number clearable :min="1" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最小时长/分" prop="category">
                <el-cascader
                  clearable
                  filterable
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="互斥ID" prop="location">
                <el-input clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="URL" prop="location">
                <el-input clearable />
              </el-form-item>
            </el-col>
          </el-row>

          <el-divider content-position="left" />
          <el-row :gutter="20">
            <el-col :span="3">
              <el-form-item label="置顶" prop="top">
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="在线" prop="top">
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="资料" prop="top">
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="B2B" prop="top">
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="定时发布" prop="top">
                <el-switch />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="top">
                <el-date-picker
                  type="datetime"
                  placeholder="请选择时间"
                  shortcuts=""
                />
              </el-form-item>
            </el-col>
            <br>
          </el-row>
          <el-divider content-position="left" />
          <el-row :gutter="20">
            <el-col :span="9">
              <el-form-item label="备注" prop="platform">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>描述配额</span>
            </div>
          </template>
          <el-form-item label="上传图片" prop="tips">
            <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
            >
              <el-icon class="el-icon--upload">
                <UploadFilled />
              </el-icon>
              <div class="el-upload__text">
                在这里放下文件或点击 <em>上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="项目描述" prop="describes">
                <!-- key解决富文本编译器   先添加  再编辑  富文本右侧值还在的问题    key值变了会刷新组件 -->
                <Editor class="editor" :value="content" :plugins="plugins" :locale="zhHans" @change="handleChange" />
                <Viewer :value="content" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </ElForm>
    </el-tab-pane>
    <el-tab-pane label="配置信息">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-checkbox-group size="small">
              <el-checkbox-button />
            </el-checkbox-group>
          </div>
        </template>
        <el-row :gutter="20">
          <div>
            <el-col :span="24">
              <el-form-item label="终端">
                <el-checkbox-group>
                  <el-checkbox label="PC" value="Value A" />
                  <el-checkbox label="平板" value="Value B" />
                  <el-checkbox label="Mobile" value="Value C" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="性别">
                <el-radio-group>
                  <el-radio value="1" size="large">
                    男
                  </el-radio>
                  <el-radio value="2" size="large">
                    女
                  </el-radio>
                </el-radio-group>
              </el-form-item >
            </el-col>

          </div>
        </el-row>
        <el-row>
          <el-col :span="24">
              <el-form-item label="年龄">
                <el-slider v-model="value" range show-stops :max="100" />
              </el-form-item>
            </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-divider content-position="left">
          请选择国家后再回来
        </el-divider>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="translate('安全')">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>安全设置</span>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="translate('时差检测')" prop="timeDiff">
              <el-switch

                active-text="translate('开启')"
                :active-value="1"
                inactive-text="translate('关闭')"
                :inactive-value="0"
                inline-prompt
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="translate('重复IP检测')" prop="ipRepeat">
              <el-switch
                active-text="translate('开启')"
                :active-value="1"
                inactive-text="translate('关闭')"
                :inactive-value="0"
                inline-prompt
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="translate('IP一致性检测')" prop="ipCompare">
              <el-switch

                active-text="translate('开启')"
                :active-value="1"
                inactive-text="translate('关闭')"
                :inactive-value="0"
                inline-prompt
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="translate('小时准入量')" prop="enterPerHour">
              <el-input-number clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="translate('小时完成量')" prop="completePerHour">
              <el-input-number clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
:deep(.bytemd-fullscreen) {
  z-index: 2000;
}

:deep(.editor) {
  width: 100%;
}
</style>
