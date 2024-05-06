<script setup lang="ts">
defineOptions({
  name: 'UserUidParsingIndex',
})
import { ElMessage, ElMessageBox } from "element-plus";
import { DArrowRight } from '@element-plus/icons-vue'
const form = ref<Object>({});
const ParsingEncryption = (fold: number | string) => { //解析 | 加密
  switch (fold) {
    case 0: //解析
      // 逻辑
      break;

    case 1: //加密
      // 逻辑
      break;
  }
}
</script>

<template>
  <div>
    <PageMain>
      <el-row :gutter="24">
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
          <el-input v-model="form.a" placeholder="请粘贴UID，每行一个" type="textarea" rows="30" />
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="flex-c">
            <el-button type="primary" size="default" @click="ParsingEncryption(0)">
              解析<el-icon>
                <DArrowRight />
              </el-icon>
            </el-button>
            <el-button type="primary" size="default" @click="ParsingEncryption(1)">
              加密<el-icon>
                <DArrowRight />
              </el-icon>
            </el-button>
          </div>
        </el-col>
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
          <el-input v-model="form.b" type="textarea" rows="30" />
        </el-col>
      </el-row>
    </PageMain>
  </div>
</template>
<style>
.flex-c {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .el-button {
    margin-left: 0;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
