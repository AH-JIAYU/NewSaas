<script setup lang="ts">
import { DArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import api from "@/api/modules/uid_parsing";

defineOptions({
  name: 'uidParsing',
})
// loading
const loading = ref(false);
// 定义表单
const formIp = ref<any>([]);
// 查询出ip回显
const showIp = ref<any>("");
// 开始
async function ParsingEncryption() {
  try {
    if (formIp.value && formIp.value.length === 0) {
      return ElMessage.warning({
        message: "请至少输入一个IP",
        center: true,
      });
    }
    const arr = formIp.value.split("\n");
    const res = await api.list({ uidList: arr });
    const bbb: any = [];
    console.log('res',res);
    res.data.analyzeUidInfoList.forEach((item: any) => {
      bbb.push(
        `${'UID:' + item.uid}-${item.peopleType === 1 ? '会员名称:' + item.name : '子会员名称:' + item.name}-${item.peopleType === 1 ? '会员ID:' +item.memberChildId : '子会员ID:' +item.memberChildId}-${item.peopleType === 1 ? '会员' : '子会员'}`
      );
    });
    showIp.value = bbb.join("\n");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div>
    <PageMain>
      <el-row style="margin: 0;" :gutter="24">
        <el-col style="padding: 0;" :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
          <el-input
            v-model="formIp"
            placeholder="请粘贴UID每行一个,多个请回车换行"
            type="textarea"
            rows="30"
          />
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
          <div class="flex-c">
            <el-button type="primary" size="default" @click="ParsingEncryption">
              解析<el-icon>
                <DArrowRight />
              </el-icon>
            </el-button>
          </div>
        </el-col>
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
          <el-input v-model="showIp" type="textarea" rows="30" />
        </el-col>
      </el-row>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
:deep {
  .el-row {
    margin-top: 0;
  }
}

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
