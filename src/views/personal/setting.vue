<route lang="yaml">
  name: personalSetting
  meta:
    title: 个人设置
    cache: personal-edit.password
  </route>

  <script setup lang="ts">
  import { ElMessage } from 'element-plus'

  defineOptions({
    name: 'personalSetting',
  })

  const router = useRouter()

  const form = ref({
    headimg: '',
    mobile: '',
    name: '',
    qq: '',
    wechat: '',
    country: '',
  })
  // 弹框开关变量
  const dialogTableVisible = ref(false)
  const total = ref()
  const fileList = ref([]) // 上传
  // 提交数据
  function onSubmit() { }
  // 父级传递数据
  async function showEdit(row: any) {
    // total.value = row.length
    dialogTableVisible.value = true
  }
  // 弹框关闭事件
  function closeHandler() {
    // 移除校验
    // formRef.value.resetFields()
    // delete formData.id
    // // 重置表单
    // Object.assign(formData, defaultState)
    dialogTableVisible.value = false
  }

  function handleSuccess(res: any) {
    if (res.error === '') {
      form.value.headimg = res.data.path
    }
    else {
      ElMessage.warning(res.error)
    }
  }
  function editPassword() {
    router.push({
      name: 'personalEditPassword',
    })
  }
  // 暴露方法
  defineExpose({ showEdit })
  </script>

  <template>
    <div>
      <el-drawer v-model="dialogTableVisible" title="修改用户信息" direction="rtl" :before-close="closeHandler"
        style="height: 100%;" size="40%">
        <ElTabs tab-position="left" >
        <ElTabPane label="个人信息" class="basic">
          <h2>个人信息</h2>
          <ElForm :model="form" label-width="120px" label-suffix="：">
          <ElFormItem style="display: flex;justify-content: center;align-items: center;" label="头像">
            <ImageUpload v-model:url="form.headimg" action="http://scrm.1daas.com/api/upload/upload" name="image"
              :data="{ token: 'TKD628431923530324' }" notip class="headimg-upload" @on-success="handleSuccess" />
          </ElFormItem>
          <ElFormItem label="账户类型">
            <el-text class="mx-1">个人</el-text>
          </ElFormItem>
          <ElFormItem label="用户名">
            <ElInput v-model="form.name" placeholder="请输入你的用户名" />
          </ElFormItem>
          <ElFormItem label="国家">
            <el-select v-model="form.country" placeholder="请选择国家" />
          </ElFormItem>
          <ElFormItem label="货币类型">
            <el-select v-model="form.country" placeholder="请选择货币类型" />
          </ElFormItem>
          <ElFormItem label="公司名称">
            <ElInput v-model="form.qq" placeholder="请输入你的公司名称" />
          </ElFormItem>
          <ElFormItem label="公司税号">
            <ElInput v-model="form.qq" placeholder="请输入你的公司税号" />
          </ElFormItem>
          <ElFormItem label="法人姓名">
            <ElInput v-model="form.qq" placeholder="请输入你的法人姓名" />
          </ElFormItem>
          <ElFormItem label="手机号码">
            <ElInput v-model="form.qq" placeholder="请输入你的手机号码" />
          </ElFormItem>
          <ElFormItem label="电子邮箱">
            <ElInput v-model="form.wechat" placeholder="请输入你的电子邮箱" />
          </ElFormItem>
          <ElFormItem>
            <ElButton @click="onSubmit" type="primary">
              保存
            </ElButton>
            <ElButton @click="closeHandler" type="primary">
              取消
            </ElButton>
          </ElFormItem>
        </ElForm>
        </ElTabPane>
        <ElTabPane label="账户管理" class="security">
          <h2 style="margin-bottom: 30px;">账户管理</h2>
          <ElForm :model="form" label-width="120px" label-suffix="：">
          <ElFormItem label="旧密码">
            <ElInput v-model="form.name" placeholder="请输入旧密码" />
          </ElFormItem>
          <ElFormItem label="新密码">
            <ElInput v-model="form.qq" placeholder="请输入新密码" />
          </ElFormItem>
          <ElFormItem label="确认新密码">
            <ElInput v-model="form.wechat" placeholder="请输入新密码" />
          </ElFormItem>
          <ElFormItem>
            <ElButton @click="onSubmit" type="primary">
              保存
            </ElButton>
            <ElButton @click="closeHandler" type="primary">
              取消
            </ElButton>
          </ElFormItem>
        </ElForm>
        </ElTabPane>
      </ElTabs>
      </el-drawer>
    </div>
  </template>

  <style lang="scss" scoped>
  :deep(.headimg-upload) {
    text-align: center;
    width: 6.25rem;
    height: 6.25rem;

    .el-upload-dragger {
      border-radius: 50%;
      width: 6.25rem;
      height: 6.25rem;
    }
    .el-image {
      width: 6.25rem  !important;
      height: 6.25rem !important;
    }
    .image-slot {
      width: 6.25rem  !important;
      height: 6.25rem !important;
    }

  }

  :deep(.image-slot) {
    width: 6.25rem;
    height: 6.25rem;
  }



  .security {
    .setting-list {
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid var(--el-border-color-lighter);
        transition: var(--el-transition-border);

        .content {
          .title {
            margin-bottom: 5px;
            color: var(--el-text-color-primary);
            transition: var(--el-transition-color);
          }

          .desc {
            font-size: 14px;
            color: var(--el-text-color-secondary);
            transition: var(--el-transition-color);
          }
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
  </style>
